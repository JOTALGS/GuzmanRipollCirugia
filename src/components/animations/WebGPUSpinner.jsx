import React, { useEffect, useRef } from "react";
import * as THREE from "three/webgpu";
import { attribute, float, PI2, time, vec3, mix, select, hash } from "three/tsl";

export class Spinner extends THREE.Points { 

	constructor(config, plotFunction) {
		const geometry = new THREE.BufferGeometry();

		// material
	    const material = new THREE.PointsNodeMaterial({
			blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
	    });  

		super(geometry, material)

		this.config = config;
		this.plotFunction = plotFunction;
 
		this.rebuild(config); 
	} 

	rebuild( config ) {
		const pointsPerParticle = config.strokeWidth ;
		const totalParticles = pointsPerParticle * config.particleCount;

		const indices = new Float32Array(totalParticles);

		for (let i = 0; i < totalParticles; i++) indices[i] = i;

		this.geometry.setAttribute("indexAttr", new THREE.BufferAttribute(indices, 1));
		this.geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(totalParticles*3), 3));

		const pointIndex = attribute("indexAttr"); 

		const particleIndex = pointIndex.toFloat().div(pointsPerParticle).floor();
 
		const progress = particleIndex.div(config.particleCount) 
		const origin = this.plotFunction( progress , float(.7).add(time.mul(3).sin().mul(0.02)), config )

		const animatedProgress = time.div(4).mod(1); 
		const trailLength = float(0.3);  
		const animationGradient =  progress.sub(animatedProgress).add(1).mod(1);
		const insideTrail = animationGradient.lessThanEqual(trailLength);
		const gradient = select( insideTrail, animationGradient.add(0.1), float(config.strokeWidth*.7) )

		const rand = hash(particleIndex); 
		const length = float(config.strokeWidth ).mul(gradient) .mul(pointIndex.toFloat().mod(14).div(14)).mul(.3 ) 
		const ang = PI2.mul(rand);

		const mat = this.material ;

		mat.positionNode = origin.add( vec3(ang.cos(), ang.sin(), 0).mul(length) ).mul( float(1).add(time.sin().mul(0.01) )) ;
		mat.colorNode = mix(vec3(.01,.01,.01), vec3(1,1,1), insideTrail.toFloat()).mul(3)
		mat.needsUpdate = true;
		mat.opacityNode = gradient.add(0.2).mul(animationGradient.div(2));
	}

	dispose() { 
		this.geometry.dispose();
		this.material.dispose();
	}
}

export const plotFunctionSpiral = (progress, detailScale, config) => {
	const t = PI2.mul(progress)
	const R = float(config.spiralR)
	const r = float(config.spiralr)
	const d = float(config.spirald).add(detailScale.mul(0.25))
	const diff = R.sub(r)
	const ratio = diff.div(r)
	const baseX = diff.mul(t.cos()).add(d.mul(t.mul(ratio).cos()))
	const baseY = diff.mul(t.sin()).sub(d.mul(t.mul(ratio).sin()))
	const scale = float(config.spiralScale).add(detailScale.mul(config.spiralBreath))
	const x = baseX.mul(scale)
	const y = baseY.mul(scale)
	return vec3(x, y, 0)
};

export const plotFunctionRose = (progress, detailScale, config) => {
	const t = PI2.mul(progress)
	const a = float(config.roseA).add(detailScale.div(11.4).mul(config.roseABoost))
	const k = float(Math.round(config.roseK))
	const breath = float(config.roseBreathBase).add(detailScale.div(1.4).mul(config.roseBreathBoost))
	const r = a.mul(breath).mul(t.mul(k).cos())
	const x = t.cos().mul(r).mul(config.roseScale)
	const y = t.sin().mul(r).mul(config.roseScale)
	return vec3(x, y, 0)
};

export const plotFunctionLissajous = (progress, detailScale, config) => {
	const t = PI2.mul(progress)
	const amp = float(config.lissajousAmp).add(detailScale.mul(config.lissajousAmpBoost))

	const ax = float(config.lissajousAX)
	const by = float(config.lissajousBY)

	const x = t.mul(ax).add(config.lissajousPhase).sin().mul(amp)
	const y = t.mul(by).sin().mul(amp.mul(config.lissajousYScale))

	return vec3(
		x,
		y,
		0
	)
};

export const plotFunctionLoops = (progress, detailScale, config) => {
	const t = PI2.mul(progress) 
	const margin = float(.2)
	const tinyLoopAmount = float(config.tinyLoopAmount)
	const x = t.cos().mul(margin).sub( margin.div(tinyLoopAmount).mul(detailScale).mul(t.mul(config.loops).cos()) )
	const y = t.sin().mul(margin).sub( margin.div(tinyLoopAmount).mul(detailScale).mul(t.mul(config.loops).sin()) )

	return vec3(
		x,
		y,
		0
	)
};

export default function WebGPUSpinnerComponent({ type = "spiral" }) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const host = containerRef.current;
    let disposed = false;
    let animationFrameId;
    let renderer;
    let spinner;
    let handleResize = null;

    const mount = async () => {
      if (!host) return;

      const width = host.clientWidth || 160;
      const height = host.clientHeight || 160;

      renderer = new THREE.WebGPURenderer({ antialias: true, alpha: true });
      rendererRef.current = renderer;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      await renderer.init();

      if (disposed) return;

      if (!host.contains(renderer.domElement)) {
        host.appendChild(renderer.domElement);
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);

      if (type === "rose") camera.position.z = 0.9;
      else if (type === "lissajous") camera.position.z = 1.2;
      else if (type === "loops") camera.position.z = 1.2;
      else camera.position.z = 1.2;

      if (type === "rose") {
        spinner = new Spinner(
          {"strokeWidth":0.3,"particleCount":100000,"roseA":23,"roseABoost":11.7,"roseK":3,"roseBreathBase":0.01,"roseBreathBoost":0.01,"roseScale":1},
          plotFunctionRose
        );
      } else if (type === "lissajous") {
        spinner = new Spinner(
          {"strokeWidth":0.3,"particleCount":100000,"lissajousAmp":0.24,"lissajousAmpBoost":0.1,"lissajousAX":3,"lissajousBY":4,"lissajousPhase":1.57,"lissajousYScale":0.92},
          plotFunctionLissajous
        );
      } else if (type === "loops") {
        spinner = new Spinner(
          {"strokeWidth":0.2,"particleCount":100000,"loops":4,"tinyLoopAmount":1.1},
          plotFunctionLoops
        );
      } else {
        spinner = new Spinner(
          {"strokeWidth":1,"particleCount":50000,"spiralR":3,"spiralr":0.1,"spirald":3.2,"spiralScale":0.0001,"spiralBreath":0.08},
          plotFunctionSpiral
        );
      }

      scene.add(spinner);

      const animate = async () => {
        if (disposed) return;

        animationFrameId = requestAnimationFrame(animate);
        spinner.rotation.z += 0.002;
        await renderer.render(scene, camera);
      };

      animate();

      handleResize = () => {
        if (!host || !rendererRef.current) return;

        const w = host.clientWidth || 160;
        const h = host.clientHeight || 160;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        rendererRef.current.setSize(w, h);
      };

      window.addEventListener("resize", handleResize);
    };

    mount().catch((error) => {
      console.error("WebGPUSpinner init failed", error);
    });

    return () => {
      disposed = true;

      if (handleResize) {
        window.removeEventListener("resize", handleResize);
      }

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      if (spinner) {
        spinner.dispose();
      }

      try {
        if (rendererRef.current) {
          rendererRef.current.dispose();
        }

        if (host && rendererRef.current?.domElement?.parentNode === host) {
          host.removeChild(rendererRef.current.domElement);
        }
      } catch (error) {
        console.error(error);
      } finally {
        rendererRef.current = null;
      }
    };
  }, [type]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: "100%", 
        height: "100%", 
        minHeight: "150px", 
        position: "relative",
        userSelect: "none",
        pointerEvents: "none"
      }} 
    />
  );
}
