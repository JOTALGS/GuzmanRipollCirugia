import React, { useState } from 'react';
import { Box } from '@mui/material';

/**
 * OptimizedImage - Componente para cargar imágenes de forma optimizada
 * Incluye lazy loading, blur placeholder y animación de carga
 */
const OptimizedImage = ({
  src,
  alt,
  width = "100%",
  height = "auto",
  objectFit = "cover",
  borderRadius = 0,
  priority = false,
  sx = {},
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width,
        height,
        overflow: 'hidden',
        borderRadius,
        backgroundColor: '#f0f0f0',
        ...sx
      }}
      {...props}
    >
      {/* Placeholder blur mientras carga */}
      {!isLoaded && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s linear infinite',
            '@keyframes shimmer': {
              '0%': { backgroundPosition: '-200% 0' },
              '100%': { backgroundPosition: '200% 0' }
            }
          }}
        />
      )}

      {/* Imagen */}
      <Box
        component="img"
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        onLoad={handleLoad}
        onError={handleError}
        sx={{
          width: '100%',
          height: '100%',
          objectFit,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
          display: hasError ? 'none' : 'block'
        }}
      />

      {/* Fallback si hay error */}
      {hasError && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            color: '#999',
            fontSize: '14px'
          }}
        >
          Error al cargar imagen
        </Box>
      )}
    </Box>
  );
};

export default OptimizedImage;
