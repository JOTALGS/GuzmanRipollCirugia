"use client"

/**
 * ProcessSteps - Componente aislado para fácil extracción
 * Pasos del proceso con cards expandibles y animaciones blur
 */

import { useState, useRef, useEffect } from "react"
import { Box, Typography, Collapse } from "@mui/material"
import { ArrowUpRight, ChevronDown } from "lucide-react"

interface Step {
  step: string
  title: string
  subtitle?: string
  description: string
  image: string
}

interface ProcessStepsProps {
  title?: {
    line1: string
    line2: string
    line3: string
  }
  description?: string
  ctaText?: string
  ctaHref?: string
  steps?: Step[]
}

const defaultSteps: Step[] = [
  {
    step: "Primer Paso",
    title: "Consulta Inicial",
    subtitle: "& Evaluación Personalizada",
    description:
      "Comenzamos con una evaluación completa de tus necesidades y expectativas para diseñar un plan de tratamiento único.",
    image: "/medical-consultation.png",
  },
  {
    step: "Segundo Paso",
    title: "Planificación",
    subtitle: "& Diseño Personalizado",
    description: "Diseñamos un enfoque personalizado utilizando las técnicas más avanzadas.",
    image: "/surgery-planning.jpg",
  },
  {
    step: "Tercer Paso",
    title: "Procedimiento",
    subtitle: "& Técnicas de Vanguardia",
    description: "Realizamos el procedimiento con los más altos estándares de seguridad.",
    image: "/operating-room.jpg",
  },
  {
    step: "Cuarto Paso",
    title: "Seguimiento",
    subtitle: "Acompañamiento Continuo",
    description: "Acompañamiento continuo para garantizar los mejores resultados.",
    image: "/patient-recovery.jpg",
  },
]

export default function ProcessSteps({
  title = { line1: "Nuestro Proceso", line2: "de Atención", line3: "Personalizada" },
  description = "Tu bienestar es nuestra prioridad. Te acompañamos en cada etapa del proceso.",
  ctaText = "Agendar Consulta",
  ctaHref = "/contacto",
  steps = defaultSteps,
}: ProcessStepsProps) {
  const [expandedStep, setExpandedStep] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 },
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <Box
      ref={containerRef}
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "transparent",
      }}
    >
      {/* Grid de 12 columnas */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          columnGap: { xs: "25px", md: "17px" },
          marginInline: { xs: "15px", md: "70px" },
        }}
      >
        {/* Contenido en columnas 3-11 */}
        <Box sx={{ gridColumn: { xs: "1 / -1", md: "3 / 11" } }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1fr 1.2fr" },
              gap: { xs: 6, lg: 8 },
              alignItems: "start",
            }}
          >
        {/* Left Side - Sticky Title */}
        <Box sx={{ position: { lg: "sticky" }, top: { lg: "120px" }, textAlign: "left" }}>
          <Typography
            sx={{
              fontSize: { xs: "2.5rem", md: "3rem", lg: "3.5rem" },
              fontWeight: 400,
              lineHeight: 1.1,
              color: "#1a1a1a",
              fontFamily: "Poppins, sans-serif",
              mb: 4,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              textAlign: "left",
            }}
          >
            {title.line1}
            <br />
            {title.line2}
            <br />
            {title.line3}
          </Typography>

          <Box
            sx={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.95rem",
                color: "#555",
                lineHeight: 1.7,
                fontFamily: "Poppins, sans-serif",
                maxWidth: "380px",
                mb: 3,
                textAlign: "left",
              }}
            >
              {description}
            </Typography>

            <Box
              component="a"
              href={ctaHref}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0,
                backgroundColor: "#0a2540",
                borderRadius: "50px",
                pl: 3,
                pr: 0.5,
                py: 0.5,
                textDecoration: "none",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                "&:hover": { backgroundColor: "#0d3a5c", transform: "translateY(-2px) scale(1.02)" },
                "&:active": { transform: "scale(0.98)", filter: "blur(1.5px)" },
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  color: "white",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  mr: 1.5,
                }}
              >
                {ctaText}
              </Typography>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: "#0066cc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ArrowUpRight size={18} color="white" />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Right Side - Expandable Steps */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {steps.map((item, index) => (
            <Box
              key={index}
              onClick={() => setExpandedStep(expandedStep === index ? -1 : index)}
              sx={{
                backgroundColor: "#f0f0f0",
                borderRadius: "20px",
                overflow: "hidden",
                cursor: "pointer",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: `${0.1 + index * 0.1}s`,
                "&:hover": { backgroundColor: "#e8e8e8" },
              }}
            >
              {/* Header */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: { xs: 2, md: 2.5 },
                  gap: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 2, md: 3 } }}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      px: 2,
                      py: 0.8,
                      borderRadius: "50px",
                      border: "1px solid #ccc",
                      backgroundColor: "transparent",
                      flexShrink: 0,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        color: "#555",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.step}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: { xs: "1.1rem", md: "1.3rem" },
                      fontWeight: 500,
                      color: "#1a1a1a",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    backgroundColor: expandedStep === index ? "#0066cc" : "#1a1a1a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    "&:hover": { transform: "scale(1.05)" },
                    "&:active": { transform: "scale(0.95)", filter: "blur(2px)" },
                  }}
                >
                  <ChevronDown
                    size={20}
                    color="white"
                    style={{
                      transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      transform: expandedStep === index ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </Box>
              </Box>

              {/* Expandable Content */}
              <Collapse in={expandedStep === index} timeout={500}>
                <Box
                  sx={{
                    px: { xs: 2, md: 3 },
                    pb: { xs: 2, md: 3 },
                    animation: expandedStep === index ? "fadeInBlur 0.5s cubic-bezier(0.16, 1, 0.3, 1)" : "none",
                    "@keyframes fadeInBlur": {
                      "0%": { opacity: 0, filter: "blur(4px)", transform: "translateY(-10px)" },
                      "100%": { opacity: 1, filter: "blur(0px)", transform: "translateY(0)" },
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      gap: 3,
                    }}
                  >
                    <Box
                      sx={{
                        height: { xs: "180px", md: "200px" },
                        borderRadius: "14px",
                        backgroundColor: "#2a2a2a",
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                        "&:hover": { transform: "scale(1.02)" },
                      }}
                    />

                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      {item.subtitle && (
                        <Typography
                          sx={{
                            fontSize: { xs: "1rem", md: "1.1rem" },
                            fontWeight: 400,
                            color: "#888",
                            fontFamily: "Poppins, sans-serif",
                            lineHeight: 1.3,
                            mb: 1.5,
                            textAlign: "left",
                          }}
                        >
                          {item.subtitle}
                        </Typography>
                      )}
                      <Typography
                        sx={{
                          fontSize: "0.9rem",
                          color: "#666",
                          fontFamily: "Poppins, sans-serif",
                          lineHeight: 1.6,
                          textAlign: "left",
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Collapse>
            </Box>
          ))}
        </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
