import {
  ShaderLabComposition,
  type ShaderLabConfig,
} from "@basementstudio/shader-lab";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { StaticFallback } from "./ShaderMakerEmbed";

const initialConfig: ShaderLabConfig = {
  composition: { height: 917, width: 1905 },
  layers: [
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
        activePoints: 2,
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
        motionAmount: 0.4,
        motionSpeed: 0.4,
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

const POINTER_EPSILON = 0.0025;

const cloneConfig = () =>
  JSON.parse(JSON.stringify(initialConfig)) as ShaderLabConfig;

const lerp = (start: number, end: number, factor: number) =>
  start + (end - start) * factor;

export function ShaderMakerScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const configRef = useRef<ShaderLabConfig>(cloneConfig());
  const targetPos = useRef<[number, number]>([0, 0]);
  const currentPos = useRef<[number, number]>([0, 0]);
  const rafRef = useRef<number | null>(null);
  const isVisibleRef = useRef(true);
  const isPageVisibleRef = useRef(true);
  const isPointerActiveRef = useRef(false);
  const isInteractivePointerRef = useRef(true);
  const lastPointerUpdateRef = useRef(0);
  const [canUseWebGPU, setCanUseWebGPU] = useState<boolean | null>(null);

  const stopLoop = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const runFrame = () => {
    if (
      !isVisibleRef.current ||
      !isPageVisibleRef.current ||
      !isPointerActiveRef.current
    ) {
      stopLoop();
      return;
    }

    currentPos.current[0] = lerp(currentPos.current[0], targetPos.current[0], 0.035);
    currentPos.current[1] = lerp(currentPos.current[1], targetPos.current[1], 0.035);

    const gradientLayer = configRef.current.layers.find((layer) => layer.type === "gradient");
    if (gradientLayer) {
      gradientLayer.params.point3Position = [currentPos.current[0], currentPos.current[1]];
    }

    const deltaX = Math.abs(targetPos.current[0] - currentPos.current[0]);
    const deltaY = Math.abs(targetPos.current[1] - currentPos.current[1]);

    if (deltaX < POINTER_EPSILON && deltaY < POINTER_EPSILON) {
      isPointerActiveRef.current = false;
      stopLoop();
      return;
    }

    rafRef.current = requestAnimationFrame(runFrame);
  };

  const startLoop = () => {
    if (
      rafRef.current === null &&
      isVisibleRef.current &&
      isPageVisibleRef.current &&
      isPointerActiveRef.current
    ) {
      rafRef.current = requestAnimationFrame(runFrame);
    }
  };

  useEffect(() => {
    const hasNavigator = typeof navigator !== "undefined";
    const hasWindow = typeof window !== "undefined";
    const hasWebGPU = hasNavigator && "gpu" in navigator;
    setCanUseWebGPU(hasWebGPU);

    if (!hasWebGPU || !hasNavigator || !hasWindow) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const prefersCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const connection = navigator as Navigator & {
      connection?: { saveData?: boolean };
      deviceMemory?: number;
    };
    const saveData = connection.connection?.saveData ?? false;
    const lowCores = navigator.hardwareConcurrency
      ? navigator.hardwareConcurrency < 4
      : false;
    const lowMemory =
      typeof connection.deviceMemory === "number" && connection.deviceMemory < 4;
    const isLowEndDevice =
      prefersReducedMotion || prefersCoarsePointer || saveData || lowCores || lowMemory;

    const gradientLayer = configRef.current.layers.find((layer) => layer.type === "gradient");
    if (gradientLayer) {
      gradientLayer.params.activePoints = isLowEndDevice ? 2 : 3;
      gradientLayer.params.point3Weight = isLowEndDevice ? 1.1 : 1.5;
      gradientLayer.params.warpIterations = isLowEndDevice ? 2 : 3;
      gradientLayer.params.motionAmount = isLowEndDevice ? 0.3 : 0.4;
      gradientLayer.params.motionSpeed = isLowEndDevice ? 0.32 : 0.4;
    }

    isInteractivePointerRef.current = !(prefersCoarsePointer || prefersReducedMotion);

    const handleVisibilityChange = () => {
      isPageVisibleRef.current = document.visibilityState === "visible";

      if (!isPageVisibleRef.current) {
        stopLoop();
        return;
      }

      startLoop();
    };

    const node = containerRef.current;
    let observer: IntersectionObserver | null = null;

    if (node && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          isVisibleRef.current = Boolean(entry?.isIntersecting);

          if (!isVisibleRef.current) {
            stopLoop();
            return;
          }

          startLoop();
        },
        {
          threshold: 0,
          rootMargin: "150px 0px",
        }
      );

      observer.observe(node);
    }

    document.addEventListener("visibilitychange", handleVisibilityChange, {
      passive: true,
    });

    return () => {
      stopLoop();
      observer?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (
      canUseWebGPU !== true ||
      !isInteractivePointerRef.current ||
      event.pointerType === "touch" ||
      !isVisibleRef.current ||
      !isPageVisibleRef.current
    ) {
      return;
    }

    const now = performance.now();
    if (now - lastPointerUpdateRef.current < 32) {
      return;
    }
    lastPointerUpdateRef.current = now;

    const { currentTarget, clientX, clientY } = event;
    const rect = currentTarget.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((clientY - rect.top) / rect.height) * 2 - 1);

    targetPos.current = [x * 0.5, y * 0.5];
    isPointerActiveRef.current = true;
    startLoop();
  };

  const handlePointerLeave = () => {
    if (!isInteractivePointerRef.current) return;

    targetPos.current = [0, 0];
    isPointerActiveRef.current = true;
    startLoop();
  };

  if (canUseWebGPU === false) {
    return <StaticFallback />;
  }

  return (
    <div
      ref={containerRef}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      style={{
        height: "100%",
        inset: 0,
        overflow: "hidden",
        position: "absolute",
        width: "100%",
      }}
    >
      {canUseWebGPU === null ? <StaticFallback /> : null}

      <ShaderLabComposition
        config={configRef.current}
        style={{
          height: "100%",
          opacity: canUseWebGPU ? 1 : 0,
          transition: "opacity 0.5s ease",
          width: "100%",
        }}
      />
    </div>
  );
}
