import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function MobileFloatingBar() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Detectar en qué página estamos
  const isHome = location.pathname === '/' || location.pathname === '/inicio';
  const isProcedimientos = location.pathname.startsWith('/procedimientos') || location.pathname.startsWith('/procedimiento');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const footerElement = document.querySelector('footer');

      // En Home, solo mostrar en la sección de procedimientos
      if (isHome) {
        const procedimientosSection = document.getElementById('procedimientos-home-section');
        if (procedimientosSection) {
          const rect = procedimientosSection.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Mostrar solo cuando la sección de procedimientos está visible
          // Consideramos que está visible cuando al menos el 20% de la sección está en pantalla
          const visibilityThreshold = windowHeight * 0.2;

          if (rect.top < windowHeight - visibilityThreshold && rect.bottom > visibilityThreshold) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
          return; // Salir temprano para Home
        } else {
          // Si no encuentra la sección, no mostrar en Home
          setIsVisible(false);
          return;
        }
      }

      // Para otras páginas (incluido Procedimientos)
      if (footerElement) {
        const footerRect = footerElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Ocultar cuando el footer es visible
        if (footerRect.top < windowHeight) {
          setIsVisible(false);
        } else {
          // Mostrar/ocultar basado en dirección del scroll
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down - ocultar
            setIsVisible(false);
          } else {
            // Scrolling up - mostrar
            setIsVisible(true);
          }
        }
      } else {
        // Si no hay footer, usar solo la lógica de scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }

      setLastScrollY(currentScrollY);
    };

    // Solo activar en móviles
    const checkMobile = () => {
      if (window.innerWidth <= 768) {
        window.addEventListener('scroll', handleScroll);
      } else {
        setIsVisible(false);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, [lastScrollY, isHome]);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: isVisible ? '20px' : '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: { xs: 'flex', md: 'none' }, // Solo visible en móviles
        zIndex: 1000,
        transition: 'bottom 0.3s ease-in-out',
        width: 'calc(100% - 40px)',
        maxWidth: '400px',
        px: '12px',
        py: '8px',
        borderRadius: '14px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12)',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        gap: '8px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component={RouterLink}
        to="/contacto"
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          px: '16px',
          py: '10px',
          borderRadius: '10px',
          backgroundColor: '#2563EB',
          color: '#fff',
          textDecoration: 'none',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '14px',
          fontWeight: 500,
          letterSpacing: '-0.01em',
          transition: 'all 0.2s ease',
          '&:active': {
            transform: 'scale(0.98)',
          },
        }}
      >
        Agendar consulta
        <ArrowForwardIcon sx={{ fontSize: 16 }} />
      </Box>

      <Box
        component={RouterLink}
        to="/procedimientos"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: '20px',
          py: '10px',
          borderRadius: '10px',
          backgroundColor: 'transparent',
          color: '#111',
          textDecoration: 'none',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '14px',
          fontWeight: 500,
          letterSpacing: '-0.01em',
          border: '1.5px solid rgba(0, 0, 0, 0.12)',
          transition: 'all 0.2s ease',
          '&:active': {
            transform: 'scale(0.98)',
          },
        }}
      >
        Ver todos
      </Box>
    </Box>
  );
}