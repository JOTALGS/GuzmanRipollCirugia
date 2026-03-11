import { Box, Typography } from "@mui/material";
import { useState } from "react";
import NewHero from "../components/home/NewHero";
import ConoceMasHome from "../components/home/ConoceMasHome";
import VerMasProcedimientosHome from "../components/home/VerMasProcedimientosHome";
import CTAhome from "../components/home/CTAhome";
import Testimonios from "../components/home/Testimonios";
import Especialistas from "../components/home/Especialistas";
import Faq from "../components/home/faq";
import Footer from "../components/UI/Footer";

export default function Home({ toggleTheme }) {
  const [isPinned, setIsPinned] = useState(true)

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      {/* Hero Section pinned to bottom */}
      <Box sx={{ position: 'sticky', top: 0, zIndex: 0 }}>
        <NewHero />
      </Box>

      {/* Content scrolling over the Hero */}
      <Box sx={{ position: 'relative', zIndex: 10, backgroundColor: 'white' }}>
        <ConoceMasHome />

        <VerMasProcedimientosHome />

        <CTAhome />

        <Testimonios />

        <Especialistas />

        <Faq />

        <Footer />
      </Box>
    </Box>
  );
}
