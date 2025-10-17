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
          marginTop: { xs: '150px', md: '200px', lg: '200px', xl: '450px' },
          gridColumn: { xs: '1 / 13', md: '1 / 8' },
          gridRow: '1 / 1',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left',
          alignItems: 'flex-start',
          justifyContent: 'start',
        }}
      >
        <Typography fontFamily={'Poppins'} fontSize={{ xs: '32px', sm: '40px', md: '54px' , xl: '70px' }} sx={{ width: '100%', color: 'textSecondary', letterSpacing: { xs: '-1.5px', md: '-3px' }, lineHeight: 1.1}}>
          Cirugía mamaria <Typography component="span" fontFamily={'Poppins'} fontSize={{ xs: '32px', sm: '40px', md: '54px' , xl: '70px' }} sx={{ color: 'textAccent', letterSpacing: { xs: '-1.5px', md: '-3px' } }}>inteligente</Typography>,
        </Typography>

        <Typography fontFamily={'Poppins'} fontSize={{ xs: '32px', sm: '40px', md: '54px' , xl: '70px' }} sx={{ width: '100%', color: 'textSecondary', textTransform: 'capitalize' , letterSpacing: { xs: '-1.5px', md: '-3px' }, lineHeight: 1.1}}>
          conexión humana
        </Typography>
      </Box>

      {/* Contador de intervenciones */}
      <Box
        sx={{
          gridColumn: { xs: '1 / 13', md: '10 / 13' },
          gridRow: '1 / 1',
          position: 'relative',
          display: 'none',
          flexDirection: 'row',
          textAlign: { xs: 'left', md: 'end'},
          alignItems: 'center',
          justifyContent: { xs: 'flex-start', md: 'center' },
          marginTop: { xs: '220px', md: '0px' },
          marginBottom: { xs: '20px', md: '0px' },
        }}
      >

        <Typography fontFamily={'Red Hat Display'} fontSize={{ xs: '16px', sm: '18px', md: '21px' }} sx={{
          width: { xs: '100%', md: '90%' },
          color: 'textSecondary',
          textTransform: 'capitalize',
          letterSpacing: '-0.5px',
          fontWeight: 500
        }}>
          + 400 intervenciones exitosas
        </Typography>
      </Box>

      {/* Contenedor del párrafo y botón */}
      <Box
        sx={{
          gridColumn: { xs: '1 / 13', md: '1 / 5' },
          gridRow: '1 / 1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: { xs: 'start', md: 'end' },
          marginTop: { xs: '400px', md: '0px' },
          marginBottom: { xs: '30px', md: '60px' },
          marginRight: { xs: '0px', md: '0px' },
        }}
      >
        <Typography color="white" fontFamily={'Poppins'} fontSize={{ xs: '14px', sm: '15px', md: '20px' }} sx={{
          textAlign: 'left',
          marginBottom: { xs:'12px', md: '20px' },
          letterSpacing: { xs: '-0.5px', md: '-1px' },
          lineHeight: 1.5,
          fontWeight: 400
        }}>
          Cirugía Plástica Estética y Reconstructiva, especializados en brindar soluciones avanzadas.
        </Typography>

        <Box sx={{
          display: 'flex',
          gap: { xs: 2, md: 2.5 },
          flexWrap: 'wrap',
          '& .clip-top-button': {
            // Efecto Glass iOS Ultra Clean
            backdropFilter: 'blur(40px) saturate(200%)',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderRadius: '8px',
            padding: { xs: '10px 24px', md: '12px 28px' },
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: 'Poppins',
            fontWeight: '500',
            fontSize: { xs: '14px', md: '15px' },
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
          },
          '& .glass-button-outline': {
            // Botón con borde
            backgroundColor: 'transparent',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '50px',
            padding: { xs: '10px 24px', md: '12px 28px' },
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: 'Poppins',
            fontWeight: '500',
            fontSize: { xs: '14px', md: '15px' },
            letterSpacing: '-0.2px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              transform: 'translateY(-2px)',
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
          marginTop: { xs: '0px', md: '71px' },
          gridColumn: { xs: '1 / 13', md: '8 / 11' },
          gridRow: '1 / 1',
          display: 'flex',
          alignItems: 'end',
          justifyContent: { xs: 'center', md: 'end' },
          marginBottom: { xs: '30px', md: '50px' },
          marginLeft: { xs: '-15px', md: '0px' },
          marginRight: { xs: '-15px', md: '0px' },
        }}
      >
        <Box
          ref={biasVideoRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx={{
            width: { xs: 'calc(100% + 30px)', md: '100%' },
            height: {
              xs: '200px',
              sm: '250px',
              md: '25%'
            },
            // Efecto Glass iOS - Frost Subtle
            backdropFilter: 'blur(30px) saturate(200%)',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: { xs: '0px', md: '24px' },
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

          {/* Visualización 3D - Inside video */}
          <Typography
            fontFamily={'Poppins'}
            fontSize={{ xs: '10px', md: '12px' }}
            sx={{
              position: 'absolute',
              bottom: { xs: '12px', md: '16px' },
              right: { xs: '12px', md: '16px' },
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
            }}
          >
            Visualización 3D
          </Typography>
        </Box>
      </Box>

      {/* Texto (Scroll) */}
      <Box
        sx={{
          gridColumn: { xs: '1 / 13', md: '12 / 13' },
          gridRow: '1 / 1',
          display: 'flex',
          alignItems: 'end',
          justifyContent: { xs: 'center', md: 'end' },
          marginBottom: { xs: '25px', md: '50px' },
        }}
      >
        <Typography color="#ffffff" fontFamily={'Poppins'} fontSize={{ xs: '16px', sm: '18px', md: '20px' }} sx={{ fontWeight: 300, letterSpacing: '0.5px' }}>
          (Scroll)
        </Typography>
      </Box>

    </Box>
  );
}