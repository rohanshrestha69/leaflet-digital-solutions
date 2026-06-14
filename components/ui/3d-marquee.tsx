"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import Image from "next/image"

type ThreeDMarqueeProps = {
  images: string[]
  className?: string
}

export const ThreeDMarquee = ({ images, className }: ThreeDMarqueeProps) => {
  /* Pause animation when off-screen */
  const ref = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry?.isIntersecting ?? false),
      { threshold: 0.05 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const chunkSize = Math.ceil(images.length / 4)
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize
    return images.slice(start, start + chunkSize)
  })

  return (
    <div
      ref={ref}
      className={cn(
        "relative mx-auto block size-full overflow-hidden rounded-2xl",
        className
      )}
    >
      {/* Centering wrapper — keeps the 3D plane in the middle of the container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Big tilted plane, scaled down to fit */}
        <div
          style={{
            transform:
              "scale(0.5) rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
            transformOrigin: "center center",
            willChange: active ? "transform" : "auto",
          }}
          className="grid w-550 sm:w-750 shrink-0 grid-cols-4 gap-8 transform-3d"
        >
          {chunks.map((subarray, colIndex) => (
            <motion.div
              key={`col-${colIndex}`}
              animate={
                active ? { y: colIndex % 2 === 0 ? 80 : -80 } : { y: 0 }
              }
              transition={{
                duration: colIndex % 2 === 0 ? 12 : 16,
                repeat: active ? Infinity : 0,
                repeatType: "reverse",
                ease: "linear",
              }}
              className="flex flex-col items-start gap-8"
            >
              {subarray.map((image, imageIndex) => (
                <Image
                  key={`${colIndex}-${imageIndex}`}
                  src={image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width={970}
                  height={700}
                  className="aspect-[970/700] w-full rounded-lg object-cover ring-1 ring-white/10"
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}