import React from "react"
import { useState, useEffect, useRef } from "react"
import { useLocation, Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useLenis } from "@studio-freight/react-lenis"
import { Box, useMediaQuery } from "@mui/material"

export default function NavBar() {
  const [timeParts, setTimeParts] = useState({ hour: "00", minute: "00", second: "00", period: "PDE" })
  const [isDarkBackground, setIsDarkBackground] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const isMobile = useMediaQuery('(max-width:900px)')
  
  const getActivePage = () => {
    if (location.pathname === "/" || location.pathname === "/inicio") return "Inicio"
    if (location.pathname === "/clinica") return "Clínica"
    if (location.pathname === "/procedimientos" || location.pathname.startsWith("/procedimiento/")) return "Procedimientos"
    if (location.pathname === "/resultados") return "Resultados"
    if (location.pathname === "/contacto") return "Contacto"
    return "Inicio"
  }

  const active = getActivePage()
  const navRef = useRef(null)
  const [underline, setUnderline] = useState({ width: 0, left: 0 })
  
  const menuLinks = [
    { name: "Inicio", path: "/" },
    { name: "Clínica", path: "/clinica" },
    { name: "Procedimientos", path: "/procedimientos" },
    { name: "Resultados", path: "/resultados" },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const timeString = now.toLocaleTimeString("es-UY", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "America/Montevideo",
      })
      const [hour, minute, second] = timeString.split(":")
      setTimeParts({ hour, minute, second, period: "PDE" })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const detectBackground = () => {
      const tempElement = document.createElement('div')
      tempElement.style.position = 'fixed'
      tempElement.style.top = '20px'
      tempElement.style.left = '50%'
      tempElement.style.width = '1px'
      tempElement.style.height = '1px'
      tempElement.style.pointerEvents = 'none'
      tempElement.style.zIndex = '-1'
      
      document.body.appendChild(tempElement)
      
      const computedStyle = window.getComputedStyle(tempElement)
      const bgColor = computedStyle.backgroundColor
      
      const rgb = bgColor.match(/\d+/g)
      if (rgb && rgb.length >= 3) {
        const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000
        setIsDarkBackground(brightness < 128)
      } else {
        setIsDarkBackground(window.scrollY > 200)
      }
      
      document.body.removeChild(tempElement)
    }

    const handleScroll = () => {
      detectBackground()
    }

    window.addEventListener('scroll', handleScroll)
    detectBackground() 

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isMobile) {
      if (active === "Contacto") {
        const contactEl = document.querySelector('[data-link="Contacto"]')
        if (contactEl) {
          setUnderline({ 
            width: contactEl.offsetWidth, 
            left: contactEl.offsetLeft
          })
        }
      } else {
        const activeEl = navRef.current?.querySelector(`[data-link="${active}"]`)
        if (activeEl) {
          setUnderline({ 
            width: activeEl.offsetWidth, 
            left: activeEl.offsetLeft 
          })
        }
      }
    }
  }, [active, isMobile])

  const lenis = useLenis()
  const onNavClick = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      lenis?.scrollTo(href, { offset: -100, duration: 1.2 })
    }
    if (isMobile) {
      setIsMenuOpen(false)
    }
  }

  const navbarStyle = {
    position: 'fixed',
    top: 0,
    zIndex: 9999,
    width: '100%',
    backgroundColor: 'transparent',
    mixBlendMode: isMenuOpen && isMobile ? 'normal' : 'difference',
    color: 'white'
  }

  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen, isMobile])

  return (
    <>
      <header style={navbarStyle}>
        <Box component="nav" sx={{
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          alignItems: 'center',
          gap: '20px',
          paddingLeft: { xs: '20px', md: '70px'},
          paddingRight: { xs: '20px', md: '70px'},
          paddingTop: '12px',
          paddingBottom: '12px',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: '500',
          fontSize: '18px',
          lineHeight: '17.28px',
          letterSpacing: '-0.54px'
        }}>
          {/* Logo */}
          <Box sx={{
            gridColumn: { xs: '1 / 7', md: '1 / 3'},
            display: 'flex',
            alignItems: 'center'
          }}>
            <Link to="/" style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none'
            }}>
              <img
                src={
                  isMobile
                    ? (isMenuOpen ? "/images/GR_9_Isologo_Blanco.png" : "/images/GR_9_Isologo.png")
                    : (isDarkBackground ? "/images/GR_6_Iso+Nombre_Blanco.png" : "/images/GR_6_Iso+Nombre.png")
                }
                alt="Guzmán Ripoll Logo"
                style={{
                  height: 'auto',
                  width: 'auto',
                  maxHeight: '40px'
                }}
              />
            </Link>
          </Box>

          {/* Hora */}
          <Box sx={{
            gridColumn: '4 / 6',
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'flex-start',
            alignItems: 'center',
            color: 'inherit'
          }}>
            <span>
              {`${timeParts.hour}:${timeParts.minute}:${timeParts.second} ${timeParts.period}`}
            </span>
          </Box>

          {/* Navegación Principal */}
          <Box sx={{
            gridColumn: '7 / 11',
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}>
            <div ref={navRef} style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              {menuLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  data-link={link.name}
                  onClick={(e) => onNavClick(e, link.path)}
                  style={{
                    color: 'inherit',
                    textDecoration: 'none',
                    position: 'relative',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: '500',
                    fontSize: '18px',
                    lineHeight: '17.28px',
                    letterSpacing: '-0.54px',
                    transition: 'opacity 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                  {link.name}
                </Link>
              ))}
              
              <AnimatePresence mode="wait">
                {menuLinks.some(link => link.name === active) && (
                  <motion.div
                    key={active}
                    style={{
                      position: 'absolute',
                      bottom: '-8px',
                      height: '2px',
                      backgroundColor: 'currentColor',
                      left: underline.left,
                      width: underline.width
                    }}
                    initial={{ width: 0, x: '-100%', opacity: 0 }}
                    animate={{ width: underline.width, x: 0, opacity: 1 }}
                    exit={{ width: 0, x: '100%', opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                )}
              </AnimatePresence>
            </div>
          </Box>

          {/* Contacto */}
          <Box sx={{
            gridColumn: '12 / 13',
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}>
            <div style={{ position: 'relative' }}>
              <Link
                to="/contacto"
                data-link="Contacto"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '500',
                  fontSize: '18px',
                  lineHeight: '17.28px',
                  letterSpacing: '-0.54px',
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                Contacto
              </Link>
              
              <AnimatePresence>
                {active === "Contacto" && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      bottom: '-8px',
                      height: '2px',
                      backgroundColor: 'currentColor',
                      left: 0,
                      width: '100%'
                    }}
                    initial={{ width: 0, x: '-100%', opacity: 0 }}
                    animate={{ width: '100%', x: 0, opacity: 1 }}
                    exit={{ width: 0, x: '100%', opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                )}
              </AnimatePresence>
            </div>
          </Box>

          {/* Menu/Close Button - Mobile */}
          <Box sx={{
            gridColumn: '10 / 13',
            display: { xs: 'flex', md: 'none' },
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isMenuOpen ? 'white' : 'inherit',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '500',
                fontSize: '18px',
                letterSpacing: '-0.54px',
                position: 'relative',
                overflow: 'hidden',
                width: '60px',
                height: '30px'
              }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={isMenuOpen ? 'close' : 'menu'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ 
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  style={{
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {isMenuOpen ? 'Close' : 'Menu'}
                </motion.span>
              </AnimatePresence>
            </button>
          </Box>
        </Box>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ 
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              backgroundColor: '#000000',
              zIndex: 9998,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '80px',
              paddingBottom: '60px',
              overflow: 'hidden'
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.3,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              style={{
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '18px',
                marginBottom: '50px',
                opacity: 0.7,
                fontWeight: '400'
              }}
            >
              {`${timeParts.hour}:${timeParts.minute}:${timeParts.second} ${timeParts.period}`}
            </motion.div>

            <nav style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '28px',
              flex: 1,
              justifyContent: 'center'
            }}>
              {[...menuLinks, { name: "Contacto", path: "/contacto" }].map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.3 + index * 0.08,
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  <Link
                    to={link.path}
                    onClick={(e) => onNavClick(e, link.path)}
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: '700',
                      fontSize: '46px',
                      letterSpacing: '-2.5px',
                      position: 'relative',
                      display: 'inline-block',
                      textTransform: 'uppercase',
                      opacity: active === link.name ? 1 : 0.45,
                      transition: 'opacity 0.3s ease',
                      lineHeight: '1'
                    }}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.7,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              style={{
                display: 'flex',
                gap: '40px',
                marginTop: '40px'
              }}
            >
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '18px',
                  fontWeight: '500',
                  opacity: 0.8,
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '18px',
                  fontWeight: '500',
                  opacity: 0.8,
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
              >
                Instagram
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
