"use client"

import React, { useState, useEffect, useRef } from "react";
import { Box, Card, CardContent, Button, useTheme, Typography } from "@mui/material";
import { useLenis } from "@studio-freight/react-lenis";
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"


gsap.registerPlugin(ScrollTrigger)
export function ResultsPortfolioSection({ size = "default", py = "64px" }) {
  const theme = useTheme();
  const portfolioItems = [
    {
      title: "LIPOASPIRACION 2024",
      subtitle: "(BodyTite, Morpheus8)",
      imgSrc: "/placeholder.svg?width=600&height=800",
      showButton: true,
    },
    {
      title: "MASTOPEXIA EN T",
      subtitle: "(Cirugia Mamaria)",
      imgSrc: "/placeholder.svg?width=600&height=800",
    },
    {
      title: "LIPOASPIRACION 2024",
      subtitle: "(BodyTite)",
      imgSrc: "/placeholder.svg?width=600&height=800",
    },
    {
      title: "RINOPLASTIA",
      subtitle: "(Cirugia de Nariz)",
      imgSrc: "/placeholder.svg?width=600&height=800",
    },
    {
      title: "OTRO TRABAJO",
      subtitle: "(Detalle)",
      imgSrc: "/placeholder.svg?width=600&height=800",
    },
  ];

  const [api, setApi] = useState(null);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);
  const lenis = useLenis();

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef(null);
  const dragTimeoutRef = useRef(null);
  const heroTextRef = useRef(null)
  const resultadosTitleRef = useRef(null)
  const doctorTitleRef = useRef(null)
  const humanConnectionTitleRef = useRef(null)
  const autoScrollRef = useRef(null)

  useEffect(() => {
    const elements = [
      { ref: heroTextRef, y: 50 },
      { ref: resultadosTitleRef, y: 30 },
      { ref: doctorTitleRef, y: 50 },
      { ref: humanConnectionTitleRef, y: 50 }
    ]

    const animations = elements.map(el => 
      gsap.fromTo(
        el.ref.current,
        { opacity: 0, y: el.y },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el.ref.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      )
    )

    return () => {
      animations.forEach(anim => anim.scrollTrigger?.kill())
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])


  
  // Calculate responsive card width
  const getCardWidth = () => {
    switch (size) {
      case "large":
        return { xs: "100%", sm: "48%", md: "32%", lg: "23%" };
      default:
        return { xs: "100%", sm: "48%", md: "31%", lg: "23%" };
    }
  };

  
  // Mouse event handlers for drag functionality
  const startDrag = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    
    // Clear any pending scroll timeouts
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
  };

  const duringDrag = (e) => {
    if (!isDragging) return;
    
    // Prevent text selection during drag
    e.preventDefault();
    
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiply for faster drag response
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const endDrag = () => {
    setIsDragging(false);
    
    // Add a small timeout to prevent accidental clicks after dragging
    dragTimeoutRef.current = setTimeout(() => {
      dragTimeoutRef.current = null;
    }, 100);
  };

  // Prevent click events after dragging
  const handleCardClick = (e) => {
    if (dragTimeoutRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (dragTimeoutRef.current) clearTimeout(dragTimeoutRef.current);
    };
  }, []);


  // Auto-scroll effect - constant smooth rotation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId;
    const scrollSpeed = 0.5; // pixels per frame

    const autoScroll = () => {
      if (!isDragging && container) {
        container.scrollLeft += scrollSpeed;

        // Reset to beginning when reaching the end
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isDragging]);

  // Smooth scroll effect on page scroll
  useEffect(() => {
    if (!lenis) return;

    const handleScroll = ({ scroll }) => {
      const container = containerRef.current;
      if (!container) return;

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      scrollTimeout.current = setTimeout(() => {
        const scrollDelta = scroll - lastScrollY.current;
        const scrollThreshold = 20;

        if (Math.abs(scrollDelta) > scrollThreshold) {
          // Smooth scroll the carousel based on page scroll
          const scrollAmount = scrollDelta * 0.5;
          container.scrollLeft += scrollAmount;
          lastScrollY.current = scroll;
        }
      }, 50);
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [lenis]);


  return (
    <Box
      component="section"
      ref={heroTextRef}
      sx={{
        position: 'relative',
        left: { xs: 'calc(-20px - 8px)', md: '50%' },
        right: { xs: 'calc(-20px - 8px)', md: '50%' },
        marginLeft: { xs: 0, md: '-50vw' },
        marginRight: { xs: 0, md: '-50vw' },
        width: { xs: 'calc(100% + 40px + 16px)', md: '100vw' },
        maxWidth: { xs: 'calc(100% + 40px + 16px)', md: '100vw' },
        py: { xs: 4, md: 6 },
        backgroundColor: "white",
        overflow: 'hidden'
      }}
    >
      <Box component="section" sx={{
        width: '100%',
        position: 'relative'
      }}>
        <Box>
          {/* Custom carousel implementation */}
          <Box className="results-carousel" sx={{ width: '100%' }}>
            <Box
              ref={containerRef}
              onMouseDown={startDrag}
              onMouseMove={duringDrag}
              onMouseUp={endDrag}
              onMouseLeave={endDrag}
              sx={{
                display: 'flex',
                overflowX: 'auto',
                gap: '16px',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
                py: 1,
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
                scrollBehavior: 'smooth',
                paddingLeft: { xs: '20px', md: '16px' },
                paddingRight: { xs: '20px', md: '16px' }
              }}
            >
              {portfolioItems.map((item, index) => (
                <Box
                  key={index}
                  onClick={handleCardClick}
                  sx={{
                    minWidth: {xs: '280px', md:  '900px'},
                    maxWidth: {xs: '280px', md:  '900px'},
                    flexShrink: 0
                  }}
                >
                  <Box className="group" sx={{ p: '4px' }}>
                    <Card sx={{
                      borderRadius: '16px',
                      border: 'none',
                      bgcolor: theme.palette.grey[200],
                      boxShadow: 'none'
                    }}>
                      <CardContent sx={{
                        position: 'relative',
                        width: { xs: '280px', md: '900px' },
                        height: { xs: '350px', md: '50vh' },
                        p: 0
                      }}>
                        <img
                          src={item.imgSrc || "/placeholder.svg"}
                          alt={item.title}
                          layout="fill"
                          objectFit="cover"
                        />
                      </CardContent>
                    </Card>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// Style constants
const sectionTitleStyle = {
  fontFamily: "Archivo Expanded",
  fontSize: "18px",
  textTransform: "uppercase",
  letterSpacing: "0.2em",
  color: "text.primary"
}
