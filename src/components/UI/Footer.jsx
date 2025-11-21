import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

// Logo (carpeta public/images)
import LogoGR from "/images/GR_6_Iso+Nombre_Blanco.png";

// ⬇️ NUEVO: usa tu animación standalone
import StandaloneMarqueeAnimation from "../animations/standalone-marquee-animation"; // <- ajusta la ruta si hace falta

export default function Footer() {
  const location = useLocation();

  return (
    <Box sx={{ width: "100%", bgcolor: "#000", color: "#fff", position: "relative", zIndex: 1000 }}>
      {/* ===== Mobile (xs–sm) ===== */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Box sx={{ background: "#000", position: "relative", overflow: "hidden" }}>
          <Container maxWidth="lg" sx={{ pt: 6, pb: 4, px: 3 }}>
            {/* INICIO */}
            <MuiLink
              component={RouterLink}
              to="/"
              underline="none"
              sx={{
                display: "block",
                mb: 1.5,
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                pb: 1.5
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: 500,
                  fontSize: "24px",
                  textAlign: "left",
                  color: "#fff",
                  letterSpacing: "0px",
                  "&:hover": { opacity: 0.8 }
                }}
              >
                INICIO
              </Typography>
            </MuiLink>

            {/* CLÍNICA */}
            <MuiLink
              component={RouterLink}
              to="/clinica"
              underline="none"
              sx={{
                display: "block",
                mb: 1.5,
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                pb: 1.5
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: 500,
                  fontSize: "24px",
                  textAlign: "left",
                  color: "#fff",
                  letterSpacing: "0px",
                  "&:hover": { opacity: 0.8 }
                }}
              >
                CLÍNICA
              </Typography>
            </MuiLink>

            {/* PROCEDIMIENTOS */}
            <MuiLink
              component={RouterLink}
              to="/procedimientos"
              underline="none"
              sx={{
                display: "block",
                mb: 1.5,
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                pb: 1.5
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: 500,
                  fontSize: "24px",
                  textAlign: "left",
                  color: "#fff",
                  letterSpacing: "0px",
                  "&:hover": { opacity: 0.8 }
                }}
              >
                PROCEDIMIENTOS
              </Typography>
            </MuiLink>

            {/* CONTACTO con flecha */}
            <MuiLink
              component={RouterLink}
              to="/contacto"
              underline="none"
              sx={{
                display: "block",
                mb: 6,
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                pb: 1.5
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: 500,
                  fontSize: "24px",
                  textAlign: "left",
                  color: "#fff",
                  letterSpacing: "0px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  "&:hover": { opacity: 0.8 }
                }}
              >
                <Box component="span">→</Box> CONTACTO
              </Typography>
            </MuiLink>

            {/* Contáctanos */}
            <Box sx={{ mb: 4 }}>
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: 400,
                  mb: 0.5,
                  fontSize: "18px",
                  textAlign: "left",
                  color: "#fff"
                }}
              >
                Contáctanos
              </Typography>
              <MuiLink
                href="mailto:info@guzmanripoll.com"
                underline="none"
                sx={{
                  fontFamily: 'Poppins',
                  color: "#fff",
                  fontSize: "18px",
                  fontWeight: 400,
                  "&:hover": { opacity: 0.8 }
                }}
              >
                info@guzmanripoll.com
              </MuiLink>
            </Box>

            {/* Dirección */}
            <Box sx={{ mb: 6 }}>
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: 400,
                  mb: 0.5,
                  fontSize: "18px",
                  textAlign: "left",
                  color: "#fff"
                }}
              >
                Dirección
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  color: "#fff",
                  fontSize: "18px",
                  lineHeight: 1.6,
                  fontWeight: 400,
                  textAlign: "left"
                }}
              >
                Ave. Roosevelt,
                <br />
                20100 Punta del Este
              </Typography>
            </Box>

            {/* Logo */}
            <Box sx={{ mb: 6, display: "flex", justifyContent: "flex-end" }}>
              <Box
                component="img"
                src={LogoGR}
                alt="Guzmán Ripoll"
                sx={{
                  height: 60,
                  width: "auto"
                }}
              />
            </Box>

            {/* Copyright */}
            <Box sx={{ textAlign: "right" }}>
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  color: "#fff",
                  fontWeight: 400,
                  fontSize: "14px"
                }}
              >
                © Guzmán Ripoll
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  color: "#fff",
                  fontWeight: 400,
                  fontSize: "14px"
                }}
              >
                2025 Todos los Derechos Reservados
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* ===== Desktop/Tablet (md+) ===== */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Box sx={{ width: "100%", backgroundColor: "#000", zIndex: "1000", position: "relative" }}>
          <Box
            component="footer"
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              mx: "70px",
              columnGap: "20px",
              backgroundColor: "#000",
              color: "#fff",
              py: 8,
            }}
          >
            {/* Hero + CTA (fila 1) - ahora con una columna más de ancho */}
            <Box
              sx={{
                gridColumn: "1 / 6",
                gridRow: "1",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: "4px",
              }}
            >
              <Box sx={{ display: "flex", width: "100%", textAlign: "start", flexDirection: "column" }}>
                <Typography
                  color="white"
                  fontFamily={"Poppins"}
                  fontSize={{ md: "45px", xl: "70px" }}
                  sx={{ width: "100%", letterSpacing: "-3px", lineHeight: 1.1 }}
                >
                  Lista para
                  <Typography
                    component="span"
                    fontFamily={"Poppins"}
                    fontSize={{ md: "45px", xl: "70px" }}
                    sx={{ color: "textAccent", letterSpacing: "-3px" }}
                  >
                    {" "}
                    renovar
                  </Typography>
                  <br />
                  tu imagen?
                </Typography>
              </Box>

              <Button
                component={RouterLink}
                to="/agenda"
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  backgroundColor: "#F5F5F5",
                  color: "#000",
                  borderRadius: "4px",
                  textTransform: "none",
                  py: 1,
                  px: 3,
                  fontSize: "14px",
                  "&:hover": { backgroundColor: "#E0E0E0" },
                }}
              >
                Agendate
              </Button>
            </Box>

            {/* Formulario (fila 1, derecha) */}
            <Box sx={{ gridColumn: "8 / 13", gridRow: "1" }}>
              <Box sx={{ display: "flex", width: "100%" }}>
                <Box component="form" noValidate autoComplete="off">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      justifyContent: "space-between",
                      alignItems: { xs: "flex-start", md: "flex-start" },
                      gap: { xs: "12px", md: 0 },
                      mb: { xs: "24px", md: 3 },
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontSize: { xs: "15px", md: "16px" }, lineHeight: 1.4 }}>
                      Agenda tu consulta y descubrí cómo podemos renovar tu vida.
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#B0B0B0", fontSize: { xs: "13px", md: "14px" } }}>
                      *Campos Requeridos
                    </Typography>
                  </Box>

                  {[
                    { name: "firstName", label: "Primer Nombre*", placeholder: "Ingresa tu primer nombre", type: "text" },
                    { name: "lastName", label: "Apellido*", placeholder: "Ingresa tu apellido", type: "text" },
                    { name: "email", label: "E-mail*", placeholder: "Ingresa tu dirección de mail", type: "email" },
                    { name: "phone", label: "Número de celular (Opcional)", placeholder: "Ingresa tu número de celular", type: "tel" },
                  ].map((field) => (
                    <TextField
                      key={field.name}
                      fullWidth
                      variant="standard"
                      type={field.type}
                      label={field.label}
                      placeholder={field.placeholder}
                      InputLabelProps={{ shrink: true, sx: { color: "#B0B0B0" } }}
                      InputProps={{ disableUnderline: false, sx: { color: "#fff" } }}
                      sx={{
                        mb: { xs: "20px", md: 3 },
                        "& .MuiInputLabel-root": { fontSize: { xs: "14px", md: "16px" } },
                        "& .MuiInputBase-input": { fontSize: { xs: "15px", md: "16px" } },
                        "& .MuiInput-underline:before": { borderBottomColor: "#555" },
                        "&:hover .MuiInput-underline:before": { borderBottomColor: "#777" },
                        "& .MuiInput-underline:after": { borderBottomColor: "#60A5FA" },
                        "& .MuiInputBase-input::placeholder": { color: "#B0B0B0", opacity: 1 },
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
                    InputLabelProps={{ shrink: true, sx: { color: "#B0B0B0" } }}
                    InputProps={{ disableUnderline: false, sx: { color: "#fff" } }}
                    sx={{
                      mb: { xs: "24px", md: 4 },
                      "& .MuiInputLabel-root": { fontSize: { xs: "14px", md: "16px" } },
                      "& .MuiInputBase-input": { fontSize: { xs: "15px", md: "16px" } },
                      "& .MuiInput-underline:before": { borderBottomColor: "#555" },
                      "&:hover .MuiInput-underline:before": { borderBottomColor: "#777" },
                      "& .MuiInput-underline:after": { borderBottomColor: "#60A5FA" },
                      "& .MuiInputBase-input::placeholder": { color: "#B0B0B0", opacity: 1 },
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: "#F5F5F5",
                      color: "#000",
                      borderRadius: "4px",
                      textTransform: "none",
                      py: { xs: 1.5, md: 1.5 },
                      fontSize: { xs: "16px", md: "15px" },
                      fontWeight: "bold",
                      "&:hover": { backgroundColor: "#E0E0E0" },
                    }}
                  >
                    Enviar tu Consulta Ahora
                  </Button>
                </Box>
              </Box>
            </Box>

            {/* ===== Fila 2: columnas de información (ajustadas) ===== */}
            <Box sx={{ gridColumn: "1 / 3", gridRow: "2", mt: -8 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, fontSize: "20px", textAlign: "left" }}>
                DESCUBRÍ
              </Typography>
              <List disablePadding dense>
                {[
                  { to: "/", text: "Inicio" },
                  { to: "/clinica", text: "Clínica" },
                  { to: "/tratamientos", text: "Tratamientos" },
                  { to: "/contacto", text: "Contacto" },
                ].map((link) => {
                  const isActive = location.pathname === link.to;
                  return (
                    <ListItem key={link.text} disablePadding sx={{ mb: 1.5 }}>
                      <MuiLink
                        component={RouterLink}
                        to={link.to}
                        underline="none"
                        sx={{
                          color: isActive ? "#fff" : "#B0B0B0",
                          fontSize: "16px",
                          fontWeight: isActive ? 600 : 500,
                          "&:hover": { color: "#fff" }
                        }}
                      >
                        {link.text}
                      </MuiLink>
                    </ListItem>
                  );
                })}
              </List>
            </Box>

            {/* CONTACTOS: columna 3-6 */}
            <Box sx={{ gridColumn: "3 / 6", gridRow: "2", mt: -8 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, fontSize: "20px", textAlign: "left" }}>
                CONTACTOS
              </Typography>
              <List disablePadding dense>
                {["Instagram", "Facebook", "+598.99.016.358", "info@guzmanripoll.com"].map((item) => (
                  <ListItem key={item} disablePadding sx={{ color: "#B0B0B0", mb: 1.5, fontSize: "16px", fontWeight: 500 }}>
                    {item}
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* UBICACIÓN: debajo de DESCUBRÍ, alineada a la izquierda */}
            <Box sx={{ gridColumn: "1 / 3", gridRow: "3", mt: 0 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, fontSize: "20px", textAlign: "left" }}>
                UBICACIÓN
              </Typography>
              <Typography sx={{ color: "#B0B0B0", fontSize: "16px", lineHeight: 1.6, fontWeight: 500, textAlign: "left" }}>
                Punta del Este, Uruguay
              </Typography>
            </Box>

            {/* Bottom - sin divider */}
            <Box sx={{ gridColumn: "1 / 13", gridRow: "4", mt: 12 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 4 }}>
                {/* Logo */}
                <Box display="flex" alignItems="center">
                  <Box component="img" src="/images/GR_9_Isologo_Blanco.png" alt="Guzmán Ripoll" sx={{ height: 32, width: "auto" }} />
                </Box>

                {/* Textos del copyright con más bold */}
                <Box display="flex" gap={4}>
                  <Typography variant="caption" sx={{ color: "#B0B0B0", fontSize: "12px", fontWeight: 700 }}>
                    Todos los Derechos Reservados.
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#B0B0B0", fontSize: "12px", fontWeight: 700 }}>
                    Copyright ©2025 Guzman Ripoll
                  </Typography>
                </Box>

                {/* LinkedIn */}
                <MuiLink
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "#B0B0B0",
                    border: "1px solid #B0B0B0",
                    borderRadius: "4px",
                    p: 0.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": { color: "#fff", borderColor: "#fff" },
                  }}
                >
                  <LinkedInIcon fontSize="small" />
                </MuiLink>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
