import {
  FaLinkedinIn, FaFacebookF, FaXTwitter, FaInstagram,
  FaYoutube, FaTiktok, FaWhatsapp, FaGlobe,
} from 'react-icons/fa6'

export const SOCIAL_NETWORKS = {
  linkedin:  { label: 'LinkedIn',    color: '#0a66c2', Icon: FaLinkedinIn, href: v => v },
  facebook:  { label: 'Facebook',    color: '#1877f2', Icon: FaFacebookF,  href: v => v },
  twitter:   { label: 'X / Twitter', color: '#000000', Icon: FaXTwitter,   href: v => v },
  instagram: { label: 'Instagram',   color: '#e1306c', Icon: FaInstagram,  href: v => v },
  youtube:   { label: 'YouTube',     color: '#ff0000', Icon: FaYoutube,    href: v => v },
  tiktok:    { label: 'TikTok',      color: '#000000', Icon: FaTiktok,     href: v => v },
  whatsapp:  { label: 'WhatsApp',    color: '#25d366', Icon: FaWhatsapp,   href: v => `https://wa.me/${v.replace(/\D/g, '')}` },
  website:   { label: 'Site web',    color: 'var(--teal-dark)', Icon: FaGlobe, href: v => v },
}

export default function SocialIcon({ network, size = 16, style, className }) {
  const { Icon } = SOCIAL_NETWORKS[network] || {}
  if (!Icon) return null
  return <Icon size={size} style={style} className={className} />
}
