import React, { useEffect, useState, useRef } from "react"
import { Box, Typography } from "@mui/material"
import { gsap } from "gsap"

const LoadingScreen = ({ onComplete }) => {
  const [count, setCount] = useState(0)
  const counterRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    const duration = 4.0; 
    const ctx = gsap.context(() => {
      // Smooth numeric count 0 to 100
      const obj = { value: 0 };
      gsap.to(obj, {
        value: 100,
        duration: duration,
        ease: "power2.inOut",
        onUpdate: () => {
          setCount(Math.floor(obj.value));
        },
        onComplete: () => {
          // Pause at 100 before fade out
          gsap.delayedCall(0.4, () => {
            gsap.to(overlayRef.current, {
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
              onComplete: () => {
                if (onComplete) onComplete();
              }
            });
          });
        }
      });

      // POSITION Animation: Starts at bottom and ends at top without clipping
      // Using 'top' to control the final stop accurately
      const viewportHeight = window.innerHeight;
      const counterHeight = counterRef.current?.offsetHeight || 160;
      const margin = 40; // Safety margin to avoid touching edges

      gsap.fromTo(counterRef.current,
        { 
          y: viewportHeight - counterHeight - margin, 
          opacity: 0 
        },
        { 
          y: margin, 
          opacity: 1,
          duration: duration, 
          ease: "power2.inOut"
        }
      );
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <Box
      ref={overlayRef}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#191968", // Start color requested
        zIndex: 99999,
        pointerEvents: "auto",
        transition: "opacity 0.8s ease-out",
        overflow: "hidden",
      }}
    >
      {/* Darkening layer - increases opacity with count for a smooth darkening effect */}
      <Box 
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#000",
          opacity: (count / 100) * 0.4, // Darkens up to 40% towards the end
          zIndex: 0
        }}
      />
      {/* ISOLOGO Blanco abajo a la izquierda - Minimalist */}
      <Box sx={{
        position: "absolute",
        left: { xs: "30px", md: "50px" },
        bottom: { xs: "30px", md: "50px" },
        width: { xs: "40px", md: "60px" },
        opacity: 0.6
      }}>
        <Box 
          component="img"
          src="/images/GR_9_Isologo_Blanco.png"
          alt="Isologo"
          sx={{ width: "100%", height: "auto", objectFit: "contain" }}
        />
      </Box>

      {/* Counter Block - Minimalist vertical slide */}
      <Box
        ref={counterRef}
        sx={{
          position: "absolute",
          right: { xs: "40px", md: "50px" }, // More padding as requested
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          zIndex: 2,
        }}
      >
        {/* Large Counter Number */}
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 200,
            fontSize: { xs: "80px", md: "160px" },
            color: "#fff",
            lineHeight: 0.8,
            letterSpacing: "-0.04em",
          }}
        >
          {count.toString().padStart(2, '0')}
        </Typography>

        {/* / 100 Small Marker */}
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "14px",
            color: "rgba(255,255,255,0.2)",
            fontWeight: 400,
            mt: 0.5
          }}
        >
          / 100
        </Typography>
      </Box>
    </Box>
  )
}

export default LoadingScreen
