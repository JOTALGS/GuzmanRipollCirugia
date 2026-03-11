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
        backgroundColor: "#000000ff",
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

      {/* Lado Izquierdo - Imagen */}
      <Box
        sx={{
          gridColumn: { xs: "1 / 13", md: "1 / 7" },
          order: { xs: 2, md: 0 }, // Image below text on mobile
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: { xs: "500px", md: "650px" },
          }}
        >
          {/* Imagen principal */}
          <Box
            component="img"
            src="/images/image 181.png"
            alt="Cirugía Plástica Estética y Reconstructiva"
            sx={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          />

          {/* Label superior con línea punteada diagonal */}
          <Box
            sx={{
              position: "absolute",
              top: { xs: "20px", md: "40px" },
              left: { xs: "10px", md: "20px" },
              zIndex: 3,
            }}
          >
            {/* Línea punteada diagonal hacia abajo-derecha */}
            {/* PARA MOVER LA LÍNEA:
                - Ajustar 'top' y 'left' en el sx del Box para la posición inicial.
                - Ajustar 'width' y 'height' para el tamaño del área de dibujo.
                - Ajustar x1, y1, x2, y2 en el elemento <line> para la dirección.
            */}
            <Box
              component="svg"
              sx={{
                position: "absolute",
                top: "100%",
                left: "100%",
                width: { xs: "80px", md: "120px" },
                height: { xs: "80px", md: "180px" },
                overflow: "visible",
                pointerEvents: "none",
              }}
            >
              <line
                x1="0"
                y1="0"
                x2="70%"
                y2="100%"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </Box>

            <Box
              sx={{
                backgroundColor: "rgba(65, 60, 55, 0.6)", // Grisaceo amarronado sutil
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                padding: "8px 14px",
                maxWidth: { xs: "140px", md: "180px" },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: { xs: "8px", md: "10px" },
                  color: "white",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  fontWeight: 400,
                  lineHeight: 1.4,
                  textAlign: "left",
                }}
              >
                CONEXIÓN HUMANA Y CUIDADO PERSONALIZADO
              </Typography>
            </Box>
          </Box>

          {/* Label inferior con línea punteada diagonal */}
          <Box
            sx={{
              position: "absolute",
              bottom: { xs: "20px", md: "30px" },
              right: { xs: "10px", md: "10px" },
              zIndex: 3,
            }}
          >
            {/* Línea punteada diagonal hacia arriba-izquierda (hacia el círculo grande central) */}
            <Box
              component="svg"
              sx={{
                position: "absolute",
                bottom: "100%", // Arriba del label
                right: "100%",  // A la izquierda del label
                width: { xs: "80px", md: "180px" }, // Más largo para alcanzar el círculo
                height: { xs: "80px", md: "180px" },
                overflow: "visible",
                pointerEvents: "none",
              }}
            >
              <line
                x1="0"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </Box>

            <Box
              sx={{
                backgroundColor: "rgba(65, 60, 55, 0.6)", // Grisaceo amarronado sutil
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                padding: "8px 14px",
                maxWidth: { xs: "140px", md: "180px" },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: { xs: "8px", md: "10px" },
                  color: "white",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  fontWeight: 400,
                  lineHeight: 1.4,
                  textAlign: "left",
                }}
              >
                TECNOLOGÍA AVANZADA E INNOVACIÓN CONSTANTE
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Lado Derecho - Contenido */}
      <Box
        sx={{
          gridColumn: { xs: "1 / 13", md: "7 / 13" },
          order: { xs: 1, md: 0 }, // Text above image on mobile
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: { xs: "30px", md: "40px" },
          position: "relative",
          zIndex: 2,
          paddingLeft: { xs: "0px", md: "70px" },
          paddingBottom: { xs: "30px", md: "30px" },
          paddingTop: { xs: "0px", md: "220px" }, // Push content down independently
        }}
      >
        {/* Título Principal */}
        <Box sx={{ position: "relative" }}>
          <Typography
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: { xs: "36px", md: "42px", lg: "48px" },
              color: "white",
              fontWeight: 400,
              lineHeight: { xs: 1.05, md: 0.95 },
              letterSpacing: "-1.5px",
              textAlign: "left",
              mb: "0px" // Removed margin to connect lines
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
              fontSize: { xs: "40px", md: "42px", lg: "48px" }, // Larger on mobile
              color: "white",
              fontWeight: 400,
              lineHeight: { xs: 1.05, md: 0.95 },
              letterSpacing: "-1.5px",
              textAlign: "left",
            }}
          >
            conexión humana
          </Typography>
        </Box>

        {/* Botón "Conoce Mas" - Full Width con fondo blanco */}
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
              letterSpacing: "0px",
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
