#!/usr/bin/env python3
"""
Charge les membres du Comité de Direction via l'API EIG.
Usage : python3 scripts/load_codir.py [API_URL]
"""
import urllib.request, urllib.error, json, sys, getpass

API = sys.argv[1].rstrip('/') if len(sys.argv) > 1 else 'http://localhost:8000/api'

# ── Identifiants ────────────────────────────────────────────────────────────
EMAIL    = 'admin@excellis-invest-group.com'
PASSWORD = 'Admin@EIG2026!'

# ── Membres du CODIR ────────────────────────────────────────────────────────
MEMBRES = [
    {
        'id': 'dga', 'ordre': 10,
        'nom':     'Issaka KARGOUGOU',
        'role':    'Directeur Général Adjoint',
        'role_en': 'Deputy Chief Executive Officer',
    },
    {
        'id': 'dfc', 'ordre': 11,
        'nom':     'Jean Rodrigue KINDA',
        'role':    'Directeur de la Finance et de la Comptabilité',
        'role_en': 'Director of Finance and Accounting',
    },
    {
        'id': 'dsit', 'ordre': 12,
        'nom':     'HIEN Winbir Serge Stanislas',
        'role':    "Directeur des Systèmes d'Information, d'Innovation Technologique et de la Digitalisation",
        'role_en': 'Director of Information Systems, Technological Innovation and Digitalisation',
    },
    {
        'id': 'dch', 'ordre': 13,
        'nom':     'COMPAORE Léonard',
        'role':    'Directeur du Capital Humain et des Moyens Généraux',
        'role_en': 'Director of Human Capital and General Services',
    },
    {
        'id': 'daj', 'ordre': 14,
        'nom':     'BAMA Olga',
        'role':    'Directrice des Affaires Juridiques et Contentieux',
        'role_en': 'Director of Legal Affairs and Litigation',
    },
    {
        'id': 'ag', 'ordre': 15,
        'nom':     'CONGO Ismaël K. H.',
        'role':    'Auditeur Général',
        'role_en': 'General Auditor',
    },
    {
        'id': 'doa', 'ordre': 16,
        'nom':     'Fass-Nè-Windé Augustin OUERMI',
        'role':    "Directeur des Opérations d'Assurance et de Réassurance",
        'role_en': 'Director of Insurance and Reinsurance Operations',
    },
    {
        'id': 'dti', 'ordre': 17,
        'nom':     'NEBIE Olivia Myriam',
        'role':    'Directrice de la Trésorerie et des Investissements',
        'role_en': 'Director of Treasury and Investments',
    },
    {
        'id': 'dmc', 'ordre': 18,
        'nom':     'TIENO Bili Edouard',
        'role':    'Directeur Marketing et Communication',
        'role_en': 'Director of Marketing and Communication',
    },
]

def request(url, data=None, token=None, method=None):
    headers = {'Content-Type': 'application/json', 'Accept': 'application/json'}
    if token:
        headers['Authorization'] = f'Bearer {token}'
    body = json.dumps(data).encode() if data else None
    req  = urllib.request.Request(url, data=body, headers=headers,
                                  method=method or ('POST' if body else 'GET'))
    try:
        resp = urllib.request.urlopen(req)
        return json.loads(resp.read()), resp.status
    except urllib.error.HTTPError as e:
        return json.loads(e.read()), e.code

# ── 1. Authentification ──────────────────────────────────────────────────────
print(f'\n🔗  API : {API}')
print('🔐  Connexion...')
resp, status = request(f'{API}/auth/login', {'email': EMAIL, 'password': PASSWORD})
if 'token' not in resp:
    print(f'❌  Échec auth : {resp}')
    sys.exit(1)
TOKEN = resp['token']
print('✅  Connecté')

# ── 2. Supprimer les anciens membres direction ───────────────────────────────
print('\n🗑   Suppression des anciens membres direction...')
resp, _ = request(f'{API}/dirigeants')
anciens  = [d['id'] for d in resp if d.get('categorie') == 'direction']
for did in anciens:
    _, code = request(f'{API}/dirigeants/{did}', token=TOKEN, method='DELETE')
    print(f'    {"✓" if code == 200 else "✗"} {did}')

# ── 3. Charger les nouveaux membres ─────────────────────────────────────────
print('\n👥  Chargement des membres du CODIR...')
ok = 0
for m in MEMBRES:
    payload = {**m, 'bio': 'Membre du Comité de Direction d\'Excellis Invest Group.',
               'categorie': 'direction', 'actif': True}
    resp, code = request(f'{API}/dirigeants', data=payload, token=TOKEN)
    if code in (200, 201):
        print(f'    ✅  {m["nom"]}')
        ok += 1
    else:
        print(f'    ❌  {m["nom"]} — {resp.get("message","?")[:80]}')

# ── 4. Résumé ────────────────────────────────────────────────────────────────
print(f'\n{"✅" if ok == len(MEMBRES) else "⚠️ "}  {ok}/{len(MEMBRES)} membres chargés')
if ok == len(MEMBRES):
    print('🎉  CODIR chargé avec succès !\n')
else:
    print('⚠️   Certains membres n\'ont pas pu être chargés.\n')
