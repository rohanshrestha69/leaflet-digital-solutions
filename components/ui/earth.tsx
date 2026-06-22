// components/ui/earth.tsx
"use client";

import {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
  type CSSProperties,
} from "react";
import * as THREE from "three";

// ═══════════════════════════════════════════════════════════════════════════
// DEVICE PROFILE
// ═══════════════════════════════════════════════════════════════════════════

interface DeviceProfile {
  tier: "low" | "mid" | "high";
  pixelRatio: number;
  hexResolution: number;
}

function getDeviceProfile(): DeviceProfile {
  if (typeof window === "undefined") {
    return { tier: "mid", pixelRatio: 1, hexResolution: 3 };
  }

  const dpr = window.devicePixelRatio ?? 1;
  const cores = navigator.hardwareConcurrency ?? 4;
  const mem = (navigator as { deviceMemory?: number }).deviceMemory ?? 4;

  if (cores <= 2 || mem <= 2) {
    return { tier: "low", pixelRatio: 1, hexResolution: 2 };
  }

  if (cores <= 4 || mem <= 4) {
    return {
      tier: "mid",
      pixelRatio: Math.min(dpr, 1.5),
      hexResolution: 3,
    };
  }

  return {
    tier: "high",
    pixelRatio: Math.min(dpr, 2),
    hexResolution: 3,
  };
}

const DEVICE = getDeviceProfile();

// ═══════════════════════════════════════════════════════════════════════════
// WEBGL PROBE
// ═══════════════════════════════════════════════════════════════════════════

function probeWebGL(): { ok: boolean; attrs: WebGLContextAttributes } {
  const attrs: WebGLContextAttributes = {
    alpha: true,
    antialias: false,
    stencil: false,
    depth: true,
    preserveDrawingBuffer: false,
    powerPreference: "default",
    failIfMajorPerformanceCaveat: false,
  };

  if (typeof document === "undefined") {
    return { ok: false, attrs };
  }

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;

  try {
    const gl =
      canvas.getContext("webgl2", attrs) ??
      canvas.getContext("webgl", attrs) ??
      canvas.getContext("experimental-webgl", attrs);

    if (gl) {
      (gl as WebGLRenderingContext | WebGL2RenderingContext)
        .getExtension?.("WEBGL_lose_context")
        ?.loseContext();
      canvas.remove();
      return { ok: true, attrs };
    }
  } catch {
    // blocked / unavailable
  }

  canvas.remove();
  return { ok: false, attrs };
}

// ═══════════════════════════════════════════════════════════════════════════
// PUBLIC TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface EarthArc {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt?: number | null;
  color: string | [string, string];
  label?: string;
}

export interface EarthRing {
  lat: number;
  lng: number;
  color: string | string[];
  maxR: number;
  propagationSpeed: number;
  repeatPeriod: number;
}

export interface EarthHexPolygon {
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
  [key: string]: unknown;
}

export interface EarthConfig {
  // Camera
  cameraAltitude?: number;
  initialLat?: number;
  initialLng?: number;

  // Rotation
  autoRotate?: boolean;
  autoRotateSpeed?: number;

  // Interaction
  enableZoom?: boolean;
  enablePan?: boolean;

  // Globe surface
  /**
   * undefined -> use built-in default texture
   * null      -> intentionally no texture
   * string    -> use provided texture
   */
  globeImageUrl?: string | null;

  /**
   * undefined -> use built-in default bump map
   * null      -> intentionally no bump map
   * string    -> use provided bump map
   */
  bumpImageUrl?: string | null;

  globeColor?: string;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;

  // Atmosphere
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;

  // Hex polygons
  showHexPolygons?: boolean;
  hexPolygonColor?: string;
  hexPolygonResolution?: number;
  hexPolygonMargin?: number;
  hexPolygonAltitude?: number;
  hexPolygonUseDots?: boolean;

  // Arcs
  arcStroke?: number | null;
  arcDashLength?: number;
  arcDashGap?: number;
  arcDashAnimateTime?: number;
  arcAltitudeAutoScale?: number;
  arcsTransitionDuration?: number;

  // Rings
  ringAltitude?: number;

  // Lights
  ambientLightColor?: string;
  ambientLightIntensity?: number;
  directionalLightColor?: string;
  directionalLightIntensity?: number;
  directionalLightPosition?: [number, number, number];
  rimLightColor?: string;
  rimLightIntensity?: number;
  rimLightPosition?: [number, number, number];
}

export interface EarthHandle {
  flyTo: (
    coords: { lat: number; lng: number; altitude?: number },
    durationMs?: number,
  ) => void;
  pause: () => void;
  resume: () => void;
  getPointOfView: () => { lat: number; lng: number; altitude: number } | null;
}

export interface EarthProps {
  arcs?: EarthArc[];
  rings?: EarthRing[];
  hexPolygons?: EarthHexPolygon[];
  config?: EarthConfig;
  onReady?: () => void;
  className?: string;
  style?: CSSProperties;
}

// ═══════════════════════════════════════════════════════════════════════════
// DEFAULTS / RESOLUTION
// ═══════════════════════════════════════════════════════════════════════════

const CDN = "//unpkg.com/three-globe/example/img";
const DEFAULT_GLOBE_URL = `${CDN}/earth-night.jpg`;
const DEFAULT_BUMP_URL = `${CDN}/earth-topology.png`;

export interface ResolvedConfig {
  cameraAltitude: number;
  initialLat: number;
  initialLng: number;
  autoRotate: boolean;
  autoRotateSpeed: number;
  enableZoom: boolean;
  enablePan: boolean;
  globeImageUrl: string | null;
  bumpImageUrl: string | null;
  globeColor: string;
  emissive: string;
  emissiveIntensity: number;
  shininess: number;
  showAtmosphere: boolean;
  atmosphereColor: string;
  atmosphereAltitude: number;
  showHexPolygons: boolean;
  hexPolygonColor: string;
  hexPolygonResolution: number;
  hexPolygonMargin: number;
  hexPolygonAltitude: number;
  hexPolygonUseDots: boolean;
  arcStroke: number | null;
  arcDashLength: number;
  arcDashGap: number;
  arcDashAnimateTime: number;
  arcAltitudeAutoScale: number;
  arcsTransitionDuration: number;
  ringAltitude: number;
  ambientLightColor: string;
  ambientLightIntensity: number;
  directionalLightColor: string;
  directionalLightIntensity: number;
  directionalLightPosition: [number, number, number];
  rimLightColor: string;
  rimLightIntensity: number;
  rimLightPosition: [number, number, number];
}

function resolveConfig(user: EarthConfig = {}): ResolvedConfig {
  const globeImageUrl =
    user.globeImageUrl === undefined ? DEFAULT_GLOBE_URL : user.globeImageUrl;

  const bumpImageUrl =
    user.bumpImageUrl === undefined ? DEFAULT_BUMP_URL : user.bumpImageUrl;

  const showHexPolygons =
    user.showHexPolygons !== undefined
      ? user.showHexPolygons
      : globeImageUrl === null;

  return {
    cameraAltitude: user.cameraAltitude ?? 2.0,
    initialLat: user.initialLat ?? 20,
    initialLng: user.initialLng ?? 0,

    autoRotate: user.autoRotate ?? true,
    autoRotateSpeed: user.autoRotateSpeed ?? 0.4,

    enableZoom: user.enableZoom ?? false,
    enablePan: user.enablePan ?? false,

    globeImageUrl,
    bumpImageUrl,

    globeColor: user.globeColor ?? "#080e24",
    emissive: user.emissive ?? "#101a4a",
    emissiveIntensity: user.emissiveIntensity ?? 0.15,
    shininess: user.shininess ?? 8,

    showAtmosphere: user.showAtmosphere ?? true,
    atmosphereColor: user.atmosphereColor ?? "#4da8da",
    atmosphereAltitude: user.atmosphereAltitude ?? 0.2,

    showHexPolygons,
    hexPolygonColor: user.hexPolygonColor ?? "rgba(77, 168, 218, 0.65)",
    hexPolygonResolution: user.hexPolygonResolution ?? DEVICE.hexResolution,
    hexPolygonMargin: user.hexPolygonMargin ?? 0.62,
    hexPolygonAltitude: user.hexPolygonAltitude ?? 0.006,
    hexPolygonUseDots: user.hexPolygonUseDots ?? true,

    arcStroke: user.arcStroke === undefined ? 0.3 : user.arcStroke,
    arcDashLength: user.arcDashLength ?? 0.9,
    arcDashGap: user.arcDashGap ?? 4,
    arcDashAnimateTime: user.arcDashAnimateTime ?? 2400,
    arcAltitudeAutoScale: user.arcAltitudeAutoScale ?? 0.5,
    arcsTransitionDuration: user.arcsTransitionDuration ?? 800,

    ringAltitude: user.ringAltitude ?? 0.0015,

    ambientLightColor: user.ambientLightColor ?? "#4a6faf",
    ambientLightIntensity: user.ambientLightIntensity ?? 1.6,
    directionalLightColor: user.directionalLightColor ?? "#dce4ff",
    directionalLightIntensity: user.directionalLightIntensity ?? 1.0,
    directionalLightPosition: user.directionalLightPosition ?? [1, 1, 1],
    rimLightColor: user.rimLightColor ?? "#4da8da",
    rimLightIntensity: user.rimLightIntensity ?? 0.8,
    rimLightPosition: user.rimLightPosition ?? [-1, 0.3, -0.6],
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// STABLE ACCESSORS
// ═══════════════════════════════════════════════════════════════════════════

const ACC = {
  arcStartLat: (d: EarthArc) => d.startLat,
  arcStartLng: (d: EarthArc) => d.startLng,
  arcEndLat: (d: EarthArc) => d.endLat,
  arcEndLng: (d: EarthArc) => d.endLng,
  arcColor: (d: EarthArc) => d.color,
  arcAltitude: (d: EarthArc) => d.arcAlt ?? null,
  arcInitialGap: (d: EarthArc) => d.order,
  arcLabel: (d: EarthArc) => d.label ?? "",

  ringLat: (d: EarthRing) => d.lat,
  ringLng: (d: EarthRing) => d.lng,
  ringColor: (d: EarthRing) => d.color,
  ringMaxR: (d: EarthRing) => d.maxR,
  ringSpeed: (d: EarthRing) => d.propagationSpeed,
  ringRepeat: (d: EarthRing) => d.repeatPeriod,

  hexGeometry: (d: EarthHexPolygon) => d.geometry,
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// GLOBE.GL SHIM
// ═══════════════════════════════════════════════════════════════════════════

interface GlobeControls {
  autoRotate: boolean;
  autoRotateSpeed: number;
  enableZoom: boolean;
  enablePan: boolean;
  enableDamping: boolean;
  dampingFactor: number;
  minPolarAngle: number;
  maxPolarAngle: number;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
interface GlobeInstance {
  backgroundColor(color: string): this;
  width(w: number): this;
  height(h: number): this;
  renderer(): THREE.WebGLRenderer;
  scene(): THREE.Scene;
  controls(): GlobeControls;
  lights(lights: THREE.Light[]): this;
  globeMaterial(): THREE.Material;
  enablePointerInteraction(v: boolean): this;
  globeImageUrl(url: string): this;
  bumpImageUrl(url: string): this;
  showAtmosphere(v: boolean): this;
  atmosphereColor(c: string): this;
  atmosphereAltitude(a: number): this;
  pointOfView(
    pov: { lat: number; lng: number; altitude: number },
    ms?: number,
  ): this;
  pointOfView(): { lat: number; lng: number; altitude: number };

  arcsData(data: any[]): this;
  arcLabel(fn: (d: any) => string): this;
  arcStartLat(fn: (d: any) => number): this;
  arcStartLng(fn: (d: any) => number): this;
  arcEndLat(fn: (d: any) => number): this;
  arcEndLng(fn: (d: any) => number): this;
  arcColor(fn: (d: any) => any): this;
  arcAltitude(fn: (d: any) => number | null): this;
  arcAltitudeAutoScale(v: number): this;
  arcStroke(v: number | null): this;
  arcDashLength(v: number): this;
  arcDashGap(v: number): this;
  arcDashInitialGap(fn: (d: any) => number): this;
  arcDashAnimateTime(v: number): this;
  arcsTransitionDuration(v: number): this;

  ringsData(data: any[]): this;
  ringLat(fn: (d: any) => number): this;
  ringLng(fn: (d: any) => number): this;
  ringAltitude(v: number): this;
  ringColor(fn: (d: any) => any): this;
  ringMaxRadius(fn: (d: any) => number): this;
  ringPropagationSpeed(fn: (d: any) => number): this;
  ringRepeatPeriod(fn: (d: any) => number): this;

  hexPolygonsData(data: any[]): this;
  hexPolygonGeoJsonGeometry(fn: (d: any) => unknown): this;
  hexPolygonResolution(v: number): this;
  hexPolygonMargin(v: number): this;
  hexPolygonAltitude(v: number): this;
  hexPolygonUseDots(v: boolean): this;
  hexPolygonColor(fn: () => string): this;

  pauseAnimation(): void;
  resumeAnimation(): void;
  onGlobeReady(fn: () => void): this;
  _destructor?(): void;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// ═══════════════════════════════════════════════════════════════════════════
// APPLY CONFIG
// ═══════════════════════════════════════════════════════════════════════════

function applyConfig(
  globe: GlobeInstance,
  cfg: ResolvedConfig,
  hexPolygons: EarthHexPolygon[],
) {
  const mat = globe.globeMaterial() as THREE.MeshPhongMaterial;

  // ── Surface ─────────────────────────────────────────────────────────────
  if (cfg.globeImageUrl === null) {
    mat.map = null;
    mat.color.set(cfg.globeColor);
  } else {
    globe.globeImageUrl(cfg.globeImageUrl);
    mat.color.set("#ffffff");
  }

  if (cfg.bumpImageUrl === null) {
    mat.bumpMap = null;
  } else {
    globe.bumpImageUrl(cfg.bumpImageUrl);
  }

  mat.emissive.set(cfg.emissive);
  mat.emissiveIntensity = cfg.emissiveIntensity;
  mat.shininess = cfg.shininess;
  mat.needsUpdate = true;

  // ── Atmosphere ──────────────────────────────────────────────────────────
  globe
    .showAtmosphere(cfg.showAtmosphere)
    .atmosphereColor(cfg.atmosphereColor)
    .atmosphereAltitude(cfg.atmosphereAltitude);

  // ── Lights ──────────────────────────────────────────────────────────────
  const ambient = new THREE.AmbientLight(
    cfg.ambientLightColor,
    cfg.ambientLightIntensity,
  );

  const directional = new THREE.DirectionalLight(
    cfg.directionalLightColor,
    cfg.directionalLightIntensity,
  );
  directional.position.set(...cfg.directionalLightPosition);

  const rim = new THREE.DirectionalLight(
    cfg.rimLightColor,
    cfg.rimLightIntensity,
  );
  rim.position.set(...cfg.rimLightPosition);

  globe.lights([ambient, directional, rim]);

  // ── Controls ────────────────────────────────────────────────────────────
  const controls = globe.controls();
  controls.autoRotate = cfg.autoRotate;
  controls.autoRotateSpeed = cfg.autoRotateSpeed;
  controls.enableZoom = cfg.enableZoom;
  controls.enablePan = cfg.enablePan;

  // ── Arc config ──────────────────────────────────────────────────────────
  globe
    .arcAltitudeAutoScale(cfg.arcAltitudeAutoScale)
    .arcStroke(cfg.arcStroke)
    .arcDashLength(cfg.arcDashLength)
    .arcDashGap(cfg.arcDashGap)
    .arcDashAnimateTime(cfg.arcDashAnimateTime)
    .arcsTransitionDuration(cfg.arcsTransitionDuration);

  // ── Ring config ─────────────────────────────────────────────────────────
  globe.ringAltitude(cfg.ringAltitude);

  // ── Hex polygons ────────────────────────────────────────────────────────
  const hexColor = cfg.hexPolygonColor;

  globe
    .hexPolygonGeoJsonGeometry(
      ACC.hexGeometry as (d: object) => EarthHexPolygon["geometry"],
    )
    .hexPolygonResolution(cfg.hexPolygonResolution)
    .hexPolygonMargin(cfg.hexPolygonMargin)
    .hexPolygonAltitude(cfg.hexPolygonAltitude)
    .hexPolygonUseDots(cfg.hexPolygonUseDots)
    .hexPolygonColor(() => hexColor)
    .hexPolygonsData(cfg.showHexPolygons ? hexPolygons : []);
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export const Earth = forwardRef<EarthHandle, EarthProps>(function Earth(
  {
    arcs = [],
    rings = [],
    hexPolygons = [],
    config: userConfig,
    onReady,
    className,
    style,
  },
  ref,
) {
  const cfg = resolveConfig(userConfig);
  const cfgKey = JSON.stringify(cfg);

  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeInstance | null>(null);
  const mountedRef = useRef(false);
  const readyFiredRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  const fireReady = useCallback(() => {
    if (readyFiredRef.current) return;
    readyFiredRef.current = true;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    onReadyRef.current?.();
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      flyTo({ lat, lng, altitude }, durationMs = 1200) {
        globeRef.current?.pointOfView(
          {
            lat,
            lng,
            altitude: altitude ?? cfg.cameraAltitude,
          },
          durationMs,
        );
      },
      pause() {
        globeRef.current?.pauseAnimation();
      },
      resume() {
        globeRef.current?.resumeAnimation();
      },
      getPointOfView() {
        return globeRef.current?.pointOfView() ?? null;
      },
    }),
    [cfg.cameraAltitude],
  );

  // Pause/resume when tab is hidden
  useEffect(() => {
    const handler = () => {
      const globe = globeRef.current;
      if (!globe) return;
      if (document.hidden) globe.pauseAnimation();
      else globe.resumeAnimation();
    };

    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  // Initial mount
  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    const container = containerRef.current;
    if (!container) return;

    const probe = probeWebGL();
    if (!probe.ok) {
      console.warn("[Earth] WebGL unavailable — globe disabled.");
      fireReady();
      return;
    }

    let cancelled = false;

    import("globe.gl")
      .then(({ default: GlobeGL }) => {
        if (cancelled || !containerRef.current) return;

        let globe: GlobeInstance;
        try {
          globe = new (GlobeGL as unknown as {
            new (
              el: HTMLElement,
              opts?: Record<string, unknown>,
            ): GlobeInstance;
          })(containerRef.current, {
            animateIn: false,
            waitForGlobeReady: true,
            rendererConfig: probe.attrs,
          });
        } catch (err) {
          console.warn("[Earth] globe.gl init failed:", err);
          fireReady();
          return;
        }

        globeRef.current = globe;

        // Renderer
        const renderer = globe.renderer();
        renderer.setPixelRatio(DEVICE.pixelRatio);
        renderer.setClearColor(0x000000, 0);
        renderer.toneMapping = THREE.NoToneMapping;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.shadowMap.enabled = false;

        // Scene
        globe.backgroundColor("rgba(0,0,0,0)");
        const scene = globe.scene();
        scene.background = null;
        scene.fog = null;

        // Initial size
        globe
          .width(container.clientWidth || 1)
          .height(container.clientHeight || 1);

        // Camera
        globe.pointOfView({
          lat: cfg.initialLat,
          lng: cfg.initialLng,
          altitude: cfg.cameraAltitude,
        });

        // Controls base setup
        const controls = globe.controls();
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;
        controls.minPolarAngle = Math.PI / 3.5;
        controls.maxPolarAngle = Math.PI - Math.PI / 3;

        globe.enablePointerInteraction(false);

        // Stable accessors — set once
        globe
          .arcLabel(ACC.arcLabel as (d: object) => string)
          .arcStartLat(ACC.arcStartLat as (d: object) => number)
          .arcStartLng(ACC.arcStartLng as (d: object) => number)
          .arcEndLat(ACC.arcEndLat as (d: object) => number)
          .arcEndLng(ACC.arcEndLng as (d: object) => number)
          .arcColor(ACC.arcColor as (d: object) => unknown)
          .arcAltitude(ACC.arcAltitude as (d: object) => number | null)
          .arcDashInitialGap(ACC.arcInitialGap as (d: object) => number);

        globe
          .ringLat(ACC.ringLat as (d: object) => number)
          .ringLng(ACC.ringLng as (d: object) => number)
          .ringColor(ACC.ringColor as (d: object) => unknown)
          .ringMaxRadius(ACC.ringMaxR as (d: object) => number)
          .ringPropagationSpeed(ACC.ringSpeed as (d: object) => number)
          .ringRepeatPeriod(ACC.ringRepeat as (d: object) => number);

        globe.hexPolygonGeoJsonGeometry(
          ACC.hexGeometry as (d: object) => EarthHexPolygon["geometry"],
        );

        // Apply config
        applyConfig(globe, cfg, hexPolygons);

        // Feed data
        globe.arcsData(arcs);
        globe.ringsData(rings);

        // Ready handling
        globe.onGlobeReady(fireReady);
        timerRef.current = setTimeout(fireReady, 3000);

        // Resize
        const ro = new ResizeObserver(() => {
          const el = containerRef.current;
          const g = globeRef.current;
          if (!el || !g) return;
          g.width(el.clientWidth || 1).height(el.clientHeight || 1);
        });
        ro.observe(container);
        (globe as unknown as { _ro?: ResizeObserver })._ro = ro;
      })
      .catch((err) => {
        console.warn("[Earth] Failed to load globe.gl:", err);
        fireReady();
      });

    return () => {
      cancelled = true;

      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      const globe = globeRef.current;
      if (globe) {
        (globe as unknown as { _ro?: ResizeObserver })._ro?.disconnect();
        try {
          globe.pauseAnimation();
        } catch {
          // ignore
        }
        try {
          globe._destructor?.();
        } catch {
          // ignore
        }
        globeRef.current = null;
      }

      mountedRef.current = false;
      readyFiredRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Config changes
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    applyConfig(globe, cfg, hexPolygons);
  }, [cfgKey, hexPolygons]);

  // Data changes
  useEffect(() => {
    globeRef.current?.arcsData(arcs);
  }, [arcs]);

  useEffect(() => {
    globeRef.current?.ringsData(rings);
  }, [rings]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        transform: "translateZ(0)",
        willChange: "transform",
        backfaceVisibility: "hidden",
        isolation: "isolate",
        ...style,
      }}
    />
  );
});

Earth.displayName = "Earth";
export default Earth;
