import { Box, Typography } from "@mui/material";
import { useState } from "react";

export default function IntroHome() {
  const [isPinned, setIsPinned] = useState(true)
  
  return (

    <Box
      sx={{
        position: "relative",
        zIndex: 1,
        height: { xs: "90vh", md: "100vh" },
        display: "grid",

        backgroundColor: "#fff",
        gridTemplateColumns: "repeat(12, 1fr)",
        marginInline: { xs: "15px", md: "70px" },
        columnGap: { xs: "25px", md: "17px" },
        "& > section": { 
          gridColumn: "1 / -1",
        }
      }}
    > 
      <Box
        component="img"
        src="/images/unnamed.jpg"
        alt="Background"
        sx={{
          width: { xs: "100vw", md: "100vw"},
          height: { xs: "90vh", md: "100vh"},
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: { xs: "-15px", md: "-70px"},
          zIndex: -1,
        }}
      />


      <Box
        sx={{
          marginTop: { xs: '80px', md: '250px' },
          gridColumn: { xs: '1 / 13', md: '1 / 8' },
          gridRow: '1 / 1',
          display: 'flex',
          flexDirection: 'column',
          textAlign: { xs: 'center', md: 'start'},
          alignItems: 'start',
          justifyContent: 'start',
        }}
      >
        <Typography color="white" fontFamily={'Poppins'} fontSize={{ xs: '35px', md: '70px' }} sx={{ textTransform: '', letterSpacing: '-3px'}}>
          Cirugía mamaria <Typography component="span" fontFamily={'Poppins'} fontSize={{ xs: '35px', md: '70px' }} sx={{ color: 'textSecondary', letterSpacing: '-3px' }}>inteligente</Typography>, 
        </Typography>

        <Typography fontFamily={'Poppins'} fontSize={{ xs: '35px', md: '70px' }} sx={{ color: 'textPrimary', textTransform: 'capitalize' , letterSpacing: '-3px'}}>
          conexión humana
        </Typography>
      </Box>

      <Box
        sx={{
          gridColumn: { xs: '1 / 13', md: '1 / 4' },
          gridRow: '1 / 1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'end',
          justifyContent: 'end',
          marginBottom: { xs: '100px', md: '125px' },
          marginRight: { xs: '20px', md: '0px' },
        }}
      >
        <Typography color="white" fontFamily={'Poppins'} fontSize={{ xs: '18px', md: '25px' }} sx={{ textAlign: 'start', marginBottom: { xs:'115px', md: '20px' }, letterSpacing: '-1px' }}>
          Cirugía Plástica Estética y Reconstructiva, especializados en brindar soluciones avanzadas.
        </Typography>
      </Box>
      <Box
        sx={{
          gridColumn: { xs: '1 / 10', md: '1 / 5' },
          gridRow: '1 / 1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'end',
          justifyContent: 'end',
          marginBottom: { xs: '100px', md: '50px' },
          marginRight: { xs: '20px', md: '0px' },
        }}
      >

        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            marginRight: 'auto',
            width: { xs: '65%', md: 'fit-content' },
            overflow: 'hidden',
            border: '1px solid gray',
            borderRadius: '10px',
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
          gridColumn: { xs: '7 / 13', md: '9 / 11' },
          gridRow: '1 / 1',
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'end',
          marginBottom: { xs: '100px', md: '50px' },
        }}
      >
        <Box
          component="img"
          src="/images/bias.png"
          alt="scroll"
          sx={{
            width: '100%',
            height: {
              xs: '15%',
              md: '30%'
            },
            objectFit: 'cover'
          }}
        />
      </Box>      

      <Box
        sx={{
          gridColumn: { xs: '1 / 13', md: '12 / 12' },
          gridRow: '1 / 1',
          display: 'flex',
          alignItems: 'end',
          justifyContent: { xs: 'end', md: 'end' },
          marginBottom: { xs: '50px', md: '50px' },
        }}
      >
        <Typography color="#ffffff" fontFamily={'Poppins'} fontSize={'20px'}>(Scroll)</Typography>
      </Box>

    </Box>
  );
}