import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button, Box, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import Footer from "../components/UI/Footer"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Custom hook para detectar mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

// Data completa de procedimientos
const procedimientosData = {
  "01": {
    number: "01",
    title: "Aumento Mamario",
    subtitle: "Implantes Mamarios",
    category: "Cirugía Mamaria",
    imageSrc: "/images/imagen5.png",
    catchPhrase: "Realza tu figura con seguridad y resultados naturales diseñados específicamente para ti.",
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
    imageSrc: "/images/imagen5.png",
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
  },
  "03": {
    number: "03",
    title: "Rinoplastia",
    subtitle: "Refinamiento Nasal",
    category: "Cirugía Facial",
    imageSrc: "/images/imagen5.png",
    catchPhrase: "Refinamiento nasal que respeta tu armonía facial natural mediante técnicas ultraprecisas.",
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
    imageSrc: "/images/imagen5.png",
    catchPhrase: "Remodelación abdominal completa para un torso firme y definido con resultados duraderos.",
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
    imageSrc: "/images/imagen5.png",
    catchPhrase: "Rejuvenecimiento de la mirada con técnica microquirúrgica para resultados naturales.",
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

const AnimatedCard = ({ children, delay = 0 }) => {
  const cardRef = useRef(null)

  useEffect(() => {
    if (!cardRef.current) return

    const element = cardRef.current
    
    gsap.fromTo(element, 
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        }
      }
    )
  }, [delay])

  return <div ref={cardRef}>{children}</div>
}

export default function ProcedimientoDetalle() {
  const [currentId, setCurrentId] = useState("01")
  const [navOpen, setNavOpen] = useState(false)
  const isMobile = useIsMobile()
  const sectionRef = useRef(null)
  const maskRef = useRef(null)
  const numberRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const categoryRef = useRef(null)
  const catchPhraseRef = useRef(null)
  const benefitsRef = useRef(null)
  const approachRef = useRef(null)
  const infoRef = useRef(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  const procedimiento = procedimientosData[currentId]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentId])

  useEffect(() => {
    const img = new Image()
    img.src = procedimiento.imageSrc
    img.onload = () => setImageLoaded(true)
  }, [procedimiento.imageSrc])

  useEffect(() => {
    if (!imageLoaded) return

    // Limpiar todos los ScrollTriggers anteriores
    ScrollTrigger.getAll().forEach(st => st.kill())

    const ctx = gsap.context(() => {
      // Animación del Hero con blur
      gsap.set(maskRef.current, {
        clipPath: "inset(35% 25% 35% 25%)",
      })

      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top", 
          scrub: true,
          pin: true,
          pinSpacing: false,
        },
      }).to(maskRef.current, {
        clipPath: "inset(0%)",
        ease: "power2.inOut",
        duration: 1,
      })

      // Animaciones blur del texto del hero - MÁS LENTAS
      const textTimeline = gsap.timeline({ delay: 0.5 })
      
      textTimeline.from(numberRef.current, {
        opacity: 0,
        filter: "blur(20px)",
        scale: 0.9,
        duration: 1.5,
        ease: "power3.out"
      })
      .from(categoryRef.current, {
        opacity: 0,
        filter: "blur(10px)",
        y: 20,
        duration: 1.2,
        ease: "power3.out"
      }, "-=1.2")
      .from(titleRef.current, {
        opacity: 0,
        filter: "blur(15px)",
        y: 30,
        duration: 1.5,
        ease: "power3.out"
      }, "-=1.1")
      .from(subtitleRef.current, {
        opacity: 0,
        filter: "blur(10px)",
        y: 20,
        duration: 1.2,
        ease: "power3.out"
      }, "-=1.0")
      .from(catchPhraseRef.current, {
        opacity: 0,
        filter: "blur(8px)",
        y: 15,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8")

      // Animación de títulos de secciones - MÁS LENTAS Y CON MEJOR CONFIGURACIÓN
      gsap.utils.toArray([benefitsRef.current, approachRef.current, infoRef.current]).forEach((section) => {
        if (section) {
          const title = section.querySelector('.section-title')
          if (title) {
            gsap.fromTo(title, 
              {
                y: 50,
                opacity: 0,
              },
              {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 80%",
                  end: "bottom 20%",
                  toggleActions: "play none none none",
                }
              }
            )
          }
        }
      })

    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [imageLoaded, currentId])

  const benefitsData = [
    {
      dots: 2,
      title: "Resultados Predecibles",
      description: "Nos enfocamos en lograr resultados naturales y armoniosos, cumpliendo con las expectativas de cada paciente."
    },
    {
      dots: 1,
      title: "Diseño Personalizado",
      description: "Cada tratamiento es único y se adapta a tus características físicas y objetivos estéticos personales."
    },
    {
      dots: 3,
      title: "Tecnología Avanzada",
      description: "Utilizamos las técnicas más modernas y equipamiento de última generación para garantizar tu seguridad."
    },
    {
      dots: 4,
      title: "Atención Integral",
      description: "Acompañamiento completo desde la consulta inicial hasta el seguimiento post-operatorio para asegurar tu bienestar."
    }
  ]

  const approachData = [
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
  ]

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>
      {/* Navigation Menu - Frosted Glass Bottom Nav */}
      <div style={{
        position: "fixed",
        bottom: isMobile ? "20px" : "30px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        width: isMobile ? "calc(100% - 40px)" : "auto",
        maxWidth: isMobile ? "500px" : "none"
      }}>
        {/* Menu Items - Slide Up */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          opacity: navOpen ? 1 : 0,
          transform: navOpen ? "translateY(0)" : "translateY(20px)",
          pointerEvents: navOpen ? "auto" : "none",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          maxHeight: navOpen ? "400px" : "0px",
          overflowY: "auto",
          padding: navOpen ? "12px" : "0",
          background: navOpen ? "rgba(255, 255, 255, 0.85)" : "transparent",
          backdropFilter: navOpen ? "blur(20px) saturate(180%)" : "blur(0px)",
          WebkitBackdropFilter: navOpen ? "blur(20px) saturate(180%)" : "blur(0px)",
          border: navOpen ? "1px solid rgba(255, 255, 255, 0.4)" : "1px solid transparent",
          borderRadius: "16px",
          boxShadow: navOpen ? "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)" : "none",
          width: isMobile ? "100%" : "auto",
          minWidth: isMobile ? "100%" : "280px"
        }}>
          {Object.entries(procedimientosData).map(([id, proc]) => (
            <button
              key={id}
              onClick={() => {
                setCurrentId(id)
                setNavOpen(false)
              }}
              style={{
                padding: "12px 20px",
                background: currentId === id
                  ? "rgba(0, 129, 199, 0.15)"
                  : "rgba(255, 255, 255, 0.3)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: currentId === id
                  ? "1.5px solid rgba(0, 129, 199, 0.4)"
                  : "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "12px",
                color: currentId === id ? "#0081C7" : "#333",
                fontSize: "14px",
                fontWeight: currentId === id ? 600 : 500,
                cursor: "pointer",
                transition: "all 0.3s ease",
                textAlign: "left",
                width: "100%",
                fontFamily: "Poppins, sans-serif",
                letterSpacing: "-0.01em"
              }}
              onMouseEnter={(e) => {
                if (currentId !== id) {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.5)"
                  e.currentTarget.style.transform = "translateX(4px)"
                }
              }}
              onMouseLeave={(e) => {
                if (currentId !== id) {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.3)"
                  e.currentTarget.style.transform = "translateX(0)"
                }
              }}
            >
              {proc.number} - {proc.title}
            </button>
          ))}
        </div>

        {/* Toggle Button - Always Visible */}
        <button
          onClick={() => setNavOpen(!navOpen)}
          style={{
            padding: isMobile ? "12px 24px" : "14px 28px",
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(25px) saturate(200%)",
            WebkitBackdropFilter: "blur(25px) saturate(200%)",
            border: "1.5px solid rgba(255, 255, 255, 0.5)",
            borderRadius: "20px",
            color: "#111",
            fontSize: isMobile ? "13px" : "14px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
            fontFamily: "Poppins, sans-serif",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            letterSpacing: "-0.01em",
            width: isMobile ? "100%" : "auto",
            justifyContent: "center"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)"
            e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)"
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.6)"
          }}
        >
          <span>{navOpen ? "Cerrar" : "Cambiar Procedimiento"}</span>
          <span style={{
            transform: navOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
            display: "inline-block"
          }}>
            ▲
          </span>
        </button>
      </div>

      {/* HERO SECTION */}
      <section
        ref={sectionRef}
        style={{
          position: "relative",
          height: "100vh",
          width: "100%",
          backgroundColor: "#F5F5F5",
          overflow: "hidden",
        }}
      >
        <div
          ref={maskRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundImage: `url(${procedimiento.imageSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 2,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{
            width: "100%",
            position: "relative",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: "0px", md: "70px" },
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
                  opacity: 0.95,
                  margin: 0
                }}
              >
                {procedimiento.number}
              </Typography>
            </Box>

            {/* DERECHA: Título menos bold + Catch Phrase con más espacio */}
            <Box
              sx={{
                textAlign: {xs: 'center', md: "right"},
                maxWidth: { xs: "100%", md: "45%", lg: "35%" },
                lineHeight: { xs: 1.1, md: 1.5 },
                mt: { xs: "20px", md: "0px" }
              }}
            >
              <span
                ref={categoryRef}
                style={{
                  display: "inline-block",
                  background: "rgba(255, 255, 255, 0.25)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  color: "#111",
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  mb: { xs: 0.5, md: 2.5},
                  height: "26px"
                }}
              >
                {procedimiento.category}
              </span>

              <h2
                ref={titleRef}
                style={{
                  color: "#111",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: isMobile ? "2.5rem" : "4rem",
                  fontWeight: 600,
                  lineHeight: 1.1,
                  mb: { xs: 1, md: 3.5},
                  letterSpacing: "-0.02em"
                }}
              >
                {procedimiento.title}
              </h2>

              <h3
                ref={subtitleRef}
                style={{
                  color: "rgba(0,0,0,0.7)",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: isMobile ? "1rem" : "1.2rem",
                  fontWeight: 400,
                  marginBottom: "24px",
                  marginTop: 0
                }}
              >
                {procedimiento.subtitle}
              </h3>

              <p
                ref={catchPhraseRef}
                style={{
                  color: "rgba(0,0,0,0.65)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: isMobile ? "0.9rem" : "1rem",
                  fontWeight: 400,
                  lineHeight: 1.65,
                  letterSpacing: "-0.01em",
                  margin: 0
                }}
              >
                {procedimiento.catchPhrase}
              </p>
            </Box>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION - Columnas 3 a 11 */}
      <section ref={benefitsRef} style={{ backgroundColor: "white", padding: isMobile ? "60px 0" : "80px 0" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          columnGap: "20px",
          margin: isMobile ? "0 20px" : "0 70px",
        }}>
          <div style={{ gridColumn: isMobile ? "1 / -1" : "3 / 11" }}>
            <h2
              className="section-title"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: isMobile ? "2rem" : "2.625rem",
                fontWeight: 300,
                color: "#111",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "48px",
                marginTop: 0,
                textAlign: "left"
              }}
            >
              Beneficios
            </h2>

            <div style={{
              position: "relative",
              borderRadius: "1.5rem",
              border: "1px solid rgba(0, 0, 0, 0.06)",
              backgroundColor: "#F0F0F0",
              padding: "0.5rem",
            }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
                gap: "0.5rem",
              }}>
                {benefitsData.slice(0, 3).map((benefit, index) => (
                  <AnimatedCard key={index} delay={index * 0.2}>
                    <div
                      style={{
                        backgroundColor: "#DCDCDC",
                        borderRadius: "1rem",
                        padding: "1.75rem",
                        transition: "background-color 0.3s ease",
                        cursor: "default",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#D5D5D5"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#DCDCDC"}
                    >
                      <div style={{ display: "flex", gap: "4px", marginBottom: "12px" }}>
                        {Array.from({ length: benefit.dots }).map((_, i) => (
                          <div key={i} style={{
                            width: "7px",
                            height: "7px",
                            backgroundColor: "#111",
                            borderRadius: "50%"
                          }} />
                        ))}
                      </div>
                      <h3 style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                        fontWeight: 400,
                        color: "#111",
                        marginBottom: "12px",
                        marginTop: 0,
                        textAlign: "left"
                      }}>
                        {benefit.title}
                      </h3>
                      <p style={{
                        color: "#666",
                        lineHeight: 1.6,
                        fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
                        margin: 0,
                        textAlign: "left"
                      }}>
                        {benefit.description}
                      </p>
                    </div>
                  </AnimatedCard>
                ))}
              </div>

              <div style={{
                marginTop: "0.5rem",
                gridColumn: isMobile ? "span 2" : "auto"
              }}>
                <AnimatedCard delay={0.6}>
                  <div
                    style={{
                      backgroundColor: "#DCDCDC",
                      borderRadius: "1rem",
                      padding: "1.75rem",
                      transition: "background-color 0.3s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#D5D5D5"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#DCDCDC"}
                  >
                    <div style={{ display: "flex", gap: "4px", marginBottom: "12px" }}>
                      {Array.from({ length: benefitsData[3].dots }).map((_, i) => (
                        <div key={i} style={{
                          width: "7px",
                          height: "7px",
                          backgroundColor: "#111",
                          borderRadius: "50%"
                        }} />
                      ))}
                    </div>
                    <h3 style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                      fontWeight: 400,
                      color: "#111",
                      marginBottom: "12px",
                      marginTop: 0,
                      textAlign: "left"
                    }}>
                      {benefitsData[3].title}
                    </h3>
                    <p style={{
                      color: "#666",
                      lineHeight: 1.6,
                      fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
                      margin: 0,
                      textAlign: "left"
                    }}>
                      {benefitsData[3].description}
                    </p>
                  </div>
                </AnimatedCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NUESTRO ACERCAMIENTO SECTION - Columnas 3 a 11 */}
      <section ref={approachRef} style={{ backgroundColor: "white", padding: isMobile ? "60px 0" : "80px 0" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          columnGap: "20px",
          margin: isMobile ? "0 20px" : "0 70px",
        }}>
          <div style={{ gridColumn: isMobile ? "1 / -1" : "3 / 11" }}>
            <h2
              className="section-title"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: isMobile ? "2rem" : "2.625rem",
                fontWeight: 300,
                color: "#111",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "48px",
                marginTop: 0,
                textAlign: "left"
              }}
            >
              Nuestro Acercamiento
            </h2>

            <div style={{
              position: "relative",
              borderRadius: "1.5rem",
              border: "1px solid rgba(0, 0, 0, 0.06)",
              backgroundColor: "#F0F0F0",
              padding: "0.5rem",
            }}>
              {/* Primera fila: 3 cards en desktop, 2 en mobile */}
              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
                gap: "0.5rem",
                marginBottom: "0.5rem"
              }}>
                {approachData.slice(0, 3).map((item, index) => (
                  <AnimatedCard key={index} delay={index * 0.15}>
                    <div
                      style={{
                        backgroundColor: "#DCDCDC",
                        borderRadius: "1rem",
                        padding: "1.75rem",
                        transition: "background-color 0.3s ease",
                        cursor: "default",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#D5D5D5"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#DCDCDC"}
                    >
                      <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "4px",
                        marginBottom: "12px",
                        height: "18px"
                      }}>
                        {Array.from({ length: item.dots }).map((_, i) => (
                          <div key={i} style={{
                            width: "7px",
                            height: "7px",
                            backgroundColor: "#111",
                            borderRadius: "50%"
                          }} />
                        ))}
                      </div>

                      <h3 style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                        fontWeight: 400,
                        color: "#111",
                        marginBottom: "12px",
                        marginTop: 0,
                        textAlign: "left"
                      }}>
                        {item.title}
                      </h3>

                      <p style={{
                        color: "#666",
                        lineHeight: 1.6,
                        fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
                        margin: 0,
                        textAlign: "left"
                      }}>
                        {item.text}
                      </p>
                    </div>
                  </AnimatedCard>
                ))}
              </div>

              {/* Segunda fila: 2 cards en desktop, 2 en mobile */}
              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
                gap: "0.5rem"
              }}>
                {approachData.slice(3, 5).map((item, index) => (
                  <AnimatedCard key={index + 3} delay={(index + 3) * 0.15}>
                    <div
                      style={{
                        backgroundColor: "#DCDCDC",
                        borderRadius: "1rem",
                        padding: "1.75rem",
                        transition: "background-color 0.3s ease",
                        cursor: "default",
                        gridColumn: isMobile ? "span 1" : (index === 1 ? "span 2" : "span 1"),
                        height: "100%",
                        display: "flex",
                        flexDirection: "column"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#D5D5D5"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#DCDCDC"}
                    >
                      <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "4px",
                        marginBottom: "12px",
                        height: "18px"
                      }}>
                        {Array.from({ length: item.dots }).map((_, i) => (
                          <div key={i} style={{
                            width: "7px",
                            height: "7px",
                            backgroundColor: "#111",
                            borderRadius: "50%"
                          }} />
                        ))}
                      </div>

                      <h3 style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                        fontWeight: 400,
                        color: "#111",
                        marginBottom: "12px",
                        marginTop: 0,
                        textAlign: "left"
                      }}>
                        {item.title}
                      </h3>

                      <p style={{
                        color: "#666",
                        lineHeight: 1.6,
                        fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
                        margin: 0,
                        textAlign: "left"
                      }}>
                        {item.text}
                      </p>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INFORMACIÓN DEL PROCEDIMIENTO - Columnas 3 a 11 */}
      <section ref={infoRef} style={{ backgroundColor: "white", padding: isMobile ? "60px 0" : "80px 0" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          columnGap: "20px",
          margin: isMobile ? "0 20px" : "0 70px",
        }}>

          <div style={{ gridColumn: isMobile ? "1 / -1" : "3 / 11" }}>
            <h2
              className="section-title"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: isMobile ? "2rem" : "2.625rem",
                fontWeight: 300,
                color: "#111",
                marginBottom: "48px",
                marginTop: 0,
                textAlign: "left"
              }}
            >
              Información del Procedimiento
            </h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: "24px",
              marginBottom: "48px"
            }}>
              {/* Description */}
              <AnimatedCard delay={0}>
                <div style={{
                  position: "relative",
                  borderRadius: "1.5rem",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  backgroundColor: "#F0F0F0",
                  padding: "0.5rem",
                }}>
                  <div
                    style={{
                      backgroundColor: "#DCDCDC",
                      borderRadius: "1rem",
                      padding: "1.75rem",
                      transition: "background-color 0.3s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#D5D5D5"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#DCDCDC"}
                  >
                    <h4 style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                      fontWeight: 400,
                      color: "#000",
                      marginBottom: "24px",
                      marginTop: 0,
                      textAlign: "left"
                    }}>
                      Descripción
                    </h4>
                    <p style={{
                      color: "#666",
                      lineHeight: 1.6,
                      fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
                      marginBottom: "24px",
                      marginTop: 0,
                      textAlign: "left"
                    }}>
                      {procedimiento.description}
                    </p>
                    <h6 style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 400,
                      color: "#000",
                      marginBottom: "16px",
                      fontSize: "1rem",
                      textAlign: "left"
                    }}>
                      Objetivo
                    </h6>
                    <p style={{
                      color: "#666",
                      lineHeight: 1.6,
                      fontSize: "0.9rem",
                      margin: 0,
                      textAlign: "left"
                    }}>
                      {procedimiento.objetivo}
                    </p>
                  </div>
                </div>
              </AnimatedCard>

              {/* Specs */}
              <AnimatedCard delay={0.15}>
                <div style={{
                  position: "relative",
                  borderRadius: "1.5rem",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  backgroundColor: "#F0F0F0",
                  padding: "0.5rem",
                }}>
                  <div
                    style={{
                      backgroundColor: "#DCDCDC",
                      borderRadius: "1rem",
                      padding: "1.75rem",
                      transition: "background-color 0.3s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#D5D5D5"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#DCDCDC"}
                  >
                    <h4 style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                      fontWeight: 400,
                      color: "#000",
                      marginBottom: "24px",
                      marginTop: 0,
                      textAlign: "left"
                    }}>
                      Especificaciones
                    </h4>

                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '24px',
                    }}>
                      {Object.entries(procedimiento.specs).map(([key, value]) => (
                        <div key={key}>
                          <p style={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 400,
                            color: "#000",
                            textTransform: "capitalize",
                            fontSize: "0.95rem",
                            marginBottom: "8px",
                            marginTop: 0,
                            textAlign: "left"
                          }}>
                            {key.replace('_', ' ')}
                          </p>
                          <p style={{
                            color: "#666",
                            fontSize: "0.9rem",
                            margin: 0,
                            textAlign: "left"
                          }}>
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              {/* Tecnica */}
              <AnimatedCard delay={0.3}>
                <div style={{
                  position: "relative",
                  borderRadius: "1.5rem",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  backgroundColor: "#F0F0F0",
                  padding: "0.5rem",
                }}>
                  <div
                    style={{
                      backgroundColor: "#DCDCDC",
                      borderRadius: "1rem",
                      padding: "1.75rem",
                      transition: "background-color 0.3s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#D5D5D5"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#DCDCDC"}
                  >
                    <h4 style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                      fontWeight: 400,
                      color: "#000",
                      marginBottom: "24px",
                      marginTop: 0,
                      textAlign: "left"
                    }}>
                      Técnica
                    </h4>
                    <p style={{
                      color: "#666",
                      lineHeight: 1.6,
                      fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
                      margin: 0,
                      textAlign: "left"
                    }}>
                      {procedimiento.tecnica}
                    </p>
                  </div>
                </div>
              </AnimatedCard>

              {/* Recuperacion */}
              <AnimatedCard delay={0.45}>
                <div style={{
                  position: "relative",
                  borderRadius: "1.5rem",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  backgroundColor: "#F0F0F0",
                  padding: "0.5rem",
                }}>
                  <div
                    style={{
                      backgroundColor: "#DCDCDC",
                      borderRadius: "1rem",
                      padding: "1.75rem",
                      transition: "background-color 0.3s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#D5D5D5"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#DCDCDC"}
                  >
                    <h4 style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                      fontWeight: 400,
                      color: "#000",
                      marginBottom: "24px",
                      marginTop: 0,
                      textAlign: "left"
                    }}>
                      Recuperación
                    </h4>
                    <p style={{
                      color: "#666",
                      lineHeight: 1.6,
                      fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
                      margin: 0,
                      textAlign: "left"
                    }}>
                      {procedimiento.recuperacion}
                    </p>
                  </div>
                </div>
              </AnimatedCard>
            </div>

            {/* Tecnologías */}
            {procedimiento.tecnologias && (
              <div style={{ marginTop: "48px" }}>
                <h3 style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: isMobile ? "1.75rem" : "2.5rem",
                  fontWeight: 300,
                  color: "#111",
                  marginBottom: "40px",
                  marginTop: 0,
                  textAlign: "left",
                }}>
                  Tecnologías Avanzadas
                </h3>

                <div style={{
                  position: "relative",
                  borderRadius: "1.5rem",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  backgroundColor: "#F0F0F0",
                  padding: "0.5rem",
                }}>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "0.5rem",
                  }}>
                    {procedimiento.tecnologias.map((tech, index) => (
                      <AnimatedCard key={index} delay={index * 0.15}>
                        <div
                          style={{
                            backgroundColor: "#DCDCDC",
                            borderRadius: "1rem",
                            padding: "1.75rem",
                            transition: "background-color 0.3s ease",
                            cursor: "default",
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#D5D5D5"}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#DCDCDC"}
                        >
                          <h5 style={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                            fontWeight: 400,
                            color: "#000",
                            marginBottom: "12px",
                            marginTop: 0,
                            textAlign: "left"
                          }}>
                            {tech.name}
                          </h5>
                          <p style={{
                            color: "#666",
                            lineHeight: 1.6,
                            fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
                            margin: 0,
                            textAlign: "left"
                          }}>
                            {tech.description}
                          </p>
                        </div>
                      </AnimatedCard>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Subprocedimientos */}
            {procedimiento.subprocedimientos && (
              <div style={{ marginTop: "48px" }}>
                <h3 style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: isMobile ? "1.75rem" : "2.5rem",
                  fontWeight: 300,
                  color: "#111",
                  marginBottom: "40px",
                  marginTop: 0,
                  textAlign: "left",
                }}>
                  Tipos de Cirugía Mamaria
                </h3>

                <div style={{
                  position: "relative",
                  borderRadius: "1.5rem",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  backgroundColor: "#F0F0F0",
                  padding: "0.5rem",
                }}>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "0.5rem",
                  }}>
                    {procedimiento.subprocedimientos.map((sub, index) => (
                      <AnimatedCard key={index} delay={index * 0.15}>
                        <div
                          style={{
                            backgroundColor: "#DCDCDC",
                            borderRadius: "1rem",
                            padding: "1.75rem",
                            transition: "background-color 0.3s ease",
                            cursor: "default",
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#D5D5D5"}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#DCDCDC"}
                        >
                          <h6 style={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                            fontWeight: 400,
                            color: "#000",
                            marginBottom: "12px",
                            marginTop: 0,
                            textAlign: "left"
                          }}>
                            {sub.name}
                          </h6>
                          <p style={{
                            color: "#666",
                            lineHeight: 1.6,
                            fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
                            margin: 0,
                            textAlign: "left"
                          }}>
                            {sub.description}
                          </p>
                        </div>
                      </AnimatedCard>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Process */}
            {procedimiento.process && (
              <div style={{ marginTop: "48px" }}>
                <h3 style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: isMobile ? "1.75rem" : "2.5rem",
                  fontWeight: 300,
                  color: "#111",
                  marginBottom: "40px",
                  marginTop: 0,
                  textAlign: "left",
                }}>
                  Proceso del Tratamiento
                </h3>

                <div style={{
                  position: "relative",
                  borderRadius: "1.5rem",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  backgroundColor: "#F0F0F0",
                  padding: "0.5rem",
                }}>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "0.5rem",
                  }}>
                    {procedimiento.process.map((step, index) => (
                      <AnimatedCard key={index} delay={index * 0.15}>
                        <div
                          style={{
                            backgroundColor: "#DCDCDC",
                            borderRadius: "1rem",
                            padding: "1.75rem",
                            transition: "background-color 0.3s ease",
                            cursor: "default",
                            textAlign: "center"
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#D5D5D5"}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#DCDCDC"}
                        >
                          <h4 style={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "2rem",
                            fontWeight: 700,
                            color: "#75909F",
                            marginBottom: "16px",
                            marginTop: 0,
                            opacity: 0.7
                          }}>
                            {step.step}
                          </h4>
                          <h6 style={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 400,
                            color: "#000",
                            marginBottom: "16px",
                            fontSize: "1.2rem",
                            marginTop: 0
                          }}>
                            {step.title}
                          </h6>
                          <p style={{
                            fontSize: "0.9rem",
                            lineHeight: 1.6,
                            color: "#666",
                            margin: 0
                          }}>
                            {step.description}
                          </p>
                        </div>
                      </AnimatedCard>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            <div style={{ marginTop: "64px" }}>
              <AnimatedCard delay={0}>
                <div style={{
                  position: "relative",
                  borderRadius: "1.5rem",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  backgroundColor: "#F0F0F0",
                  padding: "0.5rem",
                }}>
                  <div
                    style={{
                      backgroundColor: "#DCDCDC",
                      borderRadius: "1rem",
                      padding: "48px",
                      textAlign: "center",
                      transition: "background-color 0.3s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#D5D5D5"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#DCDCDC"}
                  >
                    <h4 style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                      fontWeight: 400,
                      color: "#000",
                      marginBottom: "24px",
                      marginTop: 0
                    }}>
                      ¿Listo para transformar tu imagen?
                    </h4>
                    <p style={{
                      color: "#666",
                      lineHeight: 1.6,
                      fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
                      marginBottom: "32px",
                      maxWidth: "700px",
                      margin: "0 auto 32px",
                    }}>
                      Agenda tu consulta personalizada y descubre cómo podemos ayudarte a lograr tus objetivos estéticos.
                    </p>
                    <button
                      style={{
                        background: "rgba(0, 129, 199, 0.8)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        color: "white",
                        padding: "16px 48px",
                        fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
                        fontWeight: 600,
                        borderRadius: "1rem",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(0, 112, 181, 0.9)"
                        e.currentTarget.style.transform = "translateY(-2px)"
                        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 129, 199, 0.4)"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(0, 129, 199, 0.8)"
                        e.currentTarget.style.transform = "translateY(0)"
                        e.currentTarget.style.boxShadow = "none"
                      }}
                    >
                      Agendar Consulta
                    </button>
                  </div>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
