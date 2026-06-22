"use client";

import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import type { GlobeConfig, Position } from "@/components/ui/globe";
import { GlobeClient } from "@/components/globe-client";

/* ── Globe config ────────────────────────────────────────────────── */

const GLOBE_CONFIG: GlobeConfig = {
  pointSize: 4,
  globeColor: "#062056",
  showAtmosphere: true,
  atmosphereColor: "#f88221",
  atmosphereAltitude: 0.15,
  emissive: "#062056",
  emissiveIntensity: 0.12,
  shininess: 0.9,
  polygonColor: "rgba(248,130,33,0.45)",
  ambientLight: "#88ccff",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#f88221",
  arcTime: 1800,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  autoRotate: true,
  autoRotateSpeed: 0.6,
};

const ARC_COLORS = ["#f88221", "#ff6b35", "#ffa94d"] as const;

const GLOBE_ARCS: Position[] = [
  {
    order: 1,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.4,
    color: ARC_COLORS[0],
  },
  {
    order: 1,
    startLat: 51.5074,
    startLng: -0.1278,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.5,
    color: ARC_COLORS[1],
  },
  {
    order: 2,
    startLat: -33.8688,
    startLng: 151.2093,
    endLat: 48.8566,
    endLng: 2.3522,
    arcAlt: 0.6,
    color: ARC_COLORS[2],
  },
  {
    order: 2,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 55.7558,
    endLng: 37.6173,
    arcAlt: 0.3,
    color: ARC_COLORS[0],
  },
  {
    order: 3,
    startLat: 37.5665,
    startLng: 126.978,
    endLat: -22.9068,
    endLng: -43.1729,
    arcAlt: 0.7,
    color: ARC_COLORS[1],
  },
  {
    order: 3,
    startLat: 25.2048,
    startLng: 55.2708,
    endLat: -34.6037,
    endLng: -58.3816,
    arcAlt: 0.5,
    color: ARC_COLORS[2],
  },
  {
    order: 4,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 31.2304,
    endLng: 121.4737,
    arcAlt: 0.4,
    color: ARC_COLORS[2],
  },
  {
    order: 4,
    startLat: 52.52,
    startLng: 13.405,
    endLat: 28.6139,
    endLng: 77.209,
    arcAlt: 0.3,
    color: ARC_COLORS[0],
  },
  {
    order: 5,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 51.5074,
    endLng: -0.1278,
    arcAlt: 0.4,
    color: ARC_COLORS[0],
  },
  {
    order: 5,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: -33.8688,
    endLng: 151.2093,
    arcAlt: 0.2,
    color: ARC_COLORS[1],
  },
  {
    order: 6,
    startLat: 37.5665,
    startLng: 126.978,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.1,
    color: ARC_COLORS[1],
  },
  {
    order: 7,
    startLat: 49.2827,
    startLng: -123.1207,
    endLat: 52.3676,
    endLng: 4.9041,
    arcAlt: 0.2,
    color: ARC_COLORS[1],
  },
];

/* ── Marquee images ──────────────────────────────────────────────── */

const MARQUEE_IMAGES = [
  "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
  "https://assets.aceternity.com/animated-modal.png",
  "https://assets.aceternity.com/animated-testimonials.webp",
  "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
  "https://assets.aceternity.com/github-globe.png",
  "https://assets.aceternity.com/glare-card.png",
  "https://assets.aceternity.com/layout-grid.png",
  "https://assets.aceternity.com/flip-text.png",
  "https://assets.aceternity.com/hero-highlight.png",
  "https://assets.aceternity.com/carousel.webp",
  "https://assets.aceternity.com/spotlight-new.webp",
  "https://assets.aceternity.com/tabs.png",
];

/* ── Visuals ─────────────────────────────────────────────────────── */

export function GlobeVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute -bottom-10 h-[460px] w-full">
        <GlobeClient globeConfig={GLOBE_CONFIG} data={GLOBE_ARCS} />
      </div>
    </div>
  );
}

export function MarqueeVisual() {
  return (
    <div className="absolute inset-0">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_26%,rgba(248,130,33,0.18),transparent_42%)]"
      />
      <ThreeDMarquee images={MARQUEE_IMAGES} className="absolute inset-0" />
    </div>
  );
}
