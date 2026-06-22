// features/marketing/components/hero-section.tsx
"use client";

import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";

import { Container } from "@/components/shared/container";
import { SplitWords } from "@/components/animations/text-reveal";
import { LineSweepReveal } from "@/components/animations/line-sweep-reveal";
import { AnimatedCounter } from "@/components/animations/animated-counter";
import { stats } from "../data/stats";
import { viewport } from "@/lib/motion";

import type {
  EarthArc,
  EarthConfig,
  EarthRing,
  EarthHexPolygon,
} from "@/components/ui/earth";
import countriesData from "@/features/marketing/data/globe.json";
import { EARTH_PRESETS } from "../data/earth-presets";

// ─────────────────────────────────────────────────────────────────────────────
// LAZY GLOBE
// ─────────────────────────────────────────────────────────────────────────────

const Earth = dynamic(
  () => import("@/components/ui/earth").then((m) => m.Earth),
  { ssr: false, loading: () => null },
);

// ─────────────────────────────────────────────────────────────────────────────
// GLOBE DATA
// ─────────────────────────────────────────────────────────────────────────────

const PAL = {
  blue: "#4da8da",
  indigo: "#818cf8",
  cyan: "#67e8f9",
  violet: "#a78bfa",
  teal: "#5eead4",
} as const;

const ARC_DATA: EarthArc[] = [
  {
    order: 1,
    startLat: 40.71,
    startLng: -74.01,
    endLat: 51.51,
    endLng: -0.13,
    arcAlt: 0.28,
    color: [PAL.blue, PAL.indigo],
  },
  {
    order: 2,
    startLat: 37.77,
    startLng: -122.4,
    endLat: 35.68,
    endLng: 139.69,
    arcAlt: 0.4,
    color: [PAL.indigo, PAL.cyan],
  },
  {
    order: 3,
    startLat: 48.85,
    startLng: 2.35,
    endLat: 55.76,
    endLng: 37.62,
    arcAlt: 0.16,
    color: [PAL.cyan, PAL.blue],
  },
  {
    order: 4,
    startLat: 51.51,
    startLng: -0.13,
    endLat: -23.55,
    endLng: -46.63,
    arcAlt: 0.42,
    color: [PAL.violet, PAL.blue],
  },
  {
    order: 5,
    startLat: 35.68,
    startLng: 139.69,
    endLat: -33.87,
    endLng: 151.21,
    arcAlt: 0.3,
    color: [PAL.blue, PAL.teal],
  },
  {
    order: 6,
    startLat: 40.71,
    startLng: -74.01,
    endLat: 6.52,
    endLng: 3.38,
    arcAlt: 0.48,
    color: [PAL.indigo, PAL.violet],
  },
  {
    order: 7,
    startLat: 28.61,
    startLng: 77.23,
    endLat: 48.85,
    endLng: 2.35,
    arcAlt: 0.26,
    color: [PAL.teal, PAL.violet],
  },
  {
    order: 8,
    startLat: -33.87,
    startLng: 151.21,
    endLat: 34.05,
    endLng: -118.24,
    arcAlt: 0.44,
    color: [PAL.violet, PAL.cyan],
  },
  {
    order: 9,
    startLat: 1.35,
    startLng: 103.82,
    endLat: 51.51,
    endLng: -0.13,
    arcAlt: 0.34,
    color: [PAL.cyan, PAL.blue],
  },
  {
    order: 10,
    startLat: 25.2,
    startLng: 55.27,
    endLat: 19.08,
    endLng: 72.88,
    arcAlt: 0.14,
    color: [PAL.indigo, PAL.teal],
  },
];

const RING_DATA: EarthRing[] = [
  {
    lat: 40.71,
    lng: -74.01,
    color: PAL.blue,
    maxR: 3,
    propagationSpeed: 2.5,
    repeatPeriod: 1000,
  },
  {
    lat: 51.51,
    lng: -0.13,
    color: PAL.indigo,
    maxR: 3,
    propagationSpeed: 2.5,
    repeatPeriod: 1200,
  },
  {
    lat: 35.68,
    lng: 139.69,
    color: PAL.cyan,
    maxR: 3,
    propagationSpeed: 2.5,
    repeatPeriod: 900,
  },
  {
    lat: -33.87,
    lng: 151.21,
    color: PAL.teal,
    maxR: 3,
    propagationSpeed: 2.5,
    repeatPeriod: 1100,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
//
// Timeline (from content mount):
//   0.00s  Content container mounts
//   0.05s  Headline words split in
//   0.50s  Subtitle sweep
//   0.85s  CTA buttons fade up
//   1.20s  Stats counter cascade
// ─────────────────────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};

const statContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 1.2 },
  },
};

const statItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// GLOBE STAGE
// ─────────────────────────────────────────────────────────────────────────────

const GLOBE_CSS = `
  .gs-root {
    --g-size: 130vw;
    --g-y: 48vh;
  }
  @media (min-width: 640px)  { .gs-root { --g-size: 130vw; --g-y: 32vh; } }
  @media (min-width: 768px)  { .gs-root { --g-size: 130vw; --g-y: 28vh; } }
  @media (min-width: 1024px) { .gs-root { --g-size: 130vw; --g-y: 24vh; } }
  @media (min-width: 1280px) { .gs-root { --g-size: 130vw; --g-y: 20vh; } }
  @media (min-width: 1536px) { .gs-root { --g-size: 2000px; --g-y: 8vh; } }

  @keyframes gs-rise {
    from { opacity: 0; transform: translateY(calc(var(--g-y) + 60px)) scale(0.97); }
    to   { opacity: 1; transform: translateY(var(--g-y)) scale(1); }
  }

  .gs-rise {
    animation: gs-rise 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
`;

function GlobeStage({
  ready,
  onReady,
  hexPolygons,
}: {
  ready: boolean;
  onReady: () => void;
  hexPolygons: EarthHexPolygon[];
}) {
  return (
    <>
      <style>{GLOBE_CSS}</style>
      <div
        className="gs-root pointer-events-none absolute inset-0 z-10 flex justify-center"
        aria-hidden
      >
        <div
          className={ready ? "gs-rise" : ""}
          style={{
            width: "var(--g-size)",
            height: "var(--g-size)",
            flexShrink: 0,
            opacity: ready ? undefined : 0,
            willChange: "transform, opacity",
            contain: "layout style paint",
          }}
        >
          <div className="pointer-events-auto h-full w-full">
            <Earth
              arcs={ARC_DATA}
              rings={RING_DATA}
              hexPolygons={hexPolygons}
              config={EARTH_PRESETS.blueMarble}
              onReady={onReady}
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BACKGROUND
// ─────────────────────────────────────────────────────────────────────────────

function HeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ contain: "strict" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 40%, #141414 0%, #0c0c0c 50%, var(--hero-bg) 100%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56"><path d="M 56 0 L 0 0 0 56" fill="none" stroke="rgba(255,255,255,0.035)" stroke-width="1"/></svg>',
          )}")`,
          maskImage:
            "radial-gradient(ellipse 75% 70% at 50% 45%, black 0%, rgba(0,0,0,0.60) 60%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 70% at 50% 45%, black 0%, rgba(0,0,0,0.60) 60%, transparent 100%)",
        }}
      />

      <div
        className="absolute left-1/2 top-[15%] -translate-x-1/2"
        style={{
          width: "min(900px, 80vw)",
          height: "min(500px, 45vh)",
          background:
            "radial-gradient(ellipse at center, var(--hero-glow-a) 0%, transparent 70%)",
          opacity: 0.9,
        }}
      />

      <div
        className="absolute bottom-[20%] right-[10%] size-[180px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, var(--hero-glow-b) 0%, transparent 70%)",
          opacity: 0.6,
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA BUTTONS
// ─────────────────────────────────────────────────────────────────────────────

function CtaButtons({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      animate="show"
      className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
    >
      <Link
        href="#get-started"
        className="
          group relative inline-flex h-12 w-full items-center justify-center
          gap-2 rounded-full bg-[var(--brand)] px-7 text-[14px] font-semibold
          text-white transition-[transform,background-color] duration-300
          hover:scale-[1.02] sm:w-auto
        "
      >
        Book a Schedule
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </Link>

      <Link
        href="#demo"
        className="
          group inline-flex h-12 w-full items-center justify-center gap-2
          rounded-full border border-[var(--border-strong)] px-7 text-[14px]
          font-medium text-white transition-[transform,border-color] duration-300
          hover:scale-[1.02] hover:border-[var(--brand-border)] sm:w-auto
        "
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      >
        More Projects
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STATS BAND
// ─────────────────────────────────────────────────────────────────────────────

function StatsBand() {
  return (
    <Container wide className="py-10 md:py-14">
      <motion.div
        variants={statContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-x-8"
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={statItem}
            className="flex flex-col items-center text-center"
          >
            <p className="font-heading text-[28px] font-semibold leading-none text-[var(--text)] sm:text-[36px] md:text-[44px]">
              <AnimatedCounter value={s.value} duration={1800} />
            </p>
            <p className="mt-3 text-[9px] font-medium uppercase tracking-[0.24em] text-[var(--text-subtle)] sm:text-[11px]">
              {s.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Container>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO CONTENT
//
// Single component containing headline → subtitle → CTAs → stats.
// All animation delays cascade from mount time so ordering is guaranteed.
// ─────────────────────────────────────────────────────────────────────────────

function HeroContent() {
  return (
    <div className="flex min-h-[100svh] w-full flex-col items-center justify-between px-5 pb-10 pt-28 sm:px-8 sm:pt-32 md:pt-36 lg:pt-40">
      {/* Headline + Subtitle + CTAs */}
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <SplitWords
          text="Custom Software, Websites, Mobile Apps & AI Solutions for Growing Businesses."
          as="h1"
          delay={0.05}
          stagger={0.04}
          once
          className="
            font-sans text-left sm:text-center font-bold leading-[1.08]
            tracking-[-0.025em] text-[var(--text)]
            text-[28px] xs:text-[34px] sm:text-[46px]
            md:text-[56px] lg:text-[60px] xl:text-[64px]
          "
        />

        <LineSweepReveal
          text="Leaflet Digital Solutions is a remote-first software development company helping businesses, startups, and agencies build reliable digital products—from websites and mobile apps to custom software systems and AI-powered automation."
          as="p"
          delay={0.5}
          stagger={0.02}
          duration={0.3}
          from="left"
          once
          amount={0}
          className="
            mx-auto text-left sm:text-center mt-4 max-w-[680px] font-medium text-balance text-white
            text-[14px] leading-[1.65] text-[var(--text-muted)]
            sm:text-[15px] sm:leading-[1.7]
            md:text-[18px] md:leading-[1.75]
          "
        />

        <CtaButtons delay={0.85} />
      </div>

      {/* Stats — cascades after CTAs via delayChildren: 1.2s */}
      <div className="relative z-10 w-full">
        <StatsBand />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO SECTION (root)
//
// Sequence:
//   1. Globe mounts immediately and starts loading
//   2. Globe fires onReady (or 3s fallback)
//   3. globeReady → globe CSS rise animation plays
//   4. 150ms later → HeroContent mounts (all animations cascade from there)
// ─────────────────────────────────────────────────────────────────────────────

export function HeroSection() {
  const [globeReady, setGlobeReady] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const hexPolygons = useMemo(
    () => (countriesData as { features: EarthHexPolygon[] }).features,
    [],
  );

  const handleGlobeReady = useCallback(() => {
    setGlobeReady(true);
  }, []);

  // Show content 150ms after globe is ready (one paint frame buffer)
  useEffect(() => {
    if (!globeReady) return;
    const id = setTimeout(() => setShowContent(true), 150);
    timersRef.current.push(id);
    return () => clearTimeout(id);
  }, [globeReady]);

  // Hard fallback — never block content longer than 3s
  useEffect(() => {
    const id = setTimeout(() => setGlobeReady(true), 3000);
    timersRef.current.push(id);
    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  return (
    <section
      id="home"
      className="relative isolate w-full overflow-hidden text-white"
      style={{ backgroundColor: "var(--hero-bg)", contain: "paint" }}
    >
      <div className="relative min-h-[100svh] w-full">
        <HeroBackground />

        <GlobeStage
          ready={globeReady}
          onReady={handleGlobeReady}
          hexPolygons={hexPolygons}
        />

        {/* Bottom blend into next section */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-52 sm:h-64"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(11,11,11,0.6) 45%, var(--background) 100%)",
          }}
        />

        {/* Content overlay — mounts only after globe is ready */}
        {showContent && (
          <div className="relative z-30">
            <HeroContent />
          </div>
        )}
      </div>
    </section>
  );
}

export default HeroSection;
