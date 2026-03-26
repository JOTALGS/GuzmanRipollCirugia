'use client';
import { Box, Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";
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

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: { xs: "100vh", md: "100vh" },
        maxHeight: { xs: "100vh", md: "100vh" },
        display: "grid",
        backgroundColor: "transparent",
        gridTemplateColumns: "repeat(12, 1fr)",
        paddingX: { xs: "15px", sm: "30px", md: "50px", lg: "70px" },
        columnGap: { xs: "15px", sm: "20px" },
        paddingTop: { xs: "160px", sm: "140px", md: "160px", lg: "180px", xl: "200px" },
        paddingBottom: { xs: "30px", md: "60px" },
        overflow: "hidden",
        "& > section": {
          gridColumn: "1 / -1",
        },
      }}
    >
      {/* Fondo interactivo de Unicorn Studio - Pantalla completa */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: "auto",
          overflow: "hidden",
          "& > div": {
            width: "100% !important",
            height: "100% !important",
          },
          "& canvas": {
            width: "100% !important",
            height: "100% !important",
            objectFit: "cover",
          }
        }}
      >
        <UnicornScene
          projectId="WPUXZwywkQSIFX5v2ghw"
          width="100%"
          height="100%"
          scale={1}
          dpi={1.5}
          sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.5/dist/unicornStudio.umd.js"
        />
      </Box>

      {/* Título Principal */}
      <Box
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

        <Box sx={{
          display: 'flex',
          gap: { xs: '12px', sm: '16px', md: '20px' },
          flexWrap: 'nowrap',
          justifyContent: { xs: 'flex-start', md: 'flex-start' },
          width: '100%',
          flexDirection: 'row',
          '& .primary-button, & .secondary-button': {
            flex: 1,
            cursor: 'pointer',
            transition: 'transform 160ms var(--ease-out), background-color 160ms var(--ease-out), box-shadow 160ms var(--ease-out)',
            '&:active': {
              transform: 'scale(0.97)',
            },
            fontFamily: 'Poppins',
            fontWeight: '400',
            fontSize: {
              xs: 'clamp(14px, 3.8vw, 15px)',
              md: 'clamp(14px, 1.8vw, 15px)'
            },
            letterSpacing: '-0.2px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: {
              xs: 'clamp(12px, 3vw, 14px) clamp(16px, 4vw, 20px)',
              md: 'clamp(10px, 1.5vw, 12px) clamp(24px, 3vw, 28px)'
            },
          },
          '& .primary-button': {
            backgroundColor: '#E9E9E9',
            border: 'none',
            borderRadius: '0px',
            color: '#000',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#d9d9d9',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }
          },
          '& .secondary-button': {
            position: 'relative',
            border: 'none',
            backgroundColor: 'transparent',
            backdropFilter: 'none',
            boxShadow: 'none',
            overflow: 'hidden',
            color: 'white',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
            },
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              transform: 'translateY(-2px)',
              boxShadow: 'none',
              '&::before, &::after': {
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)',
              }
            }
          }
        }}>
          <Box
            component="button"
            className="primary-button"
          >
            Conoce Más
          </Box>
          <Box
            component="button"
            className="secondary-button"
          >
            Ver Procedimientos
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