<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CorisAssurancesIARDBFUpdateSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('filiales')->where('id', 'coris-assurance-iard-bf')->update([
            'nom'             => 'Coris Assurances SA',
            'sigle'           => 'CA',
            'secteur'         => 'Assurance Non-Vie',
            'secteur_en'      => 'Non-Life Insurance',
            'secteur_slug'    => 'assurance',
            'pays'            => 'Burkina Faso',
            'ville'           => 'Ouagadougou',

            'description'     => "Coris Assurances SA, filiale de Excellis Invest Group, est une compagnie d'assurance non-vie au capital de 5 milliards FCFA, agréée sous le Code CIMA (Arrêté d'agrément N° 2010/44/MEF/SG/DGTCP/DA). Créée en 2011, elle figure aujourd'hui parmi les leaders du marché burkinabè, occupant la 3ᵉ place en chiffre d'affaires. Certifiée ISO 9001:2015, elle propose une gamme complète de solutions d'assurance destinées aux particuliers et aux entreprises : automobile, santé, incendie, transport, responsabilité civile, construction, caution et risques spéciaux. Son engagement en faveur de la qualité de service et de la satisfaction client en fait un partenaire de confiance pour de nombreuses organisations de référence.",
            'description_en'  => "Coris Assurances SA, a subsidiary of Excellis Invest Group, is a non-life insurance company with a capital of 5 billion FCFA, licensed under the CIMA Code (Approval Order No. 2010/44/MEF/SG/DGTCP/DA). Founded in 2011, it is now one of the leaders in the Burkinabè market, ranking 3rd in turnover. ISO 9001:2015 certified, it offers a comprehensive range of insurance solutions for individuals and businesses: motor, health, fire, transport, civil liability, construction, surety bonds and special risks. Its commitment to service quality and customer satisfaction makes it a trusted partner for many leading organisations.",

            'mission'         => "Coris Assurances SA, société de référence offrant des produits et services accessibles, innovants et adaptés aux besoins de la population par une amélioration continue de la qualité de ses prestations assurées par des employés compétents et engagés.",
            'mission_en'      => "Coris Assurances SA — a reference company offering accessible, innovative products and services tailored to the needs of the population through the continuous improvement of service quality, delivered by competent and committed employees.",

            'vision'          => "Coris Assurances SA, société de référence à l'horizon 2026.",
            'vision_en'       => "Coris Assurances SA — a reference company by 2026.",

            'valeurs'         => "Confiance · Originalité · Responsabilité · Intégrité · Sociabilité",
            'valeurs_en'      => "Trust · Originality · Responsibility · Integrity · Sociability",

            'commentaires'    => "Positionnements clés : 3ᵉ rang du marché en chiffre d'affaires · 1ᵉʳ rang dans la branche automobile · 1ʳᵉ position attribuée par le Ministère des Finances en 2023.",
            'commentaires_en' => "Key rankings: 3rd in market turnover · 1st in the motor insurance branch · 1st position awarded by the Ministry of Finance in 2023.",

            'email_contact'   => 'coris@coris-assurances.com',
            'telephone'       => '+226 25 33 23 30',
            'website'         => 'https://www.coris-assurances.com',

            // Réseaux sociaux (URLs à confirmer — noms de page : Coris Assurances)
            'facebook'        => 'https://www.facebook.com/CorisAssurances',
            'linkedin'        => 'https://www.linkedin.com/company/coris-assurances',
            'twitter'         => 'https://www.twitter.com/CorisAssurances',
            'instagram'       => 'https://www.instagram.com/CorisAssurances',

            'actif'           => true,
            'updated_at'      => now(),
        ]);

        $this->command->info('✅  coris-assurance-iard-bf mis à jour avec succès.');
    }
}
