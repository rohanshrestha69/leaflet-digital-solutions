// features/blog/components/details/blog-sidebar.tsx
"use client"

import { useCallback, useState, type ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Check, Link2 } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa"

import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Motion wrapper — defined at module scope (not inside render)      */
/* ------------------------------------------------------------------ */

function MotionHoverWrap({ children }: { children: ReactNode }) {
  return (
    <motion.span
      whileHover={{ y: -2, scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.2, ease: ease.smooth }}
      className="inline-flex"
    >
      {children}
    </motion.span>
  )
}

/* ------------------------------------------------------------------ */
/*  Sidebar                                                            */
/* ------------------------------------------------------------------ */

export function BlogSidebar() {
  const [copied, setCopied] = useState(false)

  const copyLink = useCallback(async () => {
    if (typeof window === "undefined") return
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable */
    }
  }, [])

  return (
    <div className="flex flex-col gap-8">
      {/* Studio card */}
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.25, ease: ease.smooth }}
        className={cn(
          "rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)]/40 p-6",
          "transition-[border-color] duration-300 ease-[var(--ease-premium)]",
          "hover:border-[var(--border-strong)]"
        )}
      >
        <div className="flex items-center gap-3">
          <Image
            src="/logo_white.svg"
            alt="Leaflet Digital Solutions"
            width={24}
            height={24}
          />
          <span className="font-heading text-xl font-semibold tracking-tight text-[var(--text)]">
            Leaflet
          </span>
        </div>

        <p className="mt-5 text-[13px] leading-relaxed text-[var(--text-muted)]">
          We design interfaces built to retain customers — clearly, intuitively,
          and strategically. Growth compounds when your product eliminates
          friction.
        </p>

        <Link
          href="/services"
          className={cn(
            "group/cta mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--text)]",
            "transition-colors duration-200 hover:text-[var(--brand)]"
          )}
        >
          Explore our services
          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
        </Link>
      </motion.div>

      {/* Share */}
      <div className="flex flex-col gap-4">
        <p className="text-center font-medium text-[12px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
          Share this article
        </p>

        <div className="flex items-center justify-center gap-3">
          <ShareButton
            onClick={copyLink}
            label={copied ? "Copied!" : "Copy link"}
            active={copied}
            icon={
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="check"
                    initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.6, rotate: 30 }}
                    transition={{ duration: 0.25, ease: ease.spring }}
                  >
                    <Check className="size-4" strokeWidth={2.5} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="link"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link2 className="size-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            }
          />
          <ShareButton
            href="#"
            label="Share on Facebook"
            icon={<FaFacebook className="size-4" />}
          />
          <ShareButton
            href="#"
            label="Share on LinkedIn"
            icon={<FaLinkedin className="size-4" />}
          />
          <ShareButton
            href="#"
            label="Share on X"
            icon={<FaTwitter className="size-4" />}
          />
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Share button                                                       */
/* ------------------------------------------------------------------ */

type ShareButtonProps = {
  icon:     ReactNode
  label:    string
  href?:    string
  onClick?: () => void
  active?:  boolean
}

function ShareButton({ icon, label, href, onClick, active }: ShareButtonProps) {
  const classes = cn(
    "inline-flex size-11 items-center justify-center rounded-full",
    "border bg-[var(--background)]",
    "transition-[border-color,background-color,color] duration-300 ease-[var(--ease-premium)]",
    active
      ? "border-[var(--brand-border)] bg-[var(--brand)]/10 text-[var(--brand)]"
      : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--brand-border)] hover:bg-[var(--brand)]/10 hover:text-[var(--brand)]"
  )

  if (href) {
    return (
      <MotionHoverWrap>
        <a
          href={href}
          aria-label={label}
          title={label}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {icon}
        </a>
      </MotionHoverWrap>
    )
  }

  return (
    <MotionHoverWrap>
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        title={label}
        className={classes}
      >
        {icon}
      </button>
    </MotionHoverWrap>
  )
}