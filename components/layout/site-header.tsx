// components/layout/site-header.tsx
"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";
import { navLinks } from "@/features/marketing/data/nav-links";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SCROLL_THRESHOLD = 12;
const SECTION_OFFSET = 140;

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function SiteHeader() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);

  const [activeHash, setActiveHash] = useState("");

  const [syncedPath, setSyncedPath] = useState(pathname);
  if (syncedPath !== pathname) {
    setSyncedPath(pathname);
    if (pathname !== "/" && activeHash !== "") {
      setActiveHash("");
    }
  }

  useIsomorphicLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    setScrolled(window.scrollY > SCROLL_THRESHOLD);
  }, []);
  useEffect(() => {
    let raf: number | null = null;

    const update = () => {
      raf = null;
      setScrolled((prev) => {
        const next = window.scrollY > SCROLL_THRESHOLD;
        return prev === next ? prev : next;
      });
    };

    const onScroll = () => {
      if (raf !== null) return;
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  /* ── Hash-change listener ─────────────────────────────────── */
  useEffect(() => {
    const update = () => setActiveHash(window.location.hash);
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  /* ── Section visibility tracking (home only) ──────────────── */
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = navLinks
      .map((l) => l.href.split("#")[1])
      .filter((id): id is string => Boolean(id))
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    let raf: number | null = null;

    const update = () => {
      raf = null;
      let current = sections[0]!;
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= SECTION_OFFSET) current = s;
        else break;
      }
      setActiveHash(`#${current.id}`);
    };

    const schedule = () => {
      if (raf !== null) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  /* ── Nav-link click handler (manages active hash) ─────────── */
  const handleNavClick = (href: string) => {
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;
    setActiveHash(href.slice(hashIndex));
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: ease.out, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-[100]"
    >
      {/* Glass background — `initial={false}` skips first-mount animation
       * so it never flickers in unless `scrolled` actually flips. */}
      <motion.div
        className={cn(
          "absolute inset-0 border-b backdrop-blur-md",
          scrolled ? "border-white/[0.06]" : "border-transparent",
        )}
        initial={false}
        animate={{
          opacity: scrolled ? 1 : 0,
          backgroundColor: scrolled ? "rgba(8,7,6,0.82)" : "rgba(8,7,6,0)",
        }}
        transition={{ duration: 0.35, ease: ease.smooth }}
      />

      <div
        className={cn(
          "relative flex items-center justify-between",
          "px-4 lg:px-16",
          "transition-[padding] duration-300 ease-[var(--ease-premium)]",
          scrolled ? "py-3" : "py-5",
        )}
      >
        {/* Mobile: hamburger + logo */}
        <div className="flex items-center gap-3 lg:hidden">
          <MobileNav />
          <Logo size={24} textSize="text-[24px]" />
        </div>

        {/* Desktop logo */}
        <div className="hidden lg:block">
          <Logo size={32} textSize="text-[28px]" />
        </div>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => (
            <NavItem
              key={link.href}
              href={link.href}
              label={link.label}
              isActive={isActiveLink(link.href, pathname, activeHash)}
              onClick={() => handleNavClick(link.href)}
            />
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className={cn(
            buttonVariants({ variant: "orange", size: "lg" }),
            "hidden items-center gap-2 lg:inline-flex",
            "hover:translate-none hover:shadow-none",
          )}
        >
          Build with us
          <ArrowUpRight className="size-4" />
        </Link>

        {/* Mobile CTA */}
        <Link
          href="/contact"
          className={cn(
            buttonVariants({ variant: "orange", size: "default" }),
            "inline-flex items-center gap-1.5 px-4 lg:hidden",
            "hover:translate-none hover:shadow-none",
          )}
        >
          Build with us
          <ArrowUpRight className="size-3" />
        </Link>
      </div>
    </motion.header>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function Logo({ size, textSize }: { size: number; textSize: string }) {
  return (
    <Link
      href="/"
      aria-label="Leaflet — Home"
      className="inline-flex items-center gap-2 font-heading font-bold tracking-wide text-white"
    >
      <Image
        src="/logo_white.svg"
        alt=""
        width={size}
        height={size}
        priority
        className="shrink-0 object-contain"
        style={{ width: size, height: size }}
      />
      <span className={cn("tracking-wider", textSize)}>Leaflet</span>
    </Link>
  );
}

type NavItemProps = {
  href: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
};

function NavItem({ href, label, isActive, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative rounded-md px-4 py-2 text-sm font-medium",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/40",
        isActive ? "text-[var(--brand)]" : "text-white/60 hover:text-white",
      )}
    >
      {label}

      <motion.span
        className="absolute inset-x-4 -bottom-0.5 h-px bg-[var(--brand)] origin-left"
        initial={false}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.35, ease: ease.inOut }}
      />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Active-link resolver                                               */
/* ------------------------------------------------------------------ */

function isActiveLink(href: string, pathname: string, activeHash: string) {
  const hashIndex = href.indexOf("#");

  if (hashIndex !== -1) {
    const path = href.slice(0, hashIndex) || "/";
    const hash = href.slice(hashIndex);
    if (pathname !== path) return false;
    if (!activeHash && hash === "#home") return true;
    return activeHash === hash;
  }

  if (href === "/") return pathname === "/";

  return pathname === href || pathname.startsWith(`${href}/`);
}
