import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * RevealText Component
 * Animates text word-by-word sliding up from a mask.
 * 
 * @param {string} text - The text to animate.
 * @param {object} sx - MUI style object for the container.
 * @param {number} stagger - Stagger time between words (default 0.02).
 * @param {number} duration - Duration of each word animation (default 1).
 * @param {string} trigger - CSS selector or element for ScrollTrigger.
 */
const RevealText = ({ 
  text, 
  sx = {}, 
  stagger = 0.02, 
  duration = 1,
  trigger,
  ...props
}) => {
  const containerRef = useRef(null);
  const words = text.split(' ');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wordElements = containerRef.current.querySelectorAll('.reveal-word-inner');
      
      gsap.fromTo(wordElements,
        { 
          y: '110%', 
          opacity: 0 
        },
        {
          y: '0%',
          opacity: 1,
          duration: duration,
          ease: 'power3.out',
          stagger: stagger,
          scrollTrigger: {
            trigger: trigger || containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [text, stagger, duration, trigger]);

  return (
    <Box
      ref={containerRef}
      {...props}
      sx={{
        ...sx,
        overflow: "visible", // Ensure no unintended clipping of the container
      }}
    >
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span
            style={{
              display: "inline-block",
              overflow: "hidden",
            }}
          >
            <span
              className="reveal-word-inner"
              style={{
                display: "inline-block",
                willChange: "transform",
                opacity: 0,
              }}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default RevealText;
