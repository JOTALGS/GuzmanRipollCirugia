import { Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function BlurButton({ children, sx, ...props }) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Box
      component="span"
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setTimeout(() => setIsPressed(false), 150)}
      onMouseLeave={() => setIsPressed(false)}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.8,
        backgroundColor: "#ffffff",
        color: "#0a0a0a",
        px: { xs: 1.8, md: 2 },
        py: { xs: 0.9, md: 1 },
        borderRadius: "6px",
        fontSize: { xs: "0.65rem", md: "0.7rem" },
        fontWeight: 500,
        letterSpacing: "0.03em",
        textTransform: "uppercase",
        cursor: "pointer",
        transition: "all 0.2s ease, filter 0.15s ease",
        fontFamily: "Poppins, sans-serif",
        filter: isPressed ? "blur(1.5px)" : "blur(0px)",
        transform: isPressed ? "scale(0.97)" : "scale(1)",
        "&:hover": {
          backgroundColor: "#e5e5e5",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
      <ArrowForwardIcon sx={{ fontSize: 13 }} />
    </Box>
  );
}

export default function CTACard({
  title = "¿Lista para dar el primer paso?",
  buttonText = "Agendar consulta",
  badgeText = "Agenda tu cita",
  linkText = "Contactar",
  href = "/contacto",
  logoSrc = "/images/GR_9_Isologo_Blanco.png",
}) {
  return (
    <Box
      sx={{
        // ESPACIO ENTRE ÚLTIMO PROCEDIMIENTO Y CTA CARD
        // Aumenta o disminuye estos valores para ajustar el espacio superior (NO afecta el footer)
        // xs: móviles, md: desktop
        pt: { xs: 10, md: 20 },
        pb: { xs: 8, md: 12 },
        px: { xs: "20px", md: "70px" },
        backgroundColor: "#ffffff",
      }}
    >
      {/* Grid de 12 columnas */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          columnGap: "20px",
          maxWidth: "1920px",
          margin: "0 auto",
        }}
      >
        {/* Card ocupa 4 columnas */}
        <Box
          component={RouterLink}
          to={href}
          sx={{
            gridColumn: { xs: "1 / -1", md: "1 / 5" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#0a0a0a",
            borderRadius: "24px",
            p: { xs: 5, md: 6 },
            minHeight: { xs: "400px", md: "550px" },
            textDecoration: "none",
            color: "inherit",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            },
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: "auto",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: "#0066cc",
                }}
              />
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#0066cc",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {badgeText}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "0.85rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "#ffffff",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {linkText}
            </Typography>
          </Box>

          {/* Content group - Logo + Title + Button */}
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start"
          }}>
            {/* Logo */}
            <Box sx={{ mb: { xs: 3, md: 4 }, width: 56, height: 56 }}>
              <Box
                component="img"
                src={logoSrc}
                alt="Guzmán Ripoll Cirugía"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>

            {/* Title */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 400,
                fontSize: { xs: "1.75rem", md: "2.5rem" },
                lineHeight: 1.2,
                color: "#ffffff",
                mb: { xs: 3, md: 4 },
                fontFamily: "Poppins, sans-serif",
                textAlign: "left",
              }}
            >
              {title.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < title.split("\n").length - 1 && <br />}
                </span>
              ))}
            </Typography>

            {/* Button */}
            <BlurButton>{buttonText}</BlurButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
