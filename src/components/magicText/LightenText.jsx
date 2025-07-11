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

const splitText = (text, maxCharsPerLine) => {
  if (!text || maxCharsPerLine <= 0) return [];
  
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';
  
  words.forEach(word => {
    if (currentLine.length + word.length + 1 <= maxCharsPerLine) {
      // Si la palabra cabe en la línea actual
      currentLine += (currentLine ? ' ' : '') + word;
    } else if (word.length > maxCharsPerLine) {
      // Manejar palabras muy largas
      if (currentLine) {
        lines.push(currentLine);
        currentLine = '';
      }
      
      // Dividir la palabra larga en múltiples líneas
      for (let i = 0; i < word.length; i += maxCharsPerLine) {
        const chunk = word.substring(i, i + maxCharsPerLine);
        lines.push(chunk);
      }
    } else {
      // Si no cabe, empezar nueva línea
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  });
  
  if (currentLine) lines.push(currentLine);
  
  return lines;
};

  const charsPerPart = isMobile ? 38 : 50;
  const textParts = splitText(homeText, charsPerPart);

  useLayoutEffect(() => {
    const wrappers = lineWrapperRef.current;
    
    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Create a timeline for sequential animations
    timelineRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        markers: false,
        id: "text-reveal-timeline"
      }
    });
    
    wrappers.forEach((wrapper, index) => {
      if (!wrapper) return;
      
      const overlay = wrapper.querySelector(".line-overlay");
      
      // Set initial state
      gsap.set(overlay, {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
      });
      
      // Add to timeline with staggered delay
      timelineRef.current.to(overlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "none",
        duration: 1
      }, index * 0.3); // 0.3 second delay between each line
    });
    
    // Cleanup function
    return () => {
      timelineRef.current?.scrollTrigger?.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full flex items-center justify-center p-4 bg-[#f8f8f8]">
      <div className="flex items-center justify-center about-intro max-w-4xl w-full min-w-[95vw] mx-4">
        <div>
          {textParts.map((part, index) => (
            <div 
              key={`line-${index}`}
              ref={el => lineWrapperRef.current[index] = el}
              className={`relative flex mb-2 items-start justify-start text-start ${index === 0 ? 'justify-end' : ''}`}
            >
              <Box sx={{ width: "90vw", height: "auto"}}>
                {/* Base text (dark) - Fixed positioning */}
                <Typography 
                  variant="p"
                  fontWeight={"bold"}
                  fontSize={{xs: "18px", sm: "30px", md: "40px", lg: "55px"}}
                  className="line"
                  style={{
                    color: "#e9e9e9",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "100",
                    position: "absolute",
                    display: "flex",
                    width: "90%",
                    justifyContent: index === 0 ? "flex-end" : "flex-start",
                    zIndex: 0,
                    textWrap: "nowrap",
                  }}
                >
                  {part}
                </Typography>
              </Box>


              <Box sx={{ width: "90%", height: "auto"}}>
                {/* Overlay text (light) - Remove clipPath for visibility */}
                <Typography 
                  variant="p"
                  fontWeight={"bold"}
                  fontSize={{xs: "18px", sm: "30px", md: "40px", lg: "55px"}}
                  className="line-overlay"
                  style={{
                    color: "#01263a",
                    // Remove clipPath to make visible (or adjust for your animation):
                    // clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", 
                    display: "flex",
                    width: "100%",
                    marginRight: "70px",
                    justifyContent: index === 0 ? "flex-end" : "flex-start",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "100",
                    textWrap: "nowrap"
                  }}
                  sx={{ zIndex: 1 }}
                >
                  {part}
                </Typography>
              </Box>
              
              {index === 4 && <Box sx={{ height: "50px"}}/>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LightenText;