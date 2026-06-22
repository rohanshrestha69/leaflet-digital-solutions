"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type ThreeDMarqueeProps = {
  images: string[];
  className?: string;
};

export function ThreeDMarquee({ images, className }: ThreeDMarqueeProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry?.isIntersecting ?? false),
      { threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const chunkSize = Math.ceil(images.length / 4);
  const chunks = Array.from({ length: 4 }, (_, colIndex) =>
    images.slice(colIndex * chunkSize, colIndex * chunkSize + chunkSize),
  );

  return (
    <div
      ref={ref}
      className={cn(
        "relative mx-auto block size-full overflow-hidden rounded-2xl",
        className,
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          style={{
            transform:
              "scale(0.5) rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
            transformOrigin: "center center",
          }}
          className="grid w-700 shrink-0 grid-cols-4 gap-8 transform-3d sm:w-900"
        >
          {chunks.map((column, colIndex) => (
            <motion.div
              key={`col-${colIndex}`}
              animate={active ? { y: colIndex % 2 === 0 ? 80 : -80 } : { y: 0 }}
              transition={{
                duration: colIndex % 2 === 0 ? 14 : 18,
                repeat: active ? Infinity : 0,
                repeatType: "reverse",
                ease: "linear",
              }}
              className="flex flex-col items-start gap-8"
            >
              {column.map((image, imageIndex) => (
                <Image
                  key={`${colIndex}-${imageIndex}`}
                  src={image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={290}
                  sizes="(max-width: 640px) 140px, 200px"
                  className="aspect-[970/700] w-full rounded-lg object-cover ring-1 ring-white/10"
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
