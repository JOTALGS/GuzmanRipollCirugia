  import React, { useEffect, useRef } from 'react';
  import { Box, Button } from '@mui/material';
  import { NavLink, useLocation } from 'react-router-dom';
  import gsap from 'gsap';

  const navItems = [
    { label: 'INICIO', path: '/' },
    { label: 'TRABAJO', path: '/work' },
    { label: 'CONTACTO', path: '/contacto' },
  ];

  const NavButtons = () => {
    const location = useLocation();
    const containerRef = useRef(null);
    const indicatorRef = useRef(null);
    const buttonRefs = useRef([]);
    const previousIndexRef = useRef(null);

    useEffect(() => {
      const activeIndex = navItems.findIndex(item => item.path === location.pathname);
      const targetButton = buttonRefs.current[activeIndex];

      if (
        targetButton &&
        indicatorRef.current &&
        containerRef.current
      ) {
        const { offsetLeft, offsetWidth } = targetButton;

        let fromLeft = 0;
        let fromWidth = 0;

        if (previousIndexRef.current !== null) {
          const prevButton = buttonRefs.current[previousIndexRef.current];
          if (prevButton) {
            const prevRect = prevButton.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();
            fromLeft = prevRect.left - containerRect.left;
            fromWidth = prevRect.width;
          }
        }

        const indicator = indicatorRef.current;
        const container = containerRef.current;

        // Set initial indicator position
        gsap.set(indicator, {
          left: fromLeft,
          width: fromWidth,
        });

        // Animate indicator
        gsap.to(indicator, {
          left: offsetLeft,
          width: offsetWidth,
          duration: 0.4,
          ease: 'power2.out',
        });

        // Animate full container fade-in only on home route
        if (location.pathname === '/') {
          gsap.set(container, { opacity: 0 });
          gsap.to(container, {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: 2.5,
          });
        } else {
          // Ensure opacity is reset immediately on other routes
          gsap.set(container, { opacity: 1 });
        }

        previousIndexRef.current = activeIndex;
      }
    }, [location.pathname]);



    return (
      <Box
        ref={containerRef}
        position="fixed"
        bottom="25px"
        margin="25px auto"
        display="flex"
        minWidth="350px"
        maxWidth="400px"
        width="fit-content"
        borderRadius="25px"
        bgcolor="#f5f5f5"
        boxShadow={3}
        justifyContent="center"
        overflow="hidden"
      >
        {/* Sliding GSAP indicator */}
        <Box
          ref={indicatorRef}
          className="indicator"
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: 0,
            background: 'linear-gradient(to right, #191968, #0081C7)',
            borderRadius: '25px',
            zIndex: 1,
          }}
        />

        {/* Nav Buttons */}
        {navItems.map(({ label, path }, index) => (
          <Button
            key={label}
            component={NavLink}
            to={path}
            ref={(el) => (buttonRefs.current[index] = el)}
            sx={{
              flex: 1,
              zIndex: 2,
              textTransform: 'none',
              fontWeight: 'bold',
              color: location.pathname === path ? 'white' : 'black',
              borderRadius: '25px',
              '&:hover': {
                backgroundColor: 'transparent',
                color: 'darkgray',
              },
            }}
          >
            {label}
          </Button>
        ))}
      </Box>
    );
  };

  export default NavButtons;
