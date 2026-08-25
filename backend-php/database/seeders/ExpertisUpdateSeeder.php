<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExpertisUpdateSeeder extends Seeder
{
    public function run(): void
    {
        $common = [
            'nom'             => 'Expertis SA',
            'sigle'           => 'EXS',
            'secteur'         => 'Immobilier',
            'secteur_en'      => 'Real Estate',
            'secteur_slug'    => 'immobilier-capital',

            'mission'         => "Offrir des solutions immobilières innovantes et des prestations de sécurisation financières adaptées aux exigences de nos partenaires.",
            'mission_en'      => "Provide innovative real estate solutions and financial security services tailored to our partners' requirements.",

            'vision'          => "EXPERTIS ambitionne, à l'horizon 2028, de se positionner comme un promoteur immobilier de référence au Burkina Faso. Cette vision exprime la volonté de l'entreprise de proposer des projets immobiliers alliant qualité, accessibilité, durabilité et innovation, tout en consolidant sa crédibilité auprès des partenaires techniques, financiers et institutionnels.",
            'vision_en'       => "By 2028, EXPERTIS aims to establish itself as a leading real estate developer in Burkina Faso. This vision reflects the company's commitment to delivering real estate projects that combine quality, affordability, sustainability and innovation, while reinforcing its credibility with technical, financial and institutional partners.",

            'valeurs'         => "Expertise · Sociabilité · Originalité · Responsabilité",
            'valeurs_en'      => "Expertise · Sociability · Originality · Responsibility",

            'actif'           => true,
            'updated_at'      => now(),
        ];

        // expertis-bf — Burkina Faso (siège du groupe EXPERTIS, y compris le site web)
        DB::table('filiales')->where('id', 'expertis-bf')->update(array_merge($common, [
            'pays'            => 'Burkina Faso',
            'ville'           => 'Ouagadougou',
            'adresse'         => "Avenue Kwameh N'Krumah",
            'email_contact'   => 'expertis@expertis-sa.com',
            'telephone'       => '+226 25 33 13 92',
            'website'         => 'https://www.expertis-sa.com',
            'facebook'        => 'https://www.facebook.com/ExpertisSA',

            'description'     => "EXPERTIS SA, également dénommée Agence de Sécurisation Financière et Immobilière, est une société anonyme de droit burkinabè dont le siège est sis à Ouagadougou sur l'avenue Kwameh N'Krumah. Depuis sa création, EXPERTIS SA s'est construite autour d'un positionnement unique dans l'écosystème financier et immobilier du Burkina Faso grâce à des services innovants tels que la Tierce Détention, l'Expertise Immobilière, la Promotion Immobilière, la Maîtrise d'Ouvrage Déléguée et la Gestion Immobilière.",
            'description_en'  => "EXPERTIS SA, also known as the Financial and Real Estate Security Agency, is a public limited company under Burkina Faso law, headquartered in Ouagadougou on Avenue Kwameh N'Krumah. Since its creation, EXPERTIS SA has built a unique positioning in Burkina Faso's financial and real estate ecosystem through innovative services such as Third-Party Custody, Real Estate Expertise, Real Estate Development, Delegated Project Management and Property Management.",

            'commentaires'    => "Slogan : EXPERTIS SA, LA DIFFÉRENCE PAR LA QUALITÉ ET LE PRIX !\nAutres contacts : 58 24 45 15 / 58 24 45 14",
            'commentaires_en' => "Tagline: EXPERTIS SA, THE DIFFERENCE THROUGH QUALITY AND PRICE!\nAdditional contacts: +226 58 24 45 15 / +226 58 24 45 14",
        ]));

        // expertis-ci — Côte d'Ivoire (Agence de Sécurisation Financière et Immobilière, contacts propres)
        DB::table('filiales')->where('id', 'expertis-ci')->update(array_merge($common, [
            'pays'            => "Côte d'Ivoire",
            'ville'           => 'Abidjan',
            'adresse'         => 'Abidjan, Cocody, Deux Plateaux, Vallons — 01 BP 4690 Abidjan 01',
            'telephone'       => '+225 25 21 00 99 26',
            'whatsapp'        => '+225 05 04 12 75 52',
            // Le site web et le Facebook appartiennent à EXPERTIS SA (Burkina) — pas de doublon pour la CI
            'email_contact'   => null,
            'website'         => null,
            'facebook'        => null,

            'description'     => "EXPERTIS, Agence de Sécurisation Financière et Immobilière, est la filiale ivoirienne d'EXPERTIS SA. Basée à Abidjan, elle accompagne particuliers, professionnels et institutions dans leurs projets immobiliers et leurs besoins de sécurisation financière, avec le même positionnement d'expertise que l'entité burkinabè.",
            'description_en'  => "EXPERTIS, the Financial and Real Estate Security Agency, is the Ivorian subsidiary of EXPERTIS SA. Based in Abidjan, it supports individuals, professionals and institutions with their real estate projects and financial security needs, sharing the same expertise-driven positioning as the Burkina Faso entity.",

            'commentaires'    => "Téléphone fixe : +225 25 21 00 99 26\nTéléphone mobile : +225 05 04 12 75 52",
            'commentaires_en' => "Landline: +225 25 21 00 99 26\nMobile: +225 05 04 12 75 52",
        ]));

        $this->command->info('✅  expertis-bf et expertis-ci mis à jour avec succès.');
    }
}
