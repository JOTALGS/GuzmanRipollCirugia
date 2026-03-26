// components/ProceduresLink.js
import React from 'react';
import { Link as RouterLink } from 'react-router-dom'; // or 'next/link' if using Next.js
import { Button, Box } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const LinearGradButton = () => {
  return (
    <Box display="flex" justifyContent="center" mt={6}>
      <Button
        component={RouterLink}
        to="/procedimientos" // or `href` if using Next.js
        variant="contained"
        endIcon={<ArrowRightAltIcon />}
        sx={{
          background: 'linear-gradient(to right, #191968, #0081C7)',
          color: '#fff',
          borderRadius: '9999px',
          padding: '12px 32px',
          fontFamily: 'Red Hat Display, sans-serif',
          transition: 'transform 160ms var(--ease-out), filter 200ms ease, opacity 200ms ease',
          '&:hover': {
            opacity: 0.9,
            background: 'linear-gradient(to right, #191968, #0081C7)',
          },
          '&:active': {
            transform: 'scale(0.97)',
          },
          textTransform: 'uppercase',
        }}
      >
        Ver Todos Los Procedimientos
      </Button>
    </Box>
  );
};

export default LinearGradButton;
