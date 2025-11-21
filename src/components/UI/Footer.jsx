import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Box,
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
import LogoGRColor from "/images/GR_6_Iso+Nombre.png";

// ⬇️ NUEVO: usa tu animación standalone
import StandaloneMarqueeAnimation from "../animations/standalone-marquee-animation"; // <- ajusta la ruta si hace falta

export default function Footer({ variant = 'default' }) {
  const location = useLocation();

  // Configuración según variante
  const isContact = variant === 'contact';
  const bgColor = isContact ? '#F2F2F2' : '#000';
  const textColor = isContact ? '#000' : '#fff';
  const logo = isContact ? LogoGRColor : LogoGR;

  return (
    <Box sx={{ width: "100%", bgcolor: bgColor, color: textColor, position: "relative", zIndex: 1000 }}>
      {/* ===== Mobile (xs–sm) ===== */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Box sx={{ background: bgColor, position: "relative", overflow: "hidden", px: 3, pt: 4 }}>
          {/* Línea superior respetando márgenes */}
          <Box sx={{
            width: "100%",
            height: "1px",
            backgroundColor: textColor,
            mb: 5
          }} />

          {/* Sin Container para usar todo el ancho con padding manual */}
          <Box sx={{ pb: 6, position: "relative" }}>
            {/* Logo pegado al borde derecho respetando márgenes */}
            <Box sx={{
              position: "absolute",
              top: 0,
              right: 0,
              display: "flex",
              alignItems: "flex-start"
            }}>
              <Box
                component="img"
                src={logo}
                alt="Guzmán Ripoll"
                sx={{
                  height: { xs: 45, sm: 55 },
                  width: "auto"
                }}
              />
            </Box>

            {/* INICIO */}
            <MuiLink
              component={RouterLink}
              to="/"
              underline="none"
              sx={{ display: "block", mb: 1.5 }}
            >
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  fontSize: { xs: "28px", sm: "32px" },
                  textAlign: "left",
                  color: textColor,
                  letterSpacing: "-0.5px",
                  lineHeight: 1.2,
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
              sx={{ display: "block", mb: 1.5 }}
            >
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  fontSize: { xs: "28px", sm: "32px" },
                  textAlign: "left",
                  color: textColor,
                  letterSpacing: "-0.5px",
                  lineHeight: 1.2,
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
              sx={{ display: "block", mb: 1.5 }}
            >
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  fontSize: { xs: "28px", sm: "32px" },
                  textAlign: "left",
                  color: textColor,
                  letterSpacing: "-0.5px",
                  lineHeight: 1.2,
                  "&:hover": { opacity: 0.8 }
                }}
              >
                PROCEDIMIENTOS
              </Typography>
            </MuiLink>

            {/* CONTACTO con flecha más compacta */}
            <MuiLink
              component={RouterLink}
              to="/contacto"
              underline="none"
              sx={{ display: "block", mb: 5 }}
            >
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  fontSize: { xs: "28px", sm: "32px" },
                  textAlign: "left",
                  color: textColor,
                  letterSpacing: "-0.5px",
                  lineHeight: 1.2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  "&:hover": { opacity: 0.8 }
                }}
              >
                <Box component="span" sx={{ fontSize: "inherit" }}>→</Box>CONTACTO
              </Typography>
            </MuiLink>

            {/* Contáctanos */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  mb: 0.2,
                  fontSize: { xs: "16px", sm: "18px" },
                  textAlign: "left",
                  color: textColor,
                  lineHeight: 1.3
                }}
              >
                Contáctanos
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  color: textColor,
                  fontSize: { xs: "16px", sm: "18px" },
                  fontWeight: 400,
                  textAlign: "left",
                  lineHeight: 1.3,
                  "&:hover": { opacity: 0.8 }
                }}
              >
                <MuiLink
                  href="mailto:info@guzmanripoll.com"
                  underline="none"
                  sx={{
                    color: "inherit",
                    fontSize: "inherit",
                    fontWeight: "inherit"
                  }}
                >
                  info@guzmanripoll.com
                </MuiLink>
              </Typography>
            </Box>

            {/* Dirección e Copyright en grid */}
            <Box sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
              mb: 0
            }}>
              {/* Dirección - Izquierda */}
              <Box>
                <Typography
                  sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 600,
                    mb: 0.2,
                    fontSize: { xs: "16px", sm: "18px" },
                    textAlign: "left",
                    color: textColor,
                    lineHeight: 1.3
                  }}
                >
                  Dirección
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Poppins',
                    color: textColor,
                    fontSize: { xs: "16px", sm: "18px" },
                    lineHeight: 1.3,
                    fontWeight: 400,
                    textAlign: "left"
                  }}
                >
                  Ave. Roosevelt,
                  <br />
                  20100 Punta del Este
                </Typography>
              </Box>

              {/* Copyright - Derecha */}
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                <Typography
                  sx={{
                    fontFamily: 'Poppins',
                    color: textColor,
                    fontWeight: 400,
                    fontSize: { xs: "16px", sm: "18px" },
                    lineHeight: 1.3,
                    textAlign: "right"
                  }}
                >
                  © Guzmán Ripoll
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Poppins',
                    color: textColor,
                    fontWeight: 400,
                    fontSize: { xs: "16px", sm: "18px" },
                    lineHeight: 1.3,
                    textAlign: "right"
                  }}
                >
                  2025 Todos los Derechos Reservados
                </Typography>
              </Box>
            </Box>
          </Box>
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

            {/* Bottom - ultra clean con línea divisoria */}
            <Box sx={{ gridColumn: "1 / 13", gridRow: "4", mt: 12 }}>
              {/* Línea divisoria blanca */}
              <Box sx={{
                width: "100%",
                height: "1px",
                backgroundColor: "#fff",
                mb: 4
              }} />

              {/* Contenido alineado a la derecha - ultra clean */}
              <Box sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 3
              }}>
                {/* Textos del copyright */}
                <Typography variant="caption" sx={{
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.5px"
                }}>
                  Todos los Derechos Reservados.
                </Typography>
                <Typography variant="caption" sx={{
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.5px"
                }}>
                  Copyright ©2025 Guzman Ripoll
                </Typography>

                {/* LinkedIn */}
                <MuiLink
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "#fff",
                    border: "1px solid #fff",
                    borderRadius: "4px",
                    p: 0.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      opacity: 0.7,
                    },
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
