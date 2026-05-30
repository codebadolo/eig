<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GouvernanceSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('dirigeants')->whereIn('categorie', ['president', 'conseil', 'dg', 'direction'])->delete();

        $dirigeants = [
            // ── Président du Groupe ──────────────────────────────────────────
            [
                'id'        => 'president-groupe',
                'nom'       => 'Idrissa NASSA',
                'role'      => 'Président du Groupe',
                'role_en'   => 'Group President',
                'categorie' => 'president',
                'ordre'     => 1,
                'actif'     => true,
                'bio'       => "Idrissa NASSA préside Excellis Invest Group avec une vision portée par la conviction que l'Afrique dispose de toutes les ressources pour bâtir ses propres champions économiques. Sous son leadership, le Groupe s'est affirmé comme un acteur de référence de l'investissement multisectoriel, conjuguant rigueur financière, innovation et ancrage territorial.",
                'bio_en'    => "Idrissa NASSA leads Excellis Invest Group with a vision driven by the conviction that Africa has all the resources needed to build its own economic champions. Under his leadership, the Group has established itself as a reference player in multi-sectoral investment, combining financial rigour, innovation and territorial roots.",
                'mot'       => "Excellis Invest Group incarne une vision claire : celle d'un investisseur africain de référence, capable de mobiliser des capitaux, de fédérer des talents et de créer une valeur durable pour nos économies. Notre groupe s'est construit sur des fondations solides — la rigueur, l'innovation et un engagement profond envers le développement du continent. À la tête d'un portefeuille de filiales couvrant les secteurs les plus structurants de l'économie africaine, nous avons la responsabilité de démontrer que l'Afrique peut financer son propre développement, avec ses propres ressources et ses propres ambitions. C'est cette conviction qui guide chacune de nos décisions d'investissement.",
                'mot_en'    => "Excellis Invest Group embodies a clear vision: that of a reference African investor, capable of mobilising capital, bringing together talent and creating lasting value for our economies. Our group has been built on solid foundations — rigour, innovation and a deep commitment to the development of the continent. At the head of a portfolio of subsidiaries covering the most structuring sectors of the African economy, we have the responsibility to demonstrate that Africa can finance its own development, with its own resources and its own ambitions. This conviction guides every one of our investment decisions.",
            ],

            // ── Présidente du Conseil d'Administration ───────────────────────
            [
                'id'        => 'pca',
                'nom'       => 'Bintou Compaoré',
                'role'      => "Présidente du Conseil d'Administration",
                'role_en'   => 'Chairwoman of the Board of Directors',
                'categorie' => 'conseil',
                'ordre'     => 2,
                'actif'     => true,
                'bio'       => "Bintou Compaoré préside le Conseil d'Administration d'Excellis Invest Group depuis sa fondation en 2019. Pionnière de l'investissement institutionnel en Afrique, elle a bâti un groupe multisectoriel à partir d'une vision claire : démontrer qu'il est possible d'investir avec rigueur, avec ambition et avec un ancrage profond dans les réalités africaines.",
                'bio_en'    => "Bintou Compaoré has chaired the Board of Directors of Excellis Invest Group since its founding in 2019. A pioneer of institutional investment in Africa, she built a multi-sectoral group from a clear vision: to demonstrate that it is possible to invest with rigour, ambition and deep roots in African realities.",
                'mot'       => "Depuis la fondation d'Excellis Invest Group, notre ambition a toujours été de prouver qu'il est possible d'investir autrement en Afrique : avec rigueur, avec vision, et avec un ancrage profond dans les réalités de notre continent. Chaque filiale que nous avons construite, chaque partenariat que nous avons noué, témoigne de notre engagement à créer une valeur durable — pour nos actionnaires, pour nos collaborateurs et pour les économies dans lesquelles nous opérons. Notre gouvernance est le socle de cette ambition : exigeante, transparente et tournée vers l'avenir.",
                'mot_en'    => "Since the founding of Excellis Invest Group, our ambition has always been to prove that it is possible to invest differently in Africa: with rigour, with vision, and with deep roots in the realities of our continent. Every subsidiary we have built, every partnership we have forged, bears witness to our commitment to creating lasting value — for our shareholders, our employees and the economies in which we operate. Our governance is the foundation of this ambition: demanding, transparent and forward-looking.",
            ],

            // ── Directeur Général ────────────────────────────────────────────
            [
                'id'        => 'dg',
                'nom'       => 'Issouf Compaoré',
                'role'      => 'Directeur Général',
                'role_en'   => 'Chief Executive Officer',
                'categorie' => 'dg',
                'ordre'     => 3,
                'actif'     => true,
                'bio'       => "Issouf Compaoré dirige Excellis Invest Group depuis sa transformation en holding multisectorielle en 2019. Fort de plus de 22 ans d'expérience dans la finance et l'investissement en Afrique subsaharienne, il incarne la vision panafricaine du Groupe : mobiliser des capitaux privés au service du développement économique durable de la sous-région.",
                'bio_en'    => "Issouf Compaoré has led Excellis Invest Group since its transformation into a multi-sectoral holding in 2019. With over 22 years of experience in finance and investment in sub-Saharan Africa, he embodies the Group's pan-African vision: mobilising private capital for the sustainable economic development of the sub-region.",
                'mot'       => "Notre modèle repose sur une conviction simple : les marchés africains recèlent des opportunités considérables pour ceux qui s'y engagent avec méthode et persévérance. En sept ans, Excellis Invest Group a su identifier, structurer et accompagner des filiales dans 9 secteurs stratégiques. Cette diversification n'est pas une fin en soi — elle est le reflet de notre capacité d'adaptation et de notre lecture des besoins réels du tissu économique africain. Nous restons résolument tournés vers la croissance, l'innovation et la création de valeur partagée.",
                'mot_en'    => "Our model rests on a simple conviction: African markets hold considerable opportunities for those who engage with method and perseverance. In seven years, Excellis Invest Group has identified, structured and supported subsidiaries across 9 strategic sectors. This diversification is not an end in itself — it reflects our capacity for adaptation and our reading of the real needs of the African economic fabric. We remain resolutely focused on growth, innovation and the creation of shared value.",
            ],

            // ── Comité de Direction ──────────────────────────────────────────
            [
                'id'        => 'daf',
                'nom'       => 'Aminata Sawadogo',
                'role'      => 'Directrice Administrative & Financière',
                'role_en'   => 'Chief Administrative & Financial Officer',
                'categorie' => 'direction',
                'ordre'     => 4,
                'actif'     => true,
                'bio'       => "Responsable de la solidité financière du Groupe, de la gestion des flux financiers consolidés et du pilotage budgétaire.",
                'bio_en'    => "Responsible for the Group's financial solidity, consolidated financial flows management and budget oversight.",
                'mot'       => '',
                'mot_en'    => '',
            ],
            [
                'id'        => 'djuridique',
                'nom'       => 'Seydou Ouédraogo',
                'role'      => 'Directeur Juridique & Conformité',
                'role_en'   => 'Chief Legal & Compliance Officer',
                'categorie' => 'direction',
                'ordre'     => 5,
                'actif'     => true,
                'bio'       => "Garant de la conformité réglementaire du Groupe et de ses filiales, notamment vis-à-vis des régulateurs sectoriels (CIMA, CREPMF, BCEAO).",
                'bio_en'    => "Ensuring regulatory compliance for the Group and its subsidiaries, particularly with sectoral regulators (CIMA, CREPMF, BCEAO).",
                'mot'       => '', 'mot_en' => '',
            ],
            [
                'id'        => 'dops',
                'nom'       => 'Rasmané Kaboré',
                'role'      => 'Directeur des Opérations',
                'role_en'   => 'Chief Operating Officer',
                'categorie' => 'direction',
                'ordre'     => 6,
                'actif'     => true,
                'bio'       => "Coordinateur des synergies opérationnelles entre les filiales du Groupe, optimisant les processus et les ressources partagées.",
                'bio_en'    => "Coordinating operational synergies between the Group's subsidiaries, optimising shared processes and resources.",
                'mot'       => '', 'mot_en' => '',
            ],
            [
                'id'        => 'drh',
                'nom'       => 'Mariam Traoré',
                'role'      => 'Directrice des Ressources Humaines',
                'role_en'   => 'Chief Human Resources Officer',
                'categorie' => 'direction',
                'ordre'     => 7,
                'actif'     => true,
                'bio'       => "Pilote la politique RH du Groupe, le développement des compétences et la gestion des talents au sein des filiales.",
                'bio_en'    => "Driving the Group's HR policy, skills development and talent management across subsidiaries.",
                'mot'       => '', 'mot_en' => '',
            ],
            [
                'id'        => 'dcom',
                'nom'       => 'Fatimata Ouédraogo',
                'role'      => 'Directrice de la Communication',
                'role_en'   => 'Chief Communications Officer',
                'categorie' => 'direction',
                'ordre'     => 8,
                'actif'     => true,
                'bio'       => "Responsable de la stratégie de communication institutionnelle, de la notoriété du Groupe et de ses relations avec les médias et partenaires.",
                'bio_en'    => "Responsible for institutional communication strategy, the Group's brand awareness and its media and partner relations.",
                'mot'       => '', 'mot_en' => '',
            ],
            [
                'id'        => 'dsi',
                'nom'       => 'Ibrahim Sawadogo',
                'role'      => "Directeur des Systèmes d'Information",
                'role_en'   => 'Chief Information Officer',
                'categorie' => 'direction',
                'ordre'     => 9,
                'actif'     => true,
                'bio'       => "Responsable de la transformation numérique du Groupe, de l'infrastructure technologique et de la cybersécurité.",
                'bio_en'    => "Responsible for the Group's digital transformation, technology infrastructure and cybersecurity.",
                'mot'       => '', 'mot_en' => '',
            ],
            [
                'id'        => 'dcd',
                'nom'       => 'Abdoulaye Diallo',
                'role'      => 'Directeur du Développement Commercial',
                'role_en'   => 'Chief Commercial Development Officer',
                'categorie' => 'direction',
                'ordre'     => 10,
                'actif'     => true,
                'bio'       => "Anime le développement commercial du Groupe, la conquête de nouveaux marchés et la gestion des partenariats stratégiques.",
                'bio_en'    => "Driving the Group's commercial development, new market conquest and strategic partnership management.",
                'mot'       => '', 'mot_en' => '',
            ],
            [
                'id'        => 'dstrat',
                'nom'       => 'Oumar Compaoré',
                'role'      => 'Directeur de la Stratégie et du Développement',
                'role_en'   => 'Chief Strategy & Development Officer',
                'categorie' => 'direction',
                'ordre'     => 11,
                'actif'     => true,
                'bio'       => "Pilote la réflexion stratégique du Groupe, les plans à moyen terme et les opportunités d'investissement et de croissance externe.",
                'bio_en'    => "Driving the Group's strategic thinking, medium-term plans and investment and external growth opportunities.",
                'mot'       => '', 'mot_en' => '',
            ],
            [
                'id'        => 'drisk',
                'nom'       => 'Aïcha Sané',
                'role'      => 'Directrice des Risques et de la Conformité',
                'role_en'   => 'Chief Risk & Compliance Officer',
                'categorie' => 'direction',
                'ordre'     => 12,
                'actif'     => true,
                'bio'       => "Responsable du dispositif de gestion des risques, du contrôle interne et de la conformité réglementaire du Groupe.",
                'bio_en'    => "Responsible for risk management, internal control and regulatory compliance across the Group.",
                'mot'       => '', 'mot_en' => '',
            ],
            [
                'id'        => 'dfiliales',
                'nom'       => 'Cheick Ouédraogo',
                'role'      => 'Directeur du Portefeuille Filiales',
                'role_en'   => 'Head of Subsidiaries Portfolio',
                'categorie' => 'direction',
                'ordre'     => 13,
                'actif'     => true,
                'bio'       => "Assure le suivi opérationnel et stratégique des filiales du portefeuille, les reportings de performance et les synergies inter-filiales.",
                'bio_en'    => "Overseeing the operational and strategic monitoring of portfolio subsidiaries, performance reporting and cross-subsidiary synergies.",
                'mot'       => '', 'mot_en' => '',
            ],
        ];

        DB::table('dirigeants')->upsert(
            $dirigeants,
            ['id'],
            ['nom', 'role', 'role_en', 'categorie', 'ordre', 'actif', 'bio', 'bio_en', 'mot', 'mot_en']
        );

        $this->command->info(count($dirigeants) . ' dirigeants seeded (GouvernanceSeeder)');
    }
}
