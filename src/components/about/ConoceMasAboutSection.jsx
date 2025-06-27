import { Box, Typography } from "@mui/material";
import { useState } from "react";
import LightenText from "../magicText/LightenText";

export default function ConoceMasAboutSection() {
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
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
        columnGap: '35px',
        paddingInline: '75px',
      }}
    >
      <Box
        sx={{
          marginTop: '71px',
          gridColumn: '11 / 13',
          gridRow: '1 / 2',
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'end',
        }}
      >
        <Box sx={{ borderBottom: '1px solid #0081C7', cursor: 'pointer', paddingBottom: '5px' }}>
          <Typography color="#000000" fontFamily={'Poppins'} fontSize={'20px'}>Conoce Más</Typography>
        </Box>
      </Box>


      <Box
        sx={{
          marginTop: '71px',
          gridColumn: '4 / 6',
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
          alignItems: 'start',
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
        <LightenText />
      </Box>



    </Box>
  );
}