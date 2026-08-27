import {
  FaLinkedinIn, FaFacebookF, FaXTwitter, FaInstagram,
  FaYoutube, FaTiktok, FaWhatsapp, FaGlobe,
} from 'react-icons/fa6'

// Charte EIG : les icônes sociales sont déclinées en doré plutôt qu'aux
// couleurs de marque de chaque plateforme, pour rester cohérentes avec
// l'identité du Groupe. Une seule valeur à changer ici pour toutes les pages.
const OR = 'var(--gold)'

export const SOCIAL_NETWORKS = {
  linkedin:  { label: 'LinkedIn',    color: OR, Icon: FaLinkedinIn, href: v => v },
  facebook:  { label: 'Facebook',    color: OR, Icon: FaFacebookF,  href: v => v },
  twitter:   { label: 'X / Twitter', color: OR, Icon: FaXTwitter,   href: v => v },
  instagram: { label: 'Instagram',   color: OR, Icon: FaInstagram,  href: v => v },
  youtube:   { label: 'YouTube',     color: OR, Icon: FaYoutube,    href: v => v },
  tiktok:    { label: 'TikTok',      color: OR, Icon: FaTiktok,     href: v => v },
  whatsapp:  { label: 'WhatsApp',    color: OR, Icon: FaWhatsapp,   href: v => `https://wa.me/${v.replace(/\D/g, '')}` },
  website:   { label: 'Site web',    color: OR, Icon: FaGlobe, href: v => v },
}

export default function SocialIcon({ network, size = 16, style, className }) {
  const { Icon } = SOCIAL_NETWORKS[network] || {}
  if (!Icon) return null
  return <Icon size={size} style={style} className={className} />
}
