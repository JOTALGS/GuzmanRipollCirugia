import { Box, Typography } from "@mui/material";
import { useState } from "react";
import IntroAboutSection from "../components/about/IntroAboutSection";
import ConoceMasAboutSection from "../components/about/ConoceMasAboutSection";
import VerMasProcedimientosAboutSection from "../components/about/VerMasProcedimientosAboutSection";
import CTAAboutSection from "../components/about/CTAAboutSection";
import Testimonios from "../components/about/Testimonios";
import Especialistas from "../components/about/Especialistas";

export default function About() {
  const [isPinned, setIsPinned] = useState(true)
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#ffffff',
      }}
    >
      <IntroAboutSection />
      
      <ConoceMasAboutSection />

      <VerMasProcedimientosAboutSection />
      
      <CTAAboutSection />

      <Testimonios />

      <Especialistas />

      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#5D5D5D',
        }}
      >
        TEXT 
      </Box>
      
    </Box>
  );
}