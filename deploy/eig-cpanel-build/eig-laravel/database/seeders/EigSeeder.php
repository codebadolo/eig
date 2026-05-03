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
        // Filiales
        // ----------------------------------------------------------------
        $filiales = [
            ['id' => 'intermediaire-des-services',  'sigle' => 'IS',  'nom' => 'Intermédiaire Des Services',        'secteur' => 'Services Financiers',          'secteur_slug' => 'services-financiers',   'pays' => 'Burkina Faso',   'description' => "La société accompagne ses clients en intermédiation bancaire, négociation de financements et structuration de montages financiers adaptés à leurs besoins.", 'logo' => null, 'ordre' => 1,  'actif' => true],
            ['id' => 'loans-recovery-company',       'sigle' => 'LRC', 'nom' => 'Loans Recovery Company',           'secteur' => 'Gestion de Créances',           'secteur_slug' => 'services-financiers',   'pays' => 'Burkina Faso',   'description' => "Société spécialisée dans la gestion des créances, à travers le recouvrement, le rachat et la restructuration de créances.",                          'logo' => null, 'ordre' => 2,  'actif' => true],
            ['id' => 'barka-energies',                'sigle' => 'BE',  'nom' => 'Barka Energies',                   'secteur' => 'Énergie',                       'secteur_slug' => 'energie',               'pays' => 'Burkina Faso',   'description' => "Barka Energies intervient dans la distribution de produits pétroliers et dans la fourniture de solutions solaires.",                                  'logo' => null, 'ordre' => 3,  'actif' => true],
            ['id' => 'sopatel-silmande',              'sigle' => 'SS',  'nom' => 'Sopatel Silmandé',                 'secteur' => 'Hôtellerie & Restauration',      'secteur_slug' => 'hotellerie',            'pays' => 'Burkina Faso',   'description' => "Établissement hôtelier de référence à Ouagadougou, offrant des services d'hébergement et de restauration haut de gamme.",                           'logo' => null, 'ordre' => 4,  'actif' => true],
            ['id' => 'coris-assurance-iard-bf',       'sigle' => 'CA',  'nom' => 'Coris Assurance IARD BF',          'secteur' => 'Assurance Non-Vie',              'secteur_slug' => 'assurance',             'pays' => 'Burkina Faso',   'description' => "Conseil, conception et commercialisation de produits d'assurances non vie au Burkina Faso, sous régulation CIMA.",                                   'logo' => null, 'ordre' => 5,  'actif' => true],
            ['id' => 'coris-assurance-vie-bf',        'sigle' => 'CV',  'nom' => 'Coris Assurance Vie BF',           'secteur' => 'Assurance Vie',                  'secteur_slug' => 'assurance',             'pays' => 'Burkina Faso',   'description' => "Conseil, conception et commercialisation de produits d'assurances vie au Burkina Faso, sous régulation CIMA.",                                      'logo' => null, 'ordre' => 6,  'actif' => true],
            ['id' => 'coris-assurance-iard-ci',       'sigle' => 'CI',  'nom' => 'Coris Assurance IARD CI',          'secteur' => 'Assurance Non-Vie',              'secteur_slug' => 'assurance',             'pays' => "Côte d'Ivoire",  'description' => "Conseil, conception et commercialisation de produits d'assurances non vie en Côte d'Ivoire, sous régulation CIMA.",                               'logo' => null, 'ordre' => 7,  'actif' => true],
            ['id' => 'coris-assurance-vie-ci',        'sigle' => 'CVI', 'nom' => 'Coris Assurance Vie CI',           'secteur' => 'Assurance Vie',                  'secteur_slug' => 'assurance',             'pays' => "Côte d'Ivoire",  'description' => "Conseil, conception et commercialisation de produits d'assurances vie en Côte d'Ivoire, sous régulation CIMA.",                                  'logo' => null, 'ordre' => 8,  'actif' => true],
            ['id' => 'coris-bourse',                  'sigle' => 'CB',  'nom' => 'Coris Bourse',                     'secteur' => 'Marchés Financiers',             'secteur_slug' => 'marches-financiers',    'pays' => 'Burkina Faso',   'description' => "Société de Gestion et d'Intermédiation (SGI), accompagnant sa clientèle dans l'achat et la vente de valeurs mobilières sur la BRVM.",              'logo' => null, 'ordre' => 9,  'actif' => true],
            ['id' => 'coris-asset-management',        'sigle' => 'CAM', 'nom' => 'Coris Asset Management',           'secteur' => "Gestion d'Actifs",               'secteur_slug' => 'marches-financiers',    'pays' => 'Burkina Faso',   'description' => "Société de Gestion d'OPCVM (SGO), spécialisée dans la gestion de fonds communs de placement sur la BRVM.",                                         'logo' => null, 'ordre' => 10, 'actif' => true],
            ['id' => 'expertis-bf',                   'sigle' => 'EXB', 'nom' => 'Expertis BF',                      'secteur' => 'Immobilier & Capital-Risque',    'secteur_slug' => 'immobilier-capital',    'pays' => 'Burkina Faso',   'description' => "Spécialisée dans la tierce détention, le suivi d'exécution de projets, les investissements en capital-risque et la promotion immobilière.",          'logo' => null, 'ordre' => 11, 'actif' => true],
            ['id' => 'expertis-ci',                   'sigle' => 'EXC', 'nom' => 'Expertis CI',                      'secteur' => 'Immobilier & Capital-Risque',    'secteur_slug' => 'immobilier-capital',    'pays' => "Côte d'Ivoire",  'description' => "Spécialisée dans la tierce détention, le capital-risque, la promotion immobilière et la maîtrise d'ouvrage déléguée en Côte d'Ivoire.",           'logo' => null, 'ordre' => 12, 'actif' => true],
            ['id' => 'industries-arts-graphiques',    'sigle' => 'IAG', 'nom' => 'Industries des Arts Graphiques',   'secteur' => 'Industrie & Arts Graphiques',    'secteur_slug' => 'industrie',             'pays' => 'Burkina Faso',   'description' => "Spécialisée dans l'imprimerie, la conception graphique, la signalétique et la sécurisation de documents sensibles.",                              'logo' => null, 'ordre' => 14, 'actif' => true],
            ['id' => 'novelus',                       'sigle' => 'NOV', 'nom' => 'Novelus',                          'secteur' => 'Commerce & Fournitures',         'secteur_slug' => 'commerce',              'pays' => 'Burkina Faso',   'description' => "Entreprise commerciale spécialisée dans la fourniture de bureau, les consommables, le matériel informatique et les groupes électrogènes.",          'logo' => null, 'ordre' => 15, 'actif' => true],
            ['id' => 'energytis',                     'sigle' => 'ET',  'nom' => 'Energytis',                        'secteur' => "Production d'Énergie",           'secteur_slug' => 'energie',               'pays' => 'Burkina Faso',   'description' => "Spécialisée dans l'étude, l'ingénierie, le développement, le financement et l'exploitation de sites de production d'énergie.",                   'logo' => null, 'ordre' => 16, 'actif' => true],
            ['id' => 'general-mining-logistics',      'sigle' => 'GML', 'nom' => 'General Mining Logistics TS',      'secteur' => 'Transport & Logistique Minière', 'secteur_slug' => 'logistique-miniere',    'pays' => 'Burkina Faso',   'description' => "Intervient dans les services logistiques, techniques et opérationnels au profit des secteurs minier et industriel.",                               'logo' => null, 'ordre' => 17, 'actif' => true],
        ];

        foreach ($filiales as $f) {
            $f['created_at'] = now();
            $f['updated_at'] = now();
            DB::table('filiales')->upsert($f, ['id'], array_keys(array_diff_key($f, ['id' => ''])));
        }
        $this->command->info(count($filiales) . ' filiales seeded');

        // ----------------------------------------------------------------
        // Metiers
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
                'enjeux'       => "La protection des personnes et des biens est un levier essentiel de résilience économique.",
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
                'contribution' => 'EIG intervient sur la BRVM via deux entités spécialisées.',
                'filiales_ids' => json_encode(['coris-bourse', 'coris-asset-management']),
                'ordre'        => 3,
                'actif'        => true,
            ],
            [
                'id'           => Str::random(25),
                'slug'         => 'immobilier-capital',
                'titre'        => 'Immobilier & Capital-Risque',
                'icone'        => 'building',
                'couleur'      => 'linear-gradient(135deg, #6B4A1A, #4A3010)',
                'description'  => "Promotion immobilière, maîtrise d'ouvrage déléguée, tierce détention et capital-risque.",
                'enjeux'       => "Le déficit de logements et d'infrastructures en Afrique de l'Ouest représente à la fois un défi social et une opportunité d'investissement.",
                'contribution' => "EIG accompagne les maîtres d'ouvrage publics et privés tout en prenant des participations dans des projets à fort potentiel.",
                'filiales_ids' => json_encode(['expertis-bf', 'expertis-ci']),
                'ordre'        => 4,
                'actif'        => true,
            ],
            [
                'id'           => Str::random(25),
                'slug'         => 'energie',
                'titre'        => 'Énergie',
                'icone'        => 'bolt',
                'couleur'      => 'linear-gradient(135deg, #1A4A6B, #102A4A)',
                'description'  => "Distribution de produits pétroliers, solutions solaires et ingénierie de production d'énergie.",
                'enjeux'       => "L'accès à l'énergie est un défi majeur en Afrique subsaharienne.",
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
                'enjeux'       => "La révolution numérique transforme l'accès aux services financiers.",
                'contribution' => 'Excellis, la fintech du groupe, développe des solutions digitales innovantes.',
                'filiales_ids' => json_encode(['Excellis']),
                'ordre'        => 6,
                'actif'        => true,
            ],
            [
                'id'           => Str::random(25),
                'slug'         => 'industrie',
                'titre'        => 'Industrie & Arts Graphiques',
                'icone'        => 'print',
                'couleur'      => 'linear-gradient(135deg, #2A4A1A, #1A3010)',
                'description'  => 'Imprimerie, signalétique, conception graphique et sécurisation de documents sensibles.',
                'enjeux'       => "La sécurisation des documents officiels est un besoin croissant dans la région.",
                'contribution' => "EIG contribue à la sécurisation documentaire de l'État et des institutions.",
                'filiales_ids' => json_encode(['industries-arts-graphiques']),
                'ordre'        => 7,
                'actif'        => true,
            ],
            [
                'id'           => Str::random(25),
                'slug'         => 'logistique-miniere',
                'titre'        => 'Transport & Logistique Minière',
                'icone'        => 'truck',
                'couleur'      => 'linear-gradient(135deg, #4A3A1A, #3A2A10)',
                'description'  => "Logistique, transport d'agrégats miniers et services opérationnels pour les industries extractives.",
                'enjeux'       => "L'industrie minière burkinabè est un secteur clé de l'économie nationale.",
                'contribution' => 'General Mining Logistics TS offre des services logistiques de qualité aux opérateurs miniers.',
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
                'enjeux'       => "Le développement économique génère des besoins croissants en infrastructures d'accueil.",
                'contribution' => 'Sopatel Silmandé est une référence hôtelière à Ouagadougou.',
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
        // Articles
        // ----------------------------------------------------------------
        $articles = [
            [
                'id'       => Str::random(25),
                'slug'     => 'lancement-site-institutionnel-2026',
                'titre'    => 'Excellis Invest Group lance son nouveau site internet institutionnel',
                'categorie'=> 'Corporate',
                'date'     => 'Avril 2026',
                'extrait'  => "Marquant une nouvelle étape dans sa stratégie de visibilité digitale, EIG se dote d'une plateforme institutionnelle de premier rang.",
                'contenu'  => "Excellis Invest Group franchit une nouvelle étape dans sa stratégie de communication et de visibilité digitale avec le lancement de son site internet institutionnel.",
                'couleur'  => 'linear-gradient(135deg, #1A6B7A, #0F4855)',
                'featured' => true,
                'image'    => null,
                'publie'   => true,
            ],
            [
                'id'       => Str::random(25),
                'slug'     => 'Excellis-fintech-deploiement',
                'titre'    => 'Excellis accélère le déploiement de ses solutions fintech',
                'categorie'=> 'Filiales',
                'date'     => 'Mars 2026',
                'extrait'  => "La filiale technologique du Groupe multiplie ses partenariats stratégiques pour accélérer la digitalisation.",
                'contenu'  => "Excellis, la fintech d'Excellis Invest Group, annonce l'accélération de son programme de déploiement de solutions numériques.",
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
                'extrait'  => "La filiale spécialisée dans l'ingénierie énergétique consolide sa position sur le marché.",
                'contenu'  => "Energytis, filiale d'Excellis Invest Group spécialisée dans la production d'énergie, remporte un contrat d'envergure.",
                'couleur'  => 'linear-gradient(135deg, #6B4A1A, #4A3010)',
                'featured' => false,
                'image'    => null,
                'publie'   => true,
            ],
            [
                'id'       => Str::random(25),
                'slug'     => 'notation-bloomfield-confirmation',
                'titre'    => "Bloomfield Investment Corporation confirme la notation BBB d'EIG",
                'categorie'=> 'Finance',
                'date'     => 'Janvier 2026',
                'extrait'  => "La reconfirmation de la notation BBB par Bloomfield témoigne de la solidité de la gouvernance d'EIG.",
                'contenu'  => "Bloomfield Investment Corporation a reconduit sa notation BBB à Excellis Invest Group, confirmant la robustesse de sa structure financière.",
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
        // Company Info
        // ----------------------------------------------------------------
        $companyData = [
            'nom'              => 'Excellis Invest Group',
            'tagline'          => 'Investir autrement',
            'descriptionCourte'=> "Holding d'investissement multisectorielle basée au Burkina Faso. 20 milliards FCFA de capital social. 17 filiales. 9 secteurs stratégiques. Noté Bloomfield.",
            'description'      => "Excellis Invest Group (ex Coris Invest Group) est une holding d'investissement multisectorielle basée au Burkina Faso.",
            'mission'          => "Mobiliser des expertises, des capitaux et des mécanismes d'intervention à forte valeur ajoutée pour accompagner les institutions et entreprises africaines dans leur financement, leur structuration et leur développement durable.",
            'vision'           => "Être un investisseur panafricain de référence, catalyseur de croissance, de transformation et de création de valeur durable en Afrique.",
            'valeurs'          => [
                ['titre' => 'Rigueur',         'icone' => 'scale-balanced', 'description' => "Des standards élevés dans toutes nos décisions d'investissement et dans notre gouvernance."],
                ['titre' => 'Adaptabilité',    'icone' => 'arrows-rotate',  'description' => "Un modèle évolutif, ancré dans les réalités économiques africaines et ouvert aux opportunités."],
                ['titre' => 'Innovation',      'icone' => 'lightbulb',      'description' => "Une culture de l'innovation au service de la modernisation des économies africaines."],
                ['titre' => "Esprit d'équipe", 'icone' => 'handshake',      'description' => "Une synergie des filiales et des talents pour créer une valeur collective supérieure."],
            ],
            'kpis'             => [
                ['num' => '20',  'unite' => 'Mds', 'label' => 'FCFA de capital social'],
                ['num' => '17',  'unite' => '',    'label' => 'Filiales opérationnelles'],
                ['num' => '9',   'unite' => '',    'label' => "Secteurs d'activité"],
                ['num' => '2',   'unite' => '',    'label' => 'Pays (BF + CI)'],
                ['num' => 'BBB', 'unite' => '',    'label' => 'Notation Bloomfield'],
            ],
            'adresse'          => 'Ouagadougou, Burkina Faso',
            'email'            => 'contact@excellis-invest-group.com',
            'telephone'        => '+226 25 30 00 00',
            'whatsapp'         => '22625300000',
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
        // ----------------------------------------------------------------
        $dirigeants = [
            [
                'id'          => 'dg',
                'nom'         => 'Issouf Compaoré',
                'role'        => 'Directeur Général',
                'bio'         => "Issouf Compaoré dirige Excellis Invest Group depuis sa transformation en holding multisectorielle. Fort de plus de 22 ans d'expérience dans la finance et l'investissement en Afrique subsaharienne, il incarne la vision panafricaine du Groupe : mobiliser des capitaux privés au service du développement économique durable de la sous-région. Sous sa direction, EIG a structuré un portefeuille de 17 filiales couvrant 9 secteurs stratégiques, tout en maintenant une notation BBB attribuée par Bloomfield Investment Corporation.",
                'expertise'   => "Stratégie d'investissement\nFinance d'entreprise et structuration\nGouvernance de holdings\nDéveloppement des marchés financiers africains\nRelations institutionnelles et partenariats stratégiques",
                'formation'   => "MBA Finance & Stratégie – HEC Paris (2002)\nMaster 2 Économie Internationale – Université Paris I Panthéon-Sorbonne (2000)\nLicence en Sciences Économiques – Université de Ouagadougou (1998)",
                'experiences' => "Directeur Général – Excellis Invest Group, Ouagadougou (2018 – présent)\nDirecteur des Investissements – Coris Bank International (2012 – 2018)\nResponsable Pôle Financement – BOAD, Lomé (2007 – 2012)\nAnalyste Financier Senior – Société Générale, Paris (2002 – 2007)",
                'linkedin'    => null,
                'photo'       => null,
                'ordre'       => 1,
                'actif'       => true,
            ],
            [
                'id'          => 'daf',
                'nom'         => 'Aminata Sawadogo',
                'role'        => 'Directrice Administrative & Financière',
                'bio'         => "Aminata Sawadogo supervise l'ensemble des fonctions financières d'Excellis Invest Group : reporting consolidé, gestion de trésorerie, relations avec les investisseurs et suivi de la notation Bloomfield. Reconnue pour sa rigueur et son excellence opérationnelle, elle a joué un rôle clé dans l'obtention et le maintien de la notation BBB du Groupe, gage de crédibilité auprès des partenaires financiers internationaux.",
                'expertise'   => "Consolidation financière et reporting IFRS\nGestion de trésorerie et cash management\nRelations investisseurs et notation financière\nAudit interne et contrôle de gestion\nIngénierie financière et levée de fonds",
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
                'bio'         => "Rasmané Kaboré coordonne les synergies opérationnelles entre les 17 filiales du Groupe et pilote les projets de transformation organisationnelle. Il est le garant de la performance opérationnelle collective d'EIG, assurant la cohérence des processus, la qualité de l'exécution et le déploiement des meilleures pratiques à travers toutes les entités du portefeuille.",
                'expertise'   => "Management opérationnel multi-sites\nTransformation organisationnelle et gestion du changement\nGestion de projets complexes (PMI/Prince2)\nDéveloppement des ressources humaines\nStratégie de croissance et synergies de groupe",
                'formation'   => "MBA Management & Stratégie – Grenoble École de Management (2006)\nIngénieur Industriel – Institut Supérieur de Technologie, Ouagadougou (2003)",
                'experiences' => "Directeur des Opérations – Excellis Invest Group (2021 – présent)\nDirecteur Général Adjoint – Novelus (2016 – 2021)\nDirecteur des Opérations – Industries des Arts Graphiques (2010 – 2016)\nResponsable Projets – Bureau d'Études BERD, Ouagadougou (2006 – 2010)",
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
                'date_expiration' => 'Mai 2026',
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
                'date_expiration' => 'Mai 2026',
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
                'date_expiration' => 'Juin 2026',
                'description'     => "Excelis, la filiale fintech d'Excellis Invest Group, recrute un(e) Ingénieur Développement Logiciel pour contribuer à la conception et au déploiement de solutions numériques innovantes dans les domaines de la monétique, du paiement digital et des services financiers.",
                'missions'        => "Concevoir, développer et maintenir des applications web et mobiles de paiement digital\nParticiper à l'architecture technique des solutions monétiques\nIntégrer des APIs bancaires et des systèmes de paiement (mobile money, cartes bancaires)\nEnsurer la sécurité et la performance des applications\nRédiger la documentation technique\nCollaborer avec les équipes métier et les partenaires technologiques",
                'profil'          => "Bac+5 Informatique, Génie Logiciel ou équivalent\nMinimum 3 ans d'expérience en développement (Node.js, React, Python ou Java)\nExpérience dans le domaine fintech ou bancaire appréciée\nConnaissance des protocoles de sécurité et de cryptographie\nEsprit d'équipe, curiosité technologique et autonomie\nAnglais technique lu et écrit",
                'avantages'       => "Environnement technologique innovant\nTélétravel et flexibilité\nAccès aux dernières technologies et outils de développement\nFormation continue et certifications (AWS, Google Cloud)\nImpact direct sur l'inclusion financière en Afrique",
                'actif'           => true,
            ],
            [
                'id'              => Str::random(25),
                'titre'           => 'Chargé(e) de Communication & Relations Médias',
                'departement'     => 'Communication',
                'lieu'            => 'Ouagadougou, Burkina Faso',
                'type'            => 'CDI',
                'salaire'         => 'Selon profil',
                'date_expiration' => 'Mai 2026',
                'description'     => "Excellis Invest Group recrute un(e) Chargé(e) de Communication pour gérer la communication institutionnelle du Groupe, renforcer sa présence médiatique et développer sa stratégie digitale en cohérence avec son positionnement de holding panafricaine de référence.",
                'missions'        => "Élaborer et mettre en œuvre le plan de communication annuel du Groupe\nGérer les relations avec les médias (presse, radio, TV) et rédiger les communiqués de presse\nProduire les contenus éditoriaux (rapports annuels, brochures, newsletters)\nAnimer les réseaux sociaux institutionnels (LinkedIn, Twitter/X)\nOrganiser les événements corporate (conférences de presse, assemblées, forums)\nVeiller à la cohérence de l'image de marque du Groupe",
                'profil'          => "Bac+4/5 Communication, Journalisme ou Sciences Politiques\nMinimum 3 ans d'expérience en communication institutionnelle ou relations presse\nExcellentes qualités rédactionnelles en français\nMaîtrise des outils digitaux et des réseaux sociaux professionnels\nSens de l'esthétique et de la mise en forme (InDesign, Canva)\nCapacité à travailler sous pression et à gérer plusieurs projets simultanément",
                'avantages'       => "Rôle central dans la construction de la marque EIG\nBudget communication dédié\nParticipation aux événements économiques africains de premier plan\nEvolution vers un poste de Directeur de la Communication",
                'actif'           => true,
            ],
            [
                'id'              => Str::random(25),
                'titre'           => 'Auditeur Interne',
                'departement'     => 'Direction Générale',
                'lieu'            => 'Ouagadougou, Burkina Faso',
                'type'            => 'CDI',
                'salaire'         => 'Selon profil',
                'date_expiration' => 'Juin 2026',
                'description'     => "Dans le cadre du renforcement de son dispositif de gouvernance, Excellis Invest Group recrute un(e) Auditeur(trice) Interne. Rattaché(e) à la Direction Générale, vous conduirez des missions d'audit auprès des filiales du Groupe pour évaluer la maîtrise des risques et l'efficacité des contrôles internes.",
                'missions'        => "Planifier et réaliser des missions d'audit interne (opérationnel, financier, conformité) auprès des filiales\nÉvaluer l'adéquation et l'efficacité des dispositifs de contrôle interne\nRédiger les rapports d'audit avec recommandations\nSuivre la mise en œuvre des plans d'action\nContribuer à la cartographie des risques du Groupe\nFormation des équipes opérationnelles aux bonnes pratiques",
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
                'date_expiration' => 'Mai 2026',
                'description'     => "Excellis Invest Group offre une opportunité de stage de 6 mois au sein de la Direction des Opérations. Ce stage vous permettra d'acquérir une vision globale du fonctionnement d'une holding d'investissement multisectorielle et de contribuer concrètement à des projets transversaux.",
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
            ['section' => 'hero',       'url' => '/uploads/Create_a_premium_institutional_website_hero_banner-1776959860789.png',    'titre' => 'Hero principal',           'alt' => 'Excellis Invest Group — holding panafricaine', 'ordre' => 1, 'actif' => true],
            ['section' => 'hero',       'url' => '/uploads/Create_an_institutional_hero_image_for_Excellis_In-1776959887429.png',    'titre' => 'Hero alternatif',          'alt' => 'Excellis Invest Group',                        'ordre' => 2, 'actif' => false],
            ['section' => 'about',      'url' => '/uploads/Create_a_premium_institutional_website_section_vis-1776960072527.png',    'titre' => 'À propos / Le Groupe',     'alt' => 'Excellis Invest Group — notre groupe',         'ordre' => 1, 'actif' => true],
            ['section' => 'governance', 'url' => '/uploads/Create_a_high-end_governance_website_header_for_Ex-1776959898389.png',    'titre' => 'Gouvernance',              'alt' => 'Gouvernance EIG',                              'ordre' => 1, 'actif' => true],
            ['section' => 'careers',    'url' => '/uploads/Create_a_premium_careers_website_hero_for_Excellis-1776959911645.png',    'titre' => 'Carrières',                'alt' => 'Rejoindre Excellis Invest Group',               'ordre' => 1, 'actif' => true],
            ['section' => 'energie',    'url' => '/uploads/Create_a_premium_African_infrastructure_and_energy-1776960084836.png',    'titre' => 'Énergie & Infrastructure',  'alt' => 'Énergie en Afrique',                           'ordre' => 1, 'actif' => true],
            ['section' => 'fintech',    'url' => '/uploads/Create_a_premium_innovation_and_fintech_website_se-1776960091610.png',    'titre' => 'Fintech & Innovation',     'alt' => 'Innovation digitale',                          'ordre' => 1, 'actif' => true],
            ['section' => 'contact',    'url' => '/uploads/Create_a_premium_institutional_contact_and_regiona-1776960099855.png',    'titre' => 'Contact',                  'alt' => 'Nous contacter',                               'ordre' => 1, 'actif' => true],
            ['section' => 'general',    'url' => '/uploads/pHYCs2BW.png',                                                            'titre' => 'Image générale',           'alt' => '',                                             'ordre' => 1, 'actif' => true],
        ];

        foreach ($siteImages as $img) {
            $img['id']         = Str::random(25);
            $img['created_at'] = now();
            $img['updated_at'] = now();
            DB::table('site_images')->insert($img);
        }
        $this->command->info(count($siteImages) . ' site images seeded');

        $this->command->info('Seed complete!');
    }
}
