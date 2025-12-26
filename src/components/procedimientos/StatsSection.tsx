"use client"

/**
 * StatsSection - Componente aislado con sistema de 12 columnas
 * Márgenes: 70px | Gutter: 20px
 */

import { useState, useEffect, useRef } from "react"
import { Box, Typography } from "@mui/material"
import { ArrowUpRight } from "lucide-react"

// ============================================
// CONFIGURACIÓN DEL GRID - EDITAR AQUÍ
// ============================================
const GRID = {
  columns: 12,
  margin: 70, // px - márgenes laterales
  gutter: 20, // px - espacio entre columnas
  mobileMargin: 20, // px - márgenes en mobile
}

const COLORS = {
  primary: "#0066cc", // techno blue
  primaryDark: "#0a2540", // deep blue
  text: "#1a1a1a",
  textMuted: "#555",
  white: "#ffffff",
  glassBackground: "rgba(255, 255, 255, 0.12)",
  glassBorder: "rgba(255, 255, 255, 0.18)",
}

// ============================================
// TIPOS
// ============================================
interface StatItem {
  value: string
  label: string
}

interface StatsSectionProps {
  title?: {
    line1: string
    line2: string
  }
  description?: string
  stats?: StatItem[]
  ctaText?: string
  ctaHref?: string
  imageLeft?: string
  imageRight?: string
  glassCardNumber?: string
  glassCardValue?: string
  glassCardTitle?: string
  glassCardDescription?: string
}

const defaultStats: StatItem[] = [
  { value: "99%", label: "Satisfacción Garantizada" },
  { value: "+199", label: "Procedimientos Exitosos" },
  { value: "+9", label: "Años de Experiencia" },
]

// ============================================
// HOOK PARA ANIMACIÓN DE CONTEO
// ============================================
const useCountAnimation = (target: string, isVisible: boolean) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const numericTarget = Number.parseInt(target.replace(/[^0-9]/g, ""))
    if (isNaN(numericTarget)) return

    const duration = 2000
    const steps = 60
    const increment = numericTarget / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= numericTarget) {
        setCount(numericTarget)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [target, isVisible])

  const prefix = target.match(/^\+/) ? "+" : ""
  const suffix = target.match(/%$/) ? "%" : target.match(/\+$/) ? "+" : ""

  return `${prefix}${count}${suffix}`
}

// ============================================
// COMPONENTE PARA NÚMEROS ANIMADOS
// ============================================
function AnimatedNumber({
  value,
  isVisible,
  size = "large",
}: { value: string; isVisible: boolean; size?: "large" | "small" }) {
  const animatedValue = useCountAnimation(value, isVisible)

  return (
    <Typography
      sx={{
        fontSize: size === "large" ? { xs: "4rem", md: "5.5rem", lg: "7rem" } : { xs: "2.5rem", md: "3rem" },
        fontWeight: 500,
        lineHeight: 1,
        color: size === "large" ? COLORS.text : COLORS.white,
        fontFamily: "Poppins, sans-serif",
        letterSpacing: "-3px",
      }}
    >
      {animatedValue}
    </Typography>
  )
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export default function StatsSection({
  title = { line1: "Conexión Humana,", line2: "Innovación Tecnológica" },
  description = "Nos dedicamos a realzar tu belleza natural con técnicas de vanguardia y atención personalizada para cada paciente.",
  stats = defaultStats,
  ctaText = "Conocer Más",
  ctaHref = "/contacto",
  imageLeft = "/modern-medical-clinic-interior-luxury.jpg",
  imageRight = "/cosmic-blue-planet-space-abstract.jpg",
  glassCardNumber = "01.",
  glassCardValue = "249+",
  glassCardTitle = "Pacientes Felices",
  glassCardDescription = "Comprometidos con resultados naturales y seguros.",
}: StatsSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: "transparent",
      }}
    >
      {/* Container con márgenes de 70px */}
      <Box
        sx={{
          maxWidth: "100%",
          mx: "auto",
          px: { xs: `${GRID.mobileMargin}px`, md: `${GRID.margin}px` },
        }}
      >
        {/* Grid de 12 columnas con gutter de 20px */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${GRID.columns}, 1fr)`,
            columnGap: `${GRID.gutter}px`,
          }}
        >
          {/* Contenido ocupa columnas 1-12 en mobile, 2-11 en desktop */}
          <Box sx={{ gridColumn: { xs: "1 / -1", md: "2 / 12" } }}>
            {/* Header - Título a la izquierda, descripción a la derecha */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" },
                columnGap: `${GRID.gutter}px`,
                mb: { xs: 5, md: 7 },
                alignItems: "start",
              }}
            >
              {/* Título */}
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem", lg: "3rem" },
                    fontWeight: 400,
                    lineHeight: 1.1,
                    color: COLORS.text,
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {title.line1}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem", lg: "3rem" },
                    fontWeight: 400,
                    lineHeight: 1.1,
                    color: COLORS.text,
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {title.line2}
                </Typography>
              </Box>

              {/* Descripción + CTA */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: { xs: 3, md: 0 } }}>
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    color: COLORS.textMuted,
                    lineHeight: 1.6,
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {description}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {/* Stacked avatars */}
                  <Box sx={{ display: "flex", ml: 1 }}>
                    {[1, 2, 3, 4].map((_, i) => (
                      <Box
                        key={i}
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          backgroundColor: i % 2 === 0 ? "#d4d4d4" : "#a3a3a3",
                          border: "2px solid white",
                          ml: i > 0 ? -1.5 : 0,
                          backgroundImage: `url(/placeholder.svg?height=36&width=36&query=professional+headshot+${i + 1})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    ))}
                  </Box>

                  {/* CTA Button con blur effect */}
                  <Box
                    component="a"
                    href={ctaHref}
                    onMouseDown={() => setIsPressed(true)}
                    onMouseUp={() => setTimeout(() => setIsPressed(false), 150)}
                    onMouseLeave={() => setIsPressed(false)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0,
                      backgroundColor: COLORS.primaryDark,
                      borderRadius: "50px",
                      pl: 2.5,
                      pr: 0.5,
                      py: 0.5,
                      textDecoration: "none",
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      filter: isPressed ? "blur(1.5px)" : "blur(0px)",
                      transform: isPressed ? "scale(0.97)" : "scale(1)",
                      "&:hover": {
                        backgroundColor: "#0d3a5c",
                        transform: isPressed ? "scale(0.97)" : "scale(1.02)",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "0.85rem",
                        color: "white",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 500,
                        mr: 1,
                      }}
                    >
                      {ctaText}
                    </Typography>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        backgroundColor: COLORS.primary,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ArrowUpRight size={16} color="white" />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Images Grid - 2 columnas */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: `${GRID.gutter}px`,
                mb: { xs: 6, md: 8 },
              }}
            >
              {/* Imagen izquierda */}
              <Box
                sx={{
                  height: { xs: "280px", md: "380px" },
                  borderRadius: "16px",
                  backgroundColor: "#2a2a2a",
                  backgroundImage: `url(${imageLeft})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* Imagen derecha con Glass Card */}
              <Box
                sx={{
                  height: { xs: "280px", md: "380px" },
                  borderRadius: "24px",
                  backgroundColor: "#a8c4d4",
                  backgroundImage: `url(${imageRight})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Glass Card Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    right: 16,
                    padding: { xs: 2.5, md: 3 },
                    borderRadius: "20px",
                    backgroundColor: COLORS.glassBackground,
                    backdropFilter: "blur(24px) saturate(180%)",
                    WebkitBackdropFilter: "blur(24px) saturate(180%)",
                    border: `1px solid ${COLORS.glassBorder}`,
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "0.85rem",
                        color: "rgba(255, 255, 255, 0.85)",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {glassCardNumber}
                    </Typography>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: "12px",
                        backgroundColor: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                        "&:hover": { transform: "scale(1.05)" },
                        "&:active": { transform: "scale(0.95)", filter: "blur(1.5px)" },
                      }}
                    >
                      <ArrowUpRight size={18} color={COLORS.text} />
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
                    <AnimatedNumber value={glassCardValue} isVisible={isVisible} size="small" />
                    <Box sx={{ pb: 1.5 }}>
                      <Typography
                        sx={{
                          fontSize: { xs: "0.95rem", md: "1.05rem" },
                          fontWeight: 500,
                          color: "white",
                          fontFamily: "Poppins, sans-serif",
                          lineHeight: 1.2,
                        }}
                      >
                        {glassCardTitle}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.75rem",
                          color: "rgba(255, 255, 255, 0.7)",
                          fontFamily: "Poppins, sans-serif",
                          maxWidth: "200px",
                          lineHeight: 1.4,
                          mt: 0.5,
                        }}
                      >
                        {glassCardDescription}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Stats Grid - 3 columnas */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: `repeat(3, 1fr)` },
                gap: { xs: 4, md: `${GRID.gutter}px` },
              }}
            >
              {stats.map((stat, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: { xs: "flex-start", md: "flex-start" },
                    textAlign: { xs: "left", md: "left" },
                  }}
                >
                  <AnimatedNumber value={stat.value} isVisible={isVisible} size="large" />
                  <Typography
                    sx={{
                      fontSize: { xs: "0.95rem", md: "1rem" },
                      fontWeight: 400,
                      color: COLORS.textMuted,
                      mt: 1,
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
