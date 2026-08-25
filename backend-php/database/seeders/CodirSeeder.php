<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CodirSeeder extends Seeder
{
    public function run(): void
    {
        // Supprime tous les anciens membres direction avant de recharger
        DB::table('dirigeants')->where('categorie', 'direction')->delete();

        $membres = [
            [
                'id'        => 'dga',
                'nom'       => 'Issaka KARGOUGOU',
                'role'      => 'Directeur Général Adjoint',
                'role_en'   => 'Deputy Chief Executive Officer',
                'categorie' => 'direction',
                'ordre'     => 10,
                'actif'     => true,
                'bio'       => "Membre du Comité de Direction d'Excellis Invest Group.",
                'bio_en'    => 'Member of the Excellis Invest Group Executive Committee.',
                'mot'       => '',
                'mot_en'    => '',
            ],
            [
                'id'        => 'dfc',
                'nom'       => 'Jean Rodrigue KINDA',
                'role'      => 'Directeur de la Finance et de la Comptabilité',
                'role_en'   => 'Director of Finance and Accounting',
                'categorie' => 'direction',
                'ordre'     => 11,
                'actif'     => true,
                'bio'       => "Membre du Comité de Direction d'Excellis Invest Group.",
                'bio_en'    => 'Member of the Excellis Invest Group Executive Committee.',
                'mot'       => '',
                'mot_en'    => '',
            ],
            [
                'id'        => 'dsit',
                'nom'       => 'HIEN Winbir Serge Stanislas',
                'role'      => "Directeur des Systèmes d'Information, d'Innovation Technologique et de la Digitalisation",
                'role_en'   => 'Director of Information Systems, Technological Innovation and Digitalisation',
                'categorie' => 'direction',
                'ordre'     => 12,
                'actif'     => true,
                'bio'       => "Membre du Comité de Direction d'Excellis Invest Group.",
                'bio_en'    => 'Member of the Excellis Invest Group Executive Committee.',
                'mot'       => '',
                'mot_en'    => '',
            ],
            [
                'id'        => 'dch',
                'nom'       => 'COMPAORE Léonard',
                'role'      => 'Directeur du Capital Humain et des Moyens Généraux',
                'role_en'   => 'Director of Human Capital and General Services',
                'categorie' => 'direction',
                'ordre'     => 13,
                'actif'     => true,
                'bio'       => "Membre du Comité de Direction d'Excellis Invest Group.",
                'bio_en'    => 'Member of the Excellis Invest Group Executive Committee.',
                'mot'       => '',
                'mot_en'    => '',
            ],
            [
                'id'        => 'daj',
                'nom'       => 'BAMA Olga',
                'role'      => 'Directrice des Affaires Juridiques et Contentieux',
                'role_en'   => 'Director of Legal Affairs and Litigation',
                'categorie' => 'direction',
                'ordre'     => 14,
                'actif'     => true,
                'bio'       => "Membre du Comité de Direction d'Excellis Invest Group.",
                'bio_en'    => 'Member of the Excellis Invest Group Executive Committee.',
                'mot'       => '',
                'mot_en'    => '',
            ],
            [
                'id'        => 'ag',
                'nom'       => 'CONGO Ismaël K. H.',
                'role'      => 'Auditeur Général',
                'role_en'   => 'General Auditor',
                'categorie' => 'direction',
                'ordre'     => 15,
                'actif'     => true,
                'bio'       => "Membre du Comité de Direction d'Excellis Invest Group.",
                'bio_en'    => 'Member of the Excellis Invest Group Executive Committee.',
                'mot'       => '',
                'mot_en'    => '',
            ],
            [
                'id'        => 'doa',
                'nom'       => 'Fass-Nè-Windé Augustin OUERMI',
                'role'      => "Directeur des Opérations d'Assurance et de Réassurance",
                'role_en'   => 'Director of Insurance and Reinsurance Operations',
                'categorie' => 'direction',
                'ordre'     => 16,
                'actif'     => true,
                'bio'       => "Membre du Comité de Direction d'Excellis Invest Group.",
                'bio_en'    => 'Member of the Excellis Invest Group Executive Committee.',
                'mot'       => '',
                'mot_en'    => '',
            ],
            [
                'id'        => 'dti',
                'nom'       => 'NEBIE Olivia Myriam',
                'role'      => 'Directrice de la Trésorerie et des Investissements',
                'role_en'   => 'Director of Treasury and Investments',
                'categorie' => 'direction',
                'ordre'     => 17,
                'actif'     => true,
                'bio'       => "Membre du Comité de Direction d'Excellis Invest Group.",
                'bio_en'    => 'Member of the Excellis Invest Group Executive Committee.',
                'mot'       => '',
                'mot_en'    => '',
            ],
            [
                'id'        => 'dmc',
                'nom'       => 'TIENO Bili Edouard',
                'role'      => 'Directeur Marketing et Communication',
                'role_en'   => 'Director of Marketing and Communication',
                'categorie' => 'direction',
                'ordre'     => 18,
                'actif'     => true,
                'bio'       => "Membre du Comité de Direction d'Excellis Invest Group.",
                'bio_en'    => 'Member of the Excellis Invest Group Executive Committee.',
                'mot'       => '',
                'mot_en'    => '',
            ],
        ];

        DB::table('dirigeants')->upsert(
            $membres,
            ['id'],
            ['nom', 'role', 'role_en', 'categorie', 'ordre', 'actif', 'bio', 'bio_en', 'mot', 'mot_en']
        );

        $this->command->info(count($membres) . ' membres du CODIR chargés (CodirSeeder)');
    }
}
