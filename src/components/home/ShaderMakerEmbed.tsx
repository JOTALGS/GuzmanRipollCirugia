import {
  ShaderLabComposition,
  type ShaderLabConfig,
} from "@basementstudio/shader-lab";
import { useEffect, useState } from "react";

const config: ShaderLabConfig = {
  composition: {
    height: 917,
    width: 1905,
  },
  layers: [
    {
      blendMode: "normal",
      compositeMode: "filter",
      maskConfig: {
        invert: false,
        mode: "multiply",
        source: "luminance",
      },
      hue: 0,
      id: "4ec28d10-0c79-47e5-a747-7fa313e6058c",
      kind: "effect",
      name: "Threshold",
      opacity: 0.26,
      params: {
        invert: false,
        noise: 0.08,
        softness: 0.02,
        threshold: 0.5,
      },
      saturation: 1,
      type: "threshold",
      visible: true,
    },
    {
      blendMode: "normal",
      compositeMode: "mask",
      maskConfig: {
        invert: false,
        mode: "multiply",
        source: "blue",
      },
      hue: -169,
      id: "8a2d52f2-2b7f-4cc2-a40f-17e38f591607",
      kind: "effect",
      name: "Particle Grid",
      opacity: 0.37,
      params: {
        backgroundColor: "#000000",
        bloomEnabled: true,
        bloomIntensity: 1.25,
        bloomRadius: 19.25,
        bloomSoftness: 0.22,
        bloomThreshold: 0.6,
        displacement: -1.35,
        gridResolution: 400,
        noiseAmount: 1.34,
        noiseScale: 4.9,
        noiseSpeed: 1.84,
        pointSize: 3,
      },
      saturation: 1,
      type: "particle-grid",
      visible: true,
    },
    {
      blendMode: "normal",
      compositeMode: "filter",
      maskConfig: {
        invert: false,
        mode: "multiply",
        source: "luminance",
      },
      hue: 0,
      id: "a924d323-7026-4b54-8738-355ef0d17009",
      kind: "source",
      name: "Gradient",
      opacity: 1,
      params: {
        activePoints: 2,
        animate: true,
        falloff: 3.5,
        glowStrength: 0.16,
        glowThreshold: 0.2,
        grainAmount: 0.01,
        motionAmount: 0.81,
        motionSpeed: 2,
        noiseSeed: 93.1,
        noiseType: "turbulence",
        point1Color: "#0B092A",
        point1Position: [0.1100000000000001, -0.1299999999999999],
        point1Weight: 0.6,
        point2Color: "#08073A",
        point2Position: [-0.7, -0.5],
        point2Weight: 1.3,
        point3Color: "#662626",
        point3Position: [0.8, 0.3],
        point3Weight: 1.1,
        point4Color: "#220033",
        point4Position: [0.2, -0.8],
        point4Weight: 0.9,
        point5Color: "#1a0a2e",
        point5Position: [-0.5, 0.7],
        point5Weight: 1,
        preset: "neon-glow",
        tonemapMode: "totos",
        vortexAmount: 0.48,
        warpAmount: 0.04,
        warpBias: 0.43,
        warpDecay: 1,
        warpIterations: 3,
        warpScale: 0.28,
        vignetteRadius: 1.42,
        vignetteSoftness: 1,
        vignetteStrength: 0.71,
      },
      saturation: 1.63,
      type: "gradient",
      visible: true,
    },
  ],
  timeline: {
    duration: 8,
    loop: true,
    tracks: [],
  },
};

function StaticFallback() {
  return (
    <div
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(circle at 62% 42%, rgba(66, 122, 255, 0.2) 0%, rgba(66, 122, 255, 0) 28%), linear-gradient(145deg, #060816 0%, #090d22 38%, #0b1230 100%)",
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

  useEffect(() => {
    setCanUseWebGPU(typeof navigator !== "undefined" && "gpu" in navigator);
  }, []);

  if (canUseWebGPU === false) {
    return <StaticFallback />;
  }

  return (
    <div
      style={{
        height: "100%",
        inset: 0,
        position: "absolute",
        width: "100%",
      }}
    >
      {canUseWebGPU === null ? <StaticFallback /> : null}
      <ShaderLabComposition
        config={config}
        style={{
          height: "100%",
          opacity: canUseWebGPU ? 1 : 0,
          width: "100%",
        }}
      />
    </div>
  );
}
