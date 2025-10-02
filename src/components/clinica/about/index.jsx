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
      gridColumn: { xs: '1 / 4', md: '1 / 1' },
      gridRow: '4 / 4',
      display: "flex",
      flexDirection: "column",
      textAlign: "start",
      zIndex: 1,
      }}>
        <svg viewBox="0 0 24 24" width={"48"} height={"48"} fill="black" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
      </Box>
      <Box sx={{
      gridColumn: { xs: '3 / 13', md: '4 / 13' },
      gridRow: '4 / 4',
      display: "flex",
      flexDirection: "column",
      textAlign: "start",
      }}>
        <Typography ref={doctorTitleRef} variant="h2"  sx={doctorTitleStyle}>
            Líderes en cirugía plastica mamaria, estética & reconstructiva
        </Typography>
      </Box>

      <Box
        variant="body1"
        sx={{
          fontFamily: "Poppins",
          fontSize: "20px",
          fontWeight: 600,
          color: "textPrimary",
          textAlign: "center",
          py: 20,
          mb: 2,
          gridColumn: { xs: "1 / 13", md: "3 / 4"},
          gridRow: '5 / 5',
          zIndex: 1,
        }}
      >
        (Liderazgo)
      </Box>
      <Box sx={{
      gridColumn: { xs: '1 / 13', md: '6 / 11' },
      gridRow: '5 / 5',
      display: "flex",
      textAlign: "start",
      zIndex: 1
      }}>
        {/* Doctor Profile Section */}
        <Box component="section" sx={{ py: 20, px: 1, backgroundColor: "white" }}>
          <Typography variant="body1" sx={{ fontFamily: "Poppins", fontSize: { xs: "25px", md: "20px"}, fontWeight: 600, color: "black", mb: 2 }}>
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


      <Box sx={{ mt: 4, mb: 10, borderRadius: 1, overflow: "hidden", gridColumn: { xs: '1 / 13', md: '6 / 9' }, gridRow: '6 / 6', zIndex: 1 }}>
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
  fontSize: { xs: "2.1rem", md: "3.5rem" },
  lineHeight: 1.1,
  letterSpacing: "-0.03em",
  color: "text.primary"
}

const bodyTextStyle = {
  fontFamily: "Poppins",
  fontSize: { xs: "16px", md: "20px"},
  fontWeight: 400,
  color: "text.secondary",
  lineHeight: 1.8,
  paddingRight: { xs: "0px", md: "100px"}
}
