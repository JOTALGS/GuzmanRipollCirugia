import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const LayeredZoomScroll = () => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const sectionRef = useRef(null);
  const smallImagesRef = useRef([]);
  const frontImagesRef = useRef([]);
  const timelineRef = useRef(null);

  useEffect(() => {
    // Initialize ScrollSmoother
    const scroller = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1.5,
      effects: true,
      normalizeScroll: true
    });

    // Create main timeline
    timelineRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true
      },
      onUpdate: (self) => {
        const easedProgress = gsap.parseEase("power1.inOut")(self.progress);
        sectionRef.current.style.setProperty("--progress", easedProgress);
      }
    });

    // Animate small floating images along Z-axis
    timelineRef.current.to(smallImagesRef.current, {
      z: "100vh",
      duration: 1,
      ease: "power1.inOut",
      stagger: {
        amount: 0.2,
        from: "center"
      }
    });

    // Animate front images - scale to 1
    timelineRef.current.to(frontImagesRef.current, {
      scale: 1,
      duration: 1,
      ease: "power1.inOut",
      delay: 0.1,
    }, 0.4);

    // Animate front images - remove blur
    timelineRef.current.to(frontImagesRef.current, {
      duration: 1,
      filter: "blur(0px)",
      ease: "power1.inOut",
      delay: 0.4,
      stagger: {
        amount: 0.2,
        from: "end"
      }
    }, 0.6);

    return () => {
      scroller.kill();
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Sample image URLs - replace with your own
  const smallImages = [
    'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
    'https://images.unsplash.com/photo-1682687221038-404cb8830901',
    'https://images.unsplash.com/photo-1682687220063-4742bd7fd538',
    'https://images.unsplash.com/photo-1682687220566-5599dbbebf11',
    'https://images.unsplash.com/photo-1682687220975-7b2df674d43f',
    'https://images.unsplash.com/photo-1682687221080-5cb261c645cb',
    'https://images.unsplash.com/photo-1682687218608-5e2522b04673',
    'https://images.unsplash.com/photo-1682687220199-d0124f48f95b',
    'https://images.unsplash.com/photo-1682687221281-46e2ce5e9547',
    'https://images.unsplash.com/photo-1682687220923-c58b9a4592ae'
  ];

  const mainImage = 'https://images.unsplash.com/photo-1559827260-dc66d52bef19';

  return (
    <div ref={wrapperRef} style={styles.wrapper}>
      <div ref={contentRef} style={styles.content}>
        <div ref={sectionRef} style={styles.section}>
          {/* Floating Images Grid */}
          <div style={styles.sectionImages}>
            {smallImages.map((src, index) => (
              <img
                key={index}
                ref={el => smallImagesRef.current[index] = el}
                src={src}
                alt={`Image ${index + 1}`}
                style={{
                  ...styles.floatingImage,
                  ...styles[`floatingImage${index + 1}`]
                }}
              />
            ))}
          </div>

          {/* Main Media Section */}
          <div style={styles.sectionMedia}>
            {/* Background Image */}
            <div style={styles.sectionMediaBack}>
              <img src={mainImage} alt="Main Image" style={styles.mainImage} />
            </div>

            {/* Front Layered Images with Mask */}
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                ref={el => frontImagesRef.current[num - 1] = el}
                style={{
                  ...styles.sectionMediaFront,
                  ...styles[`front${num}`]
                }}
              >
                <img 
                  src={mainImage} 
                  alt="Layered Image" 
                  style={styles.maskedImage}
                />
              </div>
            ))}
          </div>

          {/* Split Text */}
          <h1 style={styles.heading}>
            <span style={styles.leftText}>for the</span>
            <span style={styles.rightText}>planet</span>
          </h1>
        </div>

        {/* Spacer for scroll */}
        <div style={styles.spacer}></div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  },
  content: {
    position: 'relative',
  },
  section: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#0a0a0a',
    '--progress': '0',
  },
  sectionImages: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    perspective: '100vh',
    pointerEvents: 'none',
  },
  floatingImage: {
    position: 'absolute',
    width: '10vw',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  floatingImage1: { top: '15vw', left: '-3vw' },
  floatingImage2: { top: '5vw', left: '20vw' },
  floatingImage3: { top: '25vw', left: '15vw' },
  floatingImage4: { top: '10vw', right: '10vw' },
  floatingImage5: { top: '30vw', right: '25vw' },
  floatingImage6: { bottom: '20vw', left: '10vw' },
  floatingImage7: { bottom: '15vw', left: '35vw' },
  floatingImage8: { bottom: '25vw', right: '15vw' },
  floatingImage9: { top: '40vw', left: '50vw' },
  floatingImage10: { bottom: '10vw', right: '5vw' },
  sectionMedia: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  sectionMediaBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transform: 'scale(var(--progress))',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  sectionMediaFront: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    filter: 'blur(2px)',
  },
  maskedImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    maskImage: 'radial-gradient(circle at center, black 30%, transparent 60%)',
    WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 60%)',
    maskPosition: '50% 50%',
    maskSize: 'cover',
  },
  front1: { transform: 'scale(1)' },
  front2: { transform: 'scale(0.85)' },
  front3: { transform: 'scale(0.6)' },
  front4: { transform: 'scale(0.45)' },
  front5: { transform: 'scale(0.3)' },
  front6: { transform: 'scale(0.15)' },
  heading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: 'clamp(3rem, 12vw, 10rem)',
    fontWeight: 900,
    color: '#ffffff',
    textTransform: 'uppercase',
    margin: 0,
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    gap: '2vw',
    fontFamily: 'Arial Black, sans-serif',
    letterSpacing: '-0.02em',
    lineHeight: 1,
    pointerEvents: 'none',
    zIndex: 10,
  },
  leftText: {
    transform: 'translate3d(calc(var(--progress) * (-66vw + 100%) - 0.5vw), 0, 0)',
  },
  rightText: {
    transform: 'translate3d(calc(var(--progress) * (66vw - 100%)), 0, 0)',
  },
  spacer: {
    height: '200vh',
  },
};

export default LayeredZoomScroll;
