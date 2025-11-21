/**
 * BLUR SCROLL EFFECT - Componente React con Estilos Inline
 * ==========================================================
 * Efecto de blur reveal al hacer scroll con GSAP
 * Todo en un solo archivo JSX (sin CSS externo)
 *
 * Dependencias requeridas:
 * npm install gsap @studio-freight/lenis split-type
 */

import React, { useEffect, useRef, useState, createContext, useContext } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import SplitType from 'split-type';

// Registrar ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================
// ESTILOS INLINE
// ============================================

const styles = {
  blurText: {
    lineHeight: 1.2,
    fontSize: 'clamp(1.5rem, 5vw, 3rem)',
    width: '100%',
    maxWidth: '1000px',
    margin: '0 auto',
  },

  blurText1: {
    fontWeight: 420,
    letterSpacing: '-0.05em',
  },

  blurText2: {
    fontWeight: 300,
    fontFamily: 'monospace',
  },

  blurText3: {
    fontWeight: 600,
    letterSpacing: '-0.05em',
  },

  blurText4: {
    fontWeight: 400,
    letterSpacing: '-0.05em',
  },

  blurScrollSection: {
    padding: '2rem',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: '#000',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loader: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    opacity: 0.4,
    background: '#fff',
    animation: 'loaderAnim 0.7s linear infinite alternate forwards',
  }
};

// Inject keyframe animation
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes loaderAnim {
      to {
        opacity: 1;
        transform: scale3d(0.5, 0.5, 1);
      }
    }
  `;
  document.head.appendChild(styleSheet);
}

// ============================================
// CONTEXT para Lenis (Smooth Scroll)
// ============================================

const LenisContext = createContext(null);

export const useLenis = () => {
  return useContext(LenisContext);
};

/**
 * Provider para Smooth Scrolling con Lenis
 */
export const BlurScrollProvider = ({ children, options = {} }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.2,
      smoothWheel: true,
      ...options
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
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

export const BlurText = ({
  children,
  effect = 1,
  className = '',
  style = {},
  options = {},
  ...props
}) => {
  const textRef = useRef(null);
  const splitText = useTextSplitter(textRef, getEffectSplitType(effect));

  // Combinar estilos base con estilos específicos del efecto
  const combinedStyles = {
    ...styles.blurText,
    ...getEffectStyle(effect),
    ...style
  };

  useEffect(() => {
    if (!splitText || !textRef.current) return;

    const animation = createBlurAnimation(textRef.current, splitText, effect, options);

    return () => {
      if (animation) animation.kill();
    };
  }, [splitText, effect, options]);

  return (
    <div
      ref={textRef}
      className={`blur-text ${className}`}
      style={combinedStyles}
      {...props}
    >
      {children}
    </div>
  );
};

// ============================================
// COMPONENTE: BlurScrollSection
// ============================================

export const BlurScrollSection = ({ children, style = {}, ...props }) => {
  return (
    <section
      style={{ ...styles.blurScrollSection, ...style }}
      {...props}
    >
      {children}
    </section>
  );
};

// ============================================
// FUNCIONES HELPER
// ============================================

const getEffectStyle = (effect) => {
  switch (effect) {
    case 1:
      return styles.blurText1;
    case 2:
      return styles.blurText2;
    case 3:
      return styles.blurText3;
    case 4:
      return styles.blurText4;
    default:
      return styles.blurText1;
  }
};

const getEffectSplitType = (effect) => {
  switch (effect) {
    case 4:
      return 'words';
    default:
      return 'words, chars';
  }
};

const createBlurAnimation = (element, splitText, effect, customOptions) => {
  const defaultOptions = {
    start: 'top bottom',
    end: 'bottom top+=20%',
    stagger: effect === 4 ? 0.02 : 0.03,
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

// Efecto 1: Blur + Brightness (0% a 100%)
const createEffect1 = (targets, trigger, options) => {
  // Configurar estado inicial antes de la animación
  gsap.set(targets, {
    filter: 'blur(10px) brightness(0%)',
  });

  return gsap.to(targets, {
    ease: 'none',
    filter: 'blur(0px) brightness(100%)',
    stagger: options.stagger,
    scrollTrigger: {
      trigger,
      start: options.start,
      end: options.end,
      scrub: true,
      // Mantener el estado inicial hasta que empiece el scroll
      immediateRender: true,
    },
  });
};

// Efecto 2: Blur + Brightness (30% a 100%)
const createEffect2 = (targets, trigger, options) => {
  gsap.set(targets, {
    filter: 'blur(10px) brightness(30%)',
  });

  return gsap.to(targets, {
    ease: 'none',
    filter: 'blur(0px) brightness(100%)',
    stagger: options.stagger,
    scrollTrigger: {
      trigger,
      start: options.start,
      end: options.end,
      scrub: true,
      immediateRender: true,
    },
  });
};

// Efecto 3: Blur + Scale + Brightness
const createEffect3 = (targets, trigger, options) => {
  gsap.set(targets, {
    scaleY: 0.1,
    scaleX: 1.8,
    filter: 'blur(10px) brightness(50%)',
  });

  return gsap.to(targets, {
    ease: 'none',
    scaleY: 1,
    scaleX: 1,
    filter: 'blur(0px) brightness(100%)',
    stagger: options.stagger,
    scrollTrigger: {
      trigger,
      start: options.start,
      end: options.end,
      scrub: true,
      immediateRender: true,
    },
  });
};

// Efecto 4: Blur + Opacity + Skew (por palabras)
const createEffect4 = (targets, trigger, options) => {
  gsap.set(targets, {
    opacity: 0,
    skewX: -20,
    filter: 'blur(8px)',
  });

  return gsap.to(targets, {
    ease: 'sine',
    opacity: 1,
    skewX: 0,
    filter: 'blur(0px)',
    stagger: options.stagger,
    scrollTrigger: {
      trigger,
      start: options.start,
      end: options.end,
      scrub: true,
      immediateRender: true,
    },
  });
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
