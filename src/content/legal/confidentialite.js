/**
 * Politique de confidentialité — texte de référence issu du document
 * « Pages juridiques du site Excellis Invest Group », version 1.0 du 26 août 2026.
 *
 * Les durées chiffrées et la liste définitive des prestataires restent à valider
 * par la direction juridique : les passages concernés portent une mention explicite.
 */

import { TODO } from './shared'

const VERSION_FR = 'Version 1.0 — Dernière mise à jour : 26 août 2026'
const VERSION_EN = 'Version 1.0 — Last updated: 26 August 2026'

function fr(c) {
  const nom = c.nom

  return {
    label: 'Protection des données',
    title: 'Politique de confidentialité',
    updated: VERSION_FR,
    intro: `Comment ${nom} collecte, utilise, conserve et protège les données personnelles.`,
    sections: [
      {
        heading: 'Introduction',
        body: [
          `${nom} SA accorde une importance particulière à la protection des données personnelles et au respect de la vie privée. La présente Politique explique les données susceptibles d'être collectées au moyen du Site, les finalités poursuivies, les personnes auxquelles ces données peuvent être communiquées, leurs durées de conservation et les droits reconnus aux personnes concernées.`,
          `Les traitements sont mis en œuvre conformément au droit burkinabè applicable, notamment à la ${c.loi}, ainsi qu'aux délibérations et prescriptions de la Commission de l'informatique et des libertés, ci-après la « CIL ».`,
        ],
      },
      {
        heading: '1. Responsable du traitement',
        body: [
          `Le responsable des traitements réalisés au moyen du Site est ${nom}, ${c.forme}, au capital social de ${c.capital} F CFA, immatriculée au RCCM sous le numéro ${c.rccm} et identifiée sous le numéro IFU ${c.ifu}, dont le siège social est établi à ${c.siege}.`,
          `Adresse postale : ${c.adressePostale}. Téléphone : ${c.telephone}. Email : ${c.email}.`,
          `Contact pour les questions relatives aux données personnelles : Service juridique — ${c.emailJuridique}.`,
        ],
      },
      {
        heading: "2. Champ d'application",
        body: `La présente Politique s'applique aux données personnelles traitées dans le cadre de la consultation du Site et de l'utilisation de ses fonctionnalités. Elle concerne notamment les visiteurs, candidats, investisseurs, partenaires, journalistes, prestataires, représentants d'institutions, abonnés aux communications et personnes adressant une demande au Groupe ou à l'une de ses filiales.`,
      },
      {
        heading: '3. Définitions essentielles',
        bullets: [
          `« Donnée personnelle » : toute information se rapportant à une personne physique identifiée ou identifiable.`,
          `« Traitement » : toute opération ou tout ensemble d'opérations appliqué à des données personnelles, notamment la collecte, l'enregistrement, l'organisation, la consultation, l'utilisation, la transmission, la conservation ou la suppression.`,
          `« Personne concernée » : toute personne physique dont les données personnelles font l'objet d'un traitement.`,
          `« Responsable du traitement » : la personne qui détermine les finalités et les moyens du traitement.`,
          `« Sous-traitant » : toute personne traitant des données pour le compte du responsable du traitement.`,
        ],
      },
      {
        heading: "4. Données susceptibles d'être collectées",
        table: {
          head: ['Catégorie', 'Exemples'],
          rows: [
            ['Identité', "Nom, prénom, civilité et, le cas échéant, photographie figurant sur un document transmis."],
            ['Coordonnées', 'Adresse email, numéro de téléphone, adresse professionnelle ou postale.'],
            ['Données professionnelles', "Fonction, organisation, secteur d'activité, profil professionnel et objet de la relation."],
            ['Demandes et échanges', 'Objet, contenu du message, pièces jointes et historique des échanges.'],
            ['Candidatures', 'CV, diplômes, expériences, compétences, références et informations nécessaires au recrutement.'],
            ['Données techniques', "Adresse IP, navigateur, appareil, système d'exploitation, journaux de connexion et données de sécurité."],
            ['Navigation et préférences', 'Pages consultées, durée de visite, source de trafic, langue et préférences de consentement.'],
          ],
        },
        body: `${nom} SA ne demande pas aux utilisateurs de communiquer des données sensibles dans les formulaires généraux. Toute personne est invitée à ne transmettre que les informations strictement nécessaires à sa demande.`,
      },
      {
        heading: '5. Sources des données',
        body: `Les données peuvent être recueillies directement auprès de la personne concernée, automatiquement lors de sa navigation, auprès d'une filiale ou d'un partenaire habilité, ou à partir de sources professionnelles rendues publiques lorsque leur utilisation est licite, pertinente et compatible avec la finalité poursuivie.`,
      },
      {
        heading: '6. Finalités des traitements',
        table: {
          head: ['Finalité', 'Données principalement concernées'],
          rows: [
            ['Répondre aux demandes générales', 'Identité, coordonnées, organisation, objet et contenu de la demande.'],
            ['Gérer les relations institutionnelles et les partenariats', 'Identité, fonction, organisation, projet et historique des échanges.'],
            ['Traiter les candidatures', 'CV, diplômes, parcours, coordonnées, références et appréciations de recrutement.'],
            ['Gérer les relations presse', 'Identité, média, fonction, coordonnées et demande.'],
            ['Envoyer des communications institutionnelles', "Nom, email, centres d'intérêt et preuve du consentement."],
            ["Mesurer et améliorer l'audience", 'Données de navigation, terminal, pages consultées et source de trafic.'],
            ['Assurer la sécurité du Site', 'Adresse IP, logs, événements techniques et données nécessaires à la détection des incidents.'],
            ['Respecter les obligations légales', 'Données nécessaires aux formalités, contrôles, audits, réclamations et contentieux.'],
          ],
        },
      },
      {
        heading: '7. Fondements des traitements',
        body: [
          `Selon la nature du traitement et les exigences applicables, ${nom} SA s'appuie notamment sur le consentement de la personne concernée, l'exécution de mesures précontractuelles ou contractuelles, le respect d'une obligation légale ou réglementaire, ou la poursuite d'un intérêt légitime compatible avec les droits et libertés de la personne.`,
          `Lorsqu'un consentement est requis, il est recueilli au moyen d'une action positive, libre, spécifique, éclairée et univoque. La personne peut le retirer à tout moment, sans compromettre la licéité des traitements effectués avant ce retrait.`,
        ],
      },
      {
        heading: '8. Caractère obligatoire ou facultatif des informations',
        body: `Les champs signalés comme obligatoires sont nécessaires au traitement de la demande. À défaut de les renseigner, ${nom} SA peut ne pas être en mesure d'y répondre. Les autres champs sont facultatifs et permettent de mieux orienter ou personnaliser la réponse.`,
      },
      {
        heading: '9. Destinataires des données',
        body: [
          `Dans la limite de leurs attributions et du besoin d'en connaître, les données peuvent être accessibles aux services compétents ${'d’' + nom} SA, notamment la Direction générale, la Direction Marketing et Communication, la Direction des ressources humaines, les fonctions juridiques, conformité, audit, systèmes d'information et les directions concernées par la demande.`,
          `Elles peuvent également être communiquées à une filiale lorsque la demande la concerne, aux prestataires techniques contractuellement habilités, aux conseils professionnels du Groupe et aux autorités administratives ou judiciaires compétentes lorsque la loi l'exige.`,
        ],
      },
      {
        heading: '10. Transmission aux filiales',
        body: `Lorsqu'une demande concerne directement une filiale, ${nom} SA peut lui transmettre les informations nécessaires afin qu'elle puisse instruire la demande et y répondre. La filiale destinataire traite les données conformément aux règles qui lui sont applicables et à l'information portée à la connaissance de la personne concernée.`,
      },
      {
        heading: '11. Sous-traitants et prestataires',
        body: `${nom} SA peut faire appel à des prestataires pour l'hébergement, la maintenance, la sécurité, la mesure d'audience, l'envoi de communications, la gestion de la relation, la collecte de candidatures ou la protection contre les soumissions automatisées. Ces prestataires ne peuvent traiter les données que sur instruction documentée et dans les limites nécessaires à leur mission.`,
      },
      {
        heading: '12. Transferts de données hors du Burkina Faso',
        body: `Certains prestataires ou outils peuvent impliquer un hébergement, un accès ou un transfert de données hors du Burkina Faso. Tout transfert international est encadré conformément à la ${c.loi} et aux prescriptions de la CIL. ${nom} SA vérifie notamment la destination, la finalité, le niveau de protection et les garanties contractuelles, organisationnelles et techniques applicables.`,
      },
      {
        heading: '13. Durées de conservation',
        body: `Les données sont conservées pendant une durée n'excédant pas celle nécessaire aux finalités pour lesquelles elles ont été collectées, augmentée, lorsque cela est justifié, des durées d'archivage requises pour satisfaire aux obligations légales, réglementaires, probatoires ou contentieuses.`,
        table: {
          head: ['Traitement', 'Règle de conservation'],
          rows: [
            ['Demandes générales', "Durée du traitement de la demande, puis archivage limité selon la nature de l'échange."],
            ['Relations institutionnelles et partenariats', 'Durée de la relation et période nécessaire au suivi des engagements ou obligations.'],
            ['Candidatures retenues', 'Intégration au dossier administratif selon les règles applicables au personnel.'],
            ['Candidatures non retenues', 'Durée annoncée au candidat et validée par la Direction des ressources humaines et le Conseil juridique.'],
            ['Communications institutionnelles', "Jusqu'au retrait du consentement ou à l'inactivité définie par la politique interne."],
            ['Logs et sécurité', "Durée proportionnée aux besoins de sécurité, d'audit et de preuve."],
            ['Cookies', 'Durées précisées dans la Politique de gestion des cookies.'],
          ],
        },
      },
      {
        heading: '14. Sécurité et confidentialité',
        body: [
          `${nom} SA met en œuvre des mesures techniques et organisationnelles appropriées au regard de la nature des données, des finalités, du contexte et des risques. Ces mesures peuvent notamment comprendre le contrôle des accès, la gestion des habilitations, l'authentification, le chiffrement des échanges, la journalisation, les sauvegardes, la sécurisation des infrastructures, les engagements de confidentialité, les procédures de gestion des incidents et les contrôles des prestataires.`,
          `Aucun système ne pouvant garantir une sécurité absolue, ${nom} SA adapte régulièrement ses mesures aux risques et aux évolutions techniques raisonnablement disponibles.`,
        ],
      },
      {
        heading: '15. Droits des personnes',
        body: [
          `Dans les conditions et limites prévues par le droit applicable, toute personne concernée peut demander l'accès aux données qui la concernent, leur rectification, leur mise à jour, leur effacement ou l'exercice du droit à l'oubli, s'opposer à certains traitements, retirer son consentement et exercer les autres droits reconnus par la loi.`,
          `La personne peut également saisir la Commission de l'informatique et des libertés lorsqu'elle estime que ses droits ne sont pas respectés. Site de la CIL : ${c.cilUrl}`,
        ],
      },
      {
        heading: '16. Exercice des droits',
        body: [
          `Toute demande d'exercice de droits doit être adressée à ${nom} SA au moyen du formulaire dédié ou de l'adresse email indiquée ci-dessous. Elle doit préciser le droit exercé, le traitement concerné et les informations permettant de retrouver les données.`,
          `Une preuve d'identité ne sera demandée que lorsqu'elle est nécessaire pour éviter une divulgation à un tiers ou confirmer l'identité du demandeur. Les justificatifs reçus sont utilisés exclusivement pour instruire la demande et sont conservés pendant la durée strictement nécessaire.`,
          `Les demandes peuvent être adressées à ${c.emailJuridique} ou par courrier à : ${nom}, Service juridique, ${c.adressePostale}.`,
        ],
      },
      {
        heading: '17. Données relatives aux candidatures',
        body: [
          `Les informations communiquées par les candidats sont utilisées pour analyser les profils, organiser les entretiens, apprécier l'adéquation avec les postes, constituer les dossiers de recrutement et, lorsque le candidat en a été informé, examiner d'autres opportunités au sein du Groupe ou de ses filiales.`,
          `Les candidats sont invités à ne pas transmettre de données excessives ou sensibles sans nécessité. Les références professionnelles ne doivent être communiquées qu'après information des personnes concernées.`,
        ],
      },
      {
        heading: '18. Communications institutionnelles',
        body: `L'inscription à une newsletter ou à une liste de diffusion repose sur une démarche volontaire. L'utilisateur peut se désabonner à tout moment en utilisant le lien prévu dans chaque communication ou en contactant ${nom} SA. Le retrait du consentement n'affecte pas la licéité des envois antérieurs.`,
      },
      {
        heading: '19. Données des mineurs',
        body: `Le Site n'est pas principalement destiné aux mineurs. Lorsque ${nom} SA reçoit des données concernant un mineur, elle vérifie la pertinence du traitement et met en œuvre les mesures exigées par la législation applicable, notamment en matière d'information, de consentement ou d'autorisation du représentant légal.`,
      },
      {
        heading: '20. Réclamations et incidents',
        body: `Toute personne peut signaler une difficulté ou une atteinte présumée à la confidentialité de ses données au moyen des coordonnées indiquées dans la présente Politique. ${nom} SA analyse les signalements et prend les mesures appropriées, notamment les actions de sécurisation, de documentation, d'information et de notification requises.`,
      },
      {
        heading: '21. Mise à jour de la Politique',
        body: `La présente Politique peut être modifiée afin de tenir compte de l'évolution des traitements, des services numériques, des prestataires, de l'organisation du Groupe ou du cadre légal. La version publiée sur le Site est accompagnée de sa date de mise à jour. Toute modification substantielle peut faire l'objet d'une information particulière.`,
      },
      {
        heading: '22. Contact',
        body: [
          `Pour toute question concernant la présente Politique ou le traitement des données personnelles, la personne concernée peut contacter ${nom} à l'adresse ${c.emailJuridique}, écrire au Service juridique, ${c.adressePostale}, ou utiliser le formulaire prévu sur le Site.`,
        ],
      },
    ],
  }
}

function en(c) {
  const nom = c.nom

  return {
    label: 'Data protection',
    title: 'Privacy policy',
    updated: VERSION_EN,
    intro: `How ${nom} collects, uses, retains and protects personal data.`,
    sections: [
      {
        heading: 'Introduction',
        body: [
          `${nom} SA attaches particular importance to the protection of personal data and respect for privacy. This Policy explains the data that may be collected through the Website, the purposes pursued, the persons to whom such data may be disclosed, the retention periods and the rights granted to data subjects.`,
          `Processing is carried out in accordance with applicable Burkinabè law, in particular ${c.loiEn}, and with the deliberations and requirements of the Data Protection Authority (Commission de l'informatique et des libertés, the "CIL").`,
        ],
      },
      {
        heading: '1. Data controller',
        body: [
          `The controller of the processing carried out through the Website is ${nom}, ${c.formeEn}, with a share capital of ${c.capital} CFA francs, registered with the RCCM under number ${c.rccm} and identified by taxpayer number (IFU) ${c.ifu}, whose registered office is located at ${c.siegeEn}.`,
          `Postal address: ${c.adressePostale}. Telephone: ${c.telephone}. Email: ${c.email}.`,
          `Contact for personal data matters: Legal Department — ${c.emailJuridique}.`,
        ],
      },
      {
        heading: '2. Scope',
        body: `This Policy applies to personal data processed in connection with the consultation of the Website and the use of its features. It concerns in particular visitors, candidates, investors, partners, journalists, service providers, institutional representatives, subscribers to communications, and persons submitting a request to the Group or one of its subsidiaries.`,
      },
      {
        heading: '3. Key definitions',
        bullets: [
          '"Personal data": any information relating to an identified or identifiable natural person.',
          '"Processing": any operation or set of operations applied to personal data, including collection, recording, organisation, consultation, use, transmission, retention or deletion.',
          '"Data subject": any natural person whose personal data is processed.',
          '"Controller": the person who determines the purposes and means of the processing.',
          '"Processor": any person processing data on behalf of the controller.',
        ],
      },
      {
        heading: '4. Data that may be collected',
        table: {
          head: ['Category', 'Examples'],
          rows: [
            ['Identity', 'Surname, first name, title and, where applicable, a photograph appearing on a document provided.'],
            ['Contact details', 'Email address, telephone number, business or postal address.'],
            ['Professional data', 'Role, organisation, sector of activity, professional profile and purpose of the relationship.'],
            ['Requests and exchanges', 'Subject, message content, attachments and history of exchanges.'],
            ['Applications', 'CV, qualifications, experience, skills, references and information required for recruitment.'],
            ['Technical data', 'IP address, browser, device, operating system, connection logs and security data.'],
            ['Browsing and preferences', 'Pages viewed, visit duration, traffic source, language and consent preferences.'],
          ],
        },
        body: `${nom} SA does not ask users to provide sensitive data in its general forms. Everyone is invited to submit only the information strictly necessary for their request.`,
      },
      {
        heading: '5. Sources of data',
        body: `Data may be collected directly from the data subject, automatically during browsing, from a subsidiary or an authorised partner, or from publicly available professional sources where such use is lawful, relevant and compatible with the purpose pursued.`,
      },
      {
        heading: '6. Purposes of processing',
        table: {
          head: ['Purpose', 'Data mainly concerned'],
          rows: [
            ['Responding to general enquiries', 'Identity, contact details, organisation, subject and content of the request.'],
            ['Managing institutional relations and partnerships', 'Identity, role, organisation, project and history of exchanges.'],
            ['Processing applications', 'CV, qualifications, career history, contact details, references and recruitment assessments.'],
            ['Managing press relations', 'Identity, media outlet, role, contact details and request.'],
            ['Sending institutional communications', 'Name, email, areas of interest and proof of consent.'],
            ['Measuring and improving audience', 'Browsing data, device, pages viewed and traffic source.'],
            ['Ensuring Website security', 'IP address, logs, technical events and data required to detect incidents.'],
            ['Complying with legal obligations', 'Data required for formalities, controls, audits, claims and litigation.'],
          ],
        },
      },
      {
        heading: '7. Legal bases for processing',
        body: [
          `Depending on the nature of the processing and applicable requirements, ${nom} SA relies in particular on the data subject's consent, the performance of pre-contractual or contractual measures, compliance with a legal or regulatory obligation, or the pursuit of a legitimate interest compatible with the person's rights and freedoms.`,
          `Where consent is required, it is obtained through a positive action that is freely given, specific, informed and unambiguous. It may be withdrawn at any time, without affecting the lawfulness of processing carried out before withdrawal.`,
        ],
      },
      {
        heading: '8. Mandatory or optional information',
        body: `Fields marked as mandatory are required to handle the request. Without them, ${nom} SA may be unable to respond. Other fields are optional and help direct or personalise the response.`,
      },
      {
        heading: '9. Recipients of the data',
        body: [
          `Within the limits of their remit and on a need-to-know basis, the data may be accessible to the relevant departments of ${nom} SA, in particular the Executive Management, the Marketing and Communication Department, the Human Resources Department, the legal, compliance, audit and information systems functions, and the departments concerned by the request.`,
          `It may also be disclosed to a subsidiary where the request concerns it, to contractually authorised technical providers, to the Group's professional advisers, and to the competent administrative or judicial authorities where the law so requires.`,
        ],
      },
      {
        heading: '10. Forwarding to subsidiaries',
        body: `Where a request directly concerns a subsidiary, ${nom} SA may forward the information necessary for that subsidiary to examine and respond to the request. The recipient subsidiary processes the data in accordance with the rules applicable to it and with the information brought to the data subject's attention.`,
      },
      {
        heading: '11. Processors and service providers',
        body: `${nom} SA may use service providers for hosting, maintenance, security, audience measurement, sending communications, relationship management, collecting applications or protection against automated submissions. Such providers may process the data only on documented instructions and within the limits necessary for their assignment.`,
      },
      {
        heading: '12. Transfers of data outside Burkina Faso',
        body: `Certain providers or tools may involve hosting, access or transfer of data outside Burkina Faso. Any international transfer is governed in accordance with ${c.loiEn} and the requirements of the CIL. ${nom} SA verifies in particular the destination, purpose, level of protection and applicable contractual, organisational and technical safeguards.`,
      },
      {
        heading: '13. Retention periods',
        body: `Data is retained for no longer than necessary for the purposes for which it was collected, extended, where justified, by the archiving periods required to meet legal, regulatory, evidential or litigation obligations.`,
        table: {
          head: ['Processing', 'Retention rule'],
          rows: [
            ['General enquiries', 'Duration of the handling of the request, then limited archiving according to the nature of the exchange.'],
            ['Institutional relations and partnerships', 'Duration of the relationship and the period necessary to monitor commitments or obligations.'],
            ['Successful applications', 'Inclusion in the administrative file in accordance with the rules applicable to staff.'],
            ['Unsuccessful applications', 'Period notified to the candidate and validated by the Human Resources Department and Legal Counsel.'],
            ['Institutional communications', 'Until consent is withdrawn or the inactivity threshold defined by internal policy is reached.'],
            ['Logs and security', 'Period proportionate to security, audit and evidential needs.'],
            ['Cookies', 'Periods specified in the Cookie Policy.'],
          ],
        },
      },
      {
        heading: '14. Security and confidentiality',
        body: [
          `${nom} SA implements technical and organisational measures appropriate to the nature of the data, the purposes, the context and the risks. These may include access control, rights management, authentication, encryption of exchanges, logging, backups, infrastructure security, confidentiality undertakings, incident management procedures and provider audits.`,
          `As no system can guarantee absolute security, ${nom} SA regularly adapts its measures to the risks and to reasonably available technical developments.`,
        ],
      },
      {
        heading: '15. Rights of individuals',
        body: [
          `Under the conditions and within the limits provided by applicable law, any data subject may request access to the data concerning them, its rectification, updating or erasure, or exercise the right to be forgotten, object to certain processing, withdraw consent and exercise the other rights granted by law.`,
          `Data subjects may also refer the matter to the Data Protection Authority if they consider that their rights are not being respected. CIL website: ${c.cilUrl}`,
        ],
      },
      {
        heading: '16. Exercising rights',
        body: [
          `Any request to exercise rights must be sent to ${nom} SA using the dedicated form or the email address indicated below. It must specify the right exercised, the processing concerned and the information enabling the data to be located.`,
          `Proof of identity will be requested only where necessary to prevent disclosure to a third party or to confirm the requester's identity. Supporting documents received are used solely to handle the request and are kept for the strictly necessary period.`,
          `Requests may be sent to ${c.emailJuridique} or by post to: ${nom}, Legal Department, ${c.adressePostale}.`,
        ],
      },
      {
        heading: '17. Data relating to applications',
        body: [
          `Information provided by candidates is used to analyse profiles, arrange interviews, assess suitability for positions, compile recruitment files and, where the candidate has been informed, consider other opportunities within the Group or its subsidiaries.`,
          `Candidates are asked not to submit excessive or sensitive data without necessity. Professional references should be provided only after the persons concerned have been informed.`,
        ],
      },
      {
        heading: '18. Institutional communications',
        body: `Subscription to a newsletter or mailing list is voluntary. Users may unsubscribe at any time using the link provided in each communication or by contacting ${nom} SA. Withdrawal of consent does not affect the lawfulness of previous mailings.`,
      },
      {
        heading: '19. Minors',
        body: `The Website is not primarily intended for minors. Where ${nom} SA receives data concerning a minor, it verifies the relevance of the processing and implements the measures required by applicable legislation, in particular regarding information, consent or authorisation from the legal representative.`,
      },
      {
        heading: '20. Complaints and incidents',
        body: `Anyone may report a difficulty or a suspected breach of the confidentiality of their data using the contact details given in this Policy. ${nom} SA analyses reports and takes appropriate measures, including the required security, documentation, information and notification actions.`,
      },
      {
        heading: '21. Updates to this Policy',
        body: `This Policy may be amended to reflect changes in processing, digital services, providers, the organisation of the Group or the legal framework. The version published on the Website is accompanied by its update date. Any substantial change may be the subject of specific notice.`,
      },
      {
        heading: '22. Contact',
        body: [
          `For any question concerning this Policy or the processing of personal data, data subjects may contact ${nom} at ${c.emailJuridique}, write to the Legal Department, ${c.adressePostale}, or use the form provided on the Website.`,
        ],
      },
    ],
  }
}

export default function confidentialite(lang, c) {
  return lang === 'en' ? en(c) : fr(c)
}
