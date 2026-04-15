/**
 * BLUR SCROLL EFFECT - Componente React
 * ======================================
 * Efecto de blur reveal al hacer scroll con GSAP
 * Componentes React listos para usar
 *
 * Dependencias requeridas:
 * npm install gsap @studio-freight/lenis split-type
 *
 * Uso:
 * import { BlurText, BlurScrollProvider } from './BlurScrollEffect'
 */

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/dist/lenis-react';
import SplitType from 'split-type';

// Registrar ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================
// REMOVED: Context para Lenis - Ahora usamos la instancia global
// ============================================

// Export para compatibilidad - ahora usa el hook de lenis/react
export { useLenis };

/**
 * BlurScrollProvider ya no es necesario - mantenemos para compatibilidad
 * @deprecated Use ReactLenis en App.jsx en su lugar
 */
export const BlurScrollProvider = ({ children }) => {
  // Solo retorna los children sin crear nueva instancia de Lenis
  return <>{children}</>;
};

// ============================================
// HOOK para Text Splitting
// ============================================

const useTextSplitter = (elementRef, splitTypeTypes = 'words, chars') => {
  const [splitText, setSplitText] = useState(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const split = new SplitType(elementRef.current, {
      types: splitTypeTypes
    });

    setSplitText(split);

    // Manejar resize
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        split.split();
        ScrollTrigger.refresh();
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      split.revert();
    };
  }, [elementRef, splitTypeTypes]);

  return splitText;
};

// ============================================
// COMPONENTE PRINCIPAL: BlurText
// ============================================

/**
 * Componente BlurText - Texto con efecto blur al scroll
 *
 * Props:
 * - children: El texto a animar
 * - effect: Tipo de efecto (1, 2, 3, 4)
 * - className: Clases CSS adicionales
 * - options: Opciones personalizadas para la animación
 */
export const BlurText = ({
  children,
  effect = 1,
  className = '',
  options = {},
  ...props
}) => {
  const textRef = useRef(null);
  const splitText = useTextSplitter(textRef, getEffectSplitType(effect));

  useEffect(() => {
    if (!splitText || !textRef.current) return;

    const animation = createBlurAnimation(textRef.current, splitText, effect, options);

    return () => {
      if (animation) animation.kill();
    };
  }, [splitText, effect, options]);

  return (
    <div ref={textRef} className={`blur-text ${className} text-start `} {...props}>
      {children}
    </div>
  );
};

// ============================================
// FUNCIONES HELPER
// ============================================

/**
 * Determina qué tipo de split usar según el efecto
 */
const getEffectSplitType = (effect) => {
  switch (effect) {
    case 4:
      return 'words';
    default:
      return 'words, chars';
  }
};

/**
 * Crea la animación GSAP según el efecto seleccionado
 */
const createBlurAnimation = (element, splitText, effect, customOptions) => {
  const defaultOptions = {
    start: 'top bottom-=45%',
    end: 'bottom center+=5%',
    stagger: effect === 4 ? 0.08 : 0.1,
  };

  const options = { ...defaultOptions, ...customOptions };

  switch (effect) {
    case 1:
      return createEffect1(splitText.chars, element, options);
    case 2:
      return createEffect2(splitText.chars, element, options);
    case 3:
      return createEffect3(splitText.chars, element, options);
    case 4:
      return createEffect4(splitText.words, element, options);
    default:
      return createEffect1(splitText.chars, element, options);
  }
};

/**
 * Efecto 1: Blur + Brightness (0% a 100%)
 */
const createEffect1 = (targets, trigger, options) => {
  return gsap.fromTo(targets,
    {
      filter: 'blur(100px) brightness(0%)',
      willChange: 'filter',
      opacity: 0.3,
    },
    {
      ease: 'power2.out',
      opacity: 1,
      filter: 'blur(0px) brightness(100%)',
      stagger: options.stagger,
      scrollTrigger: {
        trigger,
        start: options.start,
        end: options.end,
        scrub: 1.5,
      },
    }
  );
};

/**
 * Efecto 2: Blur + Brightness (30% a 100%)
 */
const createEffect2 = (targets, trigger, options) => {
  return gsap.fromTo(targets,
    {
      filter: 'blur(10px) brightness(30%)',
      willChange: 'filter',
      opacity: 0.3,
    },
    {
      ease: 'power2.out',
      opacity: 0.5,
      filter: 'blur(0px) brightness(100%)',
      stagger: options.stagger,
      scrollTrigger: {
        trigger,
        start: options.start,
        end: options.end,
        scrub: 1.5,
      },
    }
  );
};

/**
 * Efecto 3: Blur + Scale + Brightness
 */
const createEffect3 = (targets, trigger, options) => {
  return gsap.fromTo(targets,
    {
      scaleY: 0.1,
      scaleX: 1.8,
      filter: 'blur(10px) brightness(50%)',
      willChange: 'filter, transform',
      opacity: 0.4,
    },
    {
      ease: 'power1.inOut',
      opacity: 0.6,
      scaleY: 1,
      scaleX: 1,
      filter: 'blur(0px) brightness(100%)',
      stagger: options.stagger,
      scrollTrigger: {
        trigger,
        start: options.start,
        end: options.end,
        scrub: 1.5,
      },
    }
  );
};

/**
 * Efecto 4: Blur + Opacity + Skew (por palabras)
 */
const createEffect4 = (targets, trigger, options) => {
  return gsap.fromTo(targets,
    {
      opacity: 0,
      skewX: -20,
      willChange: 'filter, transform',
      filter: 'blur(8px)'
    },
    {
      ease: 'power2.inOut',
      opacity: 1,
      skewX: 0,
      filter: 'blur(0px)',
      stagger: options.stagger,
      scrollTrigger: {
        trigger,
        start: options.start,
        end: options.end,
        scrub: 1.5,
      },
    }
  );
};

// ============================================
// COMPONENTES ESPECÍFICOS (shortcuts)
// ============================================

export const BlurText1 = (props) => <BlurText effect={1} {...props} />;
export const BlurText2 = (props) => <BlurText effect={2} {...props} />;
export const BlurText3 = (props) => <BlurText effect={3} {...props} />;
export const BlurText4 = (props) => <BlurText effect={4} {...props} />;

// Export default
export default BlurText;