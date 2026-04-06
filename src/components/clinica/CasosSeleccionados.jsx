import React, { useEffect, useRef } from "react"
import { Box, Typography, Grid } from "@mui/material"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const procedimientos = [
  {
    titulo: "AUMENTO MAMARIO",
    subtitulo: "Cirugía de Implantes",
    descripcion: "Técnica personalizada para aumentar el volumen y mejorar la forma del busto mediante implantes de última generación.",
    imagen: "/images/caso1.jpg"
  },
  {
    titulo: "MASTOPEXIA",
    subtitulo: "Lifting Mamario",
    descripcion: "Elevación y remodelación del tejido mamario para restaurar la firmeza y posición juvenil del busto.",
    imagen: "/images/caso2.jpg"
  },
  {
    titulo: "REDUCCIÓN MAMARIA",
    subtitulo: "Mamoplastia de Reducción",
    descripcion: "Procedimiento para reducir el tamaño del busto aliviando molestias físicas y mejorando la proporción corporal.",
    imagen: "/images/caso3.jpg"
  },
  {
    titulo: "RECONSTRUCCIÓN MAMARIA",
    subtitulo: "Cirugía Reconstructiva",
    descripcion: "Restauración integral del busto tras mastectomía utilizando técnicas avanzadas de microcirugía y reconstrucción.",
    imagen: "/images/caso4.jpg"
  }
]

export default function CasosSeleccionados() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const labelRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title and label
      gsap.fromTo([labelRef.current, titleRef.current],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      )

      // Animate cards with stagger
      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          },
          delay: 0.3
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <Box
      ref={sectionRef}
      sx={{
        gridColumn: "1 / -1",
        mt: { xs: "80px", md: "140px" },
        mb: { xs: "80px", md: "140px" },
      }}
    >
      {/* Section Label and Title */}
      <Box sx={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gap: { xs: "20px", md: "20px" },
        mb: { xs: "60px", md: "80px" }
      }}>
        {/* 03 CASOS SELECCIONADOS */}
        <Box
          ref={labelRef}
          sx={{
            gridColumn: { xs: "1 / 13", md: "1 / 7" },
            mb: { xs: "20px", md: 0 },
            display: "flex",
            alignItems: "baseline",
            gap: "10px"
          }}
        >
          <Typography component="span" sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "16px", md: "18px" },
            fontWeight: 300,
            color: "rgba(0,0,0,0.2)",
            lineHeight: 1
          }}>
            03
          </Typography>
          <Typography component="span" sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "16px", md: "18px" },
            fontWeight: 500,
            color: "black",
            textTransform: "uppercase",
            letterSpacing: "0.03em",
            lineHeight: 1
          }}>
            CASOS SELECCIONADOS
          </Typography>
        </Box>

        {/* Title */}
        <Box
          ref={titleRef}
          sx={{
            gridColumn: { xs: "1 / 13", md: "1 / 10" },
            mt: { xs: "20px", md: "40px" }
          }}
        >
          <Typography sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "32px", md: "52px" },
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "black",
            textAlign: "left"
          }}>
            Especializaciones en Cirugía Mamaria
          </Typography>
        </Box>
      </Box>

      {/* Cases Grid */}
      <Grid container spacing={{ xs: 3, md: 4 }}>
        {procedimientos.map((proc, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Box
              ref={el => cardsRef.current[index] = el}
              sx={{
                position: "relative",
                backgroundColor: "#ffffff",
                borderRadius: "2px",
                overflow: "hidden",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.08)"
                }
              }}
            >
              {/* Image Container */}
              <Box sx={{
                height: { xs: "250px", md: "400px" },
                backgroundColor: "#f5f5f5",
                position: "relative",
                overflow: "hidden"
              }}>
                <Box sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <Typography sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: { xs: "60px", md: "80px" },
                    fontWeight: 200,
                    color: "rgba(0,0,0,0.1)",
                    textAlign: "center",
                    lineHeight: 1
                  }}>
                    {index + 1}
                  </Typography>
                </Box>
              </Box>

              {/* Content */}
              <Box sx={{
                p: { xs: "30px", md: "40px" }
              }}>
                <Typography sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: { xs: "24px", md: "28px" },
                  fontWeight: 600,
                  color: "black",
                  mb: "8px",
                  lineHeight: 1.2
                }}>
                  {proc.titulo}
                </Typography>

                <Typography sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: { xs: "14px", md: "16px" },
                  fontWeight: 500,
                  color: "rgba(0,0,0,0.4)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  mb: "20px"
                }}>
                  {proc.subtitulo}
                </Typography>

                <Typography sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: { xs: "16px", md: "18px" },
                  fontWeight: 400,
                  color: "#5f6368",
                  lineHeight: 1.6
                }}>
                  {proc.descripcion}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Additional Specializations */}
      <Box sx={{
        mt: { xs: "80px", md: "120px" },
        p: { xs: "40px 30px", md: "60px 50px" },
        backgroundColor: "#fafafa",
        borderRadius: "2px"
      }}>
        <Typography sx={{
          fontFamily: "Poppins, sans-serif",
          fontSize: { xs: "24px", md: "32px" },
          fontWeight: 500,
          color: "black",
          mb: { xs: "30px", md: "40px" },
          textAlign: "center"
        }}>
          Otras Especializaciones
        </Typography>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {[
            "Ginecomastía",
            "Asimetría Mamaria",
            "Revisión de Implantes",
            "Lipotransferencia Mamaria",
            "Mamoplastia de Aumento con Prótesis",
            "Corrección de Pezón Invertido"
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box sx={{
                p: { xs: "20px", md: "25px" },
                backgroundColor: "white",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                borderRadius: "2px",
                textAlign: "center",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  transform: "translateY(-2px)"
                }
              }}>
                <Typography sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: { xs: "16px", md: "18px" },
                  fontWeight: 500,
                  color: "black"
                }}>
                  {item}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}