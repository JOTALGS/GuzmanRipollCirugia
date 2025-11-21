'use client';
import { Box, Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

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
      const wOffset = isMobile? 15 : 50;

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
        paddingTop: { xs: "120px", sm: "140px", md: "160px", lg: "180px", xl: "200px" },
        paddingBottom: { xs: "30px", md: "60px" },
        overflow: "hidden",
        "& > section": {
          gridColumn: "1 / -1",
        },
      }}
    > 
      {/* BASE BACKGROUND - Deep Blue */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          backgroundColor: "#191968",
        }}
      />

      {/* VIGNETTE EFFECT - Darker edges */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          background: `
            radial-gradient(ellipse 120% 100% at 50% 50%, transparent 0%, transparent 35%, rgba(10, 13, 31, 0.3) 55%, rgba(10, 13, 31, 0.6) 75%, rgba(5, 7, 15, 0.85) 100%)
          `,
        }}
      />

      {/* SVG Circle Background - Decorative element - debe estar arriba del gradiente */}
      <Box
        sx={{
          position: "absolute",
          width: { xs: "800px", md: "3200px" },
          height: { xs: "800px", md: "1800px" },
          top: { xs: "-200px", md: "-900px" },
          left: { xs: "50%", md: "-300px" },
          transform: { xs: "translateX(-50%)", md: "none" },
          zIndex: 0,
          pointerEvents: "none",
          opacity: { xs: 0.6, md: 0.9 },
        }}
      >
        {/* Primary circle */}
        <Box
          sx={{
            position: "absolute",
            width: { xs: "100%", md: "120%" },
            height: "100%",
            borderRadius: "50%",
            border: {
              xs: "1px solid rgba(255, 255, 255, 0.3)",
              md: "1px solid rgba(255, 255, 255, 0.57)"
            },
          }}
        />
      </Box>

      {/* SMOOTH GRADIENT LAYERS - Techno Blue spots */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          background: `
            radial-gradient(circle 800px at 15% 70%, rgba(0, 129, 199, 0.65) 0%, rgba(0, 129, 199, 0.45) 15%, rgba(0, 129, 199, 0.28) 30%, rgba(0, 129, 199, 0.15) 45%, rgba(0, 129, 199, 0.06) 60%, transparent 75%),
            radial-gradient(circle 750px at 88% 25%, rgba(0, 129, 199, 0.60) 0%, rgba(0, 129, 199, 0.42) 18%, rgba(0, 129, 199, 0.26) 35%, rgba(0, 129, 199, 0.13) 50%, rgba(0, 129, 199, 0.05) 65%, transparent 80%)
          `,
        }}
      />

      {/* SUBTLE NOISE TEXTURE */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          opacity: 0.02,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

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
          marginBottom: { xs: '20px', sm: '40px', md: '50px' },
        }}
      >
        <Typography
          fontFamily={'Poppins'}
          sx={{
            fontSize: {
              xs: 'clamp(26px, 7vw, 30px)',
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
            flexWrap: 'nowrap',
            whiteSpace: 'nowrap',
            gap: { xs: '4px', sm: '5px', md: '6px', lg: '7px', xl: '8px'},
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
              whiteSpace: 'nowrap',
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
              xs: 'clamp(26px, 7vw, 30px)',
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
          conexión humana.
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
          marginTop: { xs: 'auto', md: 'auto' },
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
          Cirugía Plástica Estética y Reconstructiva, especializados en brindar soluciones avanzadas.
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
            transition: 'all 0.3s ease',
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

      {/* Contenedor del video */}
      <Box
        sx={{
          gridColumn: {
            xs: '1 / 13',
            sm: '1 / 13',
            md: '7 / 12',
            lg: '8 / 11',
            xl: '8 / 11'
          },
          zIndex: 1,
          position: 'relative',
          gridRow: { xs: '3', md: '2' },
          padding: { xs: '7px', md: '7px' },
          borderTopLeftRadius: { xs: '20px', md: '28px' },
          borderTopRightRadius: { xs: '20px', md: '28px' },
          borderBottomLeftRadius: { xs: '10px', md: '12px' },
          borderBottomRightRadius: { xs: '10px', md: '12px' },

          backdropFilter: 'blur(30px) saturate(100%)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '0.5px solid rgba(255, 255, 255, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          alignItems: { xs: 'flex-start', md: 'flex-start' },
          justifyContent: { xs: 'flex-end', md: 'flex-end' },
          marginTop: { xs: '30px', sm: 'auto', md: 'auto' },
          height: 'fit-content',
          marginBottom: { xs: '30px', sm: '0px', md: '0px' },
          marginX: { xs: 0, md: 0 },
        }}
      >
        <Box
          ref={biasVideoRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx={{
            width: '100%',
            maxWidth: { xs: '100%', md: '100%' },
            height: {
              xs: 'clamp(180px, 40vw, 220px)',
              sm: 'clamp(220px, 35vw, 280px)',
              md: 'clamp(200px, 25vh, 300px)',
              lg: 'clamp(250px, 28vh, 350px)'
            },
            aspectRatio: { md: '16/9' },
            backdropFilter: 'blur(30px) saturate(200%)',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderTopLeftRadius: { xs: '16px', sm: '20px', md: '24px' },
            borderTopRightRadius: { xs: '16px', sm: '20px', md: '24px' },
            borderBottomLeftRadius: { xs: '6px', sm: '6px', md: '6px' },
            borderBottomRightRadius: { xs: '6px', sm: '6px', md: '6px' },
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.2),
              inset 0 -1px 0 rgba(0, 0, 0, 0.1)
            `,
            transition: 'all 0.3s ease-in-out',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            '&:hover': {
              backdropFilter: 'blur(35px) saturate(220%)',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              transform: 'scale(1.02)',
              boxShadow: `
                0 12px 40px rgba(0, 0, 0, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.3),
                inset 0 -1px 0 rgba(0, 0, 0, 0.05)
              `
            }
          }}
        >
          {/* Video dentro del contenedor glass */}
          <Box
            ref={videoRef}
            component="video"
            src="/videos/despues.mp4"
            muted
            loop
            playsInline
            preload="metadata"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </Box>
        
        {/* Visualización 3D - Inside video */}
        <Typography
          fontFamily={'Poppins'}
          sx={{
            fontSize: { 
              xs: 'clamp(9px, 2.5vw, 10px)',
              md: 'clamp(10px, 1.5vw, 12px)'
            },
            position: 'relative',
            color: 'white',
            fontWeight: '300',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            textAlign: 'center',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(6px)',
            padding: { 
              xs: 'clamp(2px, 1vw, 3px) clamp(8px, 2vw, 10px)',
              md: 'clamp(3px, 0.8vw, 4px) clamp(12px, 1.5vw, 14px)'
            },
            zIndex: 100,
            borderRadius: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          Visualización 3D
        </Typography>
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