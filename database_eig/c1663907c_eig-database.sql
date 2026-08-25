-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 22, 2026 at 08:24 PM
-- Server version: 11.4.10-MariaDB-cll-lve
-- PHP Version: 8.4.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `c1663907c_eig-database`
--

-- --------------------------------------------------------

--
-- Table structure for table `AdminUser`
--

CREATE TABLE `AdminUser` (
  `id` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `nom` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `AdminUser`
--

INSERT INTO `AdminUser` (`id`, `email`, `password`, `nom`, `createdAt`, `updatedAt`) VALUES
('cmon2ug8p0000rqblb98s6480', 'admin@excellis-invest-group.com', '$2a$10$p9Eu/mGeh6RN5UW00WaIOOpXoCNJffubhnDwR9h7Zym.OUAx1Co/m', 'Administrateur EIG', '2026-05-01 15:38:08.185', '2026-05-01 15:38:08.185');

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `email`, `password`, `nom`, `created_at`, `updated_at`) VALUES
('gqv7qSAv4U4gEAY7yzc0U1CjR', 'admin@excellis-invest-group.com', '$2y$12$zls0Q19/kcnEWX1A8PjbJ.sNHppSnnQ79toTTfzzJgcCajlAnnFje', 'Administrateur EIG', '2026-05-03 10:38:05', '2026-05-29 15:59:53');

-- --------------------------------------------------------

--
-- Table structure for table `Article`
--

CREATE TABLE `Article` (
  `id` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `titre` varchar(191) NOT NULL,
  `categorie` varchar(191) NOT NULL,
  `date` varchar(191) NOT NULL,
  `extrait` text NOT NULL,
  `contenu` longtext NOT NULL,
  `couleur` varchar(191) NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `image` varchar(191) DEFAULT NULL,
  `publie` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Article`
--

INSERT INTO `Article` (`id`, `slug`, `titre`, `categorie`, `date`, `extrait`, `contenu`, `couleur`, `featured`, `image`, `publie`, `createdAt`, `updatedAt`) VALUES
('cmon2ugf4000arqblxw0othdc', 'lancement-site-institutionnel-2026', 'Excellis Invest Group lance son nouveau site internet institutionnel', 'Corporate', 'Avril 2026', 'Marquant une nouvelle étape dans sa stratégie de visibilité digitale, EIG se dote d\'une plateforme institutionnelle de premier rang.', 'Excellis Invest Group franchit une nouvelle étape dans sa stratégie de communication et de visibilité digitale avec le lancement de son site internet institutionnel.', 'linear-gradient(135deg, #1A6B7A, #0F4855)', 1, NULL, 1, '2026-05-01 15:38:08.416', '2026-05-01 15:38:08.416'),
('cmon2ugfd000brqbly47jhmia', 'Excellis-fintech-deploiement', 'Excellis accélère le déploiement de ses solutions fintech', 'Filiales', 'Mars 2026', 'La filiale technologique du Groupe multiplie ses partenariats stratégiques pour accélérer la digitalisation.', 'Excellis, la fintech d\'Excellis Invest Group, annonce l\'accélération de son programme de déploiement de solutions numériques.', 'linear-gradient(135deg, #2A6B4A, #1A4A32)', 0, NULL, 1, '2026-05-01 15:38:08.425', '2026-05-01 15:38:08.425'),
('cmon2ugfl000crqblzrgyqmr3', 'energytis-contrat-energie', 'Energytis remporte un contrat d\'envergure dans la production d\'énergie', 'Énergie', 'Février 2026', 'La filiale spécialisée dans l\'ingénierie énergétique consolide sa position sur le marché.', 'Energytis, filiale d\'Excellis Invest Group spécialisée dans la production d\'énergie, remporte un contrat d\'envergure.', 'linear-gradient(135deg, #6B4A1A, #4A3010)', 0, NULL, 1, '2026-05-01 15:38:08.433', '2026-05-01 15:38:08.433'),
('cmon2ugft000drqblms1ss3e0', 'notation-bloomfield-confirmation', 'Bloomfield Investment Corporation confirme la notation BBB d\'EIG', 'Finance', 'Janvier 2026', 'La reconfirmation de la notation BBB par Bloomfield témoigne de la solidité de la gouvernance d\'EIG.', 'Bloomfield Investment Corporation a reconduit sa notation BBB à Excellis Invest Group, confirmant la robustesse de sa structure financière.', 'linear-gradient(135deg, #0F4855, #0F1924)', 0, NULL, 1, '2026-05-01 15:38:08.441', '2026-05-01 15:38:08.441');

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `titre_en` varchar(255) DEFAULT NULL,
  `categorie` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `extrait` text NOT NULL,
  `extrait_en` text DEFAULT NULL,
  `contenu` longtext NOT NULL,
  `contenu_en` longtext DEFAULT NULL,
  `couleur` varchar(255) NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `publie` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `slug`, `titre`, `titre_en`, `categorie`, `date`, `extrait`, `extrait_en`, `contenu`, `contenu_en`, `couleur`, `featured`, `image`, `publie`, `created_at`, `updated_at`) VALUES
('1BVBLPIl6YAJTp2r9BIG4l5Zd', 'coris-bourse-marche-financier-regional-brvm-2026', 'Le marché financier régional change d\'échelle', 'The regional financial market is changing scale', 'Finance', 'Mars 2026', 'Coris Bourse et Coris Asset Management réunissent leurs clients institutionnels autour du bilan 2025 et des perspectives du marché financier régional de l\'UEMOA.', 'Coris Bourse and Coris Asset Management bring together institutional clients to review the 2025 results and outlook for the UEMOA regional financial market.', '[{\"id\":\"legacy\",\"type\":\"paragraph\",\"content\":\"Le marché financier régional change d\'échelle. Et avec lui, les opportunités d\'investissement.\\nCe jeudi 12 mars à l\'Hôtel SOPATEL SILMANDE OUAGADOUGOU, Coris Bourse, première SGI de la BRVM en termes d\'actifs sous gestion, a réuni ses clients institutionnels autour d\'un temps d\'échange consacré au bilan 2025 et aux perspectives du marché financier régional de l\'UEMOA.\\nÀ fin décembre 2025, les fondamentaux du marché confirment une dynamique robuste :\\n— +16 000 milliards FCFA de capitalisation boursière\\n— Près de 12 000 milliards FCFA d\'encours obligataires\\n— +9 000 milliards FCFA mobilisés sur le marché des titres publics en 2025\\n— 47 sociétés cotées à la BRVM, dont 3 sociétés burkinabè\\nCes données confirment que le marché financier régional s\'affirme comme un levier structurant de financement durable de nos économies, et les investisseurs institutionnels en sont l\'un des piliers majeurs.\\nCette rencontre a été animée par M. Fancho Hermann TRAORE, Directeur Général de Coris Bourse, et Mme Nadège Traoré, Directrice Générale de Coris Asset Management, avec l\'appui de M. Issaka KARGOUGOU, Directeur Général Adjoint d\'Excellis Invest Group, représentant le PCA de Coris Bourse, M. Yacouba SARE.\\nL\'édition 2026 a également mis en lumière les opportunités offertes par la gestion collective, notamment à travers les Fonds Communs de Placement (FCP), comme leviers de diversification, de structuration patrimoniale et de mobilisation de l\'épargne locale.\\nFiliales d\'Excellis Invest Group, Coris Bourse et Coris Asset Management portent une ambition commune : informer, conseiller avec responsabilité et contribuer durablement au financement de l\'économie réelle, en parfaite cohérence avec la mission du Groupe.\"}]', '[{\"id\":\"legacy-en\",\"type\":\"paragraph\",\"content\":\"The regional financial market is changing scale. And with it, investment opportunities.\\nOn Thursday 12 March at the Hôtel SOPATEL SILMANDE OUAGADOUGOU, Coris Bourse, first BRVM SGI in terms of assets under management, brought together its institutional clients for a discussion on the 2025 balance sheet and the outlook for the UEMOA\'s regional financial market.\\nAt the end of December 2025, market fundamentals confirm robust momentum:\\n— +16,000 billion FCFA in market capitalization\\n— Nearly 12,000 billion FCFA in outstanding bonds\\n— +9,000 billion FCFA mobilized on the public securities market in 2025\\n— 47 companies listed on the BRVM, including 3 Burkinabe companies\\nThese figures confirm that the regional financial market is asserting itself as a structuring lever for the sustainable financing of our economies, with institutional investors as one of its major pillars.\\nThis meeting was moderated by Mr. Fancho Hermann TRAORE, Chief Executive Officer of Coris Bourse, and Mrs. Nadège Traoré, Chief Executive Officer of Coris Asset Management, with the support of Mr. Issaka KARGOUGOU, Deputy Chief Executive Officer of Excellis Invest Group, representing the Chairman of Coris Bourse, Mr. Yacouba SARE.\\nThe 2026 edition also highlighted the opportunities offered by collective management, particularly through mutual funds (FCPs), as levers for diversification, wealth structuring and the mobilisation of local savings.\\nSubsidiaries of Excellis Invest Group, Coris Bourse and Coris Asset Management share a common ambition: to inform, advise responsibly and contribute sustainably to the financing of the real economy, in perfect coherence with the Group\'s mission.\"}]', 'linear-gradient(135deg, #1A6B7A, #0F4855)', 0, '/uploads/1787313250-647369.jpeg', 1, '2026-08-21 07:39:35', '2026-08-21 09:54:19'),
('Bvxd8PGxJ81pg8pYEiaMbt8g1', 'lancement-site-institutionnel-2026', 'Excellis Invest Group lance son nouveau site internet institutionnel', 'Excellis Invest Group launches its new institutional website', 'Corporate', 'Avril 2026', 'Marquant une nouvelle étape dans sa stratégie de visibilité digitale, EIG se dote d\'une plateforme institutionnelle de premier rang.', 'Marking a new milestone in its digital visibility strategy, EIG launches a flagship institutional platform.', '[{\"id\":\"legacy\",\"type\":\"paragraph\",\"content\":\"Excellis Invest Group franchit une nouvelle étape dans sa stratégie de communication et de visibilité digitale avec le lancement de son site internet institutionnel. Cette plateforme reflète l\'ambition panafricaine du Groupe et consolide sa présence digitale auprès de ses partenaires, investisseurs et filiales.\"}]', 'Excellis Invest Group takes a new step in its communication and digital visibility strategy with the launch of its institutional website. This platform reflects the Group\'s pan-African ambition and strengthens its digital presence with partners, investors and subsidiaries.', 'linear-gradient(135deg, #1A6B7A, #0F4855)', 1, '/uploads/1780307597-277066.png', 1, '2026-05-29 15:59:55', '2026-06-01 07:53:19'),
('CzUkjOBOI7QDMjk106VoAg7ek', 'notation-bloomfield-confirmation', 'Bloomfield Investment Corporation confirme la notation  A / A2 d\'Excellis Invest Group.', NULL, 'Finance', 'Janvier 2026', 'La reconfirmation de la notation A / A2  par Bloomfield témoigne de la solidité de la gouvernance d\'Excellis Invest Group.', NULL, '[{\"id\":\"legacy\",\"type\":\"paragraph\",\"content\":\"Bloomfield Investment Corporation a reconduit sa notation BBB à Excellis Invest Group, confirmant la robustesse de sa structure financière.\"}]', '[]', 'linear-gradient(135deg, #0F4855, #0F1924)', 0, '/uploads/1779133668-297820.png', 1, '2026-05-03 10:38:05', '2026-06-01 12:08:06'),
('fdacOxQqfbBPFRmWTugZMXtmi', 'excelis-fintech-deploiement', 'Excelis accélère le déploiement de ses solutions fintech', 'Excelis accelerates the deployment of its fintech solutions', 'Filiales', 'Mars 2026', 'La filiale technologique du Groupe multiplie ses partenariats stratégiques pour accélérer la digitalisation des services financiers en Afrique.', 'The Group\'s technology subsidiary multiplies its strategic partnerships to accelerate the digitalisation of financial services in Africa.', '[{\"id\":\"legacy\",\"type\":\"paragraph\",\"content\":\"Excelis, la fintech d\'Excellis Invest Group, annonce l\'accélération de son programme de déploiement de solutions numériques. La filiale renforce ses capacités en monétique, paiement digital et services financiers digitaux, contribuant à l\'inclusion financière dans la sous-région.\"}]', 'Excelis, Excellis Invest Group\'s fintech, announces the acceleration of its digital solutions deployment programme. The subsidiary strengthens its capabilities in electronic payments, digital payments and digital financial services, contributing to financial inclusion across the sub-region.', 'linear-gradient(135deg, #2A6B4A, #1A4A32)', 0, '/uploads/1780307758-790797.png', 1, '2026-05-29 15:59:55', '2026-06-01 07:56:06'),
('JaLDZ17mAUDTxbYpHKojqQuw6', 'cloture-cadrage-budgetaire-2026-coris-invest-group', 'Clôture du cadrage budgétaire 2026 des filiales de Coris Invest Group', 'Closing of the 2026 budget framework for Coris Invest Group\'s subsidiaries', 'Corporate', 'Octobre 2025', 'Trois jours d\'échanges stratégiques ont permis aux 18 filiales du Groupe de consolider leurs ambitions pour 2026, avec une communication de clôture de Son Excellence Tertius Zongo, ancien Premier Ministre du Burkina Faso.', 'Three days of strategic exchanges enabled the Group\'s 18 subsidiaries to consolidate their ambitions for 2026, with a closing address by His Excellency Tertius Zongo, former Prime Minister of Burkina Faso.', '[{\"id\":\"legacy\",\"type\":\"paragraph\",\"content\":\"Ce samedi 25 octobre, à la salle Zemsataba de l\'Hôtel Silmandé, s\'est achevé le cadrage budgétaire 2026 des 18 filiales de Coris Invest Group.\\nTrois jours d\'échanges stratégiques, d\'analyses rigoureuses et de travail collectif qui ont permis de consolider les ambitions, d\'aligner les priorités et de renforcer la cohérence du Groupe autour d\'une même vision : bâtir un modèle africain de performance durable.\\nLa clôture a été marquée par une communication magistrale, brillamment délivrée par Son Excellence Tertius Zongo, ancien Premier Ministre du Burkina Faso, sur le thème :\\n« Quelles habiletés pour être un leader d\'entreprise efficace aujourd\'hui dans un monde instable et incertain ? »\\nCes 72 heures de travail intense ont davantage outillé les équipes du Groupe, désormais encore plus engagées à servir leurs parties prenantes avec rigueur, excellence et sens du service, pour offrir aux clients et usagers une expérience de qualité à la hauteur des standards internationaux.\"}]', '[{\"id\":\"legacy-en\",\"type\":\"paragraph\",\"content\":\"This Saturday, October 25, at the Zemsataba room of the Hotel Silmandé, the 2026 budget framework of the 18 subsidiaries of Coris Invest Group was completed.\\nThree days of strategic exchanges, rigorous analyses and collective work that made it possible to consolidate ambitions, align priorities and strengthen the Group\'s coherence around the same vision: to build an African model of sustainable performance.\\nThe closing was marked by a masterful presentation, brilliantly delivered by His Excellency Tertius Zongo, former Prime Minister of Burkina Faso, on the theme:\\n\\\"What skills do you need to be an effective business leader today in an unstable and uncertain world?\\\"\\nThese 72 hours of intense work have further equipped the Group\'s teams, who are now even more committed to serving their stakeholders with rigour, excellence and a sense of service, to offer customers and users a quality experience that meets international standards.\"}]', 'linear-gradient(135deg, #6B2A6B, #4A1A4A)', 0, '/uploads/1787313420-221944.jpeg', 1, '2026-08-21 07:51:09', '2026-08-21 09:57:03'),
('MljkqP9JYpaHstxulwf0Q6gqY', 'eig-expansion-africaine-2026', 'Excellis Invest Group renforce son empreinte sur le périmètre africain', 'Excellis Invest Group strengthens its African footprint', 'Corporate', 'Janvier 2026', 'Avec +700 collaborateurs et 16 filiales actives, Execellis Invest Group consolide sa stratégie d\'expansion multisectorielle en Afrique.', 'With +700 employees and 17 active subsidiaries, EIG consolidates its multi-sectoral expansion strategy in Africa.', '[{\"id\":\"legacy\",\"type\":\"paragraph\",\"content\":\"Excellis Invest Group, holding multisectorielle fondée en 2019 et basée au Burkina Faso, consolide sa présence africaine avec un portefeuille de filiales couvrant 9 secteurs stratégiques. Le Groupe compte désormais plus de 700 collaborateurs engagés dans la transformation économique du continent africain.\"}]', 'Excellis Invest Group, a multisectoral holding founded in 2019 and headquartered in Burkina Faso, consolidates its African presence with a portfolio of subsidiaries covering 9 strategic sectors. The Group now employs over 700 people committed to the economic transformation of the African continent.', 'linear-gradient(135deg, #0F4855, #0F1924)', 0, '/uploads/1780307700-632673.png', 1, '2026-05-29 15:59:55', '2026-06-01 07:55:02'),
('RuUXt77ruXPBQWkHhkiEJIkaa', 'journees-patronat-burkinabe-2026', 'Excellis Invest Group, sponsor des Journées du Patronat Burkinabè 2026', 'Excellis Invest Group, sponsor of the 2026 Burkinabe Employers\' Days', 'Corporate', 'Février 2026', 'Sous le Haut Patronage du Premier Ministre, l\'édition 2026 des Journées du Patronat Burkinabè réunit secteur privé et pouvoirs publics autour de la souveraineté économique. Excellis Invest Group y participe en tant que Sponsor.', 'Under the High Patronage of the Prime Minister, the 2026 edition of the Burkinabe Employers\' Days brings together the private sector and public authorities around economic sovereignty. Excellis Invest Group takes part as a Sponsor.', '[{\"id\":\"legacy\",\"type\":\"paragraph\",\"content\":\"Placée sous le thème « Souveraineté économique du Burkina Faso et investissement productif : enjeux et orientations stratégiques », l\'édition 2026 des Journées du Patronat Burkinabè, organisée par la Confédération Générale des Entreprises du Faso (COGEF), se tient les 5 et 6 février 2026 à l\'Hôtel SOPATEL SILMANDE OUAGADOUGOU.\\nL\'événement se déroule sous le Haut Patronage de Son Excellence Monsieur OUEDRAOGO Rimtalba Jean Emmanuel, Premier Ministre du Burkina Faso, représenté par Monsieur NACANABO Aboubakar, Ministre de l\'Économie et des Finances, traduisant l\'importance stratégique accordée aux enjeux de souveraineté économique et d\'investissement productif par les plus hautes autorités de l\'État.\\nLes Journées enregistrent la présence effective de Monsieur NASSA Idrissa, Président de la COGEF, ainsi que celle de Monsieur SOW Roland Achille, Président de la Délégation Spéciale Consulaire de la Chambre de Commerce et d\'Industrie du Burkina Faso, renforçant la synergie entre secteur privé organisé, institutions économiques et pouvoirs publics.\\nÀ cette occasion, Excellis Invest Group accompagne cet événement majeur en tant que Sponsor, aux côtés du secteur privé burkinabè.\\nVéritable cadre de dialogue, de concertation et d\'orientation stratégique, les Journées du Patronat Burkinabè 2026 offrent une plateforme de réflexion autour des leviers structurants d\'une croissance durable, inclusive et souveraine pour l\'économie nationale.\\nExcellis Invest Group — Bâtir des champions économiques africains.\"}]', '[{\"id\":\"legacy-en\",\"type\":\"paragraph\",\"content\":\"Under the theme \\\"Economic sovereignty of Burkina Faso and productive investment: challenges and strategic orientations\\\", the 2026 edition of the Burkinabe Employers\' Days, organized by the General Confederation of Enterprises of Faso (COGEF), is being held on February 5 and 6, 2026 at the Hotel SOPATEL SILMANDE OUAGADOUGOU.\\nThe event takes place under the High Patronage of His Excellency Mr. Ouedraogo Rimtalba Jean Emmanuel, Prime Minister of Burkina Faso, represented by Mr. NACANABO Aboubakar, Minister of Economy and Finance, reflecting the strategic importance given to the issues of economic sovereignty and productive investment by the highest authorities of the State.\\nThe Days are attended by Mr. NASSA Idrissa, President of the COGEF, as well as Mr. SOW Roland Achille, President of the Special Consular Delegation of the Chamber of Commerce and Industry of Burkina Faso, strengthening the synergy between the organized private sector, economic institutions and public authorities.\\nOn this occasion, Excellis Invest Group is supporting this major event as a Sponsor, alongside the Burkinabe private sector.\\nA real framework for dialogue, consultation and strategic orientation, the Burkinabe Employers\' Days 2026 offer a platform for reflection on the structuring levers of sustainable, inclusive and sovereign growth for the national economy.\\nExcellis Invest Group — Building African economic champions.\"}]', 'linear-gradient(135deg, #1A4A6B, #102A4A)', 0, '/uploads/1787313479-268659.jpeg', 1, '2026-08-21 07:50:57', '2026-08-21 09:58:03'),
('XJAIplnfH735hB9mmSwIp7JQP', 'barka-energies-deploiement-nouvelle-identite', 'Barka Énergies : le déploiement se poursuit', 'Barka Energies: the deployment continues', 'Énergie', 'Février 2026', 'Après l\'acquisition du réseau TotalEnergies Burkina, Barka Energies poursuit le déploiement de sa nouvelle identité visuelle avec l\'inauguration de sa première station-service dans la région de l\'Ouest.', 'Following the acquisition of the TotalEnergies Burkina network, Barka Energies continues rolling out its new visual identity with the inauguration of its first service station in the West region.', '[{\"id\":\"legacy\",\"type\":\"paragraph\",\"content\":\"Dans la dynamique de déploiement de sa nouvelle identité de marque, Barka Energies a inauguré sa première station-service aux nouvelles couleurs dans la région de l\'Ouest.\\nAcquis le 8 septembre 2025 par Excellis Invest Group (ex Coris Invest Group), le réseau de stations-service TotalEnergies Burkina devient désormais Barka Énergies, une marque portée par l\'ambition de construire un acteur énergétique moderne, performant et compétitif à l\'échelle régionale.\\nLe déploiement de la nouvelle identité visuelle s\'opérera progressivement sur l\'ensemble du réseau, avec une exigence constante de qualité de service, de modernisation des infrastructures et d\'excellence de l\'expérience client.\\nÀ travers Barka Énergies, Excellis Invest Group affirme sa volonté de bâtir une plateforme énergétique de référence régionale, fondée sur la fiabilité opérationnelle, l\'innovation et la création de valeur durable pour ses partenaires et ses clients.\"}]', '[{\"id\":\"legacy-en\",\"type\":\"paragraph\",\"content\":\"In the dynamic of deploying its new brand identity, Barka Energies inaugurated its first service station in the new colors in the West region.\\nAcquired on September 8, 2025 by Excellis Invest Group (formerly Coris Invest Group), the TotalEnergies Burkina network of service stations now becomes Barka Energies, a brand driven by the ambition to build a modern, efficient and competitive energy player on a regional scale.\\nThe deployment of the new visual identity will be carried out gradually across the entire network, with a constant requirement for quality of service, infrastructure modernization and excellence in the customer experience.\\nThrough Barka Energies, Excellis Invest Group affirms its desire to build a regional energy platform, based on operational reliability, innovation and sustainable value creation for its partners and customers.\"}]', 'linear-gradient(135deg, #6B4A1A, #4A3010)', 0, '/uploads/1787311023-889905.jpeg', 1, '2026-08-21 07:52:37', '2026-08-21 09:17:08');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `candidatures`
--

CREATE TABLE `candidatures` (
  `id` varchar(255) NOT NULL,
  `carriere_id` varchar(255) DEFAULT NULL,
  `carriere_titre` varchar(255) DEFAULT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `lettre` text DEFAULT NULL,
  `cv_path` varchar(255) DEFAULT NULL,
  `statut` varchar(255) NOT NULL DEFAULT 'recue',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Carriere`
--

CREATE TABLE `Carriere` (
  `id` varchar(191) NOT NULL,
  `titre` varchar(191) NOT NULL,
  `departement` varchar(191) NOT NULL,
  `lieu` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `missions` text DEFAULT NULL,
  `profil` text DEFAULT NULL,
  `avantages` text DEFAULT NULL,
  `salaire` varchar(191) DEFAULT NULL,
  `dateExpiration` varchar(191) DEFAULT NULL,
  `actif` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Carriere`
--

INSERT INTO `Carriere` (`id`, `titre`, `departement`, `lieu`, `type`, `description`, `missions`, `profil`, `avantages`, `salaire`, `dateExpiration`, `actif`, `createdAt`, `updatedAt`) VALUES
('cmon2ughj000erqblxou78gvf', 'Analyste Financier Senior', 'Finance', 'Ouagadougou, Burkina Faso', 'CDI', 'Dans le cadre du renforcement de son équipe Finance, Excellis Invest Group recrute un(e) Analyste Financier Senior. Vous interviendrez sur l\'analyse des performances financières du portefeuille de filiales, la préparation des reportings consolidés et le soutien aux décisions stratégiques d\'investissement.', 'Analyser les états financiers des filiales du Groupe et produire des rapports de synthèse mensuels\nPiloter le processus de consolidation financière trimestrielle\nSuivre les indicateurs de performance (KPIs) financiers du portefeuille\nPréparer les présentations pour le Comité de Direction et le Conseil d\'Administration\nContribuer aux études de valorisation et aux analyses de rentabilité des projets d\'investissement\nParticiper à la veille sur les marchés financiers africains (BRVM, UEMOA)', 'Bac+5 en Finance, Comptabilité ou Gestion (Master CCA, DESCF, MBA Finance)\nMinimum 5 ans d\'expérience dans un poste similaire (banque, cabinet d\'audit, direction financière)\nMaîtrise des normes IFRS et du droit comptable OHADA\nExcellente maîtrise d\'Excel et des outils de modélisation financière\nCapacité d\'analyse, rigueur et sens du détail\nMaîtrise du français ; l\'anglais est un plus', 'Rémunération attractive selon profil\nAssurance maladie groupe\nFormation continue et certifications professionnelles\nEnvironnement de travail stimulant au sein d\'un groupe en pleine croissance\nOpportunités d\'évolution vers des postes de direction', 'Selon profil et expérience', 'Mai 2026', 1, '2026-05-01 15:38:08.503', '2026-05-01 15:38:08.503'),
('cmon2ughq000frqblyx8suwts', 'Responsable Conformité & Contrôle Interne', 'Juridique', 'Ouagadougou, Burkina Faso', 'CDI', 'Excellis Invest Group recrute un(e) Responsable Conformité & Contrôle Interne pour renforcer son dispositif de gouvernance et assurer la conformité réglementaire de l\'ensemble du Groupe et de ses filiales dans l\'espace UEMOA.', 'Mettre en œuvre et maintenir le dispositif de conformité réglementaire du Groupe (CIMA, AMF-UMOA, BCEAO)\nRéaliser des missions d\'audit interne auprès des filiales\nRédiger et mettre à jour les procédures et politiques de conformité\nAssurer la veille réglementaire et former les équipes aux évolutions normatives\nGérer les relations avec les autorités de contrôle\nProduire les rapports réglementaires périodiques', 'Bac+5 Droit des affaires, Compliance ou Audit (Master, DESCF)\nMinimum 4 ans d\'expérience en conformité, audit ou contrôle interne (secteur bancaire ou assurance de préférence)\nConnaissance approfondie de la réglementation CIMA et OHADA\nRigueur, intégrité et excellent relationnel\nCapacité rédactionnelle et de synthèse', 'Package salarial compétitif\nAssurance santé groupe\nParticipation aux formations et séminaires professionnels\nPoste stratégique avec forte visibilité au sein du Groupe', 'Selon profil', 'Mai 2026', 1, '2026-05-01 15:38:08.511', '2026-05-01 15:38:08.511'),
('cmon2ugi2000grqblwptvyaa9', 'Ingénieur Développement Logiciel – Fintech', 'Technologie', 'Ouagadougou, Burkina Faso', 'CDI', 'Excelis, la filiale fintech d\'Excellis Invest Group, recrute un(e) Ingénieur Développement Logiciel pour contribuer à la conception et au déploiement de solutions numériques innovantes dans les domaines de la monétique, du paiement digital et des services financiers.', 'Concevoir, développer et maintenir des applications web et mobiles de paiement digital\nParticiper à l\'architecture technique des solutions monétiques\nIntégrer des APIs bancaires et des systèmes de paiement (mobile money, cartes bancaires)\nEnsurer la sécurité et la performance des applications\nRédiger la documentation technique\nCollaborer avec les équipes métier et les partenaires technologiques', 'Bac+5 Informatique, Génie Logiciel ou équivalent\nMinimum 3 ans d\'expérience en développement (Node.js, React, Python ou Java)\nExpérience dans le domaine fintech ou bancaire appréciée\nConnaissance des protocoles de sécurité et de cryptographie\nEsprit d\'équipe, curiosité technologique et autonomie\nAnglais technique lu et écrit', 'Environnement technologique innovant\nTélétravel et flexibilité\nAccès aux dernières technologies et outils de développement\nFormation continue et certifications (AWS, Google Cloud)\nImpact direct sur l\'inclusion financière en Afrique', 'Selon profil et expérience', 'Juin 2026', 1, '2026-05-01 15:38:08.522', '2026-05-01 15:38:08.522'),
('cmon2ugib000hrqbla3uw0ohk', 'Chargé(e) de Communication & Relations Médias', 'Communication', 'Ouagadougou, Burkina Faso', 'CDI', 'Excellis Invest Group recrute un(e) Chargé(e) de Communication pour gérer la communication institutionnelle du Groupe, renforcer sa présence médiatique et développer sa stratégie digitale en cohérence avec son positionnement de holding panafricaine de référence.', 'Élaborer et mettre en œuvre le plan de communication annuel du Groupe\nGérer les relations avec les médias (presse, radio, TV) et rédiger les communiqués de presse\nProduire les contenus éditoriaux (rapports annuels, brochures, newsletters)\nAnimer les réseaux sociaux institutionnels (LinkedIn, Twitter/X)\nOrganiser les événements corporate (conférences de presse, assemblées, forums)\nVeiller à la cohérence de l\'image de marque du Groupe', 'Bac+4/5 Communication, Journalisme ou Sciences Politiques\nMinimum 3 ans d\'expérience en communication institutionnelle ou relations presse\nExcellentes qualités rédactionnelles en français\nMaîtrise des outils digitaux et des réseaux sociaux professionnels\nSens de l\'esthétique et de la mise en forme (InDesign, Canva)\nCapacité à travailler sous pression et à gérer plusieurs projets simultanément', 'Rôle central dans la construction de la marque EIG\nBudget communication dédié\nParticipation aux événements économiques africains de premier plan\nEvolution vers un poste de Directeur de la Communication', 'Selon profil', 'Mai 2026', 1, '2026-05-01 15:38:08.532', '2026-05-01 15:38:08.532'),
('cmon2ugjo000irqblz8dwmp8u', 'Auditeur Interne', 'Direction Générale', 'Ouagadougou, Burkina Faso', 'CDI', 'Dans le cadre du renforcement de son dispositif de gouvernance, Excellis Invest Group recrute un(e) Auditeur(trice) Interne. Rattaché(e) à la Direction Générale, vous conduirez des missions d\'audit auprès des filiales du Groupe pour évaluer la maîtrise des risques et l\'efficacité des contrôles internes.', 'Planifier et réaliser des missions d\'audit interne (opérationnel, financier, conformité) auprès des filiales\nÉvaluer l\'adéquation et l\'efficacité des dispositifs de contrôle interne\nRédiger les rapports d\'audit avec recommandations\nSuivre la mise en œuvre des plans d\'action\nContribuer à la cartographie des risques du Groupe\nFormation des équipes opérationnelles aux bonnes pratiques', 'Bac+5 Audit, Finance ou Comptabilité\nMinimum 3 ans d\'expérience en audit interne ou en cabinet (Big 4 apprécié)\nConnaissance des normes IIA (Institute of Internal Auditors)\nCertification CIA ou en cours d\'obtention appréciée\nRigueur analytique, sens de la communication et diplomatie\nDisponibilité pour des déplacements occasionnels dans les filiales', 'Poste à forte valeur ajoutée avec accès à toutes les entités du Groupe\nFormation et certification professionnelle prise en charge\nPlan de carrière structuré vers des responsabilités de management\nAssurance santé et avantages groupe', 'Selon profil', 'Juin 2026', 1, '2026-05-01 15:38:08.581', '2026-05-01 15:38:08.581'),
('cmon2ugle000jrqbl3h6gcbjd', 'Stagiaire – Gestion de Projets & Développement', 'Opérations', 'Ouagadougou, Burkina Faso', 'Stage', 'Excellis Invest Group offre une opportunité de stage de 6 mois au sein de la Direction des Opérations. Ce stage vous permettra d\'acquérir une vision globale du fonctionnement d\'une holding d\'investissement multisectorielle et de contribuer concrètement à des projets transversaux.', 'Appuyer le suivi opérationnel des projets en cours dans les filiales\nParticiper à la rédaction de notes de synthèse et de rapports d\'activité\nContribuer à la mise à jour des tableaux de bord de pilotage\nAssister à la préparation des réunions du Comité de Direction\nParticiper à des projets d\'amélioration continue', 'Étudiant(e) en Master 1 ou 2 (Gestion de projets, Finance, Management)\nRigueur, autonomie et curiosité intellectuelle\nBonne maîtrise du Pack Office (Excel, PowerPoint)\nCapacité de synthèse et qualités rédactionnelles\nIntérêt affirmé pour le monde de l\'investissement et du développement africain', 'Immersion au cœur d\'un groupe panafricain de référence\nEncadrement par des professionnels expérimentés\nPossibilité de débouché sur un CDI pour les profils exceptionnels\nAttestation et lettre de recommandation', 'Gratification légale + avantages', 'Mai 2026', 1, '2026-05-01 15:38:08.643', '2026-05-01 15:38:08.643');

-- --------------------------------------------------------

--
-- Table structure for table `carrieres`
--

CREATE TABLE `carrieres` (
  `id` varchar(255) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `titre_en` varchar(255) DEFAULT NULL,
  `departement` varchar(255) NOT NULL,
  `departement_en` varchar(255) DEFAULT NULL,
  `lieu` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `description_en` text DEFAULT NULL,
  `missions` text DEFAULT NULL,
  `missions_en` text DEFAULT NULL,
  `profil` text DEFAULT NULL,
  `profil_en` text DEFAULT NULL,
  `avantages` text DEFAULT NULL,
  `avantages_en` text DEFAULT NULL,
  `salaire` varchar(255) DEFAULT NULL,
  `date_expiration` varchar(255) DEFAULT NULL,
  `actif` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `carrieres`
--

INSERT INTO `carrieres` (`id`, `titre`, `titre_en`, `departement`, `departement_en`, `lieu`, `type`, `description`, `description_en`, `missions`, `missions_en`, `profil`, `profil_en`, `avantages`, `avantages_en`, `salaire`, `date_expiration`, `actif`, `created_at`, `updated_at`) VALUES
('4BnzkqUoLHGjUoHUQN8xsTI1E', 'Contrôleur Permanent (H/F)', 'Permanent Controller (M/F)', 'Finance', 'Finance', 'Ouagadougou, Burkina Faso', 'CDI', 'Dans le cadre de l\'expansion de ses activités, Excellis Invest Group S.A. souhaite recevoir des candidatures pour le recrutement d\'un Contrôleur Permanent (H/F). La principale mission du titulaire du poste est de contribuer à la maîtrise des risques opérationnels, financiers et de conformité, ainsi qu\'à l\'amélioration continue. Le dossier de candidature (lettre de motivation, CV daté et signé, copies des diplômes et attestations), réuni en un fichier PDF unique, est à envoyer à recrutement@excellis-investgroup.com avec copie à recrutement@coris-assurances.com, en indiquant en objet « Candidature au poste de Contrôleur Permanent ».', 'As part of the expansion of its activities, Excellis Invest Group S.A. is seeking candidates for the position of Permanent Controller (M/F). The main mission of the successful candidate is to help control operational, financial and compliance risks, as well as contribute to continuous improvement. Applications (cover letter, dated and signed CV, copies of diplomas and certificates), combined into a single PDF file, should be sent to recrutement@excellis-investgroup.com with a copy to recrutement@coris-assurances.com, with the subject line \'Application for the position of Permanent Controller\'.', 'Veiller à la maîtrise des risques opérationnels, financiers et réglementaires\nVérifier la conformité des opérations aux lois, procédures et règlements en vigueur\nÉvaluer la fiabilité des informations financières\nAnalyser et évaluer les procédures opératoires et dispositifs de contrôle\nParticiper à la mise à jour des manuels et procédures de contrôle\nRéaliser des missions ponctuelles d\'investigation sur les sujets sensibles ou à risques\nÉtablir un programme annuel de contrôle et le soumettre au comité d\'audit\nContribuer à la mise à jour de la cartographie des risques\nSuivre la mise en œuvre des recommandations des missions de contrôle et d\'audit\nParticiper aux contrôles des inventaires physiques de fin d\'année', 'Ensure the control of operational, financial and regulatory risks\nVerify the compliance of operations with applicable laws, procedures and regulations\nAssess the reliability of financial information\nAnalyse and evaluate operating procedures and control mechanisms\nContribute to updating control manuals and procedures\nCarry out ad hoc investigations into sensitive or high-risk matters\nEstablish an annual control programme and submit it to the audit committee\nContribute to updating the risk map\nMonitor the implementation of recommendations from control and audit missions\nParticipate in year-end physical inventory checks', 'Être titulaire d\'un diplôme BAC+3/4 minimum en Audit, Contrôle de Gestion, Assurance, Statistique ou équivalent\nJustifier d\'au moins 2 années d\'expérience dans le contrôle, l\'audit ou un domaine similaire (assurance, bancaire, microfinance…)\nBonne connaissance du secteur des assurances (atout)\nCompétences solides en rédaction, analyse, synthèse et esprit critique\nAisance relationnelle, sens de l\'écoute et adaptabilité\nMaîtrise des outils informatiques et bureautiques\nCapacité à travailler en équipe et sous pression', 'Hold a minimum BAC+3/4 degree in Audit, Management Control, Insurance, Statistics or equivalent\nAt least 2 years of experience in control, audit or a similar field (insurance, banking, microfinance...)\nGood knowledge of the insurance sector (an asset)\nStrong skills in writing, analysis, synthesis and critical thinking\nInterpersonal skills, listening skills and adaptability\nProficiency in IT and office tools\nAbility to work in a team and under pressure', NULL, NULL, NULL, '19 Avril 2026', 1, '2026-08-21 14:26:15', '2026-08-21 15:04:50'),
('53DXzJ3XDoZ2hfOPPPJ3vIwb1', 'Rédacteur Sinistre (H/F)', 'Claims Officer (M/F)', 'Opérations', 'Operations', 'Ouagadougou, Burkina Faso', 'CDI', 'Dans le cadre de l\'expansion de ses activités, Excellis Invest Group S.A. souhaite recevoir des candidatures pour le recrutement d\'un Rédacteur Sinistre (H/F). La principale mission du titulaire du poste est de contribuer à l\'optimisation de la récupération des créances issues de sinistres, ainsi qu\'à la réduction du coût technique de la compagnie. Le dossier de candidature (lettre de motivation, CV daté et signé, copies des diplômes et attestations), réuni en un fichier PDF unique, est à envoyer à recrutement@excellis-investgroup.com avec copie à recrutement@coris-assurances.com, en indiquant en objet « Candidature au poste de Rédacteur Sinistre ».', 'As part of the expansion of its activities, Excellis Invest Group S.A. is seeking candidates for the position of Claims Officer (M/F). The main mission of the successful candidate is to help optimise the recovery of claims-related receivables and reduce the company\'s technical costs. Applications (cover letter, dated and signed CV, copies of diplomas and certificates), combined into a single PDF file, should be sent to recrutement@excellis-investgroup.com with a copy to recrutement@coris-assurances.com, with the subject line \'Application for the position of Claims Officer\'.', 'Étudier les dossiers sinistres afin d\'identifier les responsabilités\nAnalyser les conditions des polices, rapports d\'experts, procès-verbaux et tout document nécessaire à l\'évaluation du recours\nDéterminer les parties responsables conformément au Code CIMA et aux conventions en vigueur\nConstituer, instruire et suivre les dossiers de recours\nRédiger les courriers de réclamation, mises en demeure, relances et correspondances diverses\nEngager les recours auprès des tiers responsables ou de leurs assureurs\nNégocier et assurer le recouvrement des indemnités dues à la compagnie\nÉtablir des accords de règlement et suivre leur exécution\nTenir à jour les bases de données sinistres et recours\nProduire des rapports périodiques sur l\'état d\'avancement des dossiers\nProposer des pistes d\'amélioration des procédures internes en matière de sinistre et de recours\nTravailler en étroite collaboration avec les experts, avocats, agences et partenaires\nFournir un appui technique aux départements Souscription, Commercial et Audit lorsque nécessaire', 'Study claims files to identify liability\nAnalyse policy terms, expert reports, official reports and any documents necessary to assess recourse\nDetermine the liable parties in accordance with the CIMA Code and applicable agreements\nBuild, process and follow up recourse files\nDraft claim letters, formal notices, reminders and various correspondence\nPursue recourse against liable third parties or their insurers\nNegotiate and secure the recovery of indemnities owed to the company\nEstablish settlement agreements and monitor their execution\nKeep claims and recourse databases up to date\nProduce periodic reports on the status of files\nPropose improvements to internal claims and recourse procedures\nWork closely with experts, lawyers, agencies and partners\nProvide technical support to the Underwriting, Sales and Audit departments when necessary', 'Être titulaire d\'un Bac +2 en Assurances, Droit, ou domaine équivalent\nJustifier d\'une expérience professionnelle de 2 ans dans la gestion des sinistres ou des recours, de préférence dans le secteur banque/assurance\nAvoir une bonne maîtrise du Code CIMA et de la réglementation en vigueur\nDisposer de compétences solides en analyse, rédaction et négociation\nMaîtriser les outils bureautiques (Word, Excel, logiciels de gestion des sinistres)', 'Hold a Bachelor\'s degree (Bac+2) in Insurance, Law, or an equivalent field\nAt least 2 years of professional experience in claims or recourse management, preferably in the banking/insurance sector\nGood command of the CIMA Code and applicable regulations\nStrong analytical, writing and negotiation skills\nProficiency in office tools (Word, Excel, claims management software)', NULL, NULL, NULL, '19 Avril 2026', 1, '2026-08-21 14:26:17', '2026-08-21 15:05:28'),
('k16mfihqMqwiTTx45ecdjZuRB', 'Directeur des Finances et de la Comptabilité Adjoint (H/F)', 'Deputy Director of Finance and Accounting (M/F)', 'Finance', 'Finance', 'Ouagadougou, Burkina Faso', 'CDI', 'Dans le cadre du renforcement de sa gouvernance financière et du pilotage stratégique de ses filiales, Coris Invest Group SA (CIG) souhaite recevoir des candidatures pour le recrutement d\'un Directeur des Finances et de la Comptabilité Adjoint, chargé d\'accompagner la Direction des Finances et de la Comptabilité dans la mise en œuvre de sa politique financière et comptable. Sous la supervision du Directeur des Finances et de la Comptabilité Groupe, le DFC Adjoint a pour mission d\'appuyer la direction dans la planification, le contrôle, la supervision et l\'amélioration des performances financières du Groupe et de ses filiales. Les dossiers de candidature (lettre de motivation adressée au Directeur Général, CV daté et signé, copies des diplômes) sont recevables par e-mail à recrutement@coris-investgroup.com avec la mention « Candidature au poste de Directeur des Finances et de la Comptabilité Adjoint ».', 'As part of strengthening its financial governance and the strategic management of its subsidiaries, Coris Invest Group SA (CIG) is seeking candidates for the position of Deputy Director of Finance and Accounting, responsible for supporting the Finance and Accounting Department in implementing its financial and accounting policy. Under the supervision of the Group Director of Finance and Accounting, the Deputy DFC\'s mission is to assist management in the planning, control, supervision and improvement of the Group\'s and its subsidiaries\' financial performance. Applications (cover letter addressed to the Chief Executive Officer, dated and signed CV, copies of diplomas) are accepted by e-mail at recrutement@coris-investgroup.com with the subject line \'Application for the position of Deputy Director of Finance and Accounting\'.', 'Assister le Directeur des Finances et de la Comptabilité dans la planification, l\'exécution et le suivi du budget\nParticiper à la consolidation et à l\'analyse des états financiers du Groupe\nSuperviser les arrêtés comptables, le reporting périodique et la production des comptes consolidés\nAssurer la fiabilité du dispositif comptable, fiscal et financier dans le respect des normes SYSCOHADA et IFRS\nContribuer à la mise en œuvre et à l\'optimisation des processus financiers et comptables (ERP Sage X3, contrôle interne, procédures Groupe)\nAccompagner les filiales dans la mise en place du contrôle de gestion et des outils analytiques\nParticiper à l\'élaboration et au suivi du budget consolidé du Groupe\nProduire des analyses financières et tableaux de bord destinés à la Direction Générale et au Conseil d\'Administration\nAssurer l\'intérim du DFC Groupe en cas d\'absence', 'Assist the Director of Finance and Accounting in budget planning, execution and monitoring\nParticipate in the consolidation and analysis of the Group\'s financial statements\nSupervise accounting closings, periodic reporting and the production of consolidated accounts\nEnsure the reliability of the accounting, tax and financial framework in compliance with SYSCOHADA and IFRS standards\nContribute to the implementation and optimization of financial and accounting processes (Sage X3 ERP, internal control, Group procedures)\nSupport subsidiaries in setting up management control and analytical tools\nParticipate in the preparation and monitoring of the Group\'s consolidated budget\nProduce financial analyses and dashboards for Senior Management and the Board of Directors\nAct as interim Group DFC in case of absence', 'Être titulaire d\'un diplôme supérieur en comptabilité, finances, audit ou contrôle de gestion (Bac+5 minimum)\nJustifier d\'au moins 7 à 10 ans d\'expérience professionnelle pertinente, dont une expérience significative dans une fonction similaire, idéalement en groupe ou cabinet international\nMaîtriser les normes comptables SYSCOHADA, les IFRS, ainsi que les outils de reporting et de consolidation\nBonne maîtrise des exigences fiscales d\'entreprise et des groupes\nBonne connaissance des environnements multisectoriels et multi-filiales\nExcellente maîtrise des outils informatiques, notamment Sage X3, Excel avancé, Power BI\nSolides compétences en management, communication, leadership et esprit d\'équipe\nRigueur, sens de l\'organisation, esprit analytique et intégrité professionnelle irréprochable', 'Hold an advanced degree in accounting, finance, audit or management control (Master\'s degree minimum)\nHave at least 7 to 10 years of relevant professional experience, including significant experience in a similar role, ideally within a group or international firm\nMaster SYSCOHADA accounting standards, IFRS, and reporting and consolidation tools\nGood command of corporate and group tax requirements\nGood knowledge of multi-sector, multi-subsidiary environments\nExcellent command of IT tools, particularly Sage X3, advanced Excel, Power BI\nStrong management, communication, leadership and teamwork skills\nRigour, sense of organisation, analytical mindset and impeccable professional integrity', NULL, NULL, NULL, '07 Décembre 2025', 1, '2026-08-21 14:26:11', '2026-08-21 15:04:21'),
('sJPZ3W6RqHBvfOZb5uaSq65o4', 'Chauffeur Coursier (H/F)', 'Driver / Courier (M/F)', 'Opérations', 'Operations', 'Ouagadougou, Burkina Faso', 'CDI', 'Dans le cadre de l\'expansion de ses activités, Excellis Invest Group S.A. souhaite recevoir des candidatures pour le recrutement d\'un Chauffeur Coursier (H/F). Le/la titulaire du poste sera chargé(e) d\'assurer le transport sécurisé du personnel, des documents et des matériels, ainsi que des courses administratives internes et externes. Le dossier de candidature (lettre de motivation, CV daté et signé, copies des diplômes et attestations), réuni en un fichier PDF unique, est à envoyer à recrutement@excellis-investgroup.com avec copie à recrutement@coris-assurances.com, en indiquant en objet « Candidature au poste de Chauffeur Coursier ».', 'As part of the expansion of its activities, Excellis Invest Group S.A. is seeking candidates for the position of Driver / Courier (M/F). The successful candidate will be responsible for ensuring the secure transport of staff, documents and materials, as well as internal and external administrative errands. Applications (cover letter, dated and signed CV, copies of diplomas and certificates), combined into a single PDF file, should be sent to recrutement@excellis-investgroup.com with a copy to recrutement@coris-assurances.com, with the subject line \'Application for the position of Driver / Courier\'.', 'Assurer le transport du personnel et des visiteurs selon les besoins du service\nVeiller à la sécurité des passagers et au respect du code de la route\nMaintenir une conduite courtoise, responsable et professionnelle\nAssurer la collecte, la distribution et le dépôt de documents (courriers, dossiers, plis, colis) auprès des partenaires, administrations et agences\nEffectuer les courses urgentes liées aux opérations\nGarantir la confidentialité des documents transportés\nVeiller au bon état mécanique et à la propreté du véhicule\nAssurer le suivi des entretiens, vidanges, réparations et contrôles techniques\nTenir à jour le carnet de bord (kilométrage, consommation, observations)\nAppuyer les équipes dans la manutention légère et les déplacements de matériels\nParticiper aux activités logistiques des événements internes\nExécuter toute tâche confiée en lien avec la fonction', 'Ensure the transport of staff and visitors according to service needs\nEnsure passenger safety and compliance with traffic regulations\nMaintain courteous, responsible and professional driving\nEnsure the collection, distribution and delivery of documents (mail, files, packages, parcels) to partners, administrations and agencies\nCarry out urgent errands related to operations\nGuarantee the confidentiality of transported documents\nEnsure the vehicle is kept in good mechanical condition and clean\nMonitor servicing, oil changes, repairs and technical inspections\nKeep the logbook up to date (mileage, fuel consumption, observations)\nSupport teams with light handling and equipment transport\nParticipate in the logistics of internal events\nCarry out any task assigned in connection with the role', 'Être titulaire au minimum d\'un CEP ou d\'un diplôme équivalent\nAvoir un permis de conduire catégorie B valide (C et D : un atout)\nJustifier d\'une expérience d\'au moins 2 ans en tant que chauffeur ou chauffeur-coursier, idéalement dans une entreprise ou institution\nAvoir une connaissance pratique de la mécanique automobile serait un plus pour le poste\nConnaissance parfaite de la ville de Ouagadougou et de ses environs\nSens élevé du respect, de la confidentialité, de la ponctualité et du professionnalisme\nBonne présentation, courtoisie et aisance relationnelle\nCapacité à travailler sous pression et à respecter les délais', 'Hold at least a CEP (primary school certificate) or equivalent diploma\nHold a valid category B driving licence (C and D: an asset)\nAt least 2 years of experience as a driver or driver/courier, ideally within a company or institution\nPractical knowledge of car mechanics would be a plus for this position\nThorough knowledge of the city of Ouagadougou and its surrounding areas\nStrong sense of respect, confidentiality, punctuality and professionalism\nGood presentation, courtesy and interpersonal skills\nAbility to work under pressure and meet deadlines', NULL, NULL, NULL, '19 Avril 2026', 1, '2026-08-21 14:26:16', '2026-08-21 15:05:08'),
('Ulzn41DzChGLwtolkmklC7rLM', 'Comptable Trésorier (H/F)', 'Treasury Accountant (M/F)', 'Finance', 'Finance', 'Ouagadougou, Burkina Faso', 'CDI', 'Dans le cadre de l\'expansion de ses activités, Excellis Invest Group S.A. souhaite recevoir des candidatures pour le recrutement d\'un Comptable Trésorier (H/F). Le/la titulaire du poste doit contribuer à une gestion efficace de la trésorerie, assurer un suivi rigoureux des flux financiers et veiller au respect des obligations réglementaires du secteur des assurances. Le dossier de candidature (lettre de motivation, CV daté et signé, copies des diplômes et attestations), réuni en un fichier PDF unique, est à envoyer à recrutement@excellis-investgroup.com avec copie à recrutement@coris-assurances.com, en indiquant en objet « Candidature au poste de Comptable Trésorier ».', 'As part of the expansion of its activities, Excellis Invest Group S.A. is seeking candidates for the position of Treasury Accountant (M/F). The successful candidate must contribute to efficient treasury management, ensure rigorous monitoring of financial flows and comply with the regulatory obligations of the insurance sector. Applications (cover letter, dated and signed CV, copies of diplomas and certificates), combined into a single PDF file, should be sent to recrutement@excellis-investgroup.com with a copy to recrutement@coris-assurances.com, with the subject line \'Application for the position of Treasury Accountant\'.', 'Enregistrer les opérations comptables liées à la trésorerie (banque, caisse, paiements, encaissements)\nAssurer la tenue à jour des journaux de trésorerie et des pièces comptables\nVérifier la conformité et la régularité des pièces justificatives (factures, bons de paiement, pièces bancaires)\nParticiper à l\'élaboration des situations comptables périodiques\nContribuer à la préparation des états financiers et des dossiers de clôture mensuelle et annuelle\nAssurer l\'archivage physique et numérique des documents comptables selon les procédures internes\nEffectuer les opérations de paiement et d\'encaissement\nSuivre la réalisation des opérations avec les banques\nPréparer les bordereaux de remise à l\'encaissement\nÉtablir les prévisions de trésorerie à court, moyen et long terme\nOptimiser les flux financiers pour réduire les coûts bancaires et améliorer la liquidité', 'Record accounting transactions related to treasury (bank, cash, payments, receipts)\nKeep treasury journals and accounting records up to date\nVerify the compliance and regularity of supporting documents (invoices, payment vouchers, bank documents)\nParticipate in the preparation of periodic accounting statements\nContribute to the preparation of financial statements and monthly and annual closing files\nEnsure the physical and digital archiving of accounting documents according to internal procedures\nCarry out payment and collection operations\nMonitor transactions with banks\nPrepare deposit slips for collection\nEstablish short, medium and long-term cash flow forecasts\nOptimise financial flows to reduce banking costs and improve liquidity', 'Être titulaire d\'un BAC+3 en Finance, Comptabilité, Banque, Gestion ou domaine équivalent\nExpérience professionnelle d\'au moins 2 ans dans la gestion de trésorerie, idéalement dans une compagnie d\'assurances, une banque ou une entreprise de grande taille\nBonne connaissance du secteur financier et des réglementations applicables\nMaîtrise des outils bureautiques (Excel avancé), logiciels comptables et éventuellement logiciels de gestion de trésorerie\nRigueur, sens de la confidentialité, réactivité et capacité à travailler sous pression\nAisance relationnelle et capacité d\'analyse', 'Hold a Bachelor\'s degree (BAC+3) in Finance, Accounting, Banking, Management or an equivalent field\nAt least 2 years of professional experience in treasury management, ideally within an insurance company, a bank or a large company\nGood knowledge of the financial sector and applicable regulations\nProficiency in office tools (advanced Excel), accounting software and possibly treasury management software\nRigour, sense of confidentiality, responsiveness and ability to work under pressure\nInterpersonal skills and analytical ability', NULL, NULL, NULL, '19 Avril 2026', 1, '2026-08-21 14:26:14', '2026-08-21 15:04:36');

-- --------------------------------------------------------

--
-- Table structure for table `CompanyInfo`
--

CREATE TABLE `CompanyInfo` (
  `id` varchar(191) NOT NULL DEFAULT 'main',
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`data`)),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `CompanyInfo`
--

INSERT INTO `CompanyInfo` (`id`, `data`, `updatedAt`) VALUES
('main', '{\"nom\":\"Excellis Invest Group\",\"tagline\":\"Investir autrement\",\"descriptionCourte\":\"Holding d\'investissement multisectorielle basée au Burkina Faso. 20 milliards FCFA de capital social. 17 filiales. 9 secteurs stratégiques. Noté Bloomfield.\",\"description\":\"Excellis Invest Group (ex Coris Invest Group) est une holding d\'investissement multisectorielle basée au Burkina Faso.\",\"mission\":\"Mobiliser des expertises, des capitaux et des mécanismes d\'intervention à forte valeur ajoutée pour accompagner les institutions et entreprises africaines dans leur financement, leur structuration et leur développement durable.\",\"vision\":\"Être un investisseur panafricain de référence, catalyseur de croissance, de transformation et de création de valeur durable en Afrique.\",\"valeurs\":[{\"titre\":\"Rigueur\",\"icone\":\"scale-balanced\",\"description\":\"Des standards élevés dans toutes nos décisions d\'investissement et dans notre gouvernance.\"},{\"titre\":\"Adaptabilité\",\"icone\":\"arrows-rotate\",\"description\":\"Un modèle évolutif, ancré dans les réalités économiques africaines et ouvert aux opportunités.\"},{\"titre\":\"Innovation\",\"icone\":\"lightbulb\",\"description\":\"Une culture de l\'innovation au service de la modernisation des économies africaines.\"},{\"titre\":\"Esprit d\'équipe\",\"icone\":\"handshake\",\"description\":\"Une synergie des filiales et des talents pour créer une valeur collective supérieure.\"}],\"kpis\":[{\"num\":\"20\",\"unite\":\"Mds\",\"label\":\"FCFA de capital social\"},{\"num\":\"17\",\"unite\":\"\",\"label\":\"Filiales opérationnelles\"},{\"num\":\"9\",\"unite\":\"\",\"label\":\"Secteurs d\'activité\"},{\"num\":\"2\",\"unite\":\"\",\"label\":\"Pays (BF + CI)\"},{\"num\":\"BBB\",\"unite\":\"\",\"label\":\"Notation Bloomfield\"}],\"adresse\":\"Ouagadougou, Burkina Faso\",\"email\":\"contact@excellis-invest-group.com\",\"telephone\":\"+226 25 30 00 00\",\"whatsapp\":\"22625300000\"}', '2026-05-01 15:38:08.450');

-- --------------------------------------------------------

--
-- Table structure for table `company_infos`
--

CREATE TABLE `company_infos` (
  `id` varchar(255) NOT NULL DEFAULT 'main',
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`data`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `company_infos`
--

INSERT INTO `company_infos` (`id`, `data`, `created_at`, `updated_at`) VALUES
('main', '{\"nom\":\"Excellis Invest Group\",\"tagline\":\"Investir autrement\",\"descriptionCourte\":\"Excellis Invest Group est une holding multisectorielle capitalis\\u00e9e \\u00e0 20 milliards FCFA, d\\u00e9veloppant ses activit\\u00e9s dans plusieurs secteurs strat\\u00e9giques en Afrique.\",\"descriptionCourte_en\":\"Excellis Invest Group is a multisectoral holding capitalised at 20 billion FCFA, developing its activities across several strategic sectors in Africa.\",\"description\":\"Excellis Invest Group est une holding multisectorielle capitalis\\u00e9e \\u00e0 20 milliards FCFA, d\\u00e9veloppant ses activit\\u00e9s dans plusieurs secteurs strat\\u00e9giques en Afrique. Fond\\u00e9e en 2019 et bas\\u00e9e au Burkina Faso, elle assure le pilotage strat\\u00e9gique et la gouvernance d\'un portefeuille de filiales couvrant les services financiers, l\'assurance, les \\u00e9nergies, l\'immobilier, les technologies, l\'industrie, le transport-logistique, l\'h\\u00f4tellerie et le commerce.\",\"description_en\":\"Excellis Invest Group is a multisectoral holding capitalised at 20 billion FCFA, developing its activities across several strategic sectors in Africa. Founded in 2019 and headquartered in Burkina Faso, it provides strategic management and governance of a portfolio of subsidiaries covering financial services, insurance, energy, real estate, technology, industry, logistics, hospitality and commerce.\",\"mission\":\"Mobiliser des expertises, des capitaux et des m\\u00e9canismes d\'intervention \\u00e0 forte valeur ajout\\u00e9e pour accompagner les institutions et entreprises africaines dans leur structuration et leur d\\u00e9veloppement durable.\",\"mission_en\":\"Mobilise expertise, capital and high value-added intervention mechanisms to support African institutions and companies in their structuring and sustainable development.\",\"vision\":\"\\u00catre un investisseur panafricain de r\\u00e9f\\u00e9rence.\",\"vision_en\":\"To be a reference pan-African investor.\",\"valeurs\":[{\"titre\":\"Rigueur\",\"titre_en\":\"Rigour\",\"icone\":\"scale-balanced\",\"description\":\"Des standards \\u00e9lev\\u00e9s dans toutes nos d\\u00e9cisions d\'investissement et dans notre gouvernance.\",\"description_en\":\"High standards in all our investment decisions and governance.\"},{\"titre\":\"Innovation\",\"titre_en\":\"Innovation\",\"icone\":\"lightbulb\",\"description\":\"Une culture de l\'innovation au service de la modernisation des \\u00e9conomies africaines.\",\"description_en\":\"A culture of innovation in service of modernising African economies.\"},{\"titre\":\"Adaptabilit\\u00e9\",\"titre_en\":\"Adaptability\",\"icone\":\"arrows-rotate\",\"description\":\"Un mod\\u00e8le \\u00e9volutif, ancr\\u00e9 dans les r\\u00e9alit\\u00e9s \\u00e9conomiques africaines et ouvert aux opportunit\\u00e9s.\",\"description_en\":\"An evolving model, rooted in African economic realities and open to opportunities.\"},{\"titre\":\"Accessibilit\\u00e9\",\"titre_en\":\"Accessibility\",\"icone\":\"box-open\",\"description\":\"Des services et des investissements accessibles au plus grand nombre.\",\"description_en\":\"Services and investments that are accessible,  the greatest number.\"},{\"titre\":\"Esprit d\'\\u00e9quipe\",\"titre_en\":\"Team Spirit\",\"icone\":\"handshake\",\"description\":\"Une synergie des filiales et des talents pour cr\\u00e9er une valeur collective sup\\u00e9rieure.\",\"description_en\":\"A synergy of subsidiaries and talent to create superior collective value.\"}],\"kpis\":[{\"num\":\"+700\",\"unite\":null,\"label\":\"Collaborateurs\",\"label_en\":null},{\"num\":\"18\",\"unite\":null,\"label\":\"Filiales op\\u00e9rationnelles\",\"label_en\":null},{\"num\":\"9\",\"unite\":null,\"label\":\"Secteurs strat\\u00e9giques\",\"label_en\":null},{\"num\":\"2\",\"unite\":null,\"label\":\"Pays (BF + CI)\",\"label_en\":null},{\"num\":\"2019\",\"unite\":null,\"label\":\"Ann\\u00e9e de cr\\u00e9ation\",\"label_en\":null}],\"gouvernancePiliers\":[{\"num\":\"01\",\"titre\":\"Rigueur & Transparence\",\"titre_en\":\"Rigour & Transparency\",\"texte\":\"Gouvernance en SA de droit burkinab\\u00e8, structure financi\\u00e8re solide\",\"texte_en\":\"Governance as a joint-stock company under Burkinabe law, solid financial structure\"},{\"num\":\"02\",\"titre\":\"Adaptabilit\\u00e9 & Innovation\",\"titre_en\":\"Adaptability & Innovation\",\"texte\":\"Mod\\u00e8le \\u00e9volutif, ancr\\u00e9 dans les r\\u00e9alit\\u00e9s africaines\",\"texte_en\":\"Evolving model, rooted in African realities\"},{\"num\":\"03\",\"titre\":\"Cr\\u00e9ation de Valeur Durable\",\"titre_en\":\"Sustainable Value Creation\",\"texte\":\"Investissements de long terme dans les secteurs structurants\",\"texte_en\":\"Long-term investments in structuring sectors\"},{\"num\":\"04\",\"titre\":\"Esprit de Partenariat\",\"titre_en\":\"Spirit of Partnership\",\"texte\":\"Croissance en synergie avec les partenaires institutionnels\",\"texte_en\":\"Growth in synergy with institutional partners\"},{\"num\":\"05\",\"titre\":\"Performance & Responsabilit\\u00e9\",\"titre_en\":\"Performance & Accountability\",\"texte\":\"R\\u00e9sultats mesurables, impact \\u00e9conomique et social concret\",\"texte_en\":\"Measurable results, concrete economic and social impact\"}],\"adresse\":\"Ouagadougou, Burkina Faso\",\"email\":\"contact@excellis-invest-group.com\",\"telephone\":\"+226 25 30 00 00\",\"nom_president\":\"Bolo SANOU\",\"titre_president\":\"Pr\\u00e9sident du Conseil d\'Administration\",\"titre_president_en\":\"Chairman of the Board of Directors\",\"photo_president\":null,\"mot_president\":\"Notre conseil veille \\u00e0 ce que chaque d\\u00e9cision strat\\u00e9gique soit guid\\u00e9e par l\'int\\u00e9grit\\u00e9, la transparence et la cr\\u00e9ation de valeur \\u00e0 long terme pour \\n  toutes nos parties prenantes.\",\"mot_president_en\":\"Our board ensures that every strategic decision is guided by integrity, transparency and the long-term creation of value for all our stakeholders.\",\"nom_dg\":\"Yacouba SARE\",\"titre_dg\":\"Directeur G\\u00e9n\\u00e9ral\",\"titre_dg_en\":\"Chief Executive Officer\",\"photo_dg\":null,\"mot_dg\":\"Chaque filiale, chaque secteur, chaque talent est un levier de croissance. Notre r\\u00f4le est de les orchestrer avec coh\\u00e9rence pour produire un impact \\n  \\u00e9conomique mesurable et durable en Afrique.\",\"mot_dg_en\":\"Each subsidiary, each sector, each talent is a lever for growth. Our role is to orchestrate them with coherence to produce a measurable and lasting \\n  economic impact across Africa.\",\"whatsapp\":null,\"linkedin\":\"https:\\/\\/www.linkedin.com\\/company\\/excellis-invest-group\\/\",\"facebook\":\"https:\\/\\/web.facebook.com\\/p\\/Excellis-Invest-Group-61572568144071\\/?_rdc=1&_rdr#\",\"twitter\":null,\"instagram\":null,\"youtube\":null,\"website\":null,\"tagline_en\":\"Investing differently\",\"imageGroupe\":null,\"footerTagline\":\"Investir autrement\",\"footerDesc\":null,\"footerCopyright\":\"jof\\u00e9\\u00b0. Tous droits r\\u00e9serv\\u00e9s.\",\"footerMentions\":null,\"footerConfidentialite\":null,\"footerCookies\":null,\"footerCols\":[{\"title\":\"Le Groupe\",\"links\":[{\"label\":\"Notre vision\",\"href\":\"\\/le-groupe\",\"label_en\":\"Our vision\"},{\"label\":\"Gouvernance\",\"href\":\"\\/gouvernance\",\"label_en\":\"Governance\"}],\"title_en\":\"The Group\"},{\"title\":\"Activit\\u00e9s\",\"links\":[{\"label\":\"Nos m\\u00e9tiers\",\"href\":\"\\/nos-metiers\",\"label_en\":\"Our businesses\"},{\"label\":\"Nos filiales\",\"href\":\"\\/nos-filiales\",\"label_en\":\"Our subsidiaries\"}],\"title_en\":\"Activities\"},{\"title\":\"Informations\",\"links\":[{\"label\":\"Actualit\\u00e9s\",\"href\":\"\\/actualites\",\"label_en\":\"News\"},{\"label\":\"Carri\\u00e8res\",\"href\":\"\\/carrieres\",\"label_en\":\"Careers\"},{\"label\":\"Contact\",\"href\":\"\\/contact\",\"label_en\":\"Contact\"},{\"label\":\"Relations presse\",\"href\":\"\\/contact\",\"label_en\":\"Press relationships\"},{\"label\":\"Partenariats\",\"href\":\"\\/contact\",\"label_en\":\"Partnerships\"}],\"title_en\":\"Information\"}],\"footerTagline_en\":\"Investing differently\",\"footerDesc_en\":null,\"footerCopyright_en\":\"jof\\u00e9\\u00b0. All rights reserved.\",\"ratingAgence\":null,\"ratingNotes\":null,\"ratingPerspective\":null,\"modele\":null,\"modele_en\":null,\"heroBadge\":null,\"heroBadge_en\":null,\"heroSub\":null,\"heroSub_en\":null,\"ctaTitre\":null,\"ctaTitre_en\":null,\"ctaSousTitre\":null,\"ctaSousTitre_en\":null,\"ambition\":null,\"ambition_en\":null,\"ratingDesc\":null,\"ratingDesc_en\":null,\"sousTitreGroupe\":null,\"sousTitreGroupe_en\":null,\"sousTitreFiliales\":null,\"sousTitreFiliales_en\":null,\"sousTitreMetiers\":\"Du march\\u00e9 financier \\u00e0 l\'\\u00e9nergie, de l\'assurance \\u00e0 la fintech, Excellis Invest Group intervient dans les \\n  secteurs qui structurent les \\u00e9conomies africaines d\'aujourd\'hui et de demain.\",\"sousTitreMetiers_en\":\"From financial markets to energy, from insurance to fintech, Excellis Invest Group operates in the sectors shaping Africa\'s economies today and tomorrow.\",\"sousTitreGouvernance\":null,\"sousTitreGouvernance_en\":null,\"sousTitreCarrieres\":null,\"sousTitreCarrieres_en\":null,\"sousTitreContact\":null,\"sousTitreContact_en\":null}', '2026-05-03 10:38:05', '2026-08-21 16:43:06');

-- --------------------------------------------------------

--
-- Table structure for table `ContactMessage`
--

CREATE TABLE `ContactMessage` (
  `id` varchar(191) NOT NULL,
  `nom` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `telephone` varchar(191) DEFAULT NULL,
  `sujet` varchar(191) NOT NULL,
  `message` text NOT NULL,
  `lu` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `sujet` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `lu` tinyint(1) NOT NULL DEFAULT 0,
  `traite` tinyint(1) NOT NULL DEFAULT 0,
  `note` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Dirigeant`
--

CREATE TABLE `Dirigeant` (
  `id` varchar(191) NOT NULL,
  `nom` varchar(191) NOT NULL,
  `role` varchar(191) NOT NULL,
  `bio` text NOT NULL,
  `expertise` text DEFAULT NULL,
  `formation` text DEFAULT NULL,
  `experiences` text DEFAULT NULL,
  `linkedin` varchar(191) DEFAULT NULL,
  `photo` varchar(191) DEFAULT NULL,
  `ordre` int(11) NOT NULL DEFAULT 0,
  `actif` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Dirigeant`
--

INSERT INTO `Dirigeant` (`id`, `nom`, `role`, `bio`, `expertise`, `formation`, `experiences`, `linkedin`, `photo`, `ordre`, `actif`) VALUES
('daf', 'Aminata Sawadogo', 'Directrice Administrative & Financière', 'Aminata Sawadogo supervise l\'ensemble des fonctions financières d\'Excellis Invest Group : reporting consolidé, gestion de trésorerie, relations avec les investisseurs et suivi de la notation Bloomfield. Reconnue pour sa rigueur et son excellence opérationnelle, elle a joué un rôle clé dans l\'obtention et le maintien de la notation BBB du Groupe, gage de crédibilité auprès des partenaires financiers internationaux.', 'Consolidation financière et reporting IFRS\nGestion de trésorerie et cash management\nRelations investisseurs et notation financière\nAudit interne et contrôle de gestion\nIngénierie financière et levée de fonds', 'DESCF (Diplôme d\'Études Supérieures Comptables et Financières) – Ouagadougou (2003)\nMaster CCA – IAE de Lyon (2001)\nLicence Comptabilité & Gestion – Université de Ouagadougou (1999)', 'Directrice Administrative & Financière – Excellis Invest Group (2019 – présent)\nDirectrice Financière – Coris Assurance IARD BF (2014 – 2019)\nResponsable Contrôle de Gestion – Société Générale Burkina Faso (2008 – 2014)\nAuditrice – KPMG Côte d\'Ivoire (2003 – 2008)', NULL, NULL, 2, 1),
('dg', 'Issouf Compaoré', 'Directeur Général', 'Issouf Compaoré dirige Excellis Invest Group depuis sa transformation en holding multisectorielle. Fort de plus de 22 ans d\'expérience dans la finance et l\'investissement en Afrique subsaharienne, il incarne la vision panafricaine du Groupe : mobiliser des capitaux privés au service du développement économique durable de la sous-région. Sous sa direction, EIG a structuré un portefeuille de 17 filiales couvrant 9 secteurs stratégiques, tout en maintenant une notation BBB attribuée par Bloomfield Investment Corporation.', 'Stratégie d\'investissement\nFinance d\'entreprise et structuration\nGouvernance de holdings\nDéveloppement des marchés financiers africains\nRelations institutionnelles et partenariats stratégiques', 'MBA Finance & Stratégie – HEC Paris (2002)\nMaster 2 Économie Internationale – Université Paris I Panthéon-Sorbonne (2000)\nLicence en Sciences Économiques – Université de Ouagadougou (1998)', 'Directeur Général – Excellis Invest Group, Ouagadougou (2018 – présent)\nDirecteur des Investissements – Coris Bank International (2012 – 2018)\nResponsable Pôle Financement – BOAD, Lomé (2007 – 2012)\nAnalyste Financier Senior – Société Générale, Paris (2002 – 2007)', NULL, NULL, 1, 1),
('djuridique', 'Seydou Ouédraogo', 'Directeur Juridique & Conformité', 'Seydou Ouédraogo garantit la sécurité juridique et la conformité réglementaire de l\'ensemble du Groupe et de ses filiales, dans un environnement multi-juridictionnel couvrant le Burkina Faso et la Côte d\'Ivoire. Expert du droit des affaires OHADA et de la régulation CIMA, il pilote la stratégie de conformité d\'EIG et accompagne les opérations de croissance externe du Groupe.', 'Droit des affaires et droit OHADA\nRégulation des marchés financiers (AMF-UMOA, BRVM)\nConformité CIMA (assurance)\nFusions-acquisitions et due diligence juridique\nGouvernance d\'entreprise et droit des sociétés', 'Master 2 Droit des Affaires Internationales – Université Paris II Assas (2004)\nDEA Droit Privé – Université de Ouagadougou (2002)\nLicence en Droit – Université de Ouagadougou (2000)', 'Directeur Juridique & Conformité – Excellis Invest Group (2020 – présent)\nJuriste Senior – Coris Bank International (2013 – 2020)\nConseiller Juridique – Cabinet Badouel & Associés, Paris (2007 – 2013)\nJuriste d\'affaires – NSIA Groupe, Abidjan (2004 – 2007)', NULL, NULL, 3, 1),
('dops', 'Rasmané Kaboré', 'Directeur des Opérations', 'Rasmané Kaboré coordonne les synergies opérationnelles entre les 17 filiales du Groupe et pilote les projets de transformation organisationnelle. Il est le garant de la performance opérationnelle collective d\'EIG, assurant la cohérence des processus, la qualité de l\'exécution et le déploiement des meilleures pratiques à travers toutes les entités du portefeuille.', 'Management opérationnel multi-sites\nTransformation organisationnelle et gestion du changement\nGestion de projets complexes (PMI/Prince2)\nDéveloppement des ressources humaines\nStratégie de croissance et synergies de groupe', 'MBA Management & Stratégie – Grenoble École de Management (2006)\nIngénieur Industriel – Institut Supérieur de Technologie, Ouagadougou (2003)', 'Directeur des Opérations – Excellis Invest Group (2021 – présent)\nDirecteur Général Adjoint – Novelus (2016 – 2021)\nDirecteur des Opérations – Industries des Arts Graphiques (2010 – 2016)\nResponsable Projets – Bureau d\'Études BERD, Ouagadougou (2006 – 2010)', NULL, NULL, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `dirigeants`
--

CREATE TABLE `dirigeants` (
  `id` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `role_en` varchar(255) DEFAULT NULL,
  `bio` text NOT NULL,
  `bio_en` text DEFAULT NULL,
  `mot` text DEFAULT NULL,
  `mot_en` text DEFAULT NULL,
  `expertise` text DEFAULT NULL,
  `formation` text DEFAULT NULL,
  `experiences` text DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `ordre` int(11) NOT NULL DEFAULT 0,
  `actif` tinyint(1) NOT NULL DEFAULT 1,
  `categorie` varchar(255) NOT NULL DEFAULT 'conseil',
  `responsabilites` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`responsabilites`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `dirigeants`
--

INSERT INTO `dirigeants` (`id`, `nom`, `role`, `role_en`, `bio`, `bio_en`, `mot`, `mot_en`, `expertise`, `formation`, `experiences`, `linkedin`, `photo`, `ordre`, `actif`, `categorie`, `responsabilites`) VALUES
('president-groupe', 'Idrissa NASSA', 'Président du Groupe', 'Group President', 'Idrissa NASSA préside Excellis Invest Group avec une vision portée par la conviction que l\'Afrique dispose de toutes les ressources pour bâtir ses propres champions économiques. Sous son leadership, le Groupe s\'est affirmé comme un acteur de référence de l\'investissement multisectoriel, conjuguant rigueur financière, innovation et ancrage territorial.', 'Idrissa NASSA leads Excellis Invest Group with a vision driven by the conviction that Africa has all the resources needed to build its own economic champions. Under his leadership, the Group has established itself as a reference player in multi-sectoral investment, combining financial rigour, innovation and territorial roots.', 'Notre ambition est de bâtir un groupe qui crée de la valeur durablement, avec rigueur et vision, au service des économies africaines et des générations futures.', 'Our ambition is to build a group that creates lasting value, with rigour and vision, in service of African economies and future generations.', NULL, NULL, NULL, NULL, '/uploads/1780083999-594478.jpeg', 1, 1, 'president', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Filiale`
--

CREATE TABLE `Filiale` (
  `id` varchar(191) NOT NULL,
  `sigle` varchar(191) NOT NULL,
  `nom` varchar(191) NOT NULL,
  `secteur` varchar(191) NOT NULL,
  `secteurSlug` varchar(191) NOT NULL,
  `pays` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `logo` varchar(191) DEFAULT NULL,
  `ordre` int(11) NOT NULL DEFAULT 0,
  `actif` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Filiale`
--

INSERT INTO `Filiale` (`id`, `sigle`, `nom`, `secteur`, `secteurSlug`, `pays`, `description`, `logo`, `ordre`, `actif`, `createdAt`, `updatedAt`) VALUES
('barka-energies', 'BE', 'Barka Energies', 'Énergie', 'energie', 'Burkina Faso', 'Barka Energies intervient dans la distribution de produits pétroliers et dans la fourniture de solutions solaires.', NULL, 3, 1, '2026-05-01 15:38:08.220', '2026-05-01 15:38:08.220'),
('coris-asset-management', 'CAM', 'Coris Asset Management', 'Gestion d\'Actifs', 'marches-financiers', 'Burkina Faso', 'Société de Gestion d\'OPCVM (SGO), spécialisée dans la gestion de fonds communs de placement sur la BRVM.', NULL, 10, 1, '2026-05-01 15:38:08.275', '2026-05-01 15:38:08.275'),
('coris-assurance-iard-bf', 'CA', 'Coris Assurance IARD BF', 'Assurance Non-Vie', 'assurance', 'Burkina Faso', 'Conseil, conception et commercialisation de produits d\'assurances non vie au Burkina Faso, sous régulation CIMA.', NULL, 5, 1, '2026-05-01 15:38:08.236', '2026-05-01 15:38:08.236'),
('coris-assurance-iard-ci', 'CI', 'Coris Assurance IARD CI', 'Assurance Non-Vie', 'assurance', 'Côte d\'Ivoire', 'Conseil, conception et commercialisation de produits d\'assurances non vie en Côte d\'Ivoire, sous régulation CIMA.', NULL, 7, 1, '2026-05-01 15:38:08.252', '2026-05-01 15:38:08.252'),
('coris-assurance-vie-bf', 'CV', 'Coris Assurance Vie BF', 'Assurance Vie', 'assurance', 'Burkina Faso', 'Conseil, conception et commercialisation de produits d\'assurances vie au Burkina Faso, sous régulation CIMA.', NULL, 6, 1, '2026-05-01 15:38:08.244', '2026-05-01 15:38:08.244'),
('coris-assurance-vie-ci', 'CVI', 'Coris Assurance Vie CI', 'Assurance Vie', 'assurance', 'Côte d\'Ivoire', 'Conseil, conception et commercialisation de produits d\'assurances vie en Côte d\'Ivoire, sous régulation CIMA.', NULL, 8, 1, '2026-05-01 15:38:08.260', '2026-05-01 15:38:08.260'),
('coris-bourse', 'CB', 'Coris Bourse', 'Marchés Financiers', 'marches-financiers', 'Burkina Faso', 'Société de Gestion et d\'Intermédiation (SGI), accompagnant sa clientèle dans l\'achat et la vente de valeurs mobilières sur la BRVM.', NULL, 9, 1, '2026-05-01 15:38:08.267', '2026-05-01 15:38:08.267'),
('energytis', 'ET', 'Energytis', 'Production d\'Énergie', 'energie', 'Burkina Faso', 'Spécialisée dans l\'étude, l\'ingénierie, le développement, le financement et l\'exploitation de sites de production d\'énergie.', NULL, 16, 1, '2026-05-01 15:38:08.318', '2026-05-01 15:38:08.318'),
('expertis-bf', 'EXB', 'Expertis BF', 'Immobilier & Capital-Risque', 'immobilier-capital', 'Burkina Faso', 'Spécialisée dans la tierce détention, le suivi d\'exécution de projets, les investissements en capital-risque et la promotion immobilière.', NULL, 11, 1, '2026-05-01 15:38:08.284', '2026-05-01 15:38:08.284'),
('expertis-ci', 'EXC', 'Expertis CI', 'Immobilier & Capital-Risque', 'immobilier-capital', 'Côte d\'Ivoire', 'Spécialisée dans la tierce détention, le capital-risque, la promotion immobilière et la maîtrise d\'ouvrage déléguée en Côte d\'Ivoire.', NULL, 12, 1, '2026-05-01 15:38:08.292', '2026-05-01 15:38:08.292'),
('general-mining-logistics', 'GML', 'General Mining Logistics TS', 'Transport & Logistique Minière', 'logistique-miniere', 'Burkina Faso', 'Intervient dans les services logistiques, techniques et opérationnels au profit des secteurs minier et industriel.', NULL, 17, 1, '2026-05-01 15:38:08.326', '2026-05-01 15:38:08.326'),
('industries-arts-graphiques', 'IAG', 'Industries des Arts Graphiques', 'Industrie & Arts Graphiques', 'industrie', 'Burkina Faso', 'Spécialisée dans l\'imprimerie, la conception graphique, la signalétique et la sécurisation de documents sensibles.', NULL, 14, 1, '2026-05-01 15:38:08.300', '2026-05-01 15:38:08.300'),
('intermediaire-des-services', 'IS', 'Intermédiaire Des Services', 'Services Financiers', 'services-financiers', 'Burkina Faso', 'La société accompagne ses clients en intermédiation bancaire, négociation de financements et structuration de montages financiers adaptés à leurs besoins.', NULL, 1, 1, '2026-05-01 15:38:08.201', '2026-05-01 15:38:08.201'),
('loans-recovery-company', 'LRC', 'Loans Recovery Company', 'Gestion de Créances', 'services-financiers', 'Burkina Faso', 'Société spécialisée dans la gestion des créances, à travers le recouvrement, le rachat et la restructuration de créances.', NULL, 2, 1, '2026-05-01 15:38:08.210', '2026-05-01 15:38:08.210'),
('novelus', 'NOV', 'Novelus', 'Commerce & Fournitures', 'commerce', 'Burkina Faso', 'Entreprise commerciale spécialisée dans la fourniture de bureau, les consommables, le matériel informatique et les groupes électrogènes.', NULL, 15, 1, '2026-05-01 15:38:08.311', '2026-05-01 15:38:08.311'),
('sopatel-silmande', 'SS', 'Sopatel Silmandé', 'Hôtellerie & Restauration', 'hotellerie', 'Burkina Faso', 'Établissement hôtelier de référence à Ouagadougou, offrant des services d\'hébergement et de restauration haut de gamme.', NULL, 4, 1, '2026-05-01 15:38:08.228', '2026-05-01 15:38:08.228');

-- --------------------------------------------------------

--
-- Table structure for table `filiales`
--

CREATE TABLE `filiales` (
  `id` varchar(255) NOT NULL,
  `sigle` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `secteur` varchar(255) NOT NULL,
  `secteur_en` varchar(255) DEFAULT NULL,
  `secteur_slug` varchar(255) NOT NULL,
  `pays` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `description_en` text DEFAULT NULL,
  `mission` text DEFAULT NULL,
  `mission_en` text DEFAULT NULL,
  `vision` text DEFAULT NULL,
  `valeurs` text DEFAULT NULL,
  `commentaires` longtext DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `youtube` varchar(255) DEFAULT NULL,
  `tiktok` varchar(255) DEFAULT NULL,
  `whatsapp` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `email_contact` varchar(255) DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `ville` varchar(255) DEFAULT NULL,
  `ordre` int(11) NOT NULL DEFAULT 0,
  `actif` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `vision_en` text DEFAULT NULL,
  `valeurs_en` text DEFAULT NULL,
  `commentaires_en` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `filiales`
--

INSERT INTO `filiales` (`id`, `sigle`, `nom`, `secteur`, `secteur_en`, `secteur_slug`, `pays`, `description`, `description_en`, `mission`, `mission_en`, `vision`, `valeurs`, `commentaires`, `logo`, `image`, `website`, `linkedin`, `facebook`, `twitter`, `instagram`, `youtube`, `tiktok`, `whatsapp`, `telephone`, `email_contact`, `adresse`, `ville`, `ordre`, `actif`, `created_at`, `updated_at`, `vision_en`, `valeurs_en`, `commentaires_en`) VALUES
('bagreah', 'BGH', 'BAGREAH', 'Agribusiness', 'Agribusiness', 'agribusiness', 'Burkina Faso', 'BAGREAH est une entreprise burkinabè de production agro-sylvo-pastorale et piscicole basée à Bagré, au Burkina Faso. Elle développe des solutions de production intégrée, durable et compétitive, destinées à répondre aux besoins alimentaires locaux, régionaux et internationaux, tout en valorisant les ressources naturelles, humaines et économiques de son territoire. À travers un modèle intégré combinant agriculture, élevage, sylviculture et pisciculture, l\'entreprise ambitionne de contribuer à la sécurité alimentaire, à la création de valeur locale et au développement de chaînes de production compétitives. Signature : « Produire durablement, nourrir l\'avenir. »', 'BAGREAH is a Burkinabè company producing agro-sylvo-pastoral and fish-farming products, based in Bagré, Burkina Faso. It develops integrated, sustainable and competitive production solutions to meet local, regional and international food needs, while enhancing the natural, human and economic resources of its territory. Through an integrated model combining agriculture, livestock farming, forestry and fish farming, the company aims to contribute to food security, local value creation and the development of competitive production chains. Tagline: \'Producing sustainably, feeding the future.\'', 'Produire, transformer et valoriser durablement les ressources agro-sylvo-pastorales et piscicoles à partir du potentiel de Bagré, afin d\'offrir aux marchés des produits de qualité, accessibles, traçables et compétitifs.', 'Produce, process and sustainably enhance agro-sylvo-pastoral and fish-farming resources from the potential of Bagré, in order to offer markets quality, accessible, traceable and competitive products.', 'Devenir un acteur de référence en Afrique dans la production agricole, sylvicole, pastorale et piscicole intégrée — durable, compétitive et capable de contribuer à la sécurité alimentaire, à la création de valeur locale et au rayonnement des produits africains sur les marchés internationaux (Horizon 2035).', 'Responsabilité · Qualité · Innovation · Intégrité · Performance durable · Ancrage local', 'Lignes métiers : BAGREAH Agriculture (productions végétales), BAGREAH Élevage (filière animale), BAGREAH Pisciculture (aquaculture), BAGREAH Sylvo (sylviculture & agroforesterie), BAGREAH Export (développement commercial international).', '/uploads/1787340181-194879.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Bagré', 18, 1, '2026-08-21 16:17:01', '2026-08-21 17:23:15', 'To become a reference player in Africa in integrated agricultural, forestry, pastoral and fish-farming production — sustainable, competitive and able to contribute to food security, local value creation and the international recognition of African products (2035 horizon).', 'Responsibility · Quality · Innovation · Integrity · Sustainable performance · Local roots', 'Business lines: BAGREAH Agriculture (crop production), BAGREAH Livestock, BAGREAH Fish Farming (aquaculture), BAGREAH Forestry (forestry & agroforestry), BAGREAH Export (international business development).'),
('barka-energies', 'BE', 'Barka Energies S.A.', 'Énergies et distribution', 'Energy & Distribution', 'energie', 'Burkina Faso', 'Barka Energies S.A. est une entreprise spécialisée dans la distribution de produits pétroliers et de solutions énergétiques au Burkina Faso. Forte du plus vaste réseau de stations-service du pays, avec près de 200 sites, elle accompagne les particuliers, les entreprises, les institutions et les acteurs industriels à travers une offre complète de carburants, lubrifiants et services associés. Positionnée comme une marque énergétique moderne, locale et accessible, Barka Energies place l\'innovation, la proximité et la qualité de service au cœur de son développement. Filiale de Excellis Invest Group, elle s\'appuie sur un fort ancrage territorial, une capacité d\'exécution reconnue et une ambition affirmée de contribuer durablement à l\'accès à l\'énergie tout en poursuivant son expansion à l\'échelle régionale.', 'Barka Energies S.A. is a company specialising in the distribution of petroleum products and energy solutions in Burkina Faso. With the country\'s largest service station network — nearly 200 sites — it serves individuals, businesses, institutions and industrial operators through a comprehensive offer of fuels, lubricants and associated services. Positioned as a modern, local and accessible energy brand, Barka Energies puts innovation, proximity and quality of service at the heart of its development. As a subsidiary of Excellis Invest Group, it draws on strong territorial roots, recognised operational capacity and a firm ambition to sustainably improve energy access while pursuing regional expansion.', 'Fournir des solutions énergétiques fiables, accessibles et de qualité, tout en améliorant le quotidien des populations et en accompagnant le développement économique du Burkina Faso.', 'Provide reliable, accessible and high-quality energy solutions, while improving people\'s daily lives and supporting the economic development of Burkina Faso.', 'Devenir une référence énergétique en Afrique de l\'Ouest en proposant des solutions modernes, durables et centrées sur les besoins des clients.', 'Proximité · Fiabilité · Innovation · Responsabilité · Engagement', 'Barka Energies incarne une nouvelle génération d\'acteur énergétique africain : un héritage solide (transition de TotalEnergies), une identité locale forte, une volonté affirmée d\'innovation et de modernisation de l\'expérience client, et une ambition d\'expansion régionale.', NULL, '/uploads/1779216582-429604.jpeg', 'https://www.barkaenergies.com', 'https://www.linkedin.com/company/barka-energies', 'https://www.facebook.com/BarkaEnergies', NULL, NULL, NULL, 'https://www.tiktok.com/@barkaenergies', NULL, '+226 25 32 50 00', 'contact@barkaenergies.com', NULL, 'Ouagadougou', 3, 1, '2026-05-29 15:59:54', '2026-06-25 08:11:53', 'Become an energy reference in West Africa by offering modern, sustainable solutions centred on customer needs.', 'Proximity · Reliability · Innovation · Responsibility · Commitment', 'Barka Energies embodies a new generation of African energy player: a solid heritage (TotalEnergies transition), a strong local identity, a clear drive for innovation and customer experience modernisation, and an ambition for regional expansion.'),
('coris-asset-management', 'CAM', 'Coris Asset Management', 'Services Financiers', 'Financial Services', 'services-financiers', 'Burkina Faso', 'Coris Asset Management (CAM) SA est une Société de Gestion d\'OPCVM (SGO) spécialisée dans la création et la gestion de Fonds Communs de Placement (FCP). Un FCP permet de mettre en commun son épargne avec d\'autres investisseurs pour investir dans un large éventail de titres (actions, obligations, bons du Trésor).', 'Coris Asset Management (CAM) SA is a Collective Investment Scheme Management Company (SGO) specialising in the creation and management of Mutual Funds (FCPs). An FCP pools savings with other investors to collectively invest across a broad range of securities (equities, bonds, treasury bills).', 'Promouvoir la culture boursière par une offre de services de qualité, diversifiés et adaptés à l\'endroit de nos clients.', 'Promote a savings and investment culture through quality, diversified and tailored service offerings for our clients.', 'Être le partenaire de référence au Burkina Faso.', 'Confiance · Réactivité · Excellence', 'Nos fonds communs de placement (FCP) :\n— FCP CORIS ACTIONS : actions cotées.\n— FCP CORIS PERFORMANCE : diversifié, actions et obligations.\n— FCP ASSURANCES : monétaire, obligations de courte durée.\n— FCP BARAKA INVEST : diversifié, conforme à la Finance Islamique.\n\nContacts téléphoniques : +226 25 33 42 00 · +226 58 64 29 64 · +226 58 13 36 23 · +226 79 87 45 46.', NULL, '/uploads/1778517510-365764.png', 'https://www.coris-asset.com', 'https://www.linkedin.com/company/coris.asset.management/', 'https://web.facebook.com/coris.asset?locale=fr_FR', NULL, NULL, NULL, NULL, NULL, '+226 25 33 42 00', 'info@coris-asset.com', NULL, 'Ouagadougou', 10, 1, '2026-05-29 15:59:54', '2026-07-09 06:00:05', 'Become the reference partner in Burkina Faso.', 'Trust · Responsiveness · Excellence', 'Our mutual funds (FCPs) :\n— FCP CORIS ACTIONS : listed equities.\n— FCP CORIS PERFORMANCE : diversified, equities and bonds.\n— FCP ASSURANCES : money market, short-term bonds.\n— FCP BARAKA INVEST : diversified, compliant with Islamic Finance.\n\nPhone contacts: +226 25 33 42 00 · +226 58 64 29 64 · +226 58 13 36 23 · +226 79 87 45 46.'),
('coris-assurance-iard-bf', 'CA', 'Coris Assurances SA', 'Assurance Non-Vie', 'Non-Life Insurance', 'assurance', 'Burkina Faso', 'Coris Assurances SA, filiale de Excellis Invest Group, est une compagnie d\'assurance non-vie au capital de 5 milliards FCFA, agréée sous le Code CIMA (Arrêté d\'agrément N° 2010/44/MEF/SG/DGTCP/DA). Créée en 2011, elle figure aujourd\'hui parmi les leaders du marché burkinabè, occupant la 3ᵉ place en chiffre d\'affaires. Certifiée ISO 9001:2015, elle propose une gamme complète de solutions d\'assurance destinées aux particuliers et aux entreprises : automobile, santé, incendie, transport, responsabilité civile, construction, caution et risques spéciaux. Son engagement en faveur de la qualité de service et de la satisfaction client en fait un partenaire de confiance pour de nombreuses organisations de référence.', 'Coris Assurances SA, a subsidiary of Excellis Invest Group, is a non-life insurance company with a capital of 5 billion FCFA, licensed under the CIMA Code (Approval Order No. 2010/44/MEF/SG/DGTCP/DA). Founded in 2011, it is now one of the leaders in the Burkinabè market, ranking 3rd in turnover. ISO 9001:2015 certified, it offers a comprehensive range of insurance solutions for individuals and businesses: motor, health, fire, transport, civil liability, construction, surety bonds and special risks. Its commitment to service quality and customer satisfaction makes it a trusted partner for many leading organisations.', 'Coris Assurances SA, société de référence offrant des produits et services accessibles, innovants et adaptés aux besoins de la population par une amélioration continue de la qualité de ses prestations assurées par des employés compétents et engagés.', 'Coris Assurances SA — a reference company offering accessible, innovative products and services tailored to the needs of the population through the continuous improvement of service quality, delivered by competent and committed employees.', 'Coris Assurances SA, société de référence à l\'horizon 2026.', 'Confiance · Originalité · Responsabilité · Intégrité · Sociabilité', 'Positionnements clés : 3ᵉ rang du marché en chiffre d\'affaires · 1ᵉʳ rang dans la branche automobile · 1ʳᵉ position attribuée par le Ministère des Finances en 2023.', NULL, '/uploads/1778518399-339145.png', 'https://www.coris-assurances.com', 'https://www.linkedin.com/company/coris-assurances', 'https://www.facebook.com/CorisAssurances', 'https://www.twitter.com/CorisAssurances', 'https://www.instagram.com/CorisAssurances', 'https://www.youtube.com/channel/UC_SFp8onoB2THVFwiLuWd7g', NULL, NULL, '+226 25 33 23 30', 'coris@coris-assurances.com', NULL, 'Ouagadougou', 5, 1, '2026-05-29 15:59:54', '2026-07-08 14:11:00', 'Coris Assurances SA — a reference company by 2026.', 'Trust · Originality · Responsibility · Integrity · Sociability', 'Key rankings: 3rd in market turnover · 1st in the motor insurance branch · 1st position awarded by the Ministry of Finance in 2023.'),
('coris-assurance-iard-ci', 'CI', 'Coris Assurance IARD CI', 'Assurance Non-Vie', 'Non-Life Insurance', 'assurance', 'Côte d\'Ivoire', 'Coris Assurances Côte d\'Ivoire est une SA de droit ivoirien au capital de cinq milliards de FCFA libérés intégralement. Elle s\'est imposée comme un assureur de référence proche de ses clients, mettant l\'accent sur l\'accessibilité des produits, la rapidité des prestations et l\'innovation continue. Slogan : « L\'Assureur qui rassure ».', 'Coris Assurances Côte d\'Ivoire is a joint-stock company under Ivorian law with a share capital of five billion FCFA fully paid up. It has established itself as a reference insurer close to its clients, focusing on product accessibility, speed of service and continuous innovation. Tagline: \'The Insurer that Reassures\'.', 'Offrir des produits et services accessibles, innovants et adaptés aux besoins de la population par une amélioration continue de la qualité des prestations assurées par des employés compétents et engagés.', 'Offer accessible, innovative products and services adapted to the needs of the population through continuous improvement of service quality delivered by competent and committed employees.', 'Être une société d\'assurance de référence, innovante et proche de ses clients.', 'Confiance · Originalité · Responsabilité · Intégrité · Sociabilité', NULL, NULL, '/uploads/1778518468-357970.png', NULL, 'https://www.linkedin.com/in/corisassurances-ci', 'https://web.facebook.com/corisassurancesciv/', NULL, 'https://www.instagram.com/corisassuranceci?fbclid=IwY2xjawT1nNBwZG9mAWV4dG4DYWVtAjEwAGJyaWQRMUk4T3lLNTJERVR4V2xmRlpzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEe-yq3g8On4RbcLIDtZ84JbKNDZ5JzZ9qAqszHZFgUQz4dkaJBxnoJvr1R2w0_aem_huBgLlt7qnFRcgXZo8FAwA', NULL, NULL, NULL, '+225 27 20 35 15 65', NULL, 'Boulevard de la République N°23, angle Avenue Marchand, Plateau — 01 BP 4690 Abidjan 01', 'Abidjan', 7, 1, '2026-05-29 15:59:54', '2026-08-21 19:05:56', 'To be a reference insurance company, innovative and close to its clients.', 'Trust · Originality · Responsibility · Integrity · Sociability', NULL),
('coris-assurance-vie-bf', 'CV', 'Coris Assurances Vie Burkina SA', 'Assurance Vie', 'Life Insurance', 'assurance', 'Burkina Faso', 'Coris Assurances Vie Burkina SA, filiale du groupe Excellis Invest Group, a été créée le 14 février 2014 et a obtenu son agrément de la Conférence Interafricaine des Marchés d\'Assurances (CIMA) le 17 août 2015. Née de la volonté d\'accompagner le développement du marché de l\'assurance vie au Burkina Faso, la compagnie conçoit et commercialise des solutions de prévoyance, d\'épargne et de capitalisation accessibles, innovantes et adaptées aux besoins des particuliers, des professionnels et des entreprises. Pionnière sur son marché, Coris Assurances Vie Burkina est la seule compagnie d\'assurance au Burkina Faso à proposer des solutions Takaful, conformes aux principes de la finance islamique. Cette offre répond aux attentes d\'une clientèle en quête d\'une protection financière éthique, transparente et fondée sur les principes de solidarité.', 'Coris Assurances Vie Burkina SA, a subsidiary of Excellis Invest Group, was created on 14 February 2014 and obtained its approval from the Inter-African Conference on Insurance Markets (CIMA) on 17 August 2015. Born from the will to support the development of the life insurance market in Burkina Faso, the company designs and markets accessible, innovative life protection, savings and capitalisation solutions tailored to the needs of individuals, professionals and businesses. A pioneer in its market, Coris Assurances Vie Burkina is the only insurance company in Burkina Faso to offer Takaful solutions, compliant with the principles of Islamic finance. This offer meets the expectations of a clientele seeking ethical, transparent financial protection founded on the principles of solidarity.', 'Offrir des produits et services accessibles, innovants et adaptés aux besoins de la population, avec une amélioration continue de la qualité des prestations, assurée par des employés compétents et engagés.', 'Offer accessible, innovative products and services adapted to the needs of the population, with continuous improvement of service quality, delivered by competent and committed employees.', 'Être la société d\'assurances vie de référence au Burkina Faso à l\'horizon 2026.', 'Confiance · Originalité · Responsabilité · Intégrité · Solidarité', 'Particularité : Première compagnie d\'assurance à lancer l\'assurance Takaful au Burkina Faso.', NULL, '/uploads/1778691910-688067.png', 'https://www.coris-assurances.com/coris-assurances-burkina-faso/', 'https://www.linkedin.com/company/coris-assurances-burkina-faso/', 'https://www.facebook.com/share/1aiCFKXono/', NULL, 'https://www.instagram.com/corisassurances', 'https://www.youtube.com/@corisassurances7631', 'https://www.tiktok.com/@corisassurances_bf', '+226 04 93 42 42', '+226 25 39 18 98', 'corisvie@coris-assurances.com', 'Avenue Loudun, Immeuble Coris Bourse, 01 BP 880 Ouagadougou 01', 'Ouagadougou', 6, 1, '2026-05-29 15:59:54', '2026-08-21 14:15:29', 'To be the reference life insurance company in Burkina Faso by 2026.', 'Trust · Originality · Responsibility · Integrity · Solidarity', 'Highlight: First insurance company to launch Takaful insurance in Burkina Faso.'),
('coris-assurance-vie-ci', 'CVI', 'Coris Assurance Vie Côte d\'Ivoire', 'Assurance Vie', 'Life Insurance', 'assurance', 'Côte d\'Ivoire', 'CORIS ASSURANCE VIE CÔTE D\'IVOIRE est une société anonyme de droit ivoirien avec Conseil d\'Administration, régie par le Code des assurances de la CIMA. Elle a été créée à l\'initiative du Groupe CORIS afin de compléter l\'offre de services financiers déjà déployée sur le marché ivoirien à travers sa filiale bancaire, CORIS BANK INTERNATIONAL CÔTE D\'IVOIRE, et de proposer une gamme complète de solutions d\'assurance vie répondant aux besoins des particuliers, des professionnels et des entreprises. Dotée d\'un capital social de 5 000 000 000 FCFA, la société a obtenu son agrément le 26 décembre 2024 pour exercer les opérations d\'assurance vie conformément à la réglementation de la CIMA.', 'CORIS ASSURANCE VIE CÔTE D\'IVOIRE is a joint-stock company under Ivorian law with a Board of Directors, governed by the CIMA Insurance Code. It was created on the initiative of the CORIS Group to complement the financial services offering already deployed on the Ivorian market through its banking subsidiary, CORIS BANK INTERNATIONAL CÔTE D\'IVOIRE, and to offer a complete range of life insurance solutions meeting the needs of individuals, professionals and businesses. With a share capital of 5,000,000,000 FCFA, the company obtained its approval on 26 December 2024 to conduct life insurance operations in accordance with CIMA regulations.', 'Coris Assurances Vie Côte d\'Ivoire, société de référence offrant des produits et services accessibles, innovants et adaptés aux besoins de la population avec une amélioration continue de la qualité de ses prestations assurées par des employés compétents et engagés.', 'Coris Assurances Vie Côte d\'Ivoire — a reference company offering accessible, innovative products and services tailored to the needs of the population, with continuous improvement of service quality delivered by competent and committed employees.', 'Être la société d\'assurance de référence, innovante et proche de ses clients.', 'Confiance · Originalité · Responsabilité · Intégrité · Solidarité', 'Engagements : offrir des solutions personnalisées répondant aux besoins spécifiques de la clientèle ; assurer une qualité de service exemplaire axée sur la réactivité et le professionnalisme ; promouvoir la culture de la prévention et de la sensibilisation aux risques. Agrément obtenu le 26 décembre 2024 pour les opérations d\'assurance vie (CIMA). Capital social : 5 000 000 000 FCFA.', NULL, '/uploads/1778518280-394199.png', NULL, 'https://www.linkedin.com/company/coris-assurances-cote-d-ivoire', 'https://www.facebook.com/CorisAssurancesCotedIvoire', NULL, NULL, NULL, NULL, '+225 07 78 68 58 58', '+225 27 20 33 15 65', 'corisvie-ci@coris-assurances.com', 'Boulevard de la République N°23, angle Avenue Marchand, Immeuble Coris Bank International Côte d\'Ivoire, Plateau — 01 BP 4690 Abidjan 01', 'Abidjan', 8, 1, '2026-05-29 15:59:54', '2026-07-20 11:50:13', 'To be the reference insurance company, innovative and close to its clients.', 'Trust · Originality · Responsibility · Integrity · Solidarity', 'Commitments: offer personalised solutions meeting the specific needs of clients; ensure exemplary service quality focused on responsiveness and professionalism; promote a culture of prevention and risk awareness. Approval obtained on 26 December 2024 for life insurance operations (CIMA). Share capital: 5,000,000,000 FCFA.'),
('coris-bourse', 'CB', 'Coris Bourse', 'Services Financiers', 'Financial Services', 'services-financiers', 'Burkina Faso', 'Société de Gestion et d\'Intermédiation (SGI) agréée par l\'AMF-UEMOA (SGI/2010-02) et créée en 2010, Coris Bourse accompagne les investisseurs dans leurs projets d\'investissement et les émetteurs dans leurs opérations de financement sur le Marché Financier Régional de l\'UEMOA. Elle propose des solutions adaptées aux besoins des investisseurs particuliers, des investisseurs institutionnels, des entreprises et des États, à travers l\'ouverture et la gestion de comptes-titres, l\'achat et la vente de valeurs mobilières, la gestion de portefeuille en gestion libre et en gestion sous mandat, la conservation de titres, le conseil en investissement, ainsi que l\'intermédiation lors des opérations de marché (introductions en bourse, augmentations de capital, émissions obligataires et autres appels publics à l\'épargne). Coris Bourse se distingue par son expertise des marchés financiers régionaux, la qualité de son accompagnement, son engagement en faveur de l\'innovation et sa volonté de rendre l\'investissement en bourse accessible au plus grand nombre.', 'A Securities Management and Intermediation Company (SGI) licensed by the WAMU Financial Market Authority (AMF-UEMOA) (SGI/2010-02) and founded in 2010, Coris Bourse supports investors in their investment projects and issuers in their financing operations on the WAEMU Regional Financial Market. It offers solutions tailored to the needs of individual and institutional investors, businesses and States, through the opening and management of securities accounts, the purchase and sale of securities, portfolio management (both discretionary and non-discretionary), custody of securities, investment advisory, and intermediation in market operations (IPOs, capital increases, bond issues and other public offerings). Coris Bourse stands out for its expertise in regional financial markets, the quality of its client support, its commitment to innovation, and its ambition to make stock market investment accessible to as many people as possible.', 'Chez Coris Bourse, nous avons une conviction profonde : la bourse appartient à tous. Notre mission est d\'ouvrir le marché financier à chaque investisseur avec simplicité, confiance et excellence.', 'At Coris Bourse, we hold a deep conviction: the stock market belongs to everyone. Our mission is to open the financial market to every investor with simplicity, trust and excellence.', 'Faire de Coris Bourse la SGI panafricaine leader sur le marché financier.', 'Excellence · Accessibilité · Confiance · Innovation · Intégrité', 'Particularité : Coris Bourse met l\'innovation au cœur de son accompagnement en proposant My Coris Bourse, une application mobile permettant aux investisseurs de consulter leur portefeuille, de suivre leurs avoirs et d\'accéder facilement aux services de la SGI. Certifiée ISO 9001:2015, Coris Bourse inscrit également la qualité de service, l\'amélioration continue et la satisfaction des investisseurs au cœur de son organisation.\n\nContacts complémentaires :\n— WhatsApp Investisseurs : +226 58 08 30 30\n\nAdresses et bureaux de liaison :\n— Siège social Burkina Faso : Immeuble Coris Bourse, Avenue Loudun, Rue 05, Ouagadougou — Tél. +226 25 33 14 85\n— Agence Bobo-Dioulasso : Coris Bank Prestige — Tél. +226 78 11 81 51\n— Côte d\'Ivoire : Agence CBI-CI Treichville, Avenue 16, Rue 38, Abidjan — Tél. +225 27 20 30 75 15\n— Togo : Immeuble Coris Bank Togo, Boulevard du 13 Janvier, Béniglato, Lomé — Tél. +228 22 20 82 82\n— Mali : Siège CBI Mali, Quartier du Fleuve, Boulevard du 22 Octobre, Bamako — Tél. +223 27 70 59 00\n\nSite internet sous réserve de confirmation dans le cadre de la refonte du site internet.', NULL, '/uploads/1778517545-779468.png', 'https://www.coris-bourse.com', 'https://www.linkedin.com/company/coris-bourse', 'https://www.facebook.com/CorisBourseSGI/', 'https://x.com/CorisBourse', NULL, NULL, NULL, '+22658083030', '+226 25 33 14 85', 'corisbourse@coris-bourse.com', 'Immeuble Coris Bourse, Avenue Loudun, Rue 05, Ouagadougou', 'Ouagadougou', 9, 1, '2026-05-29 15:59:54', '2026-07-08 14:11:04', 'Make Coris Bourse the leading pan-African SGI on the financial market.', 'Excellence · Accessibility · Trust · Innovation · Integrity', 'Highlight: Coris Bourse places innovation at the heart of its client support with My Coris Bourse, a mobile app allowing investors to view their portfolio, track their holdings and easily access SGI services. ISO 9001:2015 certified, Coris Bourse also places service quality, continuous improvement and investor satisfaction at the core of its organisation.\n\nAdditional contacts:\n— WhatsApp for Investors: +226 58 08 30 30\n\nOffices and liaison bureaus:\n— Head office Burkina Faso: Immeuble Coris Bourse, Avenue Loudun, Rue 05, Ouagadougou — Tel. +226 25 33 14 85\n— Bobo-Dioulasso branch: Coris Bank Prestige — Tel. +226 78 11 81 51\n— Côte d\'Ivoire: Agence CBI-CI Treichville, Avenue 16, Rue 38, Abidjan — Tel. +225 27 20 30 75 15\n— Togo: Immeuble Coris Bank Togo, Boulevard du 13 Janvier, Béniglato, Lomé — Tel. +228 22 20 82 82\n— Mali: Siège CBI Mali, Quartier du Fleuve, Boulevard du 22 Octobre, Bamako — Tel. +223 27 70 59 00\n\nWebsite pending confirmation as part of the website redesign.'),
('energytis', 'ET', 'Energytis', 'Énergies et distribution', NULL, 'energie', 'Burkina Faso', 'Spécialisée dans l\'étude, l\'ingénierie, le développement, le financement, la construction et l\'exploitation de sites de production d\'énergie.', 'Specialised in the study, engineering, development, financing, construction and operation of energy production sites.', 'Développer des projets d\'énergie renouvelable et conventionnelle pour répondre aux besoins croissants en électricité en Afrique.', 'Develop renewable and conventional energy projects to meet the growing electricity needs of Africa.', NULL, NULL, NULL, NULL, '/uploads/1778517426-881916.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Ouagadougou', 16, 1, '2026-05-29 15:59:54', '2026-05-29 15:59:54', NULL, NULL, NULL),
('excelis-in', 'EX', 'Excelis', 'Technologies financières et transformation numérique', 'Financial Technology & Digital Transformation', 'technologies-fintech', 'Burkina Faso', 'EXCELIS-SA est une entreprise burkinabè spécialisée dans les technologies financières et la transformation numérique. Créée en 2016 et basée à Ouagadougou, elle conçoit et déploie des solutions innovantes et sécurisées au profit des institutions financières, des entreprises et des administrations publiques.\n\nSon expertise couvre notamment la monétique, l\'émission et la personnalisation de cartes, les solutions de paiement, la fourniture et la maintenance de guichets automatiques bancaires, le développement de logiciels, l\'intégration de solutions technologiques et la formation. EXCELIS-SA propose également des plateformes dédiées à la microfinance, à la gestion des tontines, aux cartes pétrolières et à la messagerie professionnelle.\n\nAvec plus de 15 années d\'expertise revendiquées, plus de 800 000 cartes produites et une dizaine d\'établissements financiers accompagnés, EXCELIS-SA ambitionne de devenir un acteur de référence des services numériques et monétiques dans l\'espace UEMOA.', 'EXCELIS-SA is a Burkinabe company specialising in financial technology and digital transformation. Founded in 2016 and based in Ouagadougou, it designs and deploys innovative, secure solutions for financial institutions, businesses and public administrations.\n\nIts expertise notably covers electronic payments (monetics), card issuance and personalisation, payment solutions, the supply and maintenance of automated teller machines (ATMs), software development, technology integration and training. EXCELIS-SA also offers platforms dedicated to microfinance, tontine (savings group) management, fuel cards and professional messaging.\n\nWith over 15 years of claimed expertise, more than 800,000 cards produced and around ten financial institutions supported, EXCELIS-SA aims to become a benchmark player in digital and electronic payment services across the WAEMU (UEMOA) region.', 'Concevoir et déployer des solutions numériques innovantes et sécurisées au service des institutions financières, des entreprises et des administrations publiques.', 'Design and deploy innovative, secure digital solutions for financial institutions, businesses and public administrations.', 'Devenir un acteur de référence des services numériques et monétiques dans l\'espace UEMOA.', NULL, 'Chiffres clés : plus de 15 années d\'expertise, plus de 800 000 cartes produites, une dizaine d\'établissements financiers accompagnés.\nDomaines d\'activité : monétique, émission et personnalisation de cartes, solutions de paiement, fourniture et maintenance de GAB, développement logiciel, intégration de solutions technologiques, formation.\nPlateformes : microfinance, gestion des tontines, cartes pétrolières, messagerie professionnelle.', '/uploads/1778696595-756161.jpg', '/uploads/1778518000-702844.png', 'https://www.excelis-sa.com', 'https://bf.linkedin.com/company/excelis-sa', 'https://web.facebook.com/people/Excelis-SA/61571882944660/#', NULL, NULL, NULL, NULL, '+226 76 25 11 33', '+226 01 55 18 18', 'contact@excelis-sa.com', 'ZACA, Avenue de l\'UEMOA Baraka A Ouagadougou Burkina Faso', 'Ouagadougou', 0, 1, '2026-05-11 14:47:02', '2026-08-10 06:26:29', 'Become a benchmark player in digital and electronic payment services across the WAEMU (UEMOA) region.', NULL, 'Key figures: over 15 years of expertise, more than 800,000 cards produced, around ten financial institutions supported.\nAreas of activity: electronic payments, card issuance and personalisation, payment solutions, ATM supply and maintenance, software development, technology integration, training.\nPlatforms: microfinance, tontine management, fuel cards, professional messaging.'),
('expertis-bf', 'EXS', 'Expertis SA', 'Immobilier', 'Real Estate', 'immobilier-capital', 'Burkina Faso', 'EXPERTIS SA, également dénommée Agence de Sécurisation Financière et Immobilière, est une société anonyme de droit burkinabè dont le siège est sis à Ouagadougou sur l\'avenue Kwameh N\'Krumah. Depuis sa création, EXPERTIS SA s\'est construite autour d\'un positionnement unique dans l\'écosystème financier et immobilier du Burkina Faso grâce à des services innovants tels que la Tierce Détention, l\'Expertise Immobilière, la Promotion Immobilière, la Maîtrise d\'Ouvrage Déléguée et la Gestion Immobilière.', 'EXPERTIS SA, also known as the Financial and Real Estate Security Agency, is a public limited company under Burkina Faso law, headquartered in Ouagadougou on Avenue Kwameh N\'Krumah. Since its creation, EXPERTIS SA has built a unique positioning in Burkina Faso\'s financial and real estate ecosystem through innovative services such as Third-Party Custody, Real Estate Expertise, Real Estate Development, Delegated Project Management and Property Management.', 'Offrir des solutions immobilières innovantes et des prestations de sécurisation financières adaptées aux exigences de nos partenaires.', 'Provide innovative real estate solutions and financial security services tailored to our partners\' requirements.', 'EXPERTIS ambitionne, à l\'horizon 2028, de se positionner comme un promoteur immobilier de référence au Burkina Faso. Cette vision exprime la volonté de l\'entreprise de proposer des projets immobiliers alliant qualité, accessibilité, durabilité et innovation, tout en consolidant sa crédibilité auprès des partenaires techniques, financiers et institutionnels.', 'Expertise · Sociabilité · Originalité · Responsabilité', 'Slogan : EXPERTIS SA, LA DIFFÉRENCE PAR LA QUALITÉ ET LE PRIX !\nAutres contacts : 58 24 45 15 / 58 24 45 14', NULL, '/uploads/1778517580-545747.png', 'https://www.expertis-sa.com', NULL, 'https://www.facebook.com/ExpertisSA', 'https://x.com/expertis_sa', NULL, 'http://youtube.com/@expertissa4492', NULL, NULL, '+226 25 33 13 92', 'expertis@expertis-sa.com', 'Avenue Kwameh N\'Krumah', 'Ouagadougou', 11, 1, '2026-05-29 15:59:54', '2026-07-10 07:13:37', 'By 2028, EXPERTIS aims to establish itself as a leading real estate developer in Burkina Faso. This vision reflects the company\'s commitment to delivering real estate projects that combine quality, affordability, sustainability and innovation, while reinforcing its credibility with technical, financial and institutional partners.', 'Expertise · Sociability · Originality · Responsibility', 'Tagline: EXPERTIS SA, THE DIFFERENCE THROUGH QUALITY AND PRICE!\nAdditional contacts: +226 58 24 45 15 / +226 58 24 45 14'),
('expertis-ci', 'EXS', 'Expertis SA', 'Immobilier', 'Real Estate', 'immobilier-capital', 'Côte d\'Ivoire', 'EXPERTIS, Agence de Sécurisation Financière et Immobilière, est la filiale ivoirienne d\'EXPERTIS SA. Basée à Abidjan, elle accompagne particuliers, professionnels et institutions dans leurs projets immobiliers et leurs besoins de sécurisation financière, avec le même positionnement d\'expertise que l\'entité burkinabè.', 'EXPERTIS, the Financial and Real Estate Security Agency, is the Ivorian subsidiary of EXPERTIS SA. Based in Abidjan, it supports individuals, professionals and institutions with their real estate projects and financial security needs, sharing the same expertise-driven positioning as the Burkina Faso entity.', 'Offrir des solutions immobilières innovantes et des prestations de sécurisation financières adaptées aux exigences de nos partenaires.', 'Provide innovative real estate solutions and financial security services tailored to our partners\' requirements.', 'EXPERTIS ambitionne, à l\'horizon 2028, de se positionner comme un promoteur immobilier de référence au Burkina Faso. Cette vision exprime la volonté de l\'entreprise de proposer des projets immobiliers alliant qualité, accessibilité, durabilité et innovation, tout en consolidant sa crédibilité auprès des partenaires techniques, financiers et institutionnels.', 'Expertise · Sociabilité · Originalité · Responsabilité', 'Téléphone fixe : +225 25 21 00 99 26\nTéléphone mobile : +225 05 04 12 75 52', NULL, '/uploads/1778517817-921794.png', NULL, 'https://ci.linkedin.com/company/expertis-ci', NULL, NULL, NULL, NULL, NULL, '+225 05 04 12 75 52', '+225 25 21 00 99 26', NULL, 'Cocody, Deux Plateaux, Vallons — 01 BP 4690 Abidjan 01', 'Abidjan', 12, 1, '2026-05-29 15:59:54', '2026-08-21 13:59:39', 'By 2028, EXPERTIS aims to establish itself as a leading real estate developer in Burkina Faso. This vision reflects the company\'s commitment to delivering real estate projects that combine quality, affordability, sustainability and innovation, while reinforcing its credibility with technical, financial and institutional partners.', 'Expertise · Sociability · Originality · Responsibility', 'Landline: +225 25 21 00 99 26\nMobile: +225 05 04 12 75 52'),
('fortivah', 'FTV', 'FORTIVAH', 'Gestion déléguée d\'assurance santé', 'Delegated Health Insurance Management', 'assurance', 'Burkina Faso', 'FORTIVAH est une société de gestion déléguée de nouvelle génération, spécialiste de la gestion de l\'assurance santé. Elle propose aux assureurs, aux assurés et aux réseaux partenaires un modèle de prise en charge fondé sur la proximité, la réactivité, la maîtrise opérationnelle, la coordination nationale et internationale, et l\'innovation technologique — pour transformer des moments sensibles en expériences de service plus fluides, plus sûres et plus rassurantes. Signature : « Solidaire avec vous ».', 'FORTIVAH is a next-generation delegated management company specialising in health insurance administration. It offers insurers, policyholders and partner networks a care model built on proximity, responsiveness, operational excellence, national and international coordination, and technological innovation — turning sensitive moments into smoother, safer and more reassuring service experiences. Tagline: \'Standing with you.\'', 'Faire de la prise en charge un véritable service de confiance : rapprocher les assurés de la solution, accélérer les traitements et piloter les parcours avec rigueur, proximité et intelligence.', 'Turn coverage into a genuine trusted service: bring policyholders closer to the solution, speed up processing, and manage healthcare journeys with rigour, proximity and intelligence.', 'Devenir la référence de la gestion déléguée en assurance santé en Afrique de l\'Ouest, en imposant un standard supérieur de proximité, de célérité, de lisibilité et d\'innovation dans la prise en charge des parcours de soins.', 'Fiabilité · Rigueur · Humanité · Réactivité · Responsabilité', 'Société de gestion déléguée spécialiste de l\'assurance santé, intervenant pour le compte d\'assureurs, de mutuelles et d\'organismes de couverture au Burkina Faso, dans le cadre notamment du Régime d\'Assurance Maladie Universelle (RAMU).', '/uploads/1787336150-928588.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Ouagadougou', 19, 1, '2026-08-21 16:17:13', '2026-08-21 16:17:13', 'To become the benchmark for delegated health insurance management in West Africa, setting a higher standard of proximity, speed, transparency and innovation in the management of care journeys.', 'Reliability · Rigour · Humanity · Responsiveness · Accountability', 'A delegated management company specialising in health insurance, acting on behalf of insurers, mutual funds and coverage organisations in Burkina Faso, notably within the framework of the Universal Health Insurance Scheme (RAMU).'),
('general-mining-logistics', 'GML', 'General Mining Logistics SA', 'Transport et logistique', 'Transport & Logistics', 'logistique-miniere', 'Burkina Faso', 'Acteur majeur du transport et de la logistique au Burkina Faso et à l\'international, GML, filiale d\'Excellis Invest Group, accompagne ses partenaires dans leurs opérations d\'exportation et d\'approvisionnement en matières premières, en privilégiant la transparence, le respect des engagements et la conformité aux réglementations en vigueur. Le respect de nos clients, de nos collaborateurs et de l\'environnement constitue le socle de nos valeurs. Cette exigence nous permet de préserver notre crédibilité, de bâtir des relations durables de confiance et de poursuivre notre développement sur les marchés internationaux.\n\nGML, votre partenaire de confiance pour des solutions de transport et de logistique performantes et responsables.', 'A major player in transport and logistics in Burkina Faso and internationally, GML, a subsidiary of Excellis Invest Group, supports its partners in their export and raw material supply operations, favouring transparency, respect for commitments and compliance with applicable regulations. Respect for our clients, our staff and the environment is the foundation of our values. This requirement allows us to preserve our credibility, build lasting relationships of trust and pursue our development in international markets.\n\nGML, your trusted partner for high-performing and responsible transport and logistics solutions.', 'Assurer des solutions logistiques fiables et sécurisées pour les industries minières et extractives en Afrique.', 'Provide reliable and secure logistics solutions for mining and extractive industries in Africa.', NULL, 'Constance et discipline · Responsabilité · Excellence du service client', 'Nos atouts :\n— Flottes et équipement minier moderne.\n— Une jeune équipe compétente et professionnelle.\n— Appartenance à un groupe.\n\nSlogan : GML, your logistics partner.', NULL, '/uploads/1778517403-216587.png', 'https://www.gml-sa.com', NULL, NULL, NULL, NULL, NULL, NULL, '+226 70 20 69 97', '+226 68 99 70 70', 'scombary@gml-sa.com', NULL, 'Ouagadougou', 17, 1, '2026-05-29 15:59:54', '2026-07-08 14:07:49', NULL, 'Consistency and discipline · Responsibility · Customer service excellence', 'Our strengths:\n— Modern mining fleets and equipment.\n— A young, competent and professional team.\n— Belonging to a group.\n\nTagline: GML, your logistics partner.'),
('industries-arts-graphiques', 'IAG', 'Industries des Arts Graphiques', 'Services Financiers', 'Financial Services', 'services-financiers', 'Burkina Faso', 'Spécialisée dans l\'imprimerie, la conception graphique, la signalétique et la sécurisation de documents sensibles, tels que les timbres, diplômes et attestations automobiles.', 'Specialised in printing, graphic design, signage and security printing for sensitive documents such as stamps, diplomas and vehicle certificates.', 'Fournir des solutions graphiques et d\'imprimerie de haute qualité, notamment pour la sécurisation documentaire des institutions publiques et privées.', 'Provide high-quality graphic and printing solutions, particularly for document security for public and private institutions.', NULL, NULL, NULL, '/uploads/1787340010-771985.jpg', '/uploads/1778518108-992125.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Ouagadougou', 14, 1, '2026-05-29 15:59:54', '2026-08-21 17:20:33', NULL, NULL, NULL),
('intermediaire-des-services', 'IDS', 'Intermédiaire Des Services', 'Services Financiers', 'Financial Services', 'services-financiers', 'Burkina Faso', 'L\'Intermédiaire Des Services (IDS) a été créée en janvier 2018. Agréée par la BCEAO sous le numéro N° BK 00001/IOB/2018, elle intervient dans tous les pays de l\'espace UMOA. IDS est spécialisée dans le Conseil Financier et l\'Intermédiation en Opérations de Banque (IOB). Son capital social est de cent millions (100 000 000) de FCFA.', 'Intermédiaire Des Services (IDS) was created in January 2018. Licensed by the BCEAO under N° BK 00001/IOB/2018, it operates across all UMOA countries. IDS specialises in Financial Advisory and Banking Operations Intermediation (IOB). Share capital: 100 million FCFA.', 'IDS est spécialisé dans le Conseil Financier et dans l\'Intermédiation en Opérations de Banque (IOB). Ses services comprennent : la négociation et le placement de dépôts, le financement syndiqué, les opérations interbancaires, les opérations internationales, le rachat de crédits, la restructuration de dettes, les financements structurés et l\'ingénierie financière des projets PPP.', 'IDS specialises in Financial Advisory and Banking Operations Intermediation (IOB). Services include: deposit placement with banks, syndicated financing, interbank operations, international operations, debt restructuring, structured financing, and PPP financial engineering.', 'Consolider notre activité d\'Intermédiation en Opérations de Banque à travers l\'ouverture de Bureaux de Liaison dans les pays suivants : Bénin, Côte d\'Ivoire, Sénégal et Togo.', 'Réactivité · Excellence · Confiance · Discrétion', NULL, NULL, '/uploads/1778517180-553271.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Secteur 09, Parcelle P1/2 Lot 146', 'Ouagadougou', 1, 1, '2026-05-29 15:59:54', '2026-08-21 17:23:11', 'Consolidate our Banking Operations Intermediation activity through the opening of Liaison Offices in the following countries: Benin, Ivory Coast, Senegal and Togo.', 'Responsiveness · Excellence · Trust · Discretion', NULL),
('loans-recovery-company', 'LRC', 'Loans Recovery Company', 'Services Financiers', 'Debt Recovery & Financial Asset Purchase', 'services-financiers', 'Burkina Faso', 'L\'expertise au service de vos actifs financiers. Spécialiste du recouvrement et du rachat des actifs financiers, LRC transforme vos créances en performance  avec rigueur, éthique et respect de vos relations d\'affaires.\n\nLoans Recovery Company (LRC), filiale du Groupe Excellis Invest Group, est une société spécialisée dans le recouvrement et le rachat des actifs financiers. Elle apporte aux institutions financières, aux entreprises et aux investisseurs des solutions stratégiques pour optimiser, valoriser et sécuriser leurs actifs, portées par une équipe pluridisciplinaire cumulant de nombreuses années d\'expertise en finance, droit et gestion du risque.', 'Expertise at the service of your financial assets. A specialist in debt recovery and the purchase of financial assets, LRC turns your receivables into performance with rigour, ethics and respect for your business relationships.\n\nLoans Recovery Company (LRC), a subsidiary of Excellis Invest Group, is a company specialising in the recovery and purchase of financial assets. It provides financial institutions, businesses and investors with strategic solutions to optimise, enhance and secure their assets, backed by a multidisciplinary team with many years of expertise in finance, law and risk management.', 'Offrir une seconde vie aux actifs financiers, par des solutions innovantes de rachat, de recouvrement et de restructuration de créances, garantissant une meilleure liquidité et une réduction maîtrisée des risques.', 'Give financial assets a second life through innovative debt purchase, recovery and restructuring solutions, ensuring improved liquidity and controlled risk reduction.', 'Devenir le partenaire de référence de la gestion et de la restructuration des créances dans l\'espace UEMOA, en contribuant à la stabilité financière et à un environnement économique sain et durable.', 'Labeur · Rigueur · Créativité', 'Nos activités :\n— Rachat de créances : convertir vos créances commerciales en trésorerie immédiate (avec ou sans recours) et assainir vos portefeuilles clients.\n— Recouvrement de créances : un processus gradué  amiable, précontentieux et judiciaire alliant fermeté, diplomatie et conformité.\n— Conseil & optimisation des actifs : diagnostic du DSO et du BFR, tableaux de bord et stratégies d\'optimisation de la performance financière.\n— Gestion & restructuration pour tiers : mandataire spécialisé en gestion déléguée, restructuration et valorisation de portefeuilles d\'actifs.\n\nInformations légales : Société Anonyme à Conseil d\'Administration, capital social de 500 000 000 FCFA, à Ouagadougou depuis 2023. RCCM : BF OUA 01 2023 B14 15923 · IFU : 00220175F.', NULL, '/uploads/1778516960-431720.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '+226 25 33 50 65', NULL, 'ZACA, Avenue de l\'UEMOA, immeuble parcelle N°10, lot 20, section 006 — 01 BP 6092 Ouagadougou 01', 'Ouagadougou', 2, 1, '2026-05-29 15:59:54', '2026-08-21 17:23:34', 'Become the reference partner for debt management and restructuring in the UEMOA region, contributing to financial stability and a sound, sustainable economic environment.', 'Labour · Rigour · Creativity', 'Our activities:\n— Debt purchase: convert your trade receivables into immediate cash (with or without recourse) and clean up your customer portfolios.\n— Debt recovery: a graduated process  amicable, pre-litigation and judicial  combining firmness, diplomacy and compliance.\n— Advisory & asset optimisation: DSO and working capital diagnostics, dashboards and financial performance optimisation strategies.\n— Third-party management & restructuring: specialised agent for delegated management, restructuring and valuation of asset portfolios.\n\nLegal information: Public limited company with a Board of Directors, share capital of 500,000,000 FCFA, based in Ouagadougou since 2023. RCCM: BF OUA 01 2023 B14 15923 · Tax ID: 00220175F.');
INSERT INTO `filiales` (`id`, `sigle`, `nom`, `secteur`, `secteur_en`, `secteur_slug`, `pays`, `description`, `description_en`, `mission`, `mission_en`, `vision`, `valeurs`, `commentaires`, `logo`, `image`, `website`, `linkedin`, `facebook`, `twitter`, `instagram`, `youtube`, `tiktok`, `whatsapp`, `telephone`, `email_contact`, `adresse`, `ville`, `ordre`, `actif`, `created_at`, `updated_at`, `vision_en`, `valeurs_en`, `commentaires_en`) VALUES
('sopatel-silmande', 'SS', 'Sopatel Silmandé', 'Hôtellerie & Restauration', 'Hospitality & Catering', 'hotellerie', 'Burkina Faso', 'Situé à 15 mn de l\'aéroport international de Ouagadougou, Sopatel Silmandé, établissement 4 étoiles classé hôtel vert, est le cadre idéal pour les séjours d\'affaires. L\'hôtel dispose de 170 chambres entièrement rénovées, 10 salles de réunions, 2 bars, 2 restaurants, une grande piscine, une salle de fitness, 2 courts de tennis et 2 grands parkings.', 'Located 15 minutes from Ouagadougou International Airport, Sopatel Silmandé is a 4-star green-certified hotel  the ideal venue for business stays. The hotel features 170 fully renovated rooms, 10 meeting rooms, 2 bars, 2 restaurants, a large swimming pool, a fitness centre, 2 tennis courts and 2 large car parks.', 'Fournir des services d\'hébergement et de restauration de qualité supérieure à ses hôtes en mettant l\'accent sur l\'expérience client.', 'Provide superior accommodation and catering services to guests with a focus on exceptional customer experience.', 'Demeurer le leader de l\'hôtellerie d\'affaires au Burkina Faso.', 'Hospitalité · Authenticité · Écoute · Innovation · Intégrité · Hygiène et propreté · Amélioration continue des compétences', 'Distinctions & Récompenses : Prix National de l\'Entrepreneur Touristique 3ème édition — Hôtel Vert · REPAB 2022 : Prix du Meilleur Hôtel · SITHO-VITHRO 2023 : Meilleur Valet de Chambre · SITHO 2024 : Meilleur Garçon de café et Meilleur Valet de chambre · Attestation de reconnaissance du CNRST/INSS à l\'occasion des Journées des Communautés en 2025 · Attestation de reconnaissance du CIGAF (Carrefour International de la Gastronomie du Faso).', NULL, '/uploads/1778672508-236196.png', 'https://sopatelsilmande.com/', 'https://bf.linkedin.com/company/sopatel-silmande-sa', 'https://www.facebook.com/sopatelsilmandeouagadougou/?locale=fr_FR', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Ouagadougou', 4, 1, '2026-05-29 15:59:54', '2026-08-21 17:25:47', 'Remain the leader in business hospitality in Burkina Faso.', 'Hospitality · Authenticity · Listening · Innovation · Integrity · Hygiene and cleanliness · Continuous skills improvement', 'Distinctions & Awards: National Tourist Entrepreneur Award 3rd edition — Green Hotel · REPAB 2022: Best Hotel Award · SITHO-VITHRO 2023: Best Room Attendant · SITHO 2024: Best Café Waiter and Best Room Attendant · Certificate of Recognition from CNRST/INSS at the Communities Days 2025 · Certificate of Recognition from CIGAF (International Crossroads of Burkinabè Gastronomy).');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` smallint(5) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Metier`
--

CREATE TABLE `Metier` (
  `id` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `titre` varchar(191) NOT NULL,
  `icone` varchar(191) NOT NULL,
  `couleur` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `enjeux` text NOT NULL,
  `contribution` text NOT NULL,
  `filialesIds` text NOT NULL,
  `ordre` int(11) NOT NULL DEFAULT 0,
  `actif` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Metier`
--

INSERT INTO `Metier` (`id`, `slug`, `titre`, `icone`, `couleur`, `description`, `enjeux`, `contribution`, `filialesIds`, `ordre`, `actif`, `createdAt`, `updatedAt`) VALUES
('cmon2ugd10001rqbl7npcp857', 'services-financiers', 'Services Financiers & Intermédiation', 'briefcase', 'linear-gradient(135deg, #1A6B7A, #0F4855)', 'Intermédiation bancaire, structuration financière, recouvrement et gestion de créances.', 'Dans une économie africaine en forte croissance, l\'accès au financement et la gestion saine des créances constituent des piliers de la stabilité financière.', 'EIG positionne ses filiales financières comme des facilitateurs clés pour les entreprises et institutions locales.', '[\"intermediaire-des-services\",\"loans-recovery-company\"]', 1, 1, '2026-05-01 15:38:08.342', '2026-05-01 15:38:08.342'),
('cmon2ugdb0002rqblhhk6w2p4', 'assurance', 'Assurance', 'shield-halved', 'linear-gradient(135deg, #2A6B4A, #1A4A32)', 'Assurance vie et non-vie au Burkina Faso et en Côte d\'Ivoire, régulées CIMA.', 'La protection des personnes et des biens est un levier essentiel de résilience économique.', 'Avec 4 entités d\'assurance vie et non-vie dans 2 pays, EIG couvre un spectre complet de la protection financière régionale.', '[\"coris-assurance-iard-bf\",\"coris-assurance-vie-bf\",\"coris-assurance-iard-ci\",\"coris-assurance-vie-ci\"]', 2, 1, '2026-05-01 15:38:08.352', '2026-05-01 15:38:08.352'),
('cmon2ugdm0003rqbl49sg0soa', 'marches-financiers', 'Marchés Financiers & Gestion d\'Actifs', 'chart-line', 'linear-gradient(135deg, #6B2A6B, #4A1A4A)', 'Bourse, gestion d\'OPCVM, comptes-titres et gestion sous mandat sur la BRVM.', 'Le développement des marchés financiers africains est indispensable pour mobiliser l\'épargne locale au service de l\'investissement.', 'EIG intervient sur la BRVM via deux entités spécialisées.', '[\"coris-bourse\",\"coris-asset-management\"]', 3, 1, '2026-05-01 15:38:08.362', '2026-05-01 15:38:08.362'),
('cmon2ugdu0004rqblavw1uhve', 'immobilier-capital', 'Immobilier & Capital-Risque', 'building', 'linear-gradient(135deg, #6B4A1A, #4A3010)', 'Promotion immobilière, maîtrise d\'ouvrage déléguée, tierce détention et capital-risque.', 'Le déficit de logements et d\'infrastructures en Afrique de l\'Ouest représente à la fois un défi social et une opportunité d\'investissement.', 'EIG accompagne les maîtres d\'ouvrage publics et privés tout en prenant des participations dans des projets à fort potentiel.', '[\"expertis-bf\",\"expertis-ci\"]', 4, 1, '2026-05-01 15:38:08.370', '2026-05-01 15:38:08.370'),
('cmon2uge10005rqblithsliwi', 'energie', 'Énergie', 'bolt', 'linear-gradient(135deg, #1A4A6B, #102A4A)', 'Distribution de produits pétroliers, solutions solaires et ingénierie de production d\'énergie.', 'L\'accès à l\'énergie est un défi majeur en Afrique subsaharienne.', 'EIG s\'engage dans toute la chaîne de valeur énergétique, de la distribution traditionnelle aux nouvelles énergies renouvelables.', '[\"barka-energies\",\"energytis\"]', 5, 1, '2026-05-01 15:38:08.377', '2026-05-01 15:38:08.377'),
('cmon2uge90006rqbl6mm8mrxc', 'technologies-fintech', 'Technologies & Fintech', 'microchip', 'linear-gradient(135deg, #4A1A2A, #3A1020)', 'Solutions numériques, digitalisation, monétique, paiement digital et services financiers digitaux.', 'La révolution numérique transforme l\'accès aux services financiers.', 'Excellis, la fintech du groupe, développe des solutions digitales innovantes.', '[\"Excellis\"]', 6, 1, '2026-05-01 15:38:08.385', '2026-05-01 15:38:08.385'),
('cmon2ugeg0007rqbl83101a3r', 'industrie', 'Industrie & Arts Graphiques', 'print', 'linear-gradient(135deg, #2A4A1A, #1A3010)', 'Imprimerie, signalétique, conception graphique et sécurisation de documents sensibles.', 'La sécurisation des documents officiels est un besoin croissant dans la région.', 'EIG contribue à la sécurisation documentaire de l\'État et des institutions.', '[\"industries-arts-graphiques\"]', 7, 1, '2026-05-01 15:38:08.393', '2026-05-01 15:38:08.393'),
('cmon2ugen0008rqblezkfev3o', 'logistique-miniere', 'Transport & Logistique Minière', 'truck', 'linear-gradient(135deg, #4A3A1A, #3A2A10)', 'Logistique, transport d\'agrégats miniers et services opérationnels pour les industries extractives.', 'L\'industrie minière burkinabè est un secteur clé de l\'économie nationale.', 'General Mining Logistics TS offre des services logistiques de qualité aux opérateurs miniers.', '[\"general-mining-logistics\"]', 8, 1, '2026-05-01 15:38:08.400', '2026-05-01 15:38:08.400'),
('cmon2ugev0009rqbld8ip1z18', 'hotellerie', 'Hôtellerie & Restauration', 'hotel', 'linear-gradient(135deg, #1A2A6B, #101A4A)', 'Hébergement haut de gamme, restauration et services d\'accueil à Ouagadougou.', 'Le développement économique génère des besoins croissants en infrastructures d\'accueil.', 'Sopatel Silmandé est une référence hôtelière à Ouagadougou.', '[\"sopatel-silmande\"]', 9, 1, '2026-05-01 15:38:08.407', '2026-05-01 15:38:08.407');

-- --------------------------------------------------------

--
-- Table structure for table `metiers`
--

CREATE TABLE `metiers` (
  `id` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `titre_en` varchar(255) DEFAULT NULL,
  `icone` varchar(255) NOT NULL,
  `couleur` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `description_en` text DEFAULT NULL,
  `enjeux` text NOT NULL,
  `enjeux_en` text DEFAULT NULL,
  `contribution` text NOT NULL,
  `contribution_en` text DEFAULT NULL,
  `filiales_ids` text NOT NULL,
  `ordre` int(11) NOT NULL DEFAULT 0,
  `actif` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `metiers`
--

INSERT INTO `metiers` (`id`, `slug`, `titre`, `titre_en`, `icone`, `couleur`, `image`, `description`, `description_en`, `enjeux`, `enjeux_en`, `contribution`, `contribution_en`, `filiales_ids`, `ordre`, `actif`, `created_at`, `updated_at`) VALUES
('3byz9n9jHdMWVare0ptIwAQYd', 'energie', 'Énergies & Distribution', 'Energy & Distribution', 'bolt', 'linear-gradient(135deg, #1A4A6B, #102A4A)', '/uploads/1778514138-802056.png', 'Distribution de produits pétroliers, solutions solaires et ingénierie de production d\'énergie.', 'Petroleum product distribution, solar solutions and energy production engineering.', 'L\'accès à l\'énergie est un défi majeur en Afrique subsaharienne. La transition énergétique offre un champ d\'opportunités considérable.', 'Access to energy is a major challenge in sub-Saharan Africa. The energy transition offers a considerable field of opportunities.', 'EIG s\'engage dans toute la chaîne de valeur énergétique, de la distribution traditionnelle aux nouvelles énergies renouvelables.', 'EIG is committed across the entire energy value chain, from traditional distribution to new renewable energies.', '[\"barka-energies\",\"energytis\"]', 4, 1, '2026-05-29 15:59:54', '2026-06-02 14:31:35'),
('7JyF2wWSI7PdxfAuFX1Pj8EAs', 'logistique-miniere', 'Transport et Logistiques, minières et industrielles', 'Petroleum Distribution, Engineering Production', 'truck', 'linear-gradient(135deg, #4A3A1A, #3A2A10)', '/uploads/1778514343-422620.png', 'Logistique, transport d\'agrégats miniers et services opérationnels pour les industries extractives.', 'Logistics, transport of mining aggregates and operational services for extractive industries.', 'L\'industrie minière burkinabè est un secteur clé de l\'économie nationale, nécessitant des prestataires logistiques fiables et spécialisés.', 'The Burkinabe mining industry is a key sector of the national economy, requiring reliable and specialised logistics providers.', 'General Mining Logistics TS offre des services logistiques de qualité aux opérateurs miniers, soutenant la chaîne de valeur extractive nationale.', 'General Mining Logistics TS provides quality logistics services to mining operators, supporting the national extractive value chain.', '[\"general-mining-logistics\"]', 8, 1, '2026-05-29 15:59:55', '2026-06-02 14:32:44'),
('AFRGDKZm8B2KDiBFcNDaMG1mx', 'immobilier-capital', 'Immobilier', 'Real Estate', 'building', 'linear-gradient(135deg, #6B4A1A, #4A3010)', '/uploads/1778514107-130812.png', 'Promotion immobilière, maîtrise d\'ouvrage déléguée et tierce détention.', 'Property development, delegated project ownership and third-party custody.', 'Le déficit de logements et d\'infrastructures en Afrique représente à la fois un défi social et une opportunité d\'investissement structurante.', 'The housing and infrastructure deficit in Africa represents both a social challenge and a structuring investment opportunity.', 'EIG accompagne les maîtres d\'ouvrage publics et privés tout en prenant des participations dans des projets à fort potentiel de création de valeur.', 'EIG supports public and private project owners while taking stakes in projects with strong value-creation potential.', '[\"expertis-bf\",\"expertis-ci\"]', 3, 1, '2026-05-29 15:59:54', '2026-05-29 15:59:54'),
('hWnRdT2Q8L7cixf0bT94z9TC8', 'assurance', 'Assurance', 'Insurance', 'shield-halved', 'linear-gradient(135deg, #2A6B4A, #1A4A32)', '/uploads/1778514075-827064.png', 'Assurances vie et non vie.', 'Life and non-life insurance.', 'La protection des personnes et des biens est un levier essentiel de résilience économique pour les ménages et les entreprises.', 'Protection of people and assets is an essential lever for economic resilience for households and businesses.', 'Avec 4 entités d\'assurance vie et non-vie dans 2 pays, EIG couvre un spectre complet de la protection financière régionale.', 'With 4 life and non-life insurance entities across 2 countries, EIG covers a comprehensive spectrum of regional financial protection.', '[\"coris-assurance-iard-bf\",\"coris-assurance-vie-bf\",\"coris-assurance-iard-ci\",\"coris-assurance-vie-ci\"]', 2, 1, '2026-05-29 15:59:54', '2026-05-29 15:59:54'),
('SeHG9n6GLbPD7ot1sSwfJhbaf', 'services-financiers', 'Services Financiers', 'Financial Services', 'briefcase', 'linear-gradient(135deg, #1A6B7A, #0F4855)', '/uploads/1778514053-443567.png', 'Intermédiation bancaire, structuration financière, recouvrement, gestion de créances, bourse et gestion d\'actifs.', 'Banking intermediation, financial structuring, debt recovery, asset management, stock brokerage and collective investment funds.', 'Dans une économie africaine en forte croissance, l\'accès au financement et la gestion saine des créances constituent des piliers de la stabilité financière.', 'In a fast-growing African economy, access to financing and sound management of receivables are pillars of financial stability.', 'EIG positionne ses filiales financières comme des facilitateurs clés pour les entreprises et institutions locales, couvrant l\'intermédiation bancaire jusqu\'aux marchés financiers.', 'EIG positions its financial subsidiaries as key facilitators for local companies and institutions, covering banking intermediation through to capital markets.', '[\"intermediaire-des-services\",\"loans-recovery-company\",\"coris-bourse\",\"coris-asset-management\"]', 1, 1, '2026-05-29 15:59:54', '2026-08-13 09:21:34'),
('T68uQIQBnoG39tCStKwgipNJu', 'agribusiness', 'Agribusiness', 'Agribusiness', 'leaf', 'linear-gradient(135deg, #3A5A1A, #2A4010)', '/uploads/1780465440-803122.png', 'Développement de chaînes de valeur durables dans les secteurs agricole, pastoral, forestier et halieutique.', 'Development of sustainable value chains in the agricultural, pastoral, forestry and fisheries sectors.', 'L\'agriculture est le moteur de l\'économie africaine. Le développement de filières structurées est un levier essentiel de souveraineté alimentaire.', 'Agriculture is the engine of the African economy. The development of structured value chains is an essential lever for food sovereignty.', 'EIG développe sa présence dans l\'agribusiness pour accompagner la transformation des filières agricoles africaines.', 'EIG is developing its presence in agribusiness to support the transformation of African agricultural value chains.', '[]', 7, 1, '2026-05-29 15:59:54', '2026-06-03 03:44:06'),
('vBYyFBcXlpXAYzBBaHNVFplLL', 'hotellerie', 'Hôtellerie & Restauration', 'Hospitality & Catering', 'hotel', 'linear-gradient(135deg, #1A2A6B, #101A4A)', '/uploads/1778514417-361569.png', 'Hébergement haut de gamme, restauration et services d\'accueil.', 'Premium accommodation, catering and hospitality services.', 'Le développement économique génère des besoins croissants en infrastructures d\'accueil pour les hommes d\'affaires et les touristes.', 'Economic development generates growing demand for accommodation infrastructure for business travellers and tourists.', 'Sopatel Silmandé est une référence hôtelière, symbolisant l\'ancrage territorial et le rayonnement d\'EIG.', 'Sopatel Silmandé is a hospitality reference, symbolising EIG\'s territorial presence and influence.', '[\"sopatel-silmande\"]', 9, 1, '2026-05-29 15:59:55', '2026-05-29 15:59:55'),
('x3Ad13BQ3xEa4Ha6irdQ8VkGt', 'industrie', 'Industries', 'Industries', 'print', 'linear-gradient(135deg, #2A4A1A, #1A3010)', '/uploads/1780465127-258816.png', 'Production et transformation de matières premières', 'Production and  transforming', 'La sécurisation des documents officiels et la production de supports de communication de qualité sont des besoins croissants dans la région.', 'The security of official documents and the production of quality communication materials are growing needs in the region.', 'EIG contribue à la sécurisation documentaire de l\'État et des institutions à travers une filiale spécialisée et reconnue.', 'EIG contributes to document security for the State and institutions through a specialised and recognised subsidiary.', '[\"industries-arts-graphiques\"]', 6, 1, '2026-05-29 15:59:54', '2026-06-03 03:38:56'),
('X8WiQQsZeaSvowIVc1m9tEd6R', 'technologies-fintech', 'Technologies & Fintech', 'Digital Solutions and Digital Financial Services', 'microchip', 'linear-gradient(135deg, #4A1A2A, #3A1020)', '/uploads/1778514185-787885.png', 'Solutions numériques et services financiers digitaux', 'Digital solutions and digital financial services', 'La révolution numérique transforme l\'accès aux services financiers et offre des opportunités d\'inclusion économique sans précédent.', 'The digital revolution is transforming access to financial services and offering unprecedented economic inclusion opportunities.', 'Excelis, la fintech du groupe, développe des solutions digitales innovantes au service de la modernisation du secteur financier africain.', 'Excelis, the group\'s fintech subsidiary, develops innovative digital solutions to modernise the African financial sector.', '[\"excelis\"]', 5, 1, '2026-05-29 15:59:54', '2026-06-02 13:49:19');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_05_02_105549_create_admin_users_table', 1),
(5, '2026_05_02_105550_create_articles_table', 1),
(6, '2026_05_02_105550_create_dirigeants_table', 1),
(7, '2026_05_02_105550_create_filiales_table', 1),
(8, '2026_05_02_105550_create_metiers_table', 1),
(9, '2026_05_02_105551_create_carrieres_table', 1),
(10, '2026_05_02_105551_create_company_infos_table', 1),
(11, '2026_05_02_105551_create_contact_messages_table', 1),
(12, '2026_05_02_105552_create_site_images_table', 1),
(13, '2026_05_04_000000_create_candidatures_table', 2),
(14, '2026_05_04_000001_create_newsletter_subscribers_table', 2),
(15, '2026_05_04_000002_add_en_fields', 2),
(16, '2026_05_05_000001_add_website_to_filiales', 3),
(17, '2026_05_05_000002_add_traite_to_contact_messages', 3),
(18, '2026_05_06_000001_add_image_to_metiers', 3),
(19, '2026_05_06_000002_add_fields_to_filiales', 3),
(20, '2026_05_07_000001_add_vision_valeurs_to_filiales', 4),
(21, '2026_05_13_000001_add_categorie_to_dirigeants', 5),
(22, '2026_05_13_000002_add_social_to_filiales', 6),
(23, '2026_05_19_000001_add_responsabilites_to_dirigeants', 7),
(24, '2026_05_29_000001_add_role_en_to_dirigeants', 8),
(25, '2026_05_29_000002_add_bio_en_to_dirigeants', 8),
(26, '2026_06_01_000001_add_secteur_en_to_filiales', 9);

-- --------------------------------------------------------

--
-- Table structure for table `newsletter_subscribers`
--

CREATE TABLE `newsletter_subscribers` (
  `id` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `locale` varchar(2) NOT NULL DEFAULT 'fr',
  `unsubscribe_token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `SiteImage`
--

CREATE TABLE `SiteImage` (
  `id` varchar(191) NOT NULL,
  `section` varchar(191) NOT NULL,
  `url` varchar(191) NOT NULL,
  `titre` varchar(191) NOT NULL DEFAULT '',
  `alt` varchar(191) NOT NULL DEFAULT '',
  `ordre` int(11) NOT NULL DEFAULT 0,
  `actif` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `SiteImage`
--

INSERT INTO `SiteImage` (`id`, `section`, `url`, `titre`, `alt`, `ordre`, `actif`, `createdAt`, `updatedAt`) VALUES
('cmon2ugpo000krqblyr2qyvj4', 'hero', '/uploads/Create_a_premium_institutional_website_hero_banner-1776959860789.png', 'Hero principal', 'Excellis Invest Group — holding panafricaine', 1, 1, '2026-05-01 15:38:08.796', '2026-05-01 15:38:08.796'),
('cmon2ugs5000lrqblfcnv9t77', 'hero', '/uploads/Create_an_institutional_hero_image_for_Excellis_In-1776959887429.png', 'Hero alternatif', 'Excellis Invest Group', 2, 0, '2026-05-01 15:38:08.886', '2026-05-01 15:38:08.886'),
('cmon2uguu000mrqblc3eunyrk', 'about', '/uploads/Create_a_premium_institutional_website_section_vis-1776960072527.png', 'À propos / Le Groupe', 'Excellis Invest Group — notre groupe', 1, 1, '2026-05-01 15:38:08.982', '2026-05-01 15:38:08.982'),
('cmon2ugwv000nrqblicbxyu2t', 'governance', '/uploads/Create_a_high-end_governance_website_header_for_Ex-1776959898389.png', 'Gouvernance', 'Gouvernance EIG', 1, 1, '2026-05-01 15:38:09.055', '2026-05-01 15:38:09.055'),
('cmon2uh0l000orqblyp8578qb', 'careers', '/uploads/Create_a_premium_careers_website_hero_for_Excellis-1776959911645.png', 'Carrières', 'Rejoindre Excellis Invest Group', 1, 1, '2026-05-01 15:38:09.189', '2026-05-01 15:38:09.189'),
('cmon2uh5i000prqbl9rc2oxem', 'energie', '/uploads/Create_a_premium_African_infrastructure_and_energy-1776960084836.png', 'Énergie & Infrastructure', 'Énergie en Afrique', 1, 1, '2026-05-01 15:38:09.367', '2026-05-01 15:38:09.367'),
('cmon2uh9m000qrqbl1z3swnsr', 'fintech', '/uploads/Create_a_premium_innovation_and_fintech_website_se-1776960091610.png', 'Fintech & Innovation', 'Innovation digitale', 1, 1, '2026-05-01 15:38:09.514', '2026-05-01 15:38:09.514'),
('cmon2uhbm000rrqbl65mu0s6q', 'contact', '/uploads/Create_a_premium_institutional_contact_and_regiona-1776960099855.png', 'Contact', 'Nous contacter', 1, 1, '2026-05-01 15:38:09.586', '2026-05-01 15:38:09.586'),
('cmon2uhcd000srqbl7l9oc975', 'general', '/uploads/pHYCs2BW.png', 'Image générale', '', 1, 1, '2026-05-01 15:38:09.614', '2026-05-01 15:38:09.614');

-- --------------------------------------------------------

--
-- Table structure for table `site_images`
--

CREATE TABLE `site_images` (
  `id` varchar(255) NOT NULL,
  `section` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `titre` varchar(255) NOT NULL DEFAULT '',
  `alt` varchar(255) NOT NULL DEFAULT '',
  `ordre` int(11) NOT NULL DEFAULT 0,
  `actif` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `site_images`
--

INSERT INTO `site_images` (`id`, `section`, `url`, `titre`, `alt`, `ordre`, `actif`, `created_at`, `updated_at`) VALUES
('15l6Dr12165Z8L5zcZmNC3keo', 'about', '/uploads/1780084986-907638.png', 'À propos — page groupe', 'Excellis Invest Group', 1, 1, '2026-05-29 15:59:55', '2026-05-29 18:03:11'),
('2LWrh3gAxdhrQ2i0TkdSFDVXj', 'governance', '/uploads/1780085022-183708.png', 'Gouvernance', 'Gouvernance EIG', 1, 1, '2026-05-29 15:59:55', '2026-05-29 18:03:43'),
('7HCIWiHf7QjCgE0VBRgWCMgwk', 'hero', '/uploads/Create_an_institutional_hero_image_for_Excellis_In-1776959887429.png', 'Hero alternatif', 'Excellis Invest Group', 2, 0, '2026-05-29 15:59:55', '2026-05-29 15:59:55'),
('aMdXidaJIL0Al021emHtzZAKu', 'metier-energie', '/uploads/1780460820-767417.png', 'Énergie & Infrastructure', 'Énergie en Afrique', 1, 1, '2026-05-29 15:59:55', '2026-06-03 02:27:11'),
('diBC85CpL98nX2F6bhxC97WRs', 'hero', '/uploads/1780084817-327708.png', 'Hero principal', 'Excellis Invest Group — holding panafricaine', 1, 1, '2026-05-29 15:59:55', '2026-05-29 18:00:19'),
('GbjmkfW8kjw5Nw6qpC4kdR7dD', 'about', '/uploads/1780466367-163480.png', 'seo', 'seo', 0, 1, '2026-06-03 03:59:41', '2026-06-03 03:59:41'),
('iK0UtLdg3I3lgoal1g5ANTCVh', 'nos-metiers', '/uploads/1780466445-183217.png', 'seo', 'seo', 0, 1, '2026-06-03 04:00:56', '2026-06-03 04:00:56'),
('kUmlYcen8xkLZ73x3bF68oG4E', 'general', '/uploads/pHYCs2BW.png', 'Image générale', '', 1, 1, '2026-05-29 15:59:55', '2026-05-29 15:59:55'),
('lNMGouuErBKEHDuY4kUfEddem', 'careers', '/uploads/1780085136-820716.png', 'Carrières', 'Rejoindre Excellis Invest Group', 1, 1, '2026-05-29 15:59:55', '2026-05-29 18:06:40'),
('mBJbRW8I6mL0UQLjqERrdTRsb', 'metier-fintech', '/uploads/1780085245-663287.png', 'Fintech & Innovation', 'Innovation digitale', 1, 1, '2026-05-29 15:59:55', '2026-05-29 18:07:38'),
('VSG0MmvliP5PtxFnozPkGbAQm', 'actualites', '/uploads/1780466486-850530.png', 'seo', 'seo', 0, 1, '2026-06-03 04:01:29', '2026-06-03 04:01:29'),
('wNheqAqd3UyzaptrxLs4JYYzh', 'contact', '/uploads/1780323116-978148.png', 'Contact', 'Nous contacter', 1, 1, '2026-05-29 15:59:55', '2026-06-01 14:01:46'),
('WoyJJIo0ZJHgXSAg1NYUxvsHA', 'nos-filiales', '/uploads/1780466422-573641.png', 'seo', 'seo', 0, 1, '2026-06-03 04:00:24', '2026-06-03 04:00:24'),
('WQS6sVBfxlKse5ynrqL4KQorv', 'home-about', '/uploads/1780304496-870592.png', 'À propos / Le Groupe', 'Excellis Invest Group — notre groupe', 1, 1, '2026-05-29 15:59:55', '2026-06-01 07:01:37'),
('z3ufQ0x1UYArQYufgQXa6KG7J', 'governance', '/uploads/1780466508-649721.png', 'seo', 'seo', 0, 1, '2026-06-03 04:01:52', '2026-06-03 04:01:52');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `AdminUser`
--
ALTER TABLE `AdminUser`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `AdminUser_email_key` (`email`);

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admin_users_email_unique` (`email`);

--
-- Indexes for table `Article`
--
ALTER TABLE `Article`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Article_slug_key` (`slug`);

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `articles_slug_unique` (`slug`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `candidatures`
--
ALTER TABLE `candidatures`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Carriere`
--
ALTER TABLE `Carriere`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `carrieres`
--
ALTER TABLE `carrieres`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `CompanyInfo`
--
ALTER TABLE `CompanyInfo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company_infos`
--
ALTER TABLE `company_infos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ContactMessage`
--
ALTER TABLE `ContactMessage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Dirigeant`
--
ALTER TABLE `Dirigeant`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dirigeants`
--
ALTER TABLE `dirigeants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `Filiale`
--
ALTER TABLE `Filiale`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `filiales`
--
ALTER TABLE `filiales`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Metier`
--
ALTER TABLE `Metier`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Metier_slug_key` (`slug`);

--
-- Indexes for table `metiers`
--
ALTER TABLE `metiers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `metiers_slug_unique` (`slug`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `newsletter_subscribers`
--
ALTER TABLE `newsletter_subscribers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `newsletter_subscribers_email_unique` (`email`),
  ADD UNIQUE KEY `newsletter_subscribers_unsubscribe_token_unique` (`unsubscribe_token`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `SiteImage`
--
ALTER TABLE `SiteImage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `SiteImage_section_idx` (`section`);

--
-- Indexes for table `site_images`
--
ALTER TABLE `site_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `site_images_section_index` (`section`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
