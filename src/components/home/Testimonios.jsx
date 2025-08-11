import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
      author: "María Rodríguez",
      date: "15 Mayo 2023",
      testimonio: "Excelente el Dr. Ripoll, en todo momento me hizo sentir seguro, explicándome paso a paso. El equipo del Dr. dando apoyo en el pre y postoperatorio, muy atentos y cuidadosos."
    },
    {
      author: "Carlos Martínez",
      date: "28 Junio 2023",
      testimonio: "Una experiencia transformadora. La atención personalizada y el profesionalismo del equipo superaron todas mis expectativas. Recomiendo ampliamente sus servicios."
    },
    {
      author: "Laura González",
      date: "3 Julio 2023",
      testimonio: "Desde el primer momento me sentí en las mejores manos. El Dr. Ripoll y su equipo demuestran un nivel de excelencia y calidez humana incomparable."
    },
    {
      author: "Javier Sánchez",
      date: "12 Agosto 2023",
      testimonio: "Profesionalismo excepcional combinado con un trato humano extraordinario. Los resultados superaron mis expectativas y el seguimiento post-tratamiento fue impecable."
    },
    {
      author: "Ana López",
      date: "5 Septiembre 2023",
      testimonio: "La confianza que transmite el Dr. Ripoll es única. Todo el proceso fue transparente y el equipo estuvo pendiente de cada detalle. Estoy muy satisfecha."
    },
    {
      author: "David Fernández",
      date: "19 Octubre 2023",
      testimonio: "Una experiencia que recordaré por mucho tiempo. Profesionales, amables y con un toque personal que hace la diferencia."
    },
    {
      author: "Sofía Pérez",
      date: "2 Noviembre 2023",
      testimonio: "Me sentí como en casa pero con un toque de lujo. Cada detalle cuidadosamente planeado. Definitivamente mi nueva opción favorita."
    },
    {
      author: "Miguel Torres",
      date: "14 Diciembre 2023",
      testimonio: "Excelencia en cada aspecto. Desde la comunicación inicial hasta la ejecución final, todo fue perfecto. ¡Absolutamente recomendado!"
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

  // Progress bar calculation
  const progress = ((currentIndex + 1) / (maxIndex + 1)) * 100;

  return (
    <Box sx={{ marginInline: { xs: 'auto', md: '40px' }, padding: { xs: '12px', md: '32px' }, width: { xs: '80%', md: '100%'} }} style={{minHeight: '100vh', backgroundColor: 'white'}}>
      {/* Header */}
      <Box sx={{ display: 'flex', width: { xs: '100%', md: '50%'}, textAlign: 'start', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
        <Typography color="black" fontFamily={'Poppins'} fontSize={{ xs: '35px',md: '45px' , xl: '70px' }} sx={{ width: '100%', textTransform: '', letterSpacing: '-3px'}}>
          <Typography component="span" fontFamily={'Poppins'} fontSize={{ xs: '35px',md: '45px' , xl: '70px' }} sx={{ color: 'textAccent', textTransform: '', letterSpacing: '-3px' }}>
            Confianza {" "}
          </Typography>
          en cada testimonio. 
        </Typography>
        <Typography sx={{ width: '100%' }} style={{ textAlign: 'start', fontSize: '20px', color: '#4B5563' }}>
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
              transition: isDragging ? 'none' : 'transform 0.3s ease-out',
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
                    height: '450px',
                    borderRadius: '16px',
                    padding: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(240, 240, 255, 0.4))',
                    border: '1px solid rgba(255, 255, 255, 0.8)',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  {/* Quote */}
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ fontSize: '36px', color: '#93C5FD', marginBottom: '8px' }}>"</div>
                    <p style={{ 
                      fontSize: '18px',
                      color: '#1F2937',
                      lineHeight: '1.6',
                      display: '-webkit-box',
                      WebkitLineClamp: 6,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {testimonio.testimonio}
                    </p>
                  </div>
                  
                  {/* Author */}
                  <div style={{ 
                    textAlign: 'center',
                    marginTop: '24px',
                    paddingTop: '24px',
                    borderTop: '1px solid #E5E7EB'
                  }}>
                    <p style={{ 
                      fontWeight: '600',
                      fontSize: '20px',
                      color: '#111827',
                      marginBottom: '4px'
                    }}>
                      {testimonio.author}
                    </p>
                    <p style={{ 
                      fontSize: '14px',
                      color: '#6B7280'
                    }}>
                      {testimonio.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          style={{
            position: 'absolute',
            left: '-20px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'white',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #E5E7EB',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
            opacity: currentIndex === 0 ? 0.5 : 1,
            transition: 'all 0.2s ease',
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            if (currentIndex !== 0) {
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          }}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={24} color="#374151" />
        </button>
        
        <button
          onClick={handleNext}
          disabled={currentIndex === maxIndex}
          style={{
            position: 'absolute',
            right: '-20px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'white',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #E5E7EB',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            cursor: currentIndex === maxIndex ? 'not-allowed' : 'pointer',
            opacity: currentIndex === maxIndex ? 0.5 : 1,
            transition: 'all 0.2s ease',
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            if (currentIndex !== maxIndex) {
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          }}
          aria-label="Next testimonial"
        >
          <ChevronRight size={24} color="#374151" />
        </button>
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
          whiteSpace: 'nowrap'
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
              background: 'linear-gradient(to right, #75909fff, #0081C7)',
              borderRadius: '2px',
              width: `${progress}%`,
              transition: 'width 0.3s ease'
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