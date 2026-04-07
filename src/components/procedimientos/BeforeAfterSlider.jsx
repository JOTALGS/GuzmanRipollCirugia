import React, { useRef, useState, useCallback } from "react";
import { Box, Typography } from "@mui/material";

export default function BeforeAfterSlider({ beforeSrc, afterSrc }) {
  const containerRef = useRef(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  const getPosition = useCallback((e) => {
    if (!containerRef.current) return 50;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    return pct;
  }, []);

  const handleStart = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
    setSliderPos(getPosition(e));
  }, [getPosition]);

  const handleMove = useCallback((e) => {
    if (!dragging) return;
    e.preventDefault();
    setSliderPos(getPosition(e));
  }, [dragging, getPosition]);

  const handleEnd = useCallback(() => {
    setDragging(false);
  }, []);

  return (
    <Box
      ref={containerRef}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: { xs: "1 / 1", md: "unset" },
        height: { md: "100%" },
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "ew-resize",
        userSelect: "none",
        backgroundColor: "#000",
      }}
    >
      {/* After video (full background) */}
      <Box
        component="video"
        src={afterSrc}
        autoPlay
        muted
        loop
        playsInline
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Before video (clipped by slider) */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
        }}
      >
        <Box
          component="video"
          src={beforeSrc}
          autoPlay
          muted
          loop
          playsInline
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Slider line */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: `${sliderPos}%`,
          transform: "translateX(-50%)",
          width: "2px",
          height: "100%",
          backgroundColor: "rgba(255,255,255,0.9)",
          zIndex: 5,
          pointerEvents: "none",
        }}
      />

      {/* Slider handle */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: `${sliderPos}%`,
          transform: "translate(-50%, -50%)",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          border: "2px solid rgba(255,255,255,0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 6,
          boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
          pointerEvents: "none",
        }}
      >
        {/* Arrows */}
        <Box sx={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <Box sx={{
            width: 0, height: 0,
            borderTop: "5px solid transparent",
            borderBottom: "5px solid transparent",
            borderRight: "6px solid rgba(255,255,255,0.9)",
          }} />
          <Box sx={{
            width: 0, height: 0,
            borderTop: "5px solid transparent",
            borderBottom: "5px solid transparent",
            borderLeft: "6px solid rgba(255,255,255,0.9)",
          }} />
        </Box>
      </Box>

      {/* Labels */}
      <Typography sx={{
        position: "absolute", top: 10, left: 12, zIndex: 4,
        fontFamily: "Poppins", fontSize: "10px", fontWeight: 700,
        color: "rgba(0,0,0,0.7)", textTransform: "uppercase", letterSpacing: "0.1em",
        opacity: sliderPos > 15 ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}>
        Antes
      </Typography>
      <Typography sx={{
        position: "absolute", top: 10, right: 12, zIndex: 4,
        fontFamily: "Poppins", fontSize: "10px", fontWeight: 700,
        color: "rgba(0,0,0,0.7)", textTransform: "uppercase", letterSpacing: "0.1em",
        opacity: sliderPos < 85 ? 1 : 0,
        transition: "opacity 0.2s ease",
      }}>
        Después
      </Typography>
    </Box>
  );
}
