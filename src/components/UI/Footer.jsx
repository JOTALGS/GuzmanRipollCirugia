import React, { useLayoutEffect, useRef, useState } from "react";
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
  Grid,
  TextField,
  Divider,
  useTheme,
  keyframes,
  IconButton,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

// Logo original (carpeta public/images)
import LogoGR from "/images/GR_6_Iso+Nombre_Blanco.png";

/* ===== Cinta infinita (duplicamos contenido y desplazamos -50%) ===== */
const scrollLeft = keyframes`
  0%   { transform: translate3d(0,0,0); }
  100% { transform: translate3d(-50%,0,0); }
`;

export default function Footer() {
  const theme = useTheme();

  const [marqueeDuration, setMarqueeDuration] = useState(20);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const measure = () => {
      const total = el.scrollWidth;
      const single = total / 2;
      const speedPxPerSec = 60;
      const secs = Math.max(8, Math.min(120, single / speedPxPerSec));
      setMarqueeDuration(secs);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <Box sx={{ width: "100%", bgcolor: "#000", color: "#fff", position: "relative", zIndex: 1000 }}>
      {/* ===== Mobile (xs–sm) — minimalista con cinta y gradiente de marca ===== */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Box
          sx={{
            background: "#000", // Negro
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Container maxWidth="lg" sx={{ pt: 5, pb: 3 }}>
            {/* Logo */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3.5 }}>
              <Box component="img" src={LogoGR} alt="Guzmán Ripoll" sx={{ height: 44, width: "auto" }} />
            </Box>

            {/* Cinta infinita */}
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                py: 2,
                mb: 4,
                maskImage: "linear-gradient(to right, transparent, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, transparent)",
              }}
            >
              <Box
                ref={trackRef}
                sx={{
                  display: "flex",
                  willChange: "transform",
                  animation: `${scrollLeft} ${marqueeDuration}s linear infinite`,
                  "@media (prefers-reduced-motion: reduce)": { animationPlayState: "paused" },
                }}
              >
                {/* Bloque A */}
                <Box sx={{ display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}>
                  {Array(10).fill("Agenda tu consulta").map((txt, idx) => (
                    <Typography
                      key={idx}
                      component="span"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: 36, sm: 44 },
                        lineHeight: 1.1,
                        marginRight: { xs: 3, sm: 4 },
                      }}
                    >
                      {txt}&nbsp;&nbsp;*&nbsp;&nbsp;
                    </Typography>
                  ))}
                </Box>
                {/* Bloque A duplicado */}
                <Box sx={{ display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}>
                  {Array(10).fill("Agenda tu consulta").map((txt, idx) => (
                    <Typography
                      key={idx}
                      component="span"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: 36, sm: 44 },
                        lineHeight: 1.1,
                        marginRight: { xs: 3, sm: 4 },
                      }}
                    >
                      {txt}&nbsp;&nbsp;*&nbsp;&nbsp;
                    </Typography>
                  ))}
                </Box>
              </Box>
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
                  letterSpacing: 0,
                  lineHeight: 1.2,
                  display: "inline-block",
                  "&:hover": { opacity: 0.9 },
                }}
              >
                info@guzmanripoll.com
              </MuiLink>
            </Box>

            {/* Redes */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2.5, mb: 3.5 }}>
              <MuiLink
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#fff", "&:hover": { opacity: 0.8 } }}
              >
                <InstagramIcon fontSize="medium" />
              </MuiLink>
              <MuiLink
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#fff", "&:hover": { opacity: 0.8 } }}
              >
                <LinkedInIcon fontSize="medium" />
              </MuiLink>
              <MuiLink
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "#fff", "&:hover": { opacity: 0.8 } }}
              >
                <FacebookIcon fontSize="medium" />
              </MuiLink>
            </Box>

            {/* Copy sin botón */}
            <Box
              sx={{
                borderTop: "1px dashed rgba(255,255,255,0.45)",
                pt: 2,
                pb: 3,
              }}
            >
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.92)", fontWeight: 600 }}>
                © 2025 Guzmán Ripoll — Todos los derechos reservados
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* ===== Desktop/Tablet (md+) — tu bloque original sin tocar ===== */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Box sx={{ width: "100%", backgroundColor: "#000", zIndex: "1000", position: "relative" }}>
          <Box
            component="footer"
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" },
              mx: { xs: "15px", md: "70px" },
              gap: { xs: "32px", md: "20px" },
              backgroundColor: "#000",
              color: "#fff",
              py: { xs: "48px", md: 8 },
            }}
          >
            <Box
              sx={{
                gridColumn: { xs: "1 / 1", md: "1 / 5" },
                gridRow: { xs: "1 / 1", md: "1 / 1" },
                mx: { xs: 0, md: 4 },
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: { xs: "12px", md: "4px" },
              }}
            >
              <Box sx={{ display: "flex", width: "100%", textAlign: "start", flexDirection: "column" }}>
                <Typography
                  color="white"
                  fontFamily={"Poppins"}
                  fontSize={{ xs: "32px", sm: "36px", md: "45px", xl: "55px" }}
                  sx={{ width: "100%", letterSpacing: { xs: "-1.5px", md: "-3px" }, lineHeight: { xs: 1.2, md: 1.1 } }}
                >
                  Lista para
                  <Typography
                    component="span"
                    fontFamily={"Poppins"}
                    fontSize={{ xs: "32px", sm: "36px", md: "45px", xl: "55px" }}
                    sx={{ color: "textAccent", letterSpacing: { xs: "-1.5px", md: "-3px" } }}
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
                  py: { xs: 1.5, md: 1 },
                  px: { xs: 4, md: 3 },
                  fontSize: { xs: "16px", md: "14px" },
                  "&:hover": { backgroundColor: "#E0E0E0" },
                }}
              >
                Agendate
              </Button>
            </Box>

            <Box
              sx={{
                gridColumn: { xs: "1 / 1", md: "7 / 13" },
                gridRow: { xs: "2 / 2", md: "1 / 1" },
                mx: { xs: 0, md: 4 },
              }}
            >
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

            <Box sx={{ gridColumn: "1 / 13", gridRow: "2 / 2", mx: { xs: 1, md: 4 } }}>
              <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.15)", borderStyle: "dotted", borderWidth: "1px", my: { xs: "32px", md: 6 } }} />

              <Grid container spacing={{ xs: 3, md: 2.5 }} sx={{ fontSize: "0.875rem" }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
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
                          <ListItemText primary={link.text} />
                        </MuiLink>
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                    CONTACTOS
                  </Typography>
                  <List disablePadding dense>
                    {["Instagram", "Facebook", "+598.99.016.358", "info@guzmanripoll.com"].map((item) => (
                      <ListItem key={item} disablePadding sx={{ color: "#B0B0B0", mb: 1 }}>
                        {item}
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                    DIRECCIÓN
                  </Typography>
                  <Grid container>
                    <Grid item xs={8}>
                      <Typography sx={{ color: "#B0B0B0" }}>Av. Franklin Delano Roosevelt</Typography>
                      <Typography sx={{ color: "#B0B0B0" }}>20100, Punta del Este.</Typography>
                    </Grid>
                    <Grid item xs={4} textAlign="right">
                      <MuiLink component={RouterLink} to="#" sx={{ color: "#B0B0B0", "&:hover": { color: "#fff" } }}>
                        Back to top ↑
                      </MuiLink>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", md: "center" },
                  gap: { xs: "20px", md: 0 },
                  mt: { xs: "32px", md: 6 },
                }}
              >
                {/* Bottom original */}
                <Box display="flex" alignItems="center" gap={1}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      backgroundColor: "#fff",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      color: "#000",
                      fontSize: "0.75rem",
                    }}
                  >
                    GZ
                  </Box>
                  <Typography variant="caption">GUZMÁN RIPOLL</Typography>
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

                <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={{ xs: 1, md: 4 }}>
                  <Typography variant="caption" sx={{ color: "#B0B0B0", fontSize: { xs: "13px", md: "12px" } }}>
                    Todos los Derechos Reservados.
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#B0B0B0", fontSize: { xs: "13px", md: "12px" } }}>
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
