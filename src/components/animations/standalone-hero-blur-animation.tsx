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
}: HeroBlurAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!containerRef.current || !titleRef.current) return

    const ctx = gsap.context(() => {
      // Split title into characters for smooth animation
      const titleSplit = new SplitText(titleRef.current, { type: "words,chars" })

      // Set initial state: invisible, shifted left, and blurred
      gsap.set(titleSplit.chars, {
        opacity: 0,
        x: -50,
        filter: "blur(10px)",
      })

      // Animate title characters: fade in, move to position, and clear blur
      gsap.to(titleSplit.chars, {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 0.7,
        stagger: 0.01, // Slight delay between each character
        ease: "power3.out",
      })

      // Animate subtitle if it exists
      if (subtitleRef.current && subtitle) {
        const subtitleSplit = new SplitText(subtitleRef.current, { type: "words" })

        gsap.set(subtitleSplit.words, {
          opacity: 0,
          x: -30,
          filter: "blur(8px)",
        })

        gsap.to(subtitleSplit.words, {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.6,
          stagger: 0.03,
          delay: 0.3, // Start after title begins
          ease: "power3.out",
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [title, subtitle])

  return (
    <div ref={containerRef} className={containerClassName}>
      <h1 ref={titleRef} className={titleClassName}>
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
