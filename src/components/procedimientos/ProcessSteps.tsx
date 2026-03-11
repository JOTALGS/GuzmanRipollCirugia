"use client"

import { useRef, useEffect } from "react"
import { Box, Typography } from "@mui/material"
import { ArrowUpRight, MessageCircle, Ruler, Stethoscope, Star } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// ─── Data ────────────────────────────────────────────────
const steps = [
  {
    icon: MessageCircle,
    title: "Consulta Inicial",
    description: "Evaluación integral de tus expectativas y anatomía para un plan único.",
    isBlue: false
  },
  {
    icon: Ruler,
    title: "Planificación 3D",
    description: "Diseño preciso y simulación de resultados con tecnología avanzada.",
    isBlue: false
  },
  {
    icon: Stethoscope,
    title: "Procedimiento",
    description: "Ejecución quirúrgica impecable en instalaciones de primer nivel.",
    isBlue: false
  },
  {
    icon: Star,
    title: "Resultados & Seguimiento",
    description: "Acompañamiento VIP continuo hasta alcanzar tu mejor versión.",
    isBlue: true // The shining blue card
  }
]

export default function ProcessSteps() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal for cards
      gsap.fromTo(
        ".process-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <Box
      ref={containerRef}
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: "20px", md: "70px" },
        backgroundColor: "#fff",
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 8, textAlign: "left", maxWidth: "800px" }}>
        <Box sx={{ display: "flex", alignItems: "baseline", gap: { xs: "10px", md: "16px" }, mb: 3 }}>
          <Typography component="span" sx={{
            fontFamily: "Poppins, sans-serif", fontSize: { xs: "14px", md: "18px" }, fontWeight: 500,
            color: "rgba(0, 0, 0, 0.37)", lineHeight: 1,
          }}>
            (04)
          </Typography>
          <Typography component="span" sx={{
            fontFamily: "Poppins, sans-serif", fontSize: { xs: "14px", md: "18px" }, fontWeight: 500,
            color: "black", textTransform: "uppercase", letterSpacing: "-0.03em", lineHeight: 1,
          }}>
            NUESTRO PROCESO
          </Typography>
        </Box>
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "2.5rem", md: "3.5rem" },
            fontWeight: 500,
            lineHeight: 1.1,
            color: "#111",
            letterSpacing: "-0.03em",
          }}
        >
          Excelencia en cada paso del proceso
        </Typography>
      </Box>

      {/* Grid Layout */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
          gap: "20px",
        }}
      >
        {steps.map((step, index) => (
          <Box
            key={index}
            className="process-card"
            sx={{
              position: "relative",
              backgroundColor: step.isBlue ? "#0066cc" : "#f5f5f5", // Tech Blue vs Light Gray
              borderRadius: "24px",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "280px",
              cursor: "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              overflow: "hidden",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: step.isBlue
                  ? "0 20px 40px rgba(0, 102, 204, 0.3)"
                  : "0 10px 30px rgba(0,0,0,0.08)"
              }
            }}
          >
            {/* Shining Blue Effect */}
            {step.isBlue && (
              <Box
                sx={{
                  position: "absolute",
                  top: "-50%",
                  left: "-50%",
                  width: "200%",
                  height: "200%",
                  background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)",
                  transform: "rotate(45deg)",
                  pointerEvents: "none",
                }}
              />
            )}

            {/* Top: Icon */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 4 }}>
              <step.icon
                size={32}
                color={step.isBlue ? "#fff" : "#111"}
                strokeWidth={1.5}
              />
              {step.isBlue && (
                <ArrowUpRight size={24} color="#fff" strokeWidth={2} />
              )}
            </Box>

            {/* Bottom: Content */}
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: step.isBlue ? "#fff" : "#111",
                  mb: 1.5,
                  letterSpacing: "-0.02em",
                }}
              >
                {step.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "0.95rem",
                  fontWeight: 400,
                  color: step.isBlue ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.6)",
                  lineHeight: 1.6,
                }}
              >
                {step.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
