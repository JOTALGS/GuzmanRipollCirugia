import { Box, Typography } from "@mui/material";
import { useState } from "react";

export default function IntroAboutSection() {
  const [isPinned, setIsPinned] = useState(true)
  
  return (
    <Box
      sx={{
        height: {xs: '81vh', md: '94vh'},
        paddingBottom: '6vh',
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
        backgroundColor: '#222e34',
        
      }}
    >
      <Box
        sx={{
          marginTop: { xs: '50px', md: '71px' },
          gridColumn: { xs: '1 / 13', md: '1 / 6' },
          gridRow: '1 / 1',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'start',
          alignItems: 'start',
          justifyContent: 'start',
        }}
      >
        <Typography color="white" fontFamily={'Poppins'} fontSize={{ xs: '35px', md: '65px' }} sx={{ textTransform: 'capitalize'}}>
          Cirugía <span style={{ color: '#0081C7' }}>Inteligente</span>, 
        </Typography>

        <Typography color="white" fontFamily={'Poppins'} fontSize={{ xs: '35px', md: '65px' }} sx={{ textTransform: 'capitalize'}}>
          Conexión Humana
        </Typography>
      </Box>

      <Box
        sx={{
          gridColumn: { xs: '1 / 8', md: '1 / 5' },
          gridRow: '1 / 1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'end',
          justifyContent: 'end',
        }}
      >
        <Box>
          <Typography color="white" fontFamily={'Poppins'} fontSize={{ xs: '18px', md: '25px' }} sx={{ textAlign: 'start' }}>
            Cirugía Plástica Estética y Reconstructiva, especializados en brindar soluciones avanzadas.
          </Typography>
        </Box>

        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            marginRight: 'auto',
            width: { xs: '75%', md: 'fit-content' },
            overflow: 'hidden',
            border: '1px solid gray',
            letterSpacing: '0.1em',
            fontSize: '16px',
            fontFamily: 'Poppins',
            cursor: 'pointer',
            '&:hover .bg-slide': {
              transform: 'translateY(0%)',
            },
          }}
        >
          <Box
            className="bg-slide"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'gray',
              transform: 'translateY(100%)',
              transition: 'transform 0.3s ease',
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#e9e9e9',
              transition: 'transform 0.3s ease',
              zIndex: 0,
            }}
          />

          {/* Button text */}
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              width: 'fit-content',
              alignItems: 'center',
              gap: { xs: 2, md: 4 },
              zIndex: 2,
              px: 3,
              py: 2,
              color: 'gray',
              fontSize: { xs: '12px', md: '16px' },
              textWrap: 'nowrap',
              transition: 'color 0.3s ease',
              '&:hover': {
                color: 'white',
              },
            }}
          >
            Conoce Más
            <svg fill="#000000" width="24" height="24" viewBox="0 0 24 24" id="up-trend-round" dataName="Flat Color" xmlns="http://www.w3.org/2000/svg" class="icon flat-color"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path id="primary" d="M21,6H17a1,1,0,0,0,0,2h1.59L13.5,13.09,10.91,10.5a2,2,0,0,0-2.82,0l-5.8,5.79a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5.79-5.8,2.59,2.59a2,2,0,0,0,2.82,0L20,9.41V11a1,1,0,0,0,2,0V7A1,1,0,0,0,21,6Z" style={{"fill": "#000000"}}></path></g></svg>
          </Box>
        </Box>

      </Box>

      <Box
        sx={{
          marginTop: '71px',
          gridColumn: { xs: '7 / 13', md: '7 / 11' },
          gridRow: '1 / 1',
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'end',
        }}
      >
        <img src={"/images/bias.png"} alt="scroll" style={{ width: '100%', height: '30%', objectFit: 'cover' }} />
      </Box>      

      <Box
        sx={{
          gridColumn: { xs: '1 / 13', md: '12 / 12' },
          gridRow: '1 / 1',
          display: 'flex',
          alignItems: 'end',
          justifyContent: { xs: 'center', md: 'end' },
          transform: { xs: 'translateY(40px)', md: 'translateY(0)' },
        }}
      >
        <Typography color="#ffffff" fontFamily={'Poppins'} fontSize={'20px'}>(Scroll)</Typography>
      </Box>

    </Box>
  );
}