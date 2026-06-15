// features/services/pages/services-page.tsx
import { ServicesExpertise }    from "../components/services-expertise"
import { ServicesFeaturedWorks } from "../components/services-featured-works"
import { ServicesHero }         from "../components/services-hero"
import { ServicesNumbers }      from "../components/services-numbers"
import { ServicesPartners }     from "../components/services-partners"
import { ServicesTestimonials } from "../components/services-testimonials"
import { ServiceCTA }           from "../components/details/service-cta"
import { ServicesOfferings }    from "../components/services-offerings"
import { ServicesFaqSection }   from "../components/services-faq"

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <ServicesHero />
      <ServicesOfferings />
      <ServicesFeaturedWorks />
      <ServicesPartners />
      <ServicesExpertise />
      <ServicesNumbers />
      <ServicesTestimonials />
      <ServicesFaqSection />
      <ServiceCTA />
    </main>
  )
}