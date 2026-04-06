import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * BlurFadeIn - Componente de animación moderna con efecto blur + fade
 *
 * @param {React.ReactNode} children - Contenido a animar
 * @param {number} delay - Retraso antes de iniciar la animación (segundos)
 * @param {number} duration - Duración de la animación (segundos)
 * @param {number} yOffset - Desplazamiento vertical inicial (px)
 * @param {number} blur - Cantidad de blur inicial (px)
 * @param {string} triggerStart - Punto de inicio del ScrollTrigger
 * @param {boolean} once - Si la animación se ejecuta solo una vez
 * @param {string} ease - Tipo de easing de GSAP
 */
const BlurFadeIn = ({
  children,
  delay = 0,
  duration = 1,
  yOffset = 30,
  blur = 10,
  triggerStart = "top 85%",
  once = true,
  ease = "power3.out",
  className = "",
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

    // Animación con ScrollTrigger
    const animation = gsap.to(element, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: duration,
      delay: delay,
      ease: ease,
      scrollTrigger: {
        trigger: element,
        start: triggerStart,
        toggleActions: once ? "play none none none" : "play none none reverse",
      },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, [delay, duration, yOffset, blur, triggerStart, once, ease]);

  return (
    <div ref={elementRef} className={className} {...props}>
      {children}
    </div>
  );
};

export default BlurFadeIn;
