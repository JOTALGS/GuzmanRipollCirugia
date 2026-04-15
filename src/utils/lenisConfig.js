import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/**
 * Configuración de integración entre Lenis y GSAP ScrollTrigger
 * Esta función debe ser llamada después de que Lenis esté inicializado
 */
export const setupLenisScrollTrigger = (lenis) => {
  if (!lenis) return;

  // Actualizar ScrollTrigger cuando Lenis hace scroll
  lenis.on('scroll', ScrollTrigger.update);

  // Sincronizar GSAP ticker con Lenis
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Mejorar la suavidad
  gsap.ticker.lagSmoothing(0);

  // Hacer que ScrollTrigger use el método de Lenis para obtener la posición de scroll
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scroll = value;
      }
      return lenis.scroll || 0;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    pinType: 'transform'
  });

  // Refrescar ScrollTrigger después de setup
  ScrollTrigger.refresh();

  // Cleanup function
  return () => {
    lenis.off('scroll', ScrollTrigger.update);
    gsap.ticker.remove((time) => lenis.raf(time * 1000));
  };
};

/**
 * Hook personalizado para usar con ReactLenis
 * Permite acceso directo a la instancia de Lenis desde cualquier componente
 */
export const useLenisScroll = (callback, deps = []) => {
  useEffect(() => {
    if (!callback) return;

    const lenis = window.lenis;
    if (!lenis) {
      console.warn('Lenis instance not found. Make sure ReactLenis is properly initialized.');
      return;
    }

    lenis.on('scroll', callback);

    return () => {
      lenis.off('scroll', callback);
    };
  }, deps);
};