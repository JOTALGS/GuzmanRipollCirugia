import {
  ShaderLabComposition,
  type ShaderLabConfig,
} from "@basementstudio/shader-lab";
import { useEffect, useState, useRef } from "react";

// Tu configuración original intacta
const initialConfig: ShaderLabConfig = {
  composition: { height: 917, width: 1905 },
  layers: [
    {
      blendMode: "normal",
      compositeMode: "filter",
      maskConfig: { invert: false, mode: "multiply", source: "luminance" },
      hue: 0,
      id: "4ec28d10-0c79-47e5-a747-7fa313e6058c",
      kind: "effect",
      name: "Threshold",
      opacity: 0.26,
      params: { invert: false, noise: 0.58, softness: 0.02, threshold: 0.5 },
      saturation: 1,
      type: "threshold",
      visible: true,
    },
    {
      blendMode: "normal",
      compositeMode: "mask",
      maskConfig: { invert: false, mode: "multiply", source: "blue" },
      hue: -169,
      id: "8a2d52f2-2b7f-4cc2-a40f-17e38f591607",
      kind: "effect",
      name: "Particle Grid",
      opacity: 0.02,
      params: {
        backgroundColor: "#050633",
        bloomEnabled: false,  // Disabled bloom for performance
        bloomIntensity: 1.25,
        bloomRadius: 19.25,
        bloomSoftness: 0.22,
        bloomThreshold: 0.6,
        displacement: -1.35,
        gridResolution: 80,  // Reduced from 400 to 80 (6,400 particles instead of 160,000)
        noiseAmount: 1.34,
        noiseScale: 4.9,
        noiseSpeed: 0.5,  // Reduced speed for less frequent updates
        pointSize: 8,  // Increased point size to compensate for fewer particles
      },
      saturation: 1,
      type: "particle-grid",
      visible: true,
    },
    {
      blendMode: "normal",
      compositeMode: "filter",
      maskConfig: { invert: false, mode: "multiply", source: "luminance" },
      hue: 0,
      id: "a924d323-7026-4b54-8738-355ef0d17009",
      kind: "source",
      name: "Gradient",
      opacity: 1,
      params: {
        preset: "neon-glow",
        activePoints: 2, // Lo cambiaremos a 3 dinámicamente en el ref
        point1Color: "#0d093b",
        point1Position: [0.1100000000000001, -0.09],
        point1Weight: 0.6,
        point2Color: "#070736",
        point2Position: [-0.7, -0.5],
        point2Weight: 2.3,
        point3Color: "#15296d", 
        point3Position: [0.8, 0.3],
        point3Weight: 1.1,
        point4Color: "#1340749d",
        point4Position: [0.2, -0.8],
        point4Weight: 0.9,
        point5Color: "#2639e0c9",
        point5Position: [-0.5, 0.7],
        point5Weight: 1,
        noiseType: "turbulence",
        noiseSeed: 93.1,
        warpAmount: 0.04,
        warpScale: 0.28,
        warpIterations: 3,
        warpDecay: 1,
        warpBias: 0.43,
        vortexAmount: 1,
        animate: true,
        falloff: 3.5,
        motionAmount: 0.4,  // Reduced motion for better performance
        motionSpeed: 0.4,  // Slower animation speed for less GPU stress
        tonemapMode: "totos",
        glowStrength: 0.16,
        glowThreshold: 0.2,
        grainAmount: 0,
        vignetteStrength: 0.71,
        vignetteRadius: 1.5,
        vignetteSoftness: 1,
      },
      saturation: 1.63,
      type: "gradient",
      visible: true,
    },
  ],
  timeline: { duration: 8, loop: true, tracks: [] },
};

function StaticFallback() {
  return (
    <div
      aria-hidden="true"
      style={{
        background: "linear-gradient(145deg, #060816 0%, #090d22 38%, #0b1230 100%)",
        height: "100%",
        inset: 0,
        position: "absolute",
        width: "100%",
      }}
    />
  );
}

export function ShaderMakerEmbed() {
  const [canUseWebGPU, setCanUseWebGPU] = useState<boolean | null>(null);

  // Check for low-end device
  const isLowEndDevice = () => {
    // Check for mobile or tablet
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    // Check for low core count (less than 4 cores)
    const lowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    // Check for low memory (less than 4GB)
    const lowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;

    return isMobile || lowCores || lowMemory;
  };

  // 1. Guardamos la config en un ref para mutarla sin causar re-renders
  const configRef = useRef<ShaderLabConfig>(JSON.parse(JSON.stringify(initialConfig)));

  // Referencias para la animación fluida
  const targetPos = useRef<[number, number]>([0, 0]);
  const currentPos = useRef<[number, number]>([0, 0]);
  const rafRef = useRef<number | null>(null);
  const isScrolling = useRef<boolean>(false);
  const scrollTimeout = useRef<number | null>(null);

  useEffect(() => {
    setCanUseWebGPU(typeof navigator !== "undefined" && "gpu" in navigator);

    // Adjust settings for low-end devices
    if (isLowEndDevice()) {
      // Disable particle grid completely on low-end devices
      const particleLayer = configRef.current.layers.find(l => l.type === "particle-grid");
      if (particleLayer) {
        particleLayer.visible = false;
      }

      // Reduce gradient complexity
      const gradientLayer = configRef.current.layers.find(l => l.type === "gradient");
      if (gradientLayer) {
        gradientLayer.params.activePoints = 2; // Use only 2 points on low-end devices
        gradientLayer.params.warpIterations = 1; // Reduce warp iterations
        gradientLayer.params.animate = false; // Disable animation on very low-end devices
      }
    } else {
      // Normal setup for capable devices
      const gradientLayer = configRef.current.layers.find(l => l.type === "gradient");
      if (gradientLayer) {
        gradientLayer.params.activePoints = 3;
        gradientLayer.params.point3Weight = 1.5; // Fuerza del ripple
      }
    }

    // Detect scrolling to pause shader updates
    const handleScroll = () => {
      isScrolling.current = true;

      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Set new timeout to resume after scrolling stops
      scrollTimeout.current = window.setTimeout(() => {
        isScrolling.current = false;
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const updateLoop = () => {
      // Skip updates while scrolling for better performance
      if (!isScrolling.current) {
        // Calculamos la nueva posición suavizada con lerp más lento
        currentPos.current[0] = lerp(currentPos.current[0], targetPos.current[0], 0.02); // Reduced from 0.05
        currentPos.current[1] = lerp(currentPos.current[1], targetPos.current[1], 0.02); // Reduced from 0.05

        // 2. MUTACIÓN DIRECTA: Modificamos el objeto en memoria.
        // El motor del shader lo lee nativamente, sin que React intervenga.
        const gradLayer = configRef.current.layers.find((l) => l.type === "gradient");
        if (gradLayer) {
          gradLayer.params.point3Position = [currentPos.current[0], currentPos.current[1]];
        }
      }

      rafRef.current = requestAnimationFrame(updateLoop);
    };

    rafRef.current = requestAnimationFrame(updateLoop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Skip mouse tracking while scrolling
    if (isScrolling.current) return;

    const { currentTarget, clientX, clientY } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();

    const x = ((clientX - left) / width) * 2 - 1;
    const y = -(((clientY - top) / height) * 2 - 1);

    // Solo actualizamos el objetivo, el loop se encarga del resto
    targetPos.current = [x * 0.5, y * 0.5]; // Reduced mouse effect intensity
  };

  if (canUseWebGPU === false) {
    return <StaticFallback />;
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      style={{
        height: "100%",
        inset: 0,
        position: "absolute",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {canUseWebGPU === null ? <StaticFallback /> : null}
      
      {/* Pasamos el ref.current directo. React no se entera de los cambios del mouse */}
      <ShaderLabComposition
        config={configRef.current}
        style={{
          height: "100%",
          opacity: canUseWebGPU ? 1 : 0,
          width: "100%",
          transition: "opacity 0.5s ease",
        }}
      />
    </div>
  );
}
