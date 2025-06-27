import { Box, Typography } from "@mui/material";
import { useState } from "react";

export default function VerMasProcedimientosAboutSection() {
  const [isPinned, setIsPinned] = useState(true)
  
  return (
    <Box
      sx={{
        height: '300vh',
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
          gridColumn: '1 / 4',
          gridRow: '1 / 1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'start',
        }}
      >
        <img src={"/images/bias.png"} alt="scroll" style={{ width: '100%', height: '50%', objectFit: 'cover' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', color: '#000000' }}>
          <Typography variant="p">MOMMY MAKEOVER</Typography>
          <Typography variant="p">Bodytite, Morpheus8</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: '71px',
          gridColumn: '4 / 7',
          gridRow: '1 / 1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'start',
        }}
      >
        <img src={"/images/bias.png"} alt="scroll" style={{ width: '100%', height: '50%', objectFit: 'cover' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', color: '#000000' }}>
          <Typography variant="p">CIRUGIA MAMARIA</Typography>
          <Typography variant="p">Bodytite, Morpheus8</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: '71px',
          gridColumn: '7 / 13',
          gridRow: '1 / 1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'start',
        }}
      >
        <img src={"/images/bias.png"} alt="scroll" style={{ width: '100%', height: '80%', objectFit: 'cover' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', color: '#000000' }}>
          <Typography variant="p">LIPOASPIRACION LÁSER</Typography>
          <Typography variant="p">Bodytite, Morpheus8</Typography>
        </Box>
      </Box>


      <Box
        sx={{
          marginTop: '71px',
          gridColumn: '1 / 7',
          gridRow: '2 / 3',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'start',
        }}
      >
        <img src={"/images/bias.png"} alt="scroll" style={{ width: '100%', height: '90%', objectFit: 'cover' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', color: '#000000' }}>
          <Typography variant="p">MOMMY MAKEOVER</Typography>
          <Typography variant="p">Bodytite, Morpheus8</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: '71px',
          gridColumn: '7 / 10',
          gridRow: '2 / 3',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'start',
        }}
      >
        <img src={"/images/bias.png"} alt="scroll" style={{ width: '100%', height: '50%', objectFit: 'cover' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', color: '#000000' }}>
          <Typography variant="p">CIRUGIA MAMARIA</Typography>
          <Typography variant="p">Bodytite, Morpheus8</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: '71px',
          gridColumn: '10 / 13',
          gridRow: '2 / 3',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'start',
        }}
      >
        <img src={"/images/bias.png"} alt="scroll" style={{ width: '100%', height: '50%', objectFit: 'cover' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', color: '#000000' }}>
          <Typography variant="p">LIPOASPIRACION LÁSER</Typography>
          <Typography variant="p">Bodytite, Morpheus8</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          marginTop: '71px',
          gridColumn: '1 / 4',
          gridRow: '3 / 4',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'start',
        }}
      >
        <img src={"/images/bias.png"} alt="scroll" style={{ width: '100%', height: '50%', objectFit: 'cover' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', color: '#000000' }}>
          <Typography variant="p">MOMMY MAKEOVER</Typography>
          <Typography variant="p">Bodytite, Morpheus8</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: '71px',
          gridColumn: '4 / 10',
          gridRow: '3 / 4',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'start',
        }}
      >
        <img src={"/images/bias.png"} alt="scroll" style={{ width: '100%', height: '90%', objectFit: 'cover' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', color: '#000000' }}>
          <Typography variant="p">CIRUGIA MAMARIA</Typography>
          <Typography variant="p">Bodytite, Morpheus8</Typography>
        </Box>
      </Box>
            <Box
        sx={{
          marginTop: '71px',
          gridColumn: '10 / 13',
          gridRow: '3 / 4',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'start',
        }}
      >
        <img src={"/images/bias.png"} alt="scroll" style={{ width: '100%', height: '50%', objectFit: 'cover' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', color: '#000000' }}>
          <Typography variant="p">LIPOASPIRACION LÁSER</Typography>
          <Typography variant="p">Bodytite, Morpheus8</Typography>
        </Box>
      </Box>


   
    </Box>
  );
}