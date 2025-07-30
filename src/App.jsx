import React, { useEffect, useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from '@studio-freight/react-lenis';
import Home from "./pages/Home";
import Clinica from "./pages/Clinica";
import Resultados from "./pages/Resultados";

import StandaloneScrollReveal from "./components/procedimientos/standalone-scroll-reveal-updated";
import NavBar from "./components/UI/NavBar";

import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './utils/theme';

gsap.registerPlugin(ScrollTrigger);

// Componentes temporales para las rutas que faltan
const Contact = () => (
  <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Typography variant="h4">Página de Contacto - En construcción</Typography>
  </Box>
);

const ProcedimientoCero = () => (
  <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Typography variant="h4">Cirugía Mamaria - En construcción</Typography>
  </Box>
);

// Componente temporal para navegación (si lo necesitas)
const NavButtons = () => (
  <Box>
    <Typography>Nav Buttons</Typography>
  </Box>
);

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

// 🎯 COMPONENTE PRINCIPAL CON GRID DEBUGGER Y NAVBAR
const App = () => {
  const [mode, setMode] = useState('light');

  const theme = useMemo(() => {
    return mode === 'light' ? lightTheme : darkTheme;
  }, [mode]);

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // Log para confirmar que el grid debugger está disponible
    console.log('🎛️ Grid Debugger cargado - Presiona Shift + G para activar');
  }, []);

  return (
    <Router autoScrollToTop>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ReactLenis root>
          <Box id="scroll-container" sx={{ textAlign: "center", scrollBehavior: "smooth" }}>
            {/* NavBar fija en la parte superior */}
            <NavBar  toggleTheme={toggleTheme} />
            
            <Routes>
              <Route path="/" element={<Home toggleTheme={toggleTheme} />} />
              <Route path="/inicio" element={<Home toggleTheme={toggleTheme} />} />
              <Route path="/clinica" element={<Clinica />} />
              <Route path="/procedimientos" element={<Home toggleTheme={toggleTheme} />} />
              <Route path="/resultados" element={<Resultados/>} />
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
        </ReactLenis>
      </ThemeProvider>
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
