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
import { premiumEase } from "@/lib/motion"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*                                  Variants                                  */
/* -------------------------------------------------------------------------- */

const listVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.12,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: premiumEase },
  },
}

const footerVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: premiumEase, delay: 0.35 },
  },
}

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const iconButton = cn(
  "inline-flex size-11 items-center justify-center rounded-md",
  "text-white/70 transition-colors duration-200 ease-[var(--ease-premium)]",
  "hover:bg-white/[0.06] hover:text-white",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
)

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

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
          variants={listVariants}
        >
          {navLinks.map((link) => {
            const isActive = isActiveLink(link.href, pathname)

            return (
              <motion.div key={link.href} variants={itemVariants}>
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
                    <span>{link.label}</span>
                    <ArrowUpRight
                      className={cn(
                        "size-5 ml-2 -translate-x-1 opacity-0 transition-all duration-300 ease-[var(--ease-premium)]",
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
          variants={footerVariants}
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

          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
            © {new Date().getFullYear()} Leaflet Digital
          </p>
        </motion.div>
      </SheetContent>
    </Sheet>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

function isActiveLink(href: string, pathname: string) {
  const hashIndex = href.indexOf("#")
  if (hashIndex === -1) return pathname === href
  const path = href.slice(0, hashIndex) || "/"
  return pathname === path
}