// features/projects/components/project-gallery-image.tsx
"use client"

import Image from "next/image"
import { motion } from "motion/react"

import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"

type ProjectGalleryImageProps = {
  src:        string
  alt:        string
  aspect?:    string
  className?: string
  tone?:      string
  priority?:  boolean
}

export function ProjectGalleryImage({
  src,
  alt,
  aspect    = "aspect-[16/10]",
  className,
  tone,
  priority  = false,
}: ProjectGalleryImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, ease: ease.out }}
      whileHover={{ y: -2 }}
      className={cn(
        "group relative overflow-hidden rounded-[var(--radius-xl)]",
        "border border-[var(--border)]",
        "transition-[border-color] duration-400",
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
            "group-hover:scale-[1.03]"
          )}
        />
        <div
          aria-hidden
          className="absolute inset-0 ring-1 ring-inset ring-white/[0.04]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>
    </motion.div>
  )
}