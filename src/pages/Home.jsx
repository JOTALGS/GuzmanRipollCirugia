import { Box, Typography } from "@mui/material";
import { useState } from "react";
import IntroHome from "../components/home/IntroHome";
import ConoceMasHome from "../components/home/ConoceMasHome";
import VerMasProcedimientosHome from "../components/home/VerMasProcedimientosHome";
import CTAhome from "../components/home/CTAhome";
import Testimonios from "../components/home/Testimonios";
import Especialistas from "../components/home/Especialistas";
import Faq from "../components/home/faq";
import Footer from "../components/UI/Footer";
import ScrollStage from "../components/home/general/ScrollStage";

export default function Home({ toggleTheme }) {
  const [isPinned, setIsPinned] = useState(true)
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        position: 'relative',
      }}
      >
        <section className="absolute">
          <ScrollStage  />

        </section>

      <IntroHome />
      
      <ConoceMasHome />

      <VerMasProcedimientosHome />
      
      <CTAhome />

      <Testimonios />

      <Especialistas />

      <Faq />

      <Footer />
      
    </Box>
  );
}