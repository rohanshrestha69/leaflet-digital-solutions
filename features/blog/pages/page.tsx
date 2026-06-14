import { BlogFeatured } from "../components/blog-featured"
import { BlogGrid } from "../components/blog-grid"
import { ContactForm } from "@/components/shared/contact-form"

export function BlogPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <BlogFeatured />
      <BlogGrid />
      <ContactForm />
    </main>
  )
}