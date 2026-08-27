/**
 * Socle commun aux quatre pages juridiques.
 *
 * Rassemble les valeurs institutionnelles utilisées par les textes, en donnant
 * la priorité à la fiche société (modifiable depuis l'administration) et en
 * retombant sur les valeurs du document juridique de référence
 * (version 1.0 du 26 août 2026) lorsque le champ n'est pas renseigné.
 */

/** Marqueur des informations que la direction juridique doit encore fournir. */
export const TODO = {
  fr: '[Information à compléter par la direction juridique avant publication]',
  en: '[Information to be completed by legal counsel before publication]',
}

/**
 * Élision devant un nom propre : « de Excellis » est fautif, on écrit « d'Excellis ».
 * Calculé plutôt qu'écrit en dur pour rester juste si la dénomination change.
 */
export function elide(nom = '') {
  const first = nom.trim().charAt(0).toLowerCase()
  const voyelle = 'aàâeéèêëiîïoôuùûyh'.includes(first)
  return voyelle ? `d'${nom}` : `de ${nom}`
}

/** Valeurs de repli issues du document juridique de référence. */
const DEFAULTS = {
  nom: 'Excellis Invest Group',
  site: 'www.excellis-investgroup.com',
  forme: 'société anonyme avec conseil d’administration, de droit burkinabè',
  formeEn: 'a public limited company with a board of directors, incorporated under Burkinabè law',
  capital: '20 000 000 000',
  capitalLettres: 'vingt milliards',
  rccm: 'BF OUA 01 2024 M 09830',
  ifu: '00118250 Y',
  siege: 'Ouagadougou, Avenue Loudun, Burkina Faso',
  siegeEn: 'Ouagadougou, Avenue Loudun, Burkina Faso',
  adressePostale: '01 BP 2061 Ouagadougou 01, Burkina Faso',
  telephone: '+226 25 33 35 40',
  email: 'excellisinvest@excellis-investgroup.com',
  emailJuridique: 'obama@excellis-investgroup.com',
  directeurPublication: 'Monsieur Yacouba SARE, Directeur général',
  directeurPublicationEn: 'Mr Yacouba SARE, Chief Executive Officer',
  prestataire: 'Jofé Digital 360°',
  loi: 'loi n°001-2021/AN du 30 mars 2021 portant protection des personnes à l’égard du traitement des données à caractère personnel',
  loiEn: 'Law No. 001-2021/AN of 30 March 2021 on the protection of persons with regard to the processing of personal data',
  cilUrl: 'https://cil.bf/',
}

/**
 * Construit le jeu de valeurs consommé par les textes juridiques.
 * @param {object|null} company fiche société renvoyée par l'API
 */
export function buildCompany(company) {
  const c = { ...DEFAULTS }

  // La fiche société prime lorsqu'elle est renseignée.
  if (company?.nom) c.nom = company.nom
  if (company?.rccm) c.rccm = company.rccm
  if (company?.ifu) c.ifu = company.ifu
  if (company?.telephone) c.telephone = company.telephone
  if (company?.email) c.email = company.email
  // Les gabarits ajoutent eux-mêmes l'unité (« … francs CFA »). Si la valeur
  // saisie en base la contient déjà, elle se retrouverait en double.
  if (company?.capitalSocial) {
    c.capital = String(company.capitalSocial)
      .replace(/\s*(F\s?CFA|francs?\s+CFA|XOF)\s*$/i, '')
      .trim()
  }
  if (company?.directeurPublication) {
    c.directeurPublication = company.directeurPublication
    c.directeurPublicationEn = company.directeurPublication
  }
  if (company?.adresse) {
    c.siege = company.adresse
    c.siegeEn = company.adresse
  }

  // L'hébergeur reste en attente tant que la direction juridique ne l'a pas fourni.
  const hNom = company?.hebergeurNom
  const hAdr = company?.hebergeurAdresse
  if (hNom) {
    const suffixe = hAdr ? `, ${hAdr}` : ''
    c.hebergeur = `Le Site est hébergé par ${hNom}${suffixe}.`
    c.hebergeurEn = `The Website is hosted by ${hNom}${suffixe}.`
  } else {
    // Aucun repli visible : une page publique ne doit jamais afficher de note de
    // travail interne. À défaut d'hébergeur renseigné, la phrase est simplement
    // omise — le champ reste à compléter côté administration.
    c.hebergeur = ''
    c.hebergeurEn = ''
  }

  return c
}
