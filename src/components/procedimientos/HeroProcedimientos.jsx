import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@mui/material';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroProcedimientos() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const descRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: 'Cirugía Plástica' },
    { id: 1, label: 'Estética' },
    { id: 2, label: 'Reconstructiva' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate headline lines
      const lineElements = gsap.utils.toArray(".hero-line");
      if (lineElements.length > 0) {
        gsap.fromTo(lineElements,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.15,
            delay: 0.2
          }
        );
      }

      // Animate description
      if (descRef.current) {
        gsap.fromTo(descRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: 0.6
          }
        );
      }

      // Animate CTA button
      const ctaElement = document.querySelector(".hero-cta");
      if (ctaElement) {
        gsap.fromTo(ctaElement,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: 0.8
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={heroRef}
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: { xs: '100vh', md: '100vh' },
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: { xs: '20px', md: '40px' },
      }}
    >
      {/* Glass Container */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: '1200px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: { xs: '24px', md: '32px' },
          border: '1px solid rgba(255, 255, 255, 0.18)',
          padding: { xs: '40px 24px', md: '80px 60px' },
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            padding: '1px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05))',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'xor',
            WebkitMaskComposite: 'xor',
            pointerEvents: 'none',
          }
        }}
      >
        {/* Pills Navigation */}
        <Box
          sx={{
            display: 'flex',
            gap: '8px',
            mb: { xs: '40px', md: '60px' },
            padding: '6px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '100px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            width: 'fit-content',
            mx: 'auto',
          }}
        >
          {tabs.map((tab) => (
            <Box
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              sx={{
                padding: { xs: '10px 20px', md: '12px 28px' },
                borderRadius: '100px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                background: activeTab === tab.id
                  ? 'rgba(255, 255, 255, 0.95)'
                  : 'transparent',
                boxShadow: activeTab === tab.id
                  ? '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 1)'
                  : 'none',
                '&:hover': {
                  background: activeTab === tab.id
                    ? 'rgba(255, 255, 255, 0.95)'
                    : 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: { xs: '13px', md: '14px' },
                  fontWeight: activeTab === tab.id ? 600 : 500,
                  color: activeTab === tab.id ? '#1a1a1a' : 'rgba(255, 255, 255, 0.9)',
                  letterSpacing: '-0.01em',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {tab.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Main Headline */}
        <Box
          ref={headlineRef}
          sx={{
            width: '100%',
            mb: { xs: '32px', md: '48px' },
            textAlign: 'center',
          }}
        >
          <Typography
            component="h1"
            sx={{
              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: {
                xs: '36px',
                sm: '44px',
                md: '56px',
                lg: '64px',
              },
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            Cirugía Plástica Estética y Reconstructiva,
            <br />
            especializados en brindar soluciones avanzadas
          </Typography>
        </Box>

        {/* CTA Buttons */}
        <Box
          className="hero-cta"
          sx={{
            display: 'flex',
            gap: { xs: '12px', md: '16px' },
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Button
            variant="contained"
            href="#contact"
            sx={{
              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: { xs: '14px', md: '15px' },
              fontWeight: 500,
              letterSpacing: '-0.01em',
              textTransform: 'none',
              padding: { xs: '14px 32px', md: '16px 40px' },
              background: 'rgba(255, 255, 255, 0.95)',
              color: '#1a1a1a',
              borderRadius: '100px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 1)',
                transform: 'translateY(-1px)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 1)',
              },
            }}
          >
            Conoce Más
          </Button>

          <Button
            variant="outlined"
            href="#procedimientos"
            sx={{
              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: { xs: '14px', md: '15px' },
              fontWeight: 500,
              letterSpacing: '-0.01em',
              textTransform: 'none',
              padding: { xs: '14px 32px', md: '16px 40px' },
              background: 'transparent',
              color: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '100px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.5)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            Ver Procedimientos
          </Button>
        </Box>
      </Box>
    </Box>
  );
}