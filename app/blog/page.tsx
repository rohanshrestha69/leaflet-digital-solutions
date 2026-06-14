// app/contact/page.tsx
import type { Metadata } from "next"
import {BlogPage} from "@/features/blog/pages/page"

export const metadata: Metadata = {
  title: "Blog — Leaflet Digital Solutions",
  description:
    "Essays, playbooks, and lessons from shipping software with distributed teams.",
}

export default function Page() {
  return <BlogPage />
}