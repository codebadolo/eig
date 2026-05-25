<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GouvernanceSeeder extends Seeder
{
    public function run(): void
    {
        // Supprimer les dirigeants existants liés à la gouvernance
        DB::table('dirigeants')->whereIn('categorie', ['president', 'conseil', 'dg', 'direction'])->delete();

        $dirigeants = [
            // ── Président du Groupe ──────────────────────────────────────────
            [
                'id'        => 'president-groupe',
                'nom'       => 'PRÉNOM NOM DU PRÉSIDENT',   // ← À REMPLACER
                'role'      => 'Président du Groupe',
                'categorie' => 'president',
                'ordre'     => 1,
                'actif'     => true,
                'bio'       => '',
            ],

            // ── Président du Conseil d'Administration ────────────────────────
            [
                'id'        => 'pca',
                'nom'       => 'Bintou Compaoré',
                'role'      => 'Président du Conseil d\'Administration',
                'categorie' => 'conseil',
                'ordre'     => 2,
                'actif'     => true,
                'bio'       => '',
            ],

            // ── Directeur Général ────────────────────────────────────────────
            [
                'id'        => 'dg',
                'nom'       => 'Issouf Compaoré',
                'role'      => 'Directeur Général',
                'categorie' => 'dg',
                'ordre'     => 3,
                'actif'     => true,
                'bio'       => '',
            ],

            // ── Comité de Direction ──────────────────────────────────────────
            [
                'id'        => 'daf',
                'nom'       => 'Aminata Sawadogo',
                'role'      => 'Directrice Administrative et Financière',
                'categorie' => 'direction',
                'ordre'     => 4,
                'actif'     => true,
                'bio'       => '',
            ],
            [
                'id'        => 'djuridique',
                'nom'       => 'Moussa Ouédraogo',
                'role'      => 'Directeur Juridique et Conformité',
                'categorie' => 'direction',
                'ordre'     => 5,
                'actif'     => true,
                'bio'       => '',
            ],
            [
                'id'        => 'dops',
                'nom'       => 'Fatimata Kaboré',
                'role'      => 'Directrice des Opérations',
                'categorie' => 'direction',
                'ordre'     => 6,
                'actif'     => true,
                'bio'       => '',
            ],
            [
                'id'        => 'drh',
                'nom'       => 'Ibrahim Traoré',
                'role'      => 'Directeur des Ressources Humaines',
                'categorie' => 'direction',
                'ordre'     => 7,
                'actif'     => true,
                'bio'       => '',
            ],
            [
                'id'        => 'dcom',
                'nom'       => 'Rasmata Zongo',
                'role'      => 'Directrice de la Communication',
                'categorie' => 'direction',
                'ordre'     => 8,
                'actif'     => true,
                'bio'       => '',
            ],
            [
                'id'        => 'dsi',
                'nom'       => 'Adama Coulibaly',
                'role'      => 'Directeur des Systèmes d\'Information',
                'categorie' => 'direction',
                'ordre'     => 9,
                'actif'     => true,
                'bio'       => '',
            ],
            [
                'id'        => 'dcd',
                'nom'       => 'Salimata Diallo',
                'role'      => 'Directrice du Développement Commercial',
                'categorie' => 'direction',
                'ordre'     => 10,
                'actif'     => true,
                'bio'       => '',
            ],
        ];

        DB::table('dirigeants')->upsert(
            $dirigeants,
            ['id'],
            ['nom', 'role', 'categorie', 'ordre', 'actif', 'bio']
        );
    }
}
