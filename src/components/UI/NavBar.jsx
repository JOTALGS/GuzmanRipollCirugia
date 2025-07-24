import React from "react"
import { useState, useEffect, useRef } from "react"
import { useLocation, Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useLenis } from "@studio-freight/react-lenis"

export default function NavBar() {
  const [timeParts, setTimeParts] = useState({ hour: "00", minute: "00", second: "00", period: "PDD" })
  const [isDarkBackground, setIsDarkBackground] = useState(false)
  const location = useLocation()
  
  // Determinar página activa específica
  const getActivePage = () => {
    if (location.pathname === "/" || location.pathname === "/inicio") return "Inicio"
    if (location.pathname === "/clinica") return "Clínica"
    if (location.pathname === "/procedimientos") return "Procedimientos"
    if (location.pathname === "/contacto") return "Contacto"
    return "Inicio" // default
  }

  const active = getActivePage()
  const navRef = useRef(null)
  const [underline, setUnderline] = useState({ width: 0, left: 0 })
  
  const menuLinks = [
    { name: "Inicio", path: "/" },
    { name: "Clínica", path: "/clinica" },
    { name: "Procedimientos", path: "/procedimientos" }
  ]

  // Reloj en tiempo real con segundos
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
      setTimeParts({ hour, minute, second, period: "PDD" })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Detección de fondo mejorada
  useEffect(() => {
    const detectBackground = () => {
      // Crear un elemento temporal para detectar el color de fondo
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
      
      // Analizar si el fondo es oscuro o claro
      const rgb = bgColor.match(/\d+/g)
      if (rgb && rgb.length >= 3) {
        const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000
        setIsDarkBackground(brightness < 128)
      } else {
        // Fallback: detectar por scroll o tiempo
        setIsDarkBackground(window.scrollY > 200)
      }
      
      document.body.removeChild(tempElement)
    }

    // Detectar cambios en scroll
    const handleScroll = () => {
      detectBackground()
    }

    window.addEventListener('scroll', handleScroll)
    detectBackground() // Ejecutar al montar

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animación del underline con efecto custom
  useEffect(() => {
    if (active === "Contacto") {
      // Para Contacto, calcular posición independiente
      const contactEl = document.querySelector('[data-link="Contacto"]')
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect()
        const navRect = contactEl.closest('nav').getBoundingClientRect()
        setUnderline({ 
          width: contactEl.offsetWidth, 
          left: contactEl.offsetLeft - navRect.left
        })
      }
    } else {
      // Para menú principal
      const activeEl = navRef.current?.querySelector(`[data-link="${active}"]`)
      if (activeEl) {
        setUnderline({ 
          width: activeEl.offsetWidth, 
          left: activeEl.offsetLeft 
        })
      }
    }
  }, [active])

  // Smooth scroll con Lenis
  const lenis = useLenis()
  const onNavClick = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      lenis?.scrollTo(href, { offset: -100, duration: 1.2 })
    }
  }

  // Efecto de inversión custom
  const navbarStyle = {
    position: 'fixed',
    top: 0,
    zIndex: 50,
    width: '100%',
    backgroundColor: 'transparent',
    mixBlendMode: 'difference', // Efecto de inversión automático
    color: 'white' // Color base blanco que se invierte automáticamente
  }

  return (
    <header style={navbarStyle}>
      <nav style={{
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        alignItems: 'center',
        gap: '20px',
        paddingLeft: '70px',
        paddingRight: '70px',
        paddingTop: '12px',
        paddingBottom: '12px',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: '500', // Poppins Medium
        fontSize: '18px',
        lineHeight: '17.28px',
        letterSpacing: '-0.54px'
      }}>
        
        {/* Logo - Columnas 1-2 */}
        <div style={{ 
          gridColumn: '1 / 3',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Link to="/" style={{ 
            display: 'flex', 
            alignItems: 'center',
            textDecoration: 'none'
          }}>
            {/* Logo que cambia según el fondo */}
            <img 
              src={isDarkBackground ? "/images/GR_6_Iso+Nombre_Blanco.png" : "/images/GR_6_Iso+Nombre.png"}
              alt="Guzmán Ripoll Logo" 
              style={{ 
                height: 'auto',
                width: 'auto',
                maxHeight: '40px'
              }}
            />
          </Link>
        </div>

        {/* Hora - Alineada al inicio de Columna 4 */}
        <div style={{
          gridColumn: '4 / 5',
          display: 'flex',
          justifyContent: 'flex-start', // Alineado al inicio de la columna
          alignItems: 'center',
          color: 'inherit'
        }}>
          <span>
            {timeParts.hour}:{timeParts.minute}:{timeParts.second} {timeParts.period}
          </span>
        </div>

        {/* Navegación Principal con comas - Columna 7-10 */}
        <div style={{
          gridColumn: '7 / 11',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}>
          <div ref={navRef} style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            {menuLinks.map((link, index) => (
              <React.Fragment key={link.name}>
                <Link
                  to={link.path}
                  data-link={link.name}
                  onClick={(e) => onNavClick(e, link.path)}
                  style={{
                    color: 'inherit',
                    textDecoration: 'none',
                    position: 'relative',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: '500', // Poppins Medium
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
                {/* Comas separadoras */}
                {index < menuLinks.length - 1 && (
                  <span style={{
                    color: 'inherit',
                    margin: '0 8px'
                  }}>,</span>
                )}
              </React.Fragment>
            ))}
            
            {/* Underline animado para menú principal */}
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
                  initial={{ 
                    width: 0, 
                    x: '-100%',
                    opacity: 0 
                  }}
                  animate={{ 
                    width: underline.width, 
                    x: 0,
                    opacity: 1 
                  }}
                  exit={{ 
                    width: 0, 
                    x: '100%',
                    opacity: 0 
                  }}
                  transition={{ 
                    duration: 0.3, 
                    ease: "easeInOut" 
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Contacto - Separado al final */}
        <div style={{
          gridColumn: '12 / 13',
          display: 'flex',
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
                fontWeight: '500', // Poppins Medium
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
            
            {/* Underline para Contacto */}
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
                  initial={{ 
                    width: 0, 
                    x: '-100%',
                    opacity: 0 
                  }}
                  animate={{ 
                    width: '100%', 
                    x: 0,
                    opacity: 1 
                  }}
                  exit={{ 
                    width: 0, 
                    x: '100%',
                    opacity: 0 
                  }}
                  transition={{ 
                    duration: 0.3, 
                    ease: "easeInOut" 
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </header>
  )
}
