import React, { useState } from 'react';
import { 
  Box,
  Typography,
  TextField,
  Button,
  IconButton
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export function ContactSection({ id }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <Box 
      id={id} 
      sx={{ 
        bgcolor: '#F2F2F2', 
        minHeight: '100vh',
        paddingInline: { xs: '15px', md: '70px' }, // Márgenes del sistema
        py: { xs: '40px', md: '80px' },
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        columnGap: { xs: '10px', md: '20px' }, // Gutters del sistema
        gridTemplateRows: 'auto 1fr auto', // Header, content, footer
        gap: { xs: '40px', md: '80px' }
      }}
    >
      {/* HEADER - TÍTULO CONTACTO - Alineado a 70px exacto en columna 1 */}
      <Box sx={{
        gridColumn: '1 / 13',
        gridRow: '1 / 2',
        mb: { xs: '24px', md: '32px' }
      }}>
        <Typography 
          variant="h1" 
          sx={{ 
            fontSize: { xs: '24px', md: '32px' }, 
            fontWeight: 600,
            fontFamily: 'Poppins',
            display: 'flex',
            color: '#000000',
            letterSpacing: '0px',
            lineHeight: '1.2'
          }}
        >
          CONTACTO
        </Typography>
      </Box>

      {/* SECCIÓN IZQUIERDA - INFO DE CONTACTO - Columnas 1-7 (más espacio) */}
      <Box sx={{
        gridColumn: { xs: '1 / 13', md: '1 / 8' },
        gridRow: '2 / 3',
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: '32px', md: '48px' },
        pr: { md: '40px' }
      }}>
        {/* Clínica */}
        <Box sx={{ position: 'relative' }}>
          <Typography 
            sx={{ 
              fontSize: { xs: '18px', md: '20px' }, 
              fontWeight: 600,
              fontFamily: 'Poppins',
              color: '#000000',
              mb: { xs: '8px', md: '12px' }
            }}
          >
            Clínica
          </Typography>
          <Box sx={{ position: 'relative', ml: '20px' }}>
            <Box sx={{
              position: 'absolute',
              left: '-20px',
              top: '0',
              width: '2px',
              height: '50px',
              backgroundColor: '#1976d2'
            }} />
            <Typography 
              sx={{ 
                fontSize: { xs: '16px', md: '18px' }, 
                fontWeight: 400,
                fontFamily: 'Poppins',
                color: '#1976d2',
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              PDD, Maldonado, UY
            </Typography>
          </Box>
        </Box>

        {/* Consultas Generales */}
        <Box sx={{ position: 'relative' }}>
          <Typography 
            sx={{ 
              fontSize: { xs: '18px', md: '20px' }, 
              fontWeight: 600,
              fontFamily: 'Poppins',
              color: '#000000',
              mb: { xs: '8px', md: '12px' }
            }}
          >
            Consultas Generales
          </Typography>
          <Box sx={{ position: 'relative', ml: '20px' }}>
            <Box sx={{
              position: 'absolute',
              left: '-20px',
              top: '0',
              width: '2px',
              height: '50px',
              backgroundColor: '#1976d2'
            }} />
            <Typography 
              component="a"
              href="mailto:info@guzmanripoll.com"
              sx={{ 
                fontSize: { xs: '16px', md: '18px' }, 
                fontWeight: 400,
                fontFamily: 'Poppins',
                color: '#1976d2',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              info@guzmanripoll.com
            </Typography>
          </Box>
        </Box>

        {/* Comunicate */}
        <Box sx={{ position: 'relative' }}>
          <Typography 
            sx={{ 
              fontSize: { xs: '18px', md: '20px' }, 
              fontWeight: 600,
              fontFamily: 'Poppins',
              color: '#000000',
              mb: { xs: '8px', md: '12px' }
            }}
          >
            Comunicate
          </Typography>
          <Box sx={{ position: 'relative', ml: '20px' }}>
            <Box sx={{
              position: 'absolute',
              left: '-20px',
              top: '0',
              width: '2px',
              height: '50px',
              backgroundColor: '#1976d2'
            }} />
            <Typography 
              component="a"
              href="https://wa.me/59899611467"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                fontSize: { xs: '16px', md: '18px' }, 
                fontWeight: 400,
                fontFamily: 'Poppins',
                color: '#1976d2',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              +598 99 611 467
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* FORMULARIO DERECHO - PONETE EN CONTACTO - Columna 8-12 EXACTA */}
      <Box sx={{
        gridColumn: { xs: '1 / 13', md: '8 / 13' },
        gridRow: '1 / 3',
        alignSelf: 'start',
        mt: { xs: '20px', md: '60px' },
        pl: 0
      }}>
        {/* Header del formulario */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: { xs: '24px', md: '32px' }
        }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: { xs: '20px', md: '24px' }, 
              fontWeight: 600,
              fontFamily: 'Poppins',
              color: '#000000',
              lineHeight: '1.2'
            }}
          >
            Ponete en contacto
          </Typography>
          <Typography 
            sx={{ 
              fontSize: { xs: '11px', md: '12px' }, 
              fontWeight: 400,
              fontFamily: 'Poppins',
              color: '#666666'
            }}
          >
            *Campos Requeridos
          </Typography>
        </Box>

        {/* Formulario */}
        <Box component="form" onSubmit={handleSubmit}>
          {/* Primer Nombre */}
          <Box sx={{ mb: { xs: '16px', md: '24px' } }}>
            <Typography 
              component="label" 
              htmlFor="firstName"
              sx={{ 
                display: 'block',
                fontSize: { xs: '12px', md: '14px' }, 
                fontWeight: 600,
                fontFamily: 'Poppins',
                color: '#000000',
                mb: { xs: '4px', md: '8px' },
                textAlign: 'left'
              }}
            >
              Primer Nombre*
            </Typography>
            <TextField
              id="firstName"
              name="firstName"
              placeholder="Ingresa tu primer nombre"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              fullWidth
              variant="standard"
              InputProps={{
                disableUnderline: true,
                sx: {
                  fontSize: { xs: '14px', md: '16px' },
                  fontFamily: 'Poppins',
                  borderBottom: '1px solid #D9D9D9',
                  paddingBottom: '8px',
                  '&:focus-within': {
                    borderBottom: '2px solid #000'
                  }
                }
              }}
            />
          </Box>

          {/* Apellido */}
          <Box sx={{ mb: { xs: '16px', md: '24px' } }}>
            <Typography 
              component="label" 
              htmlFor="lastName"
              sx={{ 
                display: 'block',
                fontSize: { xs: '12px', md: '14px' }, 
                fontWeight: 600,
                fontFamily: 'Poppins',
                color: '#000000',
                mb: { xs: '4px', md: '8px' },
                textAlign: 'left'
              }}
            >
              Apellido*
            </Typography>
            <TextField
              id="lastName"
              name="lastName"
              placeholder="Ingresa tu apellido"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              fullWidth
              variant="standard"
              InputProps={{
                disableUnderline: true,
                sx: {
                  fontSize: { xs: '14px', md: '16px' },
                  fontFamily: 'Poppins',
                  borderBottom: '1px solid #D9D9D9',
                  paddingBottom: '8px',
                  '&:focus-within': {
                    borderBottom: '2px solid #000'
                  }
                }
              }}
            />
          </Box>

          {/* E-mail */}
          <Box sx={{ mb: { xs: '16px', md: '24px' } }}>
            <Typography 
              component="label" 
              htmlFor="email"
              sx={{ 
                display: 'block',
                fontSize: { xs: '12px', md: '14px' }, 
                fontWeight: 600,
                fontFamily: 'Poppins',
                color: '#000000',
                mb: { xs: '4px', md: '8px' },
                textAlign: 'left'
              }}
            >
              E-mail*
            </Typography>
            <TextField
              id="email"
              name="email"
              type="email"
              placeholder="Ingresa tu direccion de mail"
              value={formData.email}
              onChange={handleInputChange}
              required
              fullWidth
              variant="standard"
              InputProps={{
                disableUnderline: true,
                sx: {
                  fontSize: { xs: '14px', md: '16px' },
                  fontFamily: 'Poppins',
                  borderBottom: '1px solid #D9D9D9',
                  paddingBottom: '8px',
                  '&:focus-within': {
                    borderBottom: '2px solid #000'
                  }
                }
              }}
            />
          </Box>

          {/* Número de celular */}
          <Box sx={{ mb: { xs: '16px', md: '24px' } }}>
            <Typography 
              component="label" 
              htmlFor="phone"
              sx={{ 
                display: 'block',
                fontSize: { xs: '12px', md: '14px' }, 
                fontWeight: 600,
                fontFamily: 'Poppins',
                color: '#000000',
                mb: { xs: '4px', md: '8px' },
                textAlign: 'left'
              }}
            >
              Numero de celular (Opcional)
            </Typography>
            <TextField
              id="phone"
              name="phone"
              type="tel"
              placeholder="Ingresa tu numero de celular"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
              variant="standard"
              InputProps={{
                disableUnderline: true,
                sx: {
                  fontSize: { xs: '14px', md: '16px' },
                  fontFamily: 'Poppins',
                  borderBottom: '1px solid #D9D9D9',
                  paddingBottom: '8px',
                  '&:focus-within': {
                    borderBottom: '2px solid #000'
                  }
                }
              }}
            />
          </Box>

          {/* Mensaje */}
          <Box sx={{ mb: { xs: '20px', md: '32px' } }}>
            <Typography 
              component="label" 
              htmlFor="message"
              sx={{ 
                display: 'block',
                fontSize: { xs: '12px', md: '14px' }, 
                fontWeight: 600,
                fontFamily: 'Poppins',
                color: '#000000',
                mb: { xs: '4px', md: '8px' },
                textAlign: 'left'
              }}
            >
              Mensaje/Aspiraciones*
            </Typography>
            <TextField
              id="message"
              name="message"
              placeholder="Escribi un mensaje..."
              value={formData.message}
              onChange={handleInputChange}
              required
              fullWidth
              multiline
              rows={3}
              variant="standard"
              InputProps={{
                disableUnderline: true,
                sx: {
                  fontSize: { xs: '14px', md: '16px' },
                  fontFamily: 'Poppins',
                  borderBottom: '1px solid #D9D9D9',
                  paddingBottom: '8px',
                  '&:focus-within': {
                    borderBottom: '2px solid #000'
                  }
                }
              }}
            />
          </Box>

          {/* Botón Enviar - Glass Effect Gris Oscuro */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              background: 'rgba(60, 60, 60, 0.8)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              color: '#ffffff',
              py: { xs: '16px', md: '18px' },
              fontSize: { xs: '16px', md: '17px' },
              fontWeight: 500,
              fontFamily: 'Poppins',
              textTransform: 'none',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease',
              '&:hover': { 
                background: 'rgba(80, 80, 80, 0.9)',
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(25px)',
                WebkitBackdropFilter: 'blur(25px)'
              }
            }}
          >
            Enviar
          </Button>
        </Box>
      </Box>

      {/* FOOTER - Grid Layout con márgenes de 70px */}
      <Box sx={{
        gridColumn: '1 / 13',
        gridRow: '3 / 4',
        pt: { xs: '40px', md: '60px' }
      }}>
        
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          columnGap: { xs: '10px', md: '20px' },
          alignItems: 'center'
        }}>
          {/* Todos los Derechos Reservados - Columna 1 */}
          <Box sx={{ 
            gridColumn: { xs: '1 / 13', md: '1 / 5' },
            display: 'flex',
            justifyContent: { xs: 'center', md: 'flex-start' }
          }}>
            <Typography 
              sx={{ 
                fontSize: { xs: '11px', md: '12px' }, 
                fontWeight: 400,
                fontFamily: 'Poppins',
                color: '#666666'
              }}
            >
              Todos los Derechos Reservados.
            </Typography>
          </Box>

          {/* LinkedIn Icon - Columna 6 */}
          <Box sx={{ 
            gridColumn: { xs: '1 / 13', md: '6 / 7' },
            display: 'flex',
            justifyContent: 'center',
            mt: { xs: '16px', md: '0' }
          }}>
            <IconButton 
              href="https://linkedin.com/company/guzman-ripoll"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              sx={{ 
                bgcolor: '#000000', 
                color: '#ffffff', 
                width: { xs: '32px', md: '36px' },
                height: { xs: '32px', md: '36px' },
                borderRadius: '4px',
                '&:hover': { 
                  bgcolor: '#333333' 
                }
              }}
            >
              <LinkedInIcon sx={{ fontSize: { xs: '14px', md: '16px' } }} />
            </IconButton>
          </Box>

          {/* Copyright - Columnas 10-12 */}
          <Box sx={{ 
            gridColumn: { xs: '1 / 13', md: '10 / 13' },
            display: 'flex',
            justifyContent: { xs: 'center', md: 'flex-end' },
            mt: { xs: '16px', md: '0' }
          }}>
            <Typography 
              sx={{ 
                fontSize: { xs: '11px', md: '12px' }, 
                fontWeight: 400,
                fontFamily: 'Poppins',
                color: '#666666'
              }}
            >
              Copyright ©2025 Guzman Ripoll
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}