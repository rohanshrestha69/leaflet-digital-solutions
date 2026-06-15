// features/projects/components/details/project-detail-gallery.tsx
"use client"

import { Container } from "@/components/shared/container"
import { ProjectGalleryImage } from "../project-gallery-image"

type Props = {
  gallery: string[]
  title: string
  variant: "row-one" | "row-two"
}

export function ProjectDetailGallery({ gallery, title, variant }: Props) {
  if (variant === "row-one") {
    return (
      <section className="bg-[var(--background)] py-8 md:py-12">
        <Container wide>
          <div className="grid gap-4 md:gap-5 lg:grid-cols-[1.4fr_1fr]">
            <ProjectGalleryImage
              src={gallery[0]}
              alt={`${title} — view 1`}
              aspect="aspect-[4/3.5]"
              priority
            />
            <div className="grid gap-4 md:gap-5">
              <ProjectGalleryImage
                src={gallery[1]}
                alt={`${title} — view 2`}
                aspect="aspect-[16/10]"
              />
              <ProjectGalleryImage
                src={gallery[2]}
                alt={`${title} — view 3`}
                aspect="aspect-[16/9]"
              />
            </div>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="bg-[var(--background)] py-8 md:py-12">
      <Container wide>
        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          <ProjectGalleryImage
            src={gallery[3]}
            alt={`${title} — view 4`}
            aspect="aspect-[4/5]"
          />
          <ProjectGalleryImage
            src={gallery[0]}
            alt={`${title} — view 5`}
            aspect="aspect-[4/5]"
          />
        </div>
      </Container>
    </section>
  )
}