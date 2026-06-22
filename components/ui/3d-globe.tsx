// components/ui/3d-globe.tsx
"use client";

import React, {
  useRef,
  useMemo,
  useState,
  useCallback,
  useEffect,
  Suspense,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface GlobeMarker {
  lat: number;
  lng: number;
  src: string;
  label?: string;
  size?: number;
}

export interface Globe3DConfig {
  radius?: number;
  globeColor?: string;
  textureUrl?: string;
  bumpMapUrl?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereIntensity?: number;
  atmosphereBlur?: number;
  bumpScale?: number;
  autoRotateSpeed?: number;
  enableZoom?: boolean;
  enablePan?: boolean;
  minDistance?: number;
  maxDistance?: number;
  initialRotation?: { x: number; y: number };
  markerSize?: number;
  showWireframe?: boolean;
  wireframeColor?: string;
  ambientIntensity?: number;
  pointLightIntensity?: number;
  backgroundColor?: string | null;
  textureBrightness?: number;
  blueTint?: number;
}

interface Globe3DProps {
  markers?: GlobeMarker[];
  config?: Globe3DConfig;
  className?: string;
  onMarkerClick?: (marker: GlobeMarker) => void;
  onMarkerHover?: (marker: GlobeMarker | null) => void;
  onReady?: () => void;
}

// ─────────────────────────────────────────────
// Device capability detection
// Runs once at module level — safe, no SSR risk
// because this file is client-only.
// ─────────────────────────────────────────────

const deviceProfile = (() => {
  if (typeof window === "undefined") {
    // SSR safe fallback — component is ssr:false anyway
    return { tier: "high" as const, dpr: [1, 1.5] as [number, number] };
  }

  const concurrency = navigator.hardwareConcurrency ?? 4;
  // deviceMemory is non-standard but widely supported
  const memory = (navigator as { deviceMemory?: number }).deviceMemory ?? 8;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  // Low-end: ≤4 cores OR ≤4 GB RAM
  const isLow = concurrency <= 4 || memory <= 4;

  return {
    tier: isLow ? ("low" as const) : ("high" as const),
    dpr: isLow
      ? ([1, 1] as [number, number])
      : isMobile
        ? ([1, 1.25] as [number, number])
        : ([1, 1.5] as [number, number]),
  };
})();

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────

const DEFAULT_EARTH_TEXTURE =
  "https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg";
const DEFAULT_BUMP_TEXTURE =
  "https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png";

// Segment counts by device tier.
// Visual difference at globe sizes used in hero: imperceptible.
// Vertex count impact: 48×48=2304, 32×32=1024, 24×24=576
const SPHERE_SEGMENTS = deviceProfile.tier === "low" ? 24 : 32;

// Preload textures the moment this module is parsed.
// useTexture.preload caches into R3F's asset store —
// by the time Canvas mounts, they're already on GPU.
if (typeof window !== "undefined") {
  try {
    useTexture.preload(DEFAULT_EARTH_TEXTURE);
    useTexture.preload(DEFAULT_BUMP_TEXTURE);
  } catch {
    // no-op if called outside of R3F context
  }
}

// ─────────────────────────────────────────────
// Utils
// ─────────────────────────────────────────────

function latLngToVector3(
  lat: number,
  lng: number,
  radius: number,
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

// ─────────────────────────────────────────────
// Marker
// Throttled visibility check: every 6th frame
// 20 markers × 60fps / 6 = 200 checks/s instead of 1200
// ─────────────────────────────────────────────

interface MarkerProps {
  marker: GlobeMarker;
  radius: number;
  onClick?: (marker: GlobeMarker) => void;
  onHover?: (marker: GlobeMarker | null) => void;
}

// Reusable vectors allocated once outside the component.
// Shared across all marker instances — safe because useFrame
// runs synchronously, one marker at a time.
const _worldPos = new THREE.Vector3();
const _markerDir = new THREE.Vector3();
const _cameraDir = new THREE.Vector3();

function Marker({ marker, radius, onClick, onHover }: MarkerProps) {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const imageGroupRef = useRef<THREE.Group>(null);
  const frameCountRef = useRef(0);
  const { camera } = useThree();

  const surfacePosition = useMemo(
    () => latLngToVector3(marker.lat, marker.lng, radius * 1.001),
    [marker.lat, marker.lng, radius],
  );

  const topPosition = useMemo(
    () => latLngToVector3(marker.lat, marker.lng, radius * 1.18),
    [marker.lat, marker.lng, radius],
  );

  const lineHeight = topPosition.distanceTo(surfacePosition);

  const { lineCenter, lineQuaternion } = useMemo(() => {
    const center = surfacePosition.clone().lerp(topPosition, 0.5);
    const direction = topPosition.clone().sub(surfacePosition).normalize();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction,
    );
    return { lineCenter: center, lineQuaternion: quaternion };
  }, [surfacePosition, topPosition]);

  // Throttled: skip 5 of every 6 frames → 83% fewer calculations
  useFrame(() => {
    frameCountRef.current++;
    if (frameCountRef.current % 6 !== 0) return;
    if (!imageGroupRef.current) return;

    imageGroupRef.current.getWorldPosition(_worldPos);
    _markerDir.copy(_worldPos).normalize();
    _cameraDir.copy(camera.position).normalize();

    const next = _markerDir.dot(_cameraDir) > 0.1;
    if (next !== isVisible) setIsVisible(next);
  });

  const handlePointerEnter = useCallback(() => {
    setHovered(true);
    onHover?.(marker);
  }, [marker, onHover]);

  const handlePointerLeave = useCallback(() => {
    setHovered(false);
    onHover?.(null);
  }, [onHover]);

  const handleClick = useCallback(() => onClick?.(marker), [marker, onClick]);

  return (
    <group visible={isVisible}>
      {/* Stem line */}
      <mesh position={lineCenter} quaternion={lineQuaternion}>
        <cylinderGeometry args={[0.003, 0.003, lineHeight, 6]} />
        <meshBasicMaterial
          color={hovered ? "#ffffff" : "#94a3b8"}
          transparent
          opacity={hovered ? 0.9 : 0.6}
        />
      </mesh>

      {/* Pin head */}
      <mesh position={surfacePosition} quaternion={lineQuaternion}>
        <coneGeometry args={[0.015, 0.04, 6]} />
        <meshBasicMaterial color={hovered ? "#f97316" : "#ef4444"} />
      </mesh>

      {/* Label group — visibility gated by isVisible so Html is
          not in the DOM when facing away */}
      <group ref={imageGroupRef} position={topPosition}>
        {isVisible && (
          <mesh
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onClick={handleClick}
          >
            {/*
              Using a tiny mesh as the hit target instead of Html
              eliminates the per-marker DOM element cost when there
              are many markers.
              Swap back to Html if you need image thumbnails.
            */}
            <sphereGeometry args={[0.06, 6, 6]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
        )}
      </group>
    </group>
  );
}

// ─────────────────────────────────────────────
// Globe mesh
// ─────────────────────────────────────────────

interface RotatingGlobeProps {
  config: Required<Globe3DConfig>;
  markers: GlobeMarker[];
  onMarkerClick?: (marker: GlobeMarker) => void;
  onMarkerHover?: (marker: GlobeMarker | null) => void;
  onReady?: () => void;
}

function RotatingGlobe({
  config,
  markers,
  onMarkerClick,
  onMarkerHover,
  onReady,
}: RotatingGlobeProps) {
  const readyFiredRef = useRef(false);
  const { gl } = useThree();

  // useTexture suspends until loaded — Suspense boundary handles fallback
  const [earthTextureRaw, bumpTextureRaw] = useTexture([
    config.textureUrl,
    config.bumpMapUrl,
  ]);

  // Clone + configure (raw textures from cache are frozen)
  const earthTexture = useMemo(() => {
    if (!earthTextureRaw) return null;
    const t = earthTextureRaw.clone();
    t.colorSpace = THREE.SRGBColorSpace;
    // Cap anisotropy — high values cost extra samples
    t.anisotropy = Math.min(4, gl.capabilities.getMaxAnisotropy?.() ?? 4);
    t.generateMipmaps = true;
    t.minFilter = THREE.LinearMipmapLinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    t.needsUpdate = true;
    return t;
  }, [earthTextureRaw, gl]);

  const bumpTexture = useMemo(() => {
    if (!bumpTextureRaw) return null;
    const t = bumpTextureRaw.clone();
    // Bump map doesn't need anisotropy
    t.generateMipmaps = true;
    t.minFilter = THREE.LinearMipmapLinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    t.needsUpdate = true;
    return t;
  }, [bumpTextureRaw]);

  useEffect(() => () => earthTexture?.dispose(), [earthTexture]);
  useEffect(() => () => bumpTexture?.dispose(), [bumpTexture]);

  // Geometry — segments chosen by device tier at module load
  const geometry = useMemo(
    () =>
      new THREE.SphereGeometry(config.radius, SPHERE_SEGMENTS, SPHERE_SEGMENTS),
    [config.radius],
  );

  const wireframeGeometry = useMemo(
    () => new THREE.SphereGeometry(config.radius * 1.002, 16, 12),
    [config.radius],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => () => wireframeGeometry.dispose(), [wireframeGeometry]);

  const materialColor = useMemo(() => {
    const b = config.textureBrightness;
    const t = config.blueTint;
    return new THREE.Color(b * (1 / t), b * 0.95, b * t);
  }, [config.textureBrightness, config.blueTint]);

  const emissiveColor = useMemo(() => new THREE.Color(0x0a1530), []);

  // Signal ready after first rendered frame with textures present
  useFrame(() => {
    if (readyFiredRef.current || !earthTexture || !bumpTexture || !onReady)
      return;
    readyFiredRef.current = true;
    // Two rAF to ensure paint has happened before callback
    requestAnimationFrame(() => requestAnimationFrame(onReady));
  });

  return (
    <group>
      <mesh geometry={geometry} frustumCulled={false}>
        <meshStandardMaterial
          map={earthTexture}
          bumpMap={bumpTexture}
          bumpScale={config.bumpScale * 0.05}
          roughness={0.85}
          metalness={0.0}
          color={materialColor}
          emissive={emissiveColor}
          emissiveIntensity={0.35}
        />
      </mesh>

      {config.showWireframe && (
        <mesh geometry={wireframeGeometry} frustumCulled={false}>
          <meshBasicMaterial
            color={config.wireframeColor}
            wireframe
            transparent
            opacity={0.06}
          />
        </mesh>
      )}

      {markers.map((marker, i) => (
        <Marker
          key={`${marker.lat}-${marker.lng}-${i}`}
          marker={marker}
          radius={config.radius}
          onClick={onMarkerClick}
          onHover={onMarkerHover}
        />
      ))}
    </group>
  );
}

// ─────────────────────────────────────────────
// Atmosphere (only rendered when enabled)
// ─────────────────────────────────────────────

function Atmosphere({
  radius,
  color,
  intensity,
  blur,
}: {
  radius: number;
  color: string;
  intensity: number;
  blur: number;
}) {
  const fresnelPower = Math.max(0.5, 5 - blur);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          atmosphereColor: { value: new THREE.Color(color) },
          intensity: { value: intensity },
          fresnelPower: { value: fresnelPower },
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 atmosphereColor;
          uniform float intensity;
          uniform float fresnelPower;
          varying vec3 vNormal;
          varying vec3 vPosition;
          void main() {
            float f = pow(
              1.0 - abs(dot(vNormal, normalize(-vPosition))),
              fresnelPower
            );
            gl_FragColor = vec4(atmosphereColor, f * intensity);
          }
        `,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [color, intensity, fresnelPower],
  );

  // Use same segment count as globe — no benefit to higher resolution here
  const geo = useMemo(
    () => new THREE.SphereGeometry(radius, SPHERE_SEGMENTS, 24),
    [radius],
  );

  useEffect(() => () => material.dispose(), [material]);
  useEffect(() => () => geo.dispose(), [geo]);

  return (
    <mesh scale={[1.15, 1.15, 1.15]} geometry={geo}>
      <primitive object={material} attach="material" />
    </mesh>
  );
}

// ─────────────────────────────────────────────
// Scene
// ─────────────────────────────────────────────

function Scene({
  markers,
  config,
  onMarkerClick,
  onMarkerHover,
  onReady,
}: {
  markers: GlobeMarker[];
  config: Required<Globe3DConfig>;
  onMarkerClick?: (marker: GlobeMarker) => void;
  onMarkerHover?: (marker: GlobeMarker | null) => void;
  onReady?: () => void;
}) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, config.radius * 3.5);
    camera.lookAt(0, 0, 0);
  }, [camera, config.radius]);

  return (
    <>
      <ambientLight intensity={config.ambientIntensity} />

      {/* Primary key light */}
      <directionalLight
        position={[config.radius * 4, config.radius * 4, config.radius * 3]}
        intensity={config.pointLightIntensity}
        color="#ffffff"
      />

      {/*
        Removed the third directional light — two lights covers the
        visual requirement. Each light doubles the fragment shader
        cost for the globe material.
      */}
      <directionalLight
        position={[-config.radius * 3, config.radius * 0.5, config.radius * 2]}
        intensity={config.pointLightIntensity * 0.45}
        color="#6aa9ff"
      />

      <Suspense fallback={null}>
        <RotatingGlobe
          config={config}
          markers={markers}
          onMarkerClick={onMarkerClick}
          onMarkerHover={onMarkerHover}
          onReady={onReady}
        />
      </Suspense>

      {config.showAtmosphere && (
        <Atmosphere
          radius={config.radius}
          color={config.atmosphereColor}
          intensity={config.atmosphereIntensity}
          blur={config.atmosphereBlur}
        />
      )}

      <OrbitControls
        makeDefault
        enablePan={config.enablePan}
        enableZoom={config.enableZoom}
        minDistance={config.minDistance}
        maxDistance={config.maxDistance}
        rotateSpeed={0.4}
        autoRotate={config.autoRotateSpeed > 0}
        autoRotateSpeed={config.autoRotateSpeed}
        enableDamping
        dampingFactor={0.1}
        // Stop invalidating when user isn't interacting.
        // Works in tandem with frameloop="demand".
        regress
      />
    </>
  );
}

// ─────────────────────────────────────────────
// Defaults
// ─────────────────────────────────────────────

const defaultConfig: Required<Globe3DConfig> = {
  radius: 2,
  globeColor: "#1a1a2e",
  textureUrl: DEFAULT_EARTH_TEXTURE,
  bumpMapUrl: DEFAULT_BUMP_TEXTURE,
  showAtmosphere: false,
  atmosphereColor: "#4da6ff",
  atmosphereIntensity: 0.5,
  atmosphereBlur: 2,
  bumpScale: 1,
  autoRotateSpeed: 0.3,
  enableZoom: false,
  enablePan: false,
  minDistance: 5,
  maxDistance: 15,
  initialRotation: { x: 0, y: 0 },
  markerSize: 0.06,
  showWireframe: false,
  wireframeColor: "#4a9eff",
  ambientIntensity: 0.6,
  pointLightIntensity: 1.5,
  backgroundColor: null,
  textureBrightness: 1,
  blueTint: 1,
};

// ─────────────────────────────────────────────
// Public component
// ─────────────────────────────────────────────

export function Globe3D({
  markers = [],
  config = {},
  className,
  onMarkerClick,
  onMarkerHover,
  onReady,
}: Globe3DProps) {
  const mergedConfig = useMemo(
    () => ({ ...defaultConfig, ...config }),
    [config],
  );

  /*
    frameloop strategy
    ──────────────────
    "demand"  → R3F only renders when something invalidates the frame
                (camera moves, controls update, texture load, etc.)
    "always"  → render 60fps forever regardless

    For an auto-rotating globe we must use "always" because OrbitControls'
    autoRotate updates every frame and doesn't automatically invalidate.

    If rotation is disabled (speed = 0) → "demand" is correct and
    saves the entire GPU budget while the user reads the page.

    Low-end devices get rotation disabled → "demand" by default.
  */
  const isRotating =
    mergedConfig.autoRotateSpeed > 0 && deviceProfile.tier !== "low";

  return (
    <div className={cn("relative h-full w-full", className)}>
      <Canvas
        gl={{
          // Disable AA on low-end devices — one of the largest single wins
          antialias: deviceProfile.tier !== "low",
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          preserveDrawingBuffer: false,
        }}
        dpr={deviceProfile.dpr}
        frameloop={isRotating ? "always" : "demand"}
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [0, 0, mergedConfig.radius * 3.5],
        }}
        style={{ background: mergedConfig.backgroundColor ?? "transparent" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Scene
          markers={markers}
          config={mergedConfig}
          onMarkerClick={onMarkerClick}
          onMarkerHover={onMarkerHover}
          onReady={onReady}
        />
      </Canvas>
    </div>
  );
}

export default Globe3D;
