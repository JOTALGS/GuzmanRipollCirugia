import React, { useRef, useEffect, useState } from "react";
import { Box } from "@mui/material";

export default function ParticleLogo({
  src = "/images/GR_9_Isologo_Blanco.png",
  width = 300,
  height = 300,
  particleColor = "#ffffffff",
  maxParticles = 15000, // Significantly increased particle limit
  repelRadius = 60,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    let animationFrameId;
    let particlesArray = [];
    let mouse = { x: null, y: null, radius: repelRadius };

    // Set canvas size (respect device pixel ratio for sharpness)
    const dpr = window.devicePixelRatio || 1;
    // We'll manage drawing in CSS pixels and scaling via canvas transform
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Particle class
    class Particle {
      constructor(x, y) {
        this.x = Math.random() * width; // Start scattered randomly
        this.y = Math.random() * height; // Start scattered randomly
        this.baseX = x;
        this.baseY = y;
        this.density = Math.random() * 30 + 1;
        this.size = Math.random() * 0.8 + 0.2; // Extra micro particles (0.2px to 1px)
      }

      draw() {
        ctx.fillStyle = particleColor;
        // Optimization: simply use fillRect since they are micro particles (much faster than arc)
        ctx.fillRect(this.x, this.y, this.size, this.size);
      }

      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;

        // Magical threshold for cursor repel
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          // Return to original position
          if (this.x !== this.baseX) {
            let dxBase = this.x - this.baseX;
            this.x -= dxBase / 10;
          }
          if (this.y !== this.baseY) {
            let dyBase = this.y - this.baseY;
            this.y -= dyBase / 10;
          }
        }
      }
    }

    // Init function to scrape pixels from an image
    function init(image) {
      particlesArray = [];

      // Draw image maintaining aspect ratio
      const scale = Math.min(width / image.width, height / image.height);
      const scaledWidth = image.width * scale;
      const scaledHeight = image.height * scale;
      const imgX = (width - scaledWidth) / 2;
      const imgY = (height - scaledHeight) / 2;

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(image, imgX, imgY, scaledWidth, scaledHeight);

      // Get image pixel data - checking against boundaries
      const imageData = ctx.getImageData(0, 0, width * dpr, height * dpr);
      const data = imageData.data;

      // Clear after getting the data so we can draw particles instead
      ctx.clearRect(0, 0, width, height);

      // Loop through pixels, grab non-transparent ones.
      // We process less pixels depending on scale so we don't spawn 1M particles
      // Step determines gap between evaluated pixels
      let step = Math.ceil((width * dpr) / 250); // Much smaller denominator for higher density

      let tempParticles = [];
      for (let y = 0; y < height * dpr; y += step) {
        for (let x = 0; x < width * dpr; x += step) {
          const i = (y * (width * dpr) + x) * 4;
          const alpha = data[i + 3];
          if (alpha > 128) {
            // Coordinate divided by dpr to map back to CSS pixels
            let posX = x / dpr;
            let posY = y / dpr;
            tempParticles.push(new Particle(posX, posY));
          }
        }
      }

      // If we have too many particles, decimate them
      if (tempParticles.length > maxParticles) {
        tempParticles.sort(() => Math.random() - 0.5);
        particlesArray = tempParticles.slice(0, maxParticles);
      } else {
        particlesArray = tempParticles;
      }
    }

    const image = new Image();
    image.src = src;
    image.crossOrigin = "Anonymous";
    image.onload = () => {
      init(image);
      animate();
    };

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw();
        particlesArray[i].update();
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    const handleMouseMove = (event) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleTouchMove = (event) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mouse.x = event.touches[0].clientX - rect.left;
      mouse.y = event.touches[0].clientY - rect.top;
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseLeave);
    };
  }, [src, width, height, particleColor, maxParticles]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        height: "100%",
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </Box>
  );
}