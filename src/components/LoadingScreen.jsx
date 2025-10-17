import React, { useEffect, useState } from "react"
import { Box, Typography } from "@mui/material"

const LoadingScreen = ({ onComplete }) => {
  const [count, setCount] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Track actual page load progress
    let loadProgress = 0
    const startTime = Date.now()

    // Simulate progress based on actual loading events
    const updateProgress = () => {
      const elapsed = Date.now() - startTime
      // Faster animation - reach 100 in ~1.5 seconds or when page loads
      const timeProgress = Math.min(100, (elapsed / 1500) * 100)
      loadProgress = Math.floor(timeProgress)
      setCount(loadProgress)

      if (loadProgress < 100 && !isLoaded) {
        requestAnimationFrame(updateProgress)
      } else if (loadProgress >= 100 || isLoaded) {
        setCount(100)
        // Iniciar fade out después de llegar a 100
        setTimeout(() => {
          setFadeOut(true)
          // Llamar a onComplete después del fade out (300ms)
          setTimeout(() => {
            if (onComplete) onComplete()
          }, 300)
        }, 100)
      }
    }

    // Check for window load event
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
        alignItems: "flex-end",
        justifyContent: "flex-end",
        zIndex: 9999,
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.5s ease-out",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Archivo, sans-serif",
          fontWeight: 500,
          fontSize: { xs: "60px", md: "78px" },
          color: "#fff",
          marginRight: { xs: "30px", md: "70px" },
          marginBottom: { xs: "20px", md: "40px" },
          lineHeight: 1,
        }}
      >
        {count}%
      </Typography>
    </Box>
  )
}

export default LoadingScreen
