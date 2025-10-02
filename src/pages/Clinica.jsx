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
import LogoSlider from "../components/clinica/InfiniteSlider"

gsap.registerPlugin(ScrollTrigger)

export default function Clinica({ id }) {
  const theme = useTheme()
  const heroTextRef = useRef(null)
  const resultadosTitleRef = useRef(null)
  const doctorTitleRef = useRef(null)
  const humanConnectionTitleRef = useRef(null)

  const logos = [
    '/images/logo-apaisado.png',
    '/images/logo-scpreu.png',
    '/images/images.jpg',
    '/images/logo-apaisado.png',
    '/images/logo-scpreu.png',
    '/images/images.jpg',
    '/images/logo-apaisado.png',
    '/images/logo-scpreu.png',
  ];



  const clinicaTextFirstLine = 'Nuestro propósito es ser la marca de cirugía'
  const clinicaText = ` estética que rehumaniza la medicina, utilizando los últimos hallazgos tecnológicos para hacer nuestra tarea más sostenible y eficiente, sin perder el toque humano como pilar para mejorar el bienestar de nuestros pacientes.`

  return (
    <Box id={id} sx={{ position: "relative", backgroundColor: "white",
      overflowX: { xs: "hidden", md: "visible" },
    ':after': {
      content: '""',
      position: "absolute",
      top: 0,
      right: -120,

      width: "180vw",
      height: "600vh",
      background: "white",
      overflow: "hidden",
      zIndex: 0
    } }}>

      <Box sx={{
        backgroundColor: 'white',
        width: "100vw",
        zIndex: 0,
      }}>

      {/* Content Container */}
      <Box sx={{
        position: "relative",
        zIndex: 1,
        // AQUÍ ESTÁ EL CAMBIO PRINCIPAL - AUMENTÉ EL MARGIN TOP
        // mt: "100px" → ORIGINAL
        mt: { xs: "150px", md: "350px" }, // ← NUEVO VALOR CON RESPONSIVE
        display: "grid",
        backgroundColor: "white",
        gridTemplateColumns: "repeat(12, 1fr)",
        marginInline: { xs: "15px", md: "70px" },
        columnGap: { xs: "25px", md: "17px" },
        "& > section": { 
          gridColumn: "1 / -1",
        },
        overflow: "hidden"

      }}>
        <Box sx={{
          backgroundColor: "white",
          position: "absolute",
          top: 0,
          left: "-70px",
          width: "100vw",
          height: "300vw",
        }} />
        
        {/* SECCIÓN DEL PRIMER PÁRRAFO - CLÍNICA DESCRIPTION */}
        <Box sx={{
          gridColumn: { xs: '1 / 13', md: '1 / 13' },
          gridRow: '1 / 1',
          // AQUÍ PUEDES AGREGAR MÁS ESPACIO INTERNO SI LO NECESITAS
          // py: 8 → ya existe en la sección, pero puedes aumentarlo
        }}>
          {/* Clinic Description Section */}
          <Box component="section" sx={{ 
            py: 8, // ← Esto controla el padding vertical interno (arriba/abajo)
            backgroundColor: "#0B1426",
            // OPCIÓN ALTERNATIVA: Agregar margin top adicional aquí
            // mt: 4 // ← Esto agregaría más espacio específicamente arriba de esta sección
          }}>
            <Box sx={{ 
              display: "flex", 
              marginLeft: "auto", 
              width: "90%", 
              alignContent: "end", 
              justifyContent: "end", 
              textAlign: "end", 
              flexDirection: "column" 
            }}>
              <LightenText homeText={clinicaTextFirstLine} disableLightingEffect={true} />
            </Box>
            <LightenText homeText={clinicaText} disableLightingEffect={true} />
          </Box>
        </Box>

        {/* RESTO DE LAS SECCIONES... */}
        <Box sx={{
          gridColumn: { xs: '1 / 13', md: '1 / 13' },
          gridRow: '2 / 2',
        }}>
          {/* Results Section */}
            <ResultsPortfolioSection size="large" py="py-0" />
        </Box>

        <About />

        <Box sx={{
          gridColumn: { xs: '1 / 13', md: '3 / 11' },
          gridRow: '7 / 7',
          zIndex: 1
        }}>
          <LogoSlider logos={logos} />
        </Box>

        <Conexion />
      </Box>
      </Box>
      
      <Footer />
    </Box>
  )
}
