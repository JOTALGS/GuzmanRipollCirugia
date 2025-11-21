import React, { useState } from 'react';
import { 
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid
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
        px: { xs: '20px', md: '70px' },
        py: { xs: '100px', md: '100px' }, // mayor separación superior
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        columnGap: { xs: '16px', md: '20px' },
        rowGap: { xs: '70px', md: '80px' },
      }}
    >
      {/* === TITULO PRINCIPAL === */}
      <Box
        sx={{
          gridColumn: '1 / 13',
          textAlign: 'left',
          mb: { xs: '10px', md: '0' },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '48px', md: '34px' },
            fontWeight: 700,
            fontFamily: 'Poppins',
            paddingTop: { xs: '75px', md: '34px' },
            color: '#000',
            lineHeight: 1.2,
          }}
        >
          CONTACTO
        </Typography>
      </Box>

      {/* === BLOQUE IZQUIERDO DE INFORMACIÓN === */}
      <Box
        sx={{
          gridColumn: { xs: '1 / 13', md: '1 / 7' },
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: '40px', md: '48px' },
        }}
      >
        {/* Línea 1 */}
        <Box>
          <Typography
            sx={{
              fontSize: { xs: '18px', md: '20px' },
              fontWeight: 600,
              fontFamily: 'Poppins',
              color: '#000',
            }}
          >
            Clínica
          </Typography>
          <Typography
            sx={{
              mt: 1,
              fontSize: { xs: '15px', md: '17px' },
              color: '#1976d2',
              fontFamily: 'Poppins',
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            PDD, Maldonado, UY
          </Typography>
        </Box>

        {/* Línea 2: Consultas + Comunicate (2 columnas en móvil) */}
        <Grid container spacing={4} sx={{ width: '100%' }}>
          <Grid item xs={12} sm={6}>
            <Typography
              sx={{
                fontSize: { xs: '18px', md: '20px' },
                fontWeight: 600,
                fontFamily: 'Poppins',
                color: '#000',
              }}
            >
              Consultas Generales
            </Typography>
            <Typography
              component="a"
              href="mailto:info@guzmanripoll.com"
              sx={{
                mt: 1,
                fontSize: { xs: '15px', md: '17px' },
                color: '#1976d2',
                textDecoration: 'none',
                fontFamily: 'Poppins',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              info@guzmanripoll.com
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography
              sx={{
                fontSize: { xs: '18px', md: '20px' },
                fontWeight: 600,
                fontFamily: 'Poppins',
                color: '#000',
              }}
            >
              Comunicate
            </Typography>
            <Typography
              component="a"
              href="https://wa.me/59899611467"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                mt: 1,
                fontSize: { xs: '15px', md: '17px' },
                color: '#1976d2',
                textDecoration: 'none',
                fontFamily: 'Poppins',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              +598 99 611 467
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* === BLOQUE DERECHO: FORMULARIO === */}
      <Box
        sx={{
          gridColumn: { xs: '1 / 13', md: '7 / 13' },
          textAlign: 'left',
          mt: { xs: '20px', md: '0' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            mb: { xs: '30px', md: '32px' },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '22px', md: '24px' },
              fontWeight: 600,
              fontFamily: 'Poppins',
              color: '#000',
            }}
          >
            Ponete en contacto
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '12px', md: '12px' },
              color: '#666',
              fontFamily: 'Poppins',
            }}
          >
            *Campos Requeridos
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          {[
            { id: 'firstName', label: 'Primer Nombre*', placeholder: 'Ingresa tu primer nombre', required: true },
            { id: 'lastName', label: 'Apellido*', placeholder: 'Ingresa tu apellido', required: true },
            { id: 'email', label: 'E-mail*', placeholder: 'Ingresa tu dirección de mail', required: true, type: 'email' },
            { id: 'phone', label: 'Número de celular (Opcional)', placeholder: 'Ingresa tu número de celular', type: 'tel' },
            { id: 'message', label: 'Mensaje/Aspiraciones*', placeholder: 'Escribí un mensaje...', required: true, multiline: true, rows: 3 },
          ].map((field) => (
            <Box key={field.id} sx={{ mb: { xs: '24px', md: '24px' } }}>
              <Typography
                sx={{
                  fontSize: { xs: '13px', md: '14px' },
                  fontWeight: 600,
                  mb: 1,
                  color: '#000',
                  fontFamily: 'Poppins',
                }}
              >
                {field.label}
              </Typography>
              <TextField
                id={field.id}
                name={field.id}
                placeholder={field.placeholder}
                value={formData[field.id]}
                onChange={handleInputChange}
                required={field.required}
                fullWidth
                type={field.type || 'text'}
                multiline={field.multiline}
                rows={field.rows}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    fontFamily: 'Poppins',
                    borderBottom: '1px solid #D9D9D9',
                    paddingBottom: '8px',
                    '&:focus-within': { borderBottom: '2px solid #000' },
                  },
                }}
              />
            </Box>
          ))}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              background: '#000',
              borderRadius: '4px',
              color: '#fff',
              py: { xs: '16px', md: '16px' },
              fontSize: { xs: '16px', md: '16px' },
              fontFamily: 'Poppins',
              textTransform: 'none',
              '&:hover': { background: '#222' },
            }}
          >
            Enviar
          </Button>
        </Box>
      </Box>

      {/* === FOOTER === */}
      <Box
        sx={{
          gridColumn: '1 / 13',
          textAlign: 'left',
          mt: { xs: '100px', md: '80px' },
        }}
      >
        <IconButton
          href="https://linkedin.com/company/guzman-ripoll"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            bgcolor: '#000',
            color: '#fff',
            width: { xs: '40px', md: '36px' },
            height: { xs: '40px', md: '36px' },
            borderRadius: '4px',
            mb: { xs: '14px', md: '8px' },
            '&:hover': { bgcolor: '#333' },
          }}
        >
          <LinkedInIcon sx={{ fontSize: { xs: '18px', md: '16px' } }} />
        </IconButton>

        <Typography
          sx={{
            fontSize: { xs: '14px', md: '13px' },
            color: '#111',
            fontFamily: 'Poppins',
            fontWeight: 500,
            mb: '4px',
          }}
        >
          Todos los Derechos Reservados.
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: '14px', md: '13px' },
            color: '#111',
            fontFamily: 'Poppins',
            fontWeight: 500,
          }}
        >
          © 2025 Guzman Ripoll
        </Typography>
      </Box>
    </Box>
  );
}
