import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

gsap.registerPlugin(ScrollTrigger);

const LightenText = ({ homeText }) => {
  const lineWrapperRef = useRef([]);
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // 'sm' or your mobile breakpoint
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const splitText = (text, maxCharsPerLine, firstLineShorten = 15) => {
    if (!text || maxCharsPerLine <= 0) return [];

    const firstLimit = Math.max(1, maxCharsPerLine - Math.max(0, firstLineShorten));
    let currentLimit = firstLimit;

    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    const fits = (line, word, limit) =>
      (line.length ? line.length + 1 : 0) + word.length <= limit;

    for (const word of words) {
      if (fits(currentLine, word, currentLimit)) {
        currentLine += (currentLine ? ' ' : '') + word;
        continue;
      }

      if (word.length > currentLimit) {
        // flush current line if it has content
        if (currentLine) {
          lines.push(currentLine);
          currentLine = '';
          // after the first line is finalized, all subsequent lines use maxCharsPerLine
          currentLimit = maxCharsPerLine;
        }

        // split the long word respecting the shorter first line for the first chunk only
        let remaining = word;
        while (remaining.length > 0) {
          const limit = lines.length === 0 ? firstLimit : maxCharsPerLine;
          lines.push(remaining.slice(0, limit));
          remaining = remaining.slice(limit);
        }
        // after splitting a long word, next lines use the normal limit
        currentLimit = maxCharsPerLine;
        continue;
      }

      // word doesn't fit; push current line and start a new one
      if (currentLine) {
        lines.push(currentLine);
      }
      currentLine = word;
      // after the first line is finalized, switch to the normal limit
      if (lines.length >= 1) currentLimit = maxCharsPerLine;
    }

    if (currentLine) lines.push(currentLine);

    return lines;
  };

  // usage stays the same
  const charsPerPart = isMobile ? 38 : isTablet ? 42 : isDesktop ? 53 : 55;
  const textParts = splitText(homeText, charsPerPart);

useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    // limpiar
    ScrollTrigger.getAll().forEach(t => t.kill());

    lineWrapperRef.current.forEach((wrapper) => {
      if (!wrapper) return;
      const overlay = wrapper.querySelector(".line-overlay");
      if (!overlay) return;

      // estado inicial
      gsap.set(overlay, {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        willChange: "clip-path",
      });

      // ✅ Trigger por línea (robusto en mobile)
      gsap.to(overlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top 85%",   // cuando la línea entra
          end: "top 30%",     // y mientras sube
          scrub: true,
          // markers: true,    // útil para depurar
          invalidateOnRefresh: true,
        },
      });
    });

    // refrescar en resize/orientation/teclado
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    // refrescar tras carga de fuentes (evita descalces de altura)
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
  }, containerRef);

  return () => {
    ctx.revert();
    ScrollTrigger.getAll().forEach(t => t.kill());
  };
  // IMPORTANTE: si cambia el texto/partición, recalculá triggers
}, [textParts.length]);


  return (
    <div ref={containerRef} className="w-full flex items-center justify-center py-4">
      <div className="flex items-center justify-center about-intro w-full">
        <div>
          {textParts.map((part, index) => (
            <div 
              key={`line-${index}`}
              ref={el => lineWrapperRef.current[index] = el}
              className={`relative flex mb-2 items-start justify-start text-start `}
            >
              <Box sx={{ width: "auto", height: "auto", backgroundColor: "transparent"}}>
                {/* Base text (dark) - Fixed positioning */}
                <Typography 
                  variant="p"
                  fontWeight={"bold"}
                  className="line"
                  backgroundColor={"transparent"}
                  marginLeft={index === 0 ? { xs: "25px", md: "450px" } : { xs: "0px", md: "0px" }}
                  sx={{
                    // 18–56/70px según viewport, pero suave:
                    fontSize: {
                      xs: 'clamp(18px, 5vw, 28px)',
                      sm: 'clamp(24px, 4.5vw, 36px)',
                      md: 'clamp(32px, 3.5vw, 48px)',
                      lg: 'clamp(40px, 3.5vw, 56px)',
                      xl: 'clamp(55px, 3.5vw, 75px)',
                    },
                    lineHeight: { xs: 1.25, sm: 1.2, md: 1.15, lg: 1.05 },
                    letterSpacing: { xs: '-1px', md: '-2px' },

                    // 🔒 Control de ancho por caracteres: evita overflow tanto a 100% como 125%
                    maxWidth: { xs: '32ch', sm: '44ch', md: '56ch', lg: '60ch' },

                    // ❌ No fuerces a una sola línea
                    whiteSpace: 'normal',
                    overflowWrap: 'anywhere',

                    // Indent 1ª línea sin px mágicos
                    textIndent: index === 0 ? { xs: '2ch', md: '6ch' } : 0,
                    // Si preferís desplazar en lugar de indent:
                    ml: index === 0 ? { xs: '4vw', md: '12vw' } : 0,

                    // Por si el contenedor es más chico
                    width: 'fit-content',
                  }}

                  style={{
                    color: "#e9e9e9",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "100",
                    position: "absolute",
                    display: "flex",
                    width: "100%",
                    justifyContent: "flex-start",
                    zIndex: 0,
                    textWrap: "nowrap",
                  }}
                >
                  {part}
                </Typography>
              </Box>


              <Box sx={{ width: "100%", height: "auto", backgroundColor: "transparent"}}>
                {/* Overlay text (light) - Remove clipPath for visibility */}
                <Typography 
                  variant="p"
                  fontWeight={"bold"}
                  className="line-overlay"
                  backgroundColor={"transparent"}
                  marginLeft={index === 0 ? { xs: "25px", md: "450px" } : { xs: "0px", md: "0px" }}

                  sx={{
                    // 18–56/70px según viewport, pero suave:
                    fontSize: {
                      xs: 'clamp(18px, 5vw, 28px)',
                      sm: 'clamp(24px, 4.5vw, 36px)',
                      md: 'clamp(32px, 3.5vw, 48px)',
                      lg: 'clamp(40px, 3.5vw, 56px)',
                      xl: 'clamp(55px, 3.5vw, 75px)',
                    },
                    lineHeight: { xs: 1.25, sm: 1.2, md: 1.15, lg: 1.05 },
                    letterSpacing: { xs: '-1px', md: '-2px' },

                    // 🔒 Control de ancho por caracteres: evita overflow tanto a 100% como 125%
                    maxWidth: { xs: '32ch', sm: '44ch', md: '56ch', lg: '60ch' },

                    // ❌ No fuerces a una sola línea
                    whiteSpace: 'normal',
                    overflowWrap: 'anywhere',

                    // Indent 1ª línea sin px mágicos
                    textIndent: index === 0 ? { xs: '2ch', md: '6ch' } : 0,
                    // Si preferís desplazar en lugar de indent:
                    ml: index === 0 ? { xs: '4vw', md: '12vw' } : 0,

                    // Por si el contenedor es más chico
                    width: 'fit-content',
                    zIndex: 1,
                  }}

                  style={{
                    color: "#01263a",
                    display: "flex",
                    width: "100%",
                    justifyContent: "flex-start",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "100",
                    textWrap: "nowrap"
                  }}
                >
                  {part}
                </Typography>
              </Box>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LightenText;