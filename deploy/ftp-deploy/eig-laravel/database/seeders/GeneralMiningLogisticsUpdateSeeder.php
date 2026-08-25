<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GeneralMiningLogisticsUpdateSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('filiales')->where('id', 'general-mining-logistics')->update([
            'nom'             => 'General Mining Logistics SA',
            'sigle'           => 'GML',
            'secteur'         => 'Transport et logistique',
            'secteur_en'      => 'Transport & Logistics',
            'secteur_slug'    => 'logistique-miniere',
            'pays'            => 'Burkina Faso',
            'ville'           => 'Ouagadougou',

            'description'     => "Acteur majeur du transport et de la logistique au Burkina Faso et à l'international, GML, filiale d'Excellis Invest Group, accompagne ses partenaires dans leurs opérations d'exportation et d'approvisionnement en matières premières, en privilégiant la transparence, le respect des engagements et la conformité aux réglementations en vigueur. Le respect de nos clients, de nos collaborateurs et de l'environnement constitue le socle de nos valeurs. Cette exigence nous permet de préserver notre crédibilité, de bâtir des relations durables de confiance et de poursuivre notre développement sur les marchés internationaux.",
            'description_en'  => "A major player in transport and logistics in Burkina Faso and internationally, GML, a subsidiary of Excellis Invest Group, supports its partners in their export and raw material supply operations, favouring transparency, respect for commitments and compliance with applicable regulations. Respect for our clients, our staff and the environment is the foundation of our values. This requirement allows us to preserve our credibility, build lasting relationships of trust and pursue our development in international markets.",

            'valeurs'         => "Constance et discipline · Responsabilité · Excellence du service client",
            'valeurs_en'      => "Consistency and discipline · Responsibility · Customer service excellence",

            'commentaires'    => "Nos atouts :\n— Flottes et équipement minier moderne.\n— Une jeune équipe compétente et professionnelle.\n— Appartenance à un groupe.",
            'commentaires_en' => "Our strengths:\n— Modern mining fleets and equipment.\n— A young, competent and professional team.\n— Belonging to a group.",

            'email_contact'   => 'scombary@gml-sa.com',
            'telephone'       => '+226 68 99 70 70',
            'whatsapp'        => '+226 70 20 69 97',
            'website'         => 'https://www.gml-sa.com',

            'actif'           => true,
            'updated_at'      => now(),
        ]);

        $this->command->info('✅  general-mining-logistics mis à jour avec succès.');
    }
}
