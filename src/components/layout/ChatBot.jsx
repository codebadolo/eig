import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'
import { useLang } from '../../contexts/LangContext'
import FaIcon from '../ui/FaIcon'

function normalize(str) {
  return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}

const RULES_FR = [
  {
    test: /bonjour|salut|hello|bonsoir|coucou|hi\b|hey\b/,
    reply: (c) => ({ text: `Bonjour ! Je suis l'assistant virtuel d'${c.nom}. Je peux vous renseigner sur nos activités, filiales, métiers, recrutement, investissement ou nos coordonnées. Comment puis-je vous aider ?` }),
  },
  {
    test: /qui etes|qui est eig|c.est quoi|qu.est.ce que|presentation|a propos|holding|groupe eig|excellis/,
    reply: (c) => ({
      text: `${c.nom} est une holding multisectorielle capitalisée à 20 milliards FCFA, développant ses activités dans plusieurs secteurs stratégiques en Afrique. Nous pilotons ${c.filialesCount} filiales opérationnelles avec plus de 700 collaborateurs.`,
      links: [{ label: 'Découvrir le groupe', to: '/le-groupe' }],
    }),
  },
  {
    test: /fond[eé]|creat|histoir|depuis quand|origine|date|ann[eé]e|2019/,
    reply: () => ({
      text: `Excellis Invest Group a été fondé en 2019 à Ouagadougou, Burkina Faso. En quelques années, le groupe s'est imposé comme un acteur de référence de l'investissement multisectoriel en Afrique.`,
      links: [{ label: 'Notre histoire', to: '/le-groupe' }],
    }),
  },
  {
    test: /mission|vision|valeur|strategi|objectif|ambition|why|pourquoi/,
    reply: () => ({
      text: `La vision d'Excellis Invest Group est d'être un investisseur panafricain de référence. Notre mission : mobiliser des capitaux pour financer des entreprises structurantes en Afrique, en créant des synergies inter-sectorielles.`,
      links: [{ label: 'Notre modèle', to: '/le-groupe' }],
    }),
  },
  {
    test: /pays|burkina|ouagadougou|abidjan|cote.d.ivoire|afrique|geographi|implant|region|zone/,
    reply: () => ({
      text: `Excellis Invest Group opère principalement au Burkina Faso (siège à Ouagadougou) et en Côte d'Ivoire (Abidjan), avec une vocation à étendre son empreinte sur l'ensemble du continent africain.`,
      links: [{ label: 'Voir nos filiales', to: '/nos-filiales' }],
    }),
  },
  {
    test: /collaborateur|employe|salarie|effectif|combien de personne|taille|staff|ressource humain/,
    reply: () => ({ text: `Excellis Invest Group emploie plus de 700 collaborateurs répartis dans ses filiales au Burkina Faso et en Côte d'Ivoire.` }),
  },
  {
    test: /secteur|metier|domaine|activit|branche|specialit|que fait/,
    reply: (c) => ({
      text: `Excellis Invest Group intervient dans ${c.metiersCount} secteurs stratégiques : ${c.metiersList}.`,
      links: [{ label: 'Voir nos métiers', to: '/nos-metiers' }],
    }),
  },
  {
    test: /service.financ|banque|credit|pret|microfinanc|epargne|coris|bourse|march[eé].financ|brvm|asset management/,
    reply: () => ({
      text: `Dans le domaine des services financiers, Excellis Invest Group opère à travers plusieurs filiales spécialisées dans le crédit, la gestion de créances, la bourse et la gestion d'actifs.`,
      links: [{ label: 'Services Financiers', to: '/nos-metiers/services-financiers' }],
    }),
  },
  {
    test: /assuranc|iard|vie|dommage|sinistre|couverture/,
    reply: () => ({
      text: `Excellis Invest Group est présent dans l'assurance vie et non vie au Burkina Faso et en Côte d'Ivoire, sous régulation CIMA.`,
      links: [{ label: 'Assurance', to: '/nos-metiers/assurance' }],
    }),
  },
  {
    test: /[eé]nergi|solaire|electricit|renouvelabl|production|petrol/,
    reply: () => ({
      text: `Excellis Invest Group développe des projets dans l'énergie : distribution de produits pétroliers, solutions solaires et ingénierie de production d'énergie.`,
      links: [{ label: 'Énergie', to: '/nos-metiers/energie' }],
    }),
  },
  {
    test: /tech|fintech|digital|numerique|mobile money|innovation|startup|application|monetique/,
    reply: () => ({
      text: `Excellis Invest Group accompagne la transformation digitale en Afrique à travers des solutions numériques et des services financiers digitaux, notamment via sa filiale Excelis.`,
      links: [{ label: 'Solutions numériques', to: '/nos-metiers/technologies-fintech' }],
    }),
  },
  {
    test: /immobilier|foncier|patrimoine|construction|promotion/,
    reply: () => ({
      text: `Excellis Invest Group intervient dans l'immobilier : promotion immobilière, maîtrise d'ouvrage déléguée et tierce détention.`,
      links: [{ label: 'Immobilier', to: '/nos-metiers/immobilier-capital' }],
    }),
  },
  {
    test: /hotel|restaur|hospitali|hebergement|tourisme/,
    reply: () => ({
      text: `Excellis Invest Group est présent dans l'hôtellerie et la restauration haut de gamme, avec des établissements positionnés sur le segment professionnel et institutionnel.`,
      links: [{ label: 'Hôtellerie', to: '/nos-metiers/hotellerie' }],
    }),
  },
  {
    test: /agri|agriculture|agroalimentaire|agrobusiness/,
    reply: () => ({
      text: `Excellis Invest Group développe sa présence dans le secteur de l'agribusiness pour accompagner la transformation des filières agricoles africaines.`,
      links: [{ label: 'Agribusiness', to: '/nos-metiers/agribusiness' }],
    }),
  },
  {
    test: /logistique|minier|transport|mine|extractif/,
    reply: () => ({
      text: `Excellis Invest Group intervient dans la distribution de produits pétroliers, l'ingénierie et la production d'énergie, ainsi que dans les services logistiques pour les industries extractives.`,
      links: [{ label: 'Distribution & Énergie', to: '/nos-metiers/logistique-miniere' }],
    }),
  },
  {
    test: /filiale|societe|entreprise|entit|subsidiai|portefeuill/,
    reply: (c) => ({
      text: `Excellis Invest Group pilote ${c.filialesCount} filiales opérationnelles au Burkina Faso et en Côte d'Ivoire. Chaque filiale dispose d'une autonomie opérationnelle tout en bénéficiant du soutien stratégique du groupe.`,
      links: [{ label: 'Voir nos filiales', to: '/nos-filiales' }],
    }),
  },
  {
    test: /bloomfield|notation|rating|note|evaluation|credit.rating/,
    reply: () => ({
      text: `Excellis Invest Group a obtenu une notation A− (long terme) / A2 (court terme) de Bloomfield Investment Corporation. Cette notation traduit la solidité financière et la bonne gouvernance du groupe.`,
      links: [{ label: 'Gouvernance', to: '/gouvernance' }],
    }),
  },
  {
    test: /gouvern|direct|dirigeant|president|pdg|conseil|management|equipe|responsable/,
    reply: () => ({
      text: `La gouvernance d'Excellis Invest Group repose sur des principes de transparence, de performance et de responsabilité, avec un conseil d'administration actif et une équipe dirigeante expérimentée.`,
      links: [{ label: 'Voir la gouvernance', to: '/gouvernance' }],
    }),
  },
  {
    test: /rse|responsabilit[eé]|social|environnement|durable|impact|communaut/,
    reply: () => ({
      text: `Excellis Invest Group intègre la responsabilité sociale dans sa stratégie. Le groupe s'engage pour la création d'emplois, le développement de compétences et l'inclusion financière en Afrique.`,
      links: [{ label: 'Le groupe', to: '/le-groupe' }],
    }),
  },
  {
    test: /invest|partenaire|actionnaire|opportunit|collaboration|accord|cooperation/,
    reply: () => ({
      text: `Vous souhaitez investir ou devenir partenaire stratégique d'Excellis Invest Group ? Contactez-nous pour soumettre votre proposition.`,
      links: [{ label: 'Nous contacter', to: '/contact' }],
    }),
  },
  {
    test: /fournisseur|prestataire|appel.offre|marche|sous.traitant|achat/,
    reply: () => ({
      text: `Pour toute demande de partenariat commercial ou candidature en tant que fournisseur, contactez-nous via notre formulaire en ligne.`,
      links: [{ label: 'Nous contacter', to: '/contact' }],
    }),
  },
  {
    test: /emploi|job|recrut|carri|stage|poste|travail|offre|cdi|cdd|alternance|candidature/,
    reply: () => ({
      text: `Excellis Invest Group recrute régulièrement dans ses filiales au Burkina Faso et en Côte d'Ivoire. Consultez nos offres en ligne et postulez directement.`,
      links: [{ label: "Voir les offres d'emploi", to: '/carrieres' }],
    }),
  },
  {
    test: /actualit|news|presse|communique|article|evenement|publication/,
    reply: () => ({
      text: `Retrouvez toute l'actualité d'Excellis Invest Group et de ses filiales : communiqués de presse, temps forts institutionnels et publications.`,
      links: [{ label: 'Voir les actualités', to: '/actualites' }],
    }),
  },
  {
    test: /contact|telephone|email|adresse|joindre|siege|localisation|ou etes|formulaire/,
    reply: () => ({
      text: `Notre siège est à Ouagadougou, Burkina Faso. Vous pouvez nous joindre via notre formulaire de contact pour toute demande.`,
      links: [{ label: 'Formulaire de contact', to: '/contact' }],
    }),
  },
  {
    test: /merci|thanks|parfait|super|tres bien|d.accord|ok\b|nickel|genial|bravo/,
    reply: () => ({ text: `Avec plaisir ! N'hésitez pas si vous avez d'autres questions. Bonne visite sur notre site !` }),
  },
  {
    test: /au revoir|bye|bonne journee|bonne soiree|a bientot|ciao|tchao/,
    reply: (c) => ({ text: `Au revoir ! Merci pour votre intérêt pour ${c.nom}. À bientôt.` }),
  },
]

const RULES_EN = [
  {
    test: /hello|hi\b|hey\b|good morning|good evening/,
    reply: (c) => ({ text: `Hello! I'm the virtual assistant of ${c.nom}. I can help you with our activities, subsidiaries, businesses, recruitment, investment or contact details. How can I help?` }),
  },
  {
    test: /who are|what is eig|what is|presentation|about|holding|eig group|excellis/,
    reply: (c) => ({
      text: `${c.nom} is a multisectoral holding capitalised at 20 billion FCFA, developing its activities across several strategic sectors in Africa. We manage ${c.filialesCount} operational subsidiaries with over 700 employees.`,
      links: [{ label: 'Discover the group', to: '/le-groupe' }],
    }),
  },
  {
    test: /found|creat|histor|when|origin|date|year|2019/,
    reply: () => ({
      text: `Excellis Invest Group was founded in 2019 in Ouagadougou, Burkina Faso. In a few years, the group has established itself as a reference investor in multi-sectoral investment in Africa.`,
      links: [{ label: 'Our history', to: '/le-groupe' }],
    }),
  },
  {
    test: /mission|vision|value|strateg|objectiv|ambition|why/,
    reply: () => ({
      text: `Excellis Invest Group's vision is to be a reference pan-African investor. Our mission: mobilise capital to finance structuring enterprises in Africa, creating cross-sector synergies.`,
      links: [{ label: 'Our model', to: '/le-groupe' }],
    }),
  },
  {
    test: /countr|burkina|ouagadougou|abidjan|ivory|africa|geograph|region/,
    reply: () => ({
      text: `Excellis Invest Group operates primarily in Burkina Faso (headquarters in Ouagadougou) and Côte d'Ivoire (Abidjan), with ambitions to expand across the African continent.`,
      links: [{ label: 'See our subsidiaries', to: '/nos-filiales' }],
    }),
  },
  {
    test: /employee|staff|collaborat|how many people|size|workforce/,
    reply: () => ({ text: `Excellis Invest Group employs over 700 employees across its subsidiaries in Burkina Faso and Côte d'Ivoire.` }),
  },
  {
    test: /sector|business|domain|activit|branch|what do/,
    reply: (c) => ({
      text: `Excellis Invest Group operates in ${c.metiersCount} strategic sectors: ${c.metiersList}.`,
      links: [{ label: 'See our businesses', to: '/nos-metiers' }],
    }),
  },
  {
    test: /financ.service|bank|credit|loan|microfinanc|saving|stock|market|brvm|asset management/,
    reply: () => ({
      text: `In financial services, Excellis Invest Group operates through subsidiaries specialised in credit, debt recovery, stock brokerage and asset management.`,
      links: [{ label: 'Financial Services', to: '/nos-metiers/services-financiers' }],
    }),
  },
  {
    test: /insur|iard|life|damage|coverage/,
    reply: () => ({
      text: `Excellis Invest Group is present in life and non-life insurance in Burkina Faso and Côte d'Ivoire, regulated by CIMA.`,
      links: [{ label: 'Insurance', to: '/nos-metiers/assurance' }],
    }),
  },
  {
    test: /energ|solar|electric|renew|petrol|oil/,
    reply: () => ({
      text: `Excellis Invest Group develops projects in energy: petroleum product distribution, solar solutions and energy production engineering.`,
      links: [{ label: 'Energy', to: '/nos-metiers/energie' }],
    }),
  },
  {
    test: /tech|fintech|digital|mobile money|innovation|startup|app|payment/,
    reply: () => ({
      text: `Excellis Invest Group supports digital transformation in Africa through digital solutions and digital financial services, notably via its Excelis subsidiary.`,
      links: [{ label: 'Digital Solutions', to: '/nos-metiers/technologies-fintech' }],
    }),
  },
  {
    test: /real.estate|property|construction|promoter/,
    reply: () => ({
      text: `Excellis Invest Group operates in real estate: property development, delegated project ownership and third-party custody.`,
      links: [{ label: 'Real Estate', to: '/nos-metiers/immobilier-capital' }],
    }),
  },
  {
    test: /hotel|restaur|hospitali|accommodat|tourism/,
    reply: () => ({
      text: `Excellis Invest Group is present in premium hospitality and restaurant services, positioned on the professional and institutional segment.`,
      links: [{ label: 'Hospitality', to: '/nos-metiers/hotellerie' }],
    }),
  },
  {
    test: /agri|agricultur|agribusiness|food/,
    reply: () => ({
      text: `Excellis Invest Group is developing its presence in agribusiness to support the transformation of African agricultural value chains.`,
      links: [{ label: 'Agribusiness', to: '/nos-metiers/agribusiness' }],
    }),
  },
  {
    test: /logist|mining|transport|mine|extract/,
    reply: () => ({
      text: `Excellis Invest Group operates in petroleum product distribution, energy engineering and production, as well as logistics services for extractive industries.`,
      links: [{ label: 'Distribution & Energy', to: '/nos-metiers/logistique-miniere' }],
    }),
  },
  {
    test: /subsidiar|compan|entit|portfolio/,
    reply: (c) => ({
      text: `Excellis Invest Group manages ${c.filialesCount} operational subsidiaries in Burkina Faso and Côte d'Ivoire, each with operational autonomy and strategic group support.`,
      links: [{ label: 'See our subsidiaries', to: '/nos-filiales' }],
    }),
  },
  {
    test: /bloomfield|rating|note|evaluat|credit/,
    reply: () => ({
      text: `Excellis Invest Group has received an A− long-term / A2 short-term rating from Bloomfield Investment Corporation, reflecting its financial strength and sound governance.`,
      links: [{ label: 'Governance', to: '/gouvernance' }],
    }),
  },
  {
    test: /governan|direct|leader|president|ceo|board|management|team/,
    reply: () => ({
      text: `Excellis Invest Group's governance is built on transparency, performance and accountability, with an active board of directors and an experienced management team.`,
      links: [{ label: 'View governance', to: '/gouvernance' }],
    }),
  },
  {
    test: /csr|responsib|social|environment|sustainab|impact|communit/,
    reply: () => ({
      text: `Excellis Invest Group integrates social responsibility into its strategy, committed to job creation, skills development and financial inclusion in Africa.`,
      links: [{ label: 'The group', to: '/le-groupe' }],
    }),
  },
  {
    test: /invest|partner|sharehold|opportunit|collaborat/,
    reply: () => ({
      text: `Interested in investing or becoming a strategic partner of Excellis Invest Group? Contact us to submit your proposal.`,
      links: [{ label: 'Contact us', to: '/contact' }],
    }),
  },
  {
    test: /supplier|vendor|tender|procurement/,
    reply: () => ({
      text: `For any commercial partnership request or supplier application, contact us via our online form specifying your field of activity.`,
      links: [{ label: 'Contact us', to: '/contact' }],
    }),
  },
  {
    test: /job|recruit|career|intern|position|work|offer|apply/,
    reply: () => ({
      text: `Excellis Invest Group regularly recruits across its subsidiaries in Burkina Faso and Côte d'Ivoire. View our open positions and apply online.`,
      links: [{ label: 'View job offers', to: '/carrieres' }],
    }),
  },
  {
    test: /news|press|article|event|publication/,
    reply: () => ({
      text: `Find all Excellis Invest Group news: press releases, institutional highlights and publications.`,
      links: [{ label: 'View news', to: '/actualites' }],
    }),
  },
  {
    test: /contact|phone|email|address|reach|headquarters|where|form/,
    reply: () => ({
      text: `Our headquarters is in Ouagadougou, Burkina Faso. You can reach us via our contact form for any enquiry.`,
      links: [{ label: 'Contact form', to: '/contact' }],
    }),
  },
  {
    test: /thank|perfect|great|good|alright|ok\b|nice|wonderful/,
    reply: () => ({ text: `You're welcome! Feel free to ask if you have more questions. Enjoy your visit!` }),
  },
  {
    test: /goodbye|bye|good day|see you|ciao/,
    reply: (c) => ({ text: `Goodbye! Thank you for your interest in ${c.nom}. See you soon.` }),
  },
]

function getResponse(input, ctx, lang) {
  const m = normalize(input)
  const rules = lang === 'en' ? RULES_EN : RULES_FR
  const rule = rules.find(r => r.test.test(m))
  if (rule) return rule.reply(ctx)
  return lang === 'en'
    ? { text: `I didn't quite understand your question. You can ask me about: our businesses, subsidiaries, governance, history, recruitment, investment, news or contact details.` }
    : { text: `Je n'ai pas bien compris votre question. Vous pouvez m'interroger sur : nos métiers, filiales, gouvernance, histoire, recrutement, investissement, actualités ou contact.` }
}

export default function ChatBot() {
  const { lang } = useLang()
  const isEN = lang === 'en'

  const greeting = isEN
    ? "Hello 👋 I'm Excellis Invest Group's virtual assistant. How can I help you?"
    : "Bonjour 👋 Je suis l'assistant virtuel d'Excellis Invest Group. Comment puis-je vous aider ?"

  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ from: 'bot', text: greeting }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)
  const containerRef = useRef(null)
  const { pathname } = useLocation()

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

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  // Reset greeting message when language changes
  useEffect(() => {
    setMessages([{ from: 'bot', text: greeting }])
  }, [lang]) // eslint-disable-line react-hooks/exhaustive-deps

  const send = () => {
    const text = input.trim()
    if (!text) return
    setMessages(prev => [...prev, { from: 'user', text }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, { from: 'bot', ...getResponse(text, ctx, lang) }])
    }, 700)
  }

  return (
    <div ref={containerRef}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? (isEN ? 'Close chat' : 'Fermer le chat') : (isEN ? 'Open chat' : 'Ouvrir le chat')}
        className="chatbot-fab"
      >
        {open
          ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        }
      </button>

      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-avatar">💬</div>
            <div>
              <div className="chatbot-header-name">
                {isEN ? 'Excellis Invest Group Assistant' : 'Assistant Excellis Invest Group'}
              </div>
              <div className="chatbot-header-status">
                <span className="chatbot-dot" /> {isEN ? 'Online' : 'En ligne'}
              </div>
            </div>
          </div>

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
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
                  >
                    <FaIcon name="arrow-right" size={12} /> {l.label}
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

          <div className="chatbot-input-row">
            <input
              className="chatbot-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder={isEN ? 'Your question…' : 'Votre question…'}
              autoFocus
            />
            <button className="chatbot-send" onClick={send} aria-label={isEN ? 'Send' : 'Envoyer'}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
