import React from 'react';
import { 
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Divider,
  IconButton,
  Link
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// InfoBlock Component
function InfoBlock({ title, content, href }) {
  return (
    <Box sx={{ position: 'relative', pl: '32px' }}>
      <Divider 
        orientation="vertical" 
        sx={{
          position: 'absolute',
          left: 0,
          top: '4px',
          height: 'calc(100% - 8px)',
          width: '1px',
          backgroundColor: '#e0e0e0'
        }} 
      />
      <Typography variant="body1" sx={{ mb: '8px', fontSize: '18px', fontWeight: 500 }}>
        {title}
      </Typography>
      <Link 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        sx={{ 
          fontSize: '18px', 
          color: '#1976d2',
          '&:hover': { textDecoration: 'underline' }
        }}
      >
        {content}
      </Link>
    </Box>
  );
}

// FormField Component
function FormField({
  label,
  id,
  type = "text",
  placeholder,
  required = false
}) {
  return (
    <Box sx={{ mb: '32px' }}>
      <Typography 
        variant="body1" 
        component="label" 
        htmlFor={id}
        sx={{ 
          display: 'block', 
          fontSize: '14px', 
          fontWeight: 500,
          mb: '8px'
        }}
      >
        {label}
      </Typography>
      <TextField
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        required={required}
        fullWidth
        variant="standard"
        InputProps={{
          disableUnderline: true,
          sx: {
            borderBottom: '1px solid #e0e0e0',
            paddingBottom: '8px',
            '&:focus-within': {
              borderBottom: '2px solid #000'
            }
          }
        }}
      />
    </Box>
  );
}

// Main ContactSection Component
export function ContactSection({ id }) {
  return (
    <Box 
      id={id} 
      sx={{ 
        bgcolor: 'background.paper', 
        py: '128px',
        px: '20px',
        maxWidth: '100%',
        mx: 'auto'
      }}
    >
      <Box sx={{ maxWidth: '1920px', mx: 'auto' }}>
        <Typography 
          variant="h1" 
          sx={{ 
            mb: '64px', 
            fontSize: '36px', 
            fontWeight: 600,
            letterSpacing: '-0.5px'
          }}
        >
          CONTACTO
        </Typography>

        <Grid container spacing={4}>
          {/* Left Column - Contact Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              <InfoBlock 
                title="Clinica" 
                content="Punta del Este, Maldonado, UY" 
                href="#" 
              />
              <InfoBlock 
                title="Consultas Generales" 
                content="info@guzmanripoll.com" 
                href="mailto:info@guzmanripoll.com" 
              />
              <InfoBlock 
                title="Comunicate" 
                content="+598 99 611 467" 
                href="https://wa.me/59899611467" 
              />
            </Box>
          </Grid>

          {/* Right Column - Contact Form */}
          <Grid item xs={12} md={7} sx={{ ml: { md: '8.33%' } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: '32px' }}>
              <Typography variant="h2" sx={{ fontSize: '28px', fontWeight: 600 }}>
                Ponete en contacto
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '14px', color: '#9e9e9e' }}>
                *Campos Requeridos
              </Typography>
            </Box>

            <Box component="form">
              <FormField 
                label="Primer Nombre*" 
                placeholder="Ingresa tu primer nombre" 
                id="firstName" 
                required
              />
              <FormField 
                label="Apellido*" 
                placeholder="Ingresa tu apellido" 
                id="lastName" 
                required
              />
              <FormField 
                label="E-mail*" 
                placeholder="Ingresa tu direccion de mail" 
                id="email" 
                type="email"
                required
              />
              <FormField 
                label="Numero de celular (Opcional)" 
                placeholder="Ingresa tu numero de celular" 
                id="phone" 
                type="tel"
              />
              
              <Box sx={{ mb: '32px' }}>
                <Typography 
                  variant="body1" 
                  component="label" 
                  htmlFor="message"
                  sx={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: 500,
                    mb: '8px'
                  }}
                >
                  Mensaje/Aspiraciones*
                </Typography>
                <TextField
                  id="message"
                  placeholder="Escribi un mensaje..."
                  multiline
                  rows={3}
                  required
                  fullWidth
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      borderBottom: '1px solid #e0e0e0',
                      paddingBottom: '8px',
                      '&:focus-within': {
                        borderBottom: '2px solid #000'
                      }
                    }
                  }}
                />
              </Box>
              
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: '#000',
                  color: '#fff',
                  py: '12px',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: 500,
                  '&:hover': { bgcolor: '#424242' }
                }}
              >
                Enviar
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box 
          sx={{ 
            mt: '96px', 
            pt: '32px', 
            borderTop: '1px solid #e0e0e0',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
            color: '#9e9e9e'
          }}
        >
          <Typography variant="body2">Todos los Derechos Reservados.</Typography>
          <IconButton 
            href="#" 
            aria-label="LinkedIn"
            sx={{ 
              bgcolor: '#000', 
              color: '#fff', 
              p: '8px',
              borderRadius: '6px',
              '&:hover': { bgcolor: '#424242' }
            }}
          >
            <LinkedInIcon sx={{ fontSize: '16px' }} />
          </IconButton>
          <Typography variant="body2">Copyright &copy;2025 Guzman Ripoll</Typography>
        </Box>
      </Box>
    </Box>
  );
}