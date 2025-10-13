"use client"

import React, { useRef, useLayoutEffect, useState, useEffect } from "react"
import { useParams, Link as RouterLink } from "react-router-dom"
import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import { Box, Typography, Button, Grid, Container, Divider, Chip } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Footer from "../components/UI/Footer"

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Data de procedimientos con información médica real
const procedimientosData = {
  "01": {
    number: "01",
    title: "Aumento Mamario",
    subtitle: "Implantes Mamarios",
    category: "Cirugía Mamaria",
    imageSrc: "/images/imagen5.jpg",
    description: "El aumento mamario mediante la colocación de implantes o prótesis mamarias es el procedimiento quirúrgico más realizado a nivel mundial según las estadísticas internacionales. Es un procedimiento seguro y con resultados predecibles cuando es realizado por cirujanos plásticos avezados.",
    objetivo: "Aumento de tamaño mamario, corrección de deformidades, asimetrías, malformaciones congénitas.",
    specs: {
      tipo: "Ambulatoria, cirugía del día",
      lugar: "Block quirúrgico",
      anestesia: "General",
      duracion: "90 minutos aproximadamente"
    },
    tecnica: "Es variable según la paciente y las expectativas de la misma. Existen diferentes vías de abordaje (submamario, periareolar), y diferentes planos donde se coloca el implante (retroglandular, submuscular, subfascial, dual plane). Puede asociarse a levantamiento o pexia mamaria de ser necesario.",
    recuperacion: "Reposo laboral por 7 días con retorno progresivo a las actividades, pudiendo realizar deporte al mes de la cirugía. El postoperatorio es muy bien tolerado con analgésicos de uso habitual.",
    subprocedimientos: [
      {
        name: "Pexia o Levantamiento Mamario",
        description: "El descenso del tejido mamario, producto del adelgazamiento, cambios hormonales del embarazo y lactancia, además de los cambios debidos al envejecimiento, se denomina ptosis mamaria."
      },
      {
        name: "Reducción Mamaria", 
        description: "La hipertrofia mamaria es la condición en la cual las mamas tienen un volumen excesivo para la complexión global de la mujer."
      },
      {
        name: "Ginecomastia",
        description: "En el hombre adulto la glándula mamaria no es palpable en condiciones normales. La ginecomastia es el desarrollo de mamas en el hombre."
      },
      {
        name: "Reconstrucción Mamaria",
        description: "La reconstrucción mamaria es el proceso mediante el cual se busca restaurar el volumen, la forma y la simetría de la mama."
      }
    ]
  },
  "02": {
    number: "02", 
    title: "Lipoescultura VASER",
    subtitle: "BodyTite & Morpheus8",
    category: "Contorno Corporal",
    imageSrc: "/images/imagen5.jpg",
    description: "Tecnología avanzada de remodelación corporal que combina BodyTite (radiofrequencia asistida) con Morpheus8 para contornear y definir tu figura ideal con mínima invasión y máximos resultados.",
    objetivo: "Remodelación corporal avanzada, eliminación de grasa localizada y tensado de piel simultáneo.",
    specs: {
      tipo: "Ambulatoria, cirugía del día",
      lugar: "Block quirúrgico", 
      anestesia: "Local con sedación o general",
      duracion: "2-3 horas aproximadamente"
    },
    tecnica: "BodyTite utiliza radiofrequencia asistida para licuar la grasa mientras tensa la piel simultáneamente. Morpheus8 combina microagujas con radiofrequencia para estimular colágeno y mejorar textura cutánea en profundidad hasta 4mm.",
    recuperacion: "Reposo laboral de 7-10 días. Uso de faja compresiva por 4-6 semanas. Resultados visibles inmediatos que mejoran por 6 meses.",
    tecnologias: [
      {
        name: "BodyTite RFAL",
        description: "Radiofrequency-Assisted Liposuction que combina liposucción con radiofrecuencia para tensar piel y remover grasa en una sola sesión."
      },
      {
        name: "Morpheus8",
        description: "Microagujas con radiofrecuencia que penetran hasta 4mm estimulando colágeno, elastina y ácido hialurónico para renovación profunda."
      }
    ]
  },
  "03": {
    number: "03",
    title: "Rinoplastia",
    subtitle: "Refinamiento Nasal",
    category: "Cirugía Facial",
    imageSrc: "/images/imagen5.jpg",
    description: "Refinamiento nasal que respeta tu armonía facial natural mediante técnicas ultraprecisas para lograr resultados naturales y proporcionales.",
    objetivo: "Corrección de deformidades nasales, mejora de la función respiratoria y armonización con el resto del rostro.",
    specs: {
      tipo: "Ambulatoria, cirugía del día",
      lugar: "Block quirúrgico",
      anestesia: "General",
      duracion: "2-3 horas aproximadamente"
    },
    tecnica: "Técnica ultraprecisa respetando estructuras naturales. Puede ser abierta o cerrada según el caso. Se moldea cartílago y hueso para crear la forma deseada manteniendo función respiratoria.",
    recuperacion: "7-10 días de reposo con retiro de férula a los 7 días. Inflamación gradual que mejora en 6-12 meses para ver resultado definitivo.",
    process: [
      {
        step: "01",
        title: "Análisis Facial",
        description: "Estudio de proporciones y armonía facial completa con simulación 3D."
      },
      {
        step: "02", 
        title: "Planificación",
        description: "Diseño personalizado respetando características únicas del paciente."
      },
      {
        step: "03",
        title: "Cirugía",
        description: "Técnica ultraprecisa respetando estructuras anatómicas."
      },
      {
        step: "04",
        title: "Seguimiento",
        description: "Control evolutivo hasta lograr el resultado definitivo."
      }
    ]
  },
  "04": {
    number: "04",
    title: "Abdominoplastia", 
    subtitle: "Remodelación Abdominal",
    category: "Contorno Corporal",
    imageSrc: "/images/imagen5.jpg",
    description: "Remodelación abdominal completa para un torso firme y definido, eliminando exceso de piel y tensando músculos abdominales.",
    objetivo: "Eliminación de exceso cutáneo, tensado de músculos abdominales separados y creación de contorno abdominal armonioso.",
    specs: {
      tipo: "Ambulatoria o con internación breve",
      lugar: "Block quirúrgico",
      anestesia: "General", 
      duracion: "3-4 horas aproximadamente"
    },
    tecnica: "Resección de exceso cutáneo-graso y plicatura de músculos rectos abdominales. Reposicionamiento de ombligo. Puede combinarse con liposucción para optimizar contorno.",
    recuperacion: "Reposo laboral por 10-14 días. Uso de faja compresiva por 6 semanas. Evitar ejercicios abdominales por 2 meses.",
    process: [
      {
        step: "01",
        title: "Evaluación",
        description: "Análisis de la pared abdominal, diástasis muscular y exceso de piel."
      },
      {
        step: "02",
        title: "Planificación", 
        description: "Diseño personalizado del contorno abdominal ideal."
      },
      {
        step: "03",
        title: "Procedimiento",
        description: "Remoción de exceso y reconstrucción muscular."
      },
      {
        step: "04", 
        title: "Recuperación",
        description: "Protocolo especializado de rehabilitación."
      }
    ]
  },
  "05": {
    number: "05",
    title: "Blefaroplastia",
    subtitle: "Rejuvenecimiento Ocular", 
    category: "Cirugía Facial",
    imageSrc: "/images/imagen5.jpg",
    description: "Rejuvenecimiento de la mirada eliminando signos de envejecimiento mediante técnica microquirúrgica para resultados naturales.",
    objetivo: "Eliminación de bolsas palpebrales, exceso cutáneo y corrección de párpados caídos para rejuvenecer la mirada.",
    specs: {
      tipo: "Ambulatoria, cirugía del día",
      lugar: "Block quirúrgico", 
      anestesia: "Local con sedación",
      duracion: "1-2 horas aproximadamente"
    },
    tecnica: "Técnica microquirúrgica con incisiones en pliegues naturales. Puede ser superior, inferior o combinada. Remoción o reposicionamiento de grasa orbital.",
    recuperacion: "5-7 días de reposo. Compresas frías primeras 48hs. Cicatrices imperceptibles que maduran en 3-6 meses.",
    process: [
      {
        step: "01",
        title: "Consulta",
        description: "Evaluación del área ocular y planificación del tratamiento."
      },
      {
        step: "02",
        title: "Diseño", 
        description: "Marcación precisa de incisiones para cicatrices imperceptibles."
      },
      {
        step: "03",
        title: "Cirugía",
        description: "Técnica microquirúrgica para resultados naturales."
      },
      {
        step: "04",
        title: "Recuperación",
        description: "Cuidados específicos para una cicatrización óptima."
      }
    ]
  }
}

export default function ProcedimientoDetalle() {
  const { id } = useParams()
  const sectionRef = useRef(null)
  const maskRef = useRef(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  console.log("Procedimiento ID:", id)
  const procedimiento = procedimientosData[id]
  console.log("Procedimiento:", procedimiento)

  useEffect(() => {
    const img = new Image()
    img.src = procedimiento.imageSrc
    img.onload = () => setImageLoaded(true)
  }, [procedimiento.imageSrc])

  useLayoutEffect(() => {
    if (!imageLoaded) return

    const ctx = gsap.context(() => {
      gsap.set(maskRef.current, {
        clipPath: "inset(35% 25% 35% 25%)",
      })

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top", 
          scrub: true,
          pin: true,
        },
      }).to(maskRef.current, {
        clipPath: "inset(0%)",
        ease: "power2.inOut",
        duration: 1,
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [imageLoaded])

  return (
    <>
      {/* Scroll Reveal Hero Section */}
      <Box
        ref={sectionRef}
        sx={{
          position: "relative",
          height: "100vh",
          width: "100%",
          bgcolor: "black",
          overflow: "hidden",
        }}
      >
        <Box
          ref={maskRef}
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${procedimiento.imageSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        
        {/* Overlay Content */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(45deg, rgba(0,0,0,0.6), transparent)",
            display: "flex",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <Box sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            marginInline: { xs: "15px", md: "70px" },
            columnGap: { xs: "25px", md: "20px" },
            width: "100%"
          }}>
            <Box sx={{ gridColumn: { xs: "1 / 13", md: "1 / 8" } }}>
              <Button
                component={RouterLink}
                to="/procedimientos"
                startIcon={<ArrowBackIcon />}
                sx={{
                  color: "white",
                  mb: 3,
                  textTransform: "none",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.1)" }
                }}
              >
                Volver a Procedimientos
              </Button>
              
              <Chip
                label={procedimiento.category}
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "white",
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  mb: 2,
                }}
              />
              
              <Typography
                variant="h1"
                sx={{
                  color: "white",
                  fontFamily: "Poppins",
                  fontSize: { xs: "4rem", md: "6rem" },
                  fontWeight: 700,
                  lineHeight: 0.9,
                  mb: 1,
                  opacity: 0.8
                }}
              >
                {procedimiento.number}
              </Typography>
              
              <Typography
                variant="h2"
                sx={{
                  color: "white",
                  fontFamily: "Poppins", 
                  fontSize: { xs: "2rem", md: "3rem" },
                  fontWeight: 600,
                  lineHeight: 1.1,
                  mb: 1,
                }}
              >
                {procedimiento.title}
              </Typography>
              
              <Typography
                variant="h3"
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  fontFamily: "Poppins",
                  fontSize: { xs: "1.2rem", md: "1.5rem" },
                  fontWeight: 300,
                  mb: 3,
                }}
              >
                {procedimiento.subtitle}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ bgcolor: "white", py: { xs: 6, md: 10 } }}>
        <Box sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          marginInline: { xs: "15px", md: "70px" },
          columnGap: { xs: "25px", md: "20px" },
          rowGap: { xs: 6, md: 8 }
        }}>
          
          {/* Overview Section */}
          <Box sx={{ 
            gridColumn: { xs: "1 / 13", md: "1 / 13" },
            textAlign: "center",
            mb: 4
          }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Poppins",
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: 600,
                color: "black",
                mb: 3,
              }}
            >
              Información del Procedimiento
            </Typography>
          </Box>

          {/* Description Card */}
          <Box sx={{ gridColumn: { xs: "1 / 13", md: "1 / 7" } }}>
            <Box sx={{
              p: { xs: 3, md: 4 },
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              borderLeft: "none",
              borderRight: "none",
              //borderRadius: "20px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
              height: "fit-content"
            }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: { xs: "1.5rem", md: "1.8rem" },
                  fontWeight: 600,
                  color: "black",
                  mb: 3,
                }}
              >
                Descripción
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "16px",
                  lineHeight: 1.7,
                  color: "#4B5563",
                  mb: 3,
                }}
              >
                {procedimiento.description}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  color: "#75909F",
                  mb: 2,
                }}
              >
                Objetivo
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "15px",
                  lineHeight: 1.6,
                  color: "#4B5563",
                }}
              >
                {procedimiento.objetivo}
              </Typography>
            </Box>
          </Box>

          {/* Specifications Card */}
          <Box sx={{ gridColumn: { xs: "1 / 13", md: "7 / 13" } }}>
            <Box sx={{
              p: { xs: 3, md: 4 },
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              borderTop: "none",
              borderBottom: "none",
              //borderRadius: "20px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
              height: "fit-content"
            }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: { xs: "1.5rem", md: "1.8rem" },
                  fontWeight: 600,
                  color: "black",
                  mb: 3,
                }}
              >
                Especificaciones
              </Typography>
              
              {Object.entries(procedimiento.specs).map(([key, value]) => (
                <Box key={key} sx={{ mb: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontFamily: "Poppins",
                      fontWeight: 600,
                      color: "#75909F",
                      textTransform: "capitalize",
                      fontSize: "14px",
                      mb: 0.5,
                    }}
                  >
                    {key.replace('_', ' ')}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "15px",
                      color: "#4B5563",
                    }}
                  >
                    {value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Technique Card */}
          <Box sx={{ gridColumn: { xs: "1 / 13", md: "1 / 7" } }}>
            <Box sx={{
              p: { xs: 3, md: 4 },
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              borderLeft: "none",
              borderRight: "none",
              //borderRadius: "20px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
              height: "fit-content"
            }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: { xs: "1.5rem", md: "1.8rem" },
                  fontWeight: 600,
                  color: "black",
                  mb: 3,
                }}
              >
                Técnica
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "16px",
                  lineHeight: 1.7,
                  color: "#4B5563",
                }}
              >
                {procedimiento.tecnica}
              </Typography>
            </Box>
          </Box>

          {/* Recovery Card */}
          <Box sx={{ gridColumn: { xs: "1 / 13", md: "7 / 13" } }}>
            <Box sx={{
              p: { xs: 3, md: 4 },
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              //borderRadius: "20px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
              height: "fit-content"
            }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: { xs: "1.5rem", md: "1.8rem" },
                  fontWeight: 600,
                  color: "black",
                  mb: 3,
                }}
              >
                Recuperación
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "16px",
                  lineHeight: 1.7,
                  color: "#4B5563",
                }}
              >
                {procedimiento.recuperacion}
              </Typography>
            </Box>
          </Box>

          {/* Technologies Section (for Lipoescultura) */}
          {procedimiento.tecnologias && (
            <Box sx={{ gridColumn: "1 / 13" }}>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: { xs: "1.8rem", md: "2.2rem" },
                  fontWeight: 600,
                  color: "black",
                  mb: 4,
                  textAlign: "center",
                }}
              >
                Tecnologías Avanzadas
              </Typography>
              
              <Grid container spacing={4}>
                {procedimiento.tecnologias.map((tech, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Box sx={{
                      p: 3,
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: "1px solid rgba(0, 0, 0, 0.05)",
                      borderLeft: "none",
                      borderRight: "none",
                      //borderRadius: "16px",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
                      height: "100%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.1)",
                      },
                      display: "flex",
                      alignItems: "flex-start",
                      flexDirection: "column"
                    }}>
                      <Typography
                        variant="h5"
                        sx={{
                          fontFamily: "Poppins",
                          fontWeight: 600,
                          color: "#75909F",
                          mb: 2,
                        }}
                      >
                        {tech.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: "16px",
                          lineHeight: 1.7,
                          color: "#4B5563",
                        }}
                      >
                        {tech.description}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Sub-procedures Section (for Cirugía Mamaria) */}
          {procedimiento.subprocedimientos && (
            <Box sx={{ gridColumn: "1 / 13" }}>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: { xs: "1.8rem", md: "2.2rem" },
                  fontWeight: 600,
                  color: "black",
                  mb: 4,
                  textAlign: "center",
                }}
              >
                Tipos de Cirugía Mamaria
              </Typography>
              
              <Grid container spacing={3}>
                {procedimiento.subprocedimientos.map((sub, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Box sx={{
                      p: 3,
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: "1px solid rgba(0, 0, 0, 0.05)",
                      borderLeft: "none",
                      borderRight: "none",
                      //borderRadius: "16px",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
                      height: "100%",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.1)",
                      },
                      display: "flex",
                      alignItems: "flex-start",
                      flexDirection: "column"
                    }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: "Poppins",
                          fontWeight: 600,
                          color: "#75909F",
                          mb: 2,
                        }}
                      >
                        {sub.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "15px",
                          lineHeight: 1.6,
                          color: "#4B5563",
                        }}
                      >
                        {sub.description}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Process Steps (for other procedures) */}
          {procedimiento.process && (
            <Box sx={{ gridColumn: "1 / 13" }}>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: { xs: "1.8rem", md: "2.2rem" },
                  fontWeight: 600,
                  color: "black",
                  mb: 4,
                  textAlign: "center",
                }}
              >
                Proceso del Tratamiento
              </Typography>
              
              <Grid container spacing={3}>
                {procedimiento.process.map((step, index) => (
                  <Grid item xs={12} md={6} lg={3} key={index}>
                    <Box sx={{
                      p: 3,
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: "1px solid rgba(0, 0, 0, 0.05)",
                      //borderRadius: "16px",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
                      height: "100%",
                      textAlign: "center",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.1)",
                      }
                    }}>
                      <Typography
                        variant="h4"
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: "2rem",
                          fontWeight: 700,
                          color: "#75909F",
                          mb: 2,
                          opacity: 0.7
                        }}
                      >
                        {step.step}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: "Poppins",
                          fontWeight: 600,
                          color: "black",
                          mb: 2,
                        }}
                      >
                        {step.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "14px",
                          lineHeight: 1.6,
                          color: "#4B5563",
                        }}
                      >
                        {step.description}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* CTA Section */}
          <Box sx={{ 
            gridColumn: "1 / 13",
            textAlign: "center",
            mt: 6
          }}>
            <Box sx={{
              p: { xs: 4, md: 6 },
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              //borderRadius: "24px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
            }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: { xs: "1.5rem", md: "2rem" },
                  fontWeight: 600,
                  color: "black",
                  mb: 2,
                }}
              >
                ¿Listo para transformar tu imagen?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "16px",
                  color: "#4B5563",
                  mb: 4,
                  maxWidth: "600px",
                  mx: "auto"
                }}
              >
                Agenda tu consulta personalizada y descubre cómo podemos ayudarte a lograr tus objetivos estéticos.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#0081C7",
                  color: "white",
                  px: 6,
                  py: 2,
                  fontSize: "16px",
                  fontWeight: 600,
                  borderRadius: "12px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#0070B5",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(0, 129, 199, 0.3)"
                  },
                  transition: "all 0.3s ease"
                }}
              >
                Agendar Consulta
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  )
}