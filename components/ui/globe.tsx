"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Scene, PerspectiveCamera, Vector3, Color, Group } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/features/marketing/data/globe.json";

/* ── Constants ───────────────────────────────────────────────────── */

const CAMERA_Z = 300;
const CAMERA_FOV = 50;
const DPR_CAP = 1.5;
const HEX_RESOLUTION = 3;
const RING_TICK_MS = 3000;
const RING_PROPAGATION_SPEED = 3;

const LIGHT_POS_KEY = new Vector3(-400, 100, 400);
const LIGHT_POS_FILL = new Vector3(-200, 500, 200);

/* ── Types ───────────────────────────────────────────────────────── */

export type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

/* ── Stable accessors (defined once) ─────────────────────────────── */

const arcStartLat = (d: object) => (d as Position).startLat;
const arcStartLng = (d: object) => (d as Position).startLng;
const arcEndLat = (d: object) => (d as Position).endLat;
const arcEndLng = (d: object) => (d as Position).endLng;
const arcColor = (d: object) => (d as Position).color;
const arcAltitude = (d: object) => (d as Position).arcAlt;
const arcDashGap = (d: object) => (d as Position).order;
const pointColor = (d: object) => (d as { color: string }).color;

/* ── Sampling utility ────────────────────────────────────────────── */

function sampleIndices(count: number, total: number): number[] {
  const indices = Array.from({ length: total }, (_, i) => i);
  const safeCount = Math.min(count, total);
  for (let i = 0; i < safeCount; i++) {
    const j = i + Math.floor(Math.random() * (total - i));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, safeCount);
}

/* ── Renderer config ─────────────────────────────────────────────── */

function RendererConfig() {
  const { gl } = useThree();

  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, DPR_CAP));
    gl.setClearColor(0x000000, 0);
  }, [gl]);

  return null;
}

/* ── Globe mesh ──────────────────────────────────────────────────── */

function GlobeMesh({ globeConfig, data }: WorldProps) {
  const groupRef = useRef<Group>(null);
  const globeRef = useRef<ThreeGlobe | null>(null);
  const ringTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [ready, setReady] = useState(false);

  const config = useMemo(
    () => ({
      pointSize: 1,
      atmosphereColor: "#ffffff",
      showAtmosphere: true,
      atmosphereAltitude: 0.1,
      polygonColor: "rgba(255,255,255,0.7)",
      globeColor: "#1d072e",
      emissive: "#000000",
      emissiveIntensity: 0.1,
      shininess: 0.9,
      arcTime: 2000,
      arcLength: 0.9,
      rings: 1,
      maxRings: 3,
      autoRotate: true,
      autoRotateSpeed: 1,
      ...globeConfig,
    }),
    [globeConfig],
  );

  /* Create globe once */
  useEffect(() => {
    if (globeRef.current || !groupRef.current) return;

    const globe = new ThreeGlobe({ waitForGlobeReady: true, animateIn: false });
    globeRef.current = globe;
    groupRef.current.add(globe);
    setReady(true);

    return () => {
      if (ringTimerRef.current) clearInterval(ringTimerRef.current);
      groupRef.current?.remove(globe);
      (globe as unknown as { _destructor?: () => void })._destructor?.();
      globeRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Material */
  useEffect(() => {
    if (!globeRef.current || !ready) return;

    const mat = globeRef.current.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };

    mat.color = new Color(config.globeColor);
    mat.emissive = new Color(config.emissive);
    mat.emissiveIntensity = config.emissiveIntensity;
    mat.shininess = config.shininess;
  }, [
    ready,
    config.globeColor,
    config.emissive,
    config.emissiveIntensity,
    config.shininess,
  ]);

  /* Data */
  useEffect(() => {
    if (!globeRef.current || !ready || !data.length) return;

    const globe = globeRef.current;

    const pointMap = new Map<
      string,
      { lat: number; lng: number; color: string; size: number; order: number }
    >();

    for (const arc of data) {
      const sk = `${arc.startLat}:${arc.startLng}`;
      const ek = `${arc.endLat}:${arc.endLng}`;

      if (!pointMap.has(sk)) {
        pointMap.set(sk, {
          lat: arc.startLat,
          lng: arc.startLng,
          color: arc.color,
          size: config.pointSize,
          order: arc.order,
        });
      }

      if (!pointMap.has(ek)) {
        pointMap.set(ek, {
          lat: arc.endLat,
          lng: arc.endLng,
          color: arc.color,
          size: config.pointSize,
          order: arc.order,
        });
      }
    }

    globe
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(HEX_RESOLUTION)
      .hexPolygonMargin(0.7)
      .showAtmosphere(config.showAtmosphere)
      .atmosphereColor(config.atmosphereColor)
      .atmosphereAltitude(config.atmosphereAltitude)
      .hexPolygonColor(() => config.polygonColor);

    globe
      .arcsData(data)
      .arcStartLat(arcStartLat)
      .arcStartLng(arcStartLng)
      .arcEndLat(arcEndLat)
      .arcEndLng(arcEndLng)
      .arcColor(arcColor)
      .arcAltitude(arcAltitude)
      .arcStroke(0.3)
      .arcDashLength(config.arcLength)
      .arcDashInitialGap(arcDashGap)
      .arcDashGap(15)
      .arcDashAnimateTime(() => config.arcTime);

    globe
      .pointsData(Array.from(pointMap.values()))
      .pointColor(pointColor)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(0.3);

    globe
      .ringsData([])
      .ringColor((d: unknown) => (d as { color: string }).color)
      .ringMaxRadius(config.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod((config.arcTime * config.arcLength) / config.rings);
  }, [ready, data, config]);

  /* Rings */
  const updateRings = useCallback(() => {
    if (!globeRef.current || !data.length) return;

    const sampleCount = Math.max(1, Math.floor((data.length * 4) / 5));
    const indices = sampleIndices(sampleCount, data.length);

    globeRef.current.ringsData(
      indices.map((i) => ({
        lat: data[i].startLat,
        lng: data[i].startLng,
        color: data[i].color,
      })),
    );
  }, [data]);

  useEffect(() => {
    if (!ready || !data.length) return;

    updateRings();

    if (ringTimerRef.current) clearInterval(ringTimerRef.current);
    ringTimerRef.current = setInterval(updateRings, RING_TICK_MS);

    return () => {
      if (ringTimerRef.current) clearInterval(ringTimerRef.current);
    };
  }, [ready, data, updateRings]);

  return <group ref={groupRef} />;
}

/* ── World ───────────────────────────────────────────────────────── */

export function World({ globeConfig, data }: WorldProps) {
  const scene = useMemo(() => new Scene(), []);

  const camera = useMemo(
    () => new PerspectiveCamera(CAMERA_FOV, 1.2, 180, 1800),
    [],
  );

  return (
    <Canvas
      scene={scene}
      camera={camera}
      frameloop="always"
      dpr={[1, DPR_CAP]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
        preserveDrawingBuffer: false,
      }}
      style={{ background: "transparent" }}
    >
      <RendererConfig />

      <ambientLight
        color={globeConfig.ambientLight ?? "#88ccff"}
        intensity={1.2}
      />
      <directionalLight
        color={globeConfig.directionalLeftLight ?? "#ffffff"}
        position={LIGHT_POS_KEY}
        intensity={1.0}
      />
      <directionalLight
        color={globeConfig.directionalTopLight ?? "#ffffff"}
        position={LIGHT_POS_FILL}
        intensity={0.8}
      />

      <GlobeMesh globeConfig={globeConfig} data={data} />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={CAMERA_Z}
        maxDistance={CAMERA_Z}
        autoRotate={globeConfig.autoRotate ?? true}
        autoRotateSpeed={globeConfig.autoRotateSpeed ?? 1}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.4}
      />
    </Canvas>
  );
}
