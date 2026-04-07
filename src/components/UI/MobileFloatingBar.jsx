import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function MobileFloatingBar() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Detectar en qué página estamos
  const isHome = location.pathname === '/' || location.pathname === '/inicio';
  const isProcedimientos = location.pathname.startsWith('/procedimientos') || location.pathname.startsWith('/procedimiento');
  const isContacto = location.pathname === '/contacto';

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
          // Consideramos que está visible cuando al menos el 10% de la sección está en pantalla
          // Y nos aseguramos de no mostrarlo si estamos muy arriba (en el Hero)
          const visibilityThreshold = windowHeight * 0.1;

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
        // Para páginas sin footer (landing de procedimientos, etc)
        if (currentScrollY > 100) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }

      setLastScrollY(currentScrollY);
    };

    // Activar listeners
    const checkVisibility = () => {
      handleScroll(); // Chequeo inicial
      window.addEventListener('scroll', handleScroll);
    };

    checkVisibility();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, isHome, location.pathname]);

  // Don't show on contacto page (has its own floating bar)
  if (isContacto) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: isVisible ? '34px' : '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: { xs: 'flex', md: 'none' },
        zIndex: 1000,
        transition: 'bottom 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        width: 'auto',
        minWidth: '340px',
        maxWidth: '96%',
        px: '8px',
        py: '8px',
        borderRadius: '100px',
        background: 'rgba(35, 38, 45, 0.8)',
        backdropFilter: 'blur(32px) saturate(180%)',
        WebkitBackdropFilter: 'blur(32px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component={RouterLink}
        to="/contacto"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          px: '22px',
          py: '12px',
          borderRadius: '100px',
          background: 'linear-gradient(135deg, rgba(30, 80, 200, 0.7), rgba(20, 60, 160, 0.6))',
          backdropFilter: 'blur(10px)',
          color: '#fff',
          textDecoration: 'none',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '13px',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          transition: 'all 0.2s ease',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: 'inset 0 1.5px 0 rgba(255, 255, 255, 0.3), 0 4px 12px rgba(20, 60, 160, 0.2)',
          '&:active': { transform: 'scale(0.98)' },
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
          px: '18px',
          py: '12px',
          borderRadius: '100px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          color: '#fff',
          textDecoration: 'none',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '13px',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          transition: 'all 0.2s ease',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: 'inset 0 1.5px 0 rgba(255, 255, 255, 0.2)',
          '&:active': { transform: 'scale(0.98)' },
        }}
      >
        Ver más
      </Box>
    </Box>
  );
}