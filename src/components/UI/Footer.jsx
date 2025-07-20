// components/Footer.js
import React from 'react';
// Import Link directly from react-router-dom
import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  TextField,
  Divider,
  Link as MuiLink, // Still use MuiLink for styling but wrap RouterLink
  List,
  ListItem,
  ListItemText,
  useTheme,
} from '@mui/material';

// Import MUI Icons
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box sx={{
      backgroundColor: '#000',
      color: '#fff',
      py: 6,
      px: { xs: 2, md: 4, lg: 8 },
      height: '100vh',
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left Section: Ready to Renew Your Image? */}
          <Grid item xs={12} md={6} lg={3}>
            <Typography variant="h4" component="h2" sx={{
              fontWeight: 'bold',
              color: '#60A5FA',
              mb: 3,
            }}>
              Listo para <span style={{ color: '#60A5FA' }}>Renovar</span> tu imagen?
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#fff',
                color: '#000',
                borderRadius: '999px',
                py: 1.5,
                px: 3,
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                },
              }}
              endIcon={<ArrowForwardIcon />}
            >
              Agendate
            </Button>
          </Grid>

          {/* Right Section: Schedule Your Consultation Form */}
          <Grid item xs={12} md={6} lg={9}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Agenda tu consulta y descubri como podemos renovar tu vida.
            </Typography>
            <Typography variant="caption" sx={{ color: '#B0B0B0', mb: 3, display: 'block' }}>
              *Campos Requeridos
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Primer Nombre*"
                  variant="outlined"
                  placeholder="Ingresa tu primer nombre"
                  InputLabelProps={{ style: { color: '#B0B0B0' } }}
                  InputProps={{ style: { color: '#fff' } }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#555' },
                      '&:hover fieldset': { borderColor: '#777' },
                      '&.Mui-focused fieldset': { borderColor: '#60A5FA' },
                      backgroundColor: '#222',
                    },
                    '& .MuiInputBase-input::placeholder': {
                        color: '#B0B0B0',
                        opacity: 1,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Apellido*"
                  variant="outlined"
                  placeholder="Ingresa tu apellido"
                  InputLabelProps={{ style: { color: '#B0B0B0' } }}
                  InputProps={{ style: { color: '#fff' } }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#555' },
                      '&:hover fieldset': { borderColor: '#777' },
                      '&.Mui-focused fieldset': { borderColor: '#60A5FA' },
                      backgroundColor: '#222',
                    },
                    '& .MuiInputBase-input::placeholder': {
                        color: '#B0B0B0',
                        opacity: 1,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="E-mail*"
                  variant="outlined"
                  type="email"
                  placeholder="Ingresa tu direccion de mail"
                  InputLabelProps={{ style: { color: '#B0B0B0' } }}
                  InputProps={{ style: { color: '#fff' } }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#555' },
                      '&:hover fieldset': { borderColor: '#777' },
                      '&.Mui-focused fieldset': { borderColor: '#60A5FA' },
                      backgroundColor: '#222',
                    },
                    '& .MuiInputBase-input::placeholder': {
                        color: '#B0B0B0',
                        opacity: 1,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Numero de celular (Opcional)"
                  variant="outlined"
                  type="tel"
                  placeholder="Ingresa tu numero de celular"
                  InputLabelProps={{ style: { color: '#B0B0B0' } }}
                  InputProps={{ style: { color: '#fff' } }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#555' },
                      '&:hover fieldset': { borderColor: '#777' },
                      '&.Mui-focused fieldset': { borderColor: '#60A5FA' },
                      backgroundColor: '#222',
                    },
                    '& .MuiInputBase-input::placeholder': {
                        color: '#B0B0B0',
                        opacity: 1,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mensaje/Aspiraciones*"
                  variant="outlined"
                  multiline
                  rows={3}
                  placeholder="Escribi un mensaje..."
                  InputLabelProps={{ style: { color: '#B0B0B0' } }}
                  InputProps={{ style: { color: '#fff' } }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#555' },
                      '&:hover fieldset': { borderColor: '#777' },
                      '&.Mui-focused fieldset': { borderColor: '#60A5FA' },
                      backgroundColor: '#222',
                    },
                    '& .MuiInputBase-input::placeholder': {
                        color: '#B0B0B0',
                        opacity: 1,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    backgroundColor: '#fff',
                    color: '#000',
                    borderRadius: '999px',
                    py: 1.5,
                    px: 4,
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: '#e0e0e0',
                    },
                  }}
                >
                  Enviar tu Consulta Ahora
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: '#333', my: 6 }} />

        {/* Bottom Section: Discover, Contacts, Address, Social, Copyright */}
        <Grid container spacing={4} sx={{ fontSize: '0.875rem' }}>
          {/* DISCOVER */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
              DESCUBRI
            </Typography>
            <List dense disablePadding>
              <ListItem disablePadding sx={{ mb: 1 }}>
                {/* Use RouterLink for internal navigation, wrapped by MuiLink for styling */}
                <MuiLink component={RouterLink} to="/" color="inherit" underline="none" sx={{ color: '#B0B0B0', '&:hover': { color: '#fff' } }}>
                  <ListItemText primary="Inicio" />
                </MuiLink>
              </ListItem>
              <ListItem disablePadding sx={{ mb: 1 }}>
                <MuiLink component={RouterLink} to="/clinica" color="inherit" underline="none" sx={{ color: '#B0B0B0', '&:hover': { color: '#fff' } }}>
                  <ListItemText primary="Clinica" />
                </MuiLink>
              </ListItem>
              <ListItem disablePadding sx={{ mb: 1 }}>
                <MuiLink component={RouterLink} to="/tratamientos" color="inherit" underline="none" sx={{ color: '#B0B0B0', '&:hover': { color: '#fff' } }}>
                  <ListItemText primary="Tratamientos" />
                </MuiLink>
              </ListItem>
              <ListItem disablePadding sx={{ mb: 1 }}>
                <MuiLink component={RouterLink} to="/contacto" color="inherit" underline="none" sx={{ color: '#B0B0B0', '&:hover': { color: '#fff' } }}>
                  <ListItemText primary="Contacto" />
                </MuiLink>
              </ListItem>
            </List>
          </Grid>

          {/* CONTACTS */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
              CONTACTOS
            </Typography>
            <List dense disablePadding>
              <ListItem disablePadding sx={{ color: '#B0B0B0', mb: 1 }}>Instagram</ListItem>
              <ListItem disablePadding sx={{ color: '#B0B0B0', mb: 1 }}>Facebook</ListItem>
              <ListItem disablePadding sx={{ color: '#B0B0B0', mb: 1 }}>+598.99.016.358</ListItem>
              <ListItem disablePadding sx={{ color: '#B0B0B0', mb: 1 }}>info@guzmanripoll.com</ListItem>
            </List>
          </Grid>

          {/* DIRECTION */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
              DIRECCION
            </Typography>
            <Typography sx={{ color: '#B0B0B0', mb: 1 }}>Av. Franklin Delano Roosevelt</Typography>
            <Typography sx={{ color: '#B0B0B0' }}>20100, Punta del Este.</Typography>
          </Grid>

          {/* Back to top & Social */}
          <Grid item xs={12} sm={6} md={3} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            justifyContent: 'space-between',
          }}>
            <MuiLink
              component={RouterLink} // Use RouterLink as the underlying component
              to="#" // Or appropriate route for 'Back to top' functionality (e.g., scroll to top of page)
              color="inherit"
              underline="none"
              sx={{
                color: '#B0B0B0',
                '&:hover': { color: '#fff' },
                mb: { xs: 4, md: 0 },
              }}
            >
              Back to top
            </MuiLink>
            <Box sx={{ display: 'flex', gap: 2 }}>
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
                  '&:hover': {
                    color: '#fff',
                    borderColor: '#fff',
                  },
                }}
              >
                <LinkedInIcon fontSize="medium" />
              </MuiLink>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: '#333', my: 6 }} />

        {/* Copyright */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#B0B0B0',
          fontSize: '0.75rem',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: { xs: 2, md: 0 } }}>
            {/* Logo */}
            <Box sx={{
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
            }}>
              GZ
            </Box>
            <Typography variant="caption" sx={{ color: 'inherit' }}>GUZMÁN RIPOLL</Typography>
          </Box>
          <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
            <Typography variant="caption" sx={{ display: 'block', color: 'inherit' }}>Todos los Derechos Reservados.</Typography>
            <Typography variant="caption" sx={{ display: 'block', color: 'inherit' }}>Copyright ©2025 Guzman Ripoll</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;