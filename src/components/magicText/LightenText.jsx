import { useEffect, useRef, useState } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

const LightenText = ({ homeText, isFirstParagraph = true }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const splitText = (text, maxCharsPerLine, firstLineShorten = 15) => {
    if (!text || maxCharsPerLine <= 0) return [];

    // Si no es el primer párrafo, no acortar la primera línea
    const actualFirstLineShorten = isFirstParagraph ? firstLineShorten : 0;
    const firstLimit = Math.max(1, maxCharsPerLine - Math.max(0, actualFirstLineShorten));
    let currentLimit = firstLimit;

    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    const fits = (line, word, limit) =>
      (line.length ? line.length + 1 : 0) + word.length <= limit;

    for (const word of words) {
      if (fits(currentLine, word, currentLimit)) {
        currentLine += (currentLine ? ' ' : '') + word;
        continue;
      }

      if (word.length > currentLimit) {
        if (currentLine) {
          lines.push(currentLine);
          currentLine = '';
          currentLimit = maxCharsPerLine;
        }

        let remaining = word;
        while (remaining.length > 0) {
          const limit = lines.length === 0 ? firstLimit : maxCharsPerLine;
          lines.push(remaining.slice(0, limit));
          remaining = remaining.slice(limit);
        }
        currentLimit = maxCharsPerLine;
        continue;
      }

      if (currentLine) {
        lines.push(currentLine);
      }
      currentLine = word;
      if (lines.length >= 1) currentLimit = maxCharsPerLine;
    }

    if (currentLine) lines.push(currentLine);

    return lines;
  };

  const charsPerPart = isMobile ? 38 : isTablet ? 48 : isDesktop ? 58 : 62;
  const textParts = splitText(homeText, charsPerPart);

  return (
    <Box ref={containerRef} sx={{ width: '100%' }}>
      {textParts.map((part, index) => (
        <Box
          key={`line-${index}`}
          sx={{
            overflow: 'hidden',
            mb: 0.5,
          }}
        >
          <Typography
            variant="p"
            fontWeight={100}
            sx={{
              fontSize: {
                xs: 'clamp(18px, 5vw, 28px)',
                sm: 'clamp(24px, 4.5vw, 36px)',
                md: 'clamp(32px, 3.5vw, 48px)',
                lg: 'clamp(40px, 3.5vw, 56px)',
                xl: 'clamp(55px, 3.5vw, 75px)',
              },
              lineHeight: { xs: 1.25, sm: 1.2, md: 1.15, lg: 1.05 },
              letterSpacing: { xs: '-1px', md: '-0.2px' },
              whiteSpace: 'nowrap',
              textIndent: (index === 0 && isFirstParagraph) ? { xs: '2ch', md: '5.1ch' } : 0,
              ml: (index === 0 && isFirstParagraph) ? { xs: '4vw', md: '12vw' } : 0,
              fontFamily: "Poppins, sans-serif",
              color: "#01263a",
              display: "block",
              transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
              opacity: isVisible ? 1 : 0,
              transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out',
              transitionDelay: isVisible ? `${index * 0.1}s` : '0s'
            }}
          >
            {part}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default LightenText;
