import { Box, Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export default function VerMasProcedimientosHome() {
  const [isPinned, setIsPinned] = useState(true);
  const imageRefs = useRef([]);

  useEffect(() => {
    // Inicializar GSAP animations
    imageRefs.current.forEach((img) => {
      if (img) {
        gsap.set(img, { transformPerspective: 1000 });
      }
    });
  }, []);

  const handleMouseEnter = (index) => {
    const img = imageRefs.current[index];
    if (img) {
      gsap.to(img, {
        duration: 0.3,
        scale: 1.05,
        y: -3,
        rotationX: 1,
        rotationY: 1,
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = (index) => {
    const img = imageRefs.current[index];
    if (img) {
      gsap.to(img, {
        duration: 0.3,
        scale: 1,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        ease: "power2.out"
      });
    }
  };

  const addToRefs = (el, index) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current[index] = el;
    }
  };

  return (
    <Box
      sx={{
        height: { xs: 'auto', md: '300vh' },
        overflowY: { xs: 'visible', md: 'scroll' },
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        display: { xs: 'flex', md: 'grid' },
        flexDirection: { xs: 'column', md: 'row' },
        gridTemplateColumns: { xs: 'none', md: 'repeat(12, 1fr)' },
        columnGap: { xs: '16px', md: '20px' },
        paddingInline: { xs: '20px', md: '70px' },
      }}
    >
      {/* Primer elemento */}
      <Box
        sx={{
          marginTop: { xs: '25px', md: '71px' },
          width: { xs: '100%', md: 'auto' },
          gridColumn: { xs: 'auto', md: '1 / 5'},
          gridRow: { xs: 'auto', md: '1 / 1'},
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'start',
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', md: '100%'},
            height: {
              xs: '280px',
              sm: '320px',
              md: '50%',
            },
            borderRadius: '6px',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          <Box
            component="img"
            src="/images/bias.png"
            alt="scroll"
            ref={(el) => addToRefs(el, 0)}
            onMouseEnter={() => handleMouseEnter(0)}
            onMouseLeave={() => handleMouseLeave(0)}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            }}
          />
        </Box>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'start', 
          color: '#000000', 
          textAlign: 'start',
          mt: { xs: '20px', md: '15px' } // Aumenté la separación
        }}>
          <Typography variant="p" fontSize={{ xs: '14px', md: '18px' }} fontFamily={'Poppins'} fontWeight={500} sx={{ mb: '4px' }}>MOMMY MAKEOVER</Typography>
          <Typography variant="p" fontSize={{ xs: '14px', md: '16px' }} fontFamily={'Poppins'} color="text.secondary" fontWeight={500}>Bodytite, Morpheus8</Typography>
        </Box>
      </Box>

      {/* Segundo elemento */}
      <Box
        sx={{
          marginTop: { xs: '35px', md: '71px' },
          width: { xs: '100%', md: 'auto' },
          gridColumn: { xs: 'auto', md: '5 / 9'},
          gridRow: { xs: 'auto', md: '1 / 1'},
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'start',
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', md: '100%'},
            height: {
              xs: '320px',
              sm: '360px',
              md: '90%',
            },
            borderRadius: '6px',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          <Box
            component="img"
            src="/images/bias.png"
            alt="scroll"
            ref={(el) => addToRefs(el, 1)}
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={() => handleMouseLeave(1)}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            }}
          />
        </Box>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'start', 
          color: '#000000', 
          textAlign: 'start',
          mt: { xs: '20px', md: '15px' } // Aumenté la separación
        }}>
          <Typography variant="p" fontSize={{ xs: '14px', md: '18px' }} fontFamily={'Poppins'} fontWeight={500} sx={{ mb: '4px' }}>CIRUGIA MAMARIA</Typography>
          <Typography variant="p" fontSize={{ xs: '14px', md: '16px' }} fontFamily={'Poppins'} color="text.secondary" fontWeight={500}>Bodytite, Morpheus8</Typography>
        </Box>
      </Box>

      {/* Tercer elemento */}
      <Box
        sx={{
          marginTop: { xs: '35px', md: '71px' },
          width: { xs: '100%', md: 'auto' },
          gridColumn: { xs: 'auto', md: '9 / 13'},
          gridRow: { xs: 'auto', md: '1 / 1'},
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'start',
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', md: '100%'},
            height: {
              xs: '300px',
              sm: '340px',
              md: '90%',
            },
            borderRadius: '6px',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          <Box
            component="img"
            src="/images/bias.png"
            alt="scroll"
            ref={(el) => addToRefs(el, 2)}
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={() => handleMouseLeave(2)}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            }}
          />
        </Box>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'start', 
          color: '#000000', 
          textAlign: 'start',
          mt: { xs: '20px', md: '15px' } // Aumenté la separación
        }}>
          <Typography variant="p" fontSize={{ xs: '14px', md: '18px' }} fontFamily={'Poppins'} fontWeight={500} sx={{ mb: '4px' }}>LIPOASPIRACION LÁSER</Typography>
          <Typography variant="p" fontSize={{ xs: '14px', md: '16px' }} fontFamily={'Poppins'} color="text.secondary" fontWeight={500}>Bodytite, Morpheus8</Typography>
        </Box>
      </Box>

      {/* Cuarto elemento */}
      <Box
        sx={{
          marginTop: { xs: '35px', md: '71px' },
          width: { xs: '100%', md: 'auto' },
          gridColumn: { xs: 'auto', md: '1 / 5'},
          gridRow: { xs: 'auto', md: '2 / 3'},
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'start',
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', md: '100%'},
            height: {
              xs: '290px',
              sm: '330px',
              md: '50%',
            },
            borderRadius: '6px',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          <Box
            component="img"
            src="/images/bias.png"
            alt="scroll"
            ref={(el) => addToRefs(el, 3)}
            onMouseEnter={() => handleMouseEnter(3)}
            onMouseLeave={() => handleMouseLeave(3)}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            }}
          />
        </Box>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'start', 
          color: '#000000', 
          textAlign: 'start',
          mt: { xs: '20px', md: '15px' } // Aumenté la separación
        }}>
          <Typography variant="p" fontSize={{ xs: '14px', md: '18px' }} fontFamily={'Poppins'} fontWeight={500} sx={{ mb: '4px' }}>MOMMY MAKEOVER</Typography>
          <Typography variant="p" fontSize={{ xs: '14px', md: '16px' }} fontFamily={'Poppins'} color="text.secondary" fontWeight={500}>Bodytite, Morpheus8</Typography>
        </Box>
      </Box>

      {/* Quinto elemento */}
      <Box
        sx={{
          marginTop: { xs: '35px', md: '71px' },
          width: { xs: '100%', md: 'auto' },
          gridColumn: { xs: 'auto', md: '5 / 9'},
          gridRow: { xs: 'auto', md: '2 / 3'},
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'start',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: {
              xs: '340px',
              sm: '380px',
              md: '90%',
            },
            borderRadius: '6px',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          <Box
            component="img"
            src="/images/bias.png"
            alt="scroll"
            ref={(el) => addToRefs(el, 4)}
            onMouseEnter={() => handleMouseEnter(4)}
            onMouseLeave={() => handleMouseLeave(4)}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            }}
          />
        </Box>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'start', 
          color: '#000000', 
          textAlign: 'start',
          mt: { xs: '20px', md: '15px' } // Aumenté la separación
        }}>
          <Typography variant="p" fontSize={{ xs: '14px', md: '18px' }} fontFamily={'Poppins'} fontWeight={500} sx={{ mb: '4px' }}>CIRUGIA MAMARIA</Typography>
          <Typography variant="p" fontSize={{ xs: '14px', md: '16px' }} fontFamily={'Poppins'} color="text.secondary" fontWeight={500}>Bodytite, Morpheus8</Typography>
        </Box>
      </Box>

      {/* Sexto elemento */}
      <Box
        sx={{
          marginTop: { xs: '35px', md: '71px' },
          width: { xs: '100%', md: 'auto' },
          gridColumn: { xs: 'auto', md: '9 / 13'},
          gridRow: { xs: 'auto', md: '2 / 3'},
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'start',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: {
              xs: '310px',
              sm: '350px',
              md: '50%',
            },
            borderRadius: '6px',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          <Box
            component="img"
            src="/images/bias.png"
            alt="scroll"
            ref={(el) => addToRefs(el, 5)}
            onMouseEnter={() => handleMouseEnter(5)}
            onMouseLeave={() => handleMouseLeave(5)}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            }}
          />
        </Box>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'start', 
          color: '#000000', 
          textAlign: 'start',
          mt: { xs: '20px', md: '15px' } // Aumenté la separación
        }}>
          <Typography variant="p" fontSize={{ xs: '14px', md: '18px' }} fontFamily={'Poppins'} fontWeight={500} sx={{ mb: '4px' }}>LIPOASPIRACION LÁSER</Typography>
          <Typography variant="p" fontSize={{ xs: '14px', md: '16px' }} fontFamily={'Poppins'} color="text.secondary" fontWeight={500}>Bodytite, Morpheus8</Typography>
        </Box>
      </Box>

      {/* Séptimo elemento */}
      <Box
        sx={{
          marginTop: { xs: '35px', md: '71px' },
          width: { xs: '100%', md: 'auto' },
          gridColumn: { xs: 'auto', md: '1 / 5'},
          gridRow: { xs: 'auto', md: '3 / 4'},
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'start',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: {
              xs: '320px',
              sm: '360px',
              md: '90%',
            },
            borderRadius: '6px',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          <Box
            component="img"
            src="/images/bias.png"
            alt="scroll"
            ref={(el) => addToRefs(el, 6)}
            onMouseEnter={() => handleMouseEnter(6)}
            onMouseLeave={() => handleMouseLeave(6)}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            }}
          />
        </Box>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'start', 
          color: '#000000', 
          textAlign: 'start',
          mt: { xs: '20px', md: '15px' } // Aumenté la separación
        }}>
          <Typography variant="p" fontSize={{ xs: '14px', md: '18px' }} fontFamily={'Poppins'} fontWeight={500} sx={{ mb: '4px' }}>MOMMY MAKEOVER</Typography>
          <Typography variant="p" fontSize={{ xs: '14px', md: '16px' }} fontFamily={'Poppins'} color="text.secondary" fontWeight={500}>Bodytite, Morpheus8</Typography>
        </Box>
      </Box>

      {/* Octavo elemento */}
      <Box
        sx={{
          marginTop: { xs: '35px', md: '71px' },
          width: { xs: '100%', md: 'auto' },
          gridColumn: { xs: 'auto', md: '5 / 9'},
          gridRow: { xs: 'auto', md: '3 / 4'},
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'start',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: {
              xs: '280px',
              sm: '320px',
              md: '50%',
            },
            borderRadius: '6px',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          <Box
            component="img"
            src="/images/bias.png"
            alt="scroll"
            ref={(el) => addToRefs(el, 7)}
            onMouseEnter={() => handleMouseEnter(7)}
            onMouseLeave={() => handleMouseLeave(7)}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            }}
          />
        </Box>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'start', 
          color: '#000000', 
          textAlign: 'start',
          mt: { xs: '20px', md: '15px' } // Aumenté la separación
        }}>
          <Typography variant="p" fontSize={{ xs: '14px', md: '18px' }} fontFamily={'Poppins'} fontWeight={500} sx={{ mb: '4px' }}>CIRUGIA MAMARIA</Typography>
          <Typography variant="p" fontSize={{ xs: '14px', md: '16px' }} fontFamily={'Poppins'} color="text.secondary" fontWeight={500}>Bodytite, Morpheus8</Typography>
        </Box>
      </Box>

      {/* Noveno elemento */}
      <Box
        sx={{
          marginTop: { xs: '35px', md: '71px' },
          width: { xs: '100%', md: 'auto' },
          gridColumn: { xs: 'auto', md: '9 / 13'},
          gridRow: { xs: 'auto', md: '3 / 4'},
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'start',
          mb: { xs: '40px', md: '0px' }
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: {
              xs: '300px',
              sm: '340px',
              md: '90%',
            },
            borderRadius: '6px',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          <Box
            component="img"
            src="/images/bias.png"
            alt="scroll"
            ref={(el) => addToRefs(el, 8)}
            onMouseEnter={() => handleMouseEnter(8)}
            onMouseLeave={() => handleMouseLeave(8)}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            }}
          />
        </Box>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'start', 
          color: '#000000', 
          textAlign: 'start',
          mt: { xs: '20px', md: '15px' } // Aumenté la separación
        }}>
          <Typography variant="p" fontSize={{ xs: '14px', md: '18px' }} fontFamily={'Poppins'} fontWeight={500} sx={{ mb: '4px' }}>LIPOASPIRACION LÁSER</Typography>
          <Typography variant="p" fontSize={{ xs: '14px', md: '16px' }} fontFamily={'Poppins'} color="text.secondary" fontWeight={500}>Bodytite, Morpheus8</Typography>
        </Box>
      </Box>
    </Box>
  );
}