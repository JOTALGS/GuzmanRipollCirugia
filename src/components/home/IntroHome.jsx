import { Box, Typography } from "@mui/material";
import { useState } from "react";
import ClipTopButton from "../buttons/clipTopButton";

export default function IntroHome() {
  const [isPinned, setIsPinned] = useState(true)
  
  return (

    <Box
      sx={{
        position: "relative",
        zIndex: 1,
        height: { xs: "100vh", md: "100vh" },
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
        component="video"
        autoPlay
        muted
        loop
        playsInline
        sx={{
          width: { xs: "100vw", md: "100vw"},
          height: { xs: "100vh", md: "100vh"},
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: { xs: "-15px", md: "-70px"},
          zIndex: -1,
        }}
      >
        <source src="/videos/altitude-hero.webm" type="video/webm" />
        Tu navegador no soporta el elemento de video.
      </Box>


      <Box
        sx={{
          marginTop: { xs: '80px', md: '150px', lg: '180px', xl: '250px' },
          gridColumn: { xs: '1 / 13', md: '1 / 8' },
          gridRow: '1 / 1',
          display: 'flex',
          flexDirection: 'column',
          textAlign: { xs: 'center', md: 'start'},
          alignItems: 'start',
          justifyContent: 'start',
        }}
      >
        <Typography fontFamily={'Poppins'} fontSize={{ xs: '35px',md: '45px' , xl: '70px' }} sx={{ width: '100%', color: 'textSecondary', textTransform: '', letterSpacing: '-3px'}}>
          Cirugía mamaria <Typography component="span" fontFamily={'Poppins'} fontSize={{ xs: '35px',md: '45px' , xl: '70px' }} sx={{ color: 'textAccent', letterSpacing: '-3px' }}>inteligente</Typography>, 
        </Typography>

        <Typography fontFamily={'Poppins'} fontSize={{ xs: '35px',md: '45px' , xl: '70px' }} sx={{ width: '100%', color: 'textSecondary', textTransform: 'capitalize' , letterSpacing: '-3px'}}>
          conexión humana
        </Typography>
      </Box>

      <Box
        sx={{
          gridColumn: { xs: '3 / 11', md: '9 / 13' },
          gridRow: '1 / 1',
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          textAlign: { xs: 'center', md: 'end'},
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: { xs: '25px', md: 'px' },
        }}
      >
        <Box sx={{  width: '15px', height: '15px', backgroundColor: '#0081C7', borderRadius: '100%' }}/>
        <Typography fontFamily={'Red Hat Display'} fontSize={{ xs: '20px', md: '35px' }} sx={{ width: '90%',color: 'textSecondary', textTransform: 'capitalize' , letterSpacing: '-1px'}}>
          + 400 intervenciones exitosas
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

      <ClipTopButton>
        Conoce Más
      </ClipTopButton>

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
