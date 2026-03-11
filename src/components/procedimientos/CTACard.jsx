import { Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useRef } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTACard({
  title = "¿Lista para dar el primer paso?",
  buttonText = "Agendar consulta",
  href = "/contacto",
  logoSrc = "/images/GR_9_Isologo_Blanco.png",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        mx: "auto",
        position: "relative",
        mt: { xs: 8, md: 12 },
        mb: { xs: 8, md: 12 },
        px: { xs: "20px", md: "70px" },
      }}
    >
      <Box
        ref={containerRef}
        component={RouterLink}
        to={href}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: { xs: "center", md: "space-between" },
          backgroundColor: "#2563EB",
          borderRadius: { xs: "20px", md: "24px" },
          position: "relative",
          overflow: "hidden",
          textDecoration: "none",
          color: "white",
          boxShadow: "0 20px 40px -10px rgba(37, 99, 235, 0.4)",
          minHeight: { xs: "240px", md: "180px" },
          px: { xs: 4, md: 8 },
          py: { xs: 6, md: 6 },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        {/* Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 3, md: 4 },
            zIndex: 2,
            width: "100%",
            position: "relative",
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "18px", md: "22px" },
              fontWeight: 500,
              color: "#ffffff",
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
              maxWidth: { md: "600px" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            {title}
          </Typography>

          {/* Button */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: "#ffffff",
              color: "#2563EB",
              px: { xs: 2.5, md: 3 },
              py: { xs: 1.2, md: 1.5 },
              borderRadius: "8px",
              fontSize: { xs: "13px", md: "14px" },
              fontWeight: 600,
              letterSpacing: "0.02em",
              fontFamily: "Poppins, sans-serif",
              transition: "all 0.25s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              },
            }}
          >
            {buttonText}
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Box>
        </Box>

        {/* Watermark Logo — centered on mobile, cut-off right on desktop */}
        <Box
          component="img"
          src={logoSrc}
          alt=""
          sx={{
            position: "absolute",
            // Mobile: centered in the card
            top: { xs: "50%", md: "50%" },
            left: { xs: "50%", md: "auto" },
            right: { xs: "auto", md: "-10%" },
            transform: { xs: "translate(-50%, -50%)", md: "translateY(-50%)" },
            width: { xs: "85%", md: "55%" },
            height: "auto",
            opacity: { xs: 0.15, md: 0.2 },
            zIndex: 1,
            pointerEvents: "none",
            filter: "brightness(0) invert(1)",
          }}
        />
      </Box>
    </Box>
  );
}
