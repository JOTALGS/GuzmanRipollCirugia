import React, { useEffect, useRef, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Box,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Brightness4, ExpandMore } from '@mui/icons-material';
import { gsap } from 'gsap';

const Navbar = () => {
  const navRef = useRef();
  const [language, setLanguage] = useState('es');
  const [anchorEl, setAnchorEl] = useState(null);
  const [lastScroll, setLastScroll] = useState(0);

  const handleScroll = () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      gsap.to(navRef.current, { y: '-100%', duration: 0.3 });
    } else if (currentScroll > lastScroll) {
      // scrolling down
      gsap.to(navRef.current, { y: '0%', duration: 0.3 });
    } else if (currentScroll < lastScroll) {
      // scrolling up
      gsap.to(navRef.current, { y: '-100%', duration: 0.3 });
    }

    setLastScroll(currentScroll);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    gsap.set(navRef.current, { y: '-100%' });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScroll]);

  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" ref={navRef} sx={{ bgcolor: 'primary.main', zIndex: 1100 }}>
      <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>

        {/* Left: Logo */}
        <Typography variant="h6" component="div">
          LOGO
        </Typography>

        {/* Center: Navigation */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button color="inherit">Inicio</Button>
          <Button color="inherit">Biografía</Button>
          <Button
            color="inherit"
            onClick={handleDropdownClick}
            endIcon={<ExpandMore />}
          >
            Procedimientos
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleDropdownClose}
          >
            <MenuItem onClick={handleDropdownClose}>Procedimiento 1</MenuItem>
            <MenuItem onClick={handleDropdownClose}>Procedimiento 2</MenuItem>
            <MenuItem onClick={handleDropdownClose}>Procedimiento 3</MenuItem>
          </Menu>
          <Button color="inherit">Contacto</Button>
        </Box>

        {/* Right: Language, Theme, CTA */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FormControl variant="standard" sx={{ minWidth: 80 }}>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              variant="standard"
              disableUnderline
              sx={{ color: 'white' }}
            >
              <MenuItem value="es">Español</MenuItem>
              <MenuItem value="en">English</MenuItem>
            </Select>
          </FormControl>

          <IconButton color="inherit">
            <Brightness4 />
          </IconButton>

          <Button variant="contained" color="secondary">
            Agendar Consulta →
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
