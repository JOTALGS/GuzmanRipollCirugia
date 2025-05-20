// components/ContactCTA.js
import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Link } from 'react-router-dom';

const ContactCTA = ({ ctaRef }) => {

  return (
    <Box
      ref={ctaRef}
      sx={{
        width: '100%',
        px: { xs: 2, md: 3, lg: 4 },
        py: 12,
        backgroundColor: 'background.paper',
      }}
    >
      <Box
        sx={{
          borderRadius: 2,
          background: 'linear-gradient(to right, #191968, #0081C7)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Tech Grid Background Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.1,
            backgroundImage: 'url(/images/tech-grid.png)', // Replace with your actual background or pattern
            backgroundSize: 'cover',
            zIndex: 1,
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 2, p: { xs: 6, md: 8 } }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
            <Box sx={{ textAlign: 'start'}}>
              <Typography
                variant="h3"
                sx={{
                  color: '#fff',
                  fontFamily: 'Archivo, sans-serif',
                  fontWeight: 700,
                  mb: 3,
                }}
              >
                Conexión humana, innovación tecnológica
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 4 }}
              >
                Agende una consulta personalizada para discutir sus objetivos estéticos y recibir recomendaciones profesionales adaptadas a sus necesidades específicas.
              </Typography>

              <Button
                component={Link}
                href="/contacto"
                variant="contained"
                endIcon={<ArrowRightAltIcon />}
                sx={{
                  backgroundColor: '#fff',
                  color: '#191968',
                  fontFamily: 'Red Hat Display, sans-serif',
                  padding: '12px 24px',
                  borderRadius: '9999px',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.9)',
                  },
                }}
              >
                Agendar Consulta
              </Button>
            </Box>

            <Box sx={{ width: { xs: '100%', md: '50%' } }}>
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: 160, md: 240 },
                  width: '100%',
                }}
              >
                <img
                  src="/images/GR_2_LogoHorizontal_Blanco.png"
                  alt="Dr. Guzmán Ripoll"
                  fill
                  style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactCTA;
