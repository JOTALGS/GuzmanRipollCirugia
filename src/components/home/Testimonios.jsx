import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const TestimoniosCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef(null);
  const containerRef = useRef(null);
  const [cardsToShow, setCardsToShow] = useState(3);

  const testimonios = [
    {
      author: "Ignacio Espeche",
      testimonio: "Excelente el Dr. Ripoll, en todo momento me hizo sentir seguro, explicándome paso a paso. El equipo del Dr. dando apoyo en el pre y postoperatorio, muy atentos y cuidadosos."
    },
    {
      author: "Ignacio Espeche",
      testimonio: "Excelente el Dr. Ripoll, en todo momento me hizo sentir seguro, explicándome paso a paso. El equipo del Dr. dando apoyo en el pre y postoperatorio, muy atentos y cuidadosos."
    },
    {
      author: "Ignacio Espeche",
      testimonio: "Excelente el Dr. Ripoll, en todo momento me hizo sentir seguro, explicándome paso a paso. El equipo del Dr. dando apoyo en el pre y postoperatorio, muy atentos y cuidadosos."
    },
    {
      author: "Ignacio Espeche",
      testimonio: "Excelente el Dr. Ripoll, en todo momento me hizo sentir seguro, explicándome paso a paso. El equipo del Dr. dando apoyo en el pre y postoperatorio, muy atentos y cuidadosos."
    },
    {
      author: "Ignacio Espeche",
      testimonio: "Excelente el Dr. Ripoll, en todo momento me hizo sentir seguro, explicándome paso a paso. El equipo del Dr. dando apoyo en el pre y postoperatorio, muy atentos y cuidadosos."
    },
    {
      author: "Ignacio Espeche",
      testimonio: "Excelente el Dr. Ripoll, en todo momento me hizo sentir seguro, explicándome paso a paso. El equipo del Dr. dando apoyo en el pre y postoperatorio, muy atentos y cuidadosos."
    },
    {
      author: "Ignacio Espeche",
      testimonio: "Excelente el Dr. Ripoll, en todo momento me hizo sentir seguro, explicándome paso a paso. El equipo del Dr. dando apoyo en el pre y postoperatorio, muy atentos y cuidadosos."
    },
    {
      author: "Ignacio Espeche",
      testimonio: "Excelente el Dr. Ripoll, en todo momento me hizo sentir seguro, explicándome paso a paso. El equipo del Dr. dando apoyo en el pre y postoperatorio, muy atentos y cuidadosos."
    },
    {
      author: "Ignacio Espeche",
      testimonio: "Excelente el Dr. Ripoll, en todo momento me hizo sentir seguro, explicándome paso a paso. El equipo del Dr. dando apoyo en el pre y postoperatorio, muy atentos y cuidadosos."
    }
  ];

  // Responsive cards to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonios.length - cardsToShow);

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
    setDragOffset(0);
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
    setDragOffset(0);
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const currentX = e.pageX;
    const diff = currentX - startX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 100;
    // Invertido: arrastrar a la derecha (dragOffset > 0) mueve a la tarjeta anterior
    if (dragOffset > threshold && currentIndex > 0) {
      handlePrevious();
    } else if (dragOffset < -threshold && currentIndex < maxIndex) {
      handleNext();
    }
    setDragOffset(0);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].pageX;
    const diff = currentX - startX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 50;
    // Invertido: arrastrar a la derecha (dragOffset > 0) mueve a la tarjeta anterior
    if (dragOffset > threshold && currentIndex > 0) {
      handlePrevious();
    } else if (dragOffset < -threshold && currentIndex < maxIndex) {
      handleNext();
    }
    setDragOffset(0);
  };

  // Calculate the transform value
  const getTransformValue = () => {
    if (!containerRef.current) return 0;
    const cardWidth = containerRef.current.offsetWidth / cardsToShow;
    const offset = (currentIndex * cardWidth) - dragOffset; // Cambiado: resta en lugar de suma
    return -offset;
  };

  // Progress bar calculation - ultra smooth and perfect loading
  const getProgressWidth = () => {
    const totalSlides = maxIndex + 1;
    const currentProgress = currentIndex / Math.max(totalSlides - 1, 1);
    return Math.min(currentProgress * 100, 100);
  };
  
  const progress = getProgressWidth();

  return (
    <Box sx={{ marginInline: { xs: '10px', md: '70px' }, padding: { xs: '20px 5px', md: '32px' }, width: 'auto' }} style={{minHeight: '100vh', backgroundColor: 'white'}}>
      {/* Header */}
      <Box sx={{ display: 'flex', width: { xs: '100%', md: '50%'}, textAlign: 'start', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
        <Typography color="black" fontFamily={'Poppins'} fontSize={{ xs: '28px',md: '45px' , xl: '70px' }} sx={{ width: '100%', textTransform: '', letterSpacing: { xs: '-1px', md: '-3px' }}}>
          <Typography component="span" fontFamily={'Poppins'} fontSize={{ xs: '28px',md: '45px' , xl: '70px' }} sx={{ color: '#75909F', textTransform: '', letterSpacing: { xs: '-1px', md: '-3px' } }}>
            Confianza {" "}
          </Typography>
          en cada
        </Typography>
        <Typography color="black" fontFamily={'Poppins'} fontSize={{ xs: '28px',md: '45px' , xl: '70px' }} sx={{ width: '100%', textTransform: '', letterSpacing: { xs: '-1px', md: '-3px' }}}>
          Testimonio.
        </Typography>
        <Typography sx={{ width: '100%', fontSize: { xs: '16px', md: '20px' } }} style={{ textAlign: 'start', color: '#4B5563' }}>
          Garantizamos confianza, cercanía y un toque humano en cada tratamiento.
        </Typography>
      </Box>

      {/* Carousel Container */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative' }}>
        <div 
          ref={containerRef}
          style={{ 
            overflow: 'hidden',
            borderRadius: '12px',
            position: 'relative',
            width: '100%'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            ref={carouselRef}
            style={{ 
              display: 'flex',
              transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: `translateX(${getTransformValue()}px)`,
              cursor: isDragging ? 'grabbing' : 'grab',
              userSelect: 'none'
            }}
          >
            {testimonios.map((testimonio, index) => (
              <div
                key={index}
                style={{
                  minWidth: `${100 / cardsToShow}%`,
                  padding: '0 8px',
                  boxSizing: 'border-box'
                }}
              >
                <div 
                  style={{
                    height: window.innerWidth < 768 ? '280px' : '350px',
                    borderRadius: '16px',
                    padding: window.innerWidth < 768 ? '16px' : '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Quote */}
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <p style={{ 
                      fontSize: window.innerWidth < 768 ? '14px' : '16px',
                      color: '#000000',
                      lineHeight: '1.5',
                      display: '-webkit-box',
                      WebkitLineClamp: window.innerWidth < 768 ? 6 : 8,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      margin: 0,
                      fontFamily: 'Poppins'
                    }}>
                      {testimonio.testimonio}
                    </p>
                  </div>
                  
                  {/* Author */}
                  <div style={{ 
                    textAlign: 'left',
                    marginTop: '24px',
                    paddingTop: '0px'
                  }}>
                    <p style={{ 
                      fontWeight: '400',
                      fontSize: window.innerWidth < 768 ? '14px' : '16px',
                      color: '#000000',
                      marginBottom: '0px',
                      fontFamily: 'Poppins'
                    }}>
                      {testimonio.author}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Progress Bar */}
      <div style={{ 
        maxWidth: '1280px',
        margin: '48px auto 0',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <span style={{ 
          color: '#374151',
          fontWeight: '500',
          whiteSpace: 'nowrap',
          fontFamily: 'Poppins'
        }}>
          {testimonios.length} Testimonios
        </span>
        <div style={{ 
          flex: 1,
          height: '4px',
          backgroundColor: '#E5E7EB',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div 
            style={{ 
              height: '100%',
              background: 'linear-gradient(to right, #75909F, #0081C7)',
              borderRadius: '2px',
              width: `${progress}%`,
              transition: 'width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          />
        </div>
      </div>

      {/* Dots Indicator */}
      <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '32px'
      }}>
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: index === currentIndex ? '32px' : '8px',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: index === currentIndex ? '#0081C7' : '#D1D5DB',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </Box>
  );
};

export default TestimoniosCarousel;