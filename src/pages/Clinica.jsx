"use client"

import React, { useEffect, useRef } from "react"
import { Box, Grid, Typography, IconButton, useTheme } from "@mui/material"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ResultsPortfolioSection } from "../components/clinica/ResultsPortfolioSection"
import LightenText from "../components/magicText/LightenText"
import Footer from "../components/UI/Footer"
import About from "../components/clinica/about"
import Conexion from "../components/clinica/conexion"

gsap.registerPlugin(ScrollTrigger)

export default function Clinica({ id }) {
  const theme = useTheme()
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


  const clinicaText = `Nuestro propósito es ser la marca de cirugía estética que rehumaniza la medicina, utilizando los últimos hallazgos tecnológicos para hacer nuestra tarea más sostenible y eficiente, sin perder el toque humano como pilar para mejorar el bienestar de nuestros pacientes.`

  return (
    <Box id={id} sx={{ position: "relative", backgroundColor: "#222e34" }}>
      {/* Fixed Background */}
      <Box sx={{
        backgroundImage: 'url("/images/imagen5.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "500px",
        zIndex: 0,
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)"
        }
      }} />

      <Box sx={{
        backgroundColor: 'white',
        width: "100vw",
        zIndex: 0,
      }}>

      {/* Content Container */}
      <Box sx={{
        position: "relative",
        zIndex: 1,
        mt: "500px",
        display: "grid",
        backgroundColor: "#fff",
        gridTemplateColumns: "repeat(12, 1fr)",
        marginInline: { xs: "15px", md: "70px" },
        columnGap: { xs: "25px", md: "17px" },
        "& > section": { 
          gridColumn: "1 / -1",
        }
      }}>
        <Box sx={{
          backgroundColor: "#fff",
          position: "absolute",
          top: 0,
          left: "-70px",
          width: "100vw",
          height: "300vw",
        }} />
        <Box sx={{
          gridColumn: { xs: '1 / 13', md: '1 / 13' },
          gridRow: '1 / 1',
        }}>
          {/* Clinic Description Section */}
          <Box component="section" sx={{ py: 8, backgroundColor: "#fff" }}>
            <LightenText homeText={clinicaText} />
          </Box>
        </Box>


        <Box sx={{
          gridColumn: { xs: '1 / 13', md: '1 / 13' },
          gridRow: '2 / 2',
        }}>
          {/* Results Section */}

            <ResultsPortfolioSection size="large" py="py-0" />
        </Box>


        <Box sx={{
          gridColumn: { xs: '1 / 1', md: '1 / 1' },
          gridRow: '3 / 3',
          zIndex: 1
        }}>
          <ArrowRightIcon sx={{ mt: 1, width: 64, height: 64, color: "#000"}} />
        </Box>
        
        <About />

        <Conexion />
      </Box>
      </Box>
      
      <Footer />
    </Box>
  )
}

