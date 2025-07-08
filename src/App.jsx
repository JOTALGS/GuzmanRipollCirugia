import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from '@studio-freight/lenis';
import Home from "./pages/Home";
import NavButtons from "./components/home/NavButtons";
import StandaloneScrollReveal from "./components/procedimientos/standalone-scroll-reveal-updated";
import About from "./pages/About";
import ClinicaSection from "./components/clinica/ClinicaSection";

//import Navbar from "./components/navbar/Navbar";

gsap.registerPlugin(ScrollTrigger);

// 🎛️ GRID DEBUGGER COMPONENT
function GridDebugger({
  columns = 12,
  maxWidth = "1920px",
  paddingX = "70px",
  gap = "20px",
  columnColor = "rgba(239, 68, 68, 0.1)", // red-500/10 equivalent
  toggleKey = "g",
  requireShift = true,
  zIndex = 9999,
} = {}) {
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const keyMatch = e.key.toLowerCase() === toggleKey.toLowerCase();
      const modifierMatch = requireShift ? e.shiftKey : true;
      
      if (keyMatch && modifierMatch) {
        e.preventDefault();
        setShowGrid((prev) => !prev);
        console.log(`🎛️ Grid Debug ${!showGrid ? 'ACTIVADO' : 'DESACTIVADO'}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleKey, requireShift, showGrid]);

  if (!showGrid) {
    return null;
  }

  // Estilos del contenedor
  const containerStyle = {
    maxWidth,
    paddingLeft: paddingX,
    paddingRight: paddingX,
    gap,
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    zIndex,
    height: '100%',
    margin: '0 auto',
    pointerEvents: 'none'
  };

  // Estilo para cada columna
  const columnStyle = {
    height: '100%',
    width: '100%',
    backgroundColor: columnColor,
    border: '1px solid rgba(239, 68, 68, 0.2)'
  };

  // Estilo del overlay principal
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex,
    pointerEvents: 'none'
  };

  // Estilo del indicador
  const indicatorStyle = {
    position: 'fixed',
    top: '16px',
    left: '16px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'monospace',
    zIndex: zIndex + 1,
    pointerEvents: 'none'
  };

  return (
    <>
      {/* Contenedor de la rejilla que se superpone a toda la página */}
      <div style={overlayStyle}>
        {/* Contenedor que replica el layout principal */}
        <div style={containerStyle}>
          {/* Genera las columnas visuales */}
          {Array.from({ length: columns }).map((_, i) => (
            <div key={i} style={columnStyle} />
          ))}
        </div>
      </div>

      {/* Indicador visual en la esquina */}
      <div style={indicatorStyle}>
        Grid Debug: {columns} cols | {requireShift ? 'Shift+' : ''}{toggleKey.toUpperCase()} to toggle
      </div>
    </>
  );
}

// About Page Component
function ProcedimientoCero() {
  const [isPinned, setIsPinned] = useState(true);
     
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'black' }}>
      <StandaloneScrollReveal
        imageSrc="images/wwsav.jpg"
        imageAlt="Architectural detail with orange geometric patterns"
        heading="NexaVirtu Tech"
        pin={isPinned}
      />
    </Box>
  );
}

// Contact Page Component
function Contact() {
  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        Have questions? Reach out to us!
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Typography variant="body1">Email: info@example.com</Typography>
        <Typography variant="body1">Phone: (123) 456-7890</Typography>
      </Box>
    </Box>
  );
}

// 🎯 COMPONENTE PRINCIPAL CON GRID DEBUGGER
const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = new Lenis({
      smooth: true,
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // slow and smooth easing
    });
       
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Log para confirmar que el grid debugger está disponible
    console.log('🎛️ Grid Debugger cargado - Presiona Shift + G para activar');
  }, []);

  return (
    <Router autoScrollToTop>
      <Box id="scroll-container" sx={{ textAlign: "center", scrollBehavior: "smooth" }}>
        
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/clinica" element={<ClinicaSection />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/cir-mamaria" element={<ProcedimientoCero />} />
        </Routes>
        
        {/* Componente de navegación condicional */}
        <ConditionalNavButtons />
        
        {/* 🎛️ GRID DEBUGGER - Se superpone a todo el contenido */}
        <GridDebugger 
          columns={12}
          maxWidth="1920px"
          paddingX="70px"
          gap="20px"
          columnColor="rgba(239, 68, 68, 0.1)"
          toggleKey="g"
          requireShift={true}
          zIndex={9999}
        />
        
      </Box>
    </Router>
  );
};

// 🔧 Componente auxiliar para manejar la navegación condicional
function ConditionalNavButtons() {
  const location = useLocation();
  
  const shouldShowNavButtons = 
    location.pathname !== "/cir-mamaria" && 
    location.pathname !== "/" && 
    false; // Cambia esto a true si quieres activar los botones

  if (!shouldShowNavButtons) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '82%' }}>
      <NavButtons />
    </Box>
  );
}

export default App;