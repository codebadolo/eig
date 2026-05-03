import {
  Briefcase, ShieldCheck, TrendingUp, Building2, Zap, Cpu,
  Printer, Truck, BedDouble, Factory, Settings2, Sun, Droplets,
  Mountain, Ship, Gavel, Landmark, Scale, RefreshCw, Lightbulb,
  HeartHandshake, Globe, GraduationCap, Coins, MapPin, Mail,
  Phone, Users, Star, Newspaper, Rocket, Leaf, BarChart3,
  Award, Trophy, Home, Package,
} from 'lucide-react'

const ICON_MAP = {
  briefcase:        Briefcase,
  'shield-halved':  ShieldCheck,
  'chart-line':     TrendingUp,
  building:         Building2,
  bolt:             Zap,
  microchip:        Cpu,
  print:            Printer,
  truck:            Truck,
  hotel:            BedDouble,
  industry:         Factory,
  cogs:             Settings2,
  'solar-panel':    Sun,
  'oil-can':        Droplets,
  mountain:         Mountain,
  ship:             Ship,
  gavel:            Gavel,
  university:       Landmark,
  'scale-balanced': Scale,
  'arrows-rotate':  RefreshCw,
  lightbulb:        Lightbulb,
  handshake:        HeartHandshake,
  globe:            Globe,
  'graduation-cap': GraduationCap,
  coins:            Coins,
  'location-dot':   MapPin,
  envelope:         Mail,
  phone:            Phone,
  users:            Users,
  star:             Star,
  newspaper:        Newspaper,
  rocket:           Rocket,
  leaf:             Leaf,
  'chart-bar':      BarChart3,
  award:            Award,
  trophy:           Trophy,
  house:            Home,
  'box-open':       Package,
}

export const ICON_LIST = Object.keys(ICON_MAP)

export default function FaIcon({ name, className, style, size = 20 }) {
  const Icon = ICON_MAP[name]
  if (!Icon) return <span style={style} className={className}>{name}</span>
  return <Icon size={size} className={className} style={style} strokeWidth={1.5} />
}
