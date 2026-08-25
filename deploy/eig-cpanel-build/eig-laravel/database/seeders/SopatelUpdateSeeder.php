<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SopatelUpdateSeeder extends Seeder
{
    public function run(): void
    {
        // Commentaires existants + nouvelles distinctions
        $commentaires = "Distinctions & Récompenses : Prix National de l'Entrepreneur Touristique 3ème édition — Hôtel Vert · REPAB 2022 : Prix du Meilleur Hôtel · SITHO-VITHRO 2023 : Meilleur Valet de Chambre · SITHO 2024 : Meilleur Garçon de café et Meilleur Valet de chambre · Attestation de reconnaissance du CNRST/INSS à l'occasion des Journées des Communautés en 2025 · Attestation de reconnaissance du CIGAF (Carrefour International de la Gastronomie du Faso).";

        $commentaires_en = "Distinctions & Awards: National Tourist Entrepreneur Award 3rd edition — Green Hotel · REPAB 2022: Best Hotel Award · SITHO-VITHRO 2023: Best Room Attendant · SITHO 2024: Best Café Waiter and Best Room Attendant · Certificate of Recognition from CNRST/INSS at the Communities Days 2025 · Certificate of Recognition from CIGAF (International Crossroads of Burkinabè Gastronomy).";

        DB::table('filiales')->where('id', 'sopatel-silmande')->update([
            'vision'          => "Demeurer le leader de l'hôtellerie d'affaires au Burkina Faso.",
            'vision_en'       => "Remain the leader in business hospitality in Burkina Faso.",
            'valeurs'         => "Hospitalité · Authenticité · Écoute · Innovation · Intégrité · Hygiène et propreté · Amélioration continue des compétences",
            'valeurs_en'      => "Hospitality · Authenticity · Attentiveness · Innovation · Integrity · Hygiene & Cleanliness · Continuous Skills Development",
            'commentaires'    => $commentaires,
            'commentaires_en' => $commentaires_en,
        ]);

        $this->command->info('✅  sopatel-silmande mis à jour avec succès (vision + distinctions 2025).');
    }
}
