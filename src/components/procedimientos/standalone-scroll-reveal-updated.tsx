"use client"

import { useRef, useLayoutEffect, useState, useEffect } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import { Box, Typography, Button } from "@mui/material"

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollRevealProps {
  imageSrc: string
  imageAlt?: string
  projectNumber?: string
  projectTitle?: string
  location?: string
  category?: string
}

export default function StandaloneScrollReveal({
  imageSrc,
  imageAlt = "Architectural project",
  projectNumber = "01",
  projectTitle = "Cirugia Mamaria",
  location = "Punta del Este, Maldonado",
  category = "procedimiento 01",
}: ScrollRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const maskRef = useRef<HTMLDivElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = imageSrc
    img.onload = () => setImageLoaded(true)
  }, [imageSrc])

  useLayoutEffect(() => {
    if (!imageLoaded) return

    const ctx = gsap.context(() => {
      gsap.set(maskRef.current, {
        clipPath: "inset(35% 25% 35% 25%)",
      })

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (self.progress > 0.95 && self.direction > 0) {
              self.scroll(self.end)
            }
          },
        },
      }).to(maskRef.current, {
        clipPath: "inset(0%)",
        ease: "power2.inOut",
        duration: 1,
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [imageLoaded])

  return (
    <>
      {/* Scroll animation section */}
      <Box
        ref={sectionRef}
        sx={{
          position: "relative",
          height: "100vh",
          width: "100%",
          bgcolor: "black",
          overflow: "hidden",
        }}
      >
        {/* Black background + mask image */}
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "black" }}>
          <Box
            ref={maskRef}
            sx={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
              clipPath: "inset(35% 25% 35% 25%)",
              willChange: "clip-path",
            }}
          >
            <Box
              component="img"
              src={imageSrc}
              alt={imageAlt}
              sx={{
                position: "absolute",
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: "100%",
                height: "100%",
                objectFit: "cover",
                visibility: imageLoaded ? "visible" : "hidden",
              }}
              onLoad={() => setImageLoaded(true)}
            />
          </Box>
        </Box>

        {/* Overlay text */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2, md: 6 },
            pointerEvents: "none",
            zIndex: 5,
          }}
        >
          <Typography variant="h2" color="white" fontWeight={300}>
            {projectNumber}
          </Typography>
          <Typography variant="h4" color="white" fontWeight={300}>
            {projectTitle}
          </Typography>
        </Box>

        {/* Header */}
        <Box
          component="header"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 30,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
          }}
        >
          <Typography color="white" fontSize="0.875rem" fontWeight={500}>
            DR. GUZMAN RIPOLL
          </Typography>
          <Button variant="text" sx={{ color: "white", fontSize: "0.875rem" }}>
            Menu
          </Button>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 30,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 3,
            color: "white",
            fontSize: "0.875rem",
          }}
        >
          <Typography>{location}</Typography>
          <Typography>( Scroll to continue )</Typography>
          <Typography>{category}</Typography>
        </Box>
      </Box>

      {/* Next section */}
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ maxWidth: "800px", px: 2, color: "white" }}>
          <Typography variant="h4" fontWeight={300} mb={4}>
            Project Details
          </Typography>
          <Typography variant="body1" mb={3}>
            This modern hillside residence features a striking concrete structure with multiple levels cascading down
            the slope. Floor-to-ceiling windows provide panoramic views of the surrounding forest and ocean, while the
            infinity pool creates a seamless transition between the built environment and natural landscape.
          </Typography>
          <Typography variant="body1">
            The interior spaces are designed with warm lighting and minimalist furnishings, creating a perfect balance
            between luxury and integration with the natural environment.
          </Typography>
        </Box>
      </Box>
    </>
  )
}
