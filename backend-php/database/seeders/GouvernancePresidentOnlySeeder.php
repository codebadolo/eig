<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GouvernancePresidentOnlySeeder extends Seeder
{
    public function run(): void
    {
        // Supprimer tous les profils sauf le Président NASSA
        DB::table('dirigeants')
            ->where('id', '!=', 'president-groupe')
            ->delete();

        // S'assurer que le Président est bien actif
        DB::table('dirigeants')
            ->where('id', 'president-groupe')
            ->update(['actif' => true, 'updated_at' => now()]);

        $restant = DB::table('dirigeants')->count();
        $this->command->info("✅  Gouvernance nettoyée. {$restant} profil conservé : Président Idrissa NASSA.");
    }
}
