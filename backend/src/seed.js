require('dotenv').config()
const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const filiales = [
  { id: 'intermediaire-des-services', sigle: 'IS', nom: 'Intermédiaire Des Services', secteur: 'Services Financiers', pays: 'Burkina Faso', description: "La société accompagne ses clients en intermédiation bancaire, négociation de financements et structuration de montages financiers adaptés à leurs besoins.", secteurSlug: 'services-financiers', ordre: 1 },
  { id: 'loans-recovery-company', sigle: 'LRC', nom: 'Loans Recovery Company', secteur: 'Gestion de Créances', pays: 'Burkina Faso', description: "Société spécialisée dans la gestion des créances, à travers le recouvrement, le rachat et la restructuration de créances.", secteurSlug: 'services-financiers', ordre: 2 },
  { id: 'barka-energies', sigle: 'BE', nom: 'Barka Energies', secteur: 'Énergie', pays: 'Burkina Faso', description: "Barka Energies intervient dans la distribution de produits pétroliers et dans la fourniture de solutions solaires.", secteurSlug: 'energie', ordre: 3 },
  { id: 'sopatel-silmande', sigle: 'SS', nom: 'Sopatel Silmandé', secteur: 'Hôtellerie & Restauration', pays: 'Burkina Faso', description: "Établissement hôtelier de référence à Ouagadougou, offrant des services d'hébergement et de restauration haut de gamme.", secteurSlug: 'hotellerie', ordre: 4 },
  { id: 'coris-assurance-iard-bf', sigle: 'CA', nom: 'Coris Assurance IARD BF', secteur: 'Assurance Non-Vie', pays: 'Burkina Faso', description: "Conseil, conception et commercialisation de produits d'assurances non vie au Burkina Faso, sous régulation CIMA.", secteurSlug: 'assurance', ordre: 5 },
  { id: 'coris-assurance-vie-bf', sigle: 'CV', nom: 'Coris Assurance Vie BF', secteur: 'Assurance Vie', pays: 'Burkina Faso', description: "Conseil, conception et commercialisation de produits d'assurances vie au Burkina Faso, sous régulation CIMA.", secteurSlug: 'assurance', ordre: 6 },
  { id: 'coris-assurance-iard-ci', sigle: 'CI', nom: 'Coris Assurance IARD CI', secteur: 'Assurance Non-Vie', pays: "Côte d'Ivoire", description: "Conseil, conception et commercialisation de produits d'assurances non vie en Côte d'Ivoire, sous régulation CIMA.", secteurSlug: 'assurance', ordre: 7 },
  { id: 'coris-assurance-vie-ci', sigle: 'CVI', nom: 'Coris Assurance Vie CI', secteur: 'Assurance Vie', pays: "Côte d'Ivoire", description: "Conseil, conception et commercialisation de produits d'assurances vie en Côte d'Ivoire, sous régulation CIMA.", secteurSlug: 'assurance', ordre: 8 },
  { id: 'coris-bourse', sigle: 'CB', nom: 'Coris Bourse', secteur: 'Marchés Financiers', pays: 'Burkina Faso', description: "Société de Gestion et d'Intermédiation (SGI), accompagnant sa clientèle dans l'achat et la vente de valeurs mobilières sur la BRVM.", secteurSlug: 'marches-financiers', ordre: 9 },
  { id: 'coris-asset-management', sigle: 'CAM', nom: 'Coris Asset Management', secteur: "Gestion d'Actifs", pays: 'Burkina Faso', description: "Société de Gestion d'OPCVM (SGO), spécialisée dans la gestion de fonds communs de placement sur la BRVM.", secteurSlug: 'marches-financiers', ordre: 10 },
  { id: 'expertis-bf', sigle: 'EXB', nom: 'Expertis BF', secteur: 'Immobilier & Capital-Risque', pays: 'Burkina Faso', description: "Spécialisée dans la tierce détention, le suivi d'exécution de projets, les investissements en capital-risque et la promotion immobilière.", secteurSlug: 'immobilier-capital', ordre: 11 },
  { id: 'expertis-ci', sigle: 'EXC', nom: 'Expertis CI', secteur: 'Immobilier & Capital-Risque', pays: "Côte d'Ivoire", description: "Spécialisée dans la tierce détention, le capital-risque, la promotion immobilière et la maîtrise d'ouvrage déléguée en Côte d'Ivoire.", secteurSlug: 'immobilier-capital', ordre: 12 },
  { id: 'excellis', sigle: 'EX', nom: 'Excelis', secteur: 'Technologies & Fintech', pays: 'Burkina Faso', description: "Fintech spécialisée dans la conception, le déploiement et la sécurisation de solutions numériques, monétique et paiement digital.", secteurSlug: 'technologies-fintech', ordre: 13 },
  { id: 'industries-arts-graphiques', sigle: 'IAG', nom: 'Industries des Arts Graphiques', secteur: 'Industrie & Arts Graphiques', pays: 'Burkina Faso', description: "Spécialisée dans l'imprimerie, la conception graphique, la signalétique et la sécurisation de documents sensibles.", secteurSlug: 'industrie', ordre: 14 },
  { id: 'novelus', sigle: 'NOV', nom: 'Novelus', secteur: 'Commerce & Fournitures', pays: 'Burkina Faso', description: "Entreprise commerciale spécialisée dans la fourniture de bureau, les consommables, le matériel informatique et les groupes électrogènes.", secteurSlug: 'commerce', ordre: 15 },
  { id: 'energytis', sigle: 'ET', nom: 'Energytis', secteur: "Production d'Énergie", pays: 'Burkina Faso', description: "Spécialisée dans l'étude, l'ingénierie, le développement, le financement et l'exploitation de sites de production d'énergie.", secteurSlug: 'energie', ordre: 16 },
  { id: 'general-mining-logistics', sigle: 'GML', nom: 'General Mining Logistics TS', secteur: 'Transport & Logistique Minière', pays: 'Burkina Faso', description: "Intervient dans les services logistiques, techniques et opérationnels au profit des secteurs minier et industriel.", secteurSlug: 'logistique-miniere', ordre: 17 },
]

const metiers = [
  { slug: 'services-financiers', titre: 'Services Financiers & Intermédiation', icone: 'briefcase', couleur: 'linear-gradient(135deg, #1A6B7A, #0F4855)', description: 'Intermédiation bancaire, structuration financière, recouvrement et gestion de créances.', enjeux: "Dans une économie africaine en forte croissance, l'accès au financement et la gestion saine des créances constituent des piliers de la stabilité financière.", contribution: 'EIG positionne ses filiales financières comme des facilitateurs clés pour les entreprises et institutions locales.', filialesIds: JSON.stringify(['intermediaire-des-services', 'loans-recovery-company']), ordre: 1 },
  { slug: 'assurance', titre: 'Assurance', icone: 'shield-halved', couleur: 'linear-gradient(135deg, #2A6B4A, #1A4A32)', description: "Assurance vie et non-vie au Burkina Faso et en Côte d'Ivoire, régulées CIMA.", enjeux: "La protection des personnes et des biens est un levier essentiel de résilience économique.", contribution: "Avec 4 entités d'assurance vie et non-vie dans 2 pays, EIG couvre un spectre complet de la protection financière régionale.", filialesIds: JSON.stringify(['coris-assurance-iard-bf', 'coris-assurance-vie-bf', 'coris-assurance-iard-ci', 'coris-assurance-vie-ci']), ordre: 2 },
  { slug: 'marches-financiers', titre: "Marchés Financiers & Gestion d'Actifs", icone: 'chart-line', couleur: 'linear-gradient(135deg, #6B2A6B, #4A1A4A)', description: "Bourse, gestion d'OPCVM, comptes-titres et gestion sous mandat sur la BRVM.", enjeux: "Le développement des marchés financiers africains est indispensable pour mobiliser l'épargne locale au service de l'investissement.", contribution: 'EIG intervient sur la BRVM via deux entités spécialisées.', filialesIds: JSON.stringify(['coris-bourse', 'coris-asset-management']), ordre: 3 },
  { slug: 'immobilier-capital', titre: 'Immobilier & Capital-Risque', icone: 'building', couleur: 'linear-gradient(135deg, #6B4A1A, #4A3010)', description: "Promotion immobilière, maîtrise d'ouvrage déléguée, tierce détention et capital-risque.", enjeux: "Le déficit de logements et d'infrastructures en Afrique de l'Ouest représente à la fois un défi social et une opportunité d'investissement.", contribution: "EIG accompagne les maîtres d'ouvrage publics et privés tout en prenant des participations dans des projets à fort potentiel.", filialesIds: JSON.stringify(['expertis-bf', 'expertis-ci']), ordre: 4 },
  { slug: 'energie', titre: 'Énergie', icone: 'bolt', couleur: 'linear-gradient(135deg, #1A4A6B, #102A4A)', description: "Distribution de produits pétroliers, solutions solaires et ingénierie de production d'énergie.", enjeux: "L'accès à l'énergie est un défi majeur en Afrique subsaharienne.", contribution: "EIG s'engage dans toute la chaîne de valeur énergétique, de la distribution traditionnelle aux nouvelles énergies renouvelables.", filialesIds: JSON.stringify(['barka-energies', 'energytis']), ordre: 5 },
  { slug: 'technologies-fintech', titre: 'Technologies & Fintech', icone: 'microchip', couleur: 'linear-gradient(135deg, #4A1A2A, #3A1020)', description: 'Solutions numériques, digitalisation, monétique, paiement digital et services financiers digitaux.', enjeux: "La révolution numérique transforme l'accès aux services financiers.", contribution: 'Excellis, la fintech du groupe, développe des solutions digitales innovantes.', filialesIds: JSON.stringify(['Excellis']), ordre: 6 },
  { slug: 'industrie', titre: 'Industrie & Arts Graphiques', icone: 'print', couleur: 'linear-gradient(135deg, #2A4A1A, #1A3010)', description: 'Imprimerie, signalétique, conception graphique et sécurisation de documents sensibles.', enjeux: "La sécurisation des documents officiels est un besoin croissant dans la région.", contribution: "EIG contribue à la sécurisation documentaire de l'État et des institutions.", filialesIds: JSON.stringify(['industries-arts-graphiques']), ordre: 7 },
  { slug: 'logistique-miniere', titre: 'Transport & Logistique Minière', icone: 'truck', couleur: 'linear-gradient(135deg, #4A3A1A, #3A2A10)', description: "Logistique, transport d'agrégats miniers et services opérationnels pour les industries extractives.", enjeux: "L'industrie minière burkinabè est un secteur clé de l'économie nationale.", contribution: 'General Mining Logistics TS offre des services logistiques de qualité aux opérateurs miniers.', filialesIds: JSON.stringify(['general-mining-logistics']), ordre: 8 },
  { slug: 'hotellerie', titre: 'Hôtellerie & Restauration', icone: 'hotel', couleur: 'linear-gradient(135deg, #1A2A6B, #101A4A)', description: "Hébergement haut de gamme, restauration et services d'accueil à Ouagadougou.", enjeux: "Le développement économique génère des besoins croissants en infrastructures d'accueil.", contribution: 'Sopatel Silmandé est une référence hôtelière à Ouagadougou.', filialesIds: JSON.stringify(['sopatel-silmande']), ordre: 9 },
]

const articles = [
  { slug: 'lancement-site-institutionnel-2026', titre: 'Excellis Invest Group lance son nouveau site internet institutionnel', categorie: 'Corporate', date: 'Avril 2026', extrait: "Marquant une nouvelle étape dans sa stratégie de visibilité digitale, EIG se dote d'une plateforme institutionnelle de premier rang.", contenu: "Excellis Invest Group franchit une nouvelle étape dans sa stratégie de communication et de visibilité digitale avec le lancement de son site internet institutionnel.", couleur: 'linear-gradient(135deg, #1A6B7A, #0F4855)', featured: true },
  { slug: 'Excellis-fintech-deploiement', titre: 'Excellis accélère le déploiement de ses solutions fintech', categorie: 'Filiales', date: 'Mars 2026', extrait: "La filiale technologique du Groupe multiplie ses partenariats stratégiques pour accélérer la digitalisation.", contenu: "Excellis, la fintech d'Excellis Invest Group, annonce l'accélération de son programme de déploiement de solutions numériques.", couleur: 'linear-gradient(135deg, #2A6B4A, #1A4A32)', featured: false },
  { slug: 'energytis-contrat-energie', titre: "Energytis remporte un contrat d'envergure dans la production d'énergie", categorie: 'Énergie', date: 'Février 2026', extrait: "La filiale spécialisée dans l'ingénierie énergétique consolide sa position sur le marché.", contenu: "Energytis, filiale d'Excellis Invest Group spécialisée dans la production d'énergie, remporte un contrat d'envergure.", couleur: 'linear-gradient(135deg, #6B4A1A, #4A3010)', featured: false },
  { slug: 'notation-bloomfield-confirmation', titre: "Bloomfield Investment Corporation confirme la notation BBB d'EIG", categorie: 'Finance', date: 'Janvier 2026', extrait: "La reconfirmation de la notation BBB par Bloomfield témoigne de la solidité de la gouvernance d'EIG.", contenu: "Bloomfield Investment Corporation a reconduit sa notation BBB à Excellis Invest Group, confirmant la robustesse de sa structure financière.", couleur: 'linear-gradient(135deg, #0F4855, #0F1924)', featured: false },
]

const companyData = {
  nom: 'Excellis Invest Group',
  tagline: 'Investir autrement',
  descriptionCourte: "Holding d'investissement multisectorielle basée au Burkina Faso. 20 milliards FCFA de capital social. 17 filiales. 9 secteurs stratégiques. Noté Bloomfield.",
  description: "Excellis Invest Group est une holding d'investissement multisectorielle basée au Burkina Faso, capitalisée à 20 milliards FCFA, opérant dans 9 secteurs stratégiques à travers 17 filiales en Afrique de l'Ouest.",
  mission: "Mobiliser des expertises, des capitaux et des mécanismes d'intervention à forte valeur ajoutée pour accompagner les institutions et entreprises africaines dans leur financement, leur structuration et leur développement durable.",
  vision: "Être un investisseur panafricain de référence, catalyseur de croissance, de transformation et de création de valeur durable en Afrique.",
  valeurs: [
    { titre: 'Rigueur', icone: 'scale-balanced', description: "Des standards élevés dans toutes nos décisions d'investissement et dans notre gouvernance." },
    { titre: 'Adaptabilité', icone: 'arrows-rotate', description: "Un modèle évolutif, ancré dans les réalités économiques africaines et ouvert aux opportunités." },
    { titre: 'Innovation', icone: 'lightbulb', description: "Une culture de l'innovation au service de la modernisation des économies africaines." },
    { titre: "Esprit d'équipe", icone: 'handshake', description: "Une synergie des filiales et des talents pour créer une valeur collective supérieure." },
  ],
  kpis: [
    { num: '20', unite: 'Mds', label: 'FCFA de capital social' },
    { num: '17', unite: '', label: 'Filiales opérationnelles' },
    { num: '9', unite: '', label: "Secteurs d'activité" },
    { num: '2', unite: '', label: 'Pays (BF + CI)' },
    { num: 'BBB', unite: '', label: 'Notation Bloomfield' },
  ],
  gouvernancePiliers: [
    { num: '01', titre: 'Rigueur & Transparence', texte: 'Gouvernance SA de droit burkinabè, notation externe reconnue, reporting consolidé annuel.' },
    { num: '02', titre: 'Indépendance des organes', texte: 'Séparation claire entre les fonctions de contrôle et de direction opérationnelle du Groupe.' },
    { num: '03', titre: 'Création de Valeur Durable', texte: 'Investissements de long terme dans les secteurs structurants de l'économie africaine.' },
    { num: '04', titre: 'Esprit de Partenariat', texte: 'Croissance en synergie avec les partenaires institutionnels, régulateurs et co-investisseurs.' },
    { num: '05', titre: 'Performance & Responsabilité', texte: 'Résultats mesurables, impact économique et social concret, redevabilité à tous les niveaux.' },
  ],
  // ── Président du Groupe ──
  nom_president: 'Malick Compaoré',
  titre_president: 'Président du Groupe',
  mot_president: "L'Afrique ne manque pas de ressources — elle manque d'investisseurs qui ont la patience de construire dans la durée et la conviction de croire en son potentiel. C'est la raison d'être d'Excellis Invest Group.",
  // ── Directeur Général ──
  nom_dg: 'Issouf Compaoré',
  titre_dg: 'Directeur Général',
  mot_dg: "Notre ambition est de démontrer chaque jour qu'il est possible de concilier performance financière rigoureuse et impact positif et durable sur le tissu économique africain. C'est ce qui guide chacune de nos décisions d'investissement.",
  // ── Coordonnées ──
  adresse: 'Ouagadougou, Burkina Faso',
  email: 'contact@excellis-invest-group.com',
  telephone: '+226 25 30 00 00',
  whatsapp: '22625300000',
}

// ─────────────────────────────────────────────────────────────────
//  DIRIGEANTS
//  categorie: 'conseil' | 'dg' | 'direction'
// ─────────────────────────────────────────────────────────────────
const dirigeants = [

  // ── Président du Conseil d'Administration ──────────────────────
  {
    id: 'pca',
    nom: 'Jean-Baptiste Ouédraogo',
    role: "Président du Conseil d'Administration",
    categorie: 'conseil',
    bio: "Jean-Baptiste Ouédraogo préside le Conseil d'Administration d'Excellis Invest Group depuis 2021. Fort de plus de 30 ans d'expérience dans la finance institutionnelle et l'investissement en Afrique de l'Ouest, il apporte au Groupe une vision stratégique de long terme et un réseau institutionnel de premier plan. Ancien dirigeant de grandes institutions financières régionales, il veille à ce qu'EIG maintienne les plus hauts standards de gouvernance et de transparence.",
    responsabilites: JSON.stringify([
      "Présider les séances du Conseil d'Administration",
      "Arrêter les orientations stratégiques du Groupe",
      "Superviser la gouvernance et le contrôle interne",
      "Valider les grandes décisions d'investissement",
      "Représenter le Conseil auprès des régulateurs et partenaires institutionnels",
    ]),
    expertise: "Gouvernance d'entreprise\nFinance institutionnelle\nInvestissement stratégique\nRelations avec les régulateurs\nDroit des affaires OHADA",
    formation: "MBA Finance – INSEAD, Fontainebleau (1992)\nIngénieur Économiste – ENSEA, Abidjan (1989)",
    experiences: "Président du CA – Excellis Invest Group (2021 – présent)\nDirecteur Général – BCEAO, Dakar (2008 – 2020)\nDirecteur Financement – Banque Mondiale, Washington (2000 – 2008)\nDirecteur des Études – Trésor Public du Burkina Faso (1992 – 2000)",
    ordre: 0,
  },

  // ── Directeur Général ──────────────────────────────────────────
  {
    id: 'dg',
    nom: 'Issouf Compaoré',
    role: 'Directeur Général',
    categorie: 'dg',
    bio: "Issouf Compaoré dirige Excellis Invest Group depuis sa transformation en holding multisectorielle. Fort de plus de 22 ans d'expérience dans la finance et l'investissement en Afrique subsaharienne, il incarne la vision panafricaine du Groupe : mobiliser des capitaux privés au service du développement économique durable de la sous-région. Sous sa direction, EIG a structuré un portefeuille de 17 filiales couvrant 9 secteurs stratégiques, tout en maintenant une notation BBB attribuée par Bloomfield Investment Corporation.",
    responsabilites: JSON.stringify([
      "Piloter la stratégie opérationnelle et financière du Groupe",
      "Coordonner les synergies entre les 17 filiales",
      "Représenter EIG auprès des investisseurs, partenaires et régulateurs",
      "Assurer la performance globale du portefeuille",
      "Rendre compte au Conseil d'Administration",
      "Animer le Comité de Direction",
    ]),
    expertise: "Stratégie d'investissement\nFinance d'entreprise et structuration\nGouvernance de holdings\nDéveloppement des marchés financiers africains\nRelations institutionnelles et partenariats stratégiques",
    formation: "MBA Finance & Stratégie – HEC Paris (2002)\nMaster 2 Économie Internationale – Université Paris I (2000)\nLicence Sciences Économiques – Université de Ouagadougou (1998)",
    experiences: "Directeur Général – Excellis Invest Group (2018 – présent)\nDirecteur des Investissements – Coris Bank International (2012 – 2018)\nResponsable Pôle Financement – BOAD, Lomé (2007 – 2012)\nAnalyste Financier Senior – Société Générale, Paris (2002 – 2007)",
    ordre: 1,
  },

  // ── Comité de Direction ────────────────────────────────────────

  {
    id: 'daf',
    nom: 'Aminata Sawadogo',
    role: 'Directrice Administrative & Financière',
    categorie: 'direction',
    bio: "Aminata Sawadogo supervise l'ensemble des fonctions financières d'Excellis Invest Group : reporting consolidé, gestion de trésorerie, relations avec les investisseurs et suivi de la notation Bloomfield. Elle a joué un rôle clé dans l'obtention et le maintien de la notation BBB du Groupe.",
    responsabilites: JSON.stringify([
      "Superviser le reporting financier consolidé du Groupe",
      "Gérer la trésorerie et les flux financiers inter-filiales",
      "Piloter la relation avec l'agence de notation Bloomfield",
      "Coordonner les levées de fonds et les financements structurés",
      "Animer le contrôle de gestion et l'audit interne",
    ]),
    expertise: "Consolidation financière et reporting IFRS\nGestion de trésorerie et cash management\nRelations investisseurs et notation financière\nAudit interne et contrôle de gestion",
    formation: "DESCF – Ouagadougou (2003)\nMaster CCA – IAE de Lyon (2001)",
    experiences: "DAF – Excellis Invest Group (2019 – présent)\nDirectrice Financière – Coris Assurance IARD BF (2014 – 2019)\nResponsable Contrôle de Gestion – Société Générale Burkina Faso (2008 – 2014)\nAuditrice – KPMG Côte d'Ivoire (2003 – 2008)",
    ordre: 2,
  },

  {
    id: 'djuridique',
    nom: 'Seydou Ouédraogo',
    role: 'Directeur Juridique & Conformité',
    categorie: 'direction',
    bio: "Seydou Ouédraogo garantit la sécurité juridique et la conformité réglementaire de l'ensemble du Groupe et de ses filiales dans un environnement multi-juridictionnel couvrant le Burkina Faso et la Côte d'Ivoire.",
    responsabilites: JSON.stringify([
      "Assurer la conformité réglementaire multi-juridictionnelle",
      "Piloter la veille juridique et réglementaire (CIMA, OHADA)",
      "Accompagner les opérations de croissance externe et due diligence",
      "Gérer les relations avec les autorités de régulation",
      "Superviser le secrétariat des organes de gouvernance",
    ]),
    expertise: "Droit des affaires et droit OHADA\nRégulation des marchés financiers (AMF-UMOA, BRVM)\nConformité CIMA\nFusions-acquisitions\nGouvernance d'entreprise",
    formation: "Master 2 Droit des Affaires Internationales – Paris II Assas (2004)\nDEA Droit Privé – Université de Ouagadougou (2002)",
    experiences: "Directeur Juridique & Conformité – Excellis Invest Group (2020 – présent)\nJuriste Senior – Coris Bank International (2013 – 2020)\nConseiller Juridique – Cabinet Badouel & Associés, Paris (2007 – 2013)",
    ordre: 3,
  },

  {
    id: 'dops',
    nom: 'Rasmané Kaboré',
    role: 'Directeur des Opérations',
    categorie: 'direction',
    bio: "Rasmané Kaboré coordonne les synergies opérationnelles entre les 17 filiales du Groupe et pilote les projets de transformation organisationnelle. Il est le garant de la performance opérationnelle collective d'EIG.",
    responsabilites: JSON.stringify([
      "Coordonner les synergies opérationnelles entre les filiales",
      "Piloter les projets de transformation et d'optimisation",
      "Définir et déployer les meilleures pratiques opérationnelles",
      "Superviser le tableau de bord de performance du Groupe",
      "Assurer la continuité des activités et la gestion des risques opérationnels",
    ]),
    expertise: "Management opérationnel multi-sites\nTransformation organisationnelle\nGestion de projets complexes (PMI/Prince2)\nStratégie de croissance et synergies de groupe",
    formation: "MBA Management & Stratégie – Grenoble École de Management (2006)\nIngénieur Industriel – Institut Supérieur de Technologie, Ouagadougou (2003)",
    experiences: "Directeur des Opérations – Excellis Invest Group (2021 – présent)\nDirecteur Général Adjoint – Novelus (2016 – 2021)\nDirecteur des Opérations – Industries des Arts Graphiques (2010 – 2016)",
    ordre: 4,
  },

  {
    id: 'drh',
    nom: 'Mariam Traoré',
    role: 'Directrice des Ressources Humaines',
    categorie: 'direction',
    bio: "Mariam Traoré pilote la politique RH du Groupe et de ses filiales. Elle œuvre au développement des talents, à la cohésion sociale et à la mise en place d'un cadre de travail stimulant pour les plus de 700 collaborateurs d'EIG.",
    responsabilites: JSON.stringify([
      "Définir et déployer la politique RH du Groupe",
      "Piloter le recrutement des cadres et dirigeants",
      "Superviser les plans de formation et développement des compétences",
      "Harmoniser les politiques de rémunération inter-filiales",
      "Promouvoir la marque employeur d'EIG",
    ]),
    expertise: "Gestion des talents et leadership\nDroit social et droit du travail OHADA\nPolitique de rémunération et avantages sociaux\nFormation et développement des compétences",
    formation: "Master RH & Management – IAE de Bordeaux (2005)\nLicence Psychologie du Travail – Université de Ouagadougou (2002)",
    experiences: "DRH – Excellis Invest Group (2020 – présent)\nDRH – Sopatel Silmandé (2014 – 2020)\nResponsable RH – Coris Bank International (2008 – 2014)",
    ordre: 5,
  },

  {
    id: 'dcom',
    nom: 'Fatimata Ouédraogo',
    role: 'Directrice de la Communication',
    categorie: 'direction',
    bio: "Fatimata Ouédraogo pilote la stratégie de communication institutionnelle d'EIG, renforçant la notoriété du Groupe auprès des investisseurs, des partenaires et du grand public. Elle supervise l'ensemble des canaux digitaux et médias.",
    responsabilites: JSON.stringify([
      "Définir et mettre en œuvre la stratégie de communication du Groupe",
      "Gérer les relations presse et médias",
      "Superviser la communication digitale et les réseaux sociaux",
      "Coordonner la production des publications institutionnelles",
      "Organiser les événements corporate et institutionnels",
    ]),
    expertise: "Communication institutionnelle et corporate\nRelations presse et médias\nMarketing digital et stratégie de contenu\nGestion de crise et réputation",
    formation: "Master Communication & Relations Publiques – CELSA Paris-Sorbonne (2007)\nLicence Journalisme – ISSIC, Ouagadougou (2004)",
    experiences: "Directrice Communication – Excellis Invest Group (2022 – présent)\nResponsable Communication – NSIA Groupe, Abidjan (2014 – 2022)\nChargée de Communication – BOAD, Lomé (2008 – 2014)",
    ordre: 6,
  },

  {
    id: 'dsi',
    nom: 'Ibrahim Sawadogo',
    role: 'Directeur des Systèmes d'Information',
    categorie: 'direction',
    bio: "Ibrahim Sawadogo supervise la transformation digitale d'Excellis Invest Group et pilote l'architecture des systèmes d'information du Groupe. Il assure la sécurité, la disponibilité et l'évolution des infrastructures technologiques.",
    responsabilites: JSON.stringify([
      "Définir la stratégie digitale et SI du Groupe",
      "Superviser la sécurité informatique et la cybersécurité",
      "Piloter les projets de transformation numérique",
      "Assurer l'interopérabilité des systèmes entre les filiales",
      "Gérer les relations avec les prestataires technologiques",
    ]),
    expertise: "Architecture SI et transformation digitale\nCybersécurité et gouvernance IT\nCloud computing et infrastructures\nFintech et systèmes de paiement",
    formation: "Master Informatique & Systèmes Distribués – Université Paris VI (2006)\nIngénieur Réseaux & Télécoms – ESMT, Dakar (2003)",
    experiences: "DSI – Excellis Invest Group (2021 – présent)\nDirecteur IT – Excelis (2018 – 2021)\nResponsable Systèmes – Coris Bank International (2009 – 2018)",
    ordre: 7,
  },

  {
    id: 'dcd',
    nom: 'Abdoulaye Diallo',
    role: 'Directeur du Développement Commercial',
    categorie: 'direction',
    bio: "Abdoulaye Diallo pilote le développement commercial du Groupe, identifie les opportunités de croissance et anime les relations avec les grands comptes et partenaires stratégiques d'EIG à travers l'Afrique de l'Ouest.",
    responsabilites: JSON.stringify([
      "Développer le portefeuille de partenaires stratégiques",
      "Identifier et qualifier les opportunités d'investissement",
      "Animer les relations avec les grands comptes institutionnels",
      "Coordonner les activités commerciales des filiales",
      "Piloter la stratégie de croissance externe du Groupe",
    ]),
    expertise: "Développement commercial et business development\nMarketing institutionnel et B2B\nNégociation et structuration de partenariats\nAnalyse de marchés africains",
    formation: "MBA Marketing & Stratégie Commerciale – Toulouse Business School (2005)\nLicence Commerce International – Université de Ouagadougou (2002)",
    experiences: "Directeur Développement Commercial – Excellis Invest Group (2022 – présent)\nDirecteur Commercial – Expertis BF (2015 – 2022)\nResponsable Grands Comptes – Intermédiaire des Services (2008 – 2015)",
    ordre: 8,
  },
]

const carrieres = [
  {
    titre: 'Analyste Financier Senior',
    departement: 'Finance',
    lieu: 'Ouagadougou, Burkina Faso',
    type: 'CDI',
    salaire: 'Selon profil et expérience',
    dateExpiration: 'Mai 2026',
    description: "Dans le cadre du renforcement de son équipe Finance, Excellis Invest Group recrute un(e) Analyste Financier Senior.",
    missions: "Analyser les états financiers des filiales du Groupe\nPiloter le processus de consolidation financière\nSuivre les indicateurs de performance du portefeuille\nPréparer les présentations pour le Comité de Direction\nContribuer aux études de valorisation",
    profil: "Bac+5 en Finance, Comptabilité ou Gestion\nMinimum 5 ans d'expérience\nMaîtrise des normes IFRS et du droit comptable OHADA",
    avantages: "Rémunération attractive\nAssurance maladie groupe\nFormation continue",
    actif: true,
  },
  {
    titre: 'Responsable Conformité & Contrôle Interne',
    departement: 'Juridique',
    lieu: 'Ouagadougou, Burkina Faso',
    type: 'CDI',
    salaire: 'Selon profil',
    dateExpiration: 'Mai 2026',
    description: "Excellis Invest Group recrute un(e) Responsable Conformité & Contrôle Interne pour renforcer son dispositif de gouvernance.",
    missions: "Mettre en œuvre le dispositif de conformité réglementaire\nRéaliser des missions d'audit interne\nAssurer la veille réglementaire\nGérer les relations avec les autorités de contrôle",
    profil: "Bac+5 Droit des affaires, Compliance ou Audit\nMinimum 4 ans d'expérience en conformité ou audit",
    avantages: "Package salarial compétitif\nAssurance santé groupe\nPoste stratégique",
    actif: true,
  },
  {
    titre: 'Ingénieur Développement Logiciel – Fintech',
    departement: 'Technologie',
    lieu: 'Ouagadougou, Burkina Faso',
    type: 'CDI',
    salaire: 'Selon profil et expérience',
    dateExpiration: 'Juin 2026',
    description: "Excelis, la filiale fintech d'Excellis Invest Group, recrute un(e) Ingénieur Développement Logiciel.",
    missions: "Concevoir et développer des applications de paiement digital\nIntégrer des APIs bancaires\nAssurer la sécurité des applications",
    profil: "Bac+5 Informatique\nMinimum 3 ans d'expérience (Node.js, React, Python)",
    avantages: "Environnement technologique innovant\nFormation continue\nImpact sur l'inclusion financière",
    actif: true,
  },
  {
    titre: 'Chargé(e) de Communication & Relations Médias',
    departement: 'Communication',
    lieu: 'Ouagadougou, Burkina Faso',
    type: 'CDI',
    salaire: 'Selon profil',
    dateExpiration: 'Mai 2026',
    description: "Excellis Invest Group recrute un(e) Chargé(e) de Communication pour gérer la communication institutionnelle du Groupe.",
    missions: "Élaborer le plan de communication annuel\nGérer les relations avec les médias\nAnimer les réseaux sociaux institutionnels",
    profil: "Bac+4/5 Communication, Journalisme\nMinimum 3 ans d'expérience",
    avantages: "Rôle central dans la construction de la marque EIG\nBudget communication dédié",
    actif: true,
  },
  {
    titre: 'Auditeur Interne',
    departement: 'Direction Générale',
    lieu: 'Ouagadougou, Burkina Faso',
    type: 'CDI',
    salaire: 'Selon profil',
    dateExpiration: 'Juin 2026',
    description: "Dans le cadre du renforcement de son dispositif de gouvernance, Excellis Invest Group recrute un(e) Auditeur(trice) Interne.",
    missions: "Planifier et réaliser des missions d'audit interne\nÉvaluer les dispositifs de contrôle interne\nRédiger les rapports d'audit avec recommandations",
    profil: "Bac+5 Audit, Finance ou Comptabilité\nMinimum 3 ans d'expérience en audit interne",
    avantages: "Poste à forte valeur ajoutée\nFormation et certification professionnelle prise en charge",
    actif: true,
  },
  {
    titre: 'Stagiaire – Gestion de Projets & Développement',
    departement: 'Opérations',
    lieu: 'Ouagadougou, Burkina Faso',
    type: 'Stage',
    salaire: 'Gratification légale + avantages',
    dateExpiration: 'Mai 2026',
    description: "Excellis Invest Group offre une opportunité de stage de 6 mois au sein de la Direction des Opérations.",
    missions: "Appuyer le suivi opérationnel des projets\nParticiper à la rédaction de notes de synthèse\nContribuer aux tableaux de bord de pilotage",
    profil: "Étudiant(e) en Master 1 ou 2 (Finance, Gestion, Management)\nRigueur, autonomie et curiosité intellectuelle",
    avantages: "Immersion dans un groupe panafricain\nPossibilité de débouché CDI",
    actif: true,
  },
]

const siteImages = [
  { section: 'hero',       url: '/uploads/Create_a_premium_institutional_website_hero_banner-1776959860789.png',   titre: 'Hero principal',        alt: 'Excellis Invest Group — holding panafricaine', ordre: 1 },
  { section: 'hero',       url: '/uploads/Create_an_institutional_hero_image_for_Excellis_In-1776959887429.png',   titre: 'Hero alternatif',       alt: 'Excellis Invest Group', ordre: 2, actif: false },
  { section: 'about',      url: '/uploads/Create_a_premium_institutional_website_section_vis-1776960072527.png',   titre: 'À propos / Le Groupe',  alt: 'Excellis Invest Group — notre groupe', ordre: 1 },
  { section: 'governance', url: '/uploads/Create_a_high-end_governance_website_header_for_Ex-1776959898389.png',   titre: 'Gouvernance',           alt: 'Gouvernance EIG', ordre: 1 },
  { section: 'careers',    url: '/uploads/Create_a_premium_careers_website_hero_for_Excellis-1776959911645.png',   titre: 'Carrières',             alt: 'Rejoindre Excellis Invest Group', ordre: 1 },
  { section: 'energie',    url: '/uploads/Create_a_premium_African_infrastructure_and_energy-1776960084836.png',   titre: 'Énergie & Infrastructure', alt: 'Énergie en Afrique', ordre: 1 },
  { section: 'fintech',    url: '/uploads/Create_a_premium_innovation_and_fintech_website_se-1776960091610.png',   titre: 'Fintech & Innovation',  alt: 'Innovation digitale', ordre: 1 },
  { section: 'contact',    url: '/uploads/Create_a_premium_institutional_contact_and_regiona-1776960099855.png',   titre: 'Contact',               alt: 'Nous contacter', ordre: 1 },
  { section: 'general',    url: '/uploads/pHYCs2BW.png',                                                           titre: 'Image générale',        alt: '', ordre: 1 },
]

async function main() {
  console.log('Seeding database...')

  const hashedPassword = await bcrypt.hash('Admin@EIG2026!', 10)
  await prisma.adminUser.upsert({
    where: { email: 'admin@excellis-invest-group.com' },
    update: {},
    create: { email: 'admin@excellis-invest-group.com', password: hashedPassword, nom: 'Administrateur EIG' },
  })
  console.log('✓ Admin user: admin@excellis-invest-group.com / Admin@EIG2026!')

  for (const f of filiales) {
    await prisma.filiale.upsert({ where: { id: f.id }, update: f, create: f })
  }
  console.log(`✓ ${filiales.length} filiales`)

  for (const m of metiers) {
    await prisma.metier.upsert({ where: { slug: m.slug }, update: m, create: m })
  }
  console.log(`✓ ${metiers.length} métiers`)

  for (const a of articles) {
    await prisma.article.upsert({ where: { slug: a.slug }, update: a, create: a })
  }
  console.log(`✓ ${articles.length} articles`)

  await prisma.companyInfo.upsert({
    where: { id: 'main' },
    update: { data: companyData },
    create: { id: 'main', data: companyData },
  })
  console.log('✓ Company info (avec champs président et DG)')

  for (const d of dirigeants) {
    await prisma.dirigeant.upsert({ where: { id: d.id }, update: d, create: d })
  }
  console.log(`✓ ${dirigeants.length} dirigeants (1 PCA + 1 DG + ${dirigeants.length - 2} comité de direction)`)

  await prisma.carriere.deleteMany({})
  for (const c of carrieres) {
    await prisma.carriere.create({ data: c })
  }
  console.log(`✓ ${carrieres.length} carrières`)

  await prisma.siteImage.deleteMany({})
  for (const img of siteImages) {
    await prisma.siteImage.create({ data: img })
  }
  console.log(`✓ ${siteImages.length} images`)

  console.log('\nSeed terminé !')
}

main().catch(console.error).finally(() => prisma.$disconnect())
