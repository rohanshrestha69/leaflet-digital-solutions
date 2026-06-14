import { notFound } from "next/navigation"

import {
  getProjectBySlug,
  getNextProject,
} from "@/features/marketing/data/projects-page"

import { ProjectDetailHero } from "../components/details/project-detail-hero"
import { ProjectDetailAbout } from "../components/details/project-detail-about"
import { ProjectDetailGallery } from "../components/details/project-detail-gallery"
import { ProjectDetailChallenges } from "../components/details/project-detail-challenges"
import { ProjectDetailMetrics } from "../components/details/project-detail-metrics"
import { ProjectDetailProcess } from "../components/details/project-detail-process"
import { ProjectDetailTakeaways } from "../components/details/project-detail-takeaways"
import { ProjectDetailTestimonial } from "../components/details/project-detail-testimonial"
import { ProjectDetailNext } from "../components/details/project-detail-next"
import { ProjectDetailCTA } from "../components/details/project-detail-cta"

type Props = {
  slug: string
}

export default function ProjectDetailPage({ slug }: Props) {
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const next = getNextProject(slug)
  const hasGalleryRowOne = project.gallery && project.gallery.length >= 3
  const hasGalleryRowTwo = project.gallery && project.gallery.length >= 4
  const hasChallenges = project.challenge || project.solution
  const hasMetrics = project.metrics && project.metrics.length > 0
  const hasProcess = project.process && project.process.length > 0

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <ProjectDetailHero project={project} />

      {project.about && <ProjectDetailAbout project={project} />}

      {hasGalleryRowOne && (
        <ProjectDetailGallery
          gallery={project.gallery!}
          title={project.title}
          variant="row-one"
        />
      )}

      {hasChallenges && <ProjectDetailChallenges project={project} />}

      {hasGalleryRowTwo && (
        <ProjectDetailGallery
          gallery={project.gallery!}
          title={project.title}
          variant="row-two"
        />
      )}

      {hasMetrics && <ProjectDetailMetrics metrics={project.metrics!} />}

      {hasProcess && <ProjectDetailProcess process={project.process!} />}

      {project.takeaways && (
        <ProjectDetailTakeaways text={project.takeaways} />
      )}

      {project.testimonial && (
        <ProjectDetailTestimonial
          quote={project.testimonial}
          author={project.testimonialAuthor}
        />
      )}

      <ProjectDetailNext next={next} />
      <ProjectDetailCTA />
    </main>
  )
}