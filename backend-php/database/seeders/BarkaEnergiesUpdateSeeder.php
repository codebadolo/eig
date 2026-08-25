<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BarkaEnergiesUpdateSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('filiales')->where('id', 'barka-energies')->update([
            'nom'             => 'Barka Energies S.A.',
            'sigle'           => 'BE',
            'secteur'         => 'Énergies et distribution',
            'secteur_en'      => 'Energy & Distribution',
            'secteur_slug'    => 'energie',
            'pays'            => 'Burkina Faso',
            'ville'           => 'Ouagadougou',

            'description'     => "Barka Energies S.A. est une entreprise spécialisée dans la distribution de produits pétroliers et de solutions énergétiques au Burkina Faso. Forte du plus vaste réseau de stations-service du pays, avec près de 200 sites, elle accompagne les particuliers, les entreprises, les institutions et les acteurs industriels à travers une offre complète de carburants, lubrifiants et services associés. Positionnée comme une marque énergétique moderne, locale et accessible, Barka Energies place l'innovation, la proximité et la qualité de service au cœur de son développement. Filiale de Excellis Invest Group, elle s'appuie sur un fort ancrage territorial, une capacité d'exécution reconnue et une ambition affirmée de contribuer durablement à l'accès à l'énergie tout en poursuivant son expansion à l'échelle régionale.",
            'description_en'  => "Barka Energies S.A. is a company specialising in the distribution of petroleum products and energy solutions in Burkina Faso. With the country's largest service station network — nearly 200 sites — it serves individuals, businesses, institutions and industrial operators through a comprehensive offer of fuels, lubricants and associated services. Positioned as a modern, local and accessible energy brand, Barka Energies puts innovation, proximity and quality of service at the heart of its development. As a subsidiary of Excellis Invest Group, it draws on strong territorial roots, recognised operational capacity and a firm ambition to sustainably improve energy access while pursuing regional expansion.",

            'mission'         => "Fournir des solutions énergétiques fiables, accessibles et de qualité, tout en améliorant le quotidien des populations et en accompagnant le développement économique du Burkina Faso.",
            'mission_en'      => "Provide reliable, accessible and high-quality energy solutions, while improving people's daily lives and supporting the economic development of Burkina Faso.",

            'vision'          => "Devenir une référence énergétique en Afrique de l'Ouest en proposant des solutions modernes, durables et centrées sur les besoins des clients.",
            'vision_en'       => "Become an energy reference in West Africa by offering modern, sustainable solutions centred on customer needs.",

            'valeurs'         => "Proximité · Fiabilité · Innovation · Responsabilité · Engagement",
            'valeurs_en'      => "Proximity · Reliability · Innovation · Responsibility · Commitment",

            'commentaires'    => "Barka Energies incarne une nouvelle génération d'acteur énergétique africain : un héritage solide (transition de TotalEnergies), une identité locale forte, une volonté affirmée d'innovation et de modernisation de l'expérience client, et une ambition d'expansion régionale.",
            'commentaires_en' => "Barka Energies embodies a new generation of African energy player: a solid heritage (TotalEnergies transition), a strong local identity, a clear drive for innovation and customer experience modernisation, and an ambition for regional expansion.",

            'email_contact'   => 'contact@barkaenergies.com',
            'telephone'       => '+226 25 32 50 00',
            'website'         => 'https://www.barkaenergies.com',
            'facebook'        => 'https://www.facebook.com/BarkaEnergies',
            'linkedin'        => 'https://www.linkedin.com/company/barka-energies',
            'tiktok'          => 'https://www.tiktok.com/@barkaenergies',

            'actif'           => true,
            'updated_at'      => now(),
        ]);

        $this->command->info('✅  barka-energies mis à jour avec succès.');
    }
}
