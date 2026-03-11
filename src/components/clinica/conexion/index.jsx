import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Box, Typography } from "@mui/material"

gsap.registerPlugin(ScrollTrigger)

export default function Conexion() {
  const humanConnectionTitleRef = useRef(null)
  const pointsRef = useRef([])

  useEffect(() => {
    // Reset points ref array to ensure clean start
    pointsRef.current = pointsRef.current.slice(0, 3);

    const elements = [humanConnectionTitleRef.current, ...pointsRef.current]

    elements.forEach((el, index) => {
      if (!el) return

      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          delay: index * 0.1 // Stagger effect
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const humanConnectionPoints = [
    {
      title: "Escucha activa",
      description: "Cada tratamiento empieza con una escucha empática. Entendemos tus necesidades y objetivos, construyendo confianza desde el primer encuentro."
    },
    {
      title: "Precisión con inteligencia",
      description: "Usamos tecnología avanzada e inteligencia artificial para planificar cada detalle, elevando desde lo más importante: el cuidado humano."
    },
    {
      title: "Resultados a medida",
      description: "Cada cuerpo es único, por lo que diseñamos soluciones personalizadas que combinan técnica, estética y conexión emocional."
    }
  ]

  return (
    <>
      {/* IMAGEN - Arriba en móvil, izquierda en desktop */}
      <Box sx={{
        gridColumn: { xs: '1 / 13', md: '1 / 7' },
        position: "relative",
        height: { xs: "60vh", md: "75vh" },
        marginBottom: { xs: 0, md: 12 },
        marginRight: { xs: 0, md: 12 },
        zIndex: 1,
        order: { xs: 1, md: 1 },
      }}>
        <Box sx={{
          borderRadius: { xs: 8, md: 2 },
          overflow: "hidden",
          height: "100%",
          backgroundImage: 'url("/images/imagen5.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        </Box>
      </Box >

      {/* TEXTO - Abajo en móvil, derecha en desktop */}
      <Box sx={{
        gridColumn: { xs: '1 / 13', md: '7 / 13' },
        zIndex: 1,
        order: { xs: 2, md: 2 },
        py: { xs: 8, md: 0 },
      }}>
        {/* Human Connection Section */}
        <Box component="section" sx={{ backgroundColor: "white", width: "100%" }}>
          <Typography ref={humanConnectionTitleRef} variant="h2" sx={{
            ...sectionTitle,
            px: { xs: 2, md: 0 }
          }}>
            Conexión humana
          </Typography>

          <Box sx={{ mt: 8, display: "flex", flexDirection: "column", gap: 6 }}>
            {humanConnectionPoints.map((point, index) => (
              <Box
                key={index}
                ref={el => pointsRef.current[index] = el}
                sx={{
                  display: "flex",
                  gap: { xs: 3, md: 4 },
                  px: { xs: 2, md: 0 }
                }}>
                <Typography variant="body1" sx={pointNumberStyle}>
                  0{index + 1}.
                </Typography>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h3" sx={pointTitleStyle}>
                    {point.title}
                  </Typography>
                  <Typography variant="body1" sx={pointDescriptionStyle}>
                    {point.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

const sectionTitle = {
  fontFamily: "Poppins",
  fontSize: { xs: "2.5rem", md: "4rem" },
  fontWeight: 400,
  color: "text.primary",
  lineHeight: 1.2,
  textAlign: "left"
}

const pointNumberStyle = {
  fontFamily: "Poppins",
  fontSize: "1.25rem",
  color: "text.primary",
  minWidth: "50px",
  fontWeight: 300
}

const pointTitleStyle = {
  fontFamily: "Poppins",
  fontSize: "1.5rem",
  fontWeight: 700,
  color: "text.primary",
  mb: 1,
  textAlign: "left"
}

const pointDescriptionStyle = {
  mt: 1.5,
  fontSize: "1rem",
  color: "text.secondary",
  lineHeight: 1.7,
  fontWeight: 400,
  textAlign: "left"
}