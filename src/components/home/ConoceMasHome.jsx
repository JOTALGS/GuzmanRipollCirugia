import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import LightenText from "../magicText/LightenText";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { styled } from "@mui/material/styles";

gsap.registerPlugin(ScrollTrigger);


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
  const conoceMasText = `
Somos una clínica especializada en cirugía plástica. Nuestra experiencia refinada reside en canalizar el deseo, desde la seguridad corporal al bienestar integral, desde tratamientos hasta cirugías reconstructivas.

A lo largo del tiempo, nos hemos convertido en expertos en traducir el deseo en confianza, combinando precisión tecnológica con un cuidado humano excepcional.
  `;

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
        marginInline: { xs: "15px", md: "70px" },
        columnGap: { xs: "20px", md: "20px" },
        "& > section": { gridColumn: "1 / -1" }
      }}
    >
      {/* CTA derecha - OCULTO EN MÓVIL */}
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

      {/* Tarjeta izquierda */}
      <Box
        sx={{
          mt: "20px",
          gridColumn: { xs: "3 / 7", md: "4 / 6" },
          gridRow: "1 / 2",
          display: "flex",
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

      {/* Breadcrumb izquierda - OCULTO EN MÓVIL */}
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

      {/* Texto con sangría - CORREGIDO */}
      <Box
        sx={{
          gridColumn: { xs: "1 / 13", md: "1 / 13" },
          gridRow: "2 / 3"
        }}
      >
        <Box
  component="section"
  sx={{
    py: 8,
    backgroundColor: "#fff",
    position: "relative",
    "--col-width": "calc((100% - 11 * 20px) / 12)",
    "--gutter-width": "20px",
    "--indent-width":
      "calc(3 * var(--col-width) + 3 * var(--gutter-width))",

    textIndent: "var(--indent-width)", // 👈 ahora sí funciona

    "@media (max-width: 768px)": {
      "--col-width": "calc((100% - 11 * 20px) / 12)",
      "--gutter-width": "20px",
      "--indent-width": "0px",
      textIndent: "0px",
    },
    width: "100%",
    maxWidth: "100%",
  }}
>
  <LightenText homeText={conoceMasText} />
</Box>

      </Box>
    </Box>
  );
}