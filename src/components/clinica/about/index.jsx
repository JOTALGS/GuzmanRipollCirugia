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

  return (
    <>
      <Box sx={{
      gridColumn: { xs: '6 / 13', md: '4 / 13' },
      gridRow: '3 / 3',
      display: "flex",
      flexDirection: "column",
      textAlign: "start",
      }}>
        <Typography ref={doctorTitleRef} variant="h2" sx={doctorTitleStyle}>
            Líderes en cirugía plastica mamaria, estética & reconstructiva
        </Typography>
      </Box>

      <Box variant="body1" sx={{ fontFamily: "Poppins", fontSize: "20px", fontWeight: 600, color: "text.primary", py: 20, mb: 2, gridColumn: "3 / 4", gridRow: '4 / 4', }}>
        (Liderazgo)
      </Box>
      <Box sx={{
      gridColumn: { xs: '1 / 13', md: '6 / 11' },
      gridRow: '4 / 4',
      display: "flex",
      textAlign: "start",
      zIndex: 1
      }}>
        {/* Doctor Profile Section */}
        <Box component="section" sx={{ py: 20, px: 1, backgroundColor: "#fff" }}>
          <Typography variant="body1" sx={{ fontFamily: "Poppins", fontSize: "20px", fontWeight: 600, color: "#000", mb: 2 }}>
              Dr. Guzman Ripoll
          </Typography>
          
          <Typography variant="body1" sx={bodyTextStyle}>
              El Dr. Guzman Ripoll, es un Cirujano Plástico, Reconstructivo y Estético. .Certificado con títulos de Doctor en Medicina (CLAEH, Uruguay), Especialista en Cirugía Plástica, Reparadora y Estética (Universidad de la República, Uruguay)y Maestría en Cirugía Mamaria, Reconstructiva y Estética (Universitat de Barcelona).
          </Typography>
          <Typography variant="body1" sx={{ ...bodyTextStyle, mt: 2 }}>
              En la actualidad, se dedida principalmente a realizar cirugías mamarias estéticas y reconstructivas, así como también cirugías de remodelamiento corporal, siendo el único especialista en Uruguay en utilizar la lipoaspiración VASER.
          </Typography>
          <Typography variant="body1" sx={{ ...bodyTextStyle, mt: 2 }}>
              Su enfoque se centra en ofrecer a los pacientes los mejores tratamientos y resultados posibles, manteniendo altos estándares de calidad y cuidado. Su dedicación a la formación y la mejora continua le permite cumplir con los más altos estándares de excelencia en su práctica profesional.
          </Typography>
        </Box>
      </Box>


      <Box sx={{ mt: 4, mb: 10, borderRadius: 1, overflow: "hidden", gridColumn: { xs: '1 / 13', md: '6 / 9' }, gridRow: '5 / 5', zIndex: 1 }}>
        <img
            src="/images/foto-perfil-guzman.webp"
            alt="Dr. Guzman Ripoll"
            style={{ width: "100%", height: "auto", display: "block" }}
        />
      </Box>
    </>
  );
}


const doctorTitleStyle = {
  fontFamily: "Poppins",
  fontWeight: 400,
  fontSize: { xs: "2.5rem", md: "3.5rem" },
  lineHeight: 1.1,
  letterSpacing: "-0.03em",
  color: "text.primary"
}

const bodyTextStyle = {
  fontFamily: "Poppins",
  fontSize: "20px",
  fontWeight: 400,
  color: "text.secondary",
  lineHeight: 1.8,
  paddingRight: "100px"
}
