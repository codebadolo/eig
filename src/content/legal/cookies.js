/**
 * Politique de gestion des cookies — texte de référence issu du document
 * « Pages juridiques du site Excellis Invest Group », version 1.0 du 26 août 2026.
 *
 * La liste détaillée des traceurs doit être établie à partir d'un relevé technique
 * réalisé en production : aucun cookie ne doit être déclaré sans être réellement
 * déposé, ni omis s'il l'est. Le relevé effectué au 26 août 2026 n'a détecté aucun
 * outil de mesure d'audience ni service publicitaire tiers.
 */

import { TODO } from './shared'

const VERSION_FR = 'Version 1.0 — Dernière mise à jour : 26 août 2026'
const VERSION_EN = 'Version 1.0 — Last updated: 26 August 2026'

function fr(c) {
  const nom = c.nom

  return {
    label: 'Cookies',
    title: 'Politique de gestion des cookies',
    updated: VERSION_FR,
    intro: 'Informations sur les traceurs utilisés, leurs finalités et les moyens de gérer vos choix.',
    sections: [
      {
        heading: 'Introduction',
        body: `La présente Politique explique comment ${nom} SA utilise des cookies et technologies similaires lors de la consultation de son Site. Elle complète la Politique de confidentialité et doit être rapprochée de l'inventaire technique réel des traceurs déployés.`,
      },
      {
        heading: "1. Qu'est-ce qu'un cookie ?",
        body: [
          `Un cookie est un petit fichier ou identifiant déposé ou consulté sur le terminal d'un utilisateur lors de la visite d'un site internet. Il peut permettre d'assurer une fonctionnalité, de mémoriser un choix, de sécuriser une session, de mesurer l'audience ou d'adapter un contenu.`,
          `Le terme « cookie » est utilisé dans la présente Politique pour désigner également les technologies similaires susceptibles d'enregistrer ou de lire des informations sur le terminal de l'utilisateur.`,
        ],
      },
      {
        heading: "2. Catégories de cookies susceptibles d'être utilisées",
        table: {
          head: ['Catégorie', 'Finalité', 'Gestion du consentement'],
          rows: [
            ['Strictement nécessaires', 'Fonctionnement du Site, sécurité, gestion des formulaires, conservation des choix essentiels et prévention des abus.', 'Activés uniquement lorsqu’ils sont indispensables au service demandé.'],
            ['Préférences', "Mémorisation de la langue, de l'affichage ou de choix de navigation.", 'Activés selon leur nature et les exigences applicables.'],
            ["Mesure d'audience", 'Compréhension de la fréquentation, des parcours, des performances et des difficultés de navigation.', 'Activés après consentement lorsque celui-ci est requis.'],
            ['Communication et campagnes', "Mesure de l'efficacité des campagnes institutionnelles et compréhension des sources de trafic.", 'Activés après consentement.'],
            ['Contenus et services tiers', 'Affichage de vidéos, cartes, boutons sociaux ou autres contenus fournis par un tiers.', 'Activés après consentement, avant le chargement du service tiers.'],
          ],
        },
      },
      {
        heading: '3. Traceurs effectivement déployés',
        body: `Le relevé technique réalisé sur le Site en production au 26 août 2026 n'a détecté aucun outil de mesure d'audience, aucun cookie publicitaire et aucun service tiers de suivi. Seuls sont utilisés les éléments strictement nécessaires au fonctionnement du Site et à la mémorisation des préférences d'affichage, notamment la langue choisie.`,
      },
      {
        heading: '4. Recueil et gestion du consentement',
        body: [
          `Lorsqu'un traceur non essentiel est déployé, un bandeau informe l'utilisateur dès la première visite et lui permet d'accepter, de refuser ou de personnaliser les catégories concernées. Le refus doit être aussi simple et accessible que l'acceptation.`,
          `Le choix de l'utilisateur est enregistré pendant une durée déterminée et peut être modifié à tout moment au moyen du lien permanent « Gérer mes cookies » affiché dans le pied de page du Site.`,
        ],
      },
      {
        heading: '5. Paramètres proposés dans le bandeau',
        bullets: [
          '« Tout accepter » : autoriser les catégories non essentielles présentées.',
          '« Tout refuser » : refuser tous les cookies non indispensables.',
          '« Personnaliser » : choisir séparément chaque catégorie.',
          '« Enregistrer mes choix » : confirmer la sélection personnalisée.',
        ],
        note: `Les boutons « Tout accepter » et « Tout refuser » présentent un niveau de visibilité et d'accessibilité comparable. Les cases relatives aux cookies non essentiels ne sont jamais précochées.`,
      },
      {
        heading: '6. Cookies strictement nécessaires',
        body: `Les cookies strictement nécessaires permettent notamment d'assurer le fonctionnement technique, la sécurité, la transmission d'un formulaire, la gestion des préférences de confidentialité et la prévention des soumissions automatisées. Ils ne sont utilisés que dans la mesure nécessaire à la fourniture du service demandé ou à la protection du Site.`,
      },
      {
        heading: "7. Mesure d'audience",
        body: `Les outils de mesure d'audience permettent de comprendre la fréquentation du Site, les pages consultées, la durée des visites, les sources de trafic, les performances techniques et les difficultés rencontrées. Lorsque la législation ou la configuration de l'outil l'exige, ces cookies ne sont activés qu'après le consentement de l'utilisateur.`,
      },
      {
        heading: '8. Services et contenus tiers',
        body: `Certains contenus peuvent dépendre de services tiers, notamment une vidéo, une carte, un bouton social, une protection anti-robots ou un formulaire externe. Ces services peuvent déposer leurs propres cookies ou traiter des informations techniques. Ils doivent rester bloqués tant que le consentement requis n'a pas été donné.`,
      },
      {
        heading: '9. CAPTCHA et prévention des abus',
        body: `Un mécanisme de prévention des soumissions automatisées peut être utilisé pour protéger les formulaires. Lorsque ce mécanisme est fourni par un tiers et entraîne un transfert de données, son identité, ses finalités, les données traitées et le pays de traitement sont indiqués dans la présente Politique et dans la Politique de confidentialité.`,
      },
      {
        heading: '10. Durée de conservation des cookies et des choix',
        body: `La durée de vie de chaque cookie est proportionnée à sa finalité. Le choix de consentement est conservé pendant une durée raisonnable, puis sollicité à nouveau. Une nouvelle demande peut également être présentée lorsqu'une modification substantielle intervient dans les finalités ou les prestataires.`,
      },
      {
        heading: '11. Paramétrage du navigateur',
        body: `L'utilisateur peut également configurer son navigateur pour supprimer ou bloquer certains cookies. Le blocage des cookies strictement nécessaires peut toutefois empêcher le fonctionnement correct de certaines fonctionnalités. Le paramétrage du navigateur ne remplace pas nécessairement les choix proposés par le gestionnaire de consentement du Site.`,
      },
      {
        heading: '12. Transferts internationaux',
        body: `Lorsqu'un cookie ou un service tiers entraîne un transfert de données hors du Burkina Faso, ${nom} SA applique les exigences prévues par la ${c.loi} et les prescriptions de la CIL, notamment concernant l'autorisation du transfert et les garanties de protection applicables.`,
      },
      {
        heading: '13. Mise à jour et contact',
        body: [
          `La présente Politique peut être modifiée lorsque les outils, finalités ou exigences applicables évoluent. La date de mise à jour est indiquée ci-dessus. Pour toute question relative aux cookies ou aux choix de confidentialité, l'utilisateur peut contacter ${nom} SA au moyen du formulaire du Site.`,
          `Contact pour les questions relatives aux données personnelles : ${c.emailJuridique}.`,
        ],
      },
    ],
  }
}

function en(c) {
  const nom = c.nom

  return {
    label: 'Cookies',
    title: 'Cookie policy',
    updated: VERSION_EN,
    intro: 'Information about the trackers used, their purposes and how to manage your choices.',
    sections: [
      {
        heading: 'Introduction',
        body: `This Policy explains how ${nom} SA uses cookies and similar technologies when its Website is visited. It supplements the Privacy Policy and should be read together with the actual technical inventory of the trackers deployed.`,
      },
      {
        heading: '1. What is a cookie?',
        body: [
          `A cookie is a small file or identifier stored on or read from a user's device when visiting a website. It may serve to provide a feature, remember a choice, secure a session, measure audience or adapt content.`,
          `In this Policy, the term "cookie" also covers similar technologies capable of storing or reading information on the user's device.`,
        ],
      },
      {
        heading: '2. Categories of cookies that may be used',
        table: {
          head: ['Category', 'Purpose', 'Consent management'],
          rows: [
            ['Strictly necessary', 'Website operation, security, form handling, retention of essential choices and abuse prevention.', 'Enabled only where indispensable to the service requested.'],
            ['Preferences', 'Remembering language, display or navigation choices.', 'Enabled according to their nature and applicable requirements.'],
            ['Audience measurement', 'Understanding traffic, journeys, performance and navigation difficulties.', 'Enabled after consent where consent is required.'],
            ['Communication and campaigns', 'Measuring the effectiveness of institutional campaigns and understanding traffic sources.', 'Enabled after consent.'],
            ['Third-party content and services', 'Displaying videos, maps, social buttons or other third-party content.', 'Enabled after consent, before the third-party service loads.'],
          ],
        },
      },
      {
        heading: '3. Trackers actually deployed',
        body: `The technical review carried out on the production Website on 26 August 2026 detected no audience measurement tool, no advertising cookie and no third-party tracking service. Only the elements strictly necessary for the operation of the Website and for remembering display preferences, in particular the chosen language, are used.`,
      },
      {
        heading: '4. Obtaining and managing consent',
        body: [
          `Where a non-essential tracker is deployed, a banner informs the user on the first visit and allows them to accept, refuse or customise the categories concerned. Refusing must be as simple and accessible as accepting.`,
          `The user's choice is stored for a defined period and may be changed at any time via the permanent "Manage my cookies" link shown in the Website footer.`,
        ],
      },
      {
        heading: '5. Options offered in the banner',
        bullets: [
          '"Accept all": allow the non-essential categories presented.',
          '"Reject all": refuse all non-essential cookies.',
          '"Customise": choose each category separately.',
          '"Save my choices": confirm the customised selection.',
        ],
        note: `The "Accept all" and "Reject all" buttons are given comparable visibility and accessibility. Boxes relating to non-essential cookies are never pre-ticked.`,
      },
      {
        heading: '6. Strictly necessary cookies',
        body: `Strictly necessary cookies serve in particular to ensure technical operation, security, form submission, management of privacy preferences and prevention of automated submissions. They are used only to the extent necessary to provide the service requested or to protect the Website.`,
      },
      {
        heading: '7. Audience measurement',
        body: `Audience measurement tools help understand Website traffic, pages viewed, visit duration, traffic sources, technical performance and difficulties encountered. Where legislation or the tool's configuration so requires, these cookies are enabled only after the user's consent.`,
      },
      {
        heading: '8. Third-party services and content',
        body: `Some content may rely on third-party services, in particular a video, map, social button, anti-bot protection or external form. Such services may set their own cookies or process technical information. They must remain blocked until the required consent has been given.`,
      },
      {
        heading: '9. CAPTCHA and abuse prevention',
        body: `A mechanism preventing automated submissions may be used to protect forms. Where such a mechanism is supplied by a third party and involves a data transfer, its identity, purposes, the data processed and the country of processing are set out in this Policy and in the Privacy Policy.`,
      },
      {
        heading: '10. Retention of cookies and of consent choices',
        body: `The lifetime of each cookie is proportionate to its purpose. The consent choice is kept for a reasonable period and then requested again. A fresh request may also be made where a substantial change occurs in the purposes or providers.`,
      },
      {
        heading: '11. Browser settings',
        body: `Users may also configure their browser to delete or block certain cookies. Blocking strictly necessary cookies may, however, prevent some features from working correctly. Browser settings do not necessarily replace the choices offered by the Website's consent manager.`,
      },
      {
        heading: '12. International transfers',
        body: `Where a cookie or third-party service involves a transfer of data outside Burkina Faso, ${nom} SA applies the requirements laid down by ${c.loiEn} and the requirements of the CIL, in particular regarding authorisation of the transfer and applicable protection safeguards.`,
      },
      {
        heading: '13. Updates and contact',
        body: [
          `This Policy may be amended where the tools, purposes or applicable requirements change. The update date is shown above. For any question relating to cookies or privacy choices, users may contact ${nom} SA using the form on the Website.`,
          `Contact for personal data matters: ${c.emailJuridique}.`,
        ],
      },
    ],
  }
}

export default function cookies(lang, c) {
  return lang === 'en' ? en(c) : fr(c)
}
