import { Box, Typography } from "@mui/material";
import { useState } from "react";
import IntroAboutSection from "../components/about/IntroAboutSection";
import ConoceMasAboutSection from "../components/about/ConoceMasAboutSection";
import VerMasProcedimientosAboutSection from "../components/about/VerMasProcedimientosAboutSection";
import CTAAboutSection from "../components/about/CTAAboutSection";
import Testimonios from "../components/about/Testimonios";
import Especialistas from "../components/about/Especialistas";
import Faq from "../components/about/faq";
import Footer from "../components/UI/Footer";

export default function About({ toggleTheme }) {
  const [isPinned, setIsPinned] = useState(true)
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <button onClick={toggleTheme} style={{ position: 'absolute', top: 10, right: 10, zIndex: 999 }}>
        Toggle Theme
      </button>

      <IntroAboutSection />
      
      <ConoceMasAboutSection />

      <VerMasProcedimientosAboutSection />
      
      <CTAAboutSection />

      <Testimonios />

      <Especialistas />

      <Faq />

      <Footer />
      
    </Box>
  );
}