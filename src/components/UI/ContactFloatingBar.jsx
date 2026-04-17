import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Sparkles, X, MessageCircle } from 'lucide-react';
import BeamCTAButton from './BeamCTAButton';

export default function ContactFloatingBar() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const isContacto = location.pathname === '/contacto';

  useEffect(() => {
    if (isContacto) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }

    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isContacto]);

  useEffect(() => {
    setIsPanelOpen(false);
  }, [location.pathname]);

  const buttonText = isContacto ? 'Ver todos' : 'Agendar consulta';
  const buttonLink = isContacto ? '/procedimientos' : '/contacto';

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: isPanelOpen ? '110px' : '-400px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          zIndex: 999,
          width: 'calc(100% - 40px)',
          maxWidth: '400px',
          borderRadius: '20px',
          background: 'linear-gradient(160deg, rgba(28, 30, 36, 0.88), rgba(18, 20, 24, 0.92))',
          backdropFilter: 'blur(40px) saturate(200%)',
          WebkitBackdropFilter: 'blur(40px) saturate(200%)',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.06)',
          borderRight: '1px solid rgba(255, 255, 255, 0.04)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.02)',
          boxShadow: '0 -8px 40px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
          transition: 'bottom 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: '20px',
            pt: '18px',
            pb: '12px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} color="rgba(255,255,255,0.6)" />
            <Typography
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '13px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.9)',
                letterSpacing: '0.02em',
              }}
            >
              Proceso Personalizado
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            height: '1px',
            mx: '20px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
          }}
        />

        <Box sx={{ px: '24px', py: '18px', textAlign: 'left' }}>
          <Typography
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '13px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.7)',
              fontWeight: 400,
              letterSpacing: '0.01em',
            }}
          >
            Evaluamos cada caso de forma individual para disenar un plan quirurgico a medida, adaptado a tu anatomia y expectativas reales. Nuestro compromiso es brindarte un seguimiento profesional continuo en cada etapa, asegurando resultados naturales y una recuperacion optima.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          position: 'fixed',
          bottom: isVisible ? { xs: 'calc(20px + env(safe-area-inset-bottom))', md: '34px' } : '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: { xs: 'flex', md: 'none' },
          zIndex: 1000,
          transition: 'all 0.6s cubic-bezier(0.32, 0.72, 0, 1)',
          width: isPanelOpen ? '60px' : 'auto',
          height: '54px',
          minWidth: isPanelOpen ? '60px' : '300px',
          px: isPanelOpen ? 0 : '10px',
          py: '6px',
          borderRadius: '100px',
          background: `
            radial-gradient(ellipse at 50% -20%, rgba(255, 255, 255, 0.25) 0%, transparent 75%),
            radial-gradient(ellipse at 50% 125%, rgba(255, 255, 255, 0.12) 0%, transparent 70%),
            rgba(22, 24, 28, 0.82)
          `,
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '0.5px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), inset 0 0.5px 0 rgba(255, 255, 255, 0.15)',
          gap: '8px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!isPanelOpen && (
          <BeamCTAButton
            to={buttonLink}
            fullWidth
            tone="dark"
            sx={{
              flex: 1,
              minHeight: '42px',
              px: '20px',
              py: '10px',
              fontSize: '13px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
            beamProps={{
              strength: 0.34,
              brightness: 1.05,
            }}
          >
            {buttonText}
          </BeamCTAButton>
        )}

        {!isPanelOpen && (
          <Box
            component="a"
            href="https://wa.me/5491112345678"
            target="_blank"
            sx={{
              width: '46px',
              height: '46px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(30, 80, 200, 0.45), rgba(20, 60, 160, 0.4))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(30, 80, 200, 0.6)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.4)',
              color: '#fff',
              transition: 'all 0.2s ease',
              '&:active': { transform: 'scale(0.9)' },
            }}
          >
            <MessageCircle size={20} fill="rgba(255,255,255,0.2)" />
          </Box>
        )}

        <Box
          onClick={() => setIsPanelOpen((prev) => !prev)}
          sx={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            cursor: 'pointer',
            background: isPanelOpen ? 'rgba(60, 62, 68, 0.6)' : 'rgba(255, 255, 255, 0.1)',
            border: '1.5px solid rgba(255, 255, 255, 0.15)',
            boxShadow: 'inset 0 1.5px 0 rgba(255, 255, 255, 0.4)',
            transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
            '&:active': { transform: 'scale(0.9)' },
            width: isPanelOpen ? '44px' : '46px',
            height: isPanelOpen ? '44px' : '46px',
          }}
        >
          {isPanelOpen ? (
            <X size={20} color="#fff" strokeWidth={2.5} />
          ) : (
            <Sparkles size={20} color="#fff" strokeWidth={1.5} />
          )}
        </Box>
      </Box>
    </>
  );
}
