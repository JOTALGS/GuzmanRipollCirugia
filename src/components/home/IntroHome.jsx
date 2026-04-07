'use client';
import { Box, Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { gsap } from "gsap";

import UnicornScene from "unicornstudio-react";

export default function IntroHome() {
  const [isPinned, setIsPinned] = useState(true);
  const biasVideoRef = useRef(null);
  const videoRef = useRef(null);
  const inteligenteBoxRef = useRef(null);
  const inteligenteTextRef = useRef(null);
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    if (biasVideoRef.current) {
      gsap.fromTo(
        biasVideoRef.current,
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.3
        }
      );
    }
  }, []);

  // Animation for the inteligente box
  useEffect(() => {
    if (inteligenteBoxRef.current && inteligenteTextRef.current) {
      const box = inteligenteBoxRef.current;
      const text = inteligenteTextRef.current;

      // Get the final dimensions from the text
      const wOffset = isMobile ? 15 : 50;

      const finalHeight = text.offsetHeight + 15;
      const finalWidth = text.offsetWidth + wOffset; // Adding padding (8px on each side)

      // Reset to initial state
      gsap.set(box, {
        width: 0,
        height: 0,
        opacity: 1
      });

      // Create the animation timeline
      const tl = gsap.timeline({ delay: 0.5 });

      // First: grow height from 0 to text height with 1px width
      tl.to(box, {
        width: 1,
        height: finalHeight,
        duration: 0.4,
        ease: "power2.out"
      })
        // Then: grow width from 1px to full text width
        .to(box, {
          width: finalWidth,
          duration: 0.6,
          ease: "power2.out"
        });
    }
  }, []);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    // Initial state set in CSS for smoothness
    gsap.fromTo(".intro-animate",
      {
        opacity: 0,
        y: 20,
        filter: "blur(20px)"
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.4 // Small delay for browser readiness
      }
    );
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: { xs: "100dvh", md: "100vh" },
        maxHeight: { xs: "100dvh", md: "100vh" },
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        paddingX: { xs: "15px", sm: "30px", md: "50px", lg: "70px" },
        columnGap: { xs: "15px", sm: "20px" },
        paddingTop: { xs: "160px", sm: "140px", md: "160px", lg: "180px", xl: "200px" },
        paddingBottom: { xs: "30px", md: "60px" },
        overflow: "hidden",
        "& > section": {
          gridColumn: "1 / -1",
        },
        "& .intro-animate": {
          opacity: 0,
        }
      }}
    >
      {/* Reconstrucción Atmosférica Cromática de Marca "Seamless" (Centro Techno / Exterior Deep) */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          overflow: "hidden",
          backgroundColor: "#060618",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            background: `
              /* 3. Bruma del horizonte expansiva */
              radial-gradient(ellipse at 50% 120%, rgba(0, 129, 199, 0.22) 0%, transparent 80%),
              
              /* 2. Núcleo central ultra-progresivo (Techno Blue) */
              radial-gradient(ellipse at 50% 60%, rgba(0, 129, 199, 0.3) 0%, rgba(25, 25, 104, 0.1) 45%, transparent 100%),
              
              /* 1. Degradado base multi-stop refinado para fusión perfecta */
              linear-gradient(to bottom, 
                #060618 0%, 
                #080820 15%,
                #0B0B2E 30%, 
                #111149 50%, 
                #152C70 70%,
                #0E4F98 85%, 
                #0081C7 100%
              )
            `,
            filter: "blur(60px)", /* Fusión extrema para derretir las líneas de color */
            animation: "hazeBreath 24s ease-in-out infinite",
            zIndex: 0,
          },
          /* Capa de Refinamiento: Ultra Clear Grain y Difusión Radial Continua */
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            background: `
              /* Viñeta radial expandida para mayor suavidad */
              radial-gradient(circle at 50% 50%, transparent 0%, rgba(25, 25, 104, 0.05) 50%, rgba(6, 6, 24, 0.9) 100%),
              /* Micro-textura de ruido ultra fino anti-banding */
              url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.8'/%3E%3C/svg%3E")
            `,
            opacity: 0.08,
            mixBlendMode: "overlay",
            zIndex: 1,
            pointerEvents: "none"
          },
          /* Shaper de profundidad sin costuras */
          "& .brand-shaper": {
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "radial-gradient(circle at 50% 50%, transparent 20%, rgba(6, 6, 24, 0.1) 70%, rgba(6, 6, 24, 0.8) 100%)",
            boxShadow: "inset 0 0 200px rgba(6, 6, 24, 0.8)",
            zIndex: 2,
            pointerEvents: "none"
          },
          "@keyframes hazeBreath": {
            "0%, 100%": {
              transform: "scale(1.15) translateY(0px)", /* Extra scale para ocultar bordes del blur */
              opacity: 0.95
            },
            "50%": {
              transform: "scale(1.18) translateY(-4px)",
              opacity: 1
            }
          }
        }}
      >
        <Box className="brand-shaper" />
      </Box>

      {/* Título Principal */}
      <Box
        className="intro-animate"
        sx={{
          gridColumn: {
            xs: '1 / 13',
            sm: '1 / 13',
            md: '1 / 13',
            lg: '1 / 10',
            xl: '1 / 8'
          },
          backgroundColor: "transparent",
          gridRow: '1',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          textAlign: { xs: 'left', sm: 'left', md: 'left', lg: 'left' },
          alignItems: { xs: 'flex-start', sm: 'flex-start', md: 'flex-start', lg: 'flex-start' },
          justifyContent: 'flex-start',
          marginBottom: { xs: '10px', sm: '40px', md: '50px' },
        }}
      >
        <Typography
          fontFamily={'Poppins'}
          sx={{
            fontSize: {
              xs: 'clamp(38px, 10vw, 44px)',
              sm: 'clamp(40px, 7vw, 50px)',
              md: 'clamp(48px, 6vw, 60px)',
              lg: 'clamp(55px, 5vw, 65px)',
              xl: 'clamp(60px, 4.5vw, 70px)'
            },
            width: '100%',
            color: 'textSecondary',
            letterSpacing: { xs: '-1.5px', sm: '-1.5px', md: '-2px', lg: '-2.5px', xl: '-3px' },
            lineHeight: 1.1,
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap', // FIXED: Allow wrapping to prevent overflow
            whiteSpace: 'normal', // FIXED: Prevent clipping on right
            gap: { xs: '4px', sm: '5px', md: '6px', lg: '7px', xl: '8px' },
          }}
        >
          Cirugía mamaria{' '}
          <Typography
            ref={inteligenteTextRef}
            component="span"
            fontFamily={'Poppins'}
            sx={{
              fontSize: 'inherit',
              color: 'textAccent',
              letterSpacing: 'inherit',
              fontWeight: 'semibold',
              lineHeight: 1.2,
              whiteSpace: 'normal', // FIXED: Allow wrapping
            }}
          >
            inteligente
          </Typography>
          <Typography
            component="span"
            sx={{
              fontSize: 'inherit',
              color: 'textAccent',
              letterSpacing: 'inherit',
              fontWeight: 'inherit'
            }}
          >
            ,
          </Typography>
        </Typography>

        <Typography
          fontFamily={'Poppins'}
          sx={{
            fontSize: {
              xs: 'clamp(38px, 10vw, 44px)',
              sm: 'clamp(40px, 7vw, 50px)',
              md: 'clamp(48px, 6vw, 60px)',
              lg: 'clamp(55px, 5vw, 65px)',
              xl: 'clamp(60px, 4.5vw, 70px)'
            },
            width: '100%',
            color: 'textSecondary',
            letterSpacing: { xs: '-1.5px', sm: '-1.5px', md: '-2px', lg: '-2.5px', xl: '-3px' },
            lineHeight: 1.1,
          }}
        >
          conexión humana
        </Typography>
      </Box>

      {/* Contador de intervenciones */}
      <Box
        sx={{
          gridColumn: { xs: '1 / 13', md: '10 / 13' },
          gridRow: { xs: '4', md: '1' },
          display: 'none',
          flexDirection: 'row',
          textAlign: { xs: 'left', md: 'right' },
          alignItems: 'center',
          zIndex: 1,
          justifyContent: { xs: 'flex-start', md: 'flex-end' },
          marginBottom: { xs: '20px', md: '0' },
        }}
      >
        <Typography
          fontFamily={'Red Hat Display'}
          sx={{
            fontSize: {
              xs: 'clamp(14px, 4vw, 16px)',
              sm: 'clamp(16px, 3.5vw, 18px)',
              md: 'clamp(18px, 2vw, 21px)'
            },
            width: '100%',
            color: 'textSecondary',
            textTransform: 'capitalize',
            letterSpacing: '-0.5px',
            fontWeight: 500
          }}
        >
          + 400 intervenciones exitosas
        </Typography>
      </Box>

      {/* Contenedor del párrafo y botón */}
      <Box
        sx={{
          gridColumn: {
            xs: '1 / 13',
            sm: '1 / 13',
            md: '1 / 6',
            lg: '1 / 5'
          },
          gridRow: { xs: '2', md: '2' },
          display: 'flex',
          zIndex: 1,
          flexDirection: 'column',
          alignItems: { xs: 'flex-start', sm: 'flex-start', md: 'flex-start' },
          justifyContent: 'flex-start',
          marginTop: { xs: '-30px', md: 'auto' },
          marginBottom: { xs: '0px', md: '0px' },
        }}
      >
        <Typography
          className="intro-animate"
          color="#E9E9E9"
          fontFamily={'Poppins'}
          sx={{
            fontSize: {
              xs: 'clamp(13px, 3.5vw, 14px)',
              sm: 'clamp(14px, 3vw, 15px)',
              md: 'clamp(16px, 2vw, 18px)',
              lg: 'clamp(18px, 1.8vw, 20px)'
            },
            textAlign: { xs: 'left', sm: 'left', md: 'left' },
            marginBottom: { xs: '20px', sm: '18px', md: '20px' },
            letterSpacing: { xs: '-0.3px', md: '-0.5px', lg: '-0.8px' },
            lineHeight: 1.5,
            fontWeight: 400,
            maxWidth: { xs: '100%', md: '90%' }
          }}
        >
          Cirugía Plástica Estética y Reconstructiva, especializados en brindar soluciones avanzadas
        </Typography>

        <Box
          className="intro-animate"
          sx={{
            display: 'flex',
            gap: { xs: '10px', sm: '12px', md: '14px' },
            flexWrap: 'nowrap',
            justifyContent: { xs: 'flex-start', md: 'flex-end' },
            width: { xs: '100%', md: '340px' },
            flexDirection: 'row',
            '& .primary-button, & .secondary-button': {
              flex: '1 1 0',
              width: '100%',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '42px',
              padding: '0 20px',
              whiteSpace: 'nowrap',
              borderRadius: '100px',
              textDecoration: 'none',
              boxSizing: 'border-box',
              '&:active': {
                transform: 'scale(0.97)',
              }
            },
            '& .primary-button': {
              background: '#FFFFFF',
              border: '1px solid #FFFFFF',
              color: '#000000',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1.5px 0 rgba(255, 255, 255, 0.4)',
              '&:hover': {
                background: '#F8F8F8',
                transform: 'translateY(-3px) scale(1.02)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2), inset 0 1.5px 0 rgba(255, 255, 255, 0.4)'
              }
            },
            '& .secondary-button': {
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                transform: 'translateY(-3px) scale(1.02)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1.5px 0 rgba(255, 255, 255, 0.2)'
              }
            }
          }}>
          <Box
            component={RouterLink}
            to="/clinica"
            className="primary-button"
          >
            Conoce mas
          </Box>
          <Box
            component={RouterLink}
            to="/procedimientos"
            className="secondary-button"
          >
            Ver procedimientos
          </Box>
        </Box>
      </Box>

      {/* Texto (Scroll) */}
      <Box
        sx={{
          gridColumn: { xs: '1 / 13', md: '12 / 13' },
          gridRow: { xs: '4', md: '2' },
          display: 'flex',
          zIndex: 1,
          alignItems: { xs: 'flex-end', md: 'flex-end' },
          justifyContent: { xs: 'flex-end', md: 'flex-end' },
          marginTop: { xs: '-15%', md: '0px' },
        }}
      >
        <Typography
          color="#ffffff"
          fontFamily={'Poppins'}
          sx={{
            fontSize: {
              xs: 'clamp(14px, 4vw, 16px)',
              sm: 'clamp(16px, 3.5vw, 18px)',
              md: 'clamp(18px, 2vw, 20px)'
            },
            fontWeight: 300,
            letterSpacing: '0.5px'
          }}
        >
          (Scroll)
        </Typography>
      </Box>

    </Box>
  );
}
