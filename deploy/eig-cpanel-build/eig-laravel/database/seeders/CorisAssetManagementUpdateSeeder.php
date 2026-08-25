<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CorisAssetManagementUpdateSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('filiales')->where('id', 'coris-asset-management')->update([
            'nom'             => 'Coris Asset Management',
            'sigle'           => 'CAM',
            'secteur'         => 'Services Financiers',
            'secteur_en'      => 'Financial Services',
            'secteur_slug'    => 'services-financiers',
            'pays'            => 'Burkina Faso',
            'ville'           => 'Ouagadougou',

            'description'     => "Coris Asset Management (CAM) SA est une Société de Gestion d'OPCVM (SGO) spécialisée dans la création et la gestion de Fonds Communs de Placement (FCP). Un FCP permet de mettre en commun son épargne avec d'autres investisseurs pour investir dans un large éventail de titres (actions, obligations, bons du Trésor).",
            'description_en'  => "Coris Asset Management (CAM) SA is a Collective Investment Scheme Management Company (SGO) specialising in the creation and management of Mutual Funds (FCPs). An FCP pools savings with other investors to collectively invest across a broad range of securities (equities, bonds, treasury bills).",

            'mission'         => "Promouvoir la culture boursière par une offre de services de qualité, diversifiés et adaptés à l'endroit de nos clients.",
            'mission_en'      => "Promote a savings and investment culture through quality, diversified and tailored service offerings for our clients.",

            'vision'          => "Être le partenaire de référence au Burkina Faso.",
            'vision_en'       => "Become the reference partner in Burkina Faso.",

            'valeurs'         => "Confiance · Réactivité · Excellence",
            'valeurs_en'      => "Trust · Responsiveness · Excellence",

            'commentaires'    => "Nos fonds communs de placement (FCP) :\n— FCP CORIS ACTIONS : actions cotées.\n— FCP CORIS PERFORMANCE : diversifié, actions et obligations.\n— FCP ASSURANCES : monétaire, obligations de courte durée.\n— FCP BARAKA INVEST : diversifié, conforme à la Finance Islamique.\n\nContacts téléphoniques : +226 25 33 42 00 · +226 58 64 29 64 · +226 58 13 36 23 · +226 79 87 45 46.",
            'commentaires_en' => "Our mutual funds (FCPs) :\n— FCP CORIS ACTIONS : listed equities.\n— FCP CORIS PERFORMANCE : diversified, equities and bonds.\n— FCP ASSURANCES : money market, short-term bonds.\n— FCP BARAKA INVEST : diversified, compliant with Islamic Finance.\n\nPhone contacts: +226 25 33 42 00 · +226 58 64 29 64 · +226 58 13 36 23 · +226 79 87 45 46.",

            'email_contact'   => 'info@coris-asset.com',
            'telephone'       => '+226 25 33 42 00',
            'website'         => 'https://www.coris-asset.com',

            'actif'           => true,
            'updated_at'      => now(),
        ]);

        $this->command->info('✅  coris-asset-management mis à jour avec succès.');
    }
}
