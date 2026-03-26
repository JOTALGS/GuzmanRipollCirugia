import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import LinearGradButton from "../buttons/LinearGradButton";
import ClipTopButton from "../buttons/clipTopButton";
import ClipBottomButton from "../buttons/clipBottomButton";

gsap.registerPlugin(ScrollTrigger)

export default function CTAhome() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const leftSection = document.getElementById("left-section");
    if (!leftSection) return;

    // Mobile detection function
    const isMobile = () => window.innerWidth <= 768;
    
    let scrollTriggerInstance;

    const createScrollTrigger = () => {
      // Clear existing instance if any
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: leftSection,
        start: "top 7%",
        end: isMobile() ? "bottom+=5000% top" : "bottom+=200% top",  // Extendido para llegar hasta recuperación
        pin: isMobile() ? false : true,
        pinSpacing: false,
        scrub: true,
        markers: false,
        anticipatePin: 1
      });
    };

    // Initial setup
    createScrollTrigger();

    // Handle window resize
    const handleResize = () => {
      createScrollTrigger();
    };
    
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  
  return (
    <Box
      sx={{
        height: { xs: 'auto', md: '260vh' },  // Reducido de 280vh
        overflowY: 'scroll',
        overflowX: 'hidden',
        // Hide scrollbar - Webkit (Brave, Chrome, Safari)
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        // Hide scrollbar - Firefox
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE & Edge (legacy)
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        flexDirection: { xs: 'column', md: 'row' },
        columnGap: { xs: '16px', md: '20px' },
        paddingInline: { xs: '20px', md: '70px' },
        marginBottom: { xs: '6vh', md: '4vh' },  // Reducido el espacio
      }}
    >
      {/* SECCIÓN IZQUIERDA - TEXTO PRINCIPAL */}
      <Box
        sx={{
          marginTop: '100px',
          gridColumn: { xs: '1 / 13', md: '1 / 7'},
          gridRow: '1 / 1',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'start',
          alignItems: 'start',
          justifyContent: 'start',
        }}
      >
        {/* Numeración de sección */}
        <Box sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'baseline',
          gap: '10px',
          mb: 2,
        }}>
          <Typography component="span" sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "16px", md: "18px" },
            fontWeight: 600,
            color: "rgba(0, 0, 0, 0.44)",
            lineHeight: 1
          }}>
            03
          </Typography>
          <Typography sx={{
            fontFamily: "Poppins",
            fontSize: { xs: "16px", md: "18px" },
            fontWeight: 500,
            textTransform: "uppercase",
            color: "#000000",
            letterSpacing: "0.03em",
            lineHeight: 1
          }}>
            Resultados
          </Typography>
        </Box>
        
        <div id="left-section">
          {/* CONTENEDOR PRINCIPAL DEL TÍTULO */}
          <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: { xs: 4, md: 0 }
          }}>
            {/* Título adaptable */}
            <Typography
              sx={{
                fontFamily: 'Poppins',
                fontSize: { xs: '44px', md: '48px', xl: '70px' },
                fontWeight: 400,
                color: 'background',
                lineHeight: '1.1',
                letterSpacing: { xs: '-1.5px', md: '-3px' },
                textAlign: 'left',
              }}
            >
              Diseñados para 
              <Box component="span" sx={{ display: 'block' }}>
                <Typography 
                  component="span" 
                  fontFamily={'Poppins'} 
                  fontSize="inherit" 
                  sx={{ color: 'textAccent', letterSpacing: 'inherit' }}
                >
                  Maximizar
                </Typography>
                {' '}Tus 
                <Box component="span" sx={{ display: 'block', textTransform: 'capitalize' }}>
                  Resultados
                </Box>
              </Box>
            </Typography>
          </Box>

          {/* TEXTO DESCRIPTIVO */}
          <Typography 
            fontFamily={'Poppins'} 
            fontSize={{ xs: '14px', md: '16px', xl: '16px' }} 
            component="p" 
            sx={{ 
              width: '80%', 
              marginTop: '30px',
              lineHeight: '1.2', // EDITAR AQUÍ - Line height texto descriptivo
            }}
          >
            Tratamientos avanzados para procesos de recuperación más rápidos.
          </Typography>

          {/* BOTÓN */}
          <Box component="a" href="/contacto" sx={{ textDecoration: 'none' }} >
            <Box sx={{ marginTop: '20px' }}>
              <ClipBottomButton>Agendate</ClipBottomButton>
            </Box>
          </Box>
        </div>
      </Box>

      {/* SECCIÓN DERECHA - CARDS */}
      <Box sx={{
        fontFamily: "Poppins",
        fontWeight: "200",
        display: "flex",
        gridColumn: { xs: '1 / 13' , md: '8 / 13' },
        gridRow: { xs: '2 / 3', md: '1 / 1'},
        flexDirection: "column",
        height: "fit-content",
        justifyContent: "space-between",
        alignItems: "flex-end",
        flexWrap: "wrap",
        marginTop: { xs: '-40px' , md: '100px' }
      }}>

        {[
          {
            title: "Confianza",
            number: "1",
            image: "/images/maxi1.png",
            subtitle: "Tu seguridad es nuestra prioridad",
            text: "Nuestra sólida trayectoria y experiencia avalan cada procedimiento. Trabajamos con los más altos estándares de seguridad, brindándote total confianza desde la primera consulta."
          },
          {
            title: "Simulación",
            number: "2",
            image: "/images/maxi2.png",
            subtitle: "Visualiza tu cambio antes de operar",
            text: "La tecnología Crisalix genera una simulación 3D detallada de tu procedimiento. Visualiza tu aspecto postoperatorio antes de tomar cualquier decisión."
          },
          {
            title: "Técnologia",
            number: "3",
            image: "/images/maxi3.png",
            subtitle: "Procedimientos de vanguardia",
            text: "Empleamos técnicas de última generación diseñadas a medida para cada paciente. Nuestro enfoque combina precisión técnica con criterio estético para resultados naturales."
          },
          {
            title: "Recuperación",
            number: "4",
            image: "/images/recuperacion.png",
            subtitle: "Cuidado integral post cirugía",
            text: "Contarás con un plan de seguimiento personalizado y asesoría continua. Nuestro equipo te acompaña en cada etapa para una recuperación óptima."
          }
        ].map((card, index) => (
          <Box key={index} sx={{
            width: { xs: "100%", md: "100%" },
            mb: card.title === "Recuperación" ? 8 : 4,  // Más margen inferior para Recuperación
            mr: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: card.title === "Recuperación" ? "550px" : "450px",  // Aumentado a 550px
            alignItems: "flex-start"
          }}>
            
            <Box sx={{ display: "flex", width: "100%", flexDirection: "column"}}>

              {/* HEADER DE CARD CON NÚMERO */}
              <Box sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                borderTop: "1px solid #A3A3A3",
                pt: 2,
                position: "relative"
              }}>
                <Box sx={{
                  bgcolor: "black",
                  borderRadius: "50%",
                  width: 30,
                  height: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  top: 15,
                  left: 0
                }}>
                  <Box sx={{ color: "white", fontWeight: 700 }}>
                    {card.number}
                  </Box>
                </Box>
                <Box sx={{ 
                  ml: 4,
                  marginLeft: "40px",
                  fontSize: "1.2rem",
                  fontWeight: "200",
                  lineHeight: '1.7', // EDITAR AQUÍ - Line height título de card
                }}>
                  {card.title}
                </Box>
              </Box>

              {/* IMAGEN */}
              <Box sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                mt: 3,
                mb: card.title === "Recuperación" ? 2 : 4,  // Menos margen inferior para recuperación
                height: card.title === "Recuperación" ? "320px" : "auto"  // Altura fija para recuperación
              }}>
                <img src={card.image} style={{
                  width: card.title === "Recuperación" ? "60%" : "50%",  // Reducido un poco el ancho
                  height: card.title === "Recuperación" ? "100%" : "300px",
                  objectFit: card.title === "Recuperación" ? "contain" : "contain"
                }} />
              </Box>

            </Box>

            {/* CONTENIDO DE CARD */}
            <Box sx={{ mt: 4, width: { xs: "100%", md: "80%" } }}>
              <Box sx={{
                fontWeight: 600,
                fontSize: { xs: '18px', md: '18px', xl: '18px' },
                lineHeight: '1.1', // EDITAR AQUÍ - Line height subtítulo
                textAlign: "start",
              }}>
                {card.subtitle}
              </Box>
              <Box sx={{
                mt: 1,
                fontSize: "0.9rem",
                fontWeight: 500,
                lineHeight: '1.5', // EDITAR AQUÍ - Line height texto de card
                textAlign: "start",
              }}>
                {card.text}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

    </Box>
  );
}