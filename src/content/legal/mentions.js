/**
 * Mentions légales — texte de référence issu du document juridique
 * « Pages juridiques du site Excellis Invest Group », version 1.0 du 26 août 2026.
 *
 * Les valeurs institutionnelles (raison sociale, adresse, RCCM…) sont injectées
 * depuis la fiche société afin de rester modifiables depuis l'administration ;
 * les valeurs du document servent de repli.
 */

import { elide, TODO } from './shared'

const VERSION_FR = 'Version 1.0 — Dernière mise à jour : 26 août 2026'
const VERSION_EN = 'Version 1.0 — Last updated: 26 August 2026'

function fr(c) {
  const nom = c.nom
  const dNom = elide(nom)

  return {
    label: 'Informations juridiques',
    title: 'Mentions légales',
    updated: VERSION_FR,
    intro: `Informations relatives à l'éditeur, à l'hébergement et au fonctionnement du site internet ${dNom}.`,
    sections: [
      {
        heading: '1. Éditeur du site',
        body: [
          `Le site internet accessible à l'adresse ${c.site}, ci-après désigné le « Site », est édité par ${nom}, ${c.forme}, au capital social de ${c.capitalLettres} (${c.capital}) francs CFA, immatriculée au Registre du commerce et du crédit mobilier sous le numéro ${c.rccm} et identifiée sous le numéro IFU ${c.ifu}, dont le siège social est établi à ${c.siege}.`,
        ],
        table: {
          head: ['Information', 'Valeur'],
          rows: [
            ['RCCM', c.rccm],
            ['IFU', c.ifu],
            ['Siège social', c.siege],
            ['Adresse postale', c.adressePostale],
            ['Téléphone', c.telephone],
            ['Email', c.email],
            ['Site internet', c.site],
          ],
        },
      },
      {
        heading: '2. Directeur de la publication',
        body: [
          `Le directeur de la publication est ${c.directeurPublication}, agissant en qualité de représentant légal de la société.`,
        ],
      },
      {
        heading: '3. Conception et réalisation',
        body: [
          `La conception graphique, le développement et l'intégration technique du Site ont été réalisés par ${c.prestataire}. Cette mention ne confère au prestataire aucun droit de propriété sur les contenus, marques, données ou actifs immatériels appartenant à ${nom} SA ou à ses filiales.`,
        ],
      },
      {
        heading: '4. Hébergement',
        body: [
          `Le Site est hébergé par le prestataire identifié ci-dessous. L'hébergeur assure la mise à disposition de l'infrastructure technique nécessaire au fonctionnement du Site, dans les limites de ses propres conditions de service.`,
          c.hebergeur,
        ],
      },
      {
        heading: '5. Objet du Site',
        body: [
          `Le Site présente ${nom}, sa vision, sa gouvernance, ses métiers, ses filiales, ses activités, ses actualités, ses opportunités de carrière ainsi que les possibilités de contact, d'investissement et de partenariat. Il poursuit une finalité essentiellement institutionnelle et informative.`,
        ],
      },
      {
        heading: '6. Propriété intellectuelle',
        body: [
          `La structure générale du Site ainsi que les textes, photographies, illustrations, vidéos, éléments graphiques, interfaces, bases de données, documents téléchargeables, signes distinctifs, logos, noms commerciaux et marques qui y figurent sont protégés par les législations applicables en matière de propriété intellectuelle et, le cas échéant, par les droits contractuels de leurs titulaires.`,
          `Sauf autorisation écrite préalable ${dNom} SA ou du titulaire concerné, toute reproduction, représentation, adaptation, traduction, extraction, diffusion, modification, commercialisation ou exploitation, totale ou partielle, des contenus du Site est interdite, quel qu'en soit le procédé ou le support.`,
          `Les marques, dénominations, logos et contenus relatifs aux filiales demeurent la propriété de leurs titulaires respectifs. Leur présence sur le Site ne constitue aucune renonciation à leurs droits.`,
        ],
      },
      {
        heading: '7. Informations institutionnelles et financières',
        body: [
          `Les informations publiées sur le Site sont fournies à titre général et institutionnel. Elles ne constituent ni une offre d'investissement, ni une sollicitation, ni un conseil financier, juridique, fiscal ou commercial, ni une garantie de performance actuelle ou future.`,
          `Toute décision d'investissement, de financement, de souscription ou de partenariat doit reposer sur une analyse indépendante, sur les documents contractuels applicables et, le cas échéant, sur l'accompagnement d'un professionnel habilité.`,
        ],
      },
      {
        heading: '8. Exactitude et actualisation',
        body: [
          `${nom} SA met en œuvre des diligences raisonnables afin d'assurer l'exactitude, la cohérence et l'actualisation des informations publiées. Malgré ces diligences, des erreurs, omissions ou décalages de mise à jour peuvent survenir. ${nom} SA se réserve le droit de corriger ou de mettre à jour les contenus à tout moment, sans préavis.`,
        ],
      },
      {
        heading: '9. Responsabilité',
        body: [
          `${nom} SA ne saurait être tenue responsable des dommages résultant d'une utilisation inappropriée du Site, d'une incompatibilité technique, d'une interruption temporaire, d'un acte de tiers, d'un événement de force majeure ou d'une décision prise sur la seule base d'une information générale publiée sur le Site, sous réserve des responsabilités auxquelles la loi ne permet pas de déroger.`,
        ],
      },
      {
        heading: '10. Liens externes et sites des filiales',
        body: [
          `Le Site peut contenir des liens vers les sites de filiales, partenaires, autorités, médias ou autres tiers. Ces sites disposent de leurs propres conditions d'utilisation et politiques de confidentialité. ${nom} SA n'exerce pas nécessairement de contrôle sur leurs contenus, leur disponibilité ou leurs pratiques et ne saurait être réputée les approuver du seul fait de l'existence d'un lien.`,
        ],
      },
      {
        heading: '11. Données personnelles et cookies',
        body: [
          `Les traitements de données personnelles réalisés au moyen du Site sont décrits dans la Politique de confidentialité. L'utilisation des traceurs et technologies similaires est précisée dans la Politique de gestion des cookies. Ces documents font partie intégrante de l'information juridique mise à la disposition des utilisateurs.`,
        ],
      },
      {
        heading: '12. Droit applicable et contact',
        body: [
          `Les présentes mentions légales sont régies par le droit burkinabè. Pour toute question relative au Site, à ses contenus ou aux présentes mentions, l'utilisateur peut contacter ${nom} SA aux coordonnées publiées sur la page « Contact ».`,
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
    title: 'Legal notice',
    updated: VERSION_EN,
    intro: `Information about the publisher, hosting and operation of the ${nom} website.`,
    sections: [
      {
        heading: '1. Website publisher',
        body: [
          `The website accessible at ${c.site}, hereinafter the "Website", is published by ${nom}, ${c.formeEn}, with a share capital of ${c.capital} CFA francs, registered with the Trade and Personal Property Credit Register under number ${c.rccm} and identified by taxpayer number (IFU) ${c.ifu}, whose registered office is located at ${c.siegeEn}.`,
        ],
        table: {
          head: ['Item', 'Value'],
          rows: [
            ['Trade register (RCCM)', c.rccm],
            ['Taxpayer ID (IFU)', c.ifu],
            ['Registered office', c.siegeEn],
            ['Postal address', c.adressePostale],
            ['Telephone', c.telephone],
            ['Email', c.email],
            ['Website', c.site],
          ],
        },
      },
      {
        heading: '2. Publication director',
        body: [
          `The publication director is ${c.directeurPublicationEn}, acting as legal representative of the company.`,
        ],
      },
      {
        heading: '3. Design and development',
        body: [
          `The graphic design, development and technical integration of the Website were carried out by ${c.prestataire}. This mention confers on the provider no ownership right over the content, trademarks, data or intangible assets belonging to ${nom} SA or its subsidiaries.`,
        ],
      },
      {
        heading: '4. Hosting',
        body: [
          `The Website is hosted by the provider identified below. The host provides the technical infrastructure required for the Website to operate, within the limits of its own terms of service.`,
          c.hebergeurEn,
        ],
      },
      {
        heading: '5. Purpose of the Website',
        body: [
          `The Website presents ${nom}, its vision, governance, business lines, subsidiaries, activities, news and career opportunities, as well as opportunities for contact, investment and partnership. Its purpose is essentially institutional and informative.`,
        ],
      },
      {
        heading: '6. Intellectual property',
        body: [
          `The general structure of the Website, together with the texts, photographs, illustrations, videos, graphic elements, interfaces, databases, downloadable documents, distinctive signs, logos, trade names and trademarks appearing on it, are protected by applicable intellectual property legislation and, where relevant, by the contractual rights of their holders.`,
          `Save with the prior written authorisation of ${nom} SA or of the relevant rights holder, any reproduction, representation, adaptation, translation, extraction, distribution, modification, commercialisation or exploitation, in whole or in part, of the Website's content is prohibited, by any process or on any medium.`,
          `Trademarks, names, logos and content relating to subsidiaries remain the property of their respective holders. Their presence on the Website constitutes no waiver of their rights.`,
        ],
      },
      {
        heading: '7. Institutional and financial information',
        body: [
          `Information published on the Website is provided on a general and institutional basis. It constitutes neither an investment offer, nor a solicitation, nor financial, legal, tax or commercial advice, nor any guarantee of current or future performance.`,
          `Any decision to invest, finance, subscribe or enter into a partnership must be based on independent analysis, on the applicable contractual documents and, where appropriate, on the support of a duly authorised professional.`,
        ],
      },
      {
        heading: '8. Accuracy and updating',
        body: [
          `${nom} SA exercises reasonable diligence to ensure the accuracy, consistency and updating of the information published. Despite such diligence, errors, omissions or delays in updating may occur. ${nom} SA reserves the right to correct or update content at any time, without notice.`,
        ],
      },
      {
        heading: '9. Liability',
        body: [
          `${nom} SA may not be held liable for damage resulting from inappropriate use of the Website, technical incompatibility, temporary interruption, the act of a third party, an event of force majeure, or a decision taken solely on the basis of general information published on the Website, subject to liabilities from which the law does not permit derogation.`,
        ],
      },
      {
        heading: '10. External links and subsidiary websites',
        body: [
          `The Website may contain links to the websites of subsidiaries, partners, authorities, media or other third parties. Those websites have their own terms of use and privacy policies. ${nom} SA does not necessarily exercise control over their content, availability or practices and may not be deemed to endorse them merely because a link exists.`,
        ],
      },
      {
        heading: '11. Personal data and cookies',
        body: [
          `The processing of personal data carried out through the Website is described in the Privacy Policy. The use of trackers and similar technologies is set out in the Cookie Policy. These documents form an integral part of the legal information made available to users.`,
        ],
      },
      {
        heading: '12. Governing law and contact',
        body: [
          `This legal notice is governed by Burkinabè law. For any question relating to the Website, its content or this notice, users may contact ${nom} SA using the details published on the "Contact" page.`,
          `Legal contact: ${c.emailJuridique}.`,
        ],
      },
    ],
  }
}

export default function mentions(lang, c) {
  return lang === 'en' ? en(c) : fr(c)
}
