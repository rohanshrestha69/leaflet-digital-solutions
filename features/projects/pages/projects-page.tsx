import { ProjectsCTA } from "../components/projects-cta";
import { ProjectsHero } from "../components/projects-hero";
import { ProjectsWorks } from "../components/projects-works";


export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <ProjectsHero />
      <ProjectsWorks />
      <ProjectsCTA />
    </main>
  )
}