import type React from "react"
import styled, { keyframes } from "styled-components"

const infiniteScroll = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`

const SliderContainer = styled.div`
  width: 100%;
  overflow: hidden;
  background-color: #ffffffff;
  padding: 2rem 0;
  height: 20vh;
  display: flex;
  align-items: center;
  position: relative;
  
  /* Fade ultra suave y limpio con múltiples stops para transición perfecta */
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100px;
    z-index: 10;
    pointer-events: none;
  }
  
  &::before {
    left: 0;
    background: linear-gradient(to right, 
      #ffffffff 0%,
      rgba(255, 255, 255, 0.95) 20%,
      rgba(255, 255, 255, 0.8) 40%,
      rgba(255, 255, 255, 0.5) 60%,
      rgba(255, 255, 255, 0.2) 80%,
      transparent 100%
    );
  }
  
  &::after {
    right: 0;
    background: linear-gradient(to left, 
      #ffffffff 0%,
      rgba(255, 255, 255, 0.95) 20%,
      rgba(255, 255, 255, 0.8) 40%,
      rgba(255, 255, 255, 0.5) 60%,
      rgba(255, 255, 255, 0.2) 80%,
      transparent 100%
    );
  }
  
  @media (min-width: 768px) {
    &::before,
    &::after {
      width: 120px;
    }
  }
`

const SliderTrack = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

const AnimatedTrack = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: ${infiniteScroll} 20s linear infinite;
`

const LogoItem = styled.div`
  flex-shrink: 0;
  width: 120px;
  
  @media (min-width: 768px) {
    width: 180px;
  }
`

const LogoImageContainer = styled.div`
  position: relative;
  height: 28px;
  width: 28px;
  
  filter: grayscale(100%) contrast(0.9);
  background: transparent;
  border: none;
  outline: none;
  
  @media (min-width: 768px) {
    height: 5rem;
    width: 10rem;
  }
`

interface LogoSliderProps {
  logos: string[]
}

const LogoSlider: React.FC<LogoSliderProps> = ({ logos = [] }) => {
  const duplicatedLogos = [...logos, ...logos]

  return (
    <SliderContainer>
      <SliderTrack>
        <AnimatedTrack>
          {duplicatedLogos.map((logo, index) => (
            <LogoItem key={`logo-${index}`}>
              <LogoImageContainer>
                <img
                  width={"200%"}
                  height={"100%"}
                  src={logo || "/placeholder.svg"}
                  alt={`Partner Logo ${index + 1}`}
                  style={{
                    objectFit: "contain",
                    margin: "0 8px",
                    display: "block",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                  }}
                />
              </LogoImageContainer>
            </LogoItem>
          ))}
        </AnimatedTrack>
      </SliderTrack>
    </SliderContainer>
  )
}

export default LogoSlider
