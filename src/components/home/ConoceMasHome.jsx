import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { styled } from "@mui/material/styles";

gsap.registerPlugin(ScrollTrigger);

// Componente LineReveal integrado
const LineReveal = ({ lines = [], className = '', startIndex = 0 }) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden">
          <span
            className="block"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
              opacity: isVisible ? 1 : 0,
              transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out',
              transitionDelay: isVisible ? `${(startIndex + index) * 0.1}s` : '0s',
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </div>
  );
};

// Estilos para el borde animado
const AnimatedBorderBox = styled(Box)(({ theme }) => ({
  position: "relative",
  paddingBottom: "5px",
  cursor: "pointer",
  display: "inline-block",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "1px",
    backgroundColor: "#000000",
    transform: "translateX(0)",
    transition: "transform 0.4s ease",
    zIndex: 1
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "1px",
    backgroundColor: "#000000",
    transform: "translateX(-100%)",
    transition: "transform 0.4s ease",
    zIndex: 1
  },
  "&:hover::before": { transform: "translateX(100%)" },
  "&:hover::after": { transform: "translateX(0)" },
  "a:hover &::before": { transform: "translateX(100%)" },
  "a:hover &::after": { transform: "translateX(0)" }
}));

export default function ConoceMasHome() {
  // Texto para desktop - párrafo continuo
  const textDesktop = "El Dr.Guzmán Ripoll es un cirujano plástico especializado en cirugía mamaria estética y reconstructiva, con práctica en Punta del Este.";

  // Texto para mobile - párrafo completo
  const textMobile = "El Dr.Guzmán Ripoll es un cirujano plástico especializado en cirugía mamaria estética y reconstructiva, con práctica en Punta del Este.";

  useEffect(() => {
    // Pin de la imagen hasta el párrafo con sangría
    const imageBox = document.getElementById("sticky-image");
    const targetParagraph = document.getElementById("main-paragraph");

    if (imageBox && targetParagraph && window.innerWidth > 768) {
      // Obtener la altura de la imagen para calcular dónde debe parar
      const imageHeight = imageBox.offsetHeight;

      const scrollTriggerInstance = ScrollTrigger.create({
        trigger: imageBox,
        start: "top 120px",  // INICIO: Cuando la imagen llega a 120px del top de la ventana
        endTrigger: targetParagraph,  // REFERENCIA: Usa el párrafo principal como punto de referencia

        // FIN DEL STICKY - AJUSTAR ESTE VALOR:
        // La fórmula es: "top [valor]px"
        // Donde [valor] = distancia desde el top cuando el párrafo debe liberar la imagen
        //
        // Valores de ejemplo para probar:
        // end: "top 400px",  // La imagen para cuando el párrafo está a 400px del top
        // end: "top 350px",  // Más arriba (número menor = para antes)
        // end: "top 450px",  // Más abajo (número mayor = para después)
        //
        // VALOR ACTUAL: Intenta que pare cuando el párrafo esté a la altura de la imagen
        end: "top 375px",  // 🔺 AJUSTAR ESTE VALOR - Reducir para que pare antes (ej: 450), aumentar para que siga más (ej: 550)

        pin: true,
        pinSpacing: false,
        markers: false,  // 🔺 CAMBIAR A true PARA VER LÍNEAS DE DEBUG (te mostrará dónde empieza y termina)
        invalidateOnRefresh: true,  // Recalcula en resize
      });

      return () => {
        if (scrollTriggerInstance) scrollTriggerInstance.kill();
      };
    }
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 1,
        height: { xs: "auto", md: "150vh" },
        display: "grid",
        backgroundColor: "#F2F2F2",
        gridTemplateColumns: "repeat(12, 1fr)",
        marginInline: { xs: "20px", md: "70px" },
        columnGap: { xs: "16px", md: "20px" },
        "& > section": { gridColumn: "1 / -1" }
      }}
    >

      {/* Imagen izquierda pegada al margen - SOLO DESKTOP */}
      <Box
        id="sticky-image"  // ID para el ScrollTrigger
        sx={{
          mt: "20px",
          gridColumn: { xs: "3 / 7", md: "1 / 3" }, // Columnas 1-3 (2 columnas)
          gridRow: "1 / 3",  // Extendido para abarcar hasta el párrafo grande
          display: { xs: "none", md: "flex" },
          alignItems: "start",
          justifyContent: "start",
          position: "relative",  // Vuelto a relative para que GSAP maneje el pin
          borderRadius: "8px", // Border radius menor
          overflow: "hidden",
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "4 8px 6px 0 rgba(31, 38, 135, 0.37)",
          height: "35vh", // Más altura
          zIndex: 10  // Para asegurar que quede sobre otros elementos
        }}
      >
        <img
          src={"/images/Paper Texture@2160p.png"}
          alt="scroll"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px"
          }}
        />
      </Box>

      {/* 01 CLÍNICA + Párrafo - columna 7 - SOLO DESKTOP */}
      <Box
        sx={{
          mt: "20px",
          gridColumn: "7 / 11", // Columna 7 a la derecha de la imagen
          gridRow: "1 / 2",
          display: { xs: "none", md: "block" }
        }}
      >
        {/* 01 CLÍNICA */}
        <Box sx={{
          display: "flex",
          alignItems: "baseline",
          gap: "10px",
          mb: 3
        }}>
          <Typography component="span" sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "18px",
            fontWeight: 600,
            color: "rgba(0, 0, 0, 0.44)",
            lineHeight: 1
          }}>
            01
          </Typography>
          <Typography
            color="#000000"
            fontFamily={"Poppins"}
            fontSize={"18px"}
            sx={{
              textTransform: "uppercase",
              fontWeight: 500,
              letterSpacing: "0.0em",
              lineHeight: 1
            }}
          >
            Clínica
          </Typography>
        </Box>

        {/* Párrafo pequeño igual que mobile */}
        <Typography sx={{
          fontFamily: "Poppins",
          fontSize: "18px",
          fontWeight: 600,
          color: "rgb(0, 0, 0)",
          lineHeight: 1.2,
          textAlign: "left",
          mt: 0,
          // Alineamos la altura del párrafo con la imagen
          height: "calc(40vh - 70px)", // Restamos el espacio del título
          display: "flex",
          alignItems: "flex-end", // Alinea el texto al final
          pb: 1 // Pequeño padding para alinear con el borde inferior de la imagen
        }}>
          Como especialistas en cirugía mamaria, combinamos tecnología avanzada, experiencia médica y atención cercana para brindar una experiencia precisa, segura y humana en cada etapa del proceso.
        </Typography>
      </Box>

      {/* ========== DESKTOP LAYOUT ========== */}
      <Box
        sx={{
          gridColumn: { xs: "1 / -1", md: "1 / 13" }, // 🔺 Ocupa todas las columnas
          gridRow: "2 / 3",
          py: 8,
          display: { xs: "none", md: "block" }
        }}
      >
        {/* Párrafo continuo - solo primera línea con sangría */}
        <Typography
          id="main-paragraph"  // ID para el ScrollTrigger endpoint
          sx={{
            fontFamily: "Poppins",
            fontSize: { md: "42px", lg: "74px" }, // 🔺 TAMAÑO TEXTO DESKTOP (42px tablet, 80px desktop)
            fontWeight: 500, // 🔺 BOLD TEXTO (400=normal, 500=medium, 600=semibold, 700=bold)
            lineHeight: 1,
            color: "#000000",
            textAlign: "left",
            textIndent: "calc((100% / 12) * 3)", // 🔺 Sangría SOLO en la primera línea
            mt: 10, // Agregamos margen superior para más espacio blanco arriba
            mb: 6
          }}
        >
          {textDesktop}
        </Typography>

        {/* Nuevo párrafo descriptivo - DESKTOP */}
        <Box sx={{
          mt: 16,  // Aumentado aún más el margen superior para bajar toda la sección
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          columnGap: "20px",
          width: "100%",
          alignItems: "start"  // Asegura que los elementos estén alineados al inicio
        }}>
          {/* Título en columna 4 - dividido en dos líneas */}
          <Box sx={{
            gridColumn: "4 / 6", // Columna 4 a 5 (movido una columna a la derecha)
            fontFamily: "Poppins",
            fontSize: "22px",
            fontWeight: 600,
            color: "#000",
            textAlign: "left",
            alignSelf: "start",  // Alinea al inicio del contenedor
            pt: 0.5  // Pequeño padding para alinear perfectamente con el texto
          }}>
            <Typography sx={{
              fontFamily: "inherit",
              fontSize: "inherit",
              fontWeight: "inherit",
              color: "inherit",
              lineHeight: 1.2
            }}>
              Cirugía plástica
            </Typography>
            <Typography sx={{
              fontFamily: "inherit",
              fontSize: "inherit",
              fontWeight: "inherit",
              color: "inherit",
              lineHeight: 1.2
            }}>
              y estética
            </Typography>
          </Box>

          {/* Párrafo empieza en columna 7 (dos columnas más a la derecha para mayor separación) */}
          <Typography sx={{
            gridColumn: "7 / 11", // Columnas 7 a 10 (más separación del texto lateral)
            fontFamily: "Poppins",
            fontSize: "18px",
            fontWeight: 600,
            color: "#000",
            lineHeight: 1.2,
            textAlign: "left",
            alignSelf: "start"  // Alinea al inicio del contenedor
          }}>
            Nuestra práctica abarca un amplio rango de procedimientos, desde intervenciones no quirúrgicas
            hasta procesos altamente especializados. Lo que nos distingue es nuestro enfoque humano:
            priorizamos el acompañamiento cercano y el cuidado integral durante todo el proceso.
          </Typography>
        </Box>
      </Box>

      {/* ========== MOBILE LAYOUT ========== */}
      <Box
        sx={{
          gridColumn: "1 / -1",
          gridRow: "2 / 3",
          py: 4,
          display: { xs: "block", md: "none" }
        }}
      >
        {/* 01 CLÍNICA arriba de todo - MOBILE */}
        <Box sx={{
          display: "flex",
          alignItems: "baseline",
          gap: "10px",
          mb: 5 // 🔺 SEPARACIÓN entre "01 CLÍNICA" y párrafo (aumentado a 5)
        }}>
          <Typography component="span" sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "16px",
            fontWeight: 500,
            color: "rgba(0,0,0,0.2)",
            lineHeight: 1
          }}>
            01
          </Typography>
          <Typography component="span" sx={{
            fontFamily: "Poppins",
            fontSize: "16px",
            fontWeight: 500,
            textTransform: "uppercase",
            color: "#000000",
            letterSpacing: "0.03em",
            lineHeight: 1
          }}>
            Clínica
          </Typography>
        </Box>

        {/* Párrafo pequeño extenso arriba de la imagen - MOBILE */}
        <Typography sx={{
          fontFamily: "Poppins",
          fontSize: "16px", // 🔺 TAMAÑO letra párrafo pequeño (ajustá en px)
          fontWeight: 600, // 🔺 BOLD párrafo pequeño (400=normal, 500=medium, 600=semibold)
          color: "rgba(0,0,0,0.85)",
          lineHeight: 1.1, // 🔺 INTERLINEADO párrafo pequeño (aumentado a 1.5)
          textAlign: "left",
          mb: 6 // 🔺 SEPARACIÓN entre párrafo e imagen (aumentado a 6)
        }}>
         Como especialistas en cirugía mamaria, combinamos precisión médica, innovación tecnológica y un acompañamiento cercano en cada etapa del proceso.
        </Typography>

        {/* Imagen - MOBILE */}
        <Box
          sx={{
            width: "100%", // 🔺 ANCHO completo disponible
            aspectRatio: "1/1",
            borderRadius: "10px",
            overflow: "hidden",
            mb: 8 // 🔺 SEPARACIÓN entre imagen y texto grande (ajustá en px)
          }}
        >
          <img
            src={"/images/Paper Texture@2160p.png"}
            alt="scroll"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </Box>

        {/* Texto completo de corrido - sin sangría - MOBILE */}
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: "36px",
            fontWeight: 500,
            lineHeight: 1.1,
            color: "#000000",
            textAlign: "left",
            mb: 5
          }}
        >
          {textMobile}
        </Typography>

        {/* Nuevo párrafo descriptivo - MOBILE */}
        <Box sx={{
          mt: 4
        }}>
          <Typography sx={{
            fontFamily: "Poppins",
            fontSize: "18px",
            fontWeight: 600,
            color: "#000",
            mb: 2,
            textAlign: "left"
          }}>
            Cirugía plástica y estética
          </Typography>

          <Typography sx={{
            fontFamily: "Poppins",
            fontSize: "16px",
            fontWeight: 600, // Bold 600 también en móvil
            color: "#000",
            lineHeight: 1.1,
            textAlign: "left"
          }}>
            Nuestra práctica abarca un amplio rango de procedimientos, desde intervenciones no quirúrgicas
            hasta procesos altamente especializados. Lo que nos distingue es nuestro enfoque humano:
            priorizamos el acompañamiento cercano y el cuidado integral durante todo el proceso.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
