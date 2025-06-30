import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function CTAAboutSection() {
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
        start: "top top",
        end: isMobile() ? "bottom+=2500% top" : "bottom+=550% top",
        pin: true,
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
        height: '250vh',
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
        columnGap: { xs: '25px', md: '35px' },
        paddingInline: { xs: '15px', md: '75px' },
        marginBottom: { xs: '6vh', md: '0vh' },
      }}
    >
      <Box
        sx={{
          marginTop: '71px',
          gridColumn: '1 / 7',
          gridRow: '1 / 1',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'start',
          alignItems: 'start',
          justifyContent: 'start',
        }}
      >

        <div id="left-section" className="py-8 px-4">
          <Typography 
            component="h1"
            className="leading-tight font-bold text-white text-start space-y-2"
            sx={{
              paddingTop: "20px",
              fontFamily: "Arimo",
              fontSize: isXs ? "calc(100vw / 25)" : "calc(100vw / 32)",
              lineHeight: "1",
            }}
          >
            {["Diseñados para", "Maximizar tus", "Resutados"].map((word, i) => (
              <div key={i} style={{ fontFamily: "Poppins", fontWeight: "200" }}>
                {word}
              </div>
            ))}
          </Typography>

          {/* <p className="text-gray-900 text-sm lg:text-base leading-relaxed pt-8 pr-24">
            Somos especialistas en mecánica automotriz con más de 15 años de experiencia
            servicio de electrónica automotriz: diagnóstico electrónico, reparación de arranques y
            alternadores, carga de aire acondicionado y mantenimiento de sistemas eléctricos.
            Nuestro compromiso es ofrecer transparencia, rapidez y garantía en cada trabajo.
            Contáctenos hoy para agendar su servicio y déjenos cuidar de su vehículo con
            la misma pasión y profesionalismo que nos respalda desde nuestros inicios.
          </p> */}
        </div>
      </Box>

      <Box sx={{
        fontFamily: "Poppins",
        fontWeight: "200",
        display: "flex",
        gridColumn: { xs: '6 / 13' , md: '8 / 13' },
        gridRow: '1 / 1',
        flexDirection: "column",
        width: { xs: "auto", md: "40vw" },
        height: "fit-content",
        justifyContent: "space-between",
        alignItems: "flex-end",
        flexWrap: "wrap",
        marginTop: "110px"
      }}>

        {[
          { 
            title: "Confianza", 
            number: "1",
            image: "/images/maxi1.png", 
            subtitle: "Tu seguridad es nuestra prioridad",
            text: "Nuestra sólida trayectoria y experiencia avalan cada procedimiento, brindándote total confianza desde el primer momento."
          },
          { 
            title: "Simulación", 
            number: "2",
            image: "/images/maxi2.png", 
            subtitle: "Visualiza tu cambio antes de operar",
            text: "La tecnología Crisalix genera una simulación 3D detallada para que puedas conocer tu aspecto postoperatorio antes de la cirugía."
          },
          { 
            title: "Técnologia", 
            number: "3",
            image: "/images/maxi3.png", 
            subtitle: "Procedimientos de vanguardia adaptados a ti",
            text: "Empleamos técnicas de última generación, diseñadas a medida para garantizar resultados precisos, seguros y de apariencia natural."
          },
          { 
            title: "Recuperación", 
            number: "4",
            image: "technology-image.jpg", 
            subtitle: "Cuidado integral post cirugía",
            text: "Contarás con un plan de seguimiento personalizado y asesoría continua para una recuperación óptima y sin complicaciones."
          }
        ].map((card, index) => (
          <Box key={index} sx={{
            width: { xs: "100%", md: "80%" },
            mb: 4,
            mr: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "450px",
            alignItems: "flex-start"
          }}>
            
            <Box sx={{ display: "flex", width: "100%", flexDirection: "column"}}>

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
                  fontWeight: "100",
                }}>
                  {card.title}
                </Box>
              </Box>

              {/* Image */}
              <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <img src={card.image} style={{ width: "50%", height: "300px", objectFit: "contain" }} />
              </Box>

            </Box>

            {/* Content */}
            <Box sx={{ mt: 2, width: "75%" }}>
              <Box sx={{ 
                fontWeight: 600,
                fontSize: "1.1rem",
                lineHeight: 1.2,
                textAlign: "start",
              }}>
                {card.subtitle}
              </Box>
              <Box sx={{ 
                mt: 1,
                fontSize: "0.9rem",
                fontWeight: 300,
                lineHeight: 1.4,
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