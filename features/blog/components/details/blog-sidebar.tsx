"use client"

import { useCallback, useState } from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  Check,
  Link2,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa"
import Image from "next/image"

export function BlogSidebar() {
  const [copied, setCopied] = useState(false)

  const copyLink = useCallback(async () => {
    if (typeof window === "undefined") return
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [])

  return (
    <div className="flex flex-col gap-8">
      {/* Studio card */}
      <div
        className={cn(
          "rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)]/40 p-6",
          "transition-colors duration-300 ease-[var(--ease-premium)]",
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
            "mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--text)]",
            "transition-colors duration-200 hover:text-[var(--brand)]"
          )}
        >
          Explore our services
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>

      {/* Share */}
      <div className="flex flex-col gap-4">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-subtle)]">
          Share this article
        </p>
        <div className="flex items-center justify-center gap-3">
          <ShareButton
            onClick={copyLink}
            label={copied ? "Copied!" : "Copy link"}
            icon={
              copied ? (
                <Check className="size-4" strokeWidth={2.5} />
              ) : (
                <Link2 className="size-4" />
              )
            }
            active={copied}
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

/* -------------------------------------------------------------------------- */
/*                                Share button                                */
/* -------------------------------------------------------------------------- */

type ShareButtonProps = {
  icon: React.ReactNode
  label: string
  href?: string
  onClick?: () => void
  active?: boolean
}

function ShareButton({ icon, label, href, onClick, active }: ShareButtonProps) {
  const classes = cn(
    "inline-flex size-11 items-center justify-center rounded-full",
    "border bg-[var(--background)]",
    "transition-all duration-300 ease-[var(--ease-premium)]",
    active
      ? "border-[var(--brand-border)] bg-[var(--brand)]/10 text-[var(--brand)]"
      : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--brand-border)] hover:bg-[var(--brand)]/10 hover:text-[var(--brand)]"
  )

  if (href) {
    return (
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
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={classes}
    >
      {icon}
    </button>
  )
}