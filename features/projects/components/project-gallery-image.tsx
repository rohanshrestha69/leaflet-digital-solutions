// features/projects/components/project-gallery-image.tsx
"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { premiumEase } from "@/lib/motion"
import Image from "next/image"

type ProjectGalleryImageProps = {
  src: string
  alt: string
  aspect?: string
  className?: string
  tone?: string
  priority?: boolean
}

export function ProjectGalleryImage({
  src,
  alt,
  aspect = "aspect-[16/10]",
  className,
  tone,
  priority = false,
}: ProjectGalleryImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: premiumEase }}
      className={cn(
        "group relative overflow-hidden rounded-[var(--radius-xl)]",
        "border border-[var(--border)]",
        "transition-colors duration-400",
        "hover:border-[var(--border-strong)]",
        className
      )}
      style={{ background: tone ?? "var(--card)" }}
    >
      <div className={cn("relative w-full", aspect)}>
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1000}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={cn(
            "absolute inset-0 h-full w-full object-cover",
            "transition-transform duration-[800ms] ease-[var(--ease-premium)]",
            "group-hover:scale-[1.02]"
          )}
        />
        <div
          aria-hidden
          className="absolute inset-0 ring-1 ring-inset ring-white/[0.04]"
        />
      </div>
    </motion.div>
  )
}