import React, { useEffect, useState, useRef } from "react"
import { Box, Typography } from "@mui/material"
import { gsap } from "gsap"

const LoadingScreen = ({ onComplete }) => {
  const [count, setCount] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const nameRef = useRef(null)
  const topBarRef = useRef(null)
  const bottomBarRef = useRef(null)

  useEffect(() => {
    // Y-axis rotation entrance for the name
    const letters = nameRef.current?.querySelectorAll('.loading-letter')
    const topItems = topBarRef.current?.querySelectorAll('.top-bar-item')
    const bottomItems = bottomBarRef.current?.querySelectorAll('.bottom-bar-item')

    if (letters && letters.length > 0) {
      gsap.set(letters, { rotateX: -90, opacity: 0, transformOrigin: "center bottom" })
      gsap.to(letters, {
        rotateX: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.03,
        delay: 0.2,
      })
    }

    if (topItems && topItems.length > 0) {
      gsap.set(topItems, { y: 20, opacity: 0 })
      gsap.to(topItems, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.4,
      })
    }

    if (bottomItems && bottomItems.length > 0) {
      gsap.set(bottomItems, { y: 20, opacity: 0 })
      gsap.to(bottomItems, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.6,
      })
    }
  }, [])

  useEffect(() => {
    let loadProgress = 0
    const startTime = Date.now()

    const updateProgress = () => {
      const elapsed = Date.now() - startTime
      const timeProgress = Math.min(100, (elapsed / 1500) * 100)
      loadProgress = Math.floor(timeProgress)
      setCount(loadProgress)

      if (loadProgress < 100 && !isLoaded) {
        requestAnimationFrame(updateProgress)
      } else if (loadProgress >= 100 || isLoaded) {
        setCount(100)
        setTimeout(() => {
          setFadeOut(true)
          setTimeout(() => {
            if (onComplete) onComplete()
          }, 400)
        }, 100)
      }
    }

    const handleLoad = () => {
      setIsLoaded(true)
    }

    if (document.readyState === 'complete') {
      setIsLoaded(true)
    } else {
      window.addEventListener('load', handleLoad)
    }

    requestAnimationFrame(updateProgress)

    return () => {
      window.removeEventListener('load', handleLoad)
    }
  }, [onComplete, isLoaded])

  const renderWord = (word) => {
    return word.split("").map((letter, i) => (
      <Box
        component="span"
        key={i}
        sx={{
          display: "inline-block",
          overflow: "hidden",
          verticalAlign: "bottom",
          perspective: "600px",
        }}
      >
        <Box
          component="span"
          className="loading-letter"
          sx={{
            display: "inline-block",
            willChange: "transform",
          }}
        >
          {letter}
        </Box>
      </Box>
    ))
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        zIndex: 9999,
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.5s ease-out",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      {/* Top Bar — only left info (desktop: left + center) */}
      <Box
        ref={topBarRef}
        sx={{
          display: "flex",
          justifyContent: { xs: "flex-start", md: "space-between" },
          alignItems: "flex-start",
          px: { xs: "20px", md: "70px" },
          pt: { xs: "24px", md: "36px" },
        }}
      >
        <Box className="top-bar-item">
          <Typography sx={{ fontFamily: "Poppins, sans-serif", fontSize: { xs: "10px", md: "12px" }, color: "rgba(255,255,255,0.5)", fontWeight: 400, lineHeight: 1.4, letterSpacing: "0.02em" }}>
            Cirugía estética
          </Typography>
          <Typography sx={{ fontFamily: "Poppins, sans-serif", fontSize: { xs: "10px", md: "12px" }, color: "rgba(255,255,255,0.5)", fontWeight: 400, lineHeight: 1.4, letterSpacing: "0.02em" }}>
            Mamaria
          </Typography>
        </Box>
        <Box className="top-bar-item" sx={{ display: { xs: "none", md: "block" } }}>
          <Typography sx={{ fontFamily: "Poppins, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: 400, lineHeight: 1.4, letterSpacing: "0.02em" }}>
            Punta del Este
          </Typography>
          <Typography sx={{ fontFamily: "Poppins, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: 400, lineHeight: 1.4, letterSpacing: "0.02em" }}>
            Uruguay
          </Typography>
        </Box>
        {/* Loading indicator — desktop only in top-right */}
        <Box className="top-bar-item" sx={{ display: { xs: "none", md: "block" } }}>
          <Typography sx={{ fontFamily: "Poppins, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: 400, lineHeight: 1.4, letterSpacing: "0.02em" }}>
            Cargando
          </Typography>
          <Typography sx={{ fontFamily: "Poppins, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: 400, lineHeight: 1.4, letterSpacing: "0.02em" }}>
            {count}%
          </Typography>
        </Box>
      </Box>

      {/* Center Name — Thin weight, Y-rotation entrance */}
      <Box
        ref={nameRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "center",
          flex: 1,
          gap: { xs: "2px", md: "6px" },
          px: { xs: "20px", md: "70px" },
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 300,
            fontSize: { xs: "36px", sm: "56px", md: "100px", lg: "130px" },
            color: "#fff",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {renderWord("Guzmán")}
          <Box component="span" sx={{ display: "inline-block", width: { xs: "12px", md: "24px" } }} />
          {renderWord("Ripoll")}
        </Typography>
      </Box>

      {/* Bottom Bar — mobile: location left + loading right. Desktop: hidden (shown in top) */}
      <Box
        ref={bottomBarRef}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          px: { xs: "20px", md: "70px" },
          pb: { xs: "24px", md: "40px" },
        }}
      >
        {/* Location — mobile only  */}
        <Box className="bottom-bar-item" sx={{ display: { xs: "block", md: "none" } }}>
          <Typography sx={{ fontFamily: "Poppins, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.5)", fontWeight: 400, lineHeight: 1.4, letterSpacing: "0.02em" }}>
            Punta del Este
          </Typography>
          <Typography sx={{ fontFamily: "Poppins, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.5)", fontWeight: 400, lineHeight: 1.4, letterSpacing: "0.02em" }}>
            Uruguay
          </Typography>
        </Box>

        {/* Loading — mobile: bottom-right. Desktop: subtle large number */}
        <Box className="bottom-bar-item" sx={{ display: { xs: "block", md: "none" } }}>
          <Typography sx={{ fontFamily: "Poppins, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.5)", fontWeight: 400, lineHeight: 1.4, letterSpacing: "0.02em" }}>
            Cargando
          </Typography>
          <Typography sx={{ fontFamily: "Poppins, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.5)", fontWeight: 400, lineHeight: 1.4, letterSpacing: "0.02em" }}>
            {count}%
          </Typography>
        </Box>

        {/* Desktop: subtle watermark number bottom-right */}
        <Box className="bottom-bar-item" sx={{ display: { xs: "none", md: "block" }, ml: "auto" }}>
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 300,
              fontSize: "64px",
              color: "rgba(255,255,255,0.08)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {count}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default LoadingScreen
