'use client';
import { Box, Typography } from "@mui/material";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function NewHero() {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "grid",
        background: "radial-gradient(circle at center, #0081C7 -100%, #191968 40%)",
        gridTemplateColumns: "repeat(12, 1fr)",
        paddingX: { xs: "20px", md: "70px" },
        columnGap: "20px",
        paddingTop: { xs: "120px", md: "140px" },
        paddingBottom: { xs: "60px", md: "20px" },
        overflow: "hidden",
      }}
    >
      {/* Línea separadora vertical central */}
      <Box
        sx={{
          position: "absolute",
          left: { xs: 0, md: "50%" },
          top: { xs: "50%", md: 0 },
          bottom: { xs: "auto", md: 0 },
          width: { xs: "100%", md: "1px" }, // Adjusted width
          height: { xs: "1px", md: "auto" }, // Adjusted height
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          zIndex: 1,
          display: { xs: "none", md: "block" },
        }}
      />

      {/* Lado Izquierdo - Imagen de DNA Dots */}
      <Box
        sx={{
          gridColumn: { xs: "1 / 13", md: "1 / 7" },
          order: { xs: 2, md: 1 },
          position: "relative",
          zIndex: 0,
          // Desktop: Ocupa todo el alto y compensa margins
          height: { xs: "45vh", md: "calc(100% + 160px)" },
          marginTop: { xs: 0, md: "-140px" },
          marginLeft: { xs: "-20px", md: "-70px" },
          marginBottom: { xs: "-60px", md: "-20px" },
          marginRight: { xs: "-20px", md: 0 },
          width: { xs: "calc(100% + 40px)", md: "calc(100% + 70px)" }, // Compensar márgenes
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src="/images/dots.png"
          alt="DNA Patterns"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: { xs: "center", md: "left center" }, // Mejor posicionamiento
            opacity: 1,
            display: "block",
            transform: { md: "scale(1.1)" } // Un poco más de presencia
          }}
        />
      </Box>

      {/* Lado Derecho - Contenido */}
      <Box
        sx={{
          gridColumn: { xs: "1 / 13", md: "7 / 13" },
          order: { xs: 1, md: 2 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: { xs: "30px", md: "40px" },
          position: "relative",
          zIndex: 2,
          paddingLeft: { xs: "0px", md: "70px" },
          paddingBottom: { xs: "30px", md: "30px" },
          paddingTop: { xs: "40px", md: "220px" },
          width: "100%",
          boxSizing: "border-box"
        }}
      >
        {/* Título Principal */}
        <Box sx={{ position: "relative" }}>
          <Typography
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: { xs: "38px", md: "42px", lg: "48px" },
              color: "white",
              fontWeight: 400,
              lineHeight: { xs: 1.1, md: 0.95 },
              letterSpacing: "-1.5px",
              textAlign: "left",
            }}
          >
            Cirugía mamaria{" "}
            <Box
              component="span"
              sx={{
                color: "#0081C7",
                fontWeight: 500,
              }}
            >
              inteligente
            </Box>
            ,
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: { xs: "38px", md: "42px", lg: "48px" },
              color: "white",
              fontWeight: 400,
              lineHeight: { xs: 1.1, md: 0.95 },
              letterSpacing: "-1.5px",
              textAlign: "left",
            }}
          >
            conexión humana
          </Typography>
        </Box>

        {/* Botón "Conoce Mas" */}
        <Box sx={{ width: "100%" }}>
          <Box
            ref={buttonRef}
            component="button"
            sx={{
              width: "100%",
              fontFamily: "'Poppins', sans-serif",
              fontSize: { xs: "14px", md: "16px" },
              color: "black",
              backgroundColor: "white",
              border: "none",
              padding: "18px 48px",
              cursor: "pointer",
              fontWeight: 400,
            }}
          >
            Conoce Mas
          </Box>
        </Box>
      </Box>
    </Box>
  );
}