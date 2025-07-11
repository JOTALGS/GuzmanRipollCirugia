"use client"

import React, { useEffect, useRef } from "react"
import { Box, Grid, Typography, IconButton, useTheme } from "@mui/material"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ResultsPortfolioSection } from "./ResultsPortfolioSection"
import LightenText from "../magicText/LightenText"

gsap.registerPlugin(ScrollTrigger)

export default function ClinicaSection({ id }) {
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
          <Box component="section" ref={heroTextRef}  sx={{ py: 8, backgroundColor: "#fff" }}>
            <Box ref={resultadosTitleRef} sx={{ 
              mb: 4, 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between" 
            }}>
              <Typography variant="h2" sx={sectionTitleStyle}>
                RESULTADOS
              </Typography>
              <Box>
                <IconButton
                  onClick={() => document.querySelector(".results-carousel .slick-prev")?.click()}
                  sx={{ color: "text.primary" }}
                >
                  <ArrowLeftIcon />
                </IconButton>
                <IconButton
                  onClick={() => document.querySelector(".results-carousel .slick-next")?.click()}
                  sx={{ color: "text.primary", ml: 1 }}
                >
                  <ArrowRightIcon />
                </IconButton>
              </Box>
            </Box>
            <ResultsPortfolioSection size="large" py="py-0" />
          </Box>
        </Box>


        <Box sx={{
          gridColumn: { xs: '1 / 1', md: '1 / 1' },
          gridRow: '3 / 3',
        }}>
          <ArrowRightIcon sx={{ mt: 1, width: 64, height: 64, color: "text.primary" }} />
        </Box>

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
        }}>
          {/* Doctor Profile Section */}
          <Box component="section" sx={{ py: 20, px: 1, backgroundColor: "#fff" }}>
              <Typography variant="body1" sx={{ fontFamily: "Poppins", fontSize: "20px", fontWeight: 600, color: "text.primary", mb: 2 }}>
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


        <Box sx={{ mt: 4, mb: 10, borderRadius: 1, overflow: "hidden", gridColumn: { xs: '1 / 13', md: '6 / 9' }, gridRow: '5 / 5', }}>
          <img
            src="/images/foto-perfil-guzman.webp"
            alt="Dr. Guzman Ripoll"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </Box>
        <Box sx={{
          gridColumn: { xs: '1 / 13', md: '1 / 7' },
          gridRow: '6 / 6',
          padding: "50px",
          paddingRight: "150px",
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
          gridRow: '6 / 6',
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
                      <Box sx={{ padding: "30px", paddingRight: "200px", paddingTop: "0px" }}>
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
          gridRow: '7 / 7',
        }}>
          {/* Full-width Video Section */}
          <Box component="section"  sx={{ py: 8, px: 6, backgroundColor: "#fff" }}>
            <Box sx={{ borderRadius: 2, overflow: "hidden" }}>
              <video
                src="/videos/cinematic-ocean.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      </Box>
      
    </Box>
  )
}

// Style constants
const sectionTitleStyle = {
  fontFamily: "Archivo Expanded",
  fontSize: "18px",
  textTransform: "uppercase",
  letterSpacing: "0.2em",
  color: "text.primary"
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