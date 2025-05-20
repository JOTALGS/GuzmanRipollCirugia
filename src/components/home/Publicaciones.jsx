import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const items = [
  { publisher: 'MOJ Anatomy & Physiology; 2019,6 (6), 214-216.', title: 'Anatomical considerations of the thumb carpo- metacarpal joint ligaments, based on a case report of isolated joint dislocation.', authors: 'G Ripoll, D Glumcher, G Fossati' },
  { publisher: 'Open Acc Res Anatomy; 2018, 1 (5). OARA. 000525.2018.', title: 'Anatomical Variants of the Musculocutaneous Nerve-Report of two Cases.', authors: 'F Martinez, G Ripoll.'  },
  { publisher: 'Revista Argentina de Cirugía Plástica; 2017, 23 (2), 49-54.', title: 'Reconstrucción mamaria con colgajo perforante de arteria epigástrica inferior profunda.', authors: 'J Fossati, L Fraga, G Ripoll, D Wolff, G Fossati.'  },
  { publisher: 'Revista Argentina de Cirugía Plástica; 2017, 23 (2), 75-79.', title: 'Colgajo anterior de muslo en hemipelvectomía externa, reporte de caso.', authors: 'G Ripoll, JM Fossati, L Fraga, D Wolff, N Casales, C Silveri, G Fossati.'  },
  { publisher: 'Revista Argentina de Anatomía Online; 2016, 7(4),163-169.', title: 'Estudio anatómico: Vacaciones del sistema de poleas del pulgar, una nueva clasificación.', authors: 'G Ripoll, S Jaber, A Neirreter, F Corderi, D Glumcher, G Estapé.'  },
  { publisher: 'HAND 11;2016, (1 suppl), 83S-835.', title: 'Variations of the Pulley System of the Thumb An Anatomical Study. With Surgical Implications.', authors: 'G Ripoll, S Jaber, F Martinez, D Glumcher, F Corderi.'  },
];

export default function Publicaciones() {
  const [activeContent, setActiveContent] = useState([items[0].title, items[0].authors]);
  const rightRef = useRef(null);
  const leftRef = useRef(null);
  const rowsRef = useRef([]);

  useEffect(() => {
    const el = rightRef.current;
    const el2 = leftRef.current;

    gsap.fromTo(el,
      { y: 0 },
      {
        y: 350,
        borderLeft: "2px solid #D4BAA9",
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 12%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    rowsRef.current.forEach((row, index) => {
      gsap.fromTo(
        row,
        { y: 500, opacity: 0 },
        {
          y: 250,
          opacity: 1,
          ease: 'power3.out',
          duration: 1,
          scrollTrigger: {
            trigger: row,
            start: 'top bottom',
            end: 'top 90%',
            scrub: true,
          },
          delay: index * 0.2, // increasing delay
        }
      );
    });

  }, [])

  return (
    <Box display="flex" width="95vw" height="80vh" alignSelf={"center"} justifySelf={"center"} marginTop={"70px"}>

      {/* Left - Dynamic Content */}
      <Box ref={rightRef} width="35%" bgcolor="white">
        <Typography variant="h3" gutterBottom sx={{ fontFamily: 'Archivo Expanded', fontWeight: 700 }}>
          {activeContent[0]}
        </Typography>
        <Typography variant='h5' sx={{ fontFamily: 'Red Hat Display' }}>{activeContent[1]}</Typography>
      </Box>

      {/* Right - Rows */}
      <Box
        ref={leftRef}
        width="65%"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'end',
        }}
      >
        {items.map((item, index) => (
          <Box
            key={index}
            ref={(rowEl) => (rowsRef.current[index] = rowEl)}
            onMouseEnter={() => setActiveContent([item.title, item.authors])}
            sx={{
              cursor: 'pointer',
              color: activeContent[0] === item.title ? 'black' : '#e0e0e0',
              p: 1,
              transition: 'background 0.3s',
              gap: 0,
            }}
            height='100%'
          >
            <Typography variant="h5" fontWeight="bold" fontSize="32px" sx={{ fontFamily: 'Poppins' }}>
              {item.publisher}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
