import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import ContactCTA from './ContactCta';
import LinearGradButton from '../buttons/LinearGradButton';


const Hero = () => {
  const title = "GUZMANRIPOLL  ";
  const letterCount = title.length;
  

  return (
    <Box id="hero" display="flex" flexDirection="column" height="100vh" width="100%">
      <Box width="100%" height="20%" overflow="hidden">
        <Typography
          variant="h1"
          color="black"
          textAlign="center"
          sx={{
            fontFamily: 'Archivo Expanded',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            display: 'inline-block',
            width: '100%',
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            letterSpacing: `calc((105vw - 1ch * ${letterCount}) / ${letterCount})`,
            transform: 'scaleY(1.5) translateY(35px)', // make letters taller
            transformOrigin: 'center bottom',
          }}
        >
          {title}
        </Typography>
      </Box>

    <Box sx={{ display: 'flex', flex: 1, px: { xs: 2, md: 4 }, py: 4, justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', maxWidth: '80%', width: '100%', mt: 2 }}>
        <Grid alignItems="center" sx={{ display: 'flex', flexDirection: 'row', width: '100%', mt: 8 }}>
          {/* Left side - geometric element */}
          <Grid>
            <Box sx={{ position: 'relative', width: '96px', height: '96px' }}>
              <Box
                sx={{
                  width: '96px',
                  height: '96px',
                  border: '1px solid rgba(0, 0, 0, 0.2)',
                  transform: 'rotate(45deg)',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: '24px',
                  left: '24px',
                  width: '48px',
                  height: '48px',
                  backgroundColor: 'black',
                }}
              />
            </Box>
          </Grid>

          {/* Center content */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignSelf: 'flex-end', textAlign: 'start', width: '75%'}}>
                <Typography variant="caption" sx={{ textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', letterSpacing: '0.15em' }}>
                  01 — Introduction
                </Typography>
                <Typography variant="body1" sx={{ width: '80%', mt: 2, color: 'rgba(0,0,0,0.8)', fontWeight: 300, fontSize: { xs: '1rem', md: '1.25rem' }, lineHeight: 1.75 }}>
                  Crafting digital experiences through the intersection of{" "}
                  <i>purposeful design</i> and <i>technical precision</i>. Every project is an exploration of form, function, and the spaces between.
                  Crafting digital experiences through the intersection of{" "}
                  <i>purposeful design</i> and <i>technical precision</i>. Every project is an exploration of form, function, and the spaces between.
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignSelf: 'flex-end', alignItems: 'center', gap: 3, justifyContent: 'flex-start', width: '75%' }}>
                <Box
                  sx={{
                    position: 'relative',
                    display: 'inline-block',
                    overflow: 'hidden',
                    border: '1px solid black',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    '&:hover .bg-slide': {
                      transform: 'translateY(0%)',
                    },
                  }}
                >
                  {/* Sliding black background */}
                  <Box
                    className="bg-slide"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'black',
                      transform: 'translateY(100%)',
                      transition: 'transform 0.3s ease',
                      zIndex: 1,
                    }}
                  />

                  {/* Button text */}
                  <Box
                    sx={{
                      position: 'relative',
                      zIndex: 2,
                      px: 4,
                      py: 2,
                      color: 'black',
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: 'white',
                      },
                    }}
                  >
                    Empieza una conversacion
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'rgba(0,0,0,0.4)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  <span>Confianza</span>
                  <Box sx={{ width: '24px', height: '1px', bgcolor: 'rgba(0,0,0,0.2)' }} />
                  <span>Profesionalismo</span>
                </Box>
              </Box>
            </Box>
          </Grid>

        </Grid>
      </Box>

      {/* Bottom geometric elements */}
      <Box sx={{ position: 'absolute', bottom: 32, left: 32, width: '1px', height: '64px', bgcolor: 'rgba(0,0,0,0.1)' }} />
      <Box sx={{ position: 'absolute', bottom: 32, right: 32, width: '64px', height: '1px', bgcolor: 'rgba(0,0,0,0.1)' }} />
    </Box>
    {/* Right side - text element */}
    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'end', alignItems: 'center', px: '25px' }}>
      <Box sx={{ textAlign: 'right' }}>
        <Typography sx={{ fontSize: { xs: '3rem', md: '6rem' }, fontWeight: 100, color: 'rgba(0,0,0,0.05)', lineHeight: 1 }}>
          2025
        </Typography>
        <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.4)', mt: 1, display: 'block' }}>
          Available for surgery
        </Typography>
      </Box>
    </Box>
    </Box>
  );
};

export default Hero;
