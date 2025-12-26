import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Link as MuiLink } from "@mui/material";

import LogoIso from "/images/GR_9_Isologo.png";

const COLORS = {
  cardBg: "#E8E8E8",
  textDark: "#1a1a1a",
  accent: "#0066cc",
};

const navLinks = [
  { to: "/", text: "Inicio" },
  { to: "/clinica", text: "Clínica" },
  { to: "/procedimientos", text: "Procedimientos" },
  { to: "/resultados", text: "Resultados" },
  { to: "/contacto", text: "Contacto ↗" },
];

const contactInfo = [
  { text: "+598.99.016.358", type: "text" },
  { text: "info@guzmanripoll.com", type: "email" },
  { text: "Punta del Este, Uruguay", type: "text" },
];

const legalLinks = [
  { to: "/privacidad", text: "Política de privacidad" },
];

const socialLinks = [
  { href: "https://instagram.com/guzmanripoll", text: "Instagram" },
  { href: "https://wa.me/59899016358", text: "WhatsApp" },
  { href: "https://facebook.com/guzmanripoll", text: "Facebook" },
];

const linkStyles = {
  fontFamily: "Poppins",
  fontSize: "13px",
  color: "#1a1a1a",
  position: "relative",
  display: "block",
  width: "fit-content",
  textDecoration: "none",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -2,
    left: 0,
    width: "0%",
    height: "1px",
    backgroundColor: "#0066cc",
    transition: "width 0.3s ease",
  },
  "&:hover": {
    color: "#0066cc",
    "&::after": {
      width: "100%",
    },
  },
};

const titleStyles = {
  fontFamily: "Poppins",
  fontSize: "13px",
  fontWeight: 600,
  color: "#1a1a1a",
  mb: 0.5,
  textAlign: "left",
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={{ width: "100%", px: { xs: "16px", md: "20px" }, pb: { xs: "16px", md: "20px" } }}>
      <Box
        component="footer"
        sx={{
          bgcolor: COLORS.cardBg,
          borderRadius: { xs: "20px", md: "24px" },
          overflow: "hidden",
        }}
      >
        {/* ===== Mobile ===== */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <Box sx={{ px: "24px", pt: "32px", pb: "24px" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}>
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: COLORS.accent,
                }}
              />
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: COLORS.accent,
                }}
              >
                FOOTER
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 6 }}>
              <Box sx={{ minWidth: "110px" }}>
                <Typography sx={{ ...titleStyles, fontSize: "13px" }}>Navegación</Typography>
                {navLinks.map((link) => (
                  <MuiLink
                    key={link.to}
                    component={RouterLink}
                    to={link.to}
                    underline="none"
                    sx={{ ...linkStyles, fontSize: "12px" }}
                  >
                    {link.text}
                  </MuiLink>
                ))}
              </Box>

              <Box sx={{ minWidth: "140px", ml: 4 }}>
                <Typography sx={{ ...titleStyles, fontSize: "13px" }}>Contacto</Typography>
                {contactInfo.map((item, index) =>
                  item.type === "email" ? (
                    <MuiLink
                      key={index}
                      href={`mailto:${item.text}`}
                      underline="none"
                      sx={{ ...linkStyles, fontSize: "12px" }}
                    >
                      {item.text}
                    </MuiLink>
                  ) : (
                    <Typography
                      key={index}
                      sx={{ fontFamily: "Poppins", fontSize: "12px", color: COLORS.textDark, textAlign: "left" }}
                    >
                      {item.text}
                    </Typography>
                  )
                )}
              </Box>

              <Box sx={{ ml: 4 }}>
                <Typography sx={{ ...titleStyles, fontSize: "13px" }}>Legal</Typography>
                {legalLinks.map((link) => (
                  <MuiLink
                    key={link.to}
                    component={RouterLink}
                    to={link.to}
                    underline="none"
                    sx={{ ...linkStyles, fontSize: "12px" }}
                  >
                    {link.text}
                  </MuiLink>
                ))}
              </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <Box
                component="img"
                src={LogoIso}
                alt="Guzmán Ripoll"
                sx={{ height: 40, width: "auto" }}
              />
              <Box sx={{ textAlign: "right" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 0.5, mb: 1 }}>
                  {socialLinks.map((link, index) => (
                    <React.Fragment key={link.text}>
                      <MuiLink
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="none"
                        sx={{ ...linkStyles, fontSize: "11px", display: "inline-block" }}
                      >
                        {link.text}
                      </MuiLink>
                      {index < socialLinks.length - 1 && (
                        <Typography sx={{ color: COLORS.textDark, mx: 0.5, fontSize: "11px" }}>·</Typography>
                      )}
                    </React.Fragment>
                  ))}
                </Box>
                <Typography sx={{ fontFamily: "Poppins", fontSize: "11px", color: COLORS.textDark }}>
                  © Guzmán Ripoll {currentYear}.
                </Typography>
                <Typography sx={{ fontFamily: "Poppins", fontSize: "11px", color: COLORS.textDark }}>
                  Todos los derechos reservados.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ===== Desktop ===== */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              columnGap: "20px",
              px: "70px",
              pt: "60px",
              pb: "40px",
            }}
          >
            {/* ROW 1: FOOTER label */}
            <Box sx={{ gridColumn: "1 / 2", textAlign: "left" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: COLORS.accent,
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: COLORS.accent,
                  }}
                >
                  FOOTER
                </Typography>
              </Box>
            </Box>

            {/* ROW 1: Navegación - Columnas 7-8 */}
            <Box sx={{ gridColumn: "7 / 9", textAlign: "left" }}>
              <Typography sx={titleStyles}>Navegación</Typography>
              {navLinks.map((link) => (
                <MuiLink
                  key={link.to}
                  component={RouterLink}
                  to={link.to}
                  underline="none"
                  sx={linkStyles}
                >
                  {link.text}
                </MuiLink>
              ))}
            </Box>

            {/* ROW 1: Contacto - Columnas 9-10 */}
            <Box sx={{ gridColumn: "9 / 11", textAlign: "left" }}>
              <Typography sx={titleStyles}>Contacto</Typography>
              {contactInfo.map((item, index) =>
                item.type === "email" ? (
                  <MuiLink
                    key={index}
                    href={`mailto:${item.text}`}
                    underline="none"
                    sx={linkStyles}
                  >
                    {item.text}
                  </MuiLink>
                ) : (
                  <Typography
                    key={index}
                    sx={{ fontFamily: "Poppins", fontSize: "13px", color: COLORS.textDark, textAlign: "left" }}
                  >
                    {item.text}
                  </Typography>
                )
              )}
            </Box>

            {/* ROW 1: Legal - Columnas 11-12 */}
            <Box sx={{ gridColumn: "11 / 13", textAlign: "left" }}>
              <Typography sx={titleStyles}>Legal</Typography>
              {legalLinks.map((link) => (
                <MuiLink
                  key={link.to}
                  component={RouterLink}
                  to={link.to}
                  underline="none"
                  sx={linkStyles}
                >
                  {link.text}
                </MuiLink>
              ))}
            </Box>

            {/* ROW 2: Logo */}
            <Box sx={{ gridColumn: "1 / 3", mt: 8, alignSelf: "end", textAlign: "left" }}>
              <Box
                component="img"
                src={LogoIso}
                alt="Guzmán Ripoll"
                sx={{ height: 45, width: "auto", display: "block" }}
              />
            </Box>

            {/* ROW 2: Social - alineado con Navegación */}
            <Box sx={{ gridColumn: "7 / 11", mt: 8, alignSelf: "end", textAlign: "left" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {socialLinks.map((link, index) => (
                  <React.Fragment key={link.text}>
                    <MuiLink
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="none"
                      sx={{ ...linkStyles, display: "inline-block" }}
                    >
                      {link.text}
                    </MuiLink>
                    {index < socialLinks.length - 1 && (
                      <Typography sx={{ color: COLORS.textDark, mx: 1, fontSize: "13px" }}>·</Typography>
                    )}
                  </React.Fragment>
                ))}
              </Box>
            </Box>

            {/* ROW 2: Copyright - alineado con Legal */}
            <Box sx={{ gridColumn: "11 / 13", mt: 8, alignSelf: "end", textAlign: "left" }}>
              <Typography sx={{ fontFamily: "Poppins", fontSize: "13px", color: COLORS.textDark, textAlign: "left" }}>
                © Guzmán Ripoll {currentYear}.
              </Typography>
              <Typography sx={{ fontFamily: "Poppins", fontSize: "13px", color: COLORS.textDark, textAlign: "left" }}>
                Todos los derechos reservados.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}