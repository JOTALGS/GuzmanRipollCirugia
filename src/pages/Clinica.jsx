"use client"

import React, { useEffect, useRef, useState } from "react"
import { Box, Grid, Typography, IconButton, useTheme } from "@mui/material"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ResultsPortfolioSection } from "../components/clinica/ResultsPortfolioSection"
import { BlurText } from "../components/animations/BlurScrollEffect"
import "../components/animations/blur-scroll-effect.css"
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
  const typographyRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e) => {
    if (typographyRef.current) {
      const rect = typographyRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const logos = [
    { src: '/images/logo-apaisado.png', alt: 'Logo 1' },
    { src: '/images/logo-scpreu.png', alt: 'Logo 2' },
    { src: '/images/images.jpg', alt: 'Logo 3' },
    { src: '/images/logo-apaisado.png', alt: 'Logo 4' },
  ];

  return (
    <Box id={id} sx={{
      position: "relative",
      backgroundColor: "white",
      overflowX: "hidden",
      width: "100%",
      maxWidth: "100vw",
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
      }
    }}>

      <Box sx={{
        backgroundColor: 'white',
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
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
          marginInline: { xs: "20px", md: "70px" },
          columnGap: { xs: "16px", md: "20px" },
          "& > section": {
            gridColumn: "1 / -1",
          },
          overflow: "hidden"

        }}>

          {/* SECCIÓN DEL PRIMER PÁRRAFO - CLÍNICA DESCRIPTION CON BLUR */}
          <Box sx={{
            gridColumn: { xs: '1 / 12', md: '1 / -1' },
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
                gridTemplateColumns: { xs: "repeat(4, 1fr)", md: "repeat(12, 1fr)" },
                columnGap: { xs: "16px", md: "20px" },
              }}>
                {/* Todo el párrafo completo */}
                <Box sx={{
                  gridColumn: { xs: '1 / 5', md: '1 / 13' },
                  px: { xs: 0, md: 0 },
                  maxWidth: '100%',
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                  <Typography
                    ref={typographyRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    sx={{
                      fontFamily: theme.typography.fontFamily,
                      fontSize: { xs: "30px", md: "64px" },
                      lineHeight: { xs: 1.4, md: 1.2 },
                      fontWeight: { xs: 500, md: 500 },
                      textAlign: 'left',
                      wordWrap: 'break-word',
                      overflowWrap: 'break-word',
                      hyphens: 'auto',
                      maxWidth: '100%',
                      textIndent: { xs: 'calc(25% + 8px)', md: 'calc(25% + 10px)' },
                      position: 'relative',
                      cursor: 'default',
                      background: isHovering
                        ? `radial-gradient(circle 250px at ${mousePosition.x}px ${mousePosition.y}px, 
                            #3b82f6 0%, 
                            #1e40af 20%, 
                            #1e293b 40%, 
                            #0f172a 60%, 
                            #000000 100%)`
                        : 'linear-gradient(to right, #000000, #000000)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      color: 'transparent',
                      transition: 'none',
                      willChange: 'background',
                    }}
                  >
                    Nuestro propósito es ser la marca de cirugía estética que rehumaniza la medicina,
                    utilizando los últimos hallazgos tecnológicos para hacer nuestra tarea más sostenible
                    y eficiente, sin perder el toque humano como pilar para mejorar el bienestar de nuestros pacientes.
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

          {/* LOGO GRID - Logos separados con gutter entre ellos */}
          <Box sx={{
            gridColumn: { xs: '1 / 13', md: '1 / 13' },
            gridRow: { xs: '8 / 8', md: '7 / 7' },
            zIndex: 1,
            width: '100%',
            py: { xs: "40px", md: "80px" },
          }}>
            <Box sx={{
              display: 'grid',
              position: 'relative',
              gridTemplateColumns: { xs: 'repeat(4, 1fr)', md: 'repeat(12, 1fr)' },
              columnGap: { xs: "16px", md: "20px" },
              rowGap: { xs: "16px", md: "0" },
              width: '100%',
              zIndex: 0,
            }}>
              {logos.map((logo, index) => {
                // Desktop: cada logo ocupa 3 columnas (1-3, 4-6, 7-9, 10-12)
                // Móvil: cada logo ocupa 2 columnas (1-3, 3-5, 1-3, 3-5)
                const mobileCol = index % 2 === 0 ? '1 / 3' : '3 / 5';
                const desktopCol = `${index * 3 + 1} / ${index * 3 + 4}`;

                return (
                  <Box
                    key={index}
                    sx={{
                      gridColumn: {
                        xs: mobileCol,
                        md: desktopCol
                      },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: { xs: '30px 15px', md: '60px 40px' },
                      minHeight: { xs: '120px', md: '200px' },
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      backgroundColor: '#fff',
                      overflow: 'visible',
                      zIndex: 1,
                      position: 'relative',
                    }}
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '60px',
                        width: 'auto',
                        height: 'auto',
                        objectFit: 'contain',
                        filter: 'grayscale(100%)',
                        opacity: 0.7,
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.filter = 'grayscale(0%)';
                        e.target.style.opacity = '1';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.filter = 'grayscale(100%)';
                        e.target.style.opacity = '0.7';
                      }}
                    />
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Conexion />
        </Box>
      </Box>

      <Footer />
    </Box>
  )
}
