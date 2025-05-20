import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import ContactCTA from './ContactCta';

const Hero = () => {
  const title = "GUZMANRIPOLL  ";
  const letterCount = title.length;

  return (
    <Box id="hero" display="flex" flexDirection="column" height="100vh" width="100%">
      <Box width="100%" height="18%" overflow="hidden">
        <Typography
          variant="h1"
          color="black"
          textAlign="center"
          sx={{
            fontFamily: 'Archivo Expanded',
            fontWeight: 400,
            whiteSpace: 'nowrap',
            display: 'inline-block',
            width: '100%',
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            letterSpacing: `calc((100vw - 1ch * ${letterCount}) / ${letterCount})`,
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default Hero;
