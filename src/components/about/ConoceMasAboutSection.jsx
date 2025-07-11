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
        position: "relative",
        zIndex: 1,
        height: { xs: "auto", md: "150vh" },
        display: "grid",
        backgroundColor: "#fff999",
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