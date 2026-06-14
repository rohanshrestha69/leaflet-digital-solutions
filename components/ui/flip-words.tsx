"use client"

import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"

type FlipWordsProps = {
  words: string[]
  duration?: number
  className?: string
}

const ease = [0.22, 1, 0.36, 1] as const

export function FlipWords({
  words,
  duration = 3000,
  className,
}: FlipWordsProps) {
  const safeWords = useMemo(() => (words.length ? words : [""]), [words])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (safeWords.length <= 1) return

    const timeoutId = window.setTimeout(() => {
      setIndex((prev) => (prev + 1) % safeWords.length)
    }, duration)

    return () => window.clearTimeout(timeoutId)
  }, [index, duration, safeWords])

  const currentWord = safeWords[index]

  return (
    <span
      className={cn(
        "relative inline-flex min-h-[1.15em] items-center overflow-hidden align-baseline",
        className,
      )}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWord}
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{
            opacity: 0,
            y: -18,
            filter: "blur(8px)",
            position: "absolute",
          }}
          transition={{
            duration: 0.45,
            ease,
          }}
          className="inline-block whitespace-nowrap will-change-transform"
        >
          {currentWord.split(" ").map((word, wordIndex) => (
            <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap">
              {word.split("").map((letter, letterIndex) => (
                <motion.span
                  key={`${word}-${letterIndex}`}
                  initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.22,
                    ease,
                    delay: wordIndex * 0.08 + letterIndex * 0.018,
                  }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
              <span className="inline-block">&nbsp;</span>
            </span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}