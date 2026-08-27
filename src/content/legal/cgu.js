/**
 * Conditions générales d'utilisation — texte de référence issu du document
 * « Pages juridiques du site Excellis Invest Group », version 1.0 du 26 août 2026.
 */

const VERSION_FR = 'Version 1.0 — Dernière mise à jour : 26 août 2026'
const VERSION_EN = 'Version 1.0 — Last updated: 26 August 2026'

function fr(c) {
  const nom = c.nom

  return {
    label: 'Informations juridiques',
    title: "Conditions générales d'utilisation",
    updated: VERSION_FR,
    intro: `Règles applicables à l'accès et à l'utilisation du site internet ${nom}.`,
    sections: [
      {
        heading: 'Préambule',
        body: `Les présentes conditions générales d'utilisation, ci-après les « Conditions », définissent les modalités d'accès et d'utilisation du site internet ${nom} SA. Toute consultation ou utilisation du Site implique l'acceptation des présentes Conditions, sous réserve des dispositions légales impératives applicables.`,
      },
      {
        heading: '1. Définitions',
        body: 'Aux fins des présentes Conditions, les expressions suivantes ont le sens indiqué ci-après :',
        bullets: [
          `« ${nom} » ou « EIG » : ${nom} SA, éditrice du Site.`,
          `« Site » : le site institutionnel accessible à l'adresse ${c.site} ainsi que ses pages et fonctionnalités associées.`,
          `« Utilisateur » : toute personne accédant au Site ou utilisant l'une de ses fonctionnalités.`,
          `« Contenu » : tout texte, visuel, vidéo, document, donnée, élément graphique ou information publié sur le Site.`,
          `« Filiale » : toute entité dans laquelle ${nom} détient directement ou indirectement une participation ou exerce un contrôle, selon le périmètre applicable.`,
        ],
      },
      {
        heading: '2. Objet du Site',
        body: `Le Site a pour objet de présenter ${nom}, son positionnement, son organisation, sa gouvernance, ses métiers, ses filiales, ses actualités et ses opportunités. Il permet également aux utilisateurs de contacter le Groupe, de proposer un partenariat, d'adresser une demande presse ou de transmettre une candidature.`,
      },
      {
        heading: '3. Acceptation et opposabilité',
        body: `L'accès au Site et son utilisation sont soumis aux présentes Conditions. L'utilisateur qui n'accepte pas tout ou partie de celles-ci doit cesser d'utiliser le Site. Les Conditions applicables sont celles publiées à la date de la consultation, sans préjudice des droits acquis et des dispositions légales impératives.`,
      },
      {
        heading: '4. Accès et disponibilité',
        body: [
          `${nom} SA s'efforce d'assurer un accès régulier au Site. Cet accès peut être suspendu ou limité, notamment en cas de maintenance, de mise à jour, de défaillance technique, d'incident de sécurité, d'indisponibilité d'un prestataire, d'exigence réglementaire ou de force majeure.`,
          `${nom} SA ne garantit pas que le Site sera disponible sans interruption, exempt d'erreur ou compatible avec tous les équipements, navigateurs et configurations. L'utilisateur demeure responsable de son accès à internet, de son équipement et des coûts associés.`,
        ],
      },
      {
        heading: '5. Utilisation autorisée',
        body: `L'utilisateur s'engage à utiliser le Site de manière loyale, licite et conforme à sa finalité institutionnelle. Il s'interdit notamment de :`,
        bullets: [
          'perturber, ralentir, désorganiser ou compromettre le fonctionnement ou la sécurité du Site ;',
          "tenter d'accéder sans autorisation à un système, une interface, un compte, un serveur ou une donnée ;",
          'introduire ou diffuser un code malveillant, un virus ou tout autre élément susceptible de nuire au Site ;',
          'extraire, aspirer, indexer ou reproduire massivement les contenus sans autorisation ;',
          "usurper l'identité d'une personne, d'une entité ou d'un représentant du Groupe ;",
          "transmettre des contenus illicites, frauduleux, injurieux, diffamatoires, menaçants ou portant atteinte aux droits d'un tiers ;",
          'utiliser les coordonnées publiées sur le Site pour une prospection non sollicitée ou une campagne automatisée.',
        ],
      },
      {
        heading: '6. Informations institutionnelles et financières',
        body: [
          `Les informations relatives au Groupe, à ses métiers, à ses filiales, à ses perspectives, à ses réalisations, à sa notation ou aux marchés sur lesquels il intervient sont publiées à des fins générales. Elles ne constituent pas une offre, une recommandation personnalisée, une sollicitation à souscrire, acheter ou vendre un titre, un produit ou un service financier, ni une garantie de rendement ou de résultat.`,
          `Les informations susceptibles d'avoir une portée financière doivent être rapprochées des documents officiels, contractuels ou réglementaires applicables. L'utilisateur demeure seul responsable de ses décisions et de la consultation des conseils professionnels appropriés.`,
        ],
      },
      {
        heading: '7. Propriété intellectuelle',
        body: `Le Site et ses contenus sont protégés dans les conditions précisées par les Mentions légales. L'utilisateur peut consulter et imprimer les contenus pour un usage strictement personnel, professionnel interne et non commercial, sous réserve de respecter leur intégrité, leur source et les droits de leurs titulaires.`,
      },
      {
        heading: '8. Formulaires, demandes et communications',
        body: [
          `L'utilisateur garantit l'exactitude et la pertinence des informations qu'il communique au moyen des formulaires. Il s'abstient de transmettre des données excessives, sensibles ou concernant un tiers sans disposer d'un fondement légitime.`,
          `L'envoi d'une demande, d'une proposition ou d'un message ne crée aucune obligation contractuelle à la charge ${'d’' + nom} SA et ne vaut ni acceptation d'un investissement, ni conclusion d'un partenariat, ni engagement de financement, ni promesse de recrutement.`,
        ],
      },
      {
        heading: '9. Candidatures',
        body: [
          `Les candidatures transmises au moyen du Site ou par l'adresse indiquée sont utilisées exclusivement pour la gestion des recrutements et, lorsque cela est clairement indiqué, pour l'examen d'opportunités au sein des filiales. Le candidat est invité à ne communiquer que les informations pertinentes à l'évaluation de sa candidature.`,
          `Les modalités de traitement, de conservation et d'exercice des droits sont décrites dans la Politique de confidentialité.`,
        ],
      },
      {
        heading: '10. Transmission aux filiales',
        body: `Lorsqu'une demande concerne une filiale, ${nom} SA peut la transmettre à l'entité compétente, accompagnée des informations strictement nécessaires à son traitement. Lorsque cette transmission n'est pas évidente au regard de la demande, l'utilisateur en est informé ou son accord est sollicité selon les exigences applicables.`,
      },
      {
        heading: '11. Liens vers des sites tiers',
        body: `Les liens vers les sites de filiales ou de tiers sont fournis à titre pratique. ${nom} SA ne contrôle pas nécessairement ces sites et ne saurait répondre de leur contenu, de leurs services, de leur disponibilité, de leur sécurité ou de leurs pratiques de protection des données.`,
      },
      {
        heading: '12. Sécurité',
        body: `${nom} SA met en œuvre des mesures raisonnables pour préserver la sécurité du Site. L'utilisateur demeure responsable de la protection de son terminal, de sa connexion et de ses identifiants éventuels. Il doit s'abstenir de communiquer des informations confidentielles par un canal non sécurisé ou non prévu à cet effet.`,
      },
      {
        heading: '13. Limitation de responsabilité',
        body: `Sous réserve des dispositions auxquelles il ne peut être dérogé, ${nom} SA ne pourra être tenue responsable d'un dommage indirect, d'une perte d'opportunité, d'une interruption d'activité, d'une perte de données ou d'une décision prise sur le seul fondement d'un contenu général du Site. Aucune disposition des présentes Conditions n'a pour effet d'exclure une responsabilité que la loi applicable interdit d'exclure.`,
      },
      {
        heading: '14. Modification du Site et des Conditions',
        body: `${nom} SA peut faire évoluer le Site, ses fonctionnalités, son architecture et ses contenus afin de tenir compte de l'évolution du Groupe, de ses activités, de ses outils numériques ou des exigences légales et réglementaires. Les présentes Conditions peuvent être actualisées pour les mêmes motifs. La date de dernière mise à jour est indiquée en fin de page.`,
      },
      {
        heading: '15. Droit applicable et règlement des différends',
        body: `Les présentes Conditions sont régies par le droit burkinabè. En cas de différend, les parties rechercheront prioritairement une solution amiable. À défaut, le litige sera porté devant les juridictions territorialement et matériellement compétentes, sous réserve des règles impératives applicables.`,
      },
      {
        heading: '16. Contact',
        body: [
          `Toute question relative aux présentes Conditions peut être adressée à ${nom} SA au moyen du formulaire de contact ou des coordonnées publiées sur le Site.`,
          `Contact juridique : ${c.emailJuridique}.`,
        ],
      },
    ],
  }
}

function en(c) {
  const nom = c.nom

  return {
    label: 'Legal information',
    title: 'Terms of use',
    updated: VERSION_EN,
    intro: `Rules applicable to access to and use of the ${nom} website.`,
    sections: [
      {
        heading: 'Preamble',
        body: `These terms of use, hereinafter the "Terms", set out the conditions for accessing and using the ${nom} SA website. Any consultation or use of the Website implies acceptance of these Terms, subject to applicable mandatory legal provisions.`,
      },
      {
        heading: '1. Definitions',
        body: 'For the purposes of these Terms, the following expressions have the meaning set out below:',
        bullets: [
          `"${nom}" or "EIG": ${nom} SA, publisher of the Website.`,
          `"Website": the institutional website accessible at ${c.site}, together with its associated pages and features.`,
          `"User": any person accessing the Website or using any of its features.`,
          `"Content": any text, visual, video, document, data, graphic element or information published on the Website.`,
          `"Subsidiary": any entity in which ${nom} directly or indirectly holds an interest or exercises control, within the applicable scope.`,
        ],
      },
      {
        heading: '2. Purpose of the Website',
        body: `The purpose of the Website is to present ${nom}, its positioning, organisation, governance, business lines, subsidiaries, news and opportunities. It also allows users to contact the Group, propose a partnership, submit a press enquiry or send an application.`,
      },
      {
        heading: '3. Acceptance and enforceability',
        body: `Access to and use of the Website are subject to these Terms. Users who do not accept all or part of them must stop using the Website. The applicable Terms are those published on the date of consultation, without prejudice to acquired rights and mandatory legal provisions.`,
      },
      {
        heading: '4. Access and availability',
        body: [
          `${nom} SA endeavours to ensure regular access to the Website. Such access may be suspended or restricted, in particular in the event of maintenance, updates, technical failure, security incident, unavailability of a provider, regulatory requirement or force majeure.`,
          `${nom} SA does not warrant that the Website will be available without interruption, free of error, or compatible with all equipment, browsers and configurations. Users remain responsible for their internet access, equipment and associated costs.`,
        ],
      },
      {
        heading: '5. Permitted use',
        body: `Users undertake to use the Website fairly, lawfully and in accordance with its institutional purpose. They shall refrain in particular from:`,
        bullets: [
          'disrupting, slowing, disorganising or compromising the operation or security of the Website;',
          'attempting to gain unauthorised access to a system, interface, account, server or data;',
          'introducing or distributing malicious code, a virus or any other element liable to harm the Website;',
          'extracting, scraping, indexing or reproducing content on a large scale without authorisation;',
          'impersonating a person, entity or representative of the Group;',
          'transmitting unlawful, fraudulent, abusive, defamatory or threatening content, or content infringing the rights of a third party;',
          'using the contact details published on the Website for unsolicited canvassing or an automated campaign.',
        ],
      },
      {
        heading: '6. Institutional and financial information',
        body: [
          `Information relating to the Group, its business lines, subsidiaries, outlook, achievements, credit rating or the markets in which it operates is published for general purposes. It does not constitute an offer, a personalised recommendation, a solicitation to subscribe for, buy or sell a security, product or financial service, nor any guarantee of return or result.`,
          `Information that may have financial implications must be cross-checked against the applicable official, contractual or regulatory documents. Users remain solely responsible for their decisions and for seeking appropriate professional advice.`,
        ],
      },
      {
        heading: '7. Intellectual property',
        body: `The Website and its content are protected under the conditions set out in the Legal notice. Users may consult and print content for strictly personal, internal professional and non-commercial use, provided they respect its integrity, its source and the rights of its holders.`,
      },
      {
        heading: '8. Forms, requests and communications',
        body: [
          `Users warrant the accuracy and relevance of the information they provide through the forms. They shall refrain from transmitting excessive or sensitive data, or data concerning a third party, without a legitimate basis.`,
          `Sending a request, proposal or message creates no contractual obligation on ${nom} SA and constitutes neither acceptance of an investment, nor conclusion of a partnership, nor a financing commitment, nor a promise of recruitment.`,
        ],
      },
      {
        heading: '9. Applications',
        body: [
          `Applications submitted through the Website or to the address indicated are used exclusively for recruitment management and, where clearly stated, to consider opportunities within the subsidiaries. Candidates are invited to provide only information relevant to the assessment of their application.`,
          `The arrangements for processing, retention and exercise of rights are described in the Privacy Policy.`,
        ],
      },
      {
        heading: '10. Forwarding to subsidiaries',
        body: `Where a request concerns a subsidiary, ${nom} SA may forward it to the relevant entity, together with the information strictly necessary for its handling. Where such forwarding is not evident from the request, the user is informed of it or their agreement is sought, in accordance with applicable requirements.`,
      },
      {
        heading: '11. Links to third-party websites',
        body: `Links to the websites of subsidiaries or third parties are provided for convenience. ${nom} SA does not necessarily control those websites and cannot be answerable for their content, services, availability, security or data protection practices.`,
      },
      {
        heading: '12. Security',
        body: `${nom} SA implements reasonable measures to preserve the security of the Website. Users remain responsible for protecting their device, connection and any credentials. They must refrain from sending confidential information through an unsecured channel or one not intended for that purpose.`,
      },
      {
        heading: '13. Limitation of liability',
        body: `Subject to provisions from which no derogation is permitted, ${nom} SA may not be held liable for indirect damage, loss of opportunity, business interruption, loss of data, or a decision taken solely on the basis of general Website content. No provision of these Terms operates to exclude liability that applicable law prohibits excluding.`,
      },
      {
        heading: '14. Changes to the Website and Terms',
        body: `${nom} SA may develop the Website, its features, architecture and content to reflect changes in the Group, its activities, its digital tools or legal and regulatory requirements. These Terms may be updated for the same reasons. The date of last update is shown at the end of the page.`,
      },
      {
        heading: '15. Governing law and dispute resolution',
        body: `These Terms are governed by Burkinabè law. In the event of a dispute, the parties shall first seek an amicable solution. Failing this, the dispute shall be brought before the courts having territorial and subject-matter jurisdiction, subject to applicable mandatory rules.`,
      },
      {
        heading: '16. Contact',
        body: [
          `Any question relating to these Terms may be addressed to ${nom} SA using the contact form or the details published on the Website.`,
          `Legal contact: ${c.emailJuridique}.`,
        ],
      },
    ],
  }
}

export default function cgu(lang, c) {
  return lang === 'en' ? en(c) : fr(c)
}
