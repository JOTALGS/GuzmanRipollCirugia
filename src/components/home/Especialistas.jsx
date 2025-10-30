import React from 'react';
import { Box, Grid, Typography, Container } from '@mui/material';
import { RotateCcw, Network, Globe } from 'lucide-react';

export default function Especialistas() {
  return (
    <Box sx={{ 
      minHeight: '80vh', 
      bgcolor: 'grey.100',
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' } // Responsive layout
    }}>
      {/* Left side - Image gallery grid */}
      <Box sx={{ 
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        
        <img src={"/images/image.png"} alt="scroll" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Box>

      {/* Right side - Content */}
      <Box sx={{ 
        flex: 0.6, 
        bgcolor: 'grey.900', 
        color: 'white', 
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        {/* Header text */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="overline" 
            sx={{ 
              color: 'primary.light', 
              letterSpacing: '0.1em',
              fontSize: '0.75rem',
            }}
          >
            HISTORIA CLÍNICA, SIMULACIONES 3D Y TÉCNICAS DE VANGUARDIA PARA ACOMPAÑARTE EN CADA PASO.
          </Typography>
        </Box>

      <Box>{/* Main heading */}
        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 300, 
              lineHeight: 1.2,
              textAlign: 'start',
              fontSize: { xs: '2.5rem', md: '3rem' }
            }}
          >
            Especialistas en
          </Typography>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 300, 
              lineHeight: 1.2,
              color: 'primary.light',
              textAlign: 'start',
              fontSize: { xs: '2.5rem', md: '3rem' }
            }}
          >
            Cirugía Mamaria
          </Typography>
        </Box>

        {/* Features section */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 0,
          
        }}>
          {/* Procedimientos personalizados */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 3,
              p: 2,
              borderTop: '1px solid',
              borderColor: 'grey.700',
              // Add this to create vertical separators
              '& > *:not(:last-child)': {
                borderRight: '1px solid',
                borderColor: 'grey.700',
                paddingRight: 3,
              }
            }}>
            <Box sx={{ width: "70%", textAlign: 'start' }}>
              <Typography variant="h6" sx={{ fontWeight: 500, mb: 0.5 }}>
                Procedimientos personalizados
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                Cada plan es único, como vos
              </Typography>
            </Box>
            <Box sx={{ width: "30%", display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ 
                flexShrink: 0,
                width: 48,
                height: 48,
                border: '1px solid',
                borderColor: 'grey.600',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <RotateCcw size={20} color="#9CA3AF" />
              </Box>
            </Box>
          </Box>

          {/* Cirugía inteligente */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 3,
              p: 2,
              borderTop: '1px solid',
              borderColor: 'grey.700',
              // Add this to create vertical separators
              '& > *:not(:last-child)': {
                borderRight: '1px solid',
                borderColor: 'grey.700',
                paddingRight: 3,
              }
            }}>
            <Box sx={{ width: "70%", textAlign: 'start' }}>
              <Typography variant="h6" sx={{ fontWeight: 500, mb: 0.5 }}>
                Cirugía inteligente
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                Integramos inteligencia artificial y tecnología 3D.
              </Typography>
            </Box>
            <Box sx={{ width: "30%", display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ 
                flexShrink: 0,
                width: 48,
                height: 48,
                border: '1px solid',
                borderColor: 'grey.600',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Network size={20} color="#9CA3AF" />
              </Box>
            </Box>
          </Box>

          {/* Técnicas de vanguardia */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 3,
              p: 2,
              borderTop: '1px solid',
              borderColor: 'grey.700',
              // Add this to create vertical separators
              '& > *:not(:last-child)': {
                borderRight: '1px solid',
                borderColor: 'grey.700',
                paddingRight: 3,
              }
            }}>
            <Box sx={{ width: "70%", textAlign: 'start' }}>
              <Typography variant="h6" sx={{ fontWeight: 500, mb: 0.5 }}>
                Técnicas de vanguardia
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.400' }}>
                Métodos innovadores para optimizar tu recuperación.
              </Typography>
            </Box>
            <Box sx={{ width: "30%", display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ 
                flexShrink: 0,
                width: 48,
                height: 48,
                border: '1px solid',
                borderColor: 'grey.600',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Globe size={20} color="#9CA3AF" />
              </Box>
            </Box>
          </Box>
        </Box>
        
        </Box>
      </Box>
    </Box>
  );
}