import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  TextField,
  Divider,
  Link as MuiLink,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', backgroundColor: '#000', zIndex: '1000', position: 'relative' }}>
      <Box
        component="footer"
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
          mx: { xs: '15px', md: '70px' },
          gap: { xs: '32px', md: '20px' }, // Proporción áurea para móvil
          backgroundColor: '#000',
          color: '#fff',
          py: { xs: '48px', md: 8 }, // Proporción áurea 48px móvil
        }}
      >
        <Box sx={{
          gridColumn: { xs: '1 / 1', md: '1 / 5' },
          gridRow: { xs: '1 / 1', md: '1 / 1' },
          mx: { xs: 0, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          gap: { xs: '24px', md: '12px' }, // Proporción áurea spacing
        }}>
          <Box sx={{ display: 'flex', width: '100%', textAlign: 'start', flexDirection: 'column' }}>
            <Typography
              color="white"
              fontFamily={'Poppins'}
              fontSize={{ xs: '32px', sm: '36px', md: '45px', xl: '55px' }}
              sx={{ width: '100%', letterSpacing: { xs: '-1.5px', md: '-3px' }, lineHeight: { xs: 1.2, md: 1.1 } }}
            >
              Lista para
              <Typography
                component="span"
                fontFamily={'Poppins'}
                fontSize={{ xs: '32px', sm: '36px', md: '45px', xl: '55px' }}
                sx={{ color: 'textAccent', letterSpacing: { xs: '-1.5px', md: '-3px' } }}
              >
                {' '}Renovar
              </Typography>
              <br />
              tu Imagen
            </Typography>
          </Box>

          <Button
            component={RouterLink}
            to="/agenda"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: '#F5F5F5',
              color: '#000',
              borderRadius: '4px',
              textTransform: 'none',
              py: { xs: 1.5, md: 1 },
              px: { xs: 4, md: 3 },
              fontSize: { xs: '16px', md: '14px' },
              '&:hover': { backgroundColor: '#E0E0E0' },
            }}
          >
            Agendate
          </Button>
        </Box>

        <Box sx={{
          gridColumn: { xs: '1 / 1', md: '7 / 13' },
          gridRow: { xs: '2 / 2', md: '1 / 1' },
          mx: { xs: 0, md: 4 },
        }}>
          <Box sx={{ display: 'flex', width: '100%' }}>
              <Box
                component="form"
                noValidate
                autoComplete="off"
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', md: 'flex-start' },
                    gap: { xs: '12px', md: 0 },
                    mb: { xs: '24px', md: 3 },
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontSize: { xs: '15px', md: '16px' }, lineHeight: 1.4 }}>
                    Agenda tu consulta y descubrí cómo podemos renovar tu vida.
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#B0B0B0', fontSize: { xs: '13px', md: '14px' } }}>
                    *Campos Requeridos
                  </Typography>
                </Box>

                {[
                  {
                    name: 'firstName',
                    label: 'Primer Nombre*',
                    placeholder: 'Ingresa tu primer nombre',
                    type: 'text',
                  },
                  {
                    name: 'lastName',
                    label: 'Apellido*',
                    placeholder: 'Ingresa tu apellido',
                    type: 'text',
                  },
                  {
                    name: 'email',
                    label: 'E‑mail*',
                    placeholder: 'Ingresa tu dirección de mail',
                    type: 'email',
                  },
                  {
                    name: 'phone',
                    label: 'Número de celular (Opcional)',
                    placeholder: 'Ingresa tu número de celular',
                    type: 'tel',
                  },
                ].map((field) => (
                  <TextField
                  key={field.name}
                  fullWidth
                  variant="standard"
                  type={field.type}
                    label={field.label}
                    placeholder={field.placeholder}
                    InputLabelProps={{
                      shrink: true,
                      sx: { color: '#B0B0B0' },
                    }}
                    InputProps={{
                      disableUnderline: false,
                      sx: { color: '#fff' },
                    }}
                    sx={{
                      mb: { xs: '20px', md: 3 },
                      '& .MuiInputLabel-root': { fontSize: { xs: '14px', md: '16px' } },
                      '& .MuiInputBase-input': { fontSize: { xs: '15px', md: '16px' } },
                      '& .MuiInput-underline:before': { borderBottomColor: '#555' },
                      '&:hover .MuiInput-underline:before': { borderBottomColor: '#777' },
                      '& .MuiInput-underline:after': { borderBottomColor: '#60A5FA' },
                      '& .MuiInputBase-input::placeholder': {
                        color: '#B0B0B0',
                        opacity: 1,
                      },
                    }}
                  />
                ))}

                <TextField
                  fullWidth
                  variant="standard"
                  label="Mensaje/Aspiraciones*"
                  placeholder="Escribí un mensaje…"
                  multiline
                  rows={3}
                  InputLabelProps={{
                    shrink: true,
                    sx: { color: '#B0B0B0' },
                  }}
                  InputProps={{
                    disableUnderline: false,
                    sx: { color: '#fff' },
                  }}
                  sx={{
                    mb: { xs: '24px', md: 4 },
                    '& .MuiInputLabel-root': { fontSize: { xs: '14px', md: '16px' } },
                    '& .MuiInputBase-input': { fontSize: { xs: '15px', md: '16px' } },
                    '& .MuiInput-underline:before': { borderBottomColor: '#555' },
                    '&:hover .MuiInput-underline:before': { borderBottomColor: '#777' },
                    '& .MuiInput-underline:after': { borderBottomColor: '#60A5FA' },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#B0B0B0',
                      opacity: 1,
                    },
                  }}
                  />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#F5F5F5',
                    color: '#000',
                    borderRadius: '4px',
                    textTransform: 'none',
                    py: { xs: 1.5, md: 1.5 },
                    fontSize: { xs: '16px', md: '15px' },
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: '#E0E0E0' },
                  }}
                >
                  Enviar tu Consulta Ahora
                </Button>
              </Box>
          </Box>
        </Box>

        <Box sx={{
          gridColumn: '1 / 13',
          gridRow: '2 / 2',
          mx: { xs: 1, md: 4 },
        }}>
          {/* Top Hero + Form */}
          

          <Divider sx={{ borderColor: '#333', my: { xs: '32px', md: 6 } }} />

          {/* Nav Links */}
          <Grid container spacing={{ xs: 3, md: 2.5 }} sx={{ fontSize: '0.875rem' }}>
            {/* DESCUBRÍ */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                DESCUBRÍ
              </Typography>
              <List disablePadding dense>
                {[
                  { to: '/', text: 'Inicio' },
                  { to: '/clinica', text: 'Clínica' },
                  { to: '/tratamientos', text: 'Tratamientos' },
                  { to: '/contacto', text: 'Contacto' },
                ].map((link) => (
                  <ListItem key={link.text} disablePadding sx={{ mb: 1 }}>
                    <MuiLink
                      component={RouterLink}
                      to={link.to}
                      underline="none"
                      sx={{ color: '#B0B0B0', '&:hover': { color: '#fff' } }}
                    >
                      <ListItemText primary={link.text} />
                    </MuiLink>
                  </ListItem>
                ))}
              </List>
            </Grid>

            {/* CONTACTOS */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                CONTACTOS
              </Typography>
              <List disablePadding dense>
                {[
                  'Instagram',
                  'Facebook',
                  '+598.99.016.358',
                  'info@guzmanripoll.com',
                ].map((item) => (
                  <ListItem key={item} disablePadding sx={{ color: '#B0B0B0', mb: 1 }}>
                    {item}
                  </ListItem>
                ))}
              </List>
            </Grid>

            {/* DIRECCIÓN + Back to top */}
            <Grid item xs={12} sm={6} md={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                DIRECCIÓN
              </Typography>
              <Grid container>
                <Grid item xs={8}>
                  <Typography sx={{ color: '#B0B0B0' }}>
                    Av. Franklin Delano Roosevelt
                  </Typography>
                  <Typography sx={{ color: '#B0B0B0' }}>
                    20100, Punta del Este.
                  </Typography>
                </Grid>
                <Grid item xs={4} textAlign="right">
                  <MuiLink
                    component={RouterLink}
                    to="#"
                    sx={{ color: '#B0B0B0', '&:hover': { color: '#fff' } }}
                  >
                    Back to top ↑
                  </MuiLink>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Bottom Bar */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', md: 'center' },
              gap: { xs: '20px', md: 0 },
              mt: { xs: '32px', md: 6 },
            }}
          >
            {/* Logo + Name */}
            <Box display="flex" alignItems="center" gap={1}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  color: '#000',
                  fontSize: '0.75rem',
                }}
              >
                GZ
              </Box>
              <Typography variant="caption">GUZMÁN RIPOLL</Typography>
            </Box>

            {/* LinkedIn */}
            <MuiLink
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: '#B0B0B0',
                border: '1px solid #B0B0B0',
                borderRadius: '4px',
                p: 0.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': { color: '#fff', borderColor: '#fff' },
              }}
            >
              <LinkedInIcon fontSize="small" />
            </MuiLink>

            {/* Copyright */}
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={{ xs: 1, md: 4 }}>
              <Typography variant="caption" sx={{ color: '#B0B0B0', fontSize: { xs: '13px', md: '12px' } }}>
                Todos los Derechos Reservados.
              </Typography>
              <Typography variant="caption" sx={{ color: '#B0B0B0', fontSize: { xs: '13px', md: '12px' } }}>
                Copyright ©2025 Guzman Ripoll
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
