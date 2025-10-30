import React from "react";
import { Link as RouterLink } from "react-router-dom";
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
  Divider,
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
  return (
    <Box sx={{ width: "100%", bgcolor: "#000", color: "#fff", position: "relative", zIndex: 1000 }}>
      {/* ===== Mobile (xs–sm) — reemplazo total por tu animación ===== */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Box sx={{ background: "#000", position: "relative", overflow: "hidden" }}>
          <Container maxWidth="lg" sx={{ pt: 8, pb: 3 }}>
            {/* Logo */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
              <Box component="img" src={LogoGR} alt="Guzmán Ripoll" sx={{ height: 44, width: "auto" }} />
            </Box>

            {/* ⬇️ Tu animación (sustituye la cinta infinita rota) */}
            <Box sx={{ mb: 4 }}>
              <StandaloneMarqueeAnimation />
            </Box>

            {/* Mail grande y legible */}
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <MuiLink
                href="mailto:info@guzmanripoll.com"
                sx={{
                  color: "#fff",
                  textDecoration: "underline",
                  textDecorationThickness: "2px",
                  textUnderlineOffset: "6px",
                  fontSize: { xs: 24, sm: 28 },
                  fontWeight: 700,
                  lineHeight: 1.5,
                  display: "inline-block",
                  "&:hover": { opacity: 0.9 },
                }}
              >
                info@guzmanripoll.com
              </MuiLink>
            </Box>

            {/* Redes */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2.5, mb: 3.5 }}>
              <MuiLink href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" sx={{ color: "#fff", "&:hover": { opacity: 0.8 } }}>
                <InstagramIcon fontSize="medium" />
              </MuiLink>
              <MuiLink href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" sx={{ color: "#fff", "&:hover": { opacity: 0.8 } }}>
                <LinkedInIcon fontSize="medium" />
              </MuiLink>
              <MuiLink href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" sx={{ color: "#fff", "&:hover": { opacity: 0.8 } }}>
                <FacebookIcon fontSize="medium" />
              </MuiLink>
            </Box>

            {/* Copy */}
            <Box sx={{ borderTop: "1px dashed rgba(255,255,255,0.45)", pt: 2, pb: 3 }}>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.92)", fontWeight: 600 }}>
                © 2025 Guzmán Ripoll — Todos los derechos reservados
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
            {/* Hero + CTA (fila 1) */}
            <Box
              sx={{
                gridColumn: "1 / 5",
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
                  fontSize={{ md: "45px", xl: "55px" }}
                  sx={{ width: "100%", letterSpacing: "-3px", lineHeight: 1.1 }}
                >
                  Lista para
                  <Typography
                    component="span"
                    fontFamily={"Poppins"}
                    fontSize={{ md: "45px", xl: "55px" }}
                    sx={{ color: "textAccent", letterSpacing: "-3px" }}
                  >
                    {" "}
                    Renovar
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
            <Box sx={{ gridColumn: "7 / 13", gridRow: "1" }}>
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
            <Box sx={{ gridColumn: "1 / 3", gridRow: "2", mt: 6 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1, fontSize: "14px" }}>
                DESCUBRÍ
              </Typography>
              <List disablePadding dense>
                {[
                  { to: "/", text: "Inicio" },
                  { to: "/clinica", text: "Clínica" },
                  { to: "/tratamientos", text: "Tratamientos" },
                  { to: "/contacto", text: "Contacto" },
                ].map((link) => (
                  <ListItem key={link.text} disablePadding sx={{ mb: 1 }}>
                    <MuiLink component={RouterLink} to={link.to} underline="none" sx={{ color: "#B0B0B0", "&:hover": { color: "#fff" } }}>
                      <ListItemText primary={link.text} primaryTypographyProps={{ fontSize: "14px" }} />
                    </MuiLink>
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* CONTACTOS: columna 3-5 */}
            <Box sx={{ gridColumn: "3 / 6", gridRow: "2", mt: 6 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1, fontSize: "14px" }}>
                CONTACTOS
              </Typography>
              <List disablePadding dense>
                {["Instagram", "Facebook", "+598.99.016.358", "info@guzmanripoll.com"].map((item) => (
                  <ListItem key={item} disablePadding sx={{ color: "#B0B0B0", mb: 1, fontSize: "14px" }}>
                    {item}
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Divider */}
            <Box sx={{ gridColumn: "1 / 13", gridRow: "3" }}>
              <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.15)", borderStyle: "dotted", borderWidth: "1px", my: 6 }} />
            </Box>

            {/* Bottom */}
            <Box sx={{ gridColumn: "1 / 13", gridRow: "4" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 4 }}>
                {/* Logo */}
                <Box display="flex" alignItems="center">
                  <Box component="img" src="/images/GR_9_Isologo_Blanco.png" alt="Guzmán Ripoll" sx={{ height: 32, width: "auto" }} />
                </Box>

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

                <Box display="flex" gap={4}>
                  <Typography variant="caption" sx={{ color: "#B0B0B0", fontSize: "12px" }}>
                    Todos los Derechos Reservados.
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#B0B0B0", fontSize: "12px" }}>
                    Copyright ©2025 Guzman Ripoll
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
