import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'

function normalize(str) {
  return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}

const RULES = [
  // ── Salutations ──
  {
    test: /bonjour|salut|hello|bonsoir|coucou|hi\b|hey\b/,
    reply: (c) => ({ text: `Bonjour ! Je suis l'assistant virtuel d'${c.nom}. Je peux vous renseigner sur nos activités, filiales, métiers, recrutement, investissement ou nos coordonnées. Comment puis-je vous aider ?` }),
  },

  // ── Présentation générale ──
  {
    test: /qui etes|qui est eig|c.est quoi|qu.est.ce que|presentation|a propos|holding|groupe eig|excellis/,
    reply: (c) => ({
      text: `${c.nom} est une holding multisectorielle fondée au Burkina Faso. Nous pilotons ${c.filialesCount} filiales opérationnelles dans ${c.metiersCount} secteurs stratégiques, avec plus de 700 collaborateurs engagés au Burkina Faso et en Côte d'Ivoire.`,
      links: [{ label: 'Découvrir le groupe', to: '/le-groupe' }],
    }),
  },

  // ── Histoire / fondation ──
  {
    test: /fond[eé]|creat|histoir|depuis quand|origine|date|ann[eé]e|2019/,
    reply: () => ({
      text: `Excellis Invest Group a été fondé en 2019 à Ouagadougou, Burkina Faso. En quelques années, le groupe s'est imposé comme un acteur de référence de l'investissement multisectoriel en Afrique de l'Ouest.`,
      links: [{ label: 'Notre histoire', to: '/le-groupe' }],
    }),
  },

  // ── Mission / vision / valeurs ──
  {
    test: /mission|vision|valeur|strategi|objectif|ambition|why|pourquoi/,
    reply: () => ({
      text: `La mission d'EIG est de mobiliser des capitaux pour financer des entreprises structurantes en Afrique de l'Ouest, en créant des synergies inter-sectorielles et en accompagnant le développement économique durable de la région.`,
      links: [{ label: 'Notre modèle', to: '/le-groupe' }],
    }),
  },

  // ── Pays / géographie ──
  {
    test: /pays|burkina|ouagadougou|abidjan|cote.d.ivoire|afrique|geographi|implant|region|zone/,
    reply: () => ({
      text: `EIG opère principalement au Burkina Faso (siège à Ouagadougou) et en Côte d'Ivoire (Abidjan). Le groupe a vocation à étendre son empreinte sur l'ensemble de l'Afrique de l'Ouest.`,
      links: [{ label: 'Voir nos filiales', to: '/nos-filiales' }],
    }),
  },

  // ── Collaborateurs / emplois ──
  {
    test: /collaborateur|employe|salarie|effectif|combien de personne|taille|staff|ressource humain/,
    reply: () => ({ text: `EIG emploie plus de 700 collaborateurs répartis dans ses filiales au Burkina Faso et en Côte d'Ivoire. Chaque filiale dispose de ses propres équipes opérationnelles et managériales.` }),
  },

  // ── Secteurs / métiers ──
  {
    test: /secteur|metier|domaine|activit|branche|specialit|que fait/,
    reply: (c) => ({
      text: `EIG intervient dans ${c.metiersCount} secteurs stratégiques : ${c.metiersList}.`,
      links: [{ label: 'Voir nos métiers', to: '/nos-metiers' }],
    }),
  },

  // ── Services financiers / banque ──
  {
    test: /service.financ|banque|credit|pret|microfinanc|epargne|coris/,
    reply: () => ({
      text: `Dans le domaine des services financiers, EIG opère à travers plusieurs filiales spécialisées dans le crédit, la microfinance et la gestion de créances, contribuant à l'inclusion financière en Afrique de l'Ouest.`,
      links: [{ label: 'Services Financiers', to: '/nos-metiers/services-financiers' }],
    }),
  },

  // ── Assurance ──
  {
    test: /assuranc|iari|vie|dommage|sinistre|couverture/,
    reply: () => ({
      text: `EIG est présent dans le secteur de l'assurance à travers des filiales spécialisées en assurance vie et assurance non-vie, offrant des solutions de couverture adaptées au marché ouest-africain.`,
      links: [{ label: 'Assurance', to: '/nos-metiers/assurance' }],
    }),
  },

  // ── Marchés financiers / bourse ──
  {
    test: /bours|march[eé].financ|action|titre|valeur mobiliere|brvm|sgb|asset management/,
    reply: () => ({
      text: `EIG est actif sur les marchés financiers de l'Afrique de l'Ouest (BRVM) à travers ses filiales de courtage et de gestion d'actifs, proposant des solutions d'investissement aux particuliers et aux institutionnels.`,
      links: [{ label: 'Marchés Financiers', to: '/nos-metiers/marches-financiers' }],
    }),
  },

  // ── Énergie ──
  {
    test: /[eé]nergi|solaire|electricit|renouvelabl|production/,
    reply: () => ({
      text: `EIG développe des projets dans le secteur de l'énergie, notamment en production d'énergie renouvelable, pour répondre aux besoins croissants en électricité de l'Afrique de l'Ouest.`,
      links: [{ label: 'Énergie', to: '/nos-metiers/energie' }],
    }),
  },

  // ── Technologies / Fintech ──
  {
    test: /tech|fintech|digital|numerique|mobile money|innovation|startup|application/,
    reply: () => ({
      text: `Dans le domaine des technologies et de la fintech, EIG accompagne la transformation digitale en Afrique de l'Ouest, notamment à travers des solutions de paiement et des services financiers numériques.`,
      links: [{ label: 'Technologies & Fintech', to: '/nos-metiers/technologies-fintech' }],
    }),
  },

  // ── Immobilier ──
  {
    test: /immobilier|capital.risque|foncier|patrimoine|capital risque/,
    reply: () => ({
      text: `EIG intervient dans l'immobilier et le capital-risque, finançant des projets de construction et d'aménagement, ainsi que des startups à fort potentiel de croissance.`,
      links: [{ label: 'Immobilier & Capital-Risque', to: '/nos-metiers/immobilier-capital' }],
    }),
  },

  // ── Hôtellerie ──
  {
    test: /hotel|restaur|hospitali|hebergement|tourisme/,
    reply: () => ({
      text: `EIG est présent dans le secteur de l'hôtellerie et de la restauration, avec des établissements positionnés sur le segment professionnel et institutionnel au Burkina Faso.`,
      links: [{ label: 'Hôtellerie', to: '/nos-metiers/hotellerie' }],
    }),
  },

  // ── Filiales ──
  {
    test: /filiale|societe|entreprise|entit|subsidiai|portefeuill/,
    reply: (c) => ({
      text: `EIG pilote ${c.filialesCount} filiales opérationnelles au Burkina Faso et en Côte d'Ivoire. Chaque filiale dispose d'une autonomie opérationnelle tout en bénéficiant du soutien stratégique du groupe.`,
      links: [{ label: 'Voir nos filiales', to: '/nos-filiales' }],
    }),
  },

  // ── Notation / Bloomfield ──
  {
    test: /bloomfield|notation|rating|note|bbb|evaluation|credit.rating/,
    reply: () => ({
      text: `EIG a obtenu une notation BBB de Bloomfield Investment Corporation, l'agence de notation de référence en Afrique de l'Ouest. Cette notation traduit la solidité financière et la bonne gouvernance du groupe.`,
      links: [{ label: 'Gouvernance', to: '/gouvernance' }],
    }),
  },

  // ── Gouvernance / direction ──
  {
    test: /gouvern|direct|dirigeant|president|pdg|conseil|management|equipe|responsable/,
    reply: () => ({
      text: `La gouvernance d'EIG repose sur des principes de transparence, de performance et de responsabilité. Le groupe est dirigé par une équipe expérimentée et dispose d'un conseil d'administration actif.`,
      links: [{ label: 'Voir la gouvernance', to: '/gouvernance' }],
    }),
  },

  // ── RSE / impact ──
  {
    test: /rse|responsabilit[eé]|social|environnement|durable|impact|communaut|afrique/,
    reply: () => ({
      text: `EIG intègre la responsabilité sociale et environnementale dans sa stratégie. En tant qu'acteur du développement économique de l'Afrique de l'Ouest, le groupe s'engage pour la création d'emplois, la formation et l'inclusion financière.`,
      links: [{ label: 'Le groupe', to: '/le-groupe' }],
    }),
  },

  // ── Partenariat / investissement ──
  {
    test: /invest|partenaire|actionnaire|opportunit|collaboration|accord|cooperation/,
    reply: () => ({
      text: `Vous souhaitez investir ou devenir partenaire stratégique d'EIG ? Le groupe est ouvert à toutes les opportunités de collaboration sérieuses. Contactez-nous pour soumettre votre proposition.`,
      links: [{ label: 'Nous contacter', to: '/contact' }],
    }),
  },

  // ── Fournisseurs / appels d'offres ──
  {
    test: /fournisseur|prestataire|appel.offre|marche|sous.traitant|achat/,
    reply: () => ({
      text: `Pour toute demande de partenariat commercial ou candidature en tant que fournisseur, contactez-nous via notre formulaire en ligne en précisant votre domaine d'activité et votre offre.`,
      links: [{ label: 'Nous contacter', to: '/contact' }],
    }),
  },

  // ── Recrutement ──
  {
    test: /emploi|job|recrut|carri|stage|poste|travail|offre|cdi|cdd|alternance|candidature/,
    reply: () => ({
      text: `EIG recrute régulièrement dans ses filiales au Burkina Faso et en Côte d'Ivoire : cadres, techniciens, stagiaires. Consultez nos offres en ligne et postulez directement.`,
      links: [{ label: "Voir les offres d'emploi", to: '/carrieres' }],
    }),
  },

  // ── Actualités / presse ──
  {
    test: /actualit|news|presse|communique|article|evenement|publication/,
    reply: () => ({
      text: `Retrouvez toute l'actualité d'EIG et de ses filiales : communiqués de presse, temps forts institutionnels, événements et publications financières.`,
      links: [{ label: 'Voir les actualités', to: '/actualites' }],
    }),
  },

  // ── Contact ──
  {
    test: /contact|telephone|email|adresse|joindre|siege|localisation|ou etes|formulaire/,
    reply: () => ({
      text: `Notre siège est à Ouagadougou, Burkina Faso. Vous pouvez nous joindre via notre formulaire de contact en ligne pour toute demande (partenariat, investissement, presse, recrutement).`,
      links: [{ label: 'Formulaire de contact', to: '/contact' }],
    }),
  },

  // ── Remerciements ──
  {
    test: /merci|thanks|parfait|super|tres bien|d.accord|ok\b|nickel|genial|bravo/,
    reply: () => ({ text: `Avec plaisir ! N'hésitez pas si vous avez d'autres questions. Bonne visite sur notre site !` }),
  },

  // ── Au revoir ──
  {
    test: /au revoir|bye|bonne journee|bonne soiree|a bientot|ciao|tchao/,
    reply: (c) => ({ text: `Au revoir ! Merci pour votre intérêt pour ${c.nom}. À bientôt.` }),
  },
]

function getResponse(input, ctx) {
  const m = normalize(input)
  const rule = RULES.find(r => r.test.test(m))
  if (rule) return rule.reply(ctx)
  return {
    text: `Je n'ai pas bien compris votre question. Vous pouvez m'interroger sur : nos métiers, filiales, gouvernance, histoire, recrutement, investissement, actualités ou contact.`,
  }
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{
    from: 'bot',
    text: "Bonjour 👋 Je suis l'assistant virtuel d'Excellis Invest Group. Comment puis-je vous aider ?",
  }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  const { data: company } = useApi('/company')
  const { data: filiales = [] } = useApi('/filiales?actif=true')
  const { data: metiers = [] } = useApi('/metiers')

  const ctx = {
    nom: company?.nom || 'Excellis Invest Group',
    filialesCount: filiales.length || 17,
    metiersCount: metiers.length || 9,
    metiersList: metiers.map(m => m.titre).join(', ') || 'Services Financiers, Assurance, Énergie…',
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = () => {
    const text = input.trim()
    if (!text) return
    setMessages(prev => [...prev, { from: 'user', text }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, { from: 'bot', ...getResponse(text, ctx) }])
    }, 700)
  }

  return (
    <>
      {/* ── Floating button ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Fermer le chat' : 'Ouvrir le chat'}
        className="chatbot-fab"
      >
        {open
          ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        }
      </button>

      {/* ── Chat window ── */}
      {open && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-avatar">💬</div>
            <div>
              <div className="chatbot-header-name">Assistant EIG</div>
              <div className="chatbot-header-status">
                <span className="chatbot-dot" /> En ligne
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-row chatbot-row--${msg.from}`}>
                <div className={`chatbot-bubble chatbot-bubble--${msg.from}`}>
                  {msg.text}
                </div>
                {msg.links?.map((l, j) => (
                  <Link
                    key={j}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="chatbot-link"
                  >
                    → {l.label}
                  </Link>
                ))}
              </div>
            ))}

            {typing && (
              <div className="chatbot-row chatbot-row--bot">
                <div className="chatbot-bubble chatbot-bubble--bot chatbot-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input-row">
            <input
              className="chatbot-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Votre question…"
              autoFocus
            />
            <button className="chatbot-send" onClick={send} aria-label="Envoyer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
