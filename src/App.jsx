
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from '@studio-freight/lenis';
import Home from "./pages/Home";
import NavButtons from "./components/home/NavButtons";
import LinearGradButton from "./components/buttons/LinearGradButton";
import Navbar from "./components/UI/NavBar";
//import Navbar from "./components/navbar/Navbar";

gsap.registerPlugin(ScrollTrigger);

// About Page Component
function About() {
  return (
    <Box sx={{ mt: 8, width: '100%' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        About Us
      </Typography>
      <Typography height={'100vh'} variant="body1" paragraph>
        This is a sample application showcasing React Router with Material UI integration.
        We've also added smooth scrolling functionality using a Lenis simulation.
      </Typography>
      <Typography variant="body1" paragraph>
        In a real application, you would install the actual Lenis library with:
        <code>npm install @studio-freight/lenis</code>
      </Typography>
      <LinearGradButton />
    </Box>
  );
}

// Contact Page Component
function Contact() {
  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        Have questions? Reach out to us!
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Typography variant="body1">Email: info@example.com</Typography>
        <Typography variant="body1">Phone: (123) 456-7890</Typography>
      </Box>

    </Box>
  );
}


const App = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = new Lenis({
      smooth: true,
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // slow and smooth easing
    });
  
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <Router autoScrollToTop>
      <Box id="scroll-container" sx={{ textAlign: "center" , scrollBehavior: "smooth" }}>
        <Navbar />
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '82%' }}>
          <NavButtons />
        </Box>
      </Box>
      
    </Router>
  );
}

export default App;
