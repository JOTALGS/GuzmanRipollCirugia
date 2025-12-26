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
  // Líneas para desktop
  const conoceMasLines1Desktop = [
    "Somos una clínica especializada en cirugía",
    " plástica. Nuestra experiencia refinada reside en canalizar el",
    " deseo, desde la seguridad corporal al bienestar integral,",
    "desde tratamientos hasta cirugías reconstructivas."
  ];

  const conoceMasLines2Desktop = [
    "A lo largo del tiempo, nos hemos convertido en expertos",
    "en traducir el deseo en confianza, combinando precisión",
    "tecnológica con un cuidado humano excepcional."
  ];

  // Texto para mobile - primera línea separada del resto
  const textPart1First = "Somos una clínica";
  const textPart1Rest = "especializada en cirugía plástica. Nuestra experiencia refinada reside en canalizar el deseo, desde la seguridad corporal al bienestar integral, desde tratamientos hasta cirugías reconstructivas.";
  
  const textPart2 = "A lo largo del tiempo, nos hemos convertido en expertos en traducir el deseo en confianza, combinando precisión tecnológica con un cuidado humano excepcional.";

  useEffect(() => {
    const leftSection = document.getElementById("pin-section");
    if (!leftSection) return;

    const isMobile = () => window.innerWidth <= 768;
    let scrollTriggerInstance = null;

    const createScrollTrigger = () => {
      if (scrollTriggerInstance) scrollTriggerInstance.kill();

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: leftSection,
        start: "top 7%",
        end: isMobile() ? "bottom+=5000% top" : "bottom+=3000% top",
        pin: false,
        pinSpacing: false,
        scrub: true,
        markers: false,
        anticipatePin: 1,
      });
    };

    createScrollTrigger();
    const handleResize = () => createScrollTrigger();
    window.addEventListener("resize", handleResize);

    return () => {
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 1,
        height: { xs: "auto", md: "150vh" },
        display: "grid",
        backgroundColor: "background.default",
        gridTemplateColumns: "repeat(12, 1fr)",
        marginInline: { xs: "20px", md: "70px" },
        columnGap: { xs: "16px", md: "20px" },
        "& > section": { gridColumn: "1 / -1" }
      }}
    >
      {/* CTA derecha - SOLO DESKTOP */}
      <Box
        sx={{
          mt: "20px",
          gridColumn: { xs: "8 / 13", md: "11 / 13" },
          gridRow: "1 / 2",
          display: { xs: "none", md: "flex" },
          alignItems: "start",
          justifyContent: "end"
        }}
      >
        <div id="pin-section" className="py-8 px-4">
          <Box component={"a"} href={"/clinica"} sx={{ textDecoration: "none" }}>
            <AnimatedBorderBox>
              <Typography
                color="#000000"
                fontFamily={"Poppins"}
                fontSize={{ xs: "15px", md: "16px" }}
                sx={{ textTransform: "uppercase" }}
              >
                Ver nuestros servicios
              </Typography>
            </AnimatedBorderBox>
          </Box>
        </div>
      </Box>

      {/* Tarjeta izquierda - SOLO DESKTOP */}
      <Box
        sx={{
          mt: "20px",
          gridColumn: { xs: "3 / 7", md: "4 / 6" },
          gridRow: "1 / 2",
          display: { xs: "none", md: "flex" },
          alignItems: "start",
          justifyContent: "start",
          position: "relative",
          borderRadius: "24px",
          overflow: "hidden",
          backdropFilter: "blur(10px)",
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "4 8px 6px 0 rgba(31, 38, 135, 0.37)",
          height: "180px"
        }}
      >
        <img
          src={"/images/bias.png"}
          alt="scroll"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "24px"
          }}
        />
      </Box>

      {/* Breadcrumb izquierda - SOLO DESKTOP */}
      <Box
        sx={{
          mt: "20px",
          gridColumn: "1 / 2",
          gridRow: "1 / 2",
          display: { xs: "none", md: "flex" },
          alignItems: { xs: "center", md: "start" },
          justifyContent: "start"
        }}
      >
        <Typography
          color="#000000"
          fontFamily={"Poppins"}
          fontSize={"16px"}
          sx={{ textTransform: "uppercase" }}
        >
          Clínica
        </Typography>
      </Box>

      {/* ========== DESKTOP LAYOUT ========== */}
      <Box
        sx={{
          gridColumn: { xs: "1 / -1", md: "1 / 12" },
          gridRow: "2 / 3",
          py: 8,
          display: { xs: "none", md: "block" }
        }}
      >
        {/* Primera línea con indent */}
        <Box
          sx={{
            fontFamily: "Poppins",
            fontSize: { md: "42px", lg: "52px" },
            fontWeight: 400,
            lineHeight: 1.3,
            color: "#000000",
            textAlign: "left",
            paddingLeft: "calc((100% / 11) * 3)",
          }}
        >
          <LineReveal 
            lines={[conoceMasLines1Desktop[0]]} 
            startIndex={0}
          />
        </Box>
        
        {/* Resto del primer párrafo sin indent */}
        <Box
          sx={{
            fontFamily: "Poppins",
            fontSize: { md: "42px", lg: "52px" },
            fontWeight: 400,
            lineHeight: 1.3,
            color: "#000000",
            textAlign: "left",
          }}
        >
          <LineReveal 
            lines={conoceMasLines1Desktop.slice(1)} 
            startIndex={1}
          />
        </Box>

        <Box sx={{ height: "80px" }} />

        {/* Segundo párrafo */}
        <Box
          sx={{
            fontFamily: "Poppins",
            fontSize: { md: "42px", lg: "52px" },
            fontWeight: 400,
            lineHeight: 1.3,
            color: "#000000",
            textAlign: "left",
          }}
        >
          <LineReveal 
            lines={conoceMasLines2Desktop} 
            startIndex={0}
          />
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
        {/* Imagen arriba a la izquierda - MOBILE */}
        <Box
          sx={{
            width: "45%",
            maxWidth: "180px",
            aspectRatio: "1/1",
            borderRadius: "16px",
            overflow: "hidden",
            mb: 8  // 🔺 SEPARACIÓN IMAGEN → CLÍNICA (ajustá: 6=48px, 8=64px, 10=80px)
          }}
        >
          <img
            src={"/images/bias.png"}
            alt="scroll"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </Box>

        {/* Primera línea: CLÍNICA + inicio del texto */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: "40px",  // 🔺 SEPARACIÓN CLÍNICA → TEXTO (ajustá en px)
            mb: 0
          }}
        >
          {/* Label Clínica */}
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "14px",
              fontWeight: 500,
              textTransform: "uppercase",
              color: "#000000",
              flexShrink: 0,
              lineHeight: 1.3,
              paddingTop: "6px"  // 🔺 ALINEACIÓN VERTICAL de CLÍNICA (subí/bajá)
            }}
          >
            Clínica
          </Typography>
          
          {/* Inicio del texto en la misma línea */}
          <Typography
            component="span"
            sx={{
              fontFamily: "Poppins",
              fontSize: "30px",
              fontWeight: 400,
              lineHeight: 1.3,
              color: "#000000",
              textAlign: "left",
            }}
          >
            {textPart1First}
          </Typography>
        </Box>

        {/* Resto del primer párrafo - ocupa todo el ancho */}
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: "30px",
            fontWeight: 400,
            lineHeight: 1.3,
            color: "#000000",
            textAlign: "left",
            mb: 4
          }}
        >
          {textPart1Rest}
        </Typography>

        {/* Segundo párrafo */}
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: "30px",
            fontWeight: 400,
            lineHeight: 1.3,
            color: "#000000",
            textAlign: "left",
            mb: 5
          }}
        >
          {textPart2}
        </Typography>

        {/* CTA Mobile - ALINEADO A LA IZQUIERDA */}
        <Box sx={{ textAlign: "left" }}>
          <Box 
            component={"a"} 
            href={"/clinica"} 
            sx={{ 
              textDecoration: "none",
              display: "inline-block"
            }}
          >
            <AnimatedBorderBox>
              <Typography
                color="#000000"
                fontFamily={"Poppins"}
                fontSize={"15px"}
                fontWeight={400}
                sx={{ textTransform: "uppercase" }}
              >
                Ver nuestros servicios
              </Typography>
            </AnimatedBorderBox>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
