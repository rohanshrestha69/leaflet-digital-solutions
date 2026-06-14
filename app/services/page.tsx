// app/services/page.tsx
import ServicesPage from "@/features/services/pages/services-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services — Leaflet Digital Solutions",
  description:
    "Explore Leaflet's core creative offerings — Website Design, Branding, UX/UI, Motion, SEO, Content, Landing Pages and Web Development.",
}

export default function Page() {
  return <ServicesPage />
}