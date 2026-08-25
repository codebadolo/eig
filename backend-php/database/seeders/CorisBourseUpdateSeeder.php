<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CorisBourseUpdateSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('filiales')->where('id', 'coris-bourse')->update([
            'nom'             => 'Coris Bourse',
            'sigle'           => 'CB',
            'secteur'         => 'Services Financiers',
            'secteur_en'      => 'Financial Services',
            'secteur_slug'    => 'services-financiers',
            'pays'            => 'Burkina Faso',
            'ville'           => 'Ouagadougou',

            'description'     => "Société de Gestion et d'Intermédiation (SGI) agréée par l'AMF-UEMOA (SGI/2010-02) et créée en 2010, Coris Bourse accompagne les investisseurs dans leurs projets d'investissement et les émetteurs dans leurs opérations de financement sur le Marché Financier Régional de l'UEMOA. Elle propose des solutions adaptées aux besoins des investisseurs particuliers, des investisseurs institutionnels, des entreprises et des États, à travers l'ouverture et la gestion de comptes-titres, l'achat et la vente de valeurs mobilières, la gestion de portefeuille en gestion libre et en gestion sous mandat, la conservation de titres, le conseil en investissement, ainsi que l'intermédiation lors des opérations de marché (introductions en bourse, augmentations de capital, émissions obligataires et autres appels publics à l'épargne). Coris Bourse se distingue par son expertise des marchés financiers régionaux, la qualité de son accompagnement, son engagement en faveur de l'innovation et sa volonté de rendre l'investissement en bourse accessible au plus grand nombre.",
            'description_en'  => "A Securities Management and Intermediation Company (SGI) licensed by the WAMU Financial Market Authority (AMF-UEMOA) (SGI/2010-02) and founded in 2010, Coris Bourse supports investors in their investment projects and issuers in their financing operations on the WAEMU Regional Financial Market. It offers solutions tailored to the needs of individual and institutional investors, businesses and States, through the opening and management of securities accounts, the purchase and sale of securities, portfolio management (both discretionary and non-discretionary), custody of securities, investment advisory, and intermediation in market operations (IPOs, capital increases, bond issues and other public offerings). Coris Bourse stands out for its expertise in regional financial markets, the quality of its client support, its commitment to innovation, and its ambition to make stock market investment accessible to as many people as possible.",

            'mission'         => "Chez Coris Bourse, nous avons une conviction profonde : la bourse appartient à tous. Notre mission est d'ouvrir le marché financier à chaque investisseur avec simplicité, confiance et excellence.",
            'mission_en'      => "At Coris Bourse, we hold a deep conviction: the stock market belongs to everyone. Our mission is to open the financial market to every investor with simplicity, trust and excellence.",

            'vision'          => "Faire de Coris Bourse la SGI panafricaine leader sur le marché financier.",
            'vision_en'       => "Make Coris Bourse the leading pan-African SGI on the financial market.",

            'valeurs'         => "Excellence · Accessibilité · Confiance · Innovation · Intégrité",
            'valeurs_en'      => "Excellence · Accessibility · Trust · Innovation · Integrity",

            'commentaires'    => "Particularité : Coris Bourse met l'innovation au cœur de son accompagnement en proposant My Coris Bourse, une application mobile permettant aux investisseurs de consulter leur portefeuille, de suivre leurs avoirs et d'accéder facilement aux services de la SGI. Certifiée ISO 9001:2015, Coris Bourse inscrit également la qualité de service, l'amélioration continue et la satisfaction des investisseurs au cœur de son organisation.\n\nContacts complémentaires :\n— WhatsApp Investisseurs : +226 58 08 30 30\n\nAdresses et bureaux de liaison :\n— Siège social Burkina Faso : Immeuble Coris Bourse, Avenue Loudun, Rue 05, Ouagadougou — Tél. +226 25 33 14 85\n— Agence Bobo-Dioulasso : Coris Bank Prestige — Tél. +226 78 11 81 51\n— Côte d'Ivoire : Agence CBI-CI Treichville, Avenue 16, Rue 38, Abidjan — Tél. +225 27 20 30 75 15\n— Togo : Immeuble Coris Bank Togo, Boulevard du 13 Janvier, Béniglato, Lomé — Tél. +228 22 20 82 82\n— Mali : Siège CBI Mali, Quartier du Fleuve, Boulevard du 22 Octobre, Bamako — Tél. +223 27 70 59 00\n\nSite internet sous réserve de confirmation dans le cadre de la refonte du site internet.",
            'commentaires_en' => "Highlight: Coris Bourse places innovation at the heart of its client support with My Coris Bourse, a mobile app allowing investors to view their portfolio, track their holdings and easily access SGI services. ISO 9001:2015 certified, Coris Bourse also places service quality, continuous improvement and investor satisfaction at the core of its organisation.\n\nAdditional contacts:\n— WhatsApp for Investors: +226 58 08 30 30\n\nOffices and liaison bureaus:\n— Head office Burkina Faso: Immeuble Coris Bourse, Avenue Loudun, Rue 05, Ouagadougou — Tel. +226 25 33 14 85\n— Bobo-Dioulasso branch: Coris Bank Prestige — Tel. +226 78 11 81 51\n— Côte d'Ivoire: Agence CBI-CI Treichville, Avenue 16, Rue 38, Abidjan — Tel. +225 27 20 30 75 15\n— Togo: Immeuble Coris Bank Togo, Boulevard du 13 Janvier, Béniglato, Lomé — Tel. +228 22 20 82 82\n— Mali: Siège CBI Mali, Quartier du Fleuve, Boulevard du 22 Octobre, Bamako — Tel. +223 27 70 59 00\n\nWebsite pending confirmation as part of the website redesign.",

            'email_contact'   => 'corisbourse@coris-bourse.com',
            'telephone'       => '+226 25 33 14 85',
            'adresse'         => 'Immeuble Coris Bourse, Avenue Loudun, Rue 05, Ouagadougou',
            'website'         => 'https://www.coris-bourse.com',
            'whatsapp'        => '+22658083030',

            'actif'           => true,
            'updated_at'      => now(),
        ]);

        $this->command->info('✅  coris-bourse mis à jour avec succès.');
    }
}
