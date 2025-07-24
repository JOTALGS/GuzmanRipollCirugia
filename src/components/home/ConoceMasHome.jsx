import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import LightenText from "../magicText/LightenText";

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

import { styled } from '@mui/material/styles';

// Fixed AnimatedBorderBox with important declarations and proper structure
const AnimatedBorderBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  paddingBottom: '5px',
  cursor: 'pointer',
  display: 'inline-block',
  overflow: 'hidden',
  
  // Always visible underline (slides out on hover)
  '&::before': {
    content: '""',
    position: 'absolute !important',
    bottom: '0 !important',
    left: '0 !important',
    width: '100% !important',
    height: '1px !important',
    backgroundColor: '#0081C7 !important',
    transform: 'translateX(0) !important',
    transition: 'transform 0.4s ease !important',
    zIndex: 1,
  },
  
  // New underline that slides in from left on hover
  '&::after': {
    content: '""',
    position: 'absolute !important',
    bottom: '0 !important',
    left: '0 !important',
    width: '100% !important',
    height: '1px !important',
    backgroundColor: '#0081C7 !important',
    transform: 'translateX(-100%) !important',
    transition: 'transform 0.4s ease !important',
    zIndex: 1,
  },
  
  // On hover: original underline slides right, new underline slides in from left
  '&:hover::before': {
    transform: 'translateX(100%) !important',
  },
  
  '&:hover::after': {
    transform: 'translateX(0) !important',
  },

  // Also handle hover on parent link
  'a:hover &::before': {
    transform: 'translateX(100%) !important',
  },
  
  'a:hover &::after': {
    transform: 'translateX(0) !important',
  }
}));

// Alternative: Move hover to the link wrapper instead
const AnimatedLink = styled(Box)(({ theme }) => ({
  textDecoration: 'none',
  position: 'relative',
  paddingBottom: '5px',
  cursor: 'pointer',
  display: 'inline-block',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    height: '1px',
    backgroundColor: '#0081C7',
    transform: 'translateX(0)',
    transition: 'transform 0.4s ease',
    zIndex: 1,
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    height: '1px',
    backgroundColor: '#0081C7',
    transform: 'translateX(-100%)',
    transition: 'transform 0.4s ease',
    zIndex: 1,
  },
  
  '&:hover::before': {
    transform: 'translateX(100%)',
  },
  
  '&:hover::after': {
    transform: 'translateX(0)',
  }
}));

export default function ConoceMasHome() {
  const conoceMasText = `
    Cirugia plastica estetica y recontructiva.
    Nuestra experiencia refinada radica en canalizar el deseo:
    desde la confianza corporal hasta el bienestar integral,
    desde tratamientos simples hasta cirugias
    reconstructivas.
    Como expertos en cirugía mamaria, ofrecemos
    tratamientos personalizados que combinan precisión
    tecnológica con un cuidado humano excepcional.
  `;
  const theme = useTheme();

  useEffect(() => {
    const leftSection = document.getElementById("pin-section");
    if (!leftSection) return;

    // Mobile detection function
    const isMobile = () => window.innerWidth <= 768;
    
    let scrollTriggerInstance;

    const createScrollTrigger = () => {
      // Clear existing instance if any
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: leftSection,
        start: "top top",
        end: isMobile() ? "bottom+=5000% top" : "bottom+=11500% top",
        pin: isMobile() ? false : true,
        pinSpacing: false,
        scrub: true,
        markers: false,
        anticipatePin: 1
      });
    };

    // Initial setup
    createScrollTrigger();

    // Handle window resize
    const handleResize = () => {
      createScrollTrigger();
    };
    
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 1,
        height: { xs: "auto", md: "150vh" },
        display: "grid",
        backgroundColor: "background.default",
        gridTemplateColumns: "repeat(12, 1fr)",
        marginInline: { xs: "15px", md: "70px" },
        columnGap: { xs: "25px", md: "17px" },
        "& > section": { 
          gridColumn: "1 / -1",
        }
      }}
    >
      <Box
        sx={{
          marginTop: '20px',
          gridColumn: { xs: '8 / 13', md: '11 / 13' },
          gridRow: '1 / 2',
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'end',
        }}
      >
        
        <div id="pin-section" className="py-8 px-4">
          {/* Option 1: Using the fixed AnimatedBorderBox */}
          <Box component={"a"} href={"/clinica"} sx={{ textDecoration: 'none' }}>
            <AnimatedBorderBox>
              <Typography 
                color="#000000" 
                fontFamily={'Poppins'} 
                fontSize={{ xs: '15px', md: '18px' }} 
                sx={{ textTransform: 'uppercase' }}
              >
                Ver nuestros servicios
              </Typography>
            </AnimatedBorderBox>
          </Box>

          {/* Option 2: Alternative approach - move animation to link wrapper */}
          {/* 
          <AnimatedLink component={"a"} href={"/clinica"}>
            <Typography 
              color="#000000" 
              fontFamily={'Poppins'} 
              fontSize={{ xs: '15px', md: '18px' }} 
              sx={{ textTransform: 'uppercase' }}
            >
              Ver nuestros servicios
            </Typography>
          </AnimatedLink>
          */}
        </div>
      </Box>

      <Box
        sx={{
          marginTop: '20px',
          gridColumn: { xs: '2 / 8', md: '4 / 6' },
          gridRow: '1 / 2',
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'start',
        }}
      >
        <img src={"/images/bias.png"} alt="scroll" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Box>      

      <Box
        sx={{
          marginTop: '20px',
          gridColumn: '1 / 2',
          gridRow: '1 / 2',
          display: 'flex',
          alignItems: { xs: 'center', md: 'start' },
          justifyContent: 'start',
        }}
      >
        <Typography color="#000000" fontFamily={'Poppins'} fontSize={'18px'} sx={{ textTransform: 'uppercase' }}>Clínica</Typography>
      </Box>

      <Box sx={{
        gridColumn: { xs: '1 / 13', md: '1 / 13' },
        gridRow: '2 / 3',
      }}>
        {/* Clinic Description Section */}
        <Box component="section" sx={{ py: 8, backgroundColor: "#fff" }}>
          <LightenText homeText={conoceMasText} />
        </Box>
      </Box>
    </Box>
  );
}