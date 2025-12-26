"use client"

import { Box, Typography } from "@mui/material"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

/**
 * BentoSection - Componente aislado para fácil extracción
 *
 * LAYOUT CONSISTENCY:
 * - maxWidth: 1280px (igual que tu web actual)
 * - padding horizontal: 40px (igual que tu web actual)
 * - padding vertical: 80px-120px
 *
 * Dependencias: @mui/material, lucide-react, next/link
 */

const LAYOUT = {
  maxWidth: "1280px",
  paddingX: { xs: "20px", md: "40px" },
  paddingY: { xs: "60px", md: "100px" },
}

const bentoItems = [
  {
    id: 1,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Cirugía Plástica",
    description:
      "Procedimientos estéticos y reconstructivos realizados con la más alta precisión y tecnología de vanguardia.",
    hasButton: false,
    hasArrow: true,
    link: "/procedimientos",
  },
  {
    id: 2,
    icon: null,
    title: "Cirugía Mamaria",
    description:
      "Nuestra especialidad. Aumento, reducción y reconstrucción mamaria con técnicas avanzadas y resultados naturales.",
    hasButton: true,
    hasArrow: false,
    link: "/procedimientos",
  },
  {
    id: 3,
    icon: null,
    title: "Contorno Corporal",
    description: "Esculpe tu figura con procedimientos personalizados.",
    hasButton: true,
    hasArrow: false,
    link: "/procedimientos",
  },
  {
    id: 4,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
      </svg>
    ),
    title: "Resultados Naturales",
    description:
      "Nuestro enfoque personalizado garantiza resultados que realzan tu belleza natural de forma armoniosa.",
    hasButton: false,
    hasArrow: true,
    link: "/resultados",
  },
]

function BlurButton({ children, sx, ...props }) {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <Box
      component="span"
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setTimeout(() => setIsPressed(false), 150)}
      onMouseLeave={() => setIsPressed(false)}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        backgroundColor: "#0a2540",
        color: "#fff",
        px: 2.5,
        py: 1.2,
        borderRadius: "50px",
        fontSize: "0.9rem",
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.2s ease, filter 0.15s ease",
        filter: isPressed ? "blur(1.5px)" : "blur(0px)",
        transform: isPressed ? "scale(0.97)" : "scale(1)",
        "&:hover": {
          backgroundColor: "#0d2d4d",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

function BlurArrowBox({ size = 72 }) {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <Box
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setTimeout(() => setIsPressed(false), 150)}
      onMouseLeave={() => setIsPressed(false)}
      sx={{
        width: { xs: 64, md: size },
        height: { xs: 64, md: size },
        border: "1.5px solid #ccc",
        borderRadius: "18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        cursor: "pointer",
        transition: "all 0.2s ease, filter 0.15s ease",
        filter: isPressed ? "blur(1.5px)" : "blur(0px)",
        transform: isPressed ? "scale(0.95)" : "scale(1)",
        "&:hover": {
          borderColor: "#0066cc",
          backgroundColor: "rgba(0, 102, 204, 0.05)",
        },
      }}
    >
      <ArrowUpRight size={28} color="#0066cc" />
    </Box>
  )
}

export default function BentoSection() {
  return (
    <Box
      sx={{
        py: LAYOUT.paddingY,
        px: LAYOUT.paddingX,
        backgroundColor: "transparent",
      }}
    >
      <Box
        sx={{
          maxWidth: LAYOUT.maxWidth,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Row 1: Large left, Small right */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.8fr 1fr" },
            gap: 2,
          }}
        >
          {/* Card 1 - Large */}
          <Box
            component={Link}
            href={bentoItems[0].link}
            sx={{
              backgroundColor: "#e5e5e5",
              borderRadius: "24px",
              p: { xs: 4, md: 5 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: { xs: "280px", md: "320px" },
              textDecoration: "none",
              color: "inherit",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
              },
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                backgroundColor: "#1a1a1a",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              {bentoItems[0].icon}
            </Box>
            <Box>
              <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 2 }}>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 500,
                      fontSize: { xs: "1.75rem", md: "2.25rem" },
                      mb: 1.5,
                      color: "#1a1a1a",
                    }}
                  >
                    {bentoItems[0].title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "0.9rem", md: "1rem" },
                      color: "#666",
                      lineHeight: 1.6,
                      maxWidth: "400px",
                    }}
                  >
                    {bentoItems[0].description}
                  </Typography>
                </Box>
                <BlurArrowBox />
              </Box>
            </Box>
          </Box>

          {/* Card 2 - Small (Cirugía Mamaria) */}
          <Box
            component={Link}
            href={bentoItems[1].link}
            sx={{
              backgroundColor: "#e5e5e5",
              borderRadius: "24px",
              p: { xs: 4, md: 4 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: { xs: "240px", md: "320px" },
              textDecoration: "none",
              color: "inherit",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 500,
                fontSize: { xs: "1.5rem", md: "1.85rem" },
                color: "#1a1a1a",
                lineHeight: 1.2,
              }}
            >
              {bentoItems[1].title}
            </Typography>
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: "0.85rem", md: "0.95rem" },
                  color: "#666",
                  lineHeight: 1.6,
                  mb: 3,
                }}
              >
                {bentoItems[1].description}
              </Typography>
              <BlurButton>
                Explorar
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    backgroundColor: "#0066cc",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ArrowUpRight size={16} color="#fff" />
                </Box>
              </BlurButton>
            </Box>
          </Box>
        </Box>

        {/* Row 2: Small left, Large right */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1.8fr" },
            gap: 2,
          }}
        >
          {/* Card 3 - Small */}
          <Box
            component={Link}
            href={bentoItems[2].link}
            sx={{
              backgroundColor: "#e5e5e5",
              borderRadius: "24px",
              p: { xs: 4, md: 4 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: { xs: "240px", md: "280px" },
              textDecoration: "none",
              color: "inherit",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 500,
                fontSize: { xs: "1.5rem", md: "1.85rem" },
                color: "#1a1a1a",
                lineHeight: 1.2,
              }}
            >
              {bentoItems[2].title}
            </Typography>
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: "0.85rem", md: "0.95rem" },
                  color: "#666",
                  lineHeight: 1.6,
                  mb: 3,
                }}
              >
                {bentoItems[2].description}
              </Typography>
              <BlurButton>
                Explorar
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    backgroundColor: "#0066cc",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ArrowUpRight size={16} color="#fff" />
                </Box>
              </BlurButton>
            </Box>
          </Box>

          {/* Card 4 - Large */}
          <Box
            component={Link}
            href={bentoItems[3].link}
            sx={{
              backgroundColor: "#e5e5e5",
              borderRadius: "24px",
              p: { xs: 4, md: 5 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: { xs: "280px", md: "280px" },
              textDecoration: "none",
              color: "inherit",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
              },
            }}
          >
            <Box
              sx={{
                width: 56,
                height: 56,
                backgroundColor: "#1a1a1a",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              {bentoItems[3].icon}
            </Box>
            <Box>
              <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 2 }}>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 500,
                      fontSize: { xs: "1.5rem", md: "1.85rem" },
                      mb: 1.5,
                      color: "#1a1a1a",
                    }}
                  >
                    {bentoItems[3].title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "0.85rem", md: "0.95rem" },
                      color: "#666",
                      lineHeight: 1.6,
                    }}
                  >
                    {bentoItems[3].description}
                  </Typography>
                </Box>
                <BlurArrowBox />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
