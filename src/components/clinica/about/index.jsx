import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Box, Typography } from "@mui/material"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const heroTextRef = useRef(null)
  const resultadosTitleRef = useRef(null)
  const doctorTitleRef = useRef(null)
  const humanConnectionTitleRef = useRef(null)
  const doctorImageRef = useRef(null)

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

    // Parallax effect for doctor image
    if (doctorImageRef.current) {
      gsap.to(doctorImageRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: doctorImageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      })
    }

    return () => {
      animations.forEach(anim => anim.scrollTrigger?.kill())
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <>
      <Box sx={{
      gridColumn: { xs: '1 / 4', md: '1 / 1' },
      gridRow: '4 / 4',
      display: { xs: 'none', md: 'flex' },
      flexDirection: "column",
      textAlign: "start",
      zIndex: 1,
      maxWidth: "100%",
      overflow: "hidden",
      }}>
        <svg viewBox="0 0 24 24" width={"72"} height={"72"} fill="black" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
      </Box>

      {/* (Liderazgo) - Alineado a la primera columna en móvil */}
      <Box
        variant="body1"
        sx={{
          fontFamily: "Poppins",
          fontSize: { xs: "12px", md: "20px" },
          fontWeight: { xs: 400, md: 600 },
          color: { xs: "rgba(0,0,0,.65)", md: "textPrimary" },
          textAlign: "left",
          display: { xs: "block", md: "block" },
          py: { xs: 0, md: 20 },
          mb: { xs: "18px", md: 2 },
          lineHeight: { xs: 1.33, md: 1 },
          letterSpacing: { xs: "0.04em", md: 0 },
          gridColumn: { xs: "1 / 13", md: "4 / 6"},
          gridRow: { xs: '4 / 4', md: '5 / 5' },
          zIndex: 1,
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
        (Liderazgo)
      </Box>

      {/* Título principal - Alineado a la primera columna */}
      <Box sx={{
      gridColumn: { xs: '1 / 13', md: '4 / 12' },
      gridRow: { xs: '5 / 5', md: '4 / 4' },
      display: "flex",
      flexDirection: "column",
      textAlign: "start",
      mb: { xs: "20px", md: 0 },
      // SIN padding extra - el grid ya tiene el margen de 20px
      }}>
        <Typography ref={doctorTitleRef} variant="h2"  sx={doctorTitleStyle}>
            Líderes en cirugía plastica mamaria, estética & reconstructiva
        </Typography>
      </Box>

      {/* Contenido Dr. Guzman Ripoll - Alineado a la primera columna */}
      <Box sx={{
      gridColumn: { xs: '1 / 13', md: '7 / 11' },
      gridRow: { xs: '6 / 6', md: '5 / 5' },
      display: "flex",
      flexDirection: "column",
      textAlign: "start",
      zIndex: 1,
      maxWidth: "100%",
      overflow: "hidden",
      // SIN padding extra - el grid ya tiene el margen de 20px
      }}>
        {/* Doctor Profile Section */}
        <Box component="section" sx={{
          pt: { xs: "88px", md: 20 },
          pb: { xs: "40px", md: 20 },
          backgroundColor: "white",
          width: "100%",
          maxWidth: "100%"
        }}>
          <Typography variant="body1" sx={{
            fontFamily: "Poppins",
            fontSize: { xs: "16px", md: "20px"},
            fontWeight: 600,
            color: "black",
            mb: { xs: "10px", md: 2 },
            lineHeight: { xs: 1.35, md: 1 },
            mt: { xs: 0, md: 0 }
          }}>
              Dr. Guzman Ripoll
          </Typography>

          <Typography variant="body1" sx={{ ...bodyTextStyle, mt: 0 }}>
              El Dr. Guzman Ripoll, es un Cirujano Plástico, Reconstructivo y Estético. .Certificado con títulos de Doctor en Medicina (CLAEH, Uruguay), Especialista en Cirugía Plástica, Reparadora y Estética (Universidad de la República, Uruguay)y Maestría en Cirugía Mamaria, Reconstructiva y Estética (Universitat de Barcelona).
          </Typography>
          <Typography variant="body1" sx={{ ...bodyTextStyle, mt: { xs: "16px", md: 2 } }}>
              En la actualidad, se dedida principalmente a realizar cirugías mamarias estéticas y reconstructivas, así como también cirugías de remodelamiento corporal, siendo el único especialista en Uruguay en utilizar la lipoaspiración VASER.
          </Typography>
          <Typography variant="body1" sx={{ ...bodyTextStyle, mt: { xs: "16px", md: 2 } }}>
              Su enfoque se centra en ofrecer a los pacientes los mejores tratamientos y resultados posibles, manteniendo altos estándares de calidad y cuidado. Su dedicación a la formación y la mejora continua le permite cumplir con los más altos estándares de excelencia en su práctica profesional.
          </Typography>
        </Box>
      </Box>

      {/* Imagen del doctor - CON MÁS ESPACIO Y SIN CORTAR */}
      <Box sx={{
        mt: { xs: 0, md: 4 },
        mb: { xs: "60px", md: 10 }, // MÁS ESPACIO ABAJO en móvil
        borderRadius: 1,
        overflow: "hidden",
        gridColumn: { xs: '1 / 13', md: '7 / 10' },
        gridRow: { xs: '7 / 7', md: '6 / 6' },
        zIndex: 1,
        // SIN padding extra - respeta el margen del grid de 20px
        width: "100%",
        height: "auto"
      }}>
        <img
            ref={doctorImageRef}
            src="/images/foto-perfil-guzman.webp"
            alt="Dr. Guzman Ripoll"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "contain", // CAMBIO: contain en vez de coveFr para no cortar
              maxHeight: "600px" // Limitar altura máxima
            }}
        />
      </Box>
    </>
  );
}


const doctorTitleStyle = {
  fontFamily: "Poppins",
  fontWeight: { xs: 600, md: 400 },
  fontSize: { xs: "30px", md: "3.8rem" },
  lineHeight: { xs: 1.06, md: 1.1 },
  letterSpacing: { xs: "-0.01em", md: "-0.03em" },
  color: "text.primary",
  textAlign: "left"
}

const bodyTextStyle = {
  fontFamily: "Poppins",
  fontSize: { xs: "14px", md: "21px"},
  fontWeight: { xs: 400, md: 500 },
  color: { xs: "#5f6368", md: "text.secondary" },
  lineHeight: { xs: 1.55, md: 1.8 },
  paddingRight: { xs: "0px", md: "0px"},
  maxWidth: "100%",
  wordWrap: "break-word",
  overflowWrap: "break-word"
}