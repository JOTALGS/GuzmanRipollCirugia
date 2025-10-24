// components/ProceduresLink.js
import React from 'react';
import { Link as RouterLink } from 'react-router-dom'; // or 'next/link' if using Next.js
import { Button, Box } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const ClipTopButton = ({children}) => {
  return (
      <Box
        sx={{
          gridColumn: { xs: '1 / 13', md: '1 / 5' },
          gridRow: '1 / 1',
          display: 'flex',
          flexDirection: 'column',
          alignItems: {xs: 'center', md: 'end'},
          justifyContent: { xs: 'center', md: 'end'},
          marginBottom: { xs: '100px', md: '50px' },
          marginRight: { xs: '0px', md: '0px' },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            marginRight: 'auto',
            width: { xs: '100%', md: 'fit-content' },
            overflow: 'hidden',
            border: '1px solid gray',
            borderRadius: '25px',
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
            {children}
            <svg fill="#000000" width="24" height="24" viewBox="0 0 24 24" id="up-trend-round" dataName="Flat Color" xmlns="http://www.w3.org/2000/svg" class="icon flat-color"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path id="primary" d="M21,6H17a1,1,0,0,0,0,2h1.59L13.5,13.09,10.91,10.5a2,2,0,0,0-2.82,0l-5.8,5.79a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5.79-5.8,2.59,2.59a2,2,0,0,0,2.82,0L20,9.41V11a1,1,0,0,0,2,0V7A1,1,0,0,0,21,6Z" style={{"fill": "#000000"}}></path></g></svg>
          </Box>
        </Box>

      </Box>
  );
};

export default ClipTopButton;
