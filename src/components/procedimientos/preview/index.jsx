import React from 'react';
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
  Chip
} from '@mui/material';
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

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 }, py: { xs: 4, md: 8 } }}>
        {/* Services Section */}
        <Box sx={{ mb: 10 }}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mb: 3, color: 'text.primary' }}>
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

        {/* Procedures List */}
        <Stack spacing={8}>
          {procedures.map((procedure, index) => (
            <Grid 
              container 
              key={index} 
              alignItems="center" 
              spacing={4}
              sx={{ minHeight: 128 }}
            >
              {/* Number */}
              <Grid item xs={2} sm={1}>
                <ProcedureNumber variant="h2" color="text.primary">
                  {procedure.number}
                </ProcedureNumber>
              </Grid>

              {/* Procedure Name */}
              <Grid item xs={10} sm={3} md={3}>
                <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.125rem' }}>
                  {procedure.name}
                </Typography>
              </Grid>

              {/* Image and Details */}
              <Grid item xs={12} sm={8} md={8}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} alignItems="flex-start">
                  <Box
                    component="img"
                    src={procedure.image || "/placeholder.svg"}
                    alt={procedure.name}
                    sx={{ 
                      width: { xs: '100%', sm: 192 }, 
                      height: 128,
                      objectFit: 'cover',
                      borderRadius: 1
                    }}
                  />
                  
                  <Box sx={{ width: { xs: '100%', sm: 256 } }}>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ fontWeight: 500, mb: 2, color: 'text.primary' }}
                    >
                      Cirugía Plástica, Estética & Reparadora
                    </Typography>
                    
                    <Grid container spacing={1} sx={{ mb: 2 }}>
                      {specialties.map((specialty, idx) => (
                        <Grid item xs={6} key={idx}>
                          <Typography 
                            variant="caption" 
                            sx={{ color: 'text.disabled', display: 'block' }}
                          >
                            {specialty}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                    
                    <MoreButton endIcon="→">
                      More
                    </MoreButton>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}