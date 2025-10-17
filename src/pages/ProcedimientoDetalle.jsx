"use client"

import React, { useRef, useLayoutEffect, useState, useEffect } from "react"
import { useParams, Link as RouterLink } from "react-router-dom"
import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import { Box, Typography, Button, Container, Chip } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Footer from "../components/UI/Footer"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const procedimientosData = {
  1: {
    number: "01",
    title: "Cirugía Mamaria",
    subtitle: "Aumento, Reducción & Reconstrucción",
    category: "Especialización Principal",
    imageSrc: "/images/image.png",
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
  2: {
    number: "02", 
    title: "Lipoescultura VASER",
    subtitle: "BodyTite & Morpheus8",
    category: "Contorno Corporal",
    imageSrc: "/images/imagen5.jpg",
    catchPhrase: "Tecnología de vanguardia para remodelación corporal avanzada con resultados inmediatos y recuperación optimizada.",
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
  }
}

export default function ProcedimientoDetalle() {
  const { id } = useParams()
  const sectionRef = useRef(null)
  const maskRef = useRef(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  
  const procedimiento = procedimientosData[id] || procedimientosData[1]

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
      {/* HERO SECTION CON SCROLL REVEAL */}
      <Box
        ref={sectionRef}
        sx={{
          position: "relative",
          height: "100vh",
          width: "100%",
          bgcolor: "#F5F5F5",
          overflow: "hidden",
        }}
      >
        {/* Imagen con máscara que se expande */}
        <Box
          ref={maskRef}
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${procedimiento.imageSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 2,
          }}
        />

        {/* Contenido siempre visible */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ 
            width: "100%", 
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: "20px", md: "70px" }
          }}>
            {/* Botón Volver */}
            <Button
              component={RouterLink}
              to="/procedimientos"
              startIcon={<ArrowBackIcon />}
              sx={{
                position: "absolute",
                top: { xs: -200, md: -250 },
                left: 0,
                color: "#111",
                textTransform: "none",
                fontWeight: 500,
                fontSize: "15px",
                "&:hover": { bgcolor: "rgba(0,0,0,0.05)" },
                zIndex: 20
              }}
            >
              Volver a Procedimientos
            </Button>

            {/* IZQUIERDA: Número más pequeño */}
            <Box>
              <Typography
                variant="h1"
                sx={{
                  color: "#111",
                  fontFamily: "Poppins",
                  fontSize: { xs: "5rem", md: "8rem", lg: "74px" },
                  fontWeight: 600,
                  lineHeight: 0.9,
                  opacity: 0.95
                }}
              >
                {procedimiento.number}
              </Typography>
            </Box>

            {/* DERECHA: Título menos bold + Catch Phrase con más espacio */}
            <Box
              sx={{
                textAlign: "right",
                maxWidth: { xs: "50%", md: "45%", lg: "45%" },
                  lineHeight: 1.5,

              }}
            >
              {/* Glassmorphism Chip */}
              <Chip
                label={procedimiento.category}
                sx={{
                  background: "rgba(255, 255, 255, 0.25)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  color: "#111",
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  mb: 2.5,
                  height: "26px"
                }}
              />

              {/* Título menos bold */}
              <Typography
                variant="h2"
                sx={{
                  color: "#111",
                  fontFamily: "Poppins",
                  fontSize: { xs: "2.2rem", md: "3.5rem", lg: "4rem" },
                  fontWeight: 600,
                  lineHeight: 1.1,
                  mb: 3.5,
                  letterSpacing: "-0.02em"
                }}
              >
                {procedimiento.title}
              </Typography>

              {/* Catch Phrase con más espaciado */}
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(0,0,0,0.65)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  fontWeight: 400,
                  lineHeight: 1.65,
                  letterSpacing: "-0.01em"
                }}
              >
                {procedimiento.catchPhrase}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* BENEFITS SECTION */}
      <Box sx={{ bgcolor: "white", py: { xs: 6, sm: 8, md: 10 } }}>
        <Box sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          columnGap: "20px",
          mx: { xs: "20px", sm: "40px", md: "70px" },
        }}>
          <Box sx={{ gridColumn: { xs: "1 / 13", md: "3 / 10" } }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Poppins",
                fontSize: { xs: "2rem", sm: "2.5rem", md: "2.625rem" },
                fontWeight: 700,
                color: "#111",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                mb: { xs: 3, md: 6 },
                textAlign: "left"
              }}
            >
              Beneficios
            </Typography>

            <Box sx={{
              backgroundColor: "#F8F8F8",
              borderRadius: "20px",
              p: { xs: "12px", sm: "14px", md: "16px" },
            }}>
              <Box sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                gap: "14px",
                mb: "14px"
              }}>
                {/* Card 1 */}
                <Box sx={{
                  backgroundColor: "#E9E9E9",
                  borderRadius: "16px",
                  p: { xs: "20px", md: "24px" },
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    backgroundColor: "#E6E6E6",
                    transform: "translateY(-2px)"
                  }
                }}>
                  <Box sx={{ display: "flex", gap: "4px", mb: "8px" }}>
                    <Box sx={{ width: "7px", height: "7px", backgroundColor: "#111", borderRadius: "50%" }} />
                    <Box sx={{ width: "7px", height: "7px", backgroundColor: "#111", borderRadius: "50%" }} />
                  </Box>
                  <Typography sx={{
                    fontFamily: "Poppins",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#111",
                    mb: "6px",
                    textAlign: "left"
                  }}>
                    Resultados Predecibles
                  </Typography>
                  <Typography sx={{
                    fontSize: "15px",
                    lineHeight: 1.55,
                    color: "rgba(0,0,0,0.7)",
                    textAlign: "left"
                  }}>
                    Nos enfocamos en lograr resultados naturales y armoniosos, cumpliendo con las expectativas de cada paciente.
                  </Typography>
                </Box>

                {/* Card 2 */}
                <Box sx={{
                  backgroundColor: "#E9E9E9",
                  borderRadius: "16px",
                  p: { xs: "20px", md: "24px" },
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    backgroundColor: "#E6E6E6",
                    transform: "translateY(-2px)"
                  }
                }}>
                  <Box sx={{ display: "flex", gap: "4px", mb: "8px" }}>
                    <Box sx={{ width: "7px", height: "7px", backgroundColor: "#111", borderRadius: "50%" }} />
                  </Box>
                  <Typography sx={{
                    fontFamily: "Poppins",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#111",
                    mb: "6px",
                    textAlign: "left"
                  }}>
                    Diseño Personalizado
                  </Typography>
                  <Typography sx={{
                    fontSize: "15px",
                    lineHeight: 1.55,
                    color: "rgba(0,0,0,0.7)",
                    textAlign: "left"
                  }}>
                    Cada tratamiento es único y se adapta a tus características físicas y objetivos estéticos personales.
                  </Typography>
                </Box>

                {/* Card 3 */}
                <Box sx={{
                  backgroundColor: "#E9E9E9",
                  borderRadius: "16px",
                  p: { xs: "20px", md: "24px" },
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    backgroundColor: "#E6E6E6",
                    transform: "translateY(-2px)"
                  }
                }}>
                  <Box sx={{ display: "flex", gap: "4px", mb: "8px" }}>
                    <Box sx={{ width: "7px", height: "7px", backgroundColor: "#111", borderRadius: "50%" }} />
                    <Box sx={{ width: "7px", height: "7px", backgroundColor: "#111", borderRadius: "50%" }} />
                    <Box sx={{ width: "7px", height: "7px", backgroundColor: "#111", borderRadius: "50%" }} />
                  </Box>
                  <Typography sx={{
                    fontFamily: "Poppins",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#111",
                    mb: "6px",
                    textAlign: "left"
                  }}>
                    Tecnología Avanzada
                  </Typography>
                  <Typography sx={{
                    fontSize: "15px",
                    lineHeight: 1.55,
                    color: "rgba(0,0,0,0.7)",
                    textAlign: "left"
                  }}>
                    Utilizamos las técnicas más modernas y equipamiento de última generación para garantizar tu seguridad.
                  </Typography>
                </Box>
              </Box>

              {/* Card Ancha */}
              <Box sx={{
                backgroundColor: "#E9E9E9",
                borderRadius: "16px",
                p: { xs: "20px", md: "24px 28px" },
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                transition: "all 0.25s ease",
                "&:hover": {
                  backgroundColor: "#E6E6E6",
                  transform: "translateY(-2px)"
                }
              }}>
                <Box sx={{ display: "flex", gap: "4px", mb: "8px" }}>
                  <Box sx={{ width: "7px", height: "7px", backgroundColor: "#111", borderRadius: "50%" }} />
                  <Box sx={{ width: "7px", height: "7px", backgroundColor: "#111", borderRadius: "50%" }} />
                  <Box sx={{ width: "7px", height: "7px", backgroundColor: "#111", borderRadius: "50%" }} />
                  <Box sx={{ width: "7px", height: "7px", backgroundColor: "#111", borderRadius: "50%" }} />
                </Box>
                <Typography sx={{
                  fontFamily: "Poppins",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#111",
                  mb: "6px",
                  textAlign: "left"
                }}>
                  Atención Integral
                </Typography>
                <Typography sx={{
                  fontSize: "15px",
                  lineHeight: 1.55,
                  color: "rgba(0,0,0,0.7)",
                  maxWidth: "90%",
                  textAlign: "left"
                }}>
                  Acompañamiento completo desde la consulta inicial hasta el seguimiento post-operatorio para asegurar tu bienestar.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* NUESTRO ACERCAMIENTO SECTION */}
      <Box sx={{ bgcolor: "white", py: { xs: 6, sm: 8, md: 10 } }}>
        <Box sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          columnGap: "20px",
          mx: { xs: "20px", sm: "40px", md: "70px" },
        }}>
          <Box sx={{ gridColumn: { xs: "1 / 13", md: "3 / 10" } }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Poppins",
                fontSize: { xs: "2rem", sm: "2.5rem", md: "2.625rem" },
                fontWeight: 700,
                color: "#111",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                mb: { xs: 3, md: 6 },
                textAlign: "left"
              }}
            >
              Nuestro Acercamiento
            </Typography>

            <Box sx={{
              backgroundColor: "#F8F8F8",
              borderRadius: "20px",
              p: { xs: "12px", sm: "14px", md: "16px" },
            }}>
              <Box sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "14px",
              }}>
                {[
                  { 
                    dots: 1, 
                    title: "Consulta personalizada",
                    text: "Conocemos tus expectativas, anatomía y antecedentes clínicos. Definimos juntos el mejor enfoque para lograr un resultado natural y seguro."
                  },
                  {
                    dots: 2,
                    title: "Diseño del procedimiento", 
                    text: "Se estudian proporciones, medidas y proyección ideales según tu estructura corporal. Todo el plan se define de forma individualizada."
                  },
                  {
                    dots: 3,
                    title: "Precisión y cuidado",
                    text: "Utilizamos tecnología avanzada y protocolos internacionales para garantizar seguridad y resultados armónicos."
                  },
                  {
                    dots: 4,
                    title: "Seguimiento cercano",
                    text: "Te acompañamos durante el proceso postoperatorio, con controles programados y asistencia personalizada."
                  },
                  {
                    dots: 5,
                    title: "Armonía y confianza",
                    text: "Buscamos resultados equilibrados, que realcen tu figura respetando tu anatomía y bienestar general."
                  }
                ].map((item, index) => (
                  <Box key={index} sx={{
                    backgroundColor: "#E9E9E9",
                    borderRadius: "16px",
                    p: { xs: "20px", md: "24px" },
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      backgroundColor: "#E6E6E6",
                      transform: "translateY(-2px)"
                    }
                  }}>
                    <Box sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "4px",
                      mb: "8px",
                      height: "18px"
                    }}>
                      {Array.from({ length: item.dots }).map((_, i) => (
                        <Box key={i} sx={{
                          width: "7px",
                          height: "7px",
                          backgroundColor: "#111",
                          borderRadius: "50%"
                        }} />
                      ))}
                    </Box>

                    <Typography sx={{
                      fontFamily: "Poppins",
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#111",
                      mb: "6px",
                      textAlign: "left"
                    }}>
                      {item.title}
                    </Typography>

                    <Typography sx={{
                      fontSize: "15px",
                      lineHeight: 1.55,
                      color: "rgba(0,0,0,0.7)",
                      textAlign: "left"
                    }}>
                      {item.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* INFORMACIÓN DEL PROCEDIMIENTO */}
      <Box sx={{ bgcolor: "white", py: { xs: 6, sm: 8, md: 10 } }}>
        <Container maxWidth={false} sx={{
          maxWidth: "1400px",
          px: { xs: "20px", sm: "40px", md: "70px" },
        }}>
          <Box sx={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            columnGap: { xs: "0px", sm: "20px", md: "24px" },
            rowGap: { xs: 4, sm: 5, md: 8 }
          }}>

          <Box sx={{
            gridColumn: { xs: "1 / 13", md: "1 / 13" },
            mb: { xs: 2, sm: 3, md: 4 }
          }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Poppins",
                fontSize: { xs: "1.75rem", sm: "2.25rem", md: "3rem" },
                fontWeight: 600,
                color: "black",
                mb: { xs: 2, md: 3 },
                textAlign: "left"
              }}
            >
              Información del Procedimiento
            </Typography>
          </Box>

          {/* Description Card */}
          <Box sx={{ gridColumn: { xs: "1 / 13", sm: "1 / 13", md: "1 / 7" } }}>
            <Box sx={{
              p: { xs: "3px", sm: "4px", md: "5px" },
              backgroundColor: "#F5F5F5",
              borderRadius: { xs: "12px", md: "14px" },
            }}>
              <Box sx={{
                p: { xs: "18px", sm: "20px", md: "24px" },
                backgroundColor: "#E9E9E9",
                borderRadius: { xs: "8px", md: "10px" },
                height: "fit-content"
              }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: { xs: "17px", sm: "18px", md: "20px" },
                    fontWeight: 500,
                    color: "#000",
                    mb: { xs: 3, md: 4 },
                    letterSpacing: "-0.01em",
                    textAlign: "left"
                  }}
                >
                  Descripción
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "14px", sm: "15px" },
                    lineHeight: 1.6,
                    color: "#333",
                    mb: { xs: 3, md: 4 },
                    fontWeight: 400,
                    textAlign: "left"
                  }}
                >
                  {procedimiento.description}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    color: "#000",
                    mb: 2,
                    fontSize: "16px",
                    textAlign: "left"
                  }}
                >
                  Objetivo
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "14px",
                    lineHeight: 1.5,
                    color: "#333",
                    fontWeight: 400,
                    textAlign: "left"
                  }}
                >
                  {procedimiento.objetivo}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Specifications Card */}
          <Box sx={{ gridColumn: { xs: "1 / 13", sm: "1 / 13", md: "7 / 13" } }}>
            <Box sx={{
              p: { xs: "3px", sm: "4px", md: "5px" },
              backgroundColor: "#F5F5F5",
              borderRadius: { xs: "12px", md: "14px" },
            }}>
              <Box sx={{
                p: { xs: "18px", sm: "20px", md: "24px" },
                backgroundColor: "#E9E9E9",
                borderRadius: { xs: "8px", md: "10px" },
                height: "fit-content"
              }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: { xs: "17px", sm: "18px", md: "20px" },
                    fontWeight: 500,
                    color: "#000",
                    mb: { xs: 3, md: 4 },
                    letterSpacing: "-0.01em",
                    textAlign: "left"
                  }}
                >
                  Especificaciones
                </Typography>

                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                }}>
                  {Object.entries(procedimiento.specs).map(([key, value]) => (
                    <Box key={key} sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start'
                    }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontFamily: "Poppins",
                          fontWeight: 500,
                          color: "#000",
                          textTransform: "capitalize",
                          fontSize: { xs: "13px", sm: "14px" },
                          mb: 1,
                          textAlign: "left"
                        }}
                      >
                        {key.replace('_', ' ')}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: { xs: "13px", sm: "14px" },
                          color: "#333",
                          fontWeight: 400,
                          textAlign: "left"
                        }}
                      >
                        {value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Technique Card */}
          <Box sx={{ gridColumn: { xs: "1 / 13", sm: "1 / 13", md: "1 / 7" } }}>
            <Box sx={{
              p: { xs: "3px", sm: "4px", md: "5px" },
              backgroundColor: "#F5F5F5",
              borderRadius: { xs: "12px", md: "14px" },
            }}>
              <Box sx={{
                p: { xs: "18px", sm: "20px", md: "24px" },
                backgroundColor: "#E9E9E9",
                borderRadius: { xs: "8px", md: "10px" },
                height: "fit-content"
              }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: { xs: "17px", sm: "18px", md: "20px" },
                    fontWeight: 500,
                    color: "#000",
                    mb: { xs: 3, md: 4 },
                    letterSpacing: "-0.01em",
                    textAlign: "left"
                  }}
                >
                  Técnica
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "14px", sm: "15px" },
                    lineHeight: 1.6,
                    color: "#333",
                    fontWeight: 400,
                    textAlign: "left"
                  }}
                >
                  {procedimiento.tecnica}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Recovery Card */}
          <Box sx={{ gridColumn: { xs: "1 / 13", sm: "1 / 13", md: "7 / 13" } }}>
            <Box sx={{
              p: { xs: "3px", sm: "4px", md: "5px" },
              backgroundColor: "#F5F5F5",
              borderRadius: { xs: "12px", md: "14px" },
            }}>
              <Box sx={{
                p: { xs: "18px", sm: "20px", md: "24px" },
                backgroundColor: "#E9E9E9",
                borderRadius: { xs: "8px", md: "10px" },
                height: "fit-content"
              }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: { xs: "17px", sm: "18px", md: "20px" },
                    fontWeight: 500,
                    color: "#000",
                    mb: { xs: 3, md: 4 },
                    letterSpacing: "-0.01em",
                    textAlign: "left"
                  }}
                >
                  Recuperación
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "14px", sm: "15px" },
                    lineHeight: 1.6,
                    color: "#333",
                    fontWeight: 400,
                    textAlign: "left"
                  }}
                >
                  {procedimiento.recuperacion}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Tecnologías (si existen) */}
          {procedimiento.tecnologias && (
            <Box sx={{ gridColumn: "1 / 13", mt: { xs: 4, md: 6 } }}>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
                  fontWeight: 600,
                  color: "black",
                  mb: { xs: 3, md: 5 },
                  textAlign: "left",
                }}
              >
                Tecnologías Avanzadas
              </Typography>

              <Box sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: { xs: "20px", md: "24px" },
              }}>
                {procedimiento.tecnologias.map((tech, index) => (
                  <Box key={index} sx={{
                    backgroundColor: "#E9E9E9",
                    borderRadius: "24px",
                    p: { xs: "24px", md: "32px" },
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                    border: "1px solid rgba(255,255,255,0.8)",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      backgroundColor: "#E6E6E6",
                      transform: "translateY(-2px)"
                    }
                  }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: 600,
                        color: "#000",
                        mb: 3,
                        fontSize: "20px",
                        letterSpacing: "-0.01em",
                        textAlign: "left"
                      }}
                    >
                      {tech.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "15px",
                        lineHeight: 1.6,
                        color: "rgba(0,0,0,0.7)",
                        fontWeight: 400,
                        textAlign: "left"
                      }}
                    >
                      {tech.description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* Sub-procedimientos (si existen) */}
          {procedimiento.subprocedimientos && (
            <Box sx={{ gridColumn: "1 / 13", mt: { xs: 4, md: 6 } }}>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
                  fontWeight: 600,
                  color: "black",
                  mb: { xs: 3, md: 5 },
                  textAlign: "left",
                }}
              >
                Tipos de Cirugía Mamaria
              </Typography>

              <Box sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: { xs: "20px", md: "24px" },
              }}>
                {procedimiento.subprocedimientos.map((sub, index) => (
                  <Box key={index} sx={{
                    backgroundColor: "#E9E9E9",
                    borderRadius: "24px",
                    p: { xs: "24px", md: "32px" },
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                    border: "1px solid rgba(255,255,255,0.8)",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      backgroundColor: "#E6E6E6",
                      transform: "translateY(-2px)"
                    }
                  }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: 600,
                        color: "#000",
                        mb: 3,
                        fontSize: { xs: "18px", md: "20px" },
                        letterSpacing: "-0.01em",
                        textAlign: "left"
                      }}
                    >
                      {sub.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: { xs: "14px", md: "15px" },
                        lineHeight: 1.6,
                        color: "rgba(0,0,0,0.7)",
                        fontWeight: 400,
                        textAlign: "left"
                      }}
                    >
                      {sub.description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* CTA Section */}
          <Box sx={{
            gridColumn: "1 / 13",
            mt: { xs: 6, md: 8 }
          }}>
            <Box sx={{
              backgroundColor: "#E9E9E9",
              borderRadius: "24px",
              p: { xs: "32px", md: "48px" },
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              border: "1px solid rgba(255,255,255,0.8)",
              textAlign: "center"
            }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "Poppins",
                  fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                  fontWeight: 600,
                  color: "black",
                  mb: { xs: 2, md: 3 },
                }}
              >
                ¿Listo para transformar tu imagen?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "15px", sm: "16px", md: "17px" },
                  color: "rgba(0,0,0,0.7)",
                  mb: { xs: 3, md: 4 },
                  maxWidth: "700px",
                  mx: "auto",
                  lineHeight: 1.6
                }}
              >
                Agenda tu consulta personalizada y descubre cómo podemos ayudarte a lograr tus objetivos estéticos.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  background: "rgba(0, 129, 199, 0.8)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "white",
                  px: { xs: 4, sm: 5, md: 6 },
                  py: { xs: 1.5, md: 2 },
                  fontSize: { xs: "14px", sm: "15px", md: "16px" },
                  fontWeight: 600,
                  borderRadius: "16px",
                  textTransform: "none",
                  "&:hover": {
                    background: "rgba(0, 112, 181, 0.9)",
                    backdropFilter: "blur(15px)",
                    WebkitBackdropFilter: "blur(15px)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(0, 129, 199, 0.4)"
                  },
                  transition: "all 0.3s ease"
                }}
              >
                Agendar Consulta
              </Button>
            </Box>
          </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  )
}
