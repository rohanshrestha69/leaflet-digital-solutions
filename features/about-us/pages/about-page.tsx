import { ContactForm } from "@/components/shared/contact-form"

import { AboutHero } from "../components/about-hero"
import { AboutDna } from "../components/about-dna"
import { AboutStory } from "../components/about-story"
import { AboutMission } from "../components/about-mission"
import { AboutStats } from "../components/about-stats"
import { AboutTeam } from "../components/about-team"

export function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <AboutHero />
      <AboutDna />
      <AboutStory />
      <AboutMission />
      <AboutStats />
      <AboutTeam />
      <ContactForm />
    </main>
  )
}