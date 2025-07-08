import { Box, Typography } from "@mui/material";
import { useState } from "react";
import LightenText from "../magicText/LightenText";

export default function ConoceMasAboutSection() {
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

  return (
    <Box
      sx={{
        minHeight: { xs: '100vh', md: '100vh' },
        overflowY: 'scroll',
        overflowX: 'hidden',
        // Hide scrollbar - Webkit (Brave, Chrome, Safari)
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        // Hide scrollbar - Firefox
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE & Edge (legacy)
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        columnGap: { xs: '25px', md: '35px' },
        paddingInline: { xs: '15px', md: '75px' },
      }}
    >
      <Box
        sx={{
          marginTop: '71px',
          gridColumn: { xs: '8 / 13', md: '11 / 13' },
          gridRow: '1 / 2',
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'end',
        }}
      >
        <Box sx={{ borderBottom: '1px solid #0081C7', cursor: 'pointer', paddingBottom: '5px' }}>
          <Typography color="#000000" fontFamily={'Poppins'} fontSize={{ xs: '15px', md: '20px' }}>Conoce Más</Typography>
        </Box>
      </Box>


      <Box
        sx={{
          marginTop: '71px',
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
          marginTop: '71px',
          gridColumn: '1 / 2',
          gridRow: '1 / 2',
          display: 'flex',
          alignItems: { xs: 'center', md: 'start' },
          justifyContent: 'start',
        }}
      >
        <Typography color="#000000" fontFamily={'Poppins'} fontSize={'20px'}>Clínica</Typography>
      </Box>


      <Box
        sx={{
          marginTop: '71px',
          gridColumn: '1 / 13',
          gridRow: '2 / 3',
        }}
      >
        <LightenText homeText={conoceMasText} />
      </Box>



    </Box>
  );
}