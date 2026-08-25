<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LoansRecoveryCompanyUpdateSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('filiales')->where('id', 'loans-recovery-company')->update([
            'nom'             => 'Loans Recovery Company',
            'sigle'           => 'LRC',
            'secteur'         => 'Recouvrement et rachat des actifs financiers',
            'secteur_en'      => 'Debt Recovery & Financial Asset Purchase',
            'secteur_slug'    => 'services-financiers',
            'pays'            => 'Burkina Faso',
            'ville'           => 'Ouagadougou',
            'adresse'         => "ZACA, Avenue de l'UEMOA, immeuble parcelle N°10, lot 20, section 006 — 01 BP 6092 Ouagadougou 01",

            'description'     => "L'expertise au service de vos actifs financiers. Spécialiste du recouvrement et du rachat des actifs financiers, LRC transforme vos créances en performance — avec rigueur, éthique et respect de vos relations d'affaires.\n\nLoans Recovery Company (LRC), filiale du Groupe Excellis Invest Group, est une société spécialisée dans le recouvrement et le rachat des actifs financiers. Elle apporte aux institutions financières, aux entreprises et aux investisseurs des solutions stratégiques pour optimiser, valoriser et sécuriser leurs actifs, portées par une équipe pluridisciplinaire cumulant de nombreuses années d'expertise en finance, droit et gestion du risque.",
            'description_en'  => "Expertise at the service of your financial assets. A specialist in debt recovery and the purchase of financial assets, LRC turns your receivables into performance — with rigour, ethics and respect for your business relationships.\n\nLoans Recovery Company (LRC), a subsidiary of Excellis Invest Group, is a company specialising in the recovery and purchase of financial assets. It provides financial institutions, businesses and investors with strategic solutions to optimise, enhance and secure their assets, backed by a multidisciplinary team with many years of expertise in finance, law and risk management.",

            'mission'         => "Offrir une seconde vie aux actifs financiers, par des solutions innovantes de rachat, de recouvrement et de restructuration de créances, garantissant une meilleure liquidité et une réduction maîtrisée des risques.",
            'mission_en'      => "Give financial assets a second life through innovative debt purchase, recovery and restructuring solutions, ensuring improved liquidity and controlled risk reduction.",

            'vision'          => "Devenir le partenaire de référence de la gestion et de la restructuration des créances dans l'espace UEMOA, en contribuant à la stabilité financière et à un environnement économique sain et durable.",
            'vision_en'       => "Become the reference partner for debt management and restructuring in the UEMOA region, contributing to financial stability and a sound, sustainable economic environment.",

            'valeurs'         => "Labeur · Rigueur · Créativité",
            'valeurs_en'      => "Labour · Rigour · Creativity",

            'commentaires'    => "Nos activités :\n— Rachat de créances : convertir vos créances commerciales en trésorerie immédiate (avec ou sans recours) et assainir vos portefeuilles clients.\n— Recouvrement de créances : un processus gradué — amiable, précontentieux et judiciaire — alliant fermeté, diplomatie et conformité.\n— Conseil & optimisation des actifs : diagnostic du DSO et du BFR, tableaux de bord et stratégies d'optimisation de la performance financière.\n— Gestion & restructuration pour tiers : mandataire spécialisé en gestion déléguée, restructuration et valorisation de portefeuilles d'actifs.\n\nInformations légales : Société Anonyme à Conseil d'Administration, capital social de 500 000 000 FCFA, à Ouagadougou depuis 2023. RCCM : BF OUA 01 2023 B14 15923 · IFU : 00220175F.",
            'commentaires_en' => "Our activities:\n— Debt purchase: convert your trade receivables into immediate cash (with or without recourse) and clean up your customer portfolios.\n— Debt recovery: a graduated process — amicable, pre-litigation and judicial — combining firmness, diplomacy and compliance.\n— Advisory & asset optimisation: DSO and working capital diagnostics, dashboards and financial performance optimisation strategies.\n— Third-party management & restructuring: specialised agent for delegated management, restructuring and valuation of asset portfolios.\n\nLegal information: Public limited company with a Board of Directors, share capital of 500,000,000 FCFA, based in Ouagadougou since 2023. RCCM: BF OUA 01 2023 B14 15923 · Tax ID: 00220175F.",

            'telephone'       => '+226 25 33 50 65',
            'website'         => 'https://www.lrc.com',

            'actif'           => true,
            'updated_at'      => now(),
        ]);

        $this->command->info('✅  loans-recovery-company mis à jour avec succès.');
    }
}
