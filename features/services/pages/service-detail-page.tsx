import { notFound } from "next/navigation"

import {
  getServiceDetail,
  servicesStats,
  servicesTestimonials,
} from "@/features/marketing/data/services-page"
import { ServiceHero } from "../components/details/service-hero"
import { ServiceIntro } from "../components/details/service-intro"
import { ServiceSubServices } from "../components/details/service-sub-services"
import { ServiceWorks } from "../components/details/service-works"
import { ServiceStats } from "../components/details/service-stats"
import { ServiceProcess } from "../components/details/service-process"
import { ServiceTestimonials } from "../components/details/service-testimonials"
import { ServiceCTA } from "../components/details/service-cta"
import { ServiceFAQs } from "../components/details/service-faqs"


type Props = {
  slug: string
}

export function ServiceDetailPage({ slug }: Props) {
  const detail = getServiceDetail(slug)
  if (!detail) notFound()

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <ServiceHero hero={detail.hero} />
      <ServiceIntro intro={detail.intro} />
      <ServiceSubServices
        title={detail.subServicesTitle}
        subtitle={detail.subServicesSubtitle}
        subServices={detail.subServices}
      />
      <ServiceWorks projects={detail.projects} />
      <ServiceStats stats={servicesStats} />
      <ServiceProcess steps={detail.steps} />
      <ServiceTestimonials testimonials={servicesTestimonials} />
      <ServiceFAQs faqs={detail.faqs} />
      <ServiceCTA />
    </main>
  )
}