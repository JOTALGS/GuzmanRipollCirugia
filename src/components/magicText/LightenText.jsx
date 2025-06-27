import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Box, Typography } from "@mui/material";

gsap.registerPlugin(ScrollTrigger);

const LightenText = () => {
  const lineWrapperRef = useRef([]);
  const containerRef = useRef(null);
  const timelineRef = useRef(null);


  // Text content and splitting logic
  const homeText = `
    Cirugia plastica estetica y recontructiva.
    Nuestra experiencia refinada radica en canalizar el deseo:
    desde la confianza corporal hasta el bienestar integral,
    desde tratamientos simples hasta cirugias
    reconstructivas.
    Como expertos en cirugía mamaria, ofrecemos
    tratamientos personalizados que combinan precisión
    tecnológica con un cuidado humano excepcional.
  `;

  const splitText = (text, parts) => {
    const words = text.split(' ');
    const partLength = Math.ceil(words.length / parts);
    const result = [];
    
    for (let i = 0; i < parts; i++) {
      const start = i * partLength;
      const end = start + partLength;
      result.push(words.slice(start, end).join(' '));
    }
    
    return result;
  };

  const textParts = splitText(homeText, 8);

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
              {/* Base text (dark) */}
              <Typography 
                variant="p"
                fontWeight={"bold"}
                fontSize={{xs: "20px", sm: "30px", md: "40px", lg: "60px"}}
                className="line"
                style={{
                  color: "#e9e9e9",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "100",
                  position: "absolute",
                  display: "flex" ,
                  width: "90%",
                  justifyContent: index === 0 ? "flex-end" : "flex-start",
                  zIndex: 0,
                  textWrap: "nowrap"
                }}
              >
                {part}
              </Typography>

              {/* Overlay text (light) */}
              <Typography 
                variant="p"
                fontWeight={"bold"}
                fontSize={{xs: "20px", sm: "30px", md: "40px", lg: "60px"}}
                className="line-overlay"
                style={{
                  color: "#01263a",
                  clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                  display: "flex" ,
                  width: "98.46%",
                  justifyContent: index === 0 ? "flex-end" : "flex-start",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "100",
                  textWrap: "nowrap"
                }}
                sx={{ zIndex: 1 }}
                >
                {part}
              </Typography>
              {index === 4 && (
                <Box sx={{ height: "50px"}}/>
              )}
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LightenText;