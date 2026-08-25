<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExcelisUpdateSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('filiales')->where('id', 'excelis-in')->update([
            'nom'             => 'Excelis',
            'sigle'           => 'EX',
            'secteur'         => 'Technologies financières et transformation numérique',
            'secteur_en'      => 'Financial Technology & Digital Transformation',
            'secteur_slug'    => 'technologies-fintech',
            'pays'            => 'Burkina Faso',
            'ville'           => 'Ouagadougou',

            'description'     => "EXCELIS-SA est une entreprise burkinabè spécialisée dans les technologies financières et la transformation numérique. Créée en 2016 et basée à Ouagadougou, elle conçoit et déploie des solutions innovantes et sécurisées au profit des institutions financières, des entreprises et des administrations publiques.\n\nSon expertise couvre notamment la monétique, l'émission et la personnalisation de cartes, les solutions de paiement, la fourniture et la maintenance de guichets automatiques bancaires, le développement de logiciels, l'intégration de solutions technologiques et la formation. EXCELIS-SA propose également des plateformes dédiées à la microfinance, à la gestion des tontines, aux cartes pétrolières et à la messagerie professionnelle.\n\nAvec plus de 15 années d'expertise revendiquées, plus de 800 000 cartes produites et une dizaine d'établissements financiers accompagnés, EXCELIS-SA ambitionne de devenir un acteur de référence des services numériques et monétiques dans l'espace UEMOA.",
            'description_en'  => "EXCELIS-SA is a Burkinabe company specialising in financial technology and digital transformation. Founded in 2016 and based in Ouagadougou, it designs and deploys innovative, secure solutions for financial institutions, businesses and public administrations.\n\nIts expertise notably covers electronic payments (monetics), card issuance and personalisation, payment solutions, the supply and maintenance of automated teller machines (ATMs), software development, technology integration and training. EXCELIS-SA also offers platforms dedicated to microfinance, tontine (savings group) management, fuel cards and professional messaging.\n\nWith over 15 years of claimed expertise, more than 800,000 cards produced and around ten financial institutions supported, EXCELIS-SA aims to become a benchmark player in digital and electronic payment services across the WAEMU (UEMOA) region.",

            'mission'         => "Concevoir et déployer des solutions numériques innovantes et sécurisées au service des institutions financières, des entreprises et des administrations publiques.",
            'mission_en'      => "Design and deploy innovative, secure digital solutions for financial institutions, businesses and public administrations.",

            'vision'          => "Devenir un acteur de référence des services numériques et monétiques dans l'espace UEMOA.",
            'vision_en'       => "Become a benchmark player in digital and electronic payment services across the WAEMU (UEMOA) region.",

            'commentaires'    => "Chiffres clés : plus de 15 années d'expertise, plus de 800 000 cartes produites, une dizaine d'établissements financiers accompagnés.\nDomaines d'activité : monétique, émission et personnalisation de cartes, solutions de paiement, fourniture et maintenance de GAB, développement logiciel, intégration de solutions technologiques, formation.\nPlateformes : microfinance, gestion des tontines, cartes pétrolières, messagerie professionnelle.",
            'commentaires_en' => "Key figures: over 15 years of expertise, more than 800,000 cards produced, around ten financial institutions supported.\nAreas of activity: electronic payments, card issuance and personalisation, payment solutions, ATM supply and maintenance, software development, technology integration, training.\nPlatforms: microfinance, tontine management, fuel cards, professional messaging.",

            'website'         => 'https://www.excelis-sa.com',

            'actif'           => true,
            'updated_at'      => now(),
        ]);

        $this->command->info('✅  excelis mis à jour avec succès.');
    }
}
