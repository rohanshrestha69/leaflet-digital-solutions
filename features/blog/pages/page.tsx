// features/blog/pages/blog-page.tsx
import { ContactForm } from "@/components/shared/contact-form"

import { BlogFeatured } from "../components/blog-featured"
import { BlogGrid }     from "../components/blog-grid"

export function BlogPage() {
  return (
    <main className="min-h-screen pt-8 bg-[var(--background)]">
      <BlogFeatured />
      <BlogGrid />
      <ContactForm />
    </main>
  )
}