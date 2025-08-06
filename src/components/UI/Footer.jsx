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
    <Box
      component="footer"
      sx={{
        backgroundColor: '#000',
        color: '#fff',
        py: { xs: 4, md: 8 },
      }}
    >
      {/* full‑width container with 70px margins and 20px gutters */}
      <Container
        disableGutters
        maxWidth={false}
        sx={{ px: '70px' }}
      >
        {/* Top Hero + Form */}
        <Grid container spacing={2.5} alignItems="flex-start">
          {/* Left: Headline + CTA */}
          <Grid item xs={12} md={6} lg={5}>
            <Typography
              variant="h3"
              component="h2"
              sx={{ fontWeight: 'bold', lineHeight: 1.1 }}
            >
              Lista para{' '}
              <Box component="span" sx={{ color: '#60A5FA' }}>
                Renovar
              </Box>
            </Typography>
            <Typography
              variant="h3"
              component="h2"
              sx={{ fontWeight: 'bold', mb: 3, lineHeight: 1.1 }}
            >
              tu imagen?
            </Typography>
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
                py: 1,
                px: 3,
                '&:hover': { backgroundColor: '#E0E0E0' },
              }}
            >
              Agendate
            </Button>
          </Grid>

          {/* Right: Form */}
          <Grid item xs={12} md={6} lg={7}>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ maxWidth: 500, mx: 'auto' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  mb: 3,
                }}
              >
                <Typography variant="subtitle1">
                  Agenda tu consulta y descubrí cómo podemos renovar tu vida.
                </Typography>
                <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
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
                    mb: 3,
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
                  mb: 4,
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
                  py: 1.5,
                  fontWeight: 'bold',
                  '&:hover': { backgroundColor: '#E0E0E0' },
                }}
              >
                Enviar tu Consulta Ahora
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: '#333', my: 6 }} />

        {/* Nav Links */}
        <Grid container spacing={2.5} sx={{ fontSize: '0.875rem' }}>
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
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 6,
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
          <Box display="flex" gap={4}>
            <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
              Todos los Derechos Reservados.
            </Typography>
            <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
              Copyright ©2025 Guzman Ripoll
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
