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
      <Box sx={{
          gridColumn: { xs: '1 / 13', md: '1 / 7' },
          gridRow: '8 / 8',
          padding: "50px",
          paddingRight: "150px",
          zIndex: 1,
        }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                borderRadius: 2, 
                overflow: "hidden",
                aspectRatio: "1/1",
                bgcolor: "grey.800"
              }}>
                <video
                  src="/videos/logo-animation-1.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            </Grid>
        </Box>

        <Box sx={{
          gridColumn: { xs: '1 / 13', md: '7 / 13' },
          gridRow: '8 / 8',
          zIndex: 1,
        }}>
          {/* Human Connection Section */}
          <Box component="section"  sx={{ py: 8, px: 6, backgroundColor: "#fff"}}>
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
                      <Box sx={{ padding: "30px", paddingRight: { xs: "0px", md: "200px"}, paddingTop: "0px" }}>
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


        <Box sx={{
          gridColumn: { xs: '1 / 13', md: '1 / 13' },
          gridRow: '9 / 9',
          zIndex: 1
        }}>
          {/* Full-width Video Section */}
          <Box zIndex={100} sx={{ mt: 4, mb: 10, ml: { xs: "-10px", md: "calc(-70px + 1vw)"}, borderRadius: 1, overflow: "visible" }}>
            <img
              src="/images/unnamed.png"
              alt="Dr. Guzman Ripoll"
              style={{ width: "98vw", height: "auto", display: "block" }}
            />
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