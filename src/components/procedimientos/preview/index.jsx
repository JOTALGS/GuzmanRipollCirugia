import React, { useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardMedia,
  Link,
  Divider,
  Stack,
  Chip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/material/styles';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const LogoBox = styled(Box)(({ theme }) => ({
  width: 32,
  height: 32,
  backgroundColor: theme.palette.primary.main,
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const InnerLogoBox = styled(Box)({
  width: 16,
  height: 16,
  backgroundColor: 'white',
  borderRadius: 2,
});

const NavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  fontSize: '0.875rem',
  transition: 'color 0.3s',
  '&:hover': {
    color: theme.palette.text.primary,
  },
}));

const ProcedureNumber = styled(Typography)({
  fontSize: '3.75rem',
  fontWeight: 300,
  lineHeight: 1,
  width: 80,
});

const MoreButton = styled(Button)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.disabled,
  padding: 0,
  minWidth: 'auto',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.text.secondary,
  },
}));

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // GSAP Animations
  useEffect(() => {
    if (!isMobile) {
      procedures.forEach((_, index) => {
        gsap.fromTo(
          `.procedure-item-${index}`,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: `.procedure-item-${index}`,
              start: 'top 85%',
              end: 'top 60%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  const procedures = [
    {
      number: "01",
      name: "Aumento Mamario",
      image: "/images/imagen3.jpg",
      title: "Cirugía de Aumento Mamario",
      specialties: [
        "Implantes mamarios",
        "Pexia mamaria",
        "Reducción mamaria",
        "Ginecomastia",
        "Reconstrucción mamaria",
        "Asimetrías mamarias"
      ]
    },
    {
      number: "02",
      name: "Lipoescultura VASER",
      image: "/images/imagen3.jpg",
      title: "Tecnología VASER & BodyTite",
      specialties: [
        "VASER Hi-Def",
        "BodyTite RFAL",
        "Morpheus8",
        "Contorno corporal",
        "Definición muscular",
        "Tensado de piel"
      ]
    },
    {
      number: "03",
      name: "Rinoplastia",
      image: "/images/imagen3.jpg",
      title: "Cirugía Estética Nasal",
      specialties: [
        "Rinoplastia estética",
        "Rinoplastia funcional",
        "Rinoseptoplastia",
        "Rinoplastia secundaria",
        "Cirugía de tabique",
        "Refinamiento nasal"
      ]
    },
    {
      number: "04",
      name: "Abdominoplastia",
      image: "/images/imagen3.jpg",
      title: "Remodelación Abdominal Completa",
      specialties: [
        "Abdominoplastia completa",
        "Mini abdominoplastia",
        "Lipoabdominoplastia",
        "Plicatura muscular",
        "Post-embarazo",
        "Post-bariátrica"
      ]
    },
    {
      number: "05",
      name: "Blefaroplastia",
      image: "/images/imagen3.jpg",
      title: "Rejuvenecimiento de la Mirada",
      specialties: [
        "Blefaroplastia superior",
        "Blefaroplastia inferior",
        "Cirugía de párpados",
        "Bolsas palpebrales",
        "Lifting de cejas",
        "Rejuvenecimiento ocular"
      ]
    },
  ];


  // Desktop Layout (original)
  if (!isMobile) {
    return (
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          height: { xs: "100vh", md: "300vh" },
          display: "grid",
          marginBottom: { xs: '80px', md: '100px', lg: '100px', xl: '150px' },
          backgroundColor: "#fff",
          gridTemplateColumns: "repeat(12, 1fr)",
          marginInline: { xs: "15px", md: "70px" },
          columnGap: { xs: "25px", md: "17px" },
          "& > section": {
            gridColumn: "1 / -1",
          },
          '::before': {
            content: '""',
            position: 'absolute',
            top: { xs: '60px', md: '80px' },
            left: '-70px',
            right: '0',
            width: 'calc(100vw + 70px)',
            height: '1px',
            backgroundColor: '#D0D0D0',
            zIndex: -1,
          }
        }}
      >
        <Box
          sx={{
            marginTop: { xs: '80px', md: '100px', lg: '100px', xl: '100px' },
            gridColumn: { xs: '1 / 13', md: '1 / 8' },
            gridRow: '1 / 1',
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
            alignItems: 'flex-start',
            justifyContent: 'start',
          }}
        >
          <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mb: 3, color: 'textPrumary' }}>
            SERVICIOS
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              lineHeight: 1.7,
              textAlign: 'left'
            }}
          >
            Como expertos en cirugía mamaria, ofrecemos tratamientos personalizados que combinan precisión tecnológica
            con un cuidado humano excepcional.
          </Typography>
        </Box>

        {procedures.map((procedure, index) => (
          <Box
            key={`number-${index}`}
            sx={{
              marginTop: { xs: '40px', md: '60px' },
              gridColumn: { xs: '1 / 3', md: '1 / 1' },
              maxHeight: { xs: '100px', sm: '350px' },
              gridRow: `${index + 2} / ${index + 2}`,
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left',
              alignItems: 'flex-start',
              justifyContent: 'start',
              paddingTop: '20px',
              position: 'relative',
              ':before': index > 0 ? {
                content: '""',
                position: 'absolute',
                top: '-30px',
                left: '-70px',
                right: '0',
                width: 'calc(100vw + 70px)',
                height: '1px',
                backgroundColor: '#D0D0D0',
                zIndex: 0,
              } : {},
            }}
          >
            <ProcedureNumber variant="h2" sx={{ fontSize: { xs: '30px', md: '60px' } }} color="text.primary">
              {procedure.number}
            </ProcedureNumber>
          </Box>
        ))}

        {procedures.map((procedure, index) => (
          <Box
            key={`name-${index}`}
            sx={{
              marginTop: { xs: '40px', md: '60px' },
              gridColumn: { xs: '3 / 6', md: '5 / 7' },
              maxHeight: { xs: '300px', sm: '350px' },
              gridRow: `${index + 2} / ${index + 2}`,
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left',
              alignItems: 'flex-start',
              justifyContent: 'start',
              paddingTop: '20px',
            }}
          >
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: { xs: '15px', md: '1.125rem'}, textAlign: 'left' }}>
              {procedure.name}
            </Typography>
          </Box>
        ))}

        {procedures.map((procedure, index) => (
          <Box
            key={`content-${index}`}
            className={`procedure-item-${index}`}
            sx={{
              marginTop: { xs: '40px', md: '60px' },
              gridColumn: { xs: '5 / 13', md: '7 / 13' },
              gridRow: `${index + 2} / ${index + 2}`,
              display: 'flex',
              flexDirection: 'row',
              textAlign: 'left',
              alignItems: 'stretch',
              justifyContent: 'start',
              gap: '20px',
              position: 'relative',
              paddingBottom: { xs: '30px', md: '60px' },
            }}
          >
            {/* Image outside container */}
            <Box
              component="img"
              src={procedure.image || "/placeholder.svg"}
              alt={procedure.name}
              sx={{
                width: { xs: '100%', sm: '40%' },
                height: { xs: '200px', sm: 'auto' },
                objectFit: 'cover',
                borderRadius: { xs: "8px", md: "10px" }
              }}
            />

            {/* Outer Container - Light Gray */}
            <Box sx={{
              p: { xs: "4px", md: "5px" },
              backgroundColor: "#F5F5F5",
              borderRadius: { xs: "12px", md: "14px" },
              flex: 1,
              position: 'relative',
              border: index === 0 ? '1px solid rgba(0, 0, 0, 0.08)' : 'none',
              overflow: 'visible',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {/* "Más Popular" Flag - Only for first procedure (01) */}
              {index === 0 && (
                <Box sx={{
                  position: 'absolute',
                  top: '-12px',
                  right: '16px',
                  backgroundColor: '#000',
                  color: '#fff',
                  padding: { xs: '6px 14px', md: '7px 16px' },
                  borderRadius: '6px',
                  zIndex: 100,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                }}>
                  <Typography
                    sx={{
                      fontSize: { xs: '10px', md: '11px' },
                      fontWeight: 700,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      fontFamily: 'Poppins',
                      lineHeight: 1,
                    }}
                  >
                    Más Popular
                  </Typography>
                </Box>
              )}

              {/* Inner Card - Darker Gray */}
              <Box sx={{
                p: { xs: "16px", md: "20px" },
                backgroundColor: "#E9E9E9",
                borderRadius: { xs: "8px", md: "10px" },
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontSize: { xs: '20px', md: '24px' }, fontWeight: 500, mb: 2, color: 'textPrimary', fontFamily: 'Poppins', textAlign: 'left' }}
                >
                  {procedure.title}
                </Typography>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', mb: 3, flexGrow: 1 }}>
                  {procedure.specialties.map((specialty, idx) => (
                    <Typography
                      key={idx}
                      variant="caption"
                      sx={{ color: 'text.disabled', display: 'block', fontSize: '13px', textAlign: 'left' }}
                    >
                      {specialty}
                    </Typography>
                  ))}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%', mt: 'auto' }}>
                  <MoreButton
                    component={RouterLink}
                    to={`/procedimiento/${procedure.number}`}
                    sx={{
                      backgroundColor: 'transparent',
                      color: '#000',
                      borderRadius: { xs: "6px", md: "8px" },
                      textTransform: 'none',
                      py: { xs: 0.8, md: 1 },
                      px: 0,
                      fontSize: { xs: "13px", md: "14px" },
                      fontWeight: 500,
                      textDecoration: 'underline',
                      textUnderlineOffset: '3px',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        opacity: 0.7,
                      },
                    }}
                  >
                    Ver Más →
                  </MoreButton>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  // Mobile Layout (new responsive design)
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 1,
        backgroundColor: "#fff",
        paddingX: { xs: "20px", sm: "30px" },
        paddingBottom: { xs: '40px', sm: '60px' },
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          marginTop: { xs: '80px', sm: '100px' },
          marginBottom: { xs: '40px', sm: '60px' },
          textAlign: 'left',
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            color: 'textPrimary',
            fontSize: { xs: '1.5rem', sm: '1.75rem' },
            textAlign: 'left'
          }}
        >
          SERVICIOS
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.7,
            fontSize: { xs: '0.95rem', sm: '1rem' },
            maxWidth: { sm: '600px' },
            textAlign: 'left'
          }}
        >
          Como expertos en cirugía mamaria, ofrecemos tratamientos personalizados que combinan precisión tecnológica
          con un cuidado humano excepcional.
        </Typography>
      </Box>

      {/* Procedures List - Mobile */}
      <Stack spacing={{ xs: 4, sm: 6 }}>
        {procedures.map((procedure, index) => (
          <Box
            key={index}
            sx={{
              borderBottom: index < procedures.length - 1 ? '2px dotted' : 'none',
              borderColor: '#BDBDBD',
              paddingBottom: { xs: 4, sm: 6 },
              position: 'relative',
            }}
          >
            {/* Number and Name Row */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 3,
                position: 'relative',
                '::before': index > 0 ? {
                  content: '""',
                  position: 'absolute',
                  top: { xs: '-20px', sm: '-16px' },
                  left: 0,
                  right: 0,
                  height: '1px',
                  backgroundImage: 'repeating-linear-gradient(to right, #D0D0D0 0, #D0D0D0 6px, transparent 6px, transparent 12px)',
                } : {}
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.5rem', sm: '3rem' },
                  fontWeight: { xs: 700, sm: 300 },
                  lineHeight: 1,
                  color: 'text.primary'
                }}
              >
                {procedure.number}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '1.25rem', sm: '1.25rem' },
                  fontWeight: { xs: 600, sm: 400 },
                  flex: 1
                }}
              >
                {procedure.name}
              </Typography>
            </Box>

            {/* Outer Container - Light Gray */}
            <Box sx={{
              p: { xs: "4px", sm: "5px" },
              backgroundColor: "#F5F5F5",
              borderRadius: { xs: "12px", sm: "14px" },
            }}>
              {/* Inner Card - Darker Gray */}
              <Box sx={{
                p: { xs: "16px", sm: "20px" },
                backgroundColor: "#E9E9E9",
                borderRadius: { xs: "8px", sm: "10px" },
              }}>
                {/* Image */}
                <Box
                  component="img"
                  src={procedure.image || "/placeholder.svg"}
                  alt={procedure.name}
                  sx={{
                    width: '100%',
                    height: { xs: '200px', sm: '250px' },
                    objectFit: 'cover',
                    borderRadius: { xs: "6px", sm: "8px" },
                    mb: 3
                  }}
                />

                {/* Content */}
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontSize: { xs: '1.1rem', sm: '1.25rem' },
                      fontWeight: 500,
                      mb: 2,
                      color: 'textPrimary',
                      fontFamily: 'Poppins'
                    }}
                  >
                    {procedure.title}
                  </Typography>

                  {/* Specialties Grid */}
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)' },
                      gap: { xs: '8px', sm: '12px' },
                      mb: 3
                    }}
                  >
                    {procedure.specialties.map((specialty, idx) => (
                      <Typography
                        key={idx}
                        variant="caption"
                        sx={{
                          color: 'text.disabled',
                          display: 'block',
                          fontSize: { xs: '0.75rem', sm: '0.813rem' }
                        }}
                      >
                        {specialty}
                      </Typography>
                    ))}
                  </Box>

                  {/* More Button */}
                  <Button
                    component={RouterLink}
                    to={`/procedimiento/${procedure.number}`}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      backgroundColor: '#FFFFFF',
                      color: '#000',
                      borderRadius: { xs: "6px", sm: "8px" },
                      textTransform: 'none',
                      py: { xs: 1, sm: 1.2 },
                      px: { xs: 2.5, sm: 3.5 },
                      fontSize: { xs: '13px', sm: '14px' },
                      fontWeight: 500,
                      '&:hover': { backgroundColor: '#F5F5F5' },
                    }}
                  >
                    Ver Más
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}