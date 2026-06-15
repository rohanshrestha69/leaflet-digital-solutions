import { servicesFaqs } from "@/features/marketing/data/services-page"
import { ServiceFAQs } from "./details/service-faqs"

export function ServicesFaqSection() {
  return <ServiceFAQs faqs={servicesFaqs} />
}