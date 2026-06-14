import type { Metadata } from "next"

import {
  getAllServiceSlugs,
  getServiceDetail,
} from "@/features/marketing/data/services-page"
import { ServiceDetailPage } from "@/features/services/pages/service-detail-page"

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const detail = getServiceDetail(slug)
  if (!detail) return { title: "Service — Leaflet" }

  return {
    title: `${detail.title} — Leaflet Digital`,
    description: detail.description,
    openGraph: {
      title: `${detail.title} — Leaflet Digital`,
      description: detail.description,
    },
  }
}

export default async function Page({ params }: Params) {
  const { slug } = await params
  return <ServiceDetailPage slug={slug} />
}