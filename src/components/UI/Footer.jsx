import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Link as MuiLink } from "@mui/material";

const COLORS = {
  textDark: "#000000",
  textGrey: "#666666",
  textLightGrey: "#999999",
};

const navLinks = [
  { to: "/", text: "inicio" },
  { to: "/clinica", text: "clínica" },
  { to: "/procedimientos", text: "procedimientos" },
  { to: "/resultados", text: "resultados" },
  { to: "/contacto", text: "contacto" },
];

const realContactInfo = [
  { text: "punta del este, uruguay", type: "text" },
];

const phoneInfo = [
  { text: "+598 99 016 358", type: "phone" },
];

const emailInfo = [
  { text: "info@guzmanripoll.com", type: "email" },
];

const socialLinks = [
  { href: "https://instagram.com/guzmanripoll", text: "instagram" },
  { href: "https://linkedin.com", text: "linkedin" },
  { href: "https://facebook.com/guzmanripoll", text: "facebook" },
];

const linkStyles = {
  fontFamily: "Poppins, sans-serif",
  fontSize: "16px",
  color: COLORS.textDark,
  textDecoration: "none",
  display: "block",
  lineHeight: "1.5",
  fontWeight: 500,
  textTransform: "lowercase",
  "&:hover": {
    opacity: 0.7,
  },
};

const textStyles = {
  fontFamily: "Poppins, sans-serif",
  fontSize: "16px",
  color: COLORS.textDark,
  lineHeight: "1.5",
  fontWeight: 500,
  textTransform: "lowercase",
};

const labelStyles = {
  fontFamily: "Poppins, sans-serif",
  fontSize: "16px",
  color: COLORS.textDark,
  fontWeight: 600,
  textTransform: "uppercase",
};

const SectionRow = ({ label, children, noMargin }) => (
  <Box sx={{
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "10px",
    mb: noMargin ? "15px" : "40px", // Reduced margin for info sections
    alignItems: "start",
    textAlign: "left"
  }}>
    <Box>
      {children}
    </Box>
    <Box sx={{ textAlign: "right", display: "block" }}> {/* Always visible */}
      <Typography sx={labelStyles}>{label}</Typography>
    </Box>
  </Box>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box component="footer" sx={{
      width: "100%",
      px: { xs: "20px", md: "70px" },
      pt: { xs: "60px", md: "100px" },
      pb: { xs: "40px", md: "60px" },
      bgcolor: "white",
      color: COLORS.textDark,
    }}>
      <Box sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" },
        gap: { xs: "40px", md: "20px" },
      }}>

        {/* LEFT COLUMN: Logo & CTA */}
        <Box sx={{
          gridColumn: { xs: "1 / -1", md: "1 / 6" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-start"
        }}>
          <Box sx={{ mb: { xs: "40px", md: "0" }, textAlign: "left" }}>
            <img
              src="/images/GR_9_Isologo.png"
              alt="Guzmán Ripoll"
              style={{ height: "45px", width: "auto" }}
            />
          </Box>

          <Box sx={{ mt: { xs: "0", md: "auto" }, mb: { xs: "40px", md: "0" }, textAlign: "left" }}>
            <Typography sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "24px", md: "32px" },
              color: "#B0B0B0",
              fontWeight: 500,
              lineHeight: 1.2,
              mb: 1,
              textTransform: "none"
            }}>
              Hablemos de tu proyecto
            </Typography>
            <MuiLink
              component={RouterLink}
              to="/contacto"
              underline="none"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: { xs: "24px", md: "32px" },
                color: COLORS.textDark,
                fontWeight: 500,
                lineHeight: 1.2,
                textTransform: "none",
                position: "relative",
                display: "inline-block",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "2px",
                  backgroundColor: COLORS.textDark,
                  transform: "scaleX(1)",
                  transformOrigin: "left",
                  transition: "transform 0.3s ease"
                },
                "&:hover::after": {
                  transform: "scaleX(0)",
                  transformOrigin: "right"
                }
              }}
            >
              Contáctanos
            </MuiLink>
          </Box>
        </Box>

        {/* CENTER COLUMN: Navigation */}
        <Box sx={{ gridColumn: { xs: "1 / -1", md: "7 / 9" } }}>
          <SectionRow label="N">
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
          </SectionRow>
        </Box>

        {/* RIGHT COLUMN: Info Sections (Tighter Spacing) */}
        <Box sx={{ gridColumn: { xs: "1 / -1", md: "9 / 13" } }}>
          {/* Location Section (U - Ubicación) */}
          <SectionRow label="U" noMargin>
            {realContactInfo.map((item, index) => (
              <Typography key={index} sx={textStyles}>
                {item.text}
              </Typography>
            ))}
          </SectionRow>

          {/* Phone Section (T - Teléfono) */}
          <SectionRow label="T" noMargin>
            {phoneInfo.map((item, index) => (
              <Typography key={index} sx={textStyles}>
                {item.text}
              </Typography>
            ))}
          </SectionRow>

          {/* Contact Section (C - Contacto) */}
          <SectionRow label="C" noMargin>
            {emailInfo.map((item, index) => (
              <MuiLink
                key={index}
                href={`mailto:${item.text}`}
                underline="none"
                sx={linkStyles}
              >
                {item.text}
              </MuiLink>
            ))}
          </SectionRow>

          {/* Social Section (S - Sociales) */}
          <SectionRow label="S" noMargin>
            <Box sx={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
              {socialLinks.map((link, index) => (
                <React.Fragment key={link.text}>
                  <MuiLink
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="none"
                    sx={linkStyles}
                  >
                    {link.text}
                  </MuiLink>
                  {index < socialLinks.length - 1 && (
                    <Typography sx={textStyles}>,</Typography>
                  )}
                </React.Fragment>
              ))}
            </Box>
          </SectionRow>
        </Box>
      </Box>

      {/* Bottom Section */}
      <Box sx={{
        mt: { xs: "60px", md: "120px" },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", md: "flex-end" },
        gap: "20px",
      }}>
        {/* Left: Copyright */}
        <Box sx={{ textAlign: "left" }}>
          <Typography sx={{ ...textStyles, color: COLORS.textLightGrey, fontSize: "14px" }}>
            © guzmán ripoll {currentYear}
          </Typography>
          <Typography sx={{ ...textStyles, color: COLORS.textLightGrey, fontSize: "14px" }}>
            todos los derechos reservados
          </Typography>
        </Box>

        {/* Right: Links */}
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "flex-start", md: "flex-end" },
          gap: "5px",
          width: { xs: "100%", md: "auto" }
        }}>
          {/* Row 1: Privacy */}
          <MuiLink component={RouterLink} to="/privacidad" underline="none" sx={{ ...linkStyles, color: COLORS.textLightGrey, fontSize: "14px" }}>
            política de privacidad
          </MuiLink>

          {/* Row 2: Credits & Back to Top */}
          <Box sx={{ display: "flex", gap: "40px", alignItems: "center", justifyContent: { xs: "space-between", md: "flex-end" }, width: "100%" }}>
            <Typography sx={{ ...textStyles, color: COLORS.textLightGrey, fontSize: "14px" }}>
              web por thirtyfoursouth
            </Typography>

            <Box
              onClick={scrollToTop}
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                opacity: 0.5,
                transition: "opacity 0.3s",
                "&:hover": { opacity: 1 }
              }}
            >
              <Typography sx={{ ...textStyles, fontSize: "14px" }}>volver arriba</Typography>
              <Typography sx={{ ...textStyles, fontSize: "18px" }}>↑</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}