"use client"

import React, { useEffect, useRef } from "react"
import { Box, Grid, Typography, IconButton, useTheme } from "@mui/material"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ResultsPortfolioSection } from "../components/clinica/ResultsPortfolioSection"
// IMPORT CAMBIADO - Ahora usa BlurScrollEffect-Styled
import BlurScrollEffect from "../components/animations/BlurScrollEffect-Styled"
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
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
        mt: { xs: "150px", md: "350px" },
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
        
        {/* SECCIÓN DEL PRIMER PÁRRAFO - CLÍNICA DESCRIPTION CON BLUR */}
       <Box sx={{
          gridColumn: { xs: '1 / 13', md: '1 / -1' },
          gridRow: '1 / 1',
        }}>
          {/* Clinic Description Section */}
          <Box
            component="section"
            sx={{
              py: 8,
              backgroundColor: "#fff",
            }}
          >
            <Box sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              columnGap: { xs: "25px", md: "20px" },
            }}>
              {/* Primera línea - Arranca en columna 4 con sangría en desktop, full width en mobile */}
              <Box sx={{
                gridColumn: { xs: '1 / 13', md: '4 / 12' },
              }}>
                <Typography
                  component="div"
                  sx={{
                    fontFamily: theme.typography.fontFamily,
                    fontSize: { xs: "1.75rem", md: "68px" },
                    lineHeight: { xs: 1.3, md: 1.2 },
                    fontWeight: 400,
                    color: 'black',
                  }}
                >
                  <BlurScrollEffect>
                    Nuestro propósito es ser la marca de
                  </BlurScrollEffect>
                </Typography>
              </Box>

              {/* Segunda parte del texto - FULL WIDTH en todas las pantallas */}
              <Box sx={{
                gridColumn: { xs: '1 / 13', md: '1 / 13' },
                mt: { xs: 2, md: 0 },
              }}>
                <Typography
                  component="div"
                  sx={{
                    fontFamily: theme.typography.fontFamily,
                    fontSize: { xs: "1.75rem", md: "64px" },
                    lineHeight: { xs: 1.3, md: 1.2 },
                    fontWeight: 400,
                    color: 'black',
                    width: '100%',
                  }}
                >
                  <BlurScrollEffect>
                    cirugía estética que rehumaniza la medicina, utilizando los últimos hallazgos tecnológicos para hacer nuestra tarea más sostenible y eficiente, sin perder el toque humano como pilar para mejorar el bienestar de nuestros pacientes.
                  </BlurScrollEffect>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* RESTO DE LAS SECCIONES... */}
        <Box sx={{
          gridColumn: { xs: '1 / 13', md: '1 / 13' },
          gridRow: '2 / 2',
          mt: { xs: 6, md: 0 },
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