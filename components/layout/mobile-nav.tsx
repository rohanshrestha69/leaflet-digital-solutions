// components/layout/mobile-nav.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { motion, type Variants } from "motion/react"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { buttonVariants } from "@/components/ui/button"
import { navLinks } from "@/features/marketing/data/nav-links"
import { ease } from "@/lib/motion"
import { cn } from "@/lib/utils"

/* ── Variants ──────────────────────────────────────────────────── */

const listV: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

const itemV: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: ease.out },
  },
}

const footerV: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: ease.out, delay: 0.3 },
  },
}

/* ── Styles ────────────────────────────────────────────────────── */

const iconButton = cn(
  "inline-flex size-11 items-center justify-center rounded-md",
  "text-white/70 transition-colors duration-200 ease-[var(--ease-premium)]",
  "hover:bg-white/[0.06] hover:text-white",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
)

/* ── Component ─────────────────────────────────────────────────── */

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(iconButton, "relative z-[210]")}
        aria-label="Open navigation"
      >
        <Menu strokeWidth={2.25} className="size-6" />
      </SheetTrigger>

      <SheetContent
        side="left"
        showCloseButton={false}
        className={cn(
          "z-[220] flex h-dvh w-full flex-col gap-0 border-r border-white/[0.06]",
          "bg-[var(--background)] px-6 py-6 text-white sm:max-w-md"
        )}
      >
        {/* Header */}
        <SheetHeader className="flex flex-row items-center justify-between p-0">
          <SheetTitle>
            <Link
              href="/#home"
              onClick={() => setOpen(false)}
              aria-label="Leaflet — Home"
              className="inline-flex items-center gap-2 font-heading font-bold tracking-wide text-white"
            >
              <Image
                src="/logo_white.svg"
                alt=""
                width={36}
                height={36}
                priority
                className="h-9 w-9 object-contain"
              />
              <span className="text-[26px] tracking-wider">Leaflet</span>
            </Link>
          </SheetTitle>

          <SheetClose className={iconButton} aria-label="Close navigation">
            <X className="size-5" strokeWidth={2.25} />
          </SheetClose>
        </SheetHeader>

        {/* Navigation */}
        <motion.nav
          className="mt-12 flex flex-1 flex-col"
          aria-label="Mobile navigation"
          initial="hidden"
          animate="show"
          variants={listV}
        >
          {navLinks.map((link, i) => {
            const isActive = isActiveLink(link.href, pathname)

            return (
              <motion.div key={link.href} variants={itemV}>
                <SheetClose>
                  <Link
                    href={link.href}
                    className={cn(
                      "group flex items-center justify-between border-b border-white/[0.06]",
                      "py-5 font-heading text-[34px] font-semibold leading-none tracking-tight",
                      "transition-colors duration-300 ease-[var(--ease-premium)]",
                      "focus-visible:outline-none focus-visible:text-[var(--brand)]",
                      isActive
                        ? "text-[var(--brand)]"
                        : "text-white hover:text-[var(--brand)]"
                    )}
                  >
                    <span className="flex items-center gap-4">
                      <span className="font-medium text-[11px] text-white/20">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{link.label}</span>
                    </span>
                    <ArrowUpRight
                      className={cn(
                        "ml-2 size-5 -translate-x-1 opacity-0 transition-[transform,opacity] duration-300 ease-[var(--ease-premium)]",
                        "group-hover:translate-x-0 group-hover:opacity-100",
                        isActive && "translate-x-0 opacity-100"
                      )}
                    />
                  </Link>
                </SheetClose>
              </motion.div>
            )
          })}
        </motion.nav>

        {/* Footer CTA */}
        <motion.div
          variants={footerV}
          initial="hidden"
          animate="show"
          className="mt-8 flex flex-col gap-4 border-t border-white/[0.06] pt-6"
        >
          <SheetClose>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "orange", size: "lg" }),
                "w-full justify-center gap-2"
              )}
            >
              Build with us
              <ArrowUpRight className="size-4" />
            </Link>
          </SheetClose>

          <p className="font-medium text-[10px] uppercase tracking-[0.22em] text-white/40">
            © {new Date().getFullYear()} Leaflet Digital
          </p>
        </motion.div>
      </SheetContent>
    </Sheet>
  )
}

/* ── Active link resolver ───────────────────────────────────────── */

/**
 * Mirror of the desktop header logic, but without hash awareness
 * (mobile menu always closes & navigates rather than tracking sections).
 */
function isActiveLink(href: string, pathname: string) {
  const hashIndex = href.indexOf("#")

  /* Hash anchor — only active on the exact root path */
  if (hashIndex !== -1) {
    const path = href.slice(0, hashIndex) || "/"
    return pathname === path
  }

  /* Special-case home — never matches nested routes */
  if (href === "/") {
    return pathname === "/"
  }

  /* Exact match OR nested route */
  return pathname === href || pathname.startsWith(`${href}/`)
}