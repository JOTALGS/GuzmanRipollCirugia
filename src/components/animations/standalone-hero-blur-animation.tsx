"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(SplitText)

interface HeroBlurAnimationProps {
  title: string
  subtitle?: string
  titleClassName?: string
  subtitleClassName?: string
  containerClassName?: string
  firstLineIndent?: boolean
}

/**
 * Standalone Hero Blur Animation Component
 *
 * A reusable component that animates text with a blur-to-clear effect from the side.
 * Text enters from the left with a blur effect that gradually clears.
 *
 * @example
 * <HeroBlurAnimation
 *   title="Your Amazing Headline"
 *   subtitle="Your supporting text here"
 * />
 */
export default function HeroBlurAnimation({
  title,
  subtitle,
  titleClassName = "text-4xl md:text-6xl lg:text-7xl font-normal leading-tight",
  subtitleClassName = "text-lg md:text-xl text-gray-600 leading-relaxed",
  containerClassName = "max-w-4xl",
  firstLineIndent = false,
}: HeroBlurAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!containerRef.current || !titleRef.current) return

    const ctx = gsap.context(() => {
      // Split title into words for smooth animation
      const titleSplit = new SplitText(titleRef.current, { type: "words" })

      // Set initial state: invisible and blurred
      gsap.set(titleSplit.words, {
        opacity: 0,
        filter: "blur(8px)",
      })

      // Animate title words: fade in and clear blur
      gsap.to(titleSplit.words, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        stagger: 0.02,
        ease: "power2.out",
      })

      // Animate subtitle if it exists
      if (subtitleRef.current && subtitle) {
        const subtitleSplit = new SplitText(subtitleRef.current, { type: "words" })

        gsap.set(subtitleSplit.words, {
          opacity: 0,
          filter: "blur(8px)",
        })

        gsap.to(subtitleSplit.words, {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.03,
          delay: 0.3,
          ease: "power2.out",
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [title, subtitle])

  const baseStyles = {
    fontSize: 'clamp(18px, 5vw, 75px)',
    lineHeight: '1.15',
    letterSpacing: '-0.2px',
    color: '#000',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '100',
    textAlign: 'left' as const,
    width: '100%',
  }

  const indentStyles = firstLineIndent ? {
    textIndent: 'clamp(8ch, 25%, 25ch)',
  } : {}

  return (
    <div ref={containerRef} className={containerClassName}>
      <h1
        ref={titleRef}
        className={titleClassName}
        style={{...baseStyles, ...indentStyles}}
      >
        {title}
      </h1>

      {subtitle && (
        <p ref={subtitleRef} className={`${subtitleClassName} mt-6`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
