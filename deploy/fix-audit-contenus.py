#!/usr/bin/env python3
"""Corrections de contenu issues de l'audit « coquilles » — via l'API.

Applique :
  F-002  « Barka Energies »                     -> « Barka Énergies »
  F-004  « Conseil Financier »                  -> bas de casse
         « Intermédiation en Opérations de Banque » -> bas de casse
  F-009  « 15 min »                             -> « 15 minutes »
  CT-002 « Avenue Loundun »                     -> « Avenue Loudun »
  L-001  Directeur de la publication (si vide)  -> Yacouba SARE, Directeur général

Usage :
    python deploy/fix-audit-contenus.py                      # dev, dry run
    python deploy/fix-audit-contenus.py --apply              # dev, applique
    python deploy/fix-audit-contenus.py --base https://excellis-investgroup.com --apply

Le mot de passe est demandé à l'exécution, jamais stocké.
"""
import argparse, getpass, json, os, re, sys, urllib.request, urllib.error

DEV = "https://excellis-invest-group.jofedigital.com"

TEXT_FIELDS = ['description', 'description_en', 'mission', 'mission_en',
               'vision', 'vision_en', 'commentaires', 'commentaires_en']


def corriger(texte: str) -> str:
    texte = re.sub(r'\bBarka Energies\b', 'Barka Énergies', texte)          # F-002
    texte = texte.replace('Conseil Financier', 'conseil financier')          # F-004
    texte = texte.replace('Intermédiation en Opérations de Banque',
                          'intermédiation en opérations de banque')          # F-004
    texte = re.sub(r'\b15 min\b(?!utes)', '15 minutes', texte)               # F-009
    return texte


def appel(base, path, method='GET', payload=None, token=None):
    data = None
    headers = {}
    if payload is not None:
        data = json.dumps(payload, ensure_ascii=False).encode('utf-8')
        headers['Content-Type'] = 'application/json; charset=utf-8'
    if token:
        headers['Authorization'] = 'Bearer ' + token
    req = urllib.request.Request(base + path, data=data, method=method, headers=headers)
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        detail = e.read().decode('utf-8', 'replace')
        sys.exit("ERREUR HTTP %s sur %s : %s" % (e.code, path, detail))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--base', default=DEV)
    ap.add_argument('--email', default='admin@excellis-invest-group.com')
    ap.add_argument('--apply', action='store_true')
    a = ap.parse_args()
    base = a.base.rstrip('/')

    mode = "APPLICATION" if a.apply else "SIMULATION (dry run)"
    print("Cible : %s\nMode  : %s\n" % (base, mode))

    # getpass n'affiche rien pendant la frappe (pas même d'astérisques), ce qui
    # rend le collage difficile à contrôler. On accepte donc aussi la variable
    # d'environnement EIG_ADMIN_PASSWORD, et input() en repli si getpass échoue.
    mdp = os.environ.get('EIG_ADMIN_PASSWORD')
    if mdp:
        print("Mot de passe repris depuis EIG_ADMIN_PASSWORD.")
    else:
        try:
            mdp = getpass.getpass("Mot de passe admin pour %s (saisie invisible) : " % a.email)
        except Exception:
            mdp = input("Mot de passe admin pour %s (VISIBLE) : " % a.email)
    mdp = mdp.strip()
    if not mdp:
        sys.exit("Aucun mot de passe saisi.")
    auth = appel(base, '/api/auth/login', 'POST', {'email': a.email, 'password': mdp})
    token = auth.get('token')
    if not token:
        sys.exit("Aucun token reçu — vérifiez les identifiants.")
    print("  connexion OK\n")

    modifs = 0

    # ── Filiales ─────────────────────────────────────────────────────────────
    for f in appel(base, '/api/filiales'):
        payload = {k: corriger(f[k]) for k in TEXT_FIELDS
                   if isinstance(f.get(k), str) and corriger(f[k]) != f[k]}
        if payload:
            modifs += 1
            print("FILIALE %s -> %s" % (f['id'], ', '.join(payload)))
            if a.apply:
                appel(base, '/api/filiales/' + f['id'], 'PUT', payload, token)
                print("   applique")

    # ── Company (CT-002 + L-001) ─────────────────────────────────────────────
    c = appel(base, '/api/company')
    payload = {}
    if 'Loundun' in (c.get('adresse') or ''):
        payload['adresse'] = c['adresse'].replace('Loundun', 'Loudun')
    if not c.get('directeurPublication'):
        payload['directeurPublication'] = 'Yacouba SARE, Directeur général'
    # L-002 — identité de l'hébergeur, relevée sur les mentions légales de LWS
    if not (c.get('hebergeurNom') or '').strip():
        payload['hebergeurNom'] = ("LWS (Ligne Web Services), société au capital de "
                                   "500 000 euros, immatriculée au RCS de Paris sous "
                                   "le numéro B 851 993 683")
    if not (c.get('hebergeurAdresse') or '').strip():
        payload['hebergeurAdresse'] = ("dont le siège est situé 10 rue Penthièvre, "
                                       "75008 Paris, France. Les serveurs hébergeant "
                                       "le Site sont localisés en France")
    for k in TEXT_FIELDS:
        if isinstance(c.get(k), str) and corriger(c[k]) != c[k]:
            payload[k] = corriger(c[k])
    if payload:
        modifs += 1
        print("COMPANY -> %s" % ', '.join(payload))
        if a.apply:
            appel(base, '/api/company', 'PUT', payload, token)
            print("   applique")

    print("\n%d enregistrement(s) %s" %
          (modifs, "modifie(s)" if a.apply else "a modifier — relancez avec --apply"))


if __name__ == '__main__':
    main()
