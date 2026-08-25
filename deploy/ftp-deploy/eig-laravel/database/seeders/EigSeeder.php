<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class EigSeeder extends Seeder
{
    public function run(): void
    {
        // ----------------------------------------------------------------
        // Admin user
        // ----------------------------------------------------------------
        DB::table('admin_users')->upsert([
            [
                'id'         => Str::random(25),
                'email'      => 'admin@excellis-invest-group.com',
                'password'   => Hash::make('Admin@EIG2026!'),
                'nom'        => 'Administrateur EIG',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ], ['email'], ['password', 'nom', 'updated_at']);

        $this->command->info('Admin user created: admin@excellis-invest-group.com / Admin@EIG2026!');

        // ----------------------------------------------------------------
        // Filiales (18 entités — données enrichies depuis Excel client)
        // ----------------------------------------------------------------
        $filiales = [
            // ── 1. IDS ───────────────────────────────────────────────────────
            [
                'id'             => 'intermediaire-des-services',
                'sigle'          => 'IDS',
                'nom'            => 'Intermédiaire Des Services',
                'secteur'        => 'Services Financiers',
                'secteur_slug'   => 'services-financiers',
                'pays'           => 'Burkina Faso',
                'ville'          => 'Ouagadougou',
                'adresse'        => 'Secteur 09, Parcelle P1/2 Lot 146',
                'description'    => "L'Intermédiaire Des Services (IDS) a été créée en janvier 2018. Agréée par la BCEAO sous le numéro N° BK 00001/IOB/2018, elle intervient dans tous les pays de l'espace UMOA. IDS est spécialisée dans le Conseil Financier et l'Intermédiation en Opérations de Banque (IOB). Son capital social est de cent millions (100 000 000) de FCFA.",
                'description_en' => "Intermédiaire Des Services (IDS) was created in January 2018. Licensed by the BCEAO under N° BK 00001/IOB/2018, it operates across all UMOA countries. IDS specialises in Financial Advisory and Banking Operations Intermediation (IOB). Share capital: 100 million FCFA.",
                'mission'        => "IDS est spécialisé dans le Conseil Financier et dans l'Intermédiation en Opérations de Banque (IOB). Ses services comprennent : la négociation et le placement de dépôts, le financement syndiqué, les opérations interbancaires, les opérations internationales, le rachat de crédits, la restructuration de dettes, les financements structurés et l'ingénierie financière des projets PPP.",
                'mission_en'     => "IDS specialises in Financial Advisory and Banking Operations Intermediation (IOB). Services include: deposit placement with banks, syndicated financing, interbank operations, international operations, debt restructuring, structured financing, and PPP financial engineering.",
                'vision'         => "Consolider notre activité d'Intermédiation en Opérations de Banque à travers l'ouverture de Bureaux de Liaison dans les pays suivants : Bénin, Côte d'Ivoire, Sénégal et Togo.",
                'valeurs'        => "Réactivité · Excellence · Confiance · Discrétion",
                'logo'           => null,
                'website'        => null,
                'ordre'          => 1,
                'actif'          => true,
            ],
            // ── 2. LRC ───────────────────────────────────────────────────────
            [
                'id'             => 'loans-recovery-company',
                'sigle'          => 'LRC',
                'nom'            => 'Loans Recovery Company',
                'secteur'        => 'Gestion de Créances',
                'secteur_slug'   => 'services-financiers',
                'pays'           => 'Burkina Faso',
                'ville'          => 'Ouagadougou',
                'description'    => "Société spécialisée dans la gestion des créances, à travers le recouvrement, le rachat et la restructuration de créances, avec pour mission d'accompagner les entreprises et institutions dans l'optimisation de leur trésorerie.",
                'description_en' => "Company specialised in receivables management, including debt recovery, acquisition and restructuring, supporting companies and institutions in optimising their cash flow.",
                'mission'        => "Accompagner les entreprises et institutions dans la gestion et le recouvrement de leurs créances pour optimiser leur trésorerie.",
                'mission_en'     => "Support companies and institutions in managing and recovering their receivables to optimise their cash flow.",
                'logo'           => null,
                'website'        => null,
                'ordre'          => 2,
                'actif'          => true,
            ],
            // ── 3. Barka Energies ────────────────────────────────────────────
            [
                'id'             => 'barka-energies',
                'sigle'          => 'BE',
                'nom'            => 'Barka Energies',
                'secteur'        => 'Énergies et distribution',
                'secteur_slug'   => 'energie',
                'pays'           => 'Burkina Faso',
                'ville'          => 'Ouagadougou',
                'description'    => "Barka Energies intervient dans la distribution de produits pétroliers, principalement les carburants et lubrifiants, et dans la fourniture de solutions solaires adaptées aux besoins des particuliers, des entreprises et des institutions.",
                'description_en' => "Barka Energies operates in petroleum product distribution — primarily fuels and lubricants — and provides solar solutions tailored to the needs of individuals, businesses and institutions.",
                'mission'        => "Fournir des solutions énergétiques fiables et accessibles pour contribuer au développement économique du Burkina Faso.",
                'mission_en'     => "Provide reliable and affordable energy solutions to contribute to the economic development of Burkina Faso.",
                'logo'           => null,
                'website'        => null,
                'ordre'          => 3,
                'actif'          => true,
            ],
            // ── 4. Sopatel Silmandé ──────────────────────────────────────────
            [
                'id'             => 'sopatel-silmande',
                'sigle'          => 'SS',
                'nom'            => 'Sopatel Silmandé',
                'secteur'        => 'Hôtellerie & Restauration',
                'secteur_slug'   => 'hotellerie',
                'pays'           => 'Burkina Faso',
                'ville'          => 'Ouagadougou',
                'description'    => "Situé à 15 mn de l'aéroport international de Ouagadougou, Sopatel Silmandé, établissement 4 étoiles classé hôtel vert, est le cadre idéal pour les séjours d'affaires. L'hôtel dispose de 170 chambres entièrement rénovées, 10 salles de réunions, 2 bars, 2 restaurants, une grande piscine, une salle de fitness, 2 courts de tennis et 2 grands parkings.",
                'description_en' => "Located 15 minutes from Ouagadougou International Airport, Sopatel Silmandé is a 4-star green-certified hotel — the ideal venue for business stays. The hotel features 170 fully renovated rooms, 10 meeting rooms, 2 bars, 2 restaurants, a large swimming pool, a fitness centre, 2 tennis courts and 2 large car parks.",
                'mission'        => "Fournir des services d'hébergement et de restauration de qualité supérieure à ses hôtes en mettant l'accent sur l'expérience client.",
                'mission_en'     => "Provide superior accommodation and catering services to guests with a focus on exceptional customer experience.",
                'vision'         => "Devenir d'ici à 2026, le leader de l'hôtellerie d'affaires au Burkina Faso.",
                'valeurs'        => "Hospitalité · Authenticité · Écoute · Innovation · Intégrité · Hygiène et propreté · Amélioration continue des compétences",
                'commentaires'   => "Distinctions & Récompenses : Prix National de l'Entrepreneur Touristique 3ème édition — Hôtel Vert · REPAB 2022 : Prix du Meilleur Hôtel · SITHO-VITHRO 2023 : Meilleur Valet de Chambre · SITHO 2024 : Meilleur Garçon de café et Meilleur Valet de chambre.",
                'logo'           => null,
                'website'        => 'https://www.sopatelsilmande.com',
                'ordre'          => 4,
                'actif'          => true,
            ],
            // ── 5. Coris Assurance IARD BF ───────────────────────────────────
            [
                'id'             => 'coris-assurance-iard-bf',
                'sigle'          => 'CA',
                'nom'            => 'Coris Assurance IARD BF',
                'secteur'        => 'Assurance Non-Vie',
                'secteur_slug'   => 'assurance',
                'pays'           => 'Burkina Faso',
                'ville'          => 'Ouagadougou',
                'description'    => "Conseil, conception et commercialisation de produits d'assurances non-vie (Incendie, Accidents, Risques Divers) au Burkina Faso, sous régulation CIMA.",
                'description_en' => "Advisory, design and marketing of non-life insurance products (Fire, Accidents, Miscellaneous Risks) in Burkina Faso, regulated by CIMA.",
                'mission'        => "Offrir des solutions d'assurance non-vie accessibles, innovantes et adaptées aux besoins des particuliers et entreprises au Burkina Faso.",
                'mission_en'     => "Offer accessible, innovative non-life insurance solutions tailored to the needs of individuals and businesses in Burkina Faso.",
                'logo'           => null,
                'website'        => 'https://www.coris-assurances.com',
                'ordre'          => 5,
                'actif'          => true,
            ],
            // ── 6. Coris Assurance Vie BF ────────────────────────────────────
            [
                'id'             => 'coris-assurance-vie-bf',
                'sigle'          => 'CV',
                'nom'            => 'Coris Assurance Vie BF',
                'secteur'        => 'Assurance Vie',
                'secteur_slug'   => 'assurance',
                'pays'           => 'Burkina Faso',
                'ville'          => 'Ouagadougou',
                'adresse'        => 'Avenue Loudun, Immeuble Coris Bourse, 01 BP 880 Ouagadougou 01',
                'telephone'      => '+226 25 39 18 98',
                'description'    => "Coris Assurances Vie Burkina est une Société Anonyme au capital de cinq milliards de FCFA. Elle a démarré ses activités le 29/05/2015. Fortement engagée dans la satisfaction clientèle, elle propose : Prévoyance Sociale Collective, Indemnités de Fin de Carrière, Épargne, Rente Éducation, Décès Emprunteur.",
                'description_en' => "Coris Assurances Vie Burkina is a joint-stock company with a share capital of five billion FCFA, operating since 29/05/2015. Strongly committed to customer satisfaction, it offers: Collective Social Protection, End-of-Career Benefits, Savings, Education Annuity, Borrower Death Cover.",
                'mission'        => "Société de référence offrant des produits et services accessibles, innovants et adaptés aux besoins de la population, avec une amélioration continue de la qualité des prestations assurées par des employés compétents et engagés.",
                'mission_en'     => "A reference company offering accessible, innovative products and services adapted to the needs of the population, with continuous quality improvement delivered by competent and committed employees.",
                'vision'         => "Coris Assurances Vie Burkina, l'assureur vie de référence à l'horizon 2026.",
                'valeurs'        => "Confiance · Originalité · Responsabilité · Intégrité · Solidarité",
                'commentaires'   => "Performances notables : 2ème rang du marché en termes de rentabilité et 1er rang en termes de croissance en 2024. Première compagnie d'assurance à lancer l'assurance Takaful au Burkina Faso.",
                'logo'           => null,
                'website'        => 'https://www.coris-assurances.com',
                'ordre'          => 6,
                'actif'          => true,
            ],
            // ── 7. Coris Assurance IARD CI ───────────────────────────────────
            [
                'id'             => 'coris-assurance-iard-ci',
                'sigle'          => 'CI',
                'nom'            => 'Coris Assurance IARD CI',
                'secteur'        => 'Assurance Non-Vie',
                'secteur_slug'   => 'assurance',
                'pays'           => "Côte d'Ivoire",
                'ville'          => 'Abidjan',
                'adresse'        => "Boulevard de la République N°23, angle Avenue Marchand, Plateau — 01 BP 4690 Abidjan 01",
                'telephone'      => '+225 27 20 35 15 65',
                'description'    => "Coris Assurances Côte d'Ivoire est une SA de droit ivoirien au capital de cinq milliards de FCFA libérés intégralement. Elle s'est imposée comme un assureur de référence proche de ses clients, mettant l'accent sur l'accessibilité des produits, la rapidité des prestations et l'innovation continue. Slogan : « L'Assureur qui rassure ».",
                'description_en' => "Coris Assurances Côte d'Ivoire is a joint-stock company under Ivorian law with a share capital of five billion FCFA fully paid up. It has established itself as a reference insurer close to its clients, focusing on product accessibility, speed of service and continuous innovation. Tagline: 'The Insurer that Reassures'.",
                'mission'        => "Offrir des produits et services accessibles, innovants et adaptés aux besoins de la population par une amélioration continue de la qualité des prestations assurées par des employés compétents et engagés.",
                'mission_en'     => "Offer accessible, innovative products and services adapted to the needs of the population through continuous improvement of service quality delivered by competent and committed employees.",
                'vision'         => "Être une société d'assurance de référence, innovante et proche de ses clients.",
                'valeurs'        => "Confiance · Originalité · Responsabilité · Intégrité · Sociabilité",
                'logo'           => null,
                'website'        => null,
                'ordre'          => 7,
                'actif'          => true,
            ],
            // ── 8. Coris Assurance Vie CI ────────────────────────────────────
            [
                'id'             => 'coris-assurance-vie-ci',
                'sigle'          => 'CVI',
                'nom'            => 'Coris Assurance Vie CI',
                'secteur'        => 'Assurance Vie',
                'secteur_slug'   => 'assurance',
                'pays'           => "Côte d'Ivoire",
                'ville'          => 'Abidjan',
                'description'    => "Conseil, conception et commercialisation de produits d'assurances vie en Côte d'Ivoire, sous régulation CIMA.",
                'description_en' => "Advisory, design and marketing of life insurance products in Côte d'Ivoire, regulated by CIMA.",
                'mission'        => "Offrir des solutions d'assurance vie innovantes et accessibles aux particuliers et entreprises en Côte d'Ivoire.",
                'mission_en'     => "Offer innovative and accessible life insurance solutions to individuals and businesses in Côte d'Ivoire.",
                'logo'           => null,
                'website'        => null,
                'ordre'          => 8,
                'actif'          => true,
            ],
            // ── 9. Coris Bourse ──────────────────────────────────────────────
            [
                'id'             => 'coris-bourse',
                'sigle'          => 'CB',
                'nom'            => 'Coris Bourse',
                'secteur'        => 'Services Financiers',
                'secteur_slug'   => 'services-financiers',
                'pays'           => 'Burkina Faso',
                'ville'          => 'Ouagadougou',
                'description'    => "Société de Gestion et d'Intermédiation (SGI), Coris Bourse accompagne sa clientèle dans l'ouverture et la gestion de comptes-titres, ainsi que dans l'achat et la vente de valeurs mobilières cotées sur la Bourse Régionale des Valeurs Mobilières (BRVM).",
                'description_en' => "As a Securities Management and Intermediation Company (SGI), Coris Bourse assists its clients in opening and managing securities accounts, and in buying and selling securities listed on the Regional Securities Exchange (BRVM).",
                'mission'        => "Accompagner les épargnants et investisseurs dans l'accès aux marchés financiers africains à travers une offre de services de qualité.",
                'mission_en'     => "Support savers and investors in accessing African financial markets through quality service offerings.",
                'logo'           => null,
                'website'        => 'https://www.coris-bourse.com',
                'ordre'          => 9,
                'actif'          => true,
            ],
            // ── 10. Coris Asset Management ───────────────────────────────────
            [
                'id'             => 'coris-asset-management',
                'sigle'          => 'CAM',
                'nom'            => 'Coris Asset Management',
                'secteur'        => 'Services Financiers',
                'secteur_slug'   => 'services-financiers',
                'pays'           => 'Burkina Faso',
                'ville'          => 'Ouagadougou',
                'description'    => "Coris Asset Management (CAM) SA est une Société de Gestion d'OPCVM (SGO) spécialisée dans la création et la gestion de Fonds Communs de Placement (FCP). Un FCP permet de mettre en commun son épargne avec d'autres investisseurs pour investir dans un large éventail de titres (actions, obligations, bons du Trésor).",
                'description_en' => "Coris Asset Management (CAM) SA is a Collective Investment Scheme Management Company (SGO) specialising in the creation and management of Mutual Funds (FCPs). An FCP pools savings with other investors to collectively invest across a broad range of securities (equities, bonds, treasury bills).",
                'mission'        => "Promouvoir la culture boursière par une offre de services de qualité, diversifiés et adaptés à l'endroit de nos clients.",
                'mission_en'     => "Promote a savings and investment culture through quality, diversified and tailored service offerings for our clients.",
                'vision'         => "Afficher un portefeuille global d'actifs sous gestion de 5 milliards FCFA.",
                'valeurs'        => "Confiance · Réactivité · Excellence",
                'commentaires'   => "3 FCP distincts : FCP CORIS ACTIONS (actions cotées) · FCP CORIS PERFORMANCE (actions + obligations) · FCP ASSURANCES (obligations courte durée). Mise de départ minimale : 25 000 FCFA.",
                'logo'           => null,
                'website'        => 'https://www.coris-asset.com',
                'ordre'          => 10,
                'actif'          => true,
            ],
            // ── 11. Expertis BF ──────────────────────────────────────────────
            [
                'id'             => 'expertis-bf',
                'sigle'          => 'EXB',
                'nom'            => 'Expertis BF',
                'secteur'        => 'Immobilier',
                'secteur_slug'   => 'immobilier-capital',
                'pays'           => 'Burkina Faso',
                'ville'          => 'Ouagadougou',
                'description'    => "Spécialisée dans la tierce détention, le suivi d'exécution de projets, les investissements en capital-risque, la promotion immobilière et la maîtrise d'ouvrage déléguée.",
                'description_en' => "Specialised in third-party custody, project execution monitoring, venture capital investment, property development and delegated project ownership in Burkina Faso.",
                'mission'        => "Accompagner les porteurs de projets immobiliers et d'investissement avec rigueur et expertise, en garantissant la sécurité et la performance des opérations.",
                'mission_en'     => "Support real estate and investment project developers with rigour and expertise, ensuring the security and performance of operations.",
                'logo'           => null,
                'website'        => 'https://www.expertis-sa.com',
                'ordre'          => 11,
                'actif'          => true,
            ],
            // ── 12. Expertis CI ──────────────────────────────────────────────
            [
                'id'             => 'expertis-ci',
                'sigle'          => 'EXC',
                'nom'            => 'Expertis CI',
                'secteur'        => 'Immobilier',
                'secteur_slug'   => 'immobilier-capital',
                'pays'           => "Côte d'Ivoire",
                'ville'          => 'Abidjan',
                'description'    => "Spécialisée dans la tierce détention, le suivi d'exécution de projets, les investissements en capital-risque, la promotion immobilière et la maîtrise d'ouvrage déléguée en Côte d'Ivoire.",
                'description_en' => "Specialised in third-party custody, project execution monitoring, venture capital investment, property development and delegated project ownership in Côte d'Ivoire.",
                'mission'        => "Développer et sécuriser les investissements immobiliers et en capital-risque sur le marché ivoirien.",
                'mission_en'     => "Develop and secure real estate and venture capital investments on the Ivorian market.",
                'logo'           => null,
                'website'        => null,
                'ordre'          => 12,
                'actif'          => true,
            ],
            // ── 13. Excelis ──────────────────────────────────────────────────
            [
                'id'             => 'excelis',
                'sigle'          => 'EX',
                'nom'            => 'Excelis',
                'secteur'        => 'Solutions numériques et services financiers digitaux',
                'secteur_slug'   => 'technologies-fintech',
                'pays'           => 'Burkina Faso',
                'ville'          => 'Ouagadougou',
                'description'    => "Excelis SA (anciennement M2i SA — Monétique, Informatique et Identification) est la filiale technologique du groupe, créée en juin 2016. Son plan stratégique 2023-2027 vise à devenir « une fintech de référence, à la pointe de la technologie et capable d'accompagner efficacement le Groupe Coris dans sa stratégie de digitalisation ». Capital social : 100 000 000 FCFA.",
                'description_en' => "Excelis SA (formerly M2i SA — Electronic Payments, IT and Identification) is the group's technology subsidiary, created in June 2016. Its 2023-2027 strategic plan aims to become 'a reference fintech, at the cutting edge of technology and capable of effectively supporting the Coris Group in its digitalisation strategy'. Share capital: 100,000,000 FCFA.",
                'mission'        => "Accompagner efficacement le Groupe Coris dans sa stratégie de digitalisation avec l'aide de technologies émergentes et novatrices, en promouvant le développement d'une offre diversifiée, innovante et sécurisée de solutions numériques.",
                'mission_en'     => "Effectively support the Coris Group in its digitalisation strategy using emerging and innovative technologies, promoting the development of a diversified, innovative and secure range of digital solutions.",
                'vision'         => "Être à l'horizon 2027 un centre d'excellence et une référence en matière de technologie et d'innovation.",
                'valeurs'        => "Esprit d'équipe · Rigueur · Audace · Solidarité · Promptitude · Flexibilité",
                'commentaires'   => "Certifications : PCI DSS V3.1 (2023), PCI DSS V4 (2024). Réalisations : switch monétique PAYWAY, centre de personnalisation de cartes bancaires, Plateforme Coris Money.",
                'logo'           => null,
                'website'        => 'https://www.excelis-sa.com',
                'ordre'          => 13,
                'actif'          => true,
            ],
            // ── 14. IAG ──────────────────────────────────────────────────────
            [
                'id'             => 'industries-arts-graphiques',
                'sigle'          => 'IAG',
                'nom'            => 'Industries des Arts Graphiques',
                'secteur'        => 'Industrie',
                'secteur_slug'   => 'industrie',
                'pays'           => 'Burkina Faso',
                'ville'          => 'Ouagadougou',
                'description'    => "Spécialisée dans l'imprimerie, la conception graphique, la signalétique et la sécurisation de documents sensibles, tels que les timbres, diplômes et attestations automobiles.",
                'description_en' => "Specialised in printing, graphic design, signage and security printing for sensitive documents such as stamps, diplomas and vehicle certificates.",
                'mission'        => "Fournir des solutions graphiques et d'imprimerie de haute qualité, notamment pour la sécurisation documentaire des institutions publiques et privées.",
                'mission_en'     => "Provide high-quality graphic and printing solutions, particularly for document security for public and private institutions.",
                'logo'           => null,
                'website'        => null,
                'ordre'          => 14,
                'actif'          => true,
            ],
            // ── 15. Energytis ────────────────────────────────────────────────
            [
                'id'             => 'energytis',
                'sigle'          => 'ET',
                'nom'            => 'Energytis',
                'secteur'        => 'Énergies et distribution',
                'secteur_slug'   => 'energie',
                'pays'           => 'Burkina Faso',
                'ville'          => 'Ouagadougou',
                'description'    => "Spécialisée dans l'étude, l'ingénierie, le développement, le financement, la construction et l'exploitation de sites de production d'énergie.",
                'description_en' => "Specialised in the study, engineering, development, financing, construction and operation of energy production sites.",
                'mission'        => "Développer des projets d'énergie renouvelable et conventionnelle pour répondre aux besoins croissants en électricité en Afrique.",
                'mission_en'     => "Develop renewable and conventional energy projects to meet the growing electricity needs of Africa.",
                'logo'           => null,
                'website'        => null,
                'ordre'          => 16,
                'actif'          => true,
            ],
            // ── 16. General Mining Logistics ─────────────────────────────────
            [
                'id'             => 'general-mining-logistics',
                'sigle'          => 'GML',
                'nom'            => 'General Mining Logistics TS',
                'secteur'        => "Distribution de produits pétroliers, ingénierie et production d'énergie",
                'secteur_slug'   => 'logistique-miniere',
                'pays'           => 'Burkina Faso',
                'ville'          => 'Ouagadougou',
                'description'    => "Intervient dans les services logistiques, techniques et opérationnels au profit des secteurs minier et industriel, notamment dans le transport d'agrégats miniers et l'appui aux opérations sur site.",
                'description_en' => "Provides logistics, technical and operational services for the mining and industrial sectors, including transport of mining aggregates and on-site operational support.",
                'mission'        => "Assurer des solutions logistiques fiables et sécurisées pour les industries minières et extractives en Afrique.",
                'mission_en'     => "Provide reliable and secure logistics solutions for mining and extractive industries in Africa.",
                'logo'           => null,
                'website'        => null,
                'ordre'          => 17,
                'actif'          => true,
            ],
        ];

        // Supprimer Oxy Conseil (non retenu dans le périmètre)
        DB::table('filiales')->where('id', 'oxy-conseil')->delete();

        foreach ($filiales as $f) {
            $f['created_at'] = now();
            $f['updated_at'] = now();
            DB::table('filiales')->upsert($f, ['id'], array_keys(array_diff_key($f, ['id' => ''])));
        }
        $this->command->info(count($filiales) . ' filiales seeded');

        // ----------------------------------------------------------------
        // Metiers (10 secteurs — marchés financiers fusionné dans services financiers,
        //          industrie et agribusiness séparés)
        // ----------------------------------------------------------------

        // Supprimer l'ancien secteur marchés-financiers (fusionné dans services-financiers)
        DB::table('metiers')->where('slug', 'marches-financiers')->delete();

        // Migrer coris-bourse et coris-asset-management vers services-financiers
        DB::table('filiales')
            ->whereIn('id', ['coris-bourse', 'coris-asset-management'])
            ->update(['secteur_slug' => 'services-financiers', 'updated_at' => now()]);

        $metiers = [
            [
                'id'              => Str::random(25),
                'slug'            => 'services-financiers',
                'titre'           => 'Services Financiers & Intermédiation',
                'titre_en'        => 'Financial Services & Intermediation',
                'icone'           => 'briefcase',
                'couleur'         => 'linear-gradient(135deg, #1A6B7A, #0F4855)',
                'description'     => "Intermédiation bancaire, structuration financière, recouvrement, gestion de créances, bourse et gestion d'actifs.",
                'description_en'  => "Banking intermediation, financial structuring, debt recovery, asset management, stock brokerage and collective investment funds.",
                'enjeux'          => "Dans une économie africaine en forte croissance, l'accès au financement et la gestion saine des créances constituent des piliers de la stabilité financière.",
                'enjeux_en'       => "In a fast-growing African economy, access to financing and sound management of receivables are pillars of financial stability.",
                'contribution'    => "EIG positionne ses filiales financières comme des facilitateurs clés pour les entreprises et institutions locales, couvrant l'intermédiation bancaire jusqu'aux marchés financiers.",
                'contribution_en' => "EIG positions its financial subsidiaries as key facilitators for local companies and institutions, covering banking intermediation through to capital markets.",
                'filiales_ids'    => json_encode(['intermediaire-des-services', 'loans-recovery-company', 'coris-bourse', 'coris-asset-management']),
                'ordre'           => 1,
                'actif'           => true,
            ],
            [
                'id'              => Str::random(25),
                'slug'            => 'assurance',
                'titre'           => 'Assurance',
                'titre_en'        => 'Insurance',
                'icone'           => 'shield-halved',
                'couleur'         => 'linear-gradient(135deg, #2A6B4A, #1A4A32)',
                'description'     => 'Assurances vie et non vie.',
                'description_en'  => 'Life and non-life insurance.',
                'enjeux'          => "La protection des personnes et des biens est un levier essentiel de résilience économique pour les ménages et les entreprises.",
                'enjeux_en'       => "Protection of people and assets is an essential lever for economic resilience for households and businesses.",
                'contribution'    => "Avec 4 entités d'assurance vie et non-vie dans 2 pays, EIG couvre un spectre complet de la protection financière régionale.",
                'contribution_en' => "With 4 life and non-life insurance entities across 2 countries, EIG covers a comprehensive spectrum of regional financial protection.",
                'filiales_ids'    => json_encode(['coris-assurance-iard-bf', 'coris-assurance-vie-bf', 'coris-assurance-iard-ci', 'coris-assurance-vie-ci']),
                'ordre'           => 2,
                'actif'           => true,
            ],
            [
                'id'              => Str::random(25),
                'slug'            => 'immobilier-capital',
                'titre'           => 'Immobilier',
                'titre_en'        => 'Real Estate',
                'icone'           => 'building',
                'couleur'         => 'linear-gradient(135deg, #6B4A1A, #4A3010)',
                'description'     => "Promotion immobilière, maîtrise d'ouvrage déléguée et tierce détention.",
                'description_en'  => "Property development, delegated project ownership and third-party custody.",
                'enjeux'          => "Le déficit de logements et d'infrastructures en Afrique représente à la fois un défi social et une opportunité d'investissement structurante.",
                'enjeux_en'       => "The housing and infrastructure deficit in Africa represents both a social challenge and a structuring investment opportunity.",
                'contribution'    => "EIG accompagne les maîtres d'ouvrage publics et privés tout en prenant des participations dans des projets à fort potentiel de création de valeur.",
                'contribution_en' => "EIG supports public and private project owners while taking stakes in projects with strong value-creation potential.",
                'filiales_ids'    => json_encode(['expertis-bf', 'expertis-ci']),
                'ordre'           => 3,
                'actif'           => true,
            ],
            [
                'id'              => Str::random(25),
                'slug'            => 'energie',
                'titre'           => 'Énergies et distribution',
                'titre_en'        => 'Energy & Distribution',
                'icone'           => 'bolt',
                'couleur'         => 'linear-gradient(135deg, #1A4A6B, #102A4A)',
                'description'     => "Distribution de produits pétroliers, solutions solaires et ingénierie de production d'énergie.",
                'description_en'  => "Petroleum product distribution, solar solutions and energy production engineering.",
                'enjeux'          => "L'accès à l'énergie est un défi majeur en Afrique subsaharienne. La transition énergétique offre un champ d'opportunités considérable.",
                'enjeux_en'       => "Access to energy is a major challenge in sub-Saharan Africa. The energy transition offers a considerable field of opportunities.",
                'contribution'    => "EIG s'engage dans toute la chaîne de valeur énergétique, de la distribution traditionnelle aux nouvelles énergies renouvelables.",
                'contribution_en' => "EIG is committed across the entire energy value chain, from traditional distribution to new renewable energies.",
                'filiales_ids'    => json_encode(['barka-energies', 'energytis']),
                'ordre'           => 4,
                'actif'           => true,
            ],
            [
                'id'              => Str::random(25),
                'slug'            => 'technologies-fintech',
                'titre'           => 'Solutions numériques et services financiers digitaux',
                'titre_en'        => 'Digital Solutions and Digital Financial Services',
                'icone'           => 'microchip',
                'couleur'         => 'linear-gradient(135deg, #4A1A2A, #3A1020)',
                'description'     => 'Solutions numériques, digitalisation, monétique, paiement digital et services financiers digitaux.',
                'description_en'  => 'Digital solutions, digitalisation, payment technology, digital payments and digital financial services.',
                'enjeux'          => "La révolution numérique transforme l'accès aux services financiers et offre des opportunités d'inclusion économique sans précédent.",
                'enjeux_en'       => "The digital revolution is transforming access to financial services and offering unprecedented economic inclusion opportunities.",
                'contribution'    => 'Excelis, la fintech du groupe, développe des solutions digitales innovantes au service de la modernisation du secteur financier africain.',
                'contribution_en' => "Excelis, the group's fintech subsidiary, develops innovative digital solutions to modernise the African financial sector.",
                'filiales_ids'    => json_encode(['excelis']),
                'ordre'           => 5,
                'actif'           => true,
            ],
            [
                'id'              => Str::random(25),
                'slug'            => 'industrie',
                'titre'           => 'Industrie',
                'titre_en'        => 'Industry',
                'icone'           => 'print',
                'couleur'         => 'linear-gradient(135deg, #2A4A1A, #1A3010)',
                'description'     => 'Imprimerie, signalétique, conception graphique et sécurisation de documents sensibles.',
                'description_en'  => 'Printing, signage, graphic design and security printing for sensitive documents.',
                'enjeux'          => "La sécurisation des documents officiels et la production de supports de communication de qualité sont des besoins croissants dans la région.",
                'enjeux_en'       => "The security of official documents and the production of quality communication materials are growing needs in the region.",
                'contribution'    => "EIG contribue à la sécurisation documentaire de l'État et des institutions à travers une filiale spécialisée et reconnue.",
                'contribution_en' => "EIG contributes to document security for the State and institutions through a specialised and recognised subsidiary.",
                'filiales_ids'    => json_encode(['industries-arts-graphiques']),
                'ordre'           => 6,
                'actif'           => true,
            ],
            [
                'id'              => Str::random(25),
                'slug'            => 'agribusiness',
                'titre'           => 'Agribusiness',
                'titre_en'        => 'Agribusiness',
                'icone'           => 'wheat-awn',
                'couleur'         => 'linear-gradient(135deg, #3A5A1A, #2A4010)',
                'description'     => "Investissements dans les filières agricoles, agroalimentaires et de transformation en Afrique.",
                'description_en'  => "Investments in agricultural, agri-food and processing value chains in Africa.",
                'enjeux'          => "L'agriculture est le moteur de l'économie africaine. Le développement de filières structurées est un levier essentiel de souveraineté alimentaire.",
                'enjeux_en'       => "Agriculture is the engine of the African economy. The development of structured value chains is an essential lever for food sovereignty.",
                'contribution'    => "EIG développe sa présence dans l'agribusiness pour accompagner la transformation des filières agricoles africaines.",
                'contribution_en' => "EIG is developing its presence in agribusiness to support the transformation of African agricultural value chains.",
                'filiales_ids'    => json_encode([]),
                'ordre'           => 7,
                'actif'           => true,
            ],
            [
                'id'              => Str::random(25),
                'slug'            => 'logistique-miniere',
                'titre'           => "Distribution de produits pétroliers, ingénierie et production d'énergie",
                'titre_en'        => "Petroleum Distribution, Engineering & Energy Production",
                'icone'           => 'truck',
                'couleur'         => 'linear-gradient(135deg, #4A3A1A, #3A2A10)',
                'description'     => "Logistique, transport d'agrégats miniers et services opérationnels pour les industries extractives.",
                'description_en'  => "Logistics, transport of mining aggregates and operational services for extractive industries.",
                'enjeux'          => "L'industrie minière burkinabè est un secteur clé de l'économie nationale, nécessitant des prestataires logistiques fiables et spécialisés.",
                'enjeux_en'       => "The Burkinabe mining industry is a key sector of the national economy, requiring reliable and specialised logistics providers.",
                'contribution'    => 'General Mining Logistics TS offre des services logistiques de qualité aux opérateurs miniers, soutenant la chaîne de valeur extractive nationale.',
                'contribution_en' => 'General Mining Logistics TS provides quality logistics services to mining operators, supporting the national extractive value chain.',
                'filiales_ids' => json_encode(['general-mining-logistics']),
                'ordre'        => 8,
                'actif'        => true,
            ],
            [
                'id'              => Str::random(25),
                'slug'            => 'hotellerie',
                'titre'           => 'Hôtellerie & Restauration',
                'titre_en'        => 'Hospitality & Catering',
                'icone'           => 'hotel',
                'couleur'         => 'linear-gradient(135deg, #1A2A6B, #101A4A)',
                'description'     => "Hébergement haut de gamme, restauration et services d'accueil.",
                'description_en'  => "Premium accommodation, catering and hospitality services.",
                'enjeux'          => "Le développement économique génère des besoins croissants en infrastructures d'accueil pour les hommes d'affaires et les touristes.",
                'enjeux_en'       => "Economic development generates growing demand for accommodation infrastructure for business travellers and tourists.",
                'contribution'    => "Sopatel Silmandé est une référence hôtelière, symbolisant l'ancrage territorial et le rayonnement d'EIG.",
                'contribution_en' => "Sopatel Silmandé is a hospitality reference, symbolising EIG's territorial presence and influence.",
                'filiales_ids'    => json_encode(['sopatel-silmande']),
                'ordre'           => 9,
                'actif'           => true,
            ],
        ];

        foreach ($metiers as $m) {
            $m['created_at'] = now();
            $m['updated_at'] = now();
            DB::table('metiers')->upsert($m, ['slug'], array_keys(array_diff_key($m, ['id' => '', 'slug' => ''])));
        }
        $this->command->info(count($metiers) . ' metiers seeded');

        // ----------------------------------------------------------------
        // Articles (sans référence Bloomfield)
        // ----------------------------------------------------------------
        $articles = [
            [
                'id'         => Str::random(25),
                'slug'       => 'lancement-site-institutionnel-2026',
                'titre'      => 'Excellis Invest Group lance son nouveau site internet institutionnel',
                'titre_en'   => 'Excellis Invest Group launches its new institutional website',
                'categorie'  => 'Corporate',
                'date'       => 'Avril 2026',
                'extrait'    => "Marquant une nouvelle étape dans sa stratégie de visibilité digitale, EIG se dote d'une plateforme institutionnelle de premier rang.",
                'extrait_en' => "Marking a new milestone in its digital visibility strategy, EIG launches a flagship institutional platform.",
                'contenu'    => "Excellis Invest Group franchit une nouvelle étape dans sa stratégie de communication et de visibilité digitale avec le lancement de son site internet institutionnel. Cette plateforme reflète l'ambition panafricaine du Groupe et consolide sa présence digitale auprès de ses partenaires, investisseurs et filiales.",
                'contenu_en' => "Excellis Invest Group takes a new step in its communication and digital visibility strategy with the launch of its institutional website. This platform reflects the Group's pan-African ambition and strengthens its digital presence with partners, investors and subsidiaries.",
                'couleur'    => 'linear-gradient(135deg, #1A6B7A, #0F4855)',
                'featured'   => true,
                'image'      => null,
                'publie'     => true,
            ],
            [
                'id'         => Str::random(25),
                'slug'       => 'excelis-fintech-deploiement',
                'titre'      => 'Excelis accélère le déploiement de ses solutions fintech',
                'titre_en'   => 'Excelis accelerates the deployment of its fintech solutions',
                'categorie'  => 'Filiales',
                'date'       => 'Mars 2026',
                'extrait'    => "La filiale technologique du Groupe multiplie ses partenariats stratégiques pour accélérer la digitalisation des services financiers en Afrique.",
                'extrait_en' => "The Group's technology subsidiary multiplies its strategic partnerships to accelerate the digitalisation of financial services in Africa.",
                'contenu'    => "Excelis, la fintech d'Excellis Invest Group, annonce l'accélération de son programme de déploiement de solutions numériques. La filiale renforce ses capacités en monétique, paiement digital et services financiers digitaux, contribuant à l'inclusion financière dans la sous-région.",
                'contenu_en' => "Excelis, Excellis Invest Group's fintech, announces the acceleration of its digital solutions deployment programme. The subsidiary strengthens its capabilities in electronic payments, digital payments and digital financial services, contributing to financial inclusion across the sub-region.",
                'couleur'    => 'linear-gradient(135deg, #2A6B4A, #1A4A32)',
                'featured'   => false,
                'image'      => null,
                'publie'     => true,
            ],
            [
                'id'         => Str::random(25),
                'slug'       => 'energytis-contrat-energie',
                'titre'      => "Energytis remporte un contrat d'envergure dans la production d'énergie",
                'titre_en'   => "Energytis wins a major contract in energy production",
                'categorie'  => 'Énergie',
                'date'       => 'Février 2026',
                'extrait'    => "La filiale spécialisée dans l'ingénierie énergétique consolide sa position sur le marché burkinabè et sous-régional.",
                'extrait_en' => "The energy engineering subsidiary consolidates its position on the Burkinabe and sub-regional market.",
                'contenu'    => "Energytis, filiale d'Excellis Invest Group spécialisée dans la production d'énergie, remporte un contrat d'envergure dans le secteur des énergies renouvelables. Cette victoire renforce le positionnement d'EIG dans la transition énergétique africaine.",
                'contenu_en' => "Energytis, Excellis Invest Group's energy production subsidiary, wins a major contract in the renewable energy sector. This victory strengthens EIG's positioning in the African energy transition.",
                'couleur'    => 'linear-gradient(135deg, #6B4A1A, #4A3010)',
                'featured'   => false,
                'image'      => null,
                'publie'     => true,
            ],
            [
                'id'         => Str::random(25),
                'slug'       => 'eig-expansion-africaine-2026',
                'titre'      => "Excellis Invest Group renforce son empreinte sur le périmètre africain",
                'titre_en'   => "Excellis Invest Group strengthens its African footprint",
                'categorie'  => 'Corporate',
                'date'       => 'Janvier 2026',
                'extrait'    => "Avec +700 collaborateurs et 16 filiales actives, EIG consolide sa stratégie d'expansion multisectorielle en Afrique.",
                'extrait_en' => "With +700 employees and 17 active subsidiaries, EIG consolidates its multi-sectoral expansion strategy in Africa.",
                'contenu'    => "Excellis Invest Group, holding multisectorielle fondée en 2019 et basée au Burkina Faso, consolide sa présence africaine avec un portefeuille de filiales couvrant 9 secteurs stratégiques. Le Groupe compte désormais plus de 700 collaborateurs engagés dans la transformation économique du continent africain.",
                'contenu_en' => "Excellis Invest Group, a multisectoral holding founded in 2019 and headquartered in Burkina Faso, consolidates its African presence with a portfolio of subsidiaries covering 9 strategic sectors. The Group now employs over 700 people committed to the economic transformation of the African continent.",
                'couleur'    => 'linear-gradient(135deg, #0F4855, #0F1924)',
                'featured'   => false,
                'image'      => null,
                'publie'     => true,
            ],
        ];

        foreach ($articles as $a) {
            $a['created_at'] = now();
            $a['updated_at'] = now();
            DB::table('articles')->upsert($a, ['slug'], array_keys(array_diff_key($a, ['id' => '', 'slug' => ''])));
        }
        $this->command->info(count($articles) . ' articles seeded');

        // ----------------------------------------------------------------
        // Company Info (sans Bloomfield, sans ex Coris, KPIs mis à jour)
        // ----------------------------------------------------------------
        $companyData = [
            'nom'              => 'Excellis Invest Group',
            'tagline'          => 'Investir autrement',
            'descriptionCourte'    => "Excellis Invest Group est une holding multisectorielle capitalisée à 20 milliards FCFA, développant ses activités dans plusieurs secteurs stratégiques en Afrique.",
            'descriptionCourte_en' => "Excellis Invest Group is a multisectoral holding capitalised at 20 billion FCFA, developing its activities across several strategic sectors in Africa.",
            'description'          => "Excellis Invest Group est une holding multisectorielle capitalisée à 20 milliards FCFA, développant ses activités dans plusieurs secteurs stratégiques en Afrique. Fondée en 2019 et basée au Burkina Faso, elle assure le pilotage stratégique et la gouvernance d'un portefeuille de filiales couvrant les services financiers, l'assurance, les énergies, l'immobilier, les technologies, l'industrie, le transport-logistique, l'hôtellerie et le commerce.",
            'description_en'       => "Excellis Invest Group is a multisectoral holding capitalised at 20 billion FCFA, developing its activities across several strategic sectors in Africa. Founded in 2019 and headquartered in Burkina Faso, it provides strategic management and governance of a portfolio of subsidiaries covering financial services, insurance, energy, real estate, technology, industry, logistics, hospitality and commerce.",
            'mission'              => "Mobiliser des expertises, des capitaux et des mécanismes d'intervention à forte valeur ajoutée pour accompagner les institutions et entreprises africaines dans leur financement, leur structuration et leur développement durable.",
            'mission_en'           => "Mobilise expertise, capital and high value-added intervention mechanisms to support African institutions and companies in their financing, structuring and sustainable development.",
            'vision'               => "Être un investisseur panafricain de référence.",
            'vision_en'            => "To be a reference pan-African investor.",
            'valeurs'          => [
                ['titre' => 'Rigueur',         'titre_en' => 'Rigour',       'icone' => 'scale-balanced',   'description' => "Des standards élevés dans toutes nos décisions d'investissement et dans notre gouvernance.",                              'description_en' => "High standards in all our investment decisions and governance."],
                ['titre' => 'Innovation',      'titre_en' => 'Innovation',   'icone' => 'lightbulb',        'description' => "Une culture de l'innovation au service de la modernisation des économies africaines.",                                   'description_en' => "A culture of innovation in service of modernising African economies."],
                ['titre' => 'Adaptabilité',    'titre_en' => 'Adaptability', 'icone' => 'arrows-rotate',    'description' => "Un modèle évolutif, ancré dans les réalités économiques africaines et ouvert aux opportunités.",                         'description_en' => "An evolving model, rooted in African economic realities and open to opportunities."],
                ['titre' => 'Accessibilité',   'titre_en' => 'Accessibility','icone' => 'universal-access', 'description' => "Des services et des investissements accessibles, au service du plus grand nombre.",                                     'description_en' => "Services and investments that are accessible, serving the greatest number."],
                ['titre' => "Esprit d'équipe", 'titre_en' => 'Team Spirit',  'icone' => 'handshake',        'description' => "Une synergie des filiales et des talents pour créer une valeur collective supérieure.",                                  'description_en' => "A synergy of subsidiaries and talent to create superior collective value."],
            ],
            'kpis' => [
                ['num' => '+700', 'unite' => '',    'label' => 'Collaborateurs'],
                ['num' => '16',   'unite' => '',    'label' => 'Filiales opérationnelles'],
                ['num' => '9',    'unite' => '',    'label' => 'Secteurs stratégiques'],
                ['num' => '2',    'unite' => '',    'label' => 'Pays (BF + CI)'],
                ['num' => '2019', 'unite' => '',    'label' => 'Année de création'],
            ],
            'gouvernancePiliers' => [
                ['num' => '01', 'titre' => 'Rigueur & Transparence',       'titre_en' => 'Rigour & Transparency',        'texte' => "Gouvernance en SA de droit burkinabè, structure financière solide",          'texte_en' => "Governance as a joint-stock company under Burkinabe law, solid financial structure"],
                ['num' => '02', 'titre' => 'Adaptabilité & Innovation',    'titre_en' => 'Adaptability & Innovation',    'texte' => "Modèle évolutif, ancré dans les réalités africaines",                        'texte_en' => "Evolving model, rooted in African realities"],
                ['num' => '03', 'titre' => 'Création de Valeur Durable',   'titre_en' => 'Sustainable Value Creation',   'texte' => "Investissements de long terme dans les secteurs structurants",               'texte_en' => "Long-term investments in structuring sectors"],
                ['num' => '04', 'titre' => 'Esprit de Partenariat',        'titre_en' => 'Spirit of Partnership',        'texte' => "Croissance en synergie avec les partenaires institutionnels",                'texte_en' => "Growth in synergy with institutional partners"],
                ['num' => '05', 'titre' => 'Performance & Responsabilité', 'titre_en' => 'Performance & Accountability', 'texte' => "Résultats mesurables, impact économique et social concret",                  'texte_en' => "Measurable results, concrete economic and social impact"],
            ],
            'adresse'   => 'Ouagadougou, Burkina Faso',
            'email'     => 'contact@excellis-invest-group.com',
            'telephone' => '+226 25 30 00 00',

            // ── Mot du Président ──────────────────────────────────────────
            'nom_president'      => 'Bintou Compaoré',
            'titre_president'    => "Présidente du Conseil d'Administration",
            'titre_president_en' => "Chairwoman of the Board of Directors",
            'photo_president'    => null,
            'mot_president'      => "Depuis la fondation d'Excellis Invest Group, notre ambition a toujours été de prouver qu'il est possible d'investir autrement en Afrique : avec rigueur, avec vision, et avec un ancrage profond dans les réalités de notre continent. Chaque filiale que nous avons construite, chaque partenariat que nous avons noué, témoigne de notre engagement à créer une valeur durable — pour nos actionnaires, pour nos collaborateurs et pour les économies dans lesquelles nous opérons. Notre gouvernance est le socle de cette ambition : exigeante, transparente et tournée vers l'avenir.",
            'mot_president_en'   => "Since the founding of Excellis Invest Group, our ambition has always been to prove that it is possible to invest differently in Africa: with rigour, with vision, and with deep roots in the realities of our continent. Every subsidiary we have built, every partnership we have forged, bears witness to our commitment to creating lasting value — for our shareholders, our employees and the economies in which we operate. Our governance is the foundation of this ambition: demanding, transparent and forward-looking.",

            // ── Mot du Directeur Général ──────────────────────────────────
            'nom_dg'      => 'Issouf Compaoré',
            'titre_dg'    => 'Directeur Général',
            'titre_dg_en' => 'Chief Executive Officer',
            'photo_dg'    => null,
            'mot_dg'      => "Notre modèle repose sur une conviction simple : les marchés africains recèlent des opportunités considérables pour ceux qui s'y engagent avec méthode et persévérance. En sept ans, Excellis Invest Group a su identifier, structurer et accompagner des filiales dans 9 secteurs stratégiques. Cette diversification n'est pas une fin en soi — elle est le reflet de notre capacité d'adaptation et de notre lecture des besoins réels du tissu économique africain. Nous restons résolument tournés vers la croissance, l'innovation et la création de valeur partagée.",
            'mot_dg_en'   => "Our model rests on a simple conviction: African markets hold considerable opportunities for those who engage with method and perseverance. In seven years, Excellis Invest Group has identified, structured and supported subsidiaries across 9 strategic sectors. This diversification is not an end in itself — it reflects our capacity for adaptation and our reading of the real needs of the African economic fabric. We remain resolutely focused on growth, innovation and the creation of shared value.",
        ];

        DB::table('company_infos')->upsert([
            [
                'id'         => 'main',
                'data'       => json_encode($companyData),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ], ['id'], ['data', 'updated_at']);

        $this->command->info('Company info seeded');

        // ----------------------------------------------------------------
        // Dirigeants
        //   categorie : 'conseil' | 'dg' | 'direction'
        //   responsabilites : JSON array
        // ----------------------------------------------------------------
        $dirigeants = [

            // ── Présidente du CA (aussi affichée dans company.nom_president) ──
            [
                'id'              => 'pca',
                'nom'             => 'Bintou Compaoré',
                'role'            => "Présidente du Conseil d'Administration",
                'categorie'       => 'conseil',
                'bio'             => "Bintou Compaoré préside le Conseil d'Administration d'Excellis Invest Group depuis sa fondation en 2019. Pionnière de l'investissement institutionnel en Afrique de l'Ouest, elle a bâti un groupe multisectoriel à partir d'une vision claire : démontrer qu'il est possible d'investir avec rigueur, avec ambition et avec un ancrage profond dans les réalités africaines. Son leadership a été décisif dans la structuration de la gouvernance du Groupe, dans l'obtention de la notation Bloomfield et dans le développement d'un portefeuille de 16 filiales couvrant 9 secteurs stratégiques.",
                'responsabilites' => json_encode([
                    "Présider les séances du Conseil d'Administration",
                    "Arrêter les orientations stratégiques et le plan de développement",
                    "Superviser la gouvernance, le contrôle interne et la conformité",
                    "Valider les grandes décisions d'investissement et de croissance externe",
                    "Représenter le Conseil auprès des régulateurs et partenaires institutionnels",
                ]),
                'expertise'       => "Gouvernance de holdings et droit des sociétés\nFinance institutionnelle et investissement stratégique\nRelations avec les régulateurs et institutions financières africaines\nDéveloppement des marchés de capitaux",
                'formation'       => "MBA Finance Internationale – INSEAD, Fontainebleau (1994)\nMaîtrise en Droit des Affaires – Université de Paris II Assas (1991)",
                'experiences'     => "Présidente du CA – Excellis Invest Group (2019 – présent)\nDirectrice Générale – Fonds d'Investissement UEMOA, Dakar (2008 – 2018)\nDirectrice des Marchés de Capitaux – Banque Ouest Africaine de Développement (2001 – 2008)\nConseillère Investissements – Groupe Bolloré Afrique, Paris (1994 – 2001)",
                'linkedin'        => null,
                'photo'           => null,
                'ordre'           => 0,
                'actif'           => true,
            ],

            // ── Directeur Général ──────────────────────────────────────────
            [
                'id'              => 'dg',
                'nom'             => 'Issouf Compaoré',
                'role'            => 'Directeur Général',
                'categorie'       => 'dg',
                'bio'             => "Issouf Compaoré dirige Excellis Invest Group depuis sa transformation en holding multisectorielle en 2019. Fort de plus de 22 ans d'expérience dans la finance et l'investissement en Afrique subsaharienne, il incarne la vision panafricaine du Groupe : mobiliser des capitaux privés au service du développement économique durable de la sous-région. Sous sa direction, EIG a structuré un portefeuille de 16 filiales couvrant 9 secteurs stratégiques, avec plus de 700 collaborateurs engagés à travers le périmètre africain.",
                'responsabilites' => json_encode([
                    "Piloter la stratégie opérationnelle et financière du Groupe",
                    "Coordonner les synergies entre les 16 filiales",
                    "Représenter EIG auprès des investisseurs, partenaires et régulateurs",
                    "Assurer la performance globale du portefeuille de participations",
                    "Rendre compte au Conseil d'Administration",
                    "Animer et piloter le Comité de Direction",
                ]),
                'expertise'       => "Stratégie d'investissement\nFinance d'entreprise et structuration\nGouvernance de holdings\nDéveloppement des marchés financiers africains\nRelations institutionnelles et partenariats stratégiques",
                'formation'       => "MBA Finance & Stratégie – HEC Paris (2002)\nMaster 2 Économie Internationale – Université Paris I Panthéon-Sorbonne (2000)\nLicence en Sciences Économiques – Université de Ouagadougou (1998)",
                'experiences'     => "Directeur Général – Excellis Invest Group, Ouagadougou (2019 – présent)\nDirecteur des Investissements – Coris Bank International (2012 – 2018)\nResponsable Pôle Financement – BOAD, Lomé (2007 – 2012)\nAnalyste Financier Senior – Société Générale, Paris (2002 – 2007)",
                'linkedin'        => null,
                'photo'           => null,
                'ordre'           => 1,
                'actif'           => true,
            ],

            // ── Comité de Direction ────────────────────────────────────────

            [
                'id'              => 'daf',
                'nom'             => 'Aminata Sawadogo',
                'role'            => 'Directrice Administrative & Financière',
                'categorie'       => 'direction',
                'bio'             => "Aminata Sawadogo supervise l'ensemble des fonctions financières d'Excellis Invest Group : reporting consolidé, gestion de trésorerie et relations avec les investisseurs. Reconnue pour sa rigueur et son excellence opérationnelle, elle garantit la solidité de la structure financière du Groupe et sa crédibilité auprès des partenaires financiers internationaux.",
                'responsabilites' => json_encode([
                    "Superviser le reporting financier consolidé du Groupe",
                    "Gérer la trésorerie et les flux financiers inter-filiales",
                    "Piloter la relation avec l'agence de notation Bloomfield",
                    "Coordonner les levées de fonds et financements structurés",
                    "Animer le contrôle de gestion et l'audit interne",
                ]),
                'expertise'       => "Consolidation financière et reporting IFRS\nGestion de trésorerie et cash management\nRelations investisseurs\nAudit interne et contrôle de gestion\nIngénierie financière et levée de fonds",
                'formation'       => "DESCF – Ouagadougou (2003)\nMaster CCA – IAE de Lyon (2001)\nLicence Comptabilité & Gestion – Université de Ouagadougou (1999)",
                'experiences'     => "DAF – Excellis Invest Group (2019 – présent)\nDirectrice Financière – Coris Assurance IARD BF (2014 – 2019)\nResponsable Contrôle de Gestion – Société Générale Burkina Faso (2008 – 2014)\nAuditrice – KPMG Côte d'Ivoire (2003 – 2008)",
                'linkedin'        => null,
                'photo'           => null,
                'ordre'           => 2,
                'actif'           => true,
            ],

            [
                'id'              => 'djuridique',
                'nom'             => 'Seydou Ouédraogo',
                'role'            => 'Directeur Juridique & Conformité',
                'categorie'       => 'direction',
                'bio'             => "Seydou Ouédraogo garantit la sécurité juridique et la conformité réglementaire de l'ensemble du Groupe et de ses filiales, dans un environnement multi-juridictionnel couvrant le Burkina Faso et la Côte d'Ivoire. Expert du droit des affaires OHADA et de la régulation CIMA, il accompagne les opérations de croissance externe du Groupe.",
                'responsabilites' => json_encode([
                    "Assurer la conformité réglementaire multi-juridictionnelle (OHADA, CIMA, BRVM)",
                    "Piloter la veille juridique et réglementaire du Groupe",
                    "Accompagner les opérations de croissance externe et due diligence",
                    "Gérer les relations avec les autorités de régulation",
                    "Superviser le secrétariat des organes de gouvernance",
                ]),
                'expertise'       => "Droit des affaires et droit OHADA\nRégulation des marchés financiers (AMF-UMOA, BRVM)\nConformité CIMA (assurance)\nFusions-acquisitions et due diligence juridique\nGouvernance d'entreprise et droit des sociétés",
                'formation'       => "Master 2 Droit des Affaires Internationales – Université Paris II Assas (2004)\nDEA Droit Privé – Université de Ouagadougou (2002)",
                'experiences'     => "Directeur Juridique & Conformité – Excellis Invest Group (2020 – présent)\nJuriste Senior – Coris Bank International (2013 – 2020)\nConseiller Juridique – Cabinet Badouel & Associés, Paris (2007 – 2013)",
                'linkedin'        => null,
                'photo'           => null,
                'ordre'           => 3,
                'actif'           => true,
            ],

            [
                'id'              => 'dops',
                'nom'             => 'Rasmané Kaboré',
                'role'            => 'Directeur des Opérations',
                'categorie'       => 'direction',
                'bio'             => "Rasmané Kaboré coordonne les synergies opérationnelles entre les 16 filiales du Groupe et pilote les projets de transformation organisationnelle. Il est le garant de la performance opérationnelle collective d'EIG, assurant la cohérence des processus et le déploiement des meilleures pratiques.",
                'responsabilites' => json_encode([
                    "Coordonner les synergies opérationnelles entre les filiales",
                    "Piloter les projets de transformation et d'optimisation",
                    "Déployer les meilleures pratiques opérationnelles du Groupe",
                    "Superviser le tableau de bord de performance",
                    "Assurer la continuité des activités et la gestion des risques opérationnels",
                ]),
                'expertise'       => "Management opérationnel multi-sites\nTransformation organisationnelle et gestion du changement\nGestion de projets complexes (PMI/Prince2)\nStratégie de croissance et synergies de groupe",
                'formation'       => "MBA Management & Stratégie – Grenoble École de Management (2006)\nIngénieur Industriel – Institut Supérieur de Technologie, Ouagadougou (2003)",
                'experiences'     => "Directeur des Opérations – Excellis Invest Group (2021 – présent)\nDirecteur des Opérations – Groupe TechAfrica, Ouagadougou (2016 – 2021)\nDirecteur des Opérations – Industries des Arts Graphiques (2010 – 2016)",
                'linkedin'        => null,
                'photo'           => null,
                'ordre'           => 4,
                'actif'           => true,
            ],

            [
                'id'              => 'drh',
                'nom'             => 'Mariam Traoré',
                'role'            => 'Directrice des Ressources Humaines',
                'categorie'       => 'direction',
                'bio'             => "Mariam Traoré pilote la politique RH du Groupe et de ses filiales. Elle œuvre au développement des talents, à la cohésion sociale et à la mise en place d'un cadre de travail stimulant pour les plus de 700 collaborateurs d'EIG.",
                'responsabilites' => json_encode([
                    "Définir et déployer la politique RH du Groupe",
                    "Piloter le recrutement et la fidélisation des cadres",
                    "Superviser les plans de formation et développement des compétences",
                    "Harmoniser les politiques de rémunération inter-filiales",
                    "Promouvoir la marque employeur d'EIG",
                ]),
                'expertise'       => "Gestion des talents et leadership\nDroit social et droit du travail OHADA\nPolitique de rémunération et avantages sociaux\nFormation et développement des compétences",
                'formation'       => "Master RH & Management – IAE de Bordeaux (2005)\nLicence Psychologie du Travail – Université de Ouagadougou (2002)",
                'experiences'     => "DRH – Excellis Invest Group (2020 – présent)\nDRH – Sopatel Silmandé (2014 – 2020)\nResponsable RH – Coris Bank International (2008 – 2014)",
                'linkedin'        => null,
                'photo'           => null,
                'ordre'           => 5,
                'actif'           => true,
            ],

            [
                'id'              => 'dcom',
                'nom'             => 'Fatimata Ouédraogo',
                'role'            => 'Directrice de la Communication',
                'categorie'       => 'direction',
                'bio'             => "Fatimata Ouédraogo pilote la stratégie de communication institutionnelle d'EIG, renforçant la notoriété du Groupe auprès des investisseurs, des partenaires et du grand public à travers l'ensemble des canaux digitaux et médias.",
                'responsabilites' => json_encode([
                    "Définir et mettre en œuvre la stratégie de communication du Groupe",
                    "Gérer les relations presse et médias (presse, radio, TV)",
                    "Superviser la communication digitale et les réseaux sociaux",
                    "Coordonner la production des publications institutionnelles",
                    "Organiser les événements corporate et institutionnels",
                ]),
                'expertise'       => "Communication institutionnelle et corporate\nRelations presse et médias\nMarketing digital et stratégie de contenu\nGestion de crise et réputation",
                'formation'       => "Master Communication & Relations Publiques – CELSA Paris-Sorbonne (2007)\nLicence Journalisme – ISSIC, Ouagadougou (2004)",
                'experiences'     => "Directrice Communication – Excellis Invest Group (2022 – présent)\nResponsable Communication – NSIA Groupe, Abidjan (2014 – 2022)\nChargée de Communication – BOAD, Lomé (2008 – 2014)",
                'linkedin'        => null,
                'photo'           => null,
                'ordre'           => 6,
                'actif'           => true,
            ],

            [
                'id'              => 'dsi',
                'nom'             => 'Ibrahim Sawadogo',
                'role'            => "Directeur des Systèmes d'Information",
                'categorie'       => 'direction',
                'bio'             => "Ibrahim Sawadogo supervise la transformation digitale d'Excellis Invest Group et pilote l'architecture des systèmes d'information. Il assure la sécurité, la disponibilité et l'évolution des infrastructures technologiques du Groupe.",
                'responsabilites' => json_encode([
                    "Définir la stratégie digitale et SI du Groupe",
                    "Superviser la sécurité informatique et la cybersécurité",
                    "Piloter les projets de transformation numérique",
                    "Assurer l'interopérabilité des systèmes entre les filiales",
                    "Gérer les relations avec les prestataires technologiques",
                ]),
                'expertise'       => "Architecture SI et transformation digitale\nCybersécurité et gouvernance IT\nCloud computing et infrastructures\nFintech et systèmes de paiement",
                'formation'       => "Master Informatique & Systèmes Distribués – Université Paris VI (2006)\nIngénieur Réseaux & Télécoms – ESMT, Dakar (2003)",
                'experiences'     => "DSI – Excellis Invest Group (2021 – présent)\nDirecteur IT – Excelis (2018 – 2021)\nResponsable Systèmes – Coris Bank International (2009 – 2018)",
                'linkedin'        => null,
                'photo'           => null,
                'ordre'           => 7,
                'actif'           => true,
            ],

            [
                'id'              => 'dcd',
                'nom'             => 'Abdoulaye Diallo',
                'role'            => 'Directeur du Développement Commercial',
                'categorie'       => 'direction',
                'bio'             => "Abdoulaye Diallo pilote le développement commercial du Groupe, identifie les opportunités de croissance et anime les relations avec les grands comptes et partenaires stratégiques d'Excellis Invest Group à travers l'Afrique de l'Ouest.",
                'responsabilites' => json_encode([
                    "Développer le portefeuille de partenaires stratégiques",
                    "Identifier et qualifier les opportunités d'investissement",
                    "Animer les relations avec les grands comptes institutionnels",
                    "Coordonner les activités commerciales des filiales",
                    "Piloter la stratégie de croissance externe du Groupe",
                ]),
                'expertise'       => "Développement commercial et business development\nMarketing institutionnel et B2B\nNégociation et structuration de partenariats\nAnalyse des marchés africains",
                'formation'       => "MBA Marketing et Stratégie Commerciale - Toulouse Business School (2005)\nLicence Commerce International - Université de Ouagadougou (2002)",
                'experiences'     => "Directeur Développement Commercial - Excellis Invest Group (2022 - présent)\nDirecteur Commercial - Expertis BF (2015 - 2022)\nResponsable Grands Comptes - Intermédiaire des Services (2008 - 2015)",
                'linkedin'        => null,
                'photo'           => null,
                'ordre'           => 8,
                'actif'           => true,
            ],

            [
                'id'              => 'dstrat',
                'nom'             => 'Oumar Compaoré',
                'role'            => 'Directeur de la Stratégie et du Développement',
                'categorie'       => 'direction',
                'bio'             => "Oumar Compaoré pilote la planification stratégique du Groupe et coordonne les projets de développement, d'expansion et de croissance externe. Il analyse les tendances des marchés africains pour identifier les opportunités d'investissement alignées avec la vision d'Excellis Invest Group.",
                'responsabilites' => json_encode([
                    "Définir et piloter le plan stratégique du Groupe",
                    "Identifier les opportunités de croissance externe et de diversification",
                    "Coordonner les projets d'expansion géographique",
                    "Conduire les analyses de marché et de positionnement",
                    "Assurer le suivi des objectifs stratégiques et des indicateurs de performance",
                ]),
                'expertise'       => "Planification stratégique et développement\nFusions-acquisitions et due diligence\nAnalyse des marchés africains\nFinance d'entreprise et valorisation",
                'formation'       => "MBA Finance et Stratégie - HEC Paris (2007)\nLicence Économie - Université de Ouagadougou (2003)",
                'experiences'     => "Directeur Stratégie - Excellis Invest Group (2022 - présent)\nAnalyste Senior - Coris Bank International (2014 - 2022)\nConsultant Stratégie - McKinsey Abidjan (2008 - 2014)",
                'linkedin'        => null,
                'photo'           => null,
                'ordre'           => 9,
                'actif'           => true,
            ],

            [
                'id'              => 'drisk',
                'nom'             => 'Aïcha Sané',
                'role'            => 'Directrice des Risques et de la Conformité',
                'categorie'       => 'direction',
                'bio'             => "Aïcha Sané supervise le dispositif de gestion des risques et de conformité du Groupe, garantissant la sécurité opérationnelle et réglementaire dans un environnement multi-juridictionnel. Elle veille à l'alignement des pratiques du Groupe avec les standards internationaux de gouvernance.",
                'responsabilites' => json_encode([
                    "Piloter la cartographie et la gestion des risques du Groupe",
                    "Assurer la conformité réglementaire multi-juridictionnelle",
                    "Superviser le contrôle interne et l'audit des filiales",
                    "Coordonner les relations avec les régulateurs et superviseurs",
                    "Déployer les politiques de prévention et de gestion de crise",
                ]),
                'expertise'       => "Gestion des risques financiers et opérationnels\nConformité bancaire et assurance (CIMA, BCEAO)\nAudit interne et contrôle de gestion\nGovernance et reporting ESG",
                'formation'       => "Master Risk Management - ESSEC Business School (2008)\nLicence Gestion - Université Cheikh Anta Diop, Dakar (2005)",
                'experiences'     => "Directrice Risques et Conformité - Excellis Invest Group (2023 - présent)\nResponsable Conformité - NSIA Groupe, Abidjan (2015 - 2023)\nAuditrice Senior - Deloitte Côte d'Ivoire (2009 - 2015)",
                'linkedin'        => null,
                'photo'           => null,
                'ordre'           => 10,
                'actif'           => true,
            ],

            [
                'id'              => 'dfiliales',
                'nom'             => 'Cheick Ouédraogo',
                'role'            => 'Directeur du Portefeuille Filiales',
                'categorie'       => 'direction',
                'bio'             => "Cheick Ouédraogo coordonne le pilotage opérationnel du portefeuille de filiales d'Excellis Invest Group, assurant la cohérence stratégique et la performance collective des entités du Groupe. Il est l'interface entre la holding et ses filiales opérationnelles.",
                'responsabilites' => json_encode([
                    "Superviser la performance opérationnelle des filiales",
                    "Coordonner les synergies et mutualisations inter-filiales",
                    "Piloter les projets de restructuration et d'optimisation",
                    "Assurer le reporting consolidé des filiales à la holding",
                    "Accompagner les dirigeants de filiales dans leur développement",
                ]),
                'expertise'       => "Management de portefeuille et holding\nStratégie et développement d'entreprise\nGestion multi-sectorielle en Afrique de l'Ouest\nTransformation organisationnelle",
                'formation'       => "MBA Management International - INSEAD (2009)\nIngénieur Génie Industriel - École Polytechnique de Montréal (2005)",
                'experiences'     => "Directeur Portefeuille Filiales - Excellis Invest Group (2021 - présent)\nDirecteur Général - Industries des Arts Graphiques (2016 - 2021)\nDirecteur des Opérations - Coris Assurance IARD BF (2010 - 2016)",
                'linkedin'        => null,
                'photo'           => null,
                'ordre'           => 11,
                'actif'           => true,
            ],
        ];

        foreach ($dirigeants as $d) {
            DB::table('dirigeants')->upsert($d, ['id'], array_keys(array_diff_key($d, ['id' => ''])));
        }
        $this->command->info(count($dirigeants) . ' dirigeants seeded (1 PCA + 1 DG + ' . (count($dirigeants) - 2) . ' comité de direction)');

        // ----------------------------------------------------------------
        // Carrieres
        // ----------------------------------------------------------------
        DB::table('carrieres')->delete();

        $carrieres = [
            [
                'id'              => Str::random(25),
                'titre'           => 'Analyste Financier Senior',
                'departement'     => 'Finance',
                'lieu'            => 'Ouagadougou, Burkina Faso',
                'type'            => 'CDI',
                'salaire'         => 'Selon profil et expérience',
                'date_expiration' => 'Juin 2026',
                'description'     => "Dans le cadre du renforcement de son équipe Finance, Excellis Invest Group recrute un(e) Analyste Financier Senior. Vous interviendrez sur l'analyse des performances financières du portefeuille de filiales, la préparation des reportings consolidés et le soutien aux décisions stratégiques d'investissement.",
                'missions'        => "Analyser les états financiers des filiales du Groupe et produire des rapports de synthèse mensuels\nPiloter le processus de consolidation financière trimestrielle\nSuivre les indicateurs de performance (KPIs) financiers du portefeuille\nPréparer les présentations pour le Comité de Direction et le Conseil d'Administration\nContribuer aux études de valorisation et aux analyses de rentabilité des projets d'investissement\nParticiper à la veille sur les marchés financiers africains (BRVM, UEMOA)",
                'profil'          => "Bac+5 en Finance, Comptabilité ou Gestion (Master CCA, DESCF, MBA Finance)\nMinimum 5 ans d'expérience dans un poste similaire (banque, cabinet d'audit, direction financière)\nMaîtrise des normes IFRS et du droit comptable OHADA\nExcellente maîtrise d'Excel et des outils de modélisation financière\nCapacité d'analyse, rigueur et sens du détail\nMaîtrise du français ; l'anglais est un plus",
                'avantages'       => "Rémunération attractive selon profil\nAssurance maladie groupe\nFormation continue et certifications professionnelles\nEnvironnement de travail stimulant au sein d'un groupe en pleine croissance\nOpportunités d'évolution vers des postes de direction",
                'actif'           => true,
            ],
            [
                'id'              => Str::random(25),
                'titre'           => 'Responsable Conformité & Contrôle Interne',
                'departement'     => 'Juridique',
                'lieu'            => 'Ouagadougou, Burkina Faso',
                'type'            => 'CDI',
                'salaire'         => 'Selon profil',
                'date_expiration' => 'Juin 2026',
                'description'     => "Excellis Invest Group recrute un(e) Responsable Conformité & Contrôle Interne pour renforcer son dispositif de gouvernance et assurer la conformité réglementaire de l'ensemble du Groupe et de ses filiales dans l'espace UEMOA.",
                'missions'        => "Mettre en œuvre et maintenir le dispositif de conformité réglementaire du Groupe (CIMA, AMF-UMOA, BCEAO)\nRéaliser des missions d'audit interne auprès des filiales\nRédiger et mettre à jour les procédures et politiques de conformité\nAssurer la veille réglementaire et former les équipes aux évolutions normatives\nGérer les relations avec les autorités de contrôle\nProduire les rapports réglementaires périodiques",
                'profil'          => "Bac+5 Droit des affaires, Compliance ou Audit (Master, DESCF)\nMinimum 4 ans d'expérience en conformité, audit ou contrôle interne (secteur bancaire ou assurance de préférence)\nConnaissance approfondie de la réglementation CIMA et OHADA\nRigueur, intégrité et excellent relationnel\nCapacité rédactionnelle et de synthèse",
                'avantages'       => "Package salarial compétitif\nAssurance santé groupe\nParticipation aux formations et séminaires professionnels\nPoste stratégique avec forte visibilité au sein du Groupe",
                'actif'           => true,
            ],
            [
                'id'              => Str::random(25),
                'titre'           => 'Ingénieur Développement Logiciel – Fintech',
                'departement'     => 'Technologie',
                'lieu'            => 'Ouagadougou, Burkina Faso',
                'type'            => 'CDI',
                'salaire'         => 'Selon profil et expérience',
                'date_expiration' => 'Juillet 2026',
                'description'     => "Excelis, la filiale fintech d'Excellis Invest Group, recrute un(e) Ingénieur Développement Logiciel pour contribuer à la conception et au déploiement de solutions numériques innovantes dans les domaines de la monétique, du paiement digital et des services financiers.",
                'missions'        => "Concevoir, développer et maintenir des applications web et mobiles de paiement digital\nParticiper à l'architecture technique des solutions monétiques\nIntégrer des APIs bancaires et des systèmes de paiement (mobile money, cartes bancaires)\nAssurer la sécurité et la performance des applications\nRédiger la documentation technique\nCollaborer avec les équipes métier et les partenaires technologiques",
                'profil'          => "Bac+5 Informatique, Génie Logiciel ou équivalent\nMinimum 3 ans d'expérience en développement (Node.js, React, Python ou Java)\nExpérience dans le domaine fintech ou bancaire appréciée\nConnaissance des protocoles de sécurité et de cryptographie\nEsprit d'équipe, curiosité technologique et autonomie\nAnglais technique lu et écrit",
                'avantages'       => "Environnement technologique innovant\nFlexibilité et télétravail partiel\nAccès aux dernières technologies et outils de développement\nFormation continue et certifications (AWS, Google Cloud)\nImpact direct sur l'inclusion financière en Afrique",
                'actif'           => true,
            ],
            [
                'id'              => Str::random(25),
                'titre'           => 'Chargé(e) de Communication & Relations Médias',
                'departement'     => 'Communication',
                'lieu'            => 'Ouagadougou, Burkina Faso',
                'type'            => 'CDI',
                'salaire'         => 'Selon profil',
                'date_expiration' => 'Juin 2026',
                'description'     => "Excellis Invest Group recrute un(e) Chargé(e) de Communication pour gérer la communication institutionnelle du Groupe, renforcer sa présence médiatique et développer sa stratégie digitale en cohérence avec son positionnement de holding panafricaine de référence.",
                'missions'        => "Élaborer et mettre en œuvre le plan de communication annuel du Groupe\nGérer les relations avec les médias (presse, radio, TV) et rédiger les communiqués de presse\nProduire les contenus éditoriaux (rapports annuels, brochures, newsletters)\nAnimer les réseaux sociaux institutionnels (LinkedIn, Twitter/X)\nOrganiser les événements corporate (conférences de presse, assemblées, forums)\nVeiller à la cohérence de l'image de marque du Groupe",
                'profil'          => "Bac+4/5 Communication, Journalisme ou Sciences Politiques\nMinimum 3 ans d'expérience en communication institutionnelle ou relations presse\nExcellentes qualités rédactionnelles en français\nMaîtrise des outils digitaux et des réseaux sociaux professionnels\nSens de l'esthétique et de la mise en forme (InDesign, Canva)\nCapacité à travailler sous pression et à gérer plusieurs projets simultanément",
                'avantages'       => "Rôle central dans la construction de la marque EIG\nBudget communication dédié\nParticipation aux événements économiques africains de premier plan\nÉvolution vers un poste de Directeur de la Communication",
                'actif'           => true,
            ],
            [
                'id'              => Str::random(25),
                'titre'           => 'Auditeur Interne',
                'departement'     => 'Direction Générale',
                'lieu'            => 'Ouagadougou, Burkina Faso',
                'type'            => 'CDI',
                'salaire'         => 'Selon profil',
                'date_expiration' => 'Juillet 2026',
                'description'     => "Dans le cadre du renforcement de son dispositif de gouvernance, Excellis Invest Group recrute un(e) Auditeur(trice) Interne. Rattaché(e) à la Direction Générale, vous conduirez des missions d'audit auprès des filiales du Groupe pour évaluer la maîtrise des risques et l'efficacité des contrôles internes.",
                'missions'        => "Planifier et réaliser des missions d'audit interne (opérationnel, financier, conformité) auprès des filiales\nÉvaluer l'adéquation et l'efficacité des dispositifs de contrôle interne\nRédiger les rapports d'audit avec recommandations\nSuivre la mise en œuvre des plans d'action\nContribuer à la cartographie des risques du Groupe\nFormer les équipes opérationnelles aux bonnes pratiques",
                'profil'          => "Bac+5 Audit, Finance ou Comptabilité\nMinimum 3 ans d'expérience en audit interne ou en cabinet (Big 4 apprécié)\nConnaissance des normes IIA (Institute of Internal Auditors)\nCertification CIA ou en cours d'obtention appréciée\nRigueur analytique, sens de la communication et diplomatie\nDisponibilité pour des déplacements occasionnels dans les filiales",
                'avantages'       => "Poste à forte valeur ajoutée avec accès à toutes les entités du Groupe\nFormation et certification professionnelle prise en charge\nPlan de carrière structuré vers des responsabilités de management\nAssurance santé et avantages groupe",
                'actif'           => true,
            ],
            [
                'id'              => Str::random(25),
                'titre'           => 'Stagiaire – Gestion de Projets & Développement',
                'departement'     => 'Opérations',
                'lieu'            => 'Ouagadougou, Burkina Faso',
                'type'            => 'Stage',
                'salaire'         => 'Gratification légale + avantages',
                'date_expiration' => 'Juin 2026',
                'description'     => "Excellis Invest Group offre une opportunité de stage de 6 mois au sein de la Direction des Opérations. Ce stage vous permettra d'acquérir une vision globale du fonctionnement d'une holding multisectorielle et de contribuer concrètement à des projets transversaux.",
                'missions'        => "Appuyer le suivi opérationnel des projets en cours dans les filiales\nParticiper à la rédaction de notes de synthèse et de rapports d'activité\nContribuer à la mise à jour des tableaux de bord de pilotage\nAssister à la préparation des réunions du Comité de Direction\nParticiper à des projets d'amélioration continue",
                'profil'          => "Étudiant(e) en Master 1 ou 2 (Gestion de projets, Finance, Management)\nRigueur, autonomie et curiosité intellectuelle\nBonne maîtrise du Pack Office (Excel, PowerPoint)\nCapacité de synthèse et qualités rédactionnelles\nIntérêt affirmé pour le monde de l'investissement et du développement africain",
                'avantages'       => "Immersion au cœur d'un groupe panafricain de référence\nEncadrement par des professionnels expérimentés\nPossibilité de débouché sur un CDI pour les profils exceptionnels\nAttestation et lettre de recommandation",
                'actif'           => true,
            ],
        ];

        foreach ($carrieres as $c) {
            $c['created_at'] = now();
            $c['updated_at'] = now();
            DB::table('carrieres')->insert($c);
        }
        $this->command->info(count($carrieres) . ' carrieres seeded');

        // ----------------------------------------------------------------
        // Site Images
        // ----------------------------------------------------------------
        DB::table('site_images')->delete();

        $siteImages = [
            ['section' => 'hero',           'url' => '/uploads/Create_a_premium_institutional_website_hero_banner-1776959860789.png',  'titre' => 'Hero principal',           'alt' => 'Excellis Invest Group — holding panafricaine', 'ordre' => 1, 'actif' => true],
            ['section' => 'hero',           'url' => '/uploads/Create_an_institutional_hero_image_for_Excellis_In-1776959887429.png',  'titre' => 'Hero alternatif',          'alt' => 'Excellis Invest Group',                        'ordre' => 2, 'actif' => false],
            ['section' => 'home-about',     'url' => '/uploads/Create_a_premium_institutional_website_section_vis-1776960072527.png',  'titre' => 'À propos / Le Groupe',     'alt' => 'Excellis Invest Group — notre groupe',         'ordre' => 1, 'actif' => true],
            ['section' => 'about',          'url' => '/uploads/Create_a_premium_institutional_website_section_vis-1776960072527.png',  'titre' => 'À propos — page groupe',   'alt' => 'Excellis Invest Group',                        'ordre' => 1, 'actif' => true],
            ['section' => 'governance',     'url' => '/uploads/Create_a_high-end_governance_website_header_for_Ex-1776959898389.png',  'titre' => 'Gouvernance',              'alt' => 'Gouvernance EIG',                              'ordre' => 1, 'actif' => true],
            ['section' => 'careers',        'url' => '/uploads/Create_a_premium_careers_website_hero_for_Excellis-1776959911645.png',  'titre' => 'Carrières',                'alt' => 'Rejoindre Excellis Invest Group',               'ordre' => 1, 'actif' => true],
            ['section' => 'metier-energie', 'url' => '/uploads/Create_a_premium_African_infrastructure_and_energy-1776960084836.png',  'titre' => 'Énergie & Infrastructure',  'alt' => 'Énergie en Afrique',                           'ordre' => 1, 'actif' => true],
            ['section' => 'metier-fintech', 'url' => '/uploads/Create_a_premium_innovation_and_fintech_website_se-1776960091610.png',  'titre' => 'Fintech & Innovation',     'alt' => 'Innovation digitale',                          'ordre' => 1, 'actif' => true],
            ['section' => 'contact',        'url' => '/uploads/Create_a_premium_institutional_contact_and_regiona-1776960099855.png',  'titre' => 'Contact',                  'alt' => 'Nous contacter',                               'ordre' => 1, 'actif' => true],
            ['section' => 'general',        'url' => '/uploads/pHYCs2BW.png',                                                          'titre' => 'Image générale',           'alt' => '',                                             'ordre' => 1, 'actif' => true],
        ];

        foreach ($siteImages as $img) {
            $img['id']         = Str::random(25);
            $img['created_at'] = now();
            $img['updated_at'] = now();
            DB::table('site_images')->insert($img);
        }
        $this->command->info(count($siteImages) . ' site images seeded');

        $this->command->info('✓ Seed complet — EIG data v2 (amendements client appliqués)');
    }
}
