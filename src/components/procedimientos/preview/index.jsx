import React from 'react';
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
  
  const procedures = [
    {
      number: "01",
      name: "Cirugía mamaria",
      image: "/images/imagen3.jpg",
    },
    {
      number: "02",
      name: "Cirugía corporal",
      image: "/images/imagen3.jpg",
    },
    {
      number: "03",
      name: "Lipoescultura VASER",
      image: "/images/imagen3.jpg",
    },
    {
      number: "04",
      name: "Body Lift & Liposucción",
      image: "/images/imagen3.jpg",
    },
    {
      number: "05",
      name: "Cirugía Reparadora & Reconstructiva",
      image: "/images/imagen3.jpg",
    },
  ];

  const specialties = [
    "Cirugía mamaria",
    "Cirugía reconstructiva",
    "Cirugía estética",
    "Cirugía reparadora",
    "Cirugía plástica",
    "Lipoescultura"
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
            textAlign: { xs: 'center', md: 'start'},
            alignItems: 'start',
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
              lineHeight: 1.7
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
              marginTop: { xs: '80px', md: '150px', lg: '180px', xl: '50px' },
              gridColumn: { xs: '1 / 3', md: '1 / 1' },
              maxHeight: { xs: '100px', sm: '350px' },
              gridRow: `${index + 2} / ${index + 2}`,
              display: 'flex',
              flexDirection: 'column',
              textAlign: { xs: 'center', md: 'start'},
              alignItems: 'start',
              justifyContent: 'start',
              paddingTop: '20px',
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
              marginTop: { xs: '80px', md: '150px', lg: '180px', xl: '50px' },
              gridColumn: { xs: '3 / 6', md: '5 / 7' },
              maxHeight: { xs: '300px', sm: '350px' },
              gridRow: `${index + 2} / ${index + 2}`,
              display: 'flex',
              flexDirection: 'column',
              textAlign: { xs: 'center', md: 'start'},
              alignItems: 'start',
              justifyContent: 'start',
              paddingTop: '20px',
            }}
          >
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: { xs: '15px', md: '1.125rem'} }}>
              {procedure.name}
            </Typography>
          </Box>
        ))}

        {procedures.map((procedure, index) => (
          <Box
            key={`content-${index}`}
            sx={{
              marginTop: { xs: '80px', md: '150px', lg: '180px', xl: '50px' },
              gridColumn: { xs: '5 / 13', md: '7 / 13' },
              maxHeight: { xs: '300px', sm: '350px' },
              gridRow: `${index + 2} / ${index + 2}`,
              display: 'flex',
              flexDirection: 'row',
              textAlign: { xs: 'center', md: 'start'},
              alignItems: 'start',
              justifyContent: 'start',
              padding: '20px',
              gap: '20px',
              position: 'relative',
              ':after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                right: '100%',
                transform: 'translateX(50%)',
                width: '93vw',
                height: '1px',
                backgroundColor: 'textSecondary',
                zIndex: -1,
              },
            }}
          >
            <Box
              component="img"
              src={procedure.image || "/placeholder.svg"}
              alt={procedure.name}
              sx={{ 
                width: { xs: '100%', sm: '50%' },
                maxHeight: { xs: '200px', sm: '300px' },
                objectFit: 'cover',
                borderRadius: 4
              }}
            />
            
            <Box sx={{ width: { xs: '100%', sm: '50%' } }}>
              <Typography 
                variant="subtitle1" 
                sx={{ fontSize: '25px', fontWeight: 500, mb: 2, color: 'textPrimary', fontFamily: 'Poppins' }}
              >
                Cirugía Plástica, Estética & Reparadora
              </Typography>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', mb: 2 }}>
                {specialties.map((specialty, idx) => (
                  <Typography 
                    key={idx}
                    variant="caption" 
                    sx={{ color: 'text.disabled', display: 'block' }}
                  >
                    {specialty}
                  </Typography>
                ))}
              </Box>
              
              <MoreButton 
                component={RouterLink}
                to={`/procedimiento/${procedure.number}`}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  backgroundColor: '#F5F5F5',
                  color: '#000',
                  borderRadius: '4px',
                  textTransform: 'none',
                  py: 1,
                  px: 3,
                  '&:hover': { backgroundColor: '#E0E0E0' },
                }}
              >
                Ver Más
              </MoreButton>
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
          textAlign: { xs: 'left', sm: 'center' },
        }}
      >
        <Typography 
          variant="h5" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold', 
            mb: 2, 
            color: 'textPrimary',
            fontSize: { xs: '1.5rem', sm: '1.75rem' }
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
            mx: 'auto'
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
              borderBottom: index < procedures.length - 1 ? '1px solid' : 'none',
              borderColor: 'divider',
              paddingBottom: { xs: 4, sm: 6 },
            }}
          >
            {/* Number and Name Row */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 2,
                mb: 3,
              }}
            >
              <Typography 
                variant="h2" 
                sx={{ 
                  fontSize: { xs: '2.5rem', sm: '3rem' },
                  fontWeight: 300,
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
                  fontSize: { xs: '1.1rem', sm: '1.25rem' },
                  flex: 1
                }}
              >
                {procedure.name}
              </Typography>
            </Box>

            {/* Image */}
            <Box
              component="img"
              src={procedure.image || "/placeholder.svg"}
              alt={procedure.name}
              sx={{ 
                width: '100%',
                height: { xs: '200px', sm: '250px' },
                objectFit: 'cover',
                borderRadius: 2,
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
                Cirugía Plástica, Estética & Reparadora
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
                {specialties.map((specialty, idx) => (
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
                endIcon={<ArrowForwardIcon />}
                sx={{
                  backgroundColor: '#F5F5F5',
                  color: '#000',
                  borderRadius: '4px',
                  textTransform: 'none',
                  py: { xs: 1, sm: 1.5 },
                  px: { xs: 3, sm: 4 },
                  fontSize: { xs: '0.875rem', sm: '0.938rem' },
                  '&:hover': { backgroundColor: '#E0E0E0' },
                }}
              >
                More
              </Button>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}