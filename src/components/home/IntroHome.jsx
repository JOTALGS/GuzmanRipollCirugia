import { Box, Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import ClipTopButton from "../buttons/clipTopButton";
import { gsap } from "gsap";

export default function IntroHome() {
  const [isPinned, setIsPinned] = useState(true);
  const biasVideoRef = useRef(null);
  const videoRef = useRef(null);
  
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
        // Use padding instead of marginInline for better control
        paddingX: { xs: "15px", sm: "30px", md: "50px", lg: "70px" },
        columnGap: { xs: "15px", sm: "20px" },
        paddingTop: { xs: "120px", sm: "140px", md: "160px", lg: "180px", xl: "200px" },
        paddingBottom: { xs: "30px", md: "60px" },
        overflow: "hidden", // Prevent horizontal scroll
        "& > section": {
          gridColumn: "1 / -1",
        },
      }}
    > 
      {/* Background Image - Fixed positioning for better scaling */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundImage: 'url("/images/imagen5.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
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
          textAlign: { xs: 'center', sm: 'center', md: 'center', lg: 'left' },
          alignItems: { xs: 'center', sm: 'center', md: 'center', lg: 'flex-start' },
          justifyContent: 'flex-start',
          marginBottom: { xs: '30px', sm: '40px', md: '50px' },
        }}
      >
        <Typography 
          fontFamily={'Poppins'} 
          sx={{ 
            fontSize: { 
              xs: 'clamp(32px, 8vw, 40px)',
              sm: 'clamp(40px, 7vw, 50px)',
              md: 'clamp(48px, 6vw, 60px)',
              lg: 'clamp(55px, 5vw, 65px)',
              xl: 'clamp(60px, 4.5vw, 70px)'
            },
            width: '100%',
            color: 'textSecondary',
            letterSpacing: { xs: '-1px', sm: '-1.5px', md: '-2px', lg: '-2.5px', xl: '-3px' },
            lineHeight: 1.1,
          }}
        >
          Cirugía mamaria{' '}
          <Typography 
            component="span" 
            fontFamily={'Poppins'} 
            sx={{ 
              fontSize: 'inherit',
              color: 'textAccent',
              letterSpacing: 'inherit',
              fontWeight: 'inherit'
            }}
          >
            inteligente
          </Typography>,
        </Typography>

        <Typography 
          fontFamily={'Poppins'} 
          sx={{ 
            fontSize: { 
              xs: 'clamp(32px, 8vw, 40px)',
              sm: 'clamp(40px, 7vw, 50px)',
              md: 'clamp(48px, 6vw, 60px)',
              lg: 'clamp(55px, 5vw, 65px)',
              xl: 'clamp(60px, 4.5vw, 70px)'
            },
            width: '100%',
            color: 'textSecondary',
            textTransform: 'capitalize',
            letterSpacing: { xs: '-1px', sm: '-1.5px', md: '-2px', lg: '-2.5px', xl: '-3px' },
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
          gridRow: { xs: '2', md: '1' },
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
          gridRow: { xs: '3', md: '2' },
          display: 'flex',
          zIndex: 1,
          flexDirection: 'column',
          alignItems: { xs: 'center', sm: 'center', md: 'flex-start' },
          justifyContent: 'flex-start',
          marginTop: { xs: '5px', md: 'auto' },
          marginBottom: { xs: '30px', md: '0px' },
        }}
      >
        <Typography 
          color="white" 
          fontFamily={'Poppins'} 
          sx={{
            fontSize: { 
              xs: 'clamp(13px, 3.5vw, 14px)',
              sm: 'clamp(14px, 3vw, 15px)',
              md: 'clamp(16px, 2vw, 18px)',
              lg: 'clamp(18px, 1.8vw, 20px)'
            },
            textAlign: { xs: 'center', sm: 'center', md: 'left' },
            marginBottom: { xs: '16px', sm: '18px', md: '20px' },
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
          flexWrap: 'wrap',
          justifyContent: { xs: 'center', sm: 'center', md: 'flex-start' },
          width: { xs: '150%', md: '100%'},
          '& .clip-top-button': {
            backdropFilter: 'blur(40px) saturate(200%)',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderRadius: '8px',
            padding: { 
              xs: 'clamp(8px, 2vw, 10px) clamp(20px, 5vw, 24px)',
              md: 'clamp(10px, 1.5vw, 12px) clamp(24px, 3vw, 28px)'
            },
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: 'Poppins',
            fontWeight: '500',
            fontSize: { 
              xs: 'clamp(13px, 3.5vw, 14px)',
              md: 'clamp(14px, 1.8vw, 15px)'
            },
            letterSpacing: '-0.2px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.2),
              inset 0 -1px 0 rgba(0, 0, 0, 0.1)
            `,
            '&:hover': {
              backdropFilter: 'blur(45px) saturate(220%)',
              backgroundColor: 'rgba(255, 255, 255, 0.18)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              transform: 'translateY(-2px)',
              boxShadow: `
                0 12px 40px rgba(0, 0, 0, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.3),
                inset 0 -1px 0 rgba(0, 0, 0, 0.05)
              `
            }
          }
        }}>
          <ClipTopButton className="clip-top-button">
            Conoce Más
          </ClipTopButton>
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
          gridRow: { xs: '2', md: '2' },
          padding: { xs: '0px', md: '7px' },
          borderTopLeftRadius: { xs: '20px', md: '24px' },
          borderTopRightRadius: { xs: '20px', md: '24px' },
          borderBottomLeftRadius: { xs: '20px', md: '12px' },
          borderBottomRightRadius: { xs: '20px', md: '12px' },

          backdropFilter: 'blur(30px) saturate(100%)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '0.5px solid rgba(255, 255, 255, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          alignItems: { xs: 'center', md: 'flex-start' },
          justifyContent: { xs: 'center', md: 'flex-end' },
          marginTop: { xs: '20%', md: '150px' },
          marginBottom: { xs: '20px', sm: '30px', md: '0px' },
          // Remove negative margins that cause overflow
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
            borderRadius: { xs: '16px', sm: '20px', md: '24px' },
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
          alignItems: { xs: 'center', md: 'flex-end' },
          justifyContent: { xs: 'center', md: 'flex-end' },
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