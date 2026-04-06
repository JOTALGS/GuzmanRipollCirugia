import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box } from '@mui/material';

gsap.registerPlugin(ScrollTrigger);

/**
 * FadeInText - Componente optimizado para animar textos con blur fade
 * Perfectamente integrado con Material-UI
 */
const FadeInText = ({
  children,
  delay = 0,
  duration = 0.8,
  yOffset = 20,
  blur = 8,
  triggerStart = "top 90%",
  component = "div",
  sx = {},
  ...props
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Estado inicial
    gsap.set(element, {
      opacity: 0,
      y: yOffset,
      filter: `blur(${blur}px)`,
    });

    // Animación
    const animation = gsap.to(element, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: duration,
      delay: delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: triggerStart,
        toggleActions: "play none none none",
      },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [delay, duration, yOffset, blur, triggerStart]);

  return (
    <Box
      ref={elementRef}
      component={component}
      sx={{
        willChange: 'transform, opacity, filter',
        ...sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default FadeInText;
