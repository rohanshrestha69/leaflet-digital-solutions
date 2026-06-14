import type { FooterColumn } from "../types"

export const footerColumns: FooterColumn[] = [
  {
    title: "Navigation",
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Journal", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Website Design", href: "/services/website-design" },
      { label: "Branding", href: "/services/branding" },
      { label: "UX / UI", href: "/services/ux-ui" },
      { label: "Web Development", href: "/services/web-development" },
      { label: "SEO", href: "/services/seo" },
      { label: "Content Creation", href: "/services/content" },
    ],
  },
  {
    title: "Locations",
    links: [
      {
        label: "Kathmandu",
        href: "https://maps.google.com/?q=Babar+Mahal,+Kathmandu",
        external: true,
      },
      {
        label: "Chitwan",
        href: "https://maps.google.com/?q=Khairahani,+Chitwan",
        external: true,
      },
      {
        label: "Melbourne",
        href: "https://maps.google.com/?q=Collins+Street,+Melbourne",
        external: true,
      },
    ],
  },
  {
    title: "Socials",
    links: [
      {
        label: "LinkedIn",
        href: "https://linkedin.com/company/leaflet-digital",
        external: true,
      },
      {
        label: "Instagram",
        href: "https://instagram.com/leafletdigital",
        external: true,
      },
      {
        label: "Facebook",
        href: "https://facebook.com/leafletdigital",
        external: true,
      },
      {
        label: "Behance",
        href: "https://behance.net/leafletdigital",
        external: true,
      },
      {
        label: "Dribbble",
        href: "https://dribbble.com/leafletdigital",
        external: true,
      },
    ],
  },
]