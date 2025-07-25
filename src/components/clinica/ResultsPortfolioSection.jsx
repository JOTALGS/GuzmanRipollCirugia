"use client"

import React, { useState, useEffect, useRef } from "react";
import { Box, Card, CardContent, Button, IconButton, useTheme, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
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


  useEffect(() => {
    if (!api || !lenis) return;

    const handleScroll = ({ scroll }) => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      scrollTimeout.current = setTimeout(() => {
        const scrollDelta = scroll - lastScrollY.current;
        const scrollThreshold = 20;

        if (Math.abs(scrollDelta) > scrollThreshold) {
          if (scrollDelta > 0) {
            api.scrollNext();
          } else {
            api.scrollPrev();
          }
          lastScrollY.current = scroll;
        }
      }, 100);
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [api, lenis]);


  return (
    <Box component="section" ref={heroTextRef}  sx={{ py: 8, backgroundColor: "#fff" }}>
      <Box ref={resultadosTitleRef} sx={{ 
        mb: 4, 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between" 
      }}>
        <Typography variant="h2" sx={sectionTitleStyle}>
          RESULTADOS
        </Typography>
        <Box>
          <IconButton
            onClick={() => document.querySelector(".results-carousel .slick-prev")?.click()}
            sx={{ color: "text.primary" }}
          >
            <ArrowLeftIcon />
          </IconButton>
          <IconButton
            onClick={() => document.querySelector(".results-carousel .slick-next")?.click()}
            sx={{ color: "text.primary", ml: 1 }}
          >
            <ArrowRightIcon />
          </IconButton>
        </Box>
      </Box>
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
                ml: '-8px',
                py: 1,
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none'
              }}
            >
              {portfolioItems.map((item, index) => (
                <Box 
                  key={index} 
                  onClick={handleCardClick}
                  sx={{
                    minWidth: "500px",
                    maxHeight: '1000px',
                    pl: '16px',
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
                        width: '600px',
                        height: '500px',
                        p: 0
                      }}>
                        <img 
                          src={item.imgSrc || "/placeholder.svg"} 
                          alt={item.title} 
                          layout="fill"
                          objectFit="cover"
                        />
                        {item.showButton && (
                          <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 10,
                            bgcolor: 'rgba(0,0,0,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                            '&:hover': { opacity: 1 }
                          }}>
                            <Button
                              variant="contained"
                              sx={{
                                height: '128px',
                                width: '128px',
                                borderRadius: '50%',
                                bgcolor: 'black',
                                color: 'white',
                                boxShadow: theme.shadows[4],
                                '&:hover': { bgcolor: theme.palette.grey[900] }
                              }}
                            >
                              Ver mas
                            </Button>
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                    <Box sx={{ pt: '16px', textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.grey[500] }}>
                        {item.subtitle}
                      </Typography>
                    </Box>
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
