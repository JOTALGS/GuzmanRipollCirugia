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
        py: 3,
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
      <Box sx={{ display: 'flex', gap: '35px' }}>
        {testimonios.map((testimonio, index) => (
          <Card 
            key={`testimonio-${index}`}
            sx={{
              flexShrink: 0,
              maxWidth: "15%",
              height: '300px',
              borderRadius: 3,
              boxShadow: 3,
              // Glass effect styles:
              backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white
              backgroundImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(12px)', // Blur effect
              WebkitBackdropFilter: 'blur(12px)', // Safari support
              position: 'relative',
              overflow: 'hidden',
              // Optional: Inner shadow for depth
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: 3,
                boxShadow: 'inset 0 0 15px rgba(255, 255, 255, 0.5)',
                pointerEvents: 'none',
                
              },
              padding: 4,
            }}
          >
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 2 }}>
                <Typography 
                  sx={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 4,
                    minHeight: theme.typography.body1.lineHeight * 4,
                    fontSize: '18px',
                    fontWeight: '500',
                    color: 'black',
                  }}
                >
                  {testimonio.testimonio}
                </Typography>
              </Box>
              <Box sx={{ mt: 'auto', textAlign: 'center', mb: "25px" }}>
                <Typography sx={{ fontWeight: 'bold', color: 'text.primary' }}>
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

  const currentTestimonial = Math.floor(scrollProgress * (testimonios.length - 1)) + 1;

  return (
    <Box
      sx={{
        height: '94vh',
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
        columnGap: '35px',
        paddingInline: '75px',
        backgroundColor: '#222e34',
        
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
        <Typography color="black" fontFamily={'Poppins'} fontSize={'65px'} sx={{ textTransform: 'capitalize', lineHeight: 1.2 }}>
          <span style={{ color: '#0081C7' }}>Confianza</span> en
        </Typography>

        <Typography color="black" fontFamily={'Poppins'}fontSize={'65px'} sx={{ textTransform: 'capitalize', lineHeight: 1.2 }}>
          cada Testimonio.
        </Typography>
        
        <Typography color="black" fontFamily={'Poppins'} width={'90%'} fontSize={'25px'} sx={{ lineHeight: 1.2 }}>
          Garantizamos confianza, cercanía y un toque humano en cada tratamiento.
        </Typography>
      </Box>

      <Box
        sx={{
          marginTop: '71px',
          gridColumn: '1 / 13',
          gridRow: '2 / 3',
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'hidden',
          textAlign: 'start',
          alignItems: 'start',
          justifyContent: 'start',
        }}
      >
        <HorizontalCarousel testimonios={testimonios} onScrollProgress={setScrollProgress} />
      </Box>

      <Box 
        sx={{
          gridColumn: '1 / 13',
          gridRow: '4 / 5',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          padding: '20px 0',
          justifyContent: 'center',
        }}
      >
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'white', 
            fontFamily: 'Poppins', 
            fontSize: '18px',
            minWidth: '30px',
            textAlign: 'right'
          }}
        >
          {testimonios.length} Testimonios
        </Typography>
        
        <Box 
          sx={{ 
            flexGrow: 1, 
            maxWidth: '600px',
            height: '4px', 
            backgroundColor: 'rgba(255,255,255,0.3)', 
            mx: 2,
            borderRadius: '2px'
          }}
        >
          <Box 
            sx={{ 
              height: '100%', 
              width: `${scrollProgress * 100}%`, 
              backgroundColor: '#0081C7',
              borderRadius: '2px'
            }} 
          />
        </Box>
      </Box>

    </Box>
  );
}