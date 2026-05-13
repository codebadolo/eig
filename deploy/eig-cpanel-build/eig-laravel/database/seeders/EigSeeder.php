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
                'id'           => 'intermediaire-des-services',
                'sigle'        => 'IDS',
                'nom'          => 'Intermédiaire Des Services',
                'secteur'      => 'Services Financiers',
                'secteur_slug' => 'services-financiers',
                'pays'         => 'Burkina Faso',
                'ville'        => 'Ouagadougou',
                'adresse'      => 'Secteur 09, Parcelle P1/2 Lot 146',
                'description'  => "L'Intermédiaire Des Services (IDS) a été créée en janvier 2018. Agréée par la BCEAO sous le numéro N° BK 00001/IOB/2018, elle intervient dans tous les pays de l'espace UMOA. IDS est spécialisée dans le Conseil Financier et l'Intermédiation en Opérations de Banque (IOB) : elle présente, propose et aide à la conclusion d'opérations de banque ou financières, ou effectue tous travaux et conseils préparatoires à leur réalisation. Son capital social est de cent millions (100 000 000) de FCFA.",
                'mission'      => "IDS est spécialisé dans le Conseil Financier et dans l'Intermédiation en Opérations de Banque (IOB). Ses services comprennent : la négociation et le placement de dépôts auprès des banques ; la négociation et mobilisation de financement (crédit syndiqué) ; les opérations interbancaires (ligne de refinancement, prêt/emprunt interbancaire, achat/vente de titres souverains) ; les opérations internationales (lignes de crédit, correspondant bancaire) ; le rachat de crédits ; la restructuration de dettes selon l'échéance due ; les financements structurés ; ainsi que l'ingénierie et la modélisation financière des projets PPP.",
                'vision'       => "Consolider notre activité d'Intermédiation en Opérations de Banque à travers l'ouverture de Bureaux de Liaison dans les pays suivants : Bénin, Côte d'Ivoire, Sénégal et Togo.",
                'valeurs'      => "Réactivité · Excellence · Confiance · Discrétion",
                'logo'         => null,
                'website'      => null,
                'ordre'        => 1,
                'actif'        => true,
            ],
            // ── 2. LRC ───────────────────────────────────────────────────────
            [
                'id'           => 'loans-recovery-company',
                'sigle'        => 'LRC',
                'nom'          => 'Loans Recovery Company',
                'secteur'      => 'Gestion de Créances',
                'secteur_slug' => 'services-financiers',
                'pays'         => 'Burkina Faso',
                'ville'        => 'Ouagadougou',
                'description'  => "Société spécialisée dans la gestion des créances, à travers le recouvrement, le rachat et la restructuration de créances, avec pour mission d'accompagner les entreprises et institutions dans l'optimisation de leur trésorerie.",
                'mission'      => "Accompagner les entreprises et institutions dans la gestion et le recouvrement de leurs créances pour optimiser leur trésorerie.",
                'logo'         => null,
                'website'      => null,
                'ordre'        => 2,
                'actif'        => true,
            ],
            // ── 3. Barka Energies ────────────────────────────────────────────
            [
                'id'           => 'barka-energies',
                'sigle'        => 'BE',
                'nom'          => 'Barka Energies',
                'secteur'      => 'Énergies et distribution',
                'secteur_slug' => 'energie',
                'pays'         => 'Burkina Faso',
                'ville'        => 'Ouagadougou',
                'description'  => "Barka Energies intervient dans la distribution de produits pétroliers, principalement les carburants et lubrifiants, et dans la fourniture de solutions solaires adaptées aux besoins des particuliers, des entreprises et des institutions.",
                'mission'      => "Fournir des solutions énergétiques fiables et accessibles pour contribuer au développement économique du Burkina Faso.",
                'logo'         => null,
                'website'      => null,
                'ordre'        => 3,
                'actif'        => true,
            ],
            // ── 4. Sopatel Silmandé ──────────────────────────────────────────
            [
                'id'           => 'sopatel-silmande',
                'sigle'        => 'SS',
                'nom'          => 'Sopatel Silmandé',
                'secteur'      => 'Hôtellerie & Restauration',
                'secteur_slug' => 'hotellerie',
                'pays'         => 'Burkina Faso',
                'ville'        => 'Ouagadougou',
                'description'  => "Situé à 15 mn de l'aéroport international de Ouagadougou, Sopatel Silmandé, établissement 4 étoiles classé hôtel vert de la capitale burkinabée, est le cadre idéal pour les séjours d'affaires. L'hôtel dispose de 170 chambres entièrement rénovées, 10 salles de réunions, 2 bars, 2 restaurants, une grande piscine, une salle de fitness, 2 courts de tennis et 2 grands parkings.",
                'mission'      => "Fournir des services d'hébergement et de restauration de qualité supérieure à ses hôtes en mettant l'accent sur l'expérience client.",
                'vision'       => "Devenir d'ici à 2026, le leader de l'hôtellerie d'affaires au Burkina Faso.",
                'valeurs'      => "Hospitalité · Authenticité · Écoute · Innovation · Intégrité · Hygiène et propreté · Amélioration continue des compétences",
                'commentaires' => "Distinctions & Récompenses : Prix National de l'Entrepreneur Touristique 3ème édition — Hôtel Vert · REPAB (Rencontre des Patrons Burkinabè) 2022 : Prix du Meilleur Hôtel · SITHO-VITHRO 2023 : Meilleur Valet de Chambre · SITHO 2024 : Meilleur Garçon de café et Meilleur Valet de chambre.",
                'logo'         => null,
                'website'      => 'https://www.sopatelsilmande.com',
                'ordre'        => 4,
                'actif'        => true,
            ],
            // ── 5. Coris Assurance IARD BF ────────────────────────────────────
            [
                'id'           => 'coris-assurance-iard-bf',
                'sigle'        => 'CA',
                'nom'          => 'Coris Assurance IARD BF',
                'secteur'      => 'Assurance Non-Vie',
                'secteur_slug' => 'assurance',
                'pays'         => 'Burkina Faso',
                'ville'        => 'Ouagadougou',
                'description'  => "Conseil, conception et commercialisation de produits d'assurances non-vie (Incendie, Accidents, Risques Divers) au Burkina Faso, sous régulation CIMA.",
                'mission'      => "Offrir des solutions d'assurance non-vie accessibles, innovantes et adaptées aux besoins des particuliers et entreprises au Burkina Faso.",
                'logo'         => null,
                'website'      => 'https://www.coris-assurances.com',
                'ordre'        => 5,
                'actif'        => true,
            ],
            // ── 6. Coris Assurance Vie BF ─────────────────────────────────────
            [
                'id'           => 'coris-assurance-vie-bf',
                'sigle'        => 'CV',
                'nom'          => 'Coris Assurance Vie BF',
                'secteur'      => 'Assurance Vie',
                'secteur_slug' => 'assurance',
                'pays'         => 'Burkina Faso',
                'ville'        => 'Ouagadougou',
                'adresse'      => 'Avenue Loudun, Immeuble Coris Bourse, 01 BP 880 Ouagadougou 01',
                'telephone'    => '+226 25 39 18 98',
                'description'  => "Coris Assurances Vie Burkina est une Société Anonyme avec Conseil d'Administration au capital de cinq milliards de FCFA. Elle a démarré ses activités le 29/05/2015 avec l'avantage du label « Coris ». Fortement engagée dans une démarche de satisfaction clientèle, elle met l'accent sur la qualité de la gestion des relations commerciales et sur un processus d'indemnisation rapide assuré par une équipe compétente et engagée. Elle propose une gamme variée de produits : Prévoyance Sociale Collective, Indemnités de Fin de Carrière, Épargne, Rente Éducation, Décès Emprunteur.",
                'mission'      => "Société de référence offrant des produits et services accessibles, innovants et adaptés aux besoins de la population, avec une amélioration continue de la qualité des prestations assurées par des employés compétents et engagés.",
                'vision'       => "Coris Assurances Vie Burkina, l'assureur vie de référence à l'horizon 2026.",
                'valeurs'      => "Confiance · Originalité · Responsabilité · Intégrité · Solidarité",
                'commentaires' => "Performances notables : Positionnée au 2ème rang du marché en termes de rentabilité et au 1er rang en termes de croissance en 2024. Première compagnie d'assurance à lancer la fenêtre de l'assurance Takaful au Burkina Faso.",
                'logo'         => null,
                'website'      => 'https://www.coris-assurances.com',
                'ordre'        => 6,
                'actif'        => true,
            ],
            // ── 7. Coris Assurance IARD CI ───────────────────────────────────
            [
                'id'           => 'coris-assurance-iard-ci',
                'sigle'        => 'CI',
                'nom'          => 'Coris Assurance IARD CI',
                'secteur'      => 'Assurance Non-Vie',
                'secteur_slug' => 'assurance',
                'pays'         => "Côte d'Ivoire",
                'ville'        => 'Abidjan',
                'adresse'      => "Boulevard de la République N°23, angle Avenue Marchand, Plateau — 01 BP 4690 Abidjan 01",
                'telephone'    => '+225 27 20 35 15 65',
                'description'  => "Coris Assurances Côte d'Ivoire est une Société Anonyme (SA) de droit Ivoirien avec Conseil d'Administration, au capital de cinq milliards (5 000 000 000) de FCFA libérés intégralement à la souscription. Elle s'est imposée comme un assureur de référence proche de ses clients, mettant l'accent sur les valeurs à succès, l'accessibilité des produits, la rapidité des prestations et l'innovation continue au profit des souscripteurs et bénéficiaires de contrats d'assurances. Slogan : « L'Assureur qui rassure ».",
                'mission'      => "Offrir des produits et services accessibles, innovants et adaptés aux besoins de la population par une amélioration continue de la qualité des prestations assurées par des employés compétents et engagés.",
                'vision'       => "Être une société d'assurance de référence, innovante et proche de ses clients.",
                'valeurs'      => "Confiance : gage de toute relation saine · Originalité : nous faisons l'assurance autrement · Responsabilité : le respect de nos engagements · Intégrité : l'attachement à un code moral et de conduite · Sociabilité : l'esprit d'équipe et la pratique RSE",
                'logo'         => null,
                'website'      => null,
                'ordre'        => 7,
                'actif'        => true,
            ],
            // ── 8. Coris Assurance Vie CI ─────────────────────────────────────
            [
                'id'           => 'coris-assurance-vie-ci',
                'sigle'        => 'CVI',
                'nom'          => 'Coris Assurance Vie CI',
                'secteur'      => 'Assurance Vie',
                'secteur_slug' => 'assurance',
                'pays'         => "Côte d'Ivoire",
                'ville'        => 'Abidjan',
                'description'  => "Conseil, conception et commercialisation de produits d'assurances vie en Côte d'Ivoire, sous régulation CIMA.",
                'mission'      => "Offrir des solutions d'assurance vie innovantes et accessibles aux particuliers et entreprises en Côte d'Ivoire.",
                'logo'         => null,
                'website'      => null,
                'ordre'        => 8,
                'actif'        => true,
            ],
            // ── 9. Coris Bourse ──────────────────────────────────────────────
            [
                'id'           => 'coris-bourse',
                'sigle'        => 'CB',
                'nom'          => 'Coris Bourse',
                'secteur'      => 'Marchés Financiers',
                'secteur_slug' => 'marches-financiers',
                'pays'         => 'Burkina Faso',
                'ville'        => 'Ouagadougou',
                'description'  => "Société de Gestion et d'Intermédiation (SGI), Coris Bourse accompagne sa clientèle dans l'ouverture et la gestion de comptes-titres, ainsi que dans l'achat et la vente de valeurs mobilières cotées sur la Bourse Régionale des Valeurs Mobilières (BRVM).",
                'mission'      => "Accompagner les épargnants et investisseurs dans l'accès aux marchés financiers de l'Afrique de l'Ouest à travers une offre de services de qualité.",
                'logo'         => null,
                'website'      => 'https://www.coris-bourse.com',
                'ordre'        => 9,
                'actif'        => true,
            ],
            // ── 10. Coris Asset Management ───────────────────────────────────
            [
                'id'           => 'coris-asset-management',
                'sigle'        => 'CAM',
                'nom'          => 'Coris Asset Management',
                'secteur'      => "Gestion d'Actifs",
                'secteur_slug' => 'marches-financiers',
                'pays'         => 'Burkina Faso',
                'ville'        => 'Ouagadougou',
                'description'  => "Coris Asset Management (CAM) SA est une Société de Gestion d'Organisme de Placement Collectif en Valeur Mobilière (SGO). Son activité consiste à la création et à la gestion d'OPCVM, en particulier des Fonds Communs de Placement (FCP). Un FCP est un instrument financier qui permet de mettre en commun son épargne avec d'autres investisseurs pour acheter mutuellement des actions, des obligations, des bons du Trésor, permettant ainsi d'investir dans un large éventail de titres et de diversifier son investissement.",
                'mission'      => "Promouvoir la culture boursière par une offre de services de qualité, diversifiés et adaptés à l'endroit de nos clients.",
                'vision'       => "À l'horizon 2025, afficher un portefeuille global d'actifs sous gestion de 5 milliards FCFA.",
                'valeurs'      => "Confiance · Réactivité · Excellence",
                'commentaires' => "Coris Asset Management dispose de trois (3) Fonds Communs de Placement (FCP) distincts : FCP CORIS ACTIONS — investissement majoritaire dans les actions cotées de la Bourse · FCP CORIS PERFORMANCE — diversification entre actions cotées et obligations · FCP ASSURANCES — investissement majoritaire dans les obligations de courte durée. Peuvent souscrire : particuliers, investisseurs institutionnels, entreprises individuelles, professions libérales. Mise de départ minimale : 25 000 FCFA. Documents requis : copie CNI/passeport, 2 photos d'identité, facture (eau/électricité), bordereau de versement.",
                'logo'         => null,
                'website'      => 'https://www.coris-asset.com',
                'ordre'        => 10,
                'actif'        => true,
            ],
            // ── 11. Expertis BF ──────────────────────────────────────────────
            [
                'id'           => 'expertis-bf',
                'sigle'        => 'EXB',
                'nom'          => 'Expertis BF',
                'secteur'      => 'Immobilier',
                'secteur_slug' => 'immobilier-capital',
                'pays'         => 'Burkina Faso',
                'ville'        => 'Ouagadougou',
                'description'  => "Spécialisée dans la tierce détention, le suivi d'exécution de projets, les investissements en capital-risque, la promotion immobilière et la maîtrise d'ouvrage déléguée.",
                'mission'      => "Accompagner les porteurs de projets immobiliers et d'investissement avec rigueur et expertise, en garantissant la sécurité et la performance des opérations.",
                'logo'         => null,
                'website'      => 'https://www.expertis-sa.com',
                'ordre'        => 11,
                'actif'        => true,
            ],
            // ── 12. Expertis CI ──────────────────────────────────────────────
            [
                'id'           => 'expertis-ci',
                'sigle'        => 'EXC',
                'nom'          => 'Expertis CI',
                'secteur'      => 'Immobilier',
                'secteur_slug' => 'immobilier-capital',
                'pays'         => "Côte d'Ivoire",
                'ville'        => 'Abidjan',
                'description'  => "Spécialisée dans la tierce détention, le suivi d'exécution de projets, les investissements en capital-risque, la promotion immobilière et la maîtrise d'ouvrage déléguée en Côte d'Ivoire.",
                'mission'      => "Développer et sécuriser les investissements immobiliers et en capital-risque sur le marché ivoirien.",
                'logo'         => null,
                'website'      => null,
                'ordre'        => 12,
                'actif'        => true,
            ],
            // ── 13. Excelis ──────────────────────────────────────────────────
            [
                'id'           => 'excelis',
                'sigle'        => 'EX',
                'nom'          => 'Excelis',
                'secteur'      => 'Technologies & Fintech',
                'secteur_slug' => 'technologies-fintech',
                'pays'         => 'Burkina Faso',
                'ville'        => 'Ouagadougou',
                'description'  => "Excelis SA (anciennement M2i SA — Monétique, Informatique et Identification) est la filiale technologique du groupe, créée en juin 2016 dans la volonté du groupe Coris de se doter d'une structure spécialisée dans les technologies et services innovants du numérique. Son plan stratégique 2023-2027 décline sa nouvelle vision de devenir « une fintech de référence, à la pointe de la technologie et capable d'accompagner efficacement le Groupe Coris dans sa stratégie de digitalisation ». Capital social : 100 000 000 FCFA.",
                'mission'      => "Accompagner efficacement le Groupe Coris dans sa stratégie de digitalisation avec l'aide de technologies émergentes et novatrices, en promouvant le développement d'une offre diversifiée, innovante et sécurisée de solutions numériques.",
                'vision'       => "Être à l'horizon 2027 un centre d'excellence et une référence en matière de technologie et d'innovation.",
                'valeurs'      => "Esprit d'équipe · Rigueur · Audace · Solidarité · Promptitude · Flexibilité",
                'commentaires' => "Réalisations majeures : Déploiement de la Monétique du Groupe Coris à travers le switch monétique PAYWAY · Mise en place du Centre de personnalisation de carte bancaire pour le Groupe Coris · Développement et déploiement de la Plateforme Coris Money pour le Groupe Coris. Certifications : PCI DSS V3.1 (2023), PCI DSS V4 (2024). Site en construction : www.excelis-sa.com — Ancien site : www.m2i-sa.com",
                'logo'         => null,
                'website'      => 'https://www.excelis-sa.com',
                'ordre'        => 13,
                'actif'        => true,
            ],
            // ── 14. IAG ──────────────────────────────────────────────────────
            [
                'id'           => 'industries-arts-graphiques',
                'sigle'        => 'IAG',
                'nom'          => 'Industries des Arts Graphiques',
                'secteur'      => 'Industries et Agribusiness',
                'secteur_slug' => 'industrie',
                'pays'         => 'Burkina Faso',
                'ville'        => 'Ouagadougou',
                'description'  => "Spécialisée dans l'imprimerie, la conception graphique, la signalétique et la sécurisation de documents sensibles, tels que les timbres, diplômes et attestations automobiles.",
                'mission'      => "Fournir des solutions graphiques et d'imprimerie de haute qualité, notamment pour la sécurisation documentaire des institutions publiques et privées.",
                'logo'         => null,
                'website'      => null,
                'ordre'        => 14,
                'actif'        => true,
            ],
            // ── 15. Energytis ─────────────────────────────────────────────────
            [
                'id'           => 'energytis',
                'sigle'        => 'ET',
                'nom'          => 'Energytis',
                'secteur'      => 'Énergies et distribution',
                'secteur_slug' => 'energie',
                'pays'         => 'Burkina Faso',
                'ville'        => 'Ouagadougou',
                'description'  => "Spécialisée dans l'étude, l'ingénierie, le développement, le financement, la construction et l'exploitation de sites de production d'énergie.",
                'mission'      => "Développer des projets d'énergie renouvelable et conventionnelle pour répondre aux besoins croissants en électricité de l'Afrique de l'Ouest.",
                'logo'         => null,
                'website'      => null,
                'ordre'        => 16,
                'actif'        => true,
            ],
            // ── 17. General Mining Logistics ─────────────────────────────────
            [
                'id'           => 'general-mining-logistics',
                'sigle'        => 'GML',
                'nom'          => 'General Mining Logistics TS',
                'secteur'      => 'Transport et logistiques minières et industrielles',
                'secteur_slug' => 'logistique-miniere',
                'pays'         => 'Burkina Faso',
                'ville'        => 'Ouagadougou',
                'description'  => "Intervient dans les services logistiques, techniques et opérationnels au profit des secteurs minier et industriel, notamment dans le transport d'agrégats miniers et l'appui aux opérations sur site.",
                'mission'      => "Assurer des solutions logistiques fiables et sécurisées pour les industries minières et extractives en Afrique de l'Ouest.",
                'logo'         => null,
                'website'      => null,
                'ordre'        => 17,
                'actif'        => true,
            ],
            // ── 18. Oxy Conseil ───────────────────────────────────────────────
            [
                'id'           => 'oxy-conseil',
                'sigle'        => 'OXY',
                'nom'          => 'Oxy Conseil',
                'secteur'      => 'Commerce & Fournitures',
                'secteur_slug' => 'commerce',
                'pays'         => 'Burkina Faso',
                'ville'        => 'Ouagadougou',
                'description'  => "Depuis 2009, Oxy Conseil œuvre à faire de vous et vos projets des exceptions par la qualité : parce que vous êtes spécifiques sur un marché diversifié, parce que votre projet est unique face à des offres pléthoriques, tout simplement parce que vous êtes différents ! Spécialisée dans le conseil et les services aux entreprises, la société accompagne ses clients avec une approche personnalisée fondée sur l'écoute, la loyauté et l'engagement à satisfaire.",
                'mission'      => "Tout pour votre satisfaction. Accompagner clients et projets avec une qualité d'exécution irréprochable, dans le respect des engagements et l'esprit d'équipe.",
                'vision'       => "Engagés à vous satisfaire, nous axons nos méthodes de travail autour de : l'Engagement affectif (identification du besoin, anticipation et implication dans le rendu) · l'Engagement normatif (une éthique morale partagée, la loyauté) · l'Engagement de continuité (entre vous et nous, c'est « collés-serrés » !).",
                'valeurs'      => "Les petits détails font les grands, il faut toujours œuvrer à mieux faire, à satisfaire davantage le client. En interne, le respect et la valorisation de chaque collaborateur est une priorité. L'esprit d'équipe et la solidarité sont naturellement cultivés, le tout pour être plus performant pour le plus grand plaisir du client.",
                'logo'         => null,
                'website'      => 'https://www.oxyconseil.com',
                'ordre'        => 18,
                'actif'        => true,
            ],
        ];

        foreach ($filiales as $f) {
            $f['created_at'] = now();
            $f['updated_at'] = now();
            DB::table('filiales')->upsert($f, ['id'], array_keys(array_diff_key($f, ['id' => ''])));
        }
        $this->command->info(count($filiales) . ' filiales seeded');

        // ----------------------------------------------------------------
        // Metiers (9 secteurs stratégiques)
        // ----------------------------------------------------------------
        $metiers = [
            [
                'id'           => Str::random(25),
                'slug'         => 'services-financiers',
                'titre'        => 'Services Financiers & Intermédiation',
                'icone'        => 'briefcase',
                'couleur'      => 'linear-gradient(135deg, #1A6B7A, #0F4855)',
                'description'  => 'Intermédiation bancaire, structuration financière, recouvrement et gestion de créances.',
                'enjeux'       => "Dans une économie africaine en forte croissance, l'accès au financement et la gestion saine des créances constituent des piliers de la stabilité financière.",
                'contribution' => 'EIG positionne ses filiales financières comme des facilitateurs clés pour les entreprises et institutions locales.',
                'filiales_ids' => json_encode(['intermediaire-des-services', 'loans-recovery-company']),
                'ordre'        => 1,
                'actif'        => true,
            ],
            [
                'id'           => Str::random(25),
                'slug'         => 'assurance',
                'titre'        => 'Assurance',
                'icone'        => 'shield-halved',
                'couleur'      => 'linear-gradient(135deg, #2A6B4A, #1A4A32)',
                'description'  => "Assurance vie et non-vie au Burkina Faso et en Côte d'Ivoire, régulées CIMA.",
                'enjeux'       => "La protection des personnes et des biens est un levier essentiel de résilience économique pour les ménages et les entreprises.",
                'contribution' => "Avec 4 entités d'assurance vie et non-vie dans 2 pays, EIG couvre un spectre complet de la protection financière régionale.",
                'filiales_ids' => json_encode(['coris-assurance-iard-bf', 'coris-assurance-vie-bf', 'coris-assurance-iard-ci', 'coris-assurance-vie-ci']),
                'ordre'        => 2,
                'actif'        => true,
            ],
            [
                'id'           => Str::random(25),
                'slug'         => 'marches-financiers',
                'titre'        => "Marchés Financiers & Gestion d'Actifs",
                'icone'        => 'chart-line',
                'couleur'      => 'linear-gradient(135deg, #6B2A6B, #4A1A4A)',
                'description'  => "Bourse, gestion d'OPCVM, comptes-titres et gestion sous mandat sur la BRVM.",
                'enjeux'       => "Le développement des marchés financiers africains est indispensable pour mobiliser l'épargne locale au service de l'investissement.",
                'contribution' => 'EIG intervient sur la BRVM via deux entités spécialisées, contribuant à la profondeur et à la liquidité du marché financier régional.',
                'filiales_ids' => json_encode(['coris-bourse', 'coris-asset-management']),
                'ordre'        => 3,
                'actif'        => true,
            ],
            [
                'id'           => Str::random(25),
                'slug'         => 'immobilier-capital',
                'titre'        => 'Immobilier',
                'icone'        => 'building',
                'couleur'      => 'linear-gradient(135deg, #6B4A1A, #4A3010)',
                'description'  => "Promotion immobilière, maîtrise d'ouvrage déléguée, tierce détention et capital-risque.",
                'enjeux'       => "Le déficit de logements et d'infrastructures en Afrique de l'Ouest représente à la fois un défi social et une opportunité d'investissement structurante.",
                'contribution' => "EIG accompagne les maîtres d'ouvrage publics et privés tout en prenant des participations dans des projets à fort potentiel de création de valeur.",
                'filiales_ids' => json_encode(['expertis-bf', 'expertis-ci']),
                'ordre'        => 4,
                'actif'        => true,
            ],
            [
                'id'           => Str::random(25),
                'slug'         => 'energie',
                'titre'        => 'Énergies et distribution',
                'icone'        => 'bolt',
                'couleur'      => 'linear-gradient(135deg, #1A4A6B, #102A4A)',
                'description'  => "Distribution de produits pétroliers, solutions solaires et ingénierie de production d'énergie.",
                'enjeux'       => "L'accès à l'énergie est un défi majeur en Afrique subsaharienne. La transition énergétique offre un champ d'opportunités considérable.",
                'contribution' => "EIG s'engage dans toute la chaîne de valeur énergétique, de la distribution traditionnelle aux nouvelles énergies renouvelables.",
                'filiales_ids' => json_encode(['barka-energies', 'energytis']),
                'ordre'        => 5,
                'actif'        => true,
            ],
            [
                'id'           => Str::random(25),
                'slug'         => 'technologies-fintech',
                'titre'        => 'Technologies & Fintech',
                'icone'        => 'microchip',
                'couleur'      => 'linear-gradient(135deg, #4A1A2A, #3A1020)',
                'description'  => 'Solutions numériques, digitalisation, monétique, paiement digital et services financiers digitaux.',
                'enjeux'       => "La révolution numérique transforme l'accès aux services financiers et offre des opportunités d'inclusion économique sans précédent.",
                'contribution' => 'Excelis, la fintech du groupe, développe des solutions digitales innovantes au service de la modernisation du secteur financier africain.',
                'filiales_ids' => json_encode(['excelis']),
                'ordre'        => 6,
                'actif'        => true,
            ],
            [
                'id'           => Str::random(25),
                'slug'         => 'industrie',
                'titre'        => 'Industries et Agribusiness',
                'icone'        => 'print',
                'couleur'      => 'linear-gradient(135deg, #2A4A1A, #1A3010)',
                'description'  => 'Imprimerie, signalétique, conception graphique et sécurisation de documents sensibles.',
                'enjeux'       => "La sécurisation des documents officiels et la production de supports de communication de qualité sont des besoins croissants dans la région.",
                'contribution' => "EIG contribue à la sécurisation documentaire de l'État et des institutions à travers une filiale spécialisée et reconnue.",
                'filiales_ids' => json_encode(['industries-arts-graphiques']),
                'ordre'        => 7,
                'actif'        => true,
            ],
            [
                'id'           => Str::random(25),
                'slug'         => 'logistique-miniere',
                'titre'        => 'Transport et logistiques minières et industrielles',
                'icone'        => 'truck',
                'couleur'      => 'linear-gradient(135deg, #4A3A1A, #3A2A10)',
                'description'  => "Logistique, transport d'agrégats miniers et services opérationnels pour les industries extractives.",
                'enjeux'       => "L'industrie minière burkinabè est un secteur clé de l'économie nationale, nécessitant des prestataires logistiques fiables et spécialisés.",
                'contribution' => 'General Mining Logistics TS offre des services logistiques de qualité aux opérateurs miniers, soutenant la chaîne de valeur extractive nationale.',
                'filiales_ids' => json_encode(['general-mining-logistics']),
                'ordre'        => 8,
                'actif'        => true,
            ],
            [
                'id'           => Str::random(25),
                'slug'         => 'hotellerie',
                'titre'        => 'Hôtellerie & Restauration',
                'icone'        => 'hotel',
                'couleur'      => 'linear-gradient(135deg, #1A2A6B, #101A4A)',
                'description'  => "Hébergement haut de gamme, restauration et services d'accueil à Ouagadougou.",
                'enjeux'       => "Le développement économique génère des besoins croissants en infrastructures d'accueil pour les hommes d'affaires et les touristes.",
                'contribution' => "Sopatel Silmandé est une référence hôtelière à Ouagadougou, symbolisant l'ancrage territorial et le rayonnement d'EIG.",
                'filiales_ids' => json_encode(['sopatel-silmande']),
                'ordre'        => 9,
                'actif'        => true,
            ],
        ];

        foreach ($metiers as $m) {
            $m['created_at'] = now();
            $m['updated_at'] = now();
            DB::table('metiers')->upsert($m, ['slug'], array_keys(array_diff_key($m, ['slug' => ''])));
        }
        $this->command->info(count($metiers) . ' metiers seeded');

        // ----------------------------------------------------------------
        // Articles (sans référence Bloomfield)
        // ----------------------------------------------------------------
        $articles = [
            [
                'id'       => Str::random(25),
                'slug'     => 'lancement-site-institutionnel-2026',
                'titre'    => 'Excellis Invest Group lance son nouveau site internet institutionnel',
                'categorie'=> 'Corporate',
                'date'     => 'Avril 2026',
                'extrait'  => "Marquant une nouvelle étape dans sa stratégie de visibilité digitale, EIG se dote d'une plateforme institutionnelle de premier rang.",
                'contenu'  => "Excellis Invest Group franchit une nouvelle étape dans sa stratégie de communication et de visibilité digitale avec le lancement de son site internet institutionnel. Cette plateforme reflète l'ambition panafricaine du Groupe et consolide sa présence digitale auprès de ses partenaires, investisseurs et filiales.",
                'couleur'  => 'linear-gradient(135deg, #1A6B7A, #0F4855)',
                'featured' => true,
                'image'    => null,
                'publie'   => true,
            ],
            [
                'id'       => Str::random(25),
                'slug'     => 'excelis-fintech-deploiement',
                'titre'    => 'Excelis accélère le déploiement de ses solutions fintech',
                'categorie'=> 'Filiales',
                'date'     => 'Mars 2026',
                'extrait'  => "La filiale technologique du Groupe multiplie ses partenariats stratégiques pour accélérer la digitalisation des services financiers en Afrique de l'Ouest.",
                'contenu'  => "Excelis, la fintech d'Excellis Invest Group, annonce l'accélération de son programme de déploiement de solutions numériques. La filiale renforce ses capacités en monétique, paiement digital et services financiers digitaux, contribuant à l'inclusion financière dans la sous-région.",
                'couleur'  => 'linear-gradient(135deg, #2A6B4A, #1A4A32)',
                'featured' => false,
                'image'    => null,
                'publie'   => true,
            ],
            [
                'id'       => Str::random(25),
                'slug'     => 'energytis-contrat-energie',
                'titre'    => "Energytis remporte un contrat d'envergure dans la production d'énergie",
                'categorie'=> 'Énergie',
                'date'     => 'Février 2026',
                'extrait'  => "La filiale spécialisée dans l'ingénierie énergétique consolide sa position sur le marché burkinabè et sous-régional.",
                'contenu'  => "Energytis, filiale d'Excellis Invest Group spécialisée dans la production d'énergie, remporte un contrat d'envergure dans le secteur des énergies renouvelables. Cette victoire renforce le positionnement d'EIG dans la transition énergétique africaine.",
                'couleur'  => 'linear-gradient(135deg, #6B4A1A, #4A3010)',
                'featured' => false,
                'image'    => null,
                'publie'   => true,
            ],
            [
                'id'       => Str::random(25),
                'slug'     => 'eig-expansion-africaine-2026',
                'titre'    => "Excellis Invest Group renforce son empreinte sur le périmètre africain",
                'categorie'=> 'Corporate',
                'date'     => 'Janvier 2026',
                'extrait'  => "Avec +700 collaborateurs et 16 filiales actives, EIG consolide sa stratégie d'expansion multisectorielle en Afrique de l'Ouest.",
                'contenu'  => "Excellis Invest Group, holding multisectorielle fondée en 2019 et basée au Burkina Faso, consolide sa présence africaine avec un portefeuille de 16 filiales couvrant 9 secteurs stratégiques. Le Groupe compte désormais plus de 700 collaborateurs engagés dans la transformation économique de la sous-région.",
                'couleur'  => 'linear-gradient(135deg, #0F4855, #0F1924)',
                'featured' => false,
                'image'    => null,
                'publie'   => true,
            ],
        ];

        foreach ($articles as $a) {
            $a['created_at'] = now();
            $a['updated_at'] = now();
            DB::table('articles')->upsert($a, ['slug'], array_keys(array_diff_key($a, ['slug' => ''])));
        }
        $this->command->info(count($articles) . ' articles seeded');

        // ----------------------------------------------------------------
        // Company Info (sans Bloomfield, sans ex Coris, KPIs mis à jour)
        // ----------------------------------------------------------------
        $companyData = [
            'nom'              => 'Excellis Invest Group',
            'tagline'          => 'Investir autrement',
            'descriptionCourte'=> "Excellis Invest Group est une holding Multi sectoriel, capitalisé à 20 milliards FCFA, opérant dans 9 secteurs stratégiques à travers 16 filiales en Afrique.",
            'description'      => "Excellis Invest Group est une holding Multi sectoriel, capitalisé à 20 milliards FCFA, opérant dans 9 secteurs stratégiques à travers 16 filiales en Afrique. Fondée en 2019 et basée au Burkina Faso, elle assure le pilotage stratégique et la gouvernance d'un portefeuille de filiales couvrant les services financiers, l'assurance, les énergies, l'immobilier, les technologies, l'industrie, le transport-logistique, l'hôtellerie et le commerce.",
            'mission'          => "Mobiliser des expertises, des capitaux et des mécanismes d'intervention à forte valeur ajoutée pour accompagner les institutions et entreprises africaines dans leur financement, leur structuration et leur développement durable.",
            'vision'           => "Être un investisseur panafricain de référence, catalyseur de croissance, de transformation et de création de valeur durable en Afrique.",
            'valeurs'          => [
                ['titre' => 'Rigueur',         'icone' => 'scale-balanced', 'description' => "Des standards élevés dans toutes nos décisions d'investissement et dans notre gouvernance."],
                ['titre' => 'Adaptabilité',    'icone' => 'arrows-rotate',  'description' => "Un modèle évolutif, ancré dans les réalités économiques africaines et ouvert aux opportunités."],
                ['titre' => 'Innovation',      'icone' => 'lightbulb',      'description' => "Une culture de l'innovation au service de la modernisation des économies africaines."],
                ['titre' => "Esprit d'équipe", 'icone' => 'handshake',      'description' => "Une synergie des filiales et des talents pour créer une valeur collective supérieure."],
            ],
            'kpis' => [
                ['num' => '+700', 'unite' => '',    'label' => 'Collaborateurs'],
                ['num' => '16',   'unite' => '',    'label' => 'Filiales opérationnelles'],
                ['num' => '9',    'unite' => '',    'label' => 'Secteurs stratégiques'],
                ['num' => '2',    'unite' => '',    'label' => 'Pays (BF + CI)'],
                ['num' => '2019', 'unite' => '',    'label' => 'Année de création'],
            ],
            'gouvernancePiliers' => [
                ['num' => '01', 'titre' => 'Rigueur & Transparence',       'texte' => "Gouvernance en SA de droit burkinabè, structure financière solide"],
                ['num' => '02', 'titre' => 'Adaptabilité & Innovation',    'texte' => "Modèle évolutif, ancré dans les réalités africaines"],
                ['num' => '03', 'titre' => 'Création de Valeur Durable',   'texte' => "Investissements de long terme dans les secteurs structurants"],
                ['num' => '04', 'titre' => 'Esprit de Partenariat',        'texte' => "Croissance en synergie avec les partenaires institutionnels"],
                ['num' => '05', 'titre' => 'Performance & Responsabilité', 'texte' => "Résultats mesurables, impact économique et social concret"],
            ],
            'adresse'   => 'Ouagadougou, Burkina Faso',
            'email'     => 'contact@excellis-invest-group.com',
            'telephone' => '+226 25 30 00 00',

            // ── Mot du Président ──────────────────────────────────────────
            'nom_president'   => 'Bintou Compaoré',
            'titre_president' => "Présidente du Conseil d'Administration",
            'photo_president' => null,
            'mot_president'   => "Depuis la fondation d'Excellis Invest Group, notre ambition a toujours été de prouver qu'il est possible d'investir autrement en Afrique : avec rigueur, avec vision, et avec un ancrage profond dans les réalités de notre continent. Chaque filiale que nous avons construite, chaque partenariat que nous avons noué, témoigne de notre engagement à créer une valeur durable — pour nos actionnaires, pour nos collaborateurs et pour les économies dans lesquelles nous opérons. Notre gouvernance est le socle de cette ambition : exigeante, transparente et tournée vers l'avenir.",

            // ── Mot du Directeur Général ──────────────────────────────────
            'nom_dg'   => 'Issouf Compaoré',
            'titre_dg' => 'Directeur Général',
            'photo_dg' => null,
            'mot_dg'   => "Notre modèle repose sur une conviction simple : les marchés africains recèlent des opportunités considérables pour ceux qui s'y engagent avec méthode et persévérance. En sept ans, Excellis Invest Group a su identifier, structurer et accompagner 16 filiales dans 9 secteurs stratégiques. Cette diversification n'est pas une fin en soi — elle est le reflet de notre capacité d'adaptation et de notre lecture des besoins réels du tissu économique africain. Nous restons résolument tournés vers la croissance, l'innovation et la création de valeur partagée.",
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
        // Dirigeants (sans mentions Bloomfield dans les bios)
        // ----------------------------------------------------------------
        $dirigeants = [
            [
                'id'          => 'dg',
                'nom'         => 'Issouf Compaoré',
                'role'        => 'Directeur Général',
                'bio'         => "Issouf Compaoré dirige Excellis Invest Group depuis sa transformation en holding multisectorielle en 2019. Fort de plus de 22 ans d'expérience dans la finance et l'investissement en Afrique subsaharienne, il incarne la vision panafricaine du Groupe : mobiliser des capitaux privés au service du développement économique durable de la sous-région. Sous sa direction, EIG a structuré un portefeuille de 16 filiales couvrant 9 secteurs stratégiques, avec plus de 700 collaborateurs engagés à travers le périmètre africain.",
                'expertise'   => "Stratégie d'investissement\nFinance d'entreprise et structuration\nGouvernance de holdings\nDéveloppement des marchés financiers africains\nRelations institutionnelles et partenariats stratégiques",
                'formation'   => "MBA Finance & Stratégie – HEC Paris (2002)\nMaster 2 Économie Internationale – Université Paris I Panthéon-Sorbonne (2000)\nLicence en Sciences Économiques – Université de Ouagadougou (1998)",
                'experiences' => "Directeur Général – Excellis Invest Group, Ouagadougou (2019 – présent)\nDirecteur des Investissements – Coris Bank International (2012 – 2018)\nResponsable Pôle Financement – BOAD, Lomé (2007 – 2012)\nAnalyste Financier Senior – Société Générale, Paris (2002 – 2007)",
                'linkedin'    => null,
                'photo'       => null,
                'ordre'       => 1,
                'actif'       => true,
            ],
            [
                'id'          => 'daf',
                'nom'         => 'Aminata Sawadogo',
                'role'        => 'Directrice Administrative & Financière',
                'bio'         => "Aminata Sawadogo supervise l'ensemble des fonctions financières d'Excellis Invest Group : reporting consolidé, gestion de trésorerie et relations avec les investisseurs. Reconnue pour sa rigueur et son excellence opérationnelle, elle garantit la solidité de la structure financière du Groupe et sa crédibilité auprès des partenaires financiers internationaux.",
                'expertise'   => "Consolidation financière et reporting IFRS\nGestion de trésorerie et cash management\nRelations investisseurs\nAudit interne et contrôle de gestion\nIngénierie financière et levée de fonds",
                'formation'   => "DESCF (Diplôme d'Études Supérieures Comptables et Financières) – Ouagadougou (2003)\nMaster CCA – IAE de Lyon (2001)\nLicence Comptabilité & Gestion – Université de Ouagadougou (1999)",
                'experiences' => "Directrice Administrative & Financière – Excellis Invest Group (2019 – présent)\nDirectrice Financière – Coris Assurance IARD BF (2014 – 2019)\nResponsable Contrôle de Gestion – Société Générale Burkina Faso (2008 – 2014)\nAuditrice – KPMG Côte d'Ivoire (2003 – 2008)",
                'linkedin'    => null,
                'photo'       => null,
                'ordre'       => 2,
                'actif'       => true,
            ],
            [
                'id'          => 'djuridique',
                'nom'         => 'Seydou Ouédraogo',
                'role'        => 'Directeur Juridique & Conformité',
                'bio'         => "Seydou Ouédraogo garantit la sécurité juridique et la conformité réglementaire de l'ensemble du Groupe et de ses filiales, dans un environnement multi-juridictionnel couvrant le Burkina Faso et la Côte d'Ivoire. Expert du droit des affaires OHADA et de la régulation CIMA, il pilote la stratégie de conformité d'EIG et accompagne les opérations de croissance externe du Groupe.",
                'expertise'   => "Droit des affaires et droit OHADA\nRégulation des marchés financiers (AMF-UMOA, BRVM)\nConformité CIMA (assurance)\nFusions-acquisitions et due diligence juridique\nGouvernance d'entreprise et droit des sociétés",
                'formation'   => "Master 2 Droit des Affaires Internationales – Université Paris II Assas (2004)\nDEA Droit Privé – Université de Ouagadougou (2002)\nLicence en Droit – Université de Ouagadougou (2000)",
                'experiences' => "Directeur Juridique & Conformité – Excellis Invest Group (2020 – présent)\nJuriste Senior – Coris Bank International (2013 – 2020)\nConseiller Juridique – Cabinet Badouel & Associés, Paris (2007 – 2013)\nJuriste d'affaires – NSIA Groupe, Abidjan (2004 – 2007)",
                'linkedin'    => null,
                'photo'       => null,
                'ordre'       => 3,
                'actif'       => true,
            ],
            [
                'id'          => 'dops',
                'nom'         => 'Rasmané Kaboré',
                'role'        => 'Directeur des Opérations',
                'bio'         => "Rasmané Kaboré coordonne les synergies opérationnelles entre les 16 filiales du Groupe et pilote les projets de transformation organisationnelle. Il est le garant de la performance opérationnelle collective d'EIG, assurant la cohérence des processus, la qualité de l'exécution et le déploiement des meilleures pratiques à travers toutes les entités du portefeuille.",
                'expertise'   => "Management opérationnel multi-sites\nTransformation organisationnelle et gestion du changement\nGestion de projets complexes (PMI/Prince2)\nDéveloppement des ressources humaines\nStratégie de croissance et synergies de groupe",
                'formation'   => "MBA Management & Stratégie – Grenoble École de Management (2006)\nIngénieur Industriel – Institut Supérieur de Technologie, Ouagadougou (2003)",
                'experiences' => "Directeur des Opérations – Excellis Invest Group (2021 – présent)\nDirecteur des Opérations – Groupe TechAfrica, Ouagadougou (2016 – 2021)\nDirecteur des Opérations – Industries des Arts Graphiques (2010 – 2016)\nResponsable Projets – Bureau d'Études BERD, Ouagadougou (2006 – 2010)",
                'linkedin'    => null,
                'photo'       => null,
                'ordre'       => 4,
                'actif'       => true,
            ],
        ];

        foreach ($dirigeants as $d) {
            DB::table('dirigeants')->upsert($d, ['id'], array_keys(array_diff_key($d, ['id' => ''])));
        }
        $this->command->info(count($dirigeants) . ' dirigeants seeded');

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
