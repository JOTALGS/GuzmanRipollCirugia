"use client";
import { useRef, useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  useTheme 
} from '@mui/material';

// Horizontal Carousel Component
const HorizontalCarousel = ({ testimonios, onScrollProgress }) => {
  const theme = useTheme();
  const carouselRef = useRef(null);
  const [dragStart, setDragStart] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);

  const updateScrollProgress = () => {
    if (!carouselRef.current) return;
    
    const container = carouselRef.current;
    const scrollPosition = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const progress = maxScroll > 0 ? scrollPosition / maxScroll : 0;
    console.log('######DEBUG: ',progress);
    if (onScrollProgress) onScrollProgress(progress);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragStart(e.pageX || e.touches[0].pageX);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    
    const x = e.pageX || e.touches[0].pageX;
    const walk = (x - dragStart) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleResize = () => updateScrollProgress();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box
      ref={carouselRef}
      sx={{
        display: 'flex',
        overflowX: 'auto',
        py: { xs: 0, md: 3},
        cursor: 'grab',
        '&::-webkit-scrollbar': { display: 'none' },
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
      onScroll={updateScrollProgress}
    >
      <Box sx={{ display: 'flex', gap: '20px', paddingRight: '70px' }}>
        {testimonios.map((testimonio, index) => (
          <Card
            key={`testimonio-${index}`}
            sx={{
              flexShrink: 0,
              maxWidth: { xs: "280px", md: "350px" }, // maxWidth para que funcione el drag
              height: { xs: '300px', md: '455px' }, // Figma exact height
              borderRadius: 3,
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
              // Clean glass effect styles:
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              position: 'relative',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
              },
              padding: { xs: 1, md: 4},
            }}
          >
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 2, flex: 1 }}>
                <Typography 
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: { xs: 6, md: 8 },
                    overflow: 'hidden',
                    fontSize: { xs: '16px', md: '24px'}, // 24px as specified
                    fontWeight: '400', // Regular as specified
                    color: 'black',
                    lineHeight: 1.4,
                  }}
                >
                  "{testimonio.testimonio}"
                </Typography>
              </Box>
              <Box sx={{ 
                position: 'absolute', 
                bottom: '30px', 
                left: '50%', 
                transform: 'translateX(-50%)', 
                width: 'calc(100% - 60px)',
                mt: 'auto', 
                textAlign: 'center'
              }}>
                <Typography sx={{ 
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '500', // Medium as specified
                  fontSize: { xs: '16px', md: '20px'}, // 20px as specified
                  color: 'black' 
                }}>
                  {testimonio.author}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}

        
      </Box>
    </Box>
  );
};

// Main Component
export default function Testimonios() {
  const testimonios = [
    {
      author: "María Rodríguez",
      date: "15 Mayo 2023",
      testimonio: "Excelente el Dr. Ripoll, en todo momento me hizo sentir seguro, explicándome paso a paso. El equipo del Dr. dando apoyo en el pre y postoperatorio, muy atentos y cuidadosos."
    },
    {
      author: "Carlos Martínez",
      date: "28 Junio 2023",
      testimonio: "Excelente el Dr. Ripoll, en todo momento me hizo sentir seguro, explicándome paso a paso. El equipo del Dr. dando apoyo en el pre y postoperatorio, muy atentos y cuidadosos."
    },
    {
      author: "Laura González",
      date: "3 Julio 2023",
      testimonio: "Excelente el Dr. Ripoll, en todo momento me hizo sentir seguro, explicándome paso a paso. El equipo del Dr. dando apoyo en el pre y postoperatorio, muy atentos y cuidadosos."
    },
    {
      author: "Javier Sánchez",
      date: "12 Agosto 2023",
      testimonio: "Excelente el Dr. Ripoll, en todo momento me hizo sentir seguro, explicándome paso a paso. El equipo del Dr. dando apoyo en el pre y postoperatorio, muy atentos y cuidadosos."
    },
    {
      author: "Ana López",
      date: "5 Septiembre 2023",
      testimonio: "Excelente el Dr. Ripoll, en todo momento me hizo sentir seguro, explicándome paso a paso. El equipo del Dr. dando apoyo en el pre y postoperatorio, muy atentos y cuidadosos."
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

  
  const [scrollProgress, setScrollProgress] = useState(0);

  return (
    <Box
      sx={{
        height: { xs: '115vh', md: '110vh' },
        paddingBottom: '6vh',
        overflowY: 'scroll',
        overflowX: 'hidden',
        // Hide scrollbar - Webkit (Brave, Chrome, Safari)
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        // Hide scrollbar - Firefox
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE & Edge (legacy)
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        columnGap: { xs: '20px', md: '20px' },
        paddingInline: { xs: '15px', md: '70px' }, // Changed to 70px as specified
        backgroundColor: '#ffffffff',
        
      }}
    >
      <Box
        sx={{
          marginTop: '40px',
          gridColumn: '1 / 6',
          gridRow: '1 / 1',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'start',
          alignItems: 'start',
          justifyContent: 'start',
        }}
      >
        <Typography color="black" fontFamily={'Poppins'} fontSize={{ xs: '45px', md: '65px'}} sx={{ textTransform: 'capitalize', lineHeight: 1.2 }}>
          <span style={{ color: '#0081C7' }}>Confianza</span> en
        </Typography>

        <Typography color="black" fontFamily={'Poppins'} fontSize={{ xs: '45px', md: '65px'}} sx={{ textTransform: 'capitalize', lineHeight: 1.2 }}>
          cada Testimonio.
        </Typography>

        <Typography color="black" fontFamily={'Poppins'} width={{ xs: '200%', md: '75%' }} fontSize={{ xs: '18px', md: '25px'}} sx={{ overflow: 'visible', lineHeight: 1.2 }}>
          Garantizamos confianza, cercanía y un toque humano en cada tratamiento.
        </Typography>
      </Box>

      <Box
        sx={{
          marginTop: { xs: '0px', md: '71px' },
          gridColumn: '1 / 13',
          gridRow: '2 / 4',
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'hidden',
          textAlign: 'start',
          alignItems: 'start',
          justifyContent: 'start',
          overflowY: 'hidden',
        }}
      >
        <HorizontalCarousel testimonios={testimonios} onScrollProgress={setScrollProgress} />
      </Box>

      <Box 
        sx={{
          gridColumn: '1 / 13',
          gridRow: '5 / 6',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          padding: '20px 0',
          justifyContent: 'flex-start',
          paddingInline: { xs: '15px', md: '70px' },
        }}
      >
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'black', 
            fontFamily: 'Poppins', 
            fontSize: '18px',
            minWidth: 'fit-content',
            marginRight: '20px'
          }}
        >
          {testimonios.length} Testimonios
        </Typography>
        
        <Box 
          sx={{ 
            flexGrow: 1,
            height: '3px', 
            backgroundColor: 'rgba(165, 165, 165, 0.3)', 
            borderRadius: '2px'
          }}
        >
          <Box 
            sx={{ 
              height: '100%', 
              width: `${scrollProgress * 100}%`, 
              backgroundColor: '#000000ff',
              borderRadius: '2px'
            }} 
          />
        </Box>
      </Box>

    </Box>
  );
}
