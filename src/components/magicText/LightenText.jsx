import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

gsap.registerPlugin(ScrollTrigger);

const LightenText = ({ homeText, disableLightingEffect = false }) => {
  const lineWrapperRef = useRef([]);
  const containerRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // 'sm' or your mobile breakpoint

const splitText = (text) => {
  if (!text) return [];
  
  // Dividir por párrafos primero (doble salto de línea)
  const paragraphs = text.trim().split('\n\n');
  const lines = [];
  
  paragraphs.forEach((paragraph, paragraphIndex) => {
    if (paragraph.trim()) {
      // Dividir cada párrafo en líneas por saltos de línea simples
      const paragraphLines = paragraph.trim().split('\n');
      
      paragraphLines.forEach(line => {
        if (line.trim()) {
          lines.push(line.trim());
        }
      });
      
      // Agregar espacio entre párrafos (excepto el último)
      if (paragraphIndex < paragraphs.length - 1) {
        lines.push(''); // Línea vacía para espaciado
      }
    }
  });
  
  return lines;
};

  const textParts = splitText(homeText);

  useLayoutEffect(() => {
    // Skip animation setup if lighting effect is disabled
    if (disableLightingEffect) return;
    
    const wrappers = lineWrapperRef.current;
    
    // Clear any existing ScrollTriggers for this component
    wrappers.forEach((wrapper, index) => {
      ScrollTrigger.getById(`line-reveal-${index}`)?.kill();
    });
    
    // Create individual ScrollTriggers for each line for smoother effect
    wrappers.forEach((wrapper, index) => {
      if (!wrapper) return;
      
      const overlay = wrapper.querySelector(".line-overlay");
      if (!overlay) return;
      
      // Set initial state
      gsap.set(overlay, {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
      });
      
      // Create individual ScrollTrigger for each line
      gsap.to(overlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power2.out",
        duration: 0.8,
        scrollTrigger: {
          trigger: wrapper,
          start: "top 85%",
          end: "top 60%",
          scrub: 1,
          markers: false,
          id: `line-reveal-${index}`
        }
      });
    });
    
    // Cleanup function
    return () => {
      // Kill individual ScrollTriggers
      wrappers.forEach((wrapper, index) => {
        ScrollTrigger.getById(`line-reveal-${index}`)?.kill();
      });
    };
  }, [homeText, disableLightingEffect]);

  return (
    <div ref={containerRef} className="w-full">
      <div className="w-full text-left">
        {textParts.map((part, index) => {
          // Si es línea vacía (espaciado entre párrafos)
          if (part === '') {
            return <Box key={`space-${index}`} sx={{ height: "40px" }} />;
          }
          
          return (
            <div 
              key={`line-${index}`}
              ref={el => lineWrapperRef.current[index] = el}
              className="relative mb-2"
              style={{ textAlign: 'left', overflow: 'hidden' }}
            >
              {/* Base text (grey for lighting effect, dark for no effect) */}
              <Typography
                variant="p"
                fontSize={{
                  xs: "32px",  // Móvil - AJUSTAR AQUÍ
                  sm: "38px",  // Tablet pequeña
                  md: "50px",  // Desktop
                  lg: "70px"   // Desktop grande
                }}
                className="line"
                style={{
                  color: disableLightingEffect ? "#01263a" : "#b0b0b0",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "100",
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  lineHeight: "1.05",
                  letterSpacing: "-2px",
                  whiteSpace: "normal"
                }}
              >
                {part}
              </Typography>

              {/* Overlay text (dark) - animated - only when lighting effect is enabled */}
              {!disableLightingEffect && (
                <Typography
                  variant="p"
                  fontSize={{
                    xs: "32px",  // Móvil - AJUSTAR AQUÍ
                    sm: "38px",  // Tablet pequeña
                    md: "50px",  // Desktop
                    lg: "70px"   // Desktop grande
                  }}
                  className="line-overlay"
                  style={{
                    color: "#01263a",
                    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "100",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    textAlign: "left",
                    lineHeight: "1.05",
                    letterSpacing: "-2px",
                    whiteSpace: "normal"
                  }}
                >
                  {part}
                </Typography>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LightenText;