import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Instagram, Linkedin, Facebook } from 'lucide-react';
import BeamCTAButton from "./BeamCTAButton";

const COLORS = {
  textDark: "#000000",
  textGrey: "#666666",
};

const navLinks = [
  { to: "/", text: "Inicio" },
  { to: "/clinica", text: "Clínica" },
  { to: "/procedimientos", text: "Procedimientos" },
  { to: "/resultados", text: "Resultados" },
  { to: "/contacto", text: "Contacto" },
];

const realContactInfo = [
  { text: "Punta del Este, Uruguay", type: "text" },
];

const phoneInfo = [
  { text: "+598 99 016 358", type: "phone" },
];

const emailInfo = [
  { text: "info@guzmanripoll.com", type: "email" },
];

const linkStyles = {
  fontFamily: "Poppins, sans-serif",
  fontSize: "16px",
  color: COLORS.textDark,
  textDecoration: "none",
  display: "block",
  lineHeight: "1.5",
  fontWeight: 500,
  textTransform: "none",
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
  textTransform: "none",
};

const socialLinkStyles = {
  fontFamily: "Poppins, sans-serif",
  fontSize: "16px",
  color: COLORS.textDark,
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  lineHeight: "1.5",
  fontWeight: 500,
  textTransform: "none",
  "&:hover": {
    opacity: 0.7,
  },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box sx={{
      px: { xs: "12px", md: "40px" },
      pb: { xs: "calc(12px + env(safe-area-inset-bottom))", md: "40px" },
      pt: { xs: "20px", md: "60px" },
      width: "100%",
      boxSizing: "border-box",
    }}>
      <Box component="footer" sx={{
        width: "100%",
        px: { xs: "30px", md: "70px" },
        pt: { xs: "60px", md: "100px" },
        pb: { xs: "40px", md: "60px" },
        bgcolor: "white",
        color: COLORS.textDark,
        borderRadius: "20px",
        boxSizing: "border-box",
        border: "1px solid rgba(0,0,0,0.05)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
      }}>
        <Box sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: { xs: "40px", md: "20px" },
          position: "relative"
        }}>

          {/* LEFT COLUMN: CTA at top, Logo at bottom */}
          <Box sx={{
            gridColumn: { xs: "1 / -1", md: "1 / 6" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start"
          }}>
            {/* CTA Text and Button at top */}
            <Box sx={{ mb: { xs: "40px", md: "0" }, textAlign: "left" }}>
              <Typography sx={{
                fontFamily: "Poppins, sans-serif",
                fontSize: { xs: "32px", md: "42px" },
                color: COLORS.textDark,
                fontWeight: 500,
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                mb: { xs: 2, md: 3 },
                textTransform: "none"
              }}>
                Cirugía mamaria
                <br />
                <Typography
                  component="span"
                  sx={{
                    color: "#0081C7",
                    fontWeight: 500,
                    fontSize: "inherit",
                    fontFamily: "inherit"
                  }}
                >
                  inteligente.
                </Typography>
              </Typography>

              <BeamCTAButton
                to="/contacto"
                tone="light"
                endIcon={<ArrowForwardIcon sx={{ fontSize: { xs: 18, md: 20 } }} />}
                sx={{
                  gap: 1.5,
                  px: { xs: 2.5, md: 3 },
                  py: { xs: 1.2, md: 1.4 },
                  fontSize: { xs: "14px", md: "15px" },
                  fontWeight: 500,
                }}
                beamProps={{
                  strength: 0.3,
                  brightness: 1.04,
                }}
              >
                Agendar consulta
              </BeamCTAButton>
            </Box>

          </Box>

          {/* CENTER COLUMN: Navigation */}
          <Box sx={{ gridColumn: { xs: "1 / 7", md: "9 / 10" }, display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-start", textAlign: "left" }}>
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

          {/* SOCIALS COLUMN */}
          <Box sx={{ gridColumn: { xs: "7 / 13", md: "10 / 11" }, display: "flex", flexDirection: "column", gap: "10px", mt: { md: "0" }, alignItems: "flex-start", textAlign: "left" }}>
            <MuiLink href="https://instagram.com/guzmanripoll" target="_blank" rel="noopener noreferrer" underline="none" sx={socialLinkStyles}>
              <Instagram size={18} strokeWidth={2} /> Instagram
            </MuiLink>
            <MuiLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer" underline="none" sx={socialLinkStyles}>
              <Linkedin size={18} strokeWidth={2} /> LinkedIn
            </MuiLink>
            <MuiLink href="https://facebook.com/guzmanripoll" target="_blank" rel="noopener noreferrer" underline="none" sx={socialLinkStyles}>
              <Facebook size={18} strokeWidth={2} /> Facebook
            </MuiLink>
          </Box>

          {/* CONTACT COLUMN */}
          <Box sx={{ gridColumn: { xs: "1 / -1", md: "11 / 13" }, display: "flex", flexDirection: "column", gap: "10px", mt: { xs: "20px", md: "0" }, alignItems: "flex-start", textAlign: "left" }}>
            {realContactInfo.map((item, index) => (
              <MuiLink key={`loc-${index}`} href="https://maps.google.com/?q=Punta+del+Este,+Uruguay" target="_blank" underline="none" sx={linkStyles}>
                {item.text}
              </MuiLink>
            ))}
            {phoneInfo.map((item, index) => (
              <MuiLink key={`phone-${index}`} href={`tel:${item.text.replace(/\s+/g, '')}`} underline="none" sx={linkStyles}>
                {item.text}
              </MuiLink>
            ))}
            {emailInfo.map((item, index) => (
              <MuiLink key={`email-${index}`} href={`mailto:${item.text}`} underline="none" sx={linkStyles}>
                {item.text}
              </MuiLink>
            ))}
          </Box>
        </Box>

        {/* Bottom Section */}
        <Box sx={{
          mt: { xs: "60px", md: "80px" },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "flex-end" },
          gap: "20px",
        }}>
          {/* Left: Logo */}
          <Box sx={{ textAlign: "left" }}>
            <img
              src="/images/GR_9_Isologo.png"
              alt="Guzmán Ripoll"
              style={{ height: "60px", width: "auto" }}
            />
          </Box>

          {/* Right: Volver arriba + Copyright */}
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "flex-start", md: "flex-end" },
            gap: "12px"
          }}>
            {/* Volver arriba */}
            <Box
              onClick={scrollToTop}
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                opacity: 0.7,
                transition: "opacity 0.3s",
                "&:hover": { opacity: 1 }
              }}
            >
              <Typography sx={{ ...textStyles, color: COLORS.textGrey, fontSize: "14px" }}>volver arriba</Typography>
              <Typography sx={{ ...textStyles, color: COLORS.textGrey, fontSize: "16px" }}>↑</Typography>
            </Box>

            {/* Copyright */}
            <Typography sx={{
              ...textStyles,
              color: COLORS.textGrey,
              fontSize: "14px",
              textAlign: { xs: "center", md: "right" },
              textTransform: "none"
            }}>
              Copyright © {currentYear} Guzman Ripoll
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
