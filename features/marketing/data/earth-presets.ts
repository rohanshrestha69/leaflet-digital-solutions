// features/marketing/data/earth-presets.ts

import type { EarthConfig } from "@/components/ui/earth";

const CDN = "//unpkg.com/three-globe/example/img";

export const EARTH_PRESETS = {
  nightCities: {
    globeImageUrl: `${CDN}/earth-night.jpg`,
    bumpImageUrl: `${CDN}/earth-topology.png`,
    globeColor: "#080e24",
    emissive: "#101a4a",
    emissiveIntensity: 0.25,
    shininess: 6,
    showAtmosphere: true,
    atmosphereColor: "#4da8da",
    atmosphereAltitude: 0.22,
    ambientLightColor: "#3a5fa0",
    ambientLightIntensity: 1.4,
    directionalLightColor: "#dce4ff",
    directionalLightIntensity: 0.9,
    rimLightColor: "#4da8da",
    rimLightIntensity: 1.0,
    showHexPolygons: false,
  },

  blueMarble: {
    globeImageUrl: `${CDN}/earth-blue-marble.jpg`,
    bumpImageUrl: `${CDN}/earth-topology.png`,
    globeColor: "#071030",
    emissive: "#071030",
    emissiveIntensity: 0.1,
    shininess: 5,
    showAtmosphere: true,
    atmosphereColor: "#0033b5",
    atmosphereAltitude: 0.24,
    ambientLightColor: "#6080cc",
    ambientLightIntensity: 1.2,
    directionalLightColor: "#ffffff",
    directionalLightIntensity: 1,
    rimLightColor: "#001172",
    rimLightIntensity: 2,
    showHexPolygons: false,
  },

  dayDimmed: {
    globeImageUrl: `${CDN}/earth-day.jpg`,
    bumpImageUrl: `${CDN}/earth-topology.png`,
    globeColor: "#0a1128",
    emissive: "#000510",
    emissiveIntensity: 0.04,
    shininess: 5,
    showAtmosphere: true,
    atmosphereColor: "#6aabcf",
    atmosphereAltitude: 0.18,
    ambientLightColor: "#2a4a8f",
    ambientLightIntensity: 0.7,
    directionalLightColor: "#c8d4ff",
    directionalLightIntensity: 0.65,
    rimLightColor: "#4da8da",
    rimLightIntensity: 0.8,
    showHexPolygons: false,
  },

  darkLifted: {
    globeImageUrl: `${CDN}/earth-dark.jpg`,
    bumpImageUrl: `${CDN}/earth-topology.png`,
    globeColor: "#060c20",
    emissive: "#142860",
    emissiveIntensity: 0.35,
    shininess: 8,
    showAtmosphere: true,
    atmosphereColor: "#4da8da",
    atmosphereAltitude: 0.24,
    ambientLightColor: "#4a6faf",
    ambientLightIntensity: 2.0,
    directionalLightColor: "#ffffff",
    directionalLightIntensity: 1.5,
    rimLightColor: "#4da8da",
    rimLightIntensity: 1.1,
    showHexPolygons: false,
  },

  // Uses default texture because globeImageUrl is omitted
  hexDots: {
    showAtmosphere: true,
    atmosphereColor: "#1a6fb5",
    atmosphereAltitude: 0.22,
    showHexPolygons: true,
    hexPolygonColor: "rgba(77, 168, 218, 1)",
    hexPolygonUseDots: true,
    hexPolygonMargin: 0.62,
    hexPolygonAltitude: 0.006,
    ambientLightColor: "#1a3a8a",
    ambientLightIntensity: 1.8,
    directionalLightColor: "#dce4ff",
    directionalLightIntensity: 1.1,
    rimLightColor: "#0a3c6e",
    rimLightIntensity: 0.9,
  },

  // Uses default texture because globeImageUrl is omitted
  hexOutlines: {
    showAtmosphere: true,
    atmosphereColor: "#2a7ab5",
    atmosphereAltitude: 0.2,
    showHexPolygons: true,
    hexPolygonColor: "rgba(77, 168, 218, 0.5)",
    hexPolygonUseDots: false,
    hexPolygonMargin: 0.7,
    hexPolygonAltitude: 0.004,
    ambientLightColor: "#1a3a8a",
    ambientLightIntensity: 1.8,
    directionalLightColor: "#dce4ff",
    directionalLightIntensity: 1.0,
    rimLightColor: "#0a3c6e",
    rimLightIntensity: 0.8,
  },

  // Optional true no-texture preset
  hexMinimalNoTexture: {
    globeImageUrl: null,
    bumpImageUrl: null,
    globeColor: "#060a18",
    emissive: "#081028",
    emissiveIntensity: 0.32,
    shininess: 4,
    showAtmosphere: true,
    atmosphereColor: "#0033b5",
    atmosphereAltitude: 0.2,
    // showHexPolygons: true,
    hexPolygonColor: "rgba(77, 168, 218, 0.8)",
    hexPolygonUseDots: true,
    hexPolygonMargin: 0.7,
    hexPolygonAltitude: 0.004,
    ambientLightColor: "#1a3a8a",
    ambientLightIntensity: 5,
    directionalLightColor: "#dce4ff",
    directionalLightIntensity: 2.0,
    rimLightColor: "#001172",
    rimLightIntensity: 2,
  },
} as const satisfies Record<string, EarthConfig>;

export type EarthPresetKey = keyof typeof EARTH_PRESETS;

export const EARTH_PRESET_KEYS = Object.keys(EARTH_PRESETS) as EarthPresetKey[];

export const EARTH_PRESET_LABELS: Record<EarthPresetKey, string> = {
  nightCities: "Night Cities",
  blueMarble: "Blue Marble",
  dayDimmed: "Day (Dimmed)",
  darkLifted: "Dark Lifted",
  hexDots: "Hex Dots",
  hexOutlines: "Hex Outlines",
  hexMinimalNoTexture: "Hex Minimal (No Texture)",
};
