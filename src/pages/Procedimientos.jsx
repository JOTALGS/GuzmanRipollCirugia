import { Box, Typography } from "@mui/material";
import { useState } from "react";
import Testimonios from "../components/home/Testimonios";
import Footer from "../components/UI/Footer";
import MedicalProcedures from "../components/procedimientos/preview";

export default function Procedimientos({ toggleTheme }) {
  const [isPinned, setIsPinned] = useState(true)
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <MedicalProcedures />
      <Testimonios />


      <Footer />
      
    </Box>
  );
}