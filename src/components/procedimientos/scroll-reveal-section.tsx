"use client"

import { useRef, useLayoutEffect } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import SplitText from "gsap/SplitText"
import { Box, Container, Typography } from "@mui/material"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText)
}

interface ScrollRevealProps {
  imageSrc: string
  imageAlt: string
  heading: string
  pin?: boolean
}

export default function ScrollRevealSection({
  imageSrc = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DpeKhYAJhydU2QhrB9aAiuhkuaEX6C.png",
  imageAlt = "Architectural detail",
  heading = "The Future is Here",
  pin = false,
}: ScrollRevealProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Create timeline for animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          pin: pin,
          anticipatePin: 1,
        },
      })

      // Image reveal animation with elastic easing
      tl.to(imageRef.current, {
        scale: 1,
        ease: "elastic.out(1, 0.5)",
      })

      // Text animation with SplitText
      if (headingRef.current) {
        const splitText = new SplitText(headingRef.current, { type: "chars, words" })
        const chars = splitText.chars

        gsap.set(chars, { y: 50, opacity: 0 })

        tl.to(
          chars,
          {
            y: 0,
            opacity: 1,
            stagger: 0.02,
            ease: "power3.out",
            duration: 0.5,
          },
          "-=0.5",
        ) // Start slightly before the image animation completes
      }

      return () => {
        // Cleanup
        tl.kill()
        ScrollTrigger.getAll().forEach((st) => st.kill())
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [pin])

  return (
    <>
      {/* Hero Section */}
      <Box
        ref={sectionRef}
        sx={{
          position: 'relative',
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: 'black',
        }}
      >
        {/* Background Image */}
        <Box
          ref={imageWrapperRef}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden',
            willChange: 'transform',
          }}
        >
          <Box
            component="img"
            ref={imageRef}
            src={imageSrc || '/placeholder.svg'}
            alt={imageAlt}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'translate(-50%, -50%) scale(1.3)',
              willChange: 'transform',
            }}
          />
        </Box>

        {/* Heading Content */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Typography
            ref={headingRef}
            variant="h2"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: { xs: '3rem', md: '4.5rem' },
              textAlign: 'center',
            }}
          >
            {heading}
          </Typography>
        </Box>
      </Box>

      {/* Next Section */}
      <Box
        sx={{
          backgroundColor: 'white',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight="bold" mb={4}>
            Next Section Content
          </Typography>
          <Typography variant="body1" fontSize="1.125rem">
            This section appears after the reveal animation completes. The content naturally scrolls into view as the
            user continues scrolling.
          </Typography>
        </Container>
      </Box>
    </>
  )
}

// Version without pinning (alternative implementation)
export function ScrollRevealSectionNoPinning(props: Omit<ScrollRevealProps, "pin">) {
  return <ScrollRevealSection {...props} pin={false} />
}
