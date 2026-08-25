<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CorisAssuranceVieCIUpdateSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('filiales')->where('id', 'coris-assurance-vie-ci')->update([
            'nom'             => "Coris Assurance Vie Côte d'Ivoire",
            'sigle'           => 'CVI',
            'secteur'         => 'Assurance Vie',
            'secteur_en'      => 'Life Insurance',
            'secteur_slug'    => 'assurance',
            'pays'            => "Côte d'Ivoire",
            'ville'           => 'Abidjan',
            'adresse'         => "Boulevard de la République N°23, angle Avenue Marchand, Immeuble Coris Bank International Côte d'Ivoire, Plateau — 01 BP 4690 Abidjan 01",

            'description'     => "CORIS ASSURANCE VIE CÔTE D'IVOIRE est une société anonyme de droit ivoirien avec Conseil d'Administration, régie par le Code des assurances de la CIMA. Elle a été créée à l'initiative du Groupe CORIS afin de compléter l'offre de services financiers déjà déployée sur le marché ivoirien à travers sa filiale bancaire, CORIS BANK INTERNATIONAL CÔTE D'IVOIRE, et de proposer une gamme complète de solutions d'assurance vie répondant aux besoins des particuliers, des professionnels et des entreprises. Dotée d'un capital social de 5 000 000 000 FCFA, la société a obtenu son agrément le 26 décembre 2024 pour exercer les opérations d'assurance vie conformément à la réglementation de la CIMA.",
            'description_en'  => "CORIS ASSURANCE VIE CÔTE D'IVOIRE is a joint-stock company under Ivorian law with a Board of Directors, governed by the CIMA Insurance Code. It was created on the initiative of the CORIS Group to complement the financial services offering already deployed on the Ivorian market through its banking subsidiary, CORIS BANK INTERNATIONAL CÔTE D'IVOIRE, and to offer a complete range of life insurance solutions meeting the needs of individuals, professionals and businesses. With a share capital of 5,000,000,000 FCFA, the company obtained its approval on 26 December 2024 to conduct life insurance operations in accordance with CIMA regulations.",

            'mission'         => "Coris Assurances Vie Côte d'Ivoire, société de référence offrant des produits et services accessibles, innovants et adaptés aux besoins de la population avec une amélioration continue de la qualité de ses prestations assurées par des employés compétents et engagés.",
            'mission_en'      => "Coris Assurances Vie Côte d'Ivoire — a reference company offering accessible, innovative products and services tailored to the needs of the population, with continuous improvement of service quality delivered by competent and committed employees.",

            'vision'          => "Être la société d'assurance de référence, innovante et proche de ses clients.",
            'vision_en'       => "To be the reference insurance company, innovative and close to its clients.",

            'valeurs'         => "Confiance · Originalité · Responsabilité · Intégrité · Solidarité",
            'valeurs_en'      => "Trust · Originality · Responsibility · Integrity · Solidarity",

            'commentaires'    => "Engagements : offrir des solutions personnalisées répondant aux besoins spécifiques de la clientèle ; assurer une qualité de service exemplaire axée sur la réactivité et le professionnalisme ; promouvoir la culture de la prévention et de la sensibilisation aux risques. Agrément obtenu le 26 décembre 2024 pour les opérations d'assurance vie (CIMA). Capital social : 5 000 000 000 FCFA.",
            'commentaires_en' => "Commitments: offer personalised solutions meeting the specific needs of clients; ensure exemplary service quality focused on responsiveness and professionalism; promote a culture of prevention and risk awareness. Approval obtained on 26 December 2024 for life insurance operations (CIMA). Share capital: 5,000,000,000 FCFA.",

            'email_contact'   => 'corisvie-ci@coris-assurances.com',
            'telephone'       => '+225 27 20 33 15 65',
            'whatsapp'        => '+225 07 78 68 58 58',
            // Site internet non disponible à ce jour
            'website'         => null,

            // Réseaux sociaux (URLs à confirmer — noms de page : CORIS ASSURANCES CÔTE D'IVOIRE)
            'facebook'        => 'https://www.facebook.com/CorisAssurancesCotedIvoire',
            'linkedin'        => 'https://www.linkedin.com/company/coris-assurances-cote-d-ivoire',

            'actif'           => true,
            'updated_at'      => now(),
        ]);

        $this->command->info("✅  coris-assurance-vie-ci mis à jour avec succès.");
    }
}
