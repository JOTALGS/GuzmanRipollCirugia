import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Box, Grid, Typography } from "@mui/material"

gsap.registerPlugin(ScrollTrigger)

export default function Conexion() {
  const heroTextRef = useRef(null)
  const resultadosTitleRef = useRef(null)
  const doctorTitleRef = useRef(null)
  const humanConnectionTitleRef = useRef(null)

  useEffect(() => {
    const elements = [
      { ref: heroTextRef, y: 50 },
      { ref: resultadosTitleRef, y: 30 },
      { ref: doctorTitleRef, y: 50 },
      { ref: humanConnectionTitleRef, y: 50 }
    ]

    const animations = elements.map(el => 
      gsap.fromTo(
        el.ref.current,
        { opacity: 0, y: el.y },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el.ref.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      )
    )

    return () => {
      animations.forEach(anim => anim.scrollTrigger?.kill())
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
          gridRow: { xs: '8 / 8', md: '8 / 8' },
          padding: { xs: "0px", md: "50px" },
          paddingLeft: { xs: "0px", md: "0px" },
          paddingRight: { xs: "0px", md: "100px" },
          zIndex: 1,
          order: { xs: 1, md: 1 },
        }}>
            <Grid item xs={12} md={6}>
              <Box sx={{
                borderRadius: { xs: 8, md: 2 },
                overflow: "hidden",
                aspectRatio: "1/1",
                backgroundImage: 'url("/images/imagen5.jpg")',
                backgroundSize: "cover",
                width: { xs: "100vw", md: "auto" },
                marginLeft: { xs: "calc(-1 * var(--grid-margin, 15px))", md: "0" },
              }}>
              </Box>
            </Grid>
        </Box>

      {/* TEXTO - Abajo en móvil, derecha en desktop */}
      <Box sx={{
          gridColumn: { xs: '1 / 13', md: '7 / 13' },
          gridRow: { xs: '9 / 9', md: '8 / 8' },
          zIndex: 1,
          order: { xs: 2, md: 2 },
        }}>
          {/* Human Connection Section */}
          <Box component="section"  sx={{ py: { xs: 4, md: 8 }, px: { xs: 0, md: 6 } }}>
            <Grid container spacing={6} alignItems="start">
              <Grid item xs={12} md={6} sx={{ textAlign: "start" }}>
                <Typography ref={humanConnectionTitleRef} variant="h2" sx={sectionTitle}>
                  Conexión humana
                </Typography>

                <Box sx={{ mt: 6, display: "flex", flexDirection: "column", gap: 4 }}>
                  {humanConnectionPoints.map((point, index) => (
                    <Box key={index} sx={{ display: "flex", gap: 3 }}>
                      <Typography variant="body1" sx={pointNumberStyle}>
                        0{index + 1}.
                      </Typography>
                      <Box sx={{ padding: { xs: "0px", md: "30px" }, paddingRight: { xs: "0px", md: "200px"}, paddingTop: "0px" }}>
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
              </Grid>
            </Grid>
          </Box>
        </Box>
    </>
  );
}

const sectionTitle = {
  fontFamily: "Poppins",
  fontSize: { xs: "2.5rem", md: "3.5rem" },
  color: "text.primary"
}

const pointNumberStyle = {
  fontFamily: "Poppins",
  fontSize: "1.25rem",
  color: "text.primary",
  minWidth: "40px"
}

const pointTitleStyle = {
  fontFamily: "Poppins",
  fontSize: "1.25rem",
  fontWeight: 600,
  color: "text.primary"
}

const pointDescriptionStyle = {
  mt: 1,
  fontSize: "1rem",
  color: "text.secondary",
  lineHeight: 1.6
}