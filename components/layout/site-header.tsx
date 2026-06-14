"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { MobileNav } from "@/components/layout/mobile-nav"
import { navLinks } from "@/features/marketing/data/nav-links"
import { premiumEase } from "@/lib/motion"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*                                  Constants                                 */
/* -------------------------------------------------------------------------- */

const SCROLL_THRESHOLD = 12
const SECTION_OFFSET = 140

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [activeHash, setActiveHash] = useState("")

  /* ------------------------------ Scroll state ------------------------------ */
  useEffect(() => {
    let raf: number | null = null

    const update = () => {
      const next = window.scrollY > SCROLL_THRESHOLD
      setScrolled((prev) => (prev === next ? prev : next))
      raf = null
    }

    const onScroll = () => {
      if (raf !== null) return
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [])

  /* --------------------------- Hash change tracking ------------------------- */
  useEffect(() => {
    const update = () => setActiveHash(window.location.hash)
    update()
    window.addEventListener("hashchange", update)
    return () => window.removeEventListener("hashchange", update)
  }, [])

  /* --------------------- Active section tracking on home -------------------- */
  useEffect(() => {
    if (pathname !== "/") return

    const sections = navLinks
      .map((l) => l.href.split("#")[1])
      .filter((id): id is string => Boolean(id))
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!sections.length) return

    let raf: number | null = null

    const update = () => {
      raf = null
      let current = sections[0]
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= SECTION_OFFSET) {
          current = section
        } else break
      }
      setActiveHash((prev) => (prev === `#${current.id}` ? prev : `#${current.id}`))
    }

    const schedule = () => {
      if (raf !== null) return
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)

    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [pathname])

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: premiumEase }}
      className="fixed inset-x-0 top-0 z-[100]"
    >
      <div
        className={cn(
          "flex items-center justify-between transition-[background-color,border-color,padding,box-shadow] duration-300 ease-[var(--ease-premium)]",
          "px-4 lg:px-16",
          scrolled
            ? "border-b border-white/[0.06] bg-[var(--background)] py-3 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]"
            : "border-b border-transparent bg-transparent py-5"
        )}
      >
        {/* Mobile: hamburger + logo */}
        <div className="flex items-center gap-3 lg:hidden">
          <MobileNav />
          <Link
            href="/#home"
            aria-label="Leaflet — Home"
            className="inline-flex items-center gap-2 font-heading font-bold tracking-wide text-white"
          >
            <Image
              src="/logo_white.svg"
              alt=""
              width={32}
              height={32}
              priority
              className="h-8 w-8 object-contain"
            />
            <span className="text-[24px] tracking-wider">Leaflet</span>
          </Link>
        </div>

        {/* Desktop logo */}
        <Link
          href="/#home"
          aria-label="Leaflet — Home"
          className="hidden items-center gap-2 font-heading font-bold tracking-wide text-white lg:inline-flex"
        >
          <Image
            src="/logo_white.svg"
            alt=""
            width={32}
            height={32}
            priority
            className="h-8 w-8 shrink-0 object-contain"
          />
          <span className="text-[28px] tracking-wider">Leaflet</span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => {
            const isActive = isActiveNavLink(link.href, pathname, activeHash)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  const hash = getHashFromHref(link.href)
                  if (hash) setActiveHash(hash)
                }}
                className={cn(
                  "relative rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200 ease-[var(--ease-premium)]",
                  isActive
                    ? "text-[var(--brand)]"
                    : "text-white/60 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className={cn(
            buttonVariants({
              variant: "orange",
              size: "lg",
              className: "hover:translate-none hover:shadow-none",
            }),
            "hidden items-center gap-2 lg:inline-flex"
          )}
        >
          Build with us
          <ArrowUpRight className="size-4" />
        </Link>

        {/* Mobile CTA */}
        <Link
          href="/contact"
          className={cn(
            buttonVariants({
              variant: "orange",
              size: "default",
              className: "px-4 hover:translate-none hover:shadow-none",
            }),
            "inline-flex items-center gap-1.5 lg:hidden"
          )}
        >
          Build with us
          <ArrowUpRight className="size-3" />
        </Link>
      </div>
    </motion.header>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

function isActiveNavLink(href: string, pathname: string, activeHash: string) {
  const hashIndex = href.indexOf("#")
  if (hashIndex === -1) return pathname === href
  const path = href.slice(0, hashIndex) || "/"
  const hash = href.slice(hashIndex)
  return pathname === path && activeHash === hash
}

function getHashFromHref(href: string) {
  const hashIndex = href.indexOf("#")
  return hashIndex === -1 ? null : href.slice(hashIndex)
}