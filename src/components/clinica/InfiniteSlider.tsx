import React from 'react';
import styled, { keyframes } from 'styled-components';

const infiniteScroll = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`;

const SliderContainer = styled.div`
  width: 100%;
  overflow: hidden;
  background-color: #ffffffff;
  padding: 2rem 0;
  height: 20vh;
  display: flex;
  align-items: center;
  position: relative;
  
  /* Add stronger fade masks on left and right edges */
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 200px; /* Much wider fade area */
    z-index: 10;
    pointer-events: none;
  }
  
  /* Left fade mask with stronger gradient */
  &::before {
    left: 0;
    background: linear-gradient(to right, 
      #ffffffff 0%, 
      #ffffffff 20%, 
      rgba(255, 255, 255, 0.8) 40%,
      rgba(255, 255, 255, 0.4) 70%,
      transparent 100%
    );
  }
  
  /* Right fade mask with stronger gradient */
  &::after {
    right: 0;
    background: linear-gradient(to left, 
      #ffffffff 0%, 
      #ffffffff 20%, 
      rgba(255, 255, 255, 0.8) 40%,
      rgba(255, 255, 255, 0.4) 70%,
      transparent 100%
    );
  }
  
  @media (min-width: 768px) {
    &::before,
    &::after {
      width: 300px; /* Even wider fade on larger screens */
    }
  }
`;

const SliderTrack = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const AnimatedTrack = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: ${infiniteScroll} 20s linear infinite;
`;

const LogoItem = styled.div`
  flex-shrink: 0;
  width: 360px;
`;

const LogoImageContainer = styled.div`
  position: relative;
  height: 32px;
  width: 32px;
  transition: filter 0.3s ease;
  
  /* Black and white filter */
  filter: grayscale(100%) contrast(0.9);
  
  /* Smooth color transition on hover */
  &:hover {
    filter: grayscale(0) contrast(1);
  }

  @media (min-width: 768px) {
    height: 5rem;
    width: 10rem;
  }
`;

interface LogoSliderProps {
  logos: string[];
}

const LogoSlider: React.FC<LogoSliderProps> = ({ logos = [] }) => {
  const duplicatedLogos = [...logos, ...logos];

  return (
    <SliderContainer>
      <SliderTrack>
        <AnimatedTrack>
          {duplicatedLogos.map((logo, index) => (
            <LogoItem key={`logo-${index}`}>
              <LogoImageContainer>
                <img
                  width={'200%'}
                  height={'100%'}
                  src={logo}
                  alt={`Partner Logo ${index + 1}`}
                  style={{ objectFit: 'contain', margin: '0 30px', }}
                />
              </LogoImageContainer>
            </LogoItem>
          ))}
        </AnimatedTrack>
      </SliderTrack>
    </SliderContainer>
  );
};

export default LogoSlider;