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
        zIndex: 1,
        height: { xs: "100vh", md: "100vh" },
        display: "grid",
        backgroundColor: "transparent",
        gridTemplateColumns: "repeat(12, 1fr)",
        marginInline: { xs: "15px", md: "70px" },
        columnGap: { xs: "20px", md: "20px" },
        "& > section": {
          gridColumn: "1 / -1",
        },
        overflow: "visible"
      }}
    > 
      {/* Background Image */}
      <Box
        sx={{
          width: "150vw",
          height: "100vh",
          backgroundImage: 'url("/images/imagen5.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: -1,
          minWidth: "100vw"
        }}
      />

      {/* Título Principal */}
      <Box
        sx={{
          marginTop: { xs: '80px', md: '150px', lg: '180px', xl: '250px' }, 
          gridColumn: { xs: '1 / 13', md: '1 / 8' },
          gridRow: '1 / 1',
          display: 'flex',
          flexDirection: 'column',
          textAlign: { xs: 'center', md: 'start'},
          alignItems: 'start',
          justifyContent: 'start',
        }}
      >
        <Typography fontFamily={'Poppins'} fontSize={{ xs: '35px',md: '54px' , xl: '70px' }} sx={{ width: '100%', color: 'textSecondary', textTransform: '', letterSpacing: '-3px'}}>
          Cirugía mamaria <Typography component="span" fontFamily={'Poppins'} fontSize={{ xs: '35px',md: '54px' , xl: '70px' }} sx={{ color: 'textAccent', letterSpacing: '-3px' }}>inteligente</Typography>, 
        </Typography>

        <Typography fontFamily={'Poppins'} fontSize={{ xs: '35px',md: '54px' , xl: '70px' }} sx={{ width: '100%', color: 'textSecondary', textTransform: 'capitalize' , letterSpacing: '-3px'}}>
          conexión humana
        </Typography>
      </Box>

      {/* Contador de intervenciones */}
      <Box
        sx={{
          gridColumn: { xs: '4 / 12', md: '10 / 13' },
          gridRow: '1 / 1',
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          textAlign: { xs: 'center', md: 'end'},
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: { xs: '25px', md: 'px' }, 
        }}
      >
        
        <Typography fontFamily={'Red Hat Display'} fontSize={{ xs: '20px', md: '21px' }} sx={{ 
          width: '90%',
          color: 'textSecondary', 
          textTransform: 'capitalize',
          letterSpacing: '-1px'
        }}>
          + 400 intervenciones exitosas
        </Typography>
      </Box>

      {/* Contenedor del párrafo y botón */}
      <Box
        sx={{
          gridColumn: { xs: '1 / 13', md: '1 / 6' },
          gridRow: '1 / 1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'end',
          marginBottom: { xs: '20px', md: '5px' },
          marginRight: { xs: '20px', md: '0px' },
        }}
      >
        <Typography color="white" fontFamily={'Poppins'} fontSize={{ xs: '18px', md: '20px' }} sx={{ 
          textAlign: 'start', 
          marginBottom: { xs:'115px', md: '20px' }, 
          letterSpacing: '-1px' 
        }}>
          Cirugía Plástica Estética y Reconstructiva, especializados en brindar soluciones avanzadas.
        </Typography>

        <Box sx={{ 
          marginBottom: { xs: '20px', md: '0px' },
          '& .clip-top-button': {
            // Efecto Glass iOS Ultra Clean
            backdropFilter: 'blur(40px) saturate(200%)',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            backgroundImage: `
              linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.15) 0%,
                rgba(255, 255, 255, 0.05) 50%,
                rgba(255, 255, 255, 0.08) 100%
              )
            `,
            border: '1px solid rgba(255, 255, 255, 0.25)',
            borderRadius: '50px', // Más redondeado
            padding: { xs: '12px 28px', md: '14px 32px' },
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            position: 'relative',
            overflow: 'hidden',
            
            // Efecto de brillo sutil
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
              zIndex: 1
            },
            
            // Sombra ultra sutil
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.12),
              0 2px 8px rgba(0, 0, 0, 0.08),
              inset 0 1px 0 rgba(255, 255, 255, 0.2),
              inset 0 -1px 0 rgba(0, 0, 0, 0.05)
            `,
            
            '&:hover': {
              backdropFilter: 'blur(45px) saturate(220%)',
              backgroundColor: 'rgba(255, 255, 255, 0.18)',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              transform: 'translateY(-2px) scale(1.02)',
              boxShadow: `
                0 12px 40px rgba(0, 0, 0, 0.18),
                0 4px 20px rgba(0, 0, 0, 0.12),
                inset 0 1px 0 rgba(255, 255, 255, 0.3),
                inset 0 -1px 0 rgba(0, 0, 0, 0.1)
              `,
              
              // Efecto de brillo al hover
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
                transform: 'translate(-50%, -50%)',
                transition: 'all 0.4s ease'
              }
            },
            
            '&:active': {
              transform: 'translateY(0px) scale(0.98)',
              transition: 'all 0.1s ease'
            }
          },
          
          // Estilos para el texto dentro del botón
          '& .clip-top-button .MuiTypography-root': {
            fontFamily: 'Poppins',
            fontWeight: '500',
            letterSpacing: '-0.2px',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
          }
        }}>
          <ClipTopButton className="clip-top-button">
            Conoce Más
          </ClipTopButton>
        </Box>
      </Box>

      {/* Contenedor del video CON FADED SUTIL */}
      <Box
        sx={{
          marginTop: '71px',
          gridColumn: { xs: '7 / 13', md: '8 / 11' },
          gridRow: '1 / 1',
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'end',
          marginBottom: { xs: '100px', md: '50px' },
        }}
      >
        <Box
          ref={biasVideoRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx={{
            width: '100%',
            height: {
              xs: '12%',
              md: '25%'
            },
            // Efecto Glass iOS - Frost Subtle
            backdropFilter: 'blur(20px) saturate(180%)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '24px',
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
              backdropFilter: 'blur(25px) saturate(200%)',
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
          
          {/* Overlay con gradiente MUY SUTIL */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '30%', // Más reducido
              background: `
                linear-gradient(
                  to top, 
                  rgba(70, 70, 70, 0.25) 0%, 
                  rgba(70, 70, 70, 0.1) 40%, 
                  transparent 80%
                )
              `,
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingBottom: { xs: '6px', md: '10px' },
              borderBottomLeftRadius: '24px',
              borderBottomRightRadius: '24px',
              pointerEvents: 'none',
            }}
          >
            <Typography 
              fontFamily={'Poppins'} 
              fontSize={{ xs: '10px', md: '12px' }} 
              sx={{ 
                color: 'white',
                fontWeight: '300',
                letterSpacing: '0.7px',
                textTransform: 'uppercase',
                textAlign: 'center',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(6px)',
                padding: { xs: '3px 10px', md: '4px 14px' },
                borderRadius: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '0.5px solid rgba(255, 255, 255, 0.15)',
                pointerEvents: 'none',
              }}
            >
              Visualización 3D
            </Typography>
          </Box>
        </Box>
      </Box>      

      {/* Texto (Scroll) */}
      <Box
        sx={{
          gridColumn: { xs: '1 / 13', md: '12 / 12' },
          gridRow: '1 / 1',
          display: 'flex',
          alignItems: 'end',
          justifyContent: { xs: 'end', md: 'end' },
          marginBottom: { xs: '50px', md: '50px' },
        }}
      >
        <Typography color="#ffffff" fontFamily={'Poppins'} fontSize={'20px'}>(Scroll)</Typography>
      </Box>

    </Box>
  );
}