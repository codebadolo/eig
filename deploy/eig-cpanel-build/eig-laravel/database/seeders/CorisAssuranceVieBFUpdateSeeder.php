<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CorisAssuranceVieBFUpdateSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('filiales')->where('id', 'coris-assurance-vie-bf')->update([
            'nom'             => 'Coris Assurances Vie Burkina SA',
            'sigle'           => 'CV',
            'secteur'         => 'Assurance Vie',
            'secteur_en'      => 'Life Insurance',
            'secteur_slug'    => 'assurance',
            'pays'            => 'Burkina Faso',
            'ville'           => 'Ouagadougou',

            'description'     => "Coris Assurances Vie Burkina SA, filiale du groupe Excellis Invest Group, a été créée le 14 février 2014 et a obtenu son agrément de la Conférence Interafricaine des Marchés d'Assurances (CIMA) le 17 août 2015. Née de la volonté d'accompagner le développement du marché de l'assurance vie au Burkina Faso, la compagnie conçoit et commercialise des solutions de prévoyance, d'épargne et de capitalisation accessibles, innovantes et adaptées aux besoins des particuliers, des professionnels et des entreprises. Pionnière sur son marché, Coris Assurances Vie Burkina est la seule compagnie d'assurance au Burkina Faso à proposer des solutions Takaful, conformes aux principes de la finance islamique. Cette offre répond aux attentes d'une clientèle en quête d'une protection financière éthique, transparente et fondée sur les principes de solidarité.",
            'description_en'  => "Coris Assurances Vie Burkina SA, a subsidiary of Excellis Invest Group, was created on 14 February 2014 and obtained its approval from the Inter-African Conference on Insurance Markets (CIMA) on 17 August 2015. Born from the will to support the development of the life insurance market in Burkina Faso, the company designs and markets accessible, innovative life protection, savings and capitalisation solutions tailored to the needs of individuals, professionals and businesses. A pioneer in its market, Coris Assurances Vie Burkina is the only insurance company in Burkina Faso to offer Takaful solutions, compliant with the principles of Islamic finance. This offer meets the expectations of a clientele seeking ethical, transparent financial protection founded on the principles of solidarity.",

            'mission'         => "Offrir des produits et services accessibles, innovants et adaptés aux besoins de la population, avec une amélioration continue de la qualité des prestations, assurée par des employés compétents et engagés.",
            'mission_en'      => "Offer accessible, innovative products and services adapted to the needs of the population, with continuous improvement of service quality, delivered by competent and committed employees.",

            'vision'          => "Être la société d'assurances vie de référence au Burkina Faso à l'horizon 2026.",
            'vision_en'       => "To be the reference life insurance company in Burkina Faso by 2026.",

            'valeurs'         => "Confiance · Originalité · Responsabilité · Intégrité · Solidarité",
            'valeurs_en'      => "Trust · Originality · Responsibility · Integrity · Solidarity",

            'commentaires'    => "Particularité : Première compagnie d'assurance à lancer l'assurance Takaful au Burkina Faso.",
            'commentaires_en' => "Highlight: First insurance company to launch Takaful insurance in Burkina Faso.",

            'email_contact'   => 'corisvie@coris-assurances.com',
            'telephone'       => '+226 25 39 18 98',
            'whatsapp'        => '+226 04 93 42 42',
            // URL exacte à confirmer — texte source : "coris-assurances-burkina-faso/"
            'website'         => 'https://www.coris-assurances.com/coris-assurances-burkina-faso/',

            'facebook'        => 'https://www.facebook.com/share/1aiCFKXono/',
            'linkedin'        => 'https://www.linkedin.com/company/coris-assurances-burkina-faso/',
            'instagram'       => 'https://www.instagram.com/corisassurances',
            'tiktok'          => 'https://www.tiktok.com/@corisassurances_bf',
            'youtube'         => 'https://www.youtube.com/@corisassurances7631',

            'actif'           => true,
            'updated_at'      => now(),
        ]);

        $this->command->info('✅  coris-assurance-vie-bf mis à jour avec succès.');
    }
}
