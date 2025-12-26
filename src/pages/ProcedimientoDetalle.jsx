"use client"

import React, { useRef, useLayoutEffect, useState, useEffect } from "react"
import { useParams, Link as RouterLink, useLocation } from "react-router-dom"
import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import { Box, Typography } from "@mui/material"
import Footer from "../components/UI/Footer"
import ProcessSteps from "../components/procedimientos/ProcessSteps.tsx"

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

// Componente AnimatedCard para animaciones de entrada
const AnimatedCard = ({ children, delay = 0 }) => {
  const cardRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={cardRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

// Data de beneficios
const benefitsData = [
  {
    dots: 3,
    title: "Resultados Naturales",
    description: "Técnicas avanzadas que garantizan resultados armoniosos y acordes a tu anatomía."
  },
  {
    dots: 4,
    title: "Seguridad Certificada",
    description: "Procedimientos realizados en instalaciones de primer nivel con los más altos estándares de seguridad."
  },
  {
    dots: 2,
    title: "Recuperación Optimizada",
    description: "Protocolos de cuidado postoperatorio diseñados para una recuperación más rápida y cómoda."
  },
  {
    dots: 5,
    title: "Atención Personalizada",
    description: "Cada procedimiento es único y adaptado a tus objetivos estéticos y necesidades específicas."
  }
]

// Data de acercamiento
const approachData = [
  {
    dots: 3,
    title: "Consulta Inicial",
    text: "Evaluación completa de tus expectativas, anatomía y estado de salud para diseñar un plan personalizado."
  },
  {
    dots: 4,
    title: "Planificación 3D",
    text: "Simulación avanzada de resultados esperados utilizando tecnología de visualización tridimensional."
  },
  {
    dots: 2,
    title: "Procedimiento Quirúrgico",
    text: "Cirugía realizada con precisión técnica en instalaciones certificadas con equipo de última generación."
  },
  {
    dots: 5,
    title: "Seguimiento Continuo",
    text: "Acompañamiento personalizado durante todo el proceso de recuperación y resultados finales."
  },
  {
    dots: 6,
    title: "Garantía de Satisfacción",
    text: "Compromiso con tu bienestar y satisfacción, con controles regulares hasta lograr el resultado óptimo deseado."
  }
]

// Data completa de procedimientos
const procedimientosData = {
  "01": {
    number: "01",
    title: "Cirugía Mamaria",
    subtitle: "Aumento, Reducción & Reconstrucción",
    category: "Especialización Principal",
    imageSrc: "/images/image.png",
    catchPhrase: "Procedimientos seguros y personalizados para lograr resultados naturales y armoniosos.",
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
    title: "Cirugía Estética Nasal",
    subtitle: "Rinoplastia & Septoplastia",
    category: "Cirugía Facial",
    imageSrc: "/images/imagen5.jpg",
    catchPhrase: "Armonía facial perfecta mediante técnicas quirúrgicas precisas y resultados naturales duraderos.",
    description: "La rinoplastia es un procedimiento quirúrgico diseñado para mejorar la forma y función de la nariz, logrando armonía con las demás características faciales mientras se respeta la identidad única de cada paciente.",
    objetivo: "Corrección estética y funcional de la nariz, mejora de la armonía facial, solución de problemas respiratorios.",
    specs: {
      tipo: "Ambulatoria, cirugía del día",
      lugar: "Block quirúrgico", 
      anestesia: "General",
      duracion: "2-3 horas aproximadamente"
    },
    tecnica: "Técnica abierta o cerrada según el caso, con remodelación de estructuras óseas y cartilaginosas. Puede incluir septoplastia para corrección funcional respiratoria.",
    recuperacion: "Férula nasal por 7-10 días. Inflamación inicial disminuye en 2-3 semanas. Resultado definitivo visible a los 12 meses."
  },
  "04": {
    number: "04", 
    title: "Remodelación Abdominal Completa",
    subtitle: "Abdominoplastia & Liposucción",
    category: "Contorno Corporal",
    imageSrc: "/images/imagen5.jpg",
    catchPhrase: "Recupera tu silueta ideal con procedimientos avanzados que combinan eliminación de grasa y tensado de piel.",
    description: "La abdominoplastia es un procedimiento integral que elimina el exceso de piel y grasa abdominal, repara la musculatura y redefine el contorno corporal para lograr un abdomen firme y tonificado.",
    objetivo: "Eliminación de exceso de piel y grasa abdominal, corrección de diástasis de rectos, mejora del contorno corporal.",
    specs: {
      tipo: "Ambulatoria o con internación de 24h",
      lugar: "Block quirúrgico", 
      anestesia: "General",
      duracion: "3-4 horas aproximadamente"
    },
    tecnica: "Incisión horizontal baja, eliminación de exceso de piel y grasa, reparación muscular, reposicionamiento del ombligo. Puede combinarse con liposucción.",
    recuperacion: "Reposo relativo por 2 semanas. Uso de faja compresiva por 6-8 semanas. Retorno progresivo a actividades en 4-6 semanas."
  },
  "05": {
    number: "05", 
    title: "Rejuvenecimiento de la Mirada",
    subtitle: "Blefaroplastia & Lifting Facial",
    category: "Cirugía Facial",
    imageSrc: "/images/imagen5.jpg",
    catchPhrase: "Revitaliza tu expresión con procedimientos que devuelven juventud y frescura a tu mirada.",
    description: "La blefaroplastia elimina el exceso de piel y grasa en los párpados, reduciendo bolsas y flacidez para lograr una mirada más juvenil, descansada y expresiva.",
    objetivo: "Rejuvenecimiento de la región periocular, eliminación de bolsas y exceso de piel en párpados, mejora de la expresión facial.",
    specs: {
      tipo: "Ambulatoria, cirugía del día",
      lugar: "Block quirúrgico", 
      anestesia: "Local con sedación o general",
      duracion: "1-2 horas aproximadamente"
    },
    tecnica: "Incisiones ocultas en pliegues naturales de párpados superiores e inferiores. Eliminación de exceso de piel, grasa y reposicionamiento de tejidos.",
    recuperacion: "Hematomas desaparecen en 7-10 días. Uso de compresas frías primeras 48 horas. Resultado definitivo visible en 2-3 meses."
  }
}

export default function ProcedimientoDetalle() {
  const { id } = useParams()
  const location = useLocation()
  const sectionRef = useRef(null)
  const maskRef = useRef(null)
  const numberRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const categoryRef = useRef(null)
  const catchPhraseRef = useRef(null)
  const benefitsRef = useRef(null)
  const approachRef = useRef(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const isMobile = useIsMobile()
  const [navOpen, setNavOpen] = useState(false)
  const [currentId, setCurrentId] = useState(id)
  const [scrollEnabled, setScrollEnabled] = useState(false)

  const procedimiento = procedimientosData[currentId] || procedimientosData[id]

  // Prevenir scroll hasta que termine la animación inicial
  useEffect(() => {
    // Bloquear scroll al inicio
    document.body.style.overflow = 'hidden'

    // Habilitar scroll después de 2 segundos (tiempo de la animación inicial)
    const timer = setTimeout(() => {
      document.body.style.overflow = 'auto'
      setScrollEnabled(true)
    }, 2000)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = 'auto'
    }
  }, [currentId])

  // SOLUCIÓN AGRESIVA: Scroll forzado múltiple
  useEffect(() => {
    // Desactivar scroll automático del navegador
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Scroll inmediato
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Múltiples intentos de scroll
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Intentos en diferentes momentos
    scrollToTop();
    setTimeout(scrollToTop, 0);
    setTimeout(scrollToTop, 10);
    setTimeout(scrollToTop, 50);
    setTimeout(scrollToTop, 100);
    setTimeout(scrollToTop, 200);

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [currentId, location.pathname]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentId]);

  useEffect(() => {
    if (!procedimiento) return;
    
    const img = new Image()
    img.src = procedimiento.imageSrc
    img.onload = () => setImageLoaded(true)
  }, [procedimiento])

  useEffect(() => {
    if (!imageLoaded) return

    // Limpiar todos los ScrollTriggers anteriores
    ScrollTrigger.getAll().forEach(st => st.kill())

    const ctx = gsap.context(() => {
      // Animación de scroll reveal de la imagen - empieza mucho más chica
      gsap.fromTo(
        maskRef.current,
        {
          clipPath: "inset(35% 35% 35% 35%)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      )

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
      gsap.utils.toArray([benefitsRef.current, approachRef.current]).forEach((section) => {
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

    // Refresh después de crear la animación
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [imageLoaded, currentId])

  if (!procedimiento) {
    return (
      <Box sx={{ 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center" 
      }}>
        <Typography>Procedimiento no encontrado</Typography>
      </Box>
    );
  }

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
            zIndex: 4,
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
          }}>
            {/* IZQUIERDA: Número más ancho y menos bold */}
            <Box sx={{ ml: { xs: 0, md: "70px" } }}>
              <Typography
                ref={numberRef}
                variant="h1"
                sx={{
                  color: "#111",
                  fontFamily: "Poppins",
                  fontSize: { xs: "5rem", md: "8rem", lg: "12rem" },
                  fontWeight: 300,
                  lineHeight: 0.9,
                  opacity: 0.95,
                  margin: 0,
                  letterSpacing: "-0.02em"
                }}
              >
                {procedimiento.number}
              </Typography>
            </Box>

            {/* DERECHA: Título más ancho y menos bold + Catch Phrase con más espacio */}
            <Box
              sx={{
                textAlign: { xs: 'center', md: "right" },
                maxWidth: { xs: "90%", md: "55%", lg: "45%" },
                lineHeight: { xs: 1.1, md: 1.5 },
                mt: { xs: "20px", md: "0px" },
                mr: { xs: "auto", md: "70px" },
                ml: { xs: "auto", md: "auto" },
                pr: { xs: 2, md: 0 },
                pl: { xs: 2, md: 0 }
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
                  padding: "6px 14px",
                  borderRadius: "20px",
                  marginBottom: "16px"
                }}
              >
                {procedimiento.category}
              </span>

              <h2
                ref={titleRef}
                style={{
                  color: "#111",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: isMobile ? "2.5rem" : "4.5rem",
                  fontWeight: 400,
                  lineHeight: 1.1,
                  marginBottom: "16px",
                  marginTop: "0",
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
                  margin: 0,
                  padding: isMobile ? "0 10px" : "0"
                }}
              >
                {procedimiento.catchPhrase}
              </p>
            </Box>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION - Columnas 3 a 11 */}
      <section ref={benefitsRef} style={{ backgroundColor: "white", padding: isMobile ? "60px 0" : "80px 0", position: "relative", zIndex: 1 }}>
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
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
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
                gridColumn: "auto"
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

      {/* SUBPROCEDIMIENTOS - Solo para Cirugía Mamaria */}
      {procedimiento.subprocedimientos && (
        <section style={{ backgroundColor: "white", padding: isMobile ? "60px 0" : "80px 0", position: "relative", zIndex: 1 }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            columnGap: "20px",
            margin: isMobile ? "0 20px" : "0 70px",
          }}>
            <div style={{ gridColumn: isMobile ? "1 / -1" : "3 / 11" }}>
              <h2 style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: isMobile ? "2rem" : "2.625rem",
                fontWeight: 300,
                color: "#111",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "48px",
                marginTop: 0,
                textAlign: "left"
              }}>
                Tipos de Cirugía Mamaria
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
                  gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                  gap: "0.5rem",
                }}>
                  {procedimiento.subprocedimientos.map((subproc, index) => (
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
                          flexDirection: "column",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#CFCFCF"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#DCDCDC"}
                      >
                        <h3 style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                          fontWeight: 400,
                          color: "#111",
                          marginBottom: "12px",
                          marginTop: 0,
                          textAlign: "left"
                        }}>
                          {subproc.name}
                        </h3>
                        <p style={{
                          color: "#666",
                          lineHeight: 1.6,
                          fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
                          margin: 0,
                          textAlign: "left",
                          flexGrow: 1
                        }}>
                          {subproc.description}
                        </p>
                      </div>
                    </AnimatedCard>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PROCESS STEPS SECTION */}
      <section ref={approachRef} style={{ backgroundColor: "white", position: "relative", zIndex: 1 }}>
        <ProcessSteps />
      </section>

      <Footer />
    </div>
  )
}