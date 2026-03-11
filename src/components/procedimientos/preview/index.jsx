import React, { useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MedicalProcedures() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const headerRef = useRef(null);
  const subtitleRef = useRef(null);
  const labelRef = useRef(null);

  const procedures = [
    {
      number: "01",
      name: "Aumento Mamario",
      image: "/images/imagen3.jpg",
      description: "Procedimiento personalizado para lograr un resultado natural y armónico con tu figura.",
    },
    {
      number: "02",
      name: "Lipoescultura VASER",
      image: "/images/imagen3.jpg",
      description: "Definición corporal de alta precisión con tecnología ultrasónica y radiofrecuencia.",
    },
    {
      number: "03",
      name: "Rinoplastia",
      image: "/images/imagen3.jpg",
      description: "Remodelación nasal funcional y estética con resultados naturales.",
    },
    {
      number: "04",
      name: "Abdominoplastia",
      image: "/images/imagen3.jpg",
      description: "Restauración de la pared abdominal con técnicas avanzadas de contorno.",
    },
    {
      number: "05",
      name: "Blefaroplastia",
      image: "/images/imagen3.jpg",
      description: "Cirugía de párpados para una mirada más descansada y juvenil.",
    },
  ];

  const headlineText = "Excelencia quirúrgica con enfoque humano";
  const headlineWords = headlineText.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wordElements = gsap.utils.toArray(".proc-headline-word");
      if (wordElements.length > 0) {
        gsap.fromTo(wordElements,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.03,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            }
          }
        );
      }

      const fadeElements = [labelRef.current, subtitleRef.current].filter(Boolean);
      if (fadeElements.length > 0) {
        gsap.fromTo(fadeElements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            delay: 0.3,
          }
        );
      }

      gsap.fromTo(".proc-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".proc-grid",
            start: "top 85%",
            toggleActions: "play none none none",
          }
        }
      );
    });

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 1,
        backgroundColor: "#fff",
        px: { xs: "20px", md: "70px" },
        pt: { xs: "100px", md: "120px" },
        pb: { xs: "60px", md: "100px" },
      }}
    >
      {/* Header */}
      <Box
        ref={headerRef}
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" },
          columnGap: "20px",
          mb: { xs: "48px", md: "80px" },
        }}
      >
        <Box
          ref={labelRef}
          sx={{
            gridColumn: "1 / 13",
            display: "flex",
            alignItems: "baseline",
            gap: { xs: "10px", md: "16px" },
            mb: { xs: "24px", md: "40px" },
          }}
        >
          <Typography sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "14px", md: "18px" },
            fontWeight: 500,
            color: "rgba(0, 0, 0, 0.37)",
            lineHeight: 1,
          }}>
            (01)
          </Typography>
          <Typography sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "14px", md: "18px" },
            fontWeight: 500,
            color: "black",
            textTransform: "uppercase",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}>
            PROCEDIMIENTOS
          </Typography>
        </Box>

        <Box sx={{ gridColumn: { xs: "1 / 13", md: "1 / 10" }, mb: { xs: "24px", md: 0 } }}>
          <Typography sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "36px", md: "72px", lg: "76px" },
            fontWeight: 500,
            lineHeight: 1.08,
            letterSpacing: "-0.05em",
            color: "black",
            textAlign: "left",
            overflow: "hidden",
          }}>
            {headlineWords.map((word, i) => (
              <Box component="span" key={i} sx={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", mr: "0.25em" }}>
                <Box component="span" className="proc-headline-word" sx={{ display: "inline-block", willChange: "transform" }}>
                  {word}
                </Box>
              </Box>
            ))}
          </Typography>
        </Box>

        <Box ref={subtitleRef} sx={{ gridColumn: { xs: "1 / 13", md: "8 / 13" }, mt: { md: "20px" } }}>
          <Typography sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "18px", md: "24px" },
            lineHeight: 1.35,
            color: "#000",
            fontWeight: 500,
            textAlign: "left",
          }}>
            Como expertos en cirugía mamaria, ofrecemos tratamientos personalizados que combinan precisión tecnológica
            con un cuidado humano excepcional.
          </Typography>
        </Box>
      </Box>

      {/* ─── Procedure Grid (Portfolio Style) ─────────────── */}
      <Box
        className="proc-grid"
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: { xs: "24px", md: "20px" },
        }}
      >
        {procedures.map((procedure, index) => (
          <Box
            key={index}
            component={RouterLink}
            to={`/procedimiento/${procedure.number}`}
            className="proc-card"
            sx={{
              display: "flex",
              flexDirection: "column",
              textDecoration: "none",
              cursor: "pointer",
              backgroundColor: "#f5f5f5",
              borderRadius: "20px",
              overflow: "hidden",
              p: { xs: "14px", md: "16px" },
              pb: { xs: "20px", md: "24px" },
              transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              "&:hover": {
                backgroundColor: "#efefef",
                boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                transform: "translateY(-2px)",
              },
              "&:hover .proc-img": {
                transform: "scale(1.03)",
              },
            }}
          >
            {/* Number Label */}
            <Typography sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "12px",
              fontWeight: 400,
              color: "rgba(0,0,0,0.35)",
              letterSpacing: "0.04em",
              mb: "12px",
              px: "4px",
              textAlign: "left",
            }}>
              //{procedure.number}
            </Typography>

            {/* Image */}
            <Box sx={{
              position: "relative",
              width: "100%",
              paddingTop: "65%",
              overflow: "hidden",
              borderRadius: "14px",
              mb: "16px",
              backgroundColor: "#e8e8e8",
            }}>
              <Box
                className="proc-img"
                component="img"
                src={procedure.image}
                alt={procedure.name}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </Box>

            {/* Name */}
            <Typography sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "15px", md: "17px" },
              fontWeight: 500,
              color: "#111",
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
              textAlign: "left",
              px: "4px",
            }}>
              {procedure.name}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* ─── Bottom Nav Bar ──────────────────────── */}
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: { xs: "10px", md: "12px" },
        mt: { xs: "48px", md: "64px" },
        pt: { xs: "32px", md: "40px" },
        borderTop: "1px solid rgba(0,0,0,0.06)",
      }}>
        <Box
          component={RouterLink}
          to="/contacto"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            px: { xs: "20px", md: "28px" },
            py: { xs: "12px", md: "14px" },
            borderRadius: "10px",
            backgroundColor: "#2563EB",
            color: "#fff",
            textDecoration: "none",
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "13px", md: "14px" },
            fontWeight: 500,
            letterSpacing: "-0.01em",
            border: "1.5px solid #2563EB",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "#1d4ed8",
              borderColor: "#1d4ed8",
            },
            "&:active": {
              transform: "scale(0.98)",
            },
          }}
        >
          Agendar consulta
          <ArrowForwardIcon sx={{ fontSize: 15 }} />
        </Box>

        <Box
          component={RouterLink}
          to="/procedimientos"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            px: { xs: "20px", md: "28px" },
            py: { xs: "12px", md: "14px" },
            borderRadius: "10px",
            backgroundColor: "#fff",
            color: "#111",
            textDecoration: "none",
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "13px", md: "14px" },
            fontWeight: 500,
            letterSpacing: "-0.01em",
            border: "1.5px solid rgba(0,0,0,0.12)",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              borderColor: "rgba(0,0,0,0.2)",
            },
            "&:active": {
              transform: "scale(0.98)",
            },
          }}
        >
          Ver todos
        </Box>
      </Box>
    </Box>
  );
}