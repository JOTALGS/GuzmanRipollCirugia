import React, { useEffect, useState, useRef } from "react"
import { Box, Typography } from "@mui/material"
import { gsap } from "gsap"

const LoadingScreen = ({ onComplete }) => {
  const [count, setCount] = useState(0)
  const counterRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    const duration = 2.0; 
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
          gsap.delayedCall(0.3, () => {
            gsap.to(overlayRef.current, {
              opacity: 0,
              duration: 0.6,
              ease: "power2.out",
              onComplete: () => {
                if (onComplete) onComplete();
              }
            });
          });
        }
      });

      // FADE IN only, no movement
      gsap.fromTo(counterRef.current,
        { opacity: 0 },
        { 
          opacity: 1,
          duration: 0.8, 
          ease: "power2.out"
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
        width: "100dvw", // Use dynamic viewport
        height: "100dvh",
        backgroundColor: "#191968",
        zIndex: 99999,
        pointerEvents: "auto",
        transition: "opacity 0.6s ease-out",
        overflow: "hidden",
      }}
    >
      {/* Darkening layer */}
      <Box 
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#000",
          opacity: (count / 100) * 0.4,
          zIndex: 0
        }}
      />
      {/* ISOLOGO Blanco - Lower Left */}
      <Box sx={{
        position: "absolute",
        left: { xs: "30px", md: "50px" },
        bottom: { xs: "calc(30px + env(safe-area-inset-bottom))", md: "50px" },
        width: { xs: "40px", md: "60px" },
        opacity: 0.6,
        zIndex: 2
      }}>
        <Box 
          component="img"
          src="/images/GR_9_Isologo_Blanco.png"
          alt="Isologo"
          sx={{ width: "100%", height: "auto", objectFit: "contain" }}
        />
      </Box>

      {/* Counter Block - Fixed Lower Right */}
      <Box
        ref={counterRef}
        sx={{
          position: "absolute",
          right: { xs: "30px", md: "50px" },
          bottom: { xs: "calc(30px + env(safe-area-inset-bottom))", md: "50px" },
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          zIndex: 2,
        }}
      >
        {/* Scrolling Counter (3 Digits) */}
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
          {count.toString().padStart(3, '0')}
        </Typography>
      </Box>
    </Box>
  )
}

export default LoadingScreen
