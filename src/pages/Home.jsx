import { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { gsap } from "gsap";
import Hero from "../components/home/Hero";
import ContactCTA from "../components/home/ContactCta";

function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    // GSAP animation on load
    gsap.to(containerRef.current, {
      x: "-100vw", // Slide left to show the white half
      delay: 1,
      duration: 1.5,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <Box
      sx={{
        overflow: "hidden",
        height: "100vh",
        width: "100vw",
        position: "relative",
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          display: "flex",
          width: "200vw",
          height: "100vh",
          flexDirection: "row",
        }}
      >
        {/* Left Half - Black */}
        <Box sx={{ display: "flex", flexDirection: "column", width: "100vw", height: "100vh", backgroundImage: "linear-gradient(to bottom right, #191968, #0081C7)", }}>

          {/* Top Row */}
          <Box display="flex" justifyContent="flex-start">
            <Box>
              <img src="/images/GR_8_Sello_Blanco.png" alt="Placeholder Image" style={{position: 'absolute', top: '10px', left: '10px', maxWidth: '15%', maxHeight: '15%', objectFit: 'contain' }} />
            </Box>
          </Box>

          {/* Center Row */}
          <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
            <Box>
              <img src="/images/GR_2_LogoHorizontal_Blanco2.png" alt="Placeholder Image" style={{ maxWidth: '70%', maxHeight: '70%', objectFit: 'contain' }} />
            </Box>
          </Box>

          {/* Bottom Row */}
          <Box display="flex" justifyContent="flex-end">
            <Typography
              variant="h6"
              color="white"
              sx={{ fontFamily: 'Archivo Expanded', fontWeight: 200, margin: '0px 10px' }}
            >
              Punta del Este, Uruguay
            </Typography>
          </Box>

        </Box>

        {/* Right Half - White */}
        <Box sx={{ width: "100vw", height: "100vh", bgcolor: "white" }}>
          <Hero />
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
