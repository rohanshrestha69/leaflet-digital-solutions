import {
  type LucideIcon,
  FlaskConical,
  Rocket,
  Sparkles,
} from "lucide-react"

/* -------------------------------------------------------------------------- */
/*                                Story cards                                 */
/* -------------------------------------------------------------------------- */

export type StoryCard = {
  number: string
  title: string
  description: string
  icon: LucideIcon
}

export const storyCards: StoryCard[] = [
  {
    number: "01",
    title: "The Spark",
    description:
      "Leaflet started with a simple belief — world-class digital experiences shouldn't be confined to traditional agency models.",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "The Experiment",
    description:
      "We stripped away the overhead, the bureaucracy, and the bloated timelines to focus purely on value and execution.",
    icon: FlaskConical,
  },
  {
    number: "03",
    title: "The Evolution",
    description:
      "Today we're a global network of elite remote talent, delivering enterprise-grade solutions with startup agility.",
    icon: Rocket,
  },
]

/* -------------------------------------------------------------------------- */
/*                                   Stats                                    */
/* -------------------------------------------------------------------------- */

export type AboutStat = {
  value: string
  label: string
  description: string
}

export const aboutStats: AboutStat[] = [
  {
    value: "8+",
    label: "Years of craft",
    description: "Building digital products with founders since 2017.",
  },
  {
    value: "120+",
    label: "Global talent",
    description: "Designers, engineers, and strategists across 14 countries.",
  },
  {
    value: "94",
    label: "Net promoter score",
    description: "Client satisfaction measured every project.",
  },
  {
    value: "200+",
    label: "Shipped projects",
    description: "From brand systems to production-grade platforms.",
  },
]

/* -------------------------------------------------------------------------- */
/*                                    Team                                    */
/* -------------------------------------------------------------------------- */

export type TeamMember = {
  name: string
  role: string
  bio: string
  image: string
  linkedin?: string
}

export const leadership: TeamMember[] = [
  {
    name: "Aarav Mehta",
    role: "Founder & Creative Director",
    bio: "Aarav shapes the studio's creative direction and partners directly with founders to translate ambition into brand systems that scale. Previously led design at two venture-backed startups before founding Leaflet.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop",
    linkedin: "#",
  },
  {
    name: "Sana Khurana",
    role: "Managing Partner",
    bio: "Sana runs operations and client strategy. With a decade across product, growth, and consulting, she keeps every engagement grounded in measurable outcomes.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=800&fit=crop",
    linkedin: "#",
  },
  {
    name: "Daniyal Rehman",
    role: "Head of Engineering",
    bio: "Daniyal leads the engineering practice — from Webflow handoffs to production-grade product builds. Obsessed with performance, accessibility, and quietly bulletproof systems.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop",
    linkedin: "#",
  },
]

export const directors: TeamMember[] = [
  {
    name: "Ines Carvalho",
    role: "Director, Brand",
    bio: "Ines builds identity systems that hold up across every surface. Her work has shaped category-defining brands in fintech, climate, and consumer.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=800&fit=crop",
    linkedin: "#",
  },
  {
    name: "Marco Tessari",
    role: "Director, Product Design",
    bio: "Marco leads our product design practice with a systems-first lens. He pairs strategy with craft to turn complex workflows into experiences people prefer.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=800&fit=crop",
    linkedin: "#",
  },
  {
    name: "Leila Haddad",
    role: "Director, Growth",
    bio: "Leila partners with clients post-launch — turning brand and product investments into compounding growth through experimentation, content, and conversion design.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=800&fit=crop",
    linkedin: "#",
  },
]