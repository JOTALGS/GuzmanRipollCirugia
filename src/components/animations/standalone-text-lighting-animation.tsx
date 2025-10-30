"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface TextLightingAnimationProps {
  text: string
  className?: string
  containerClassName?: string
  startColor?: string
  endColor?: string
}

/**
 * Standalone Text Lighting Animation Component
 *
 * A reusable component that animates text with a smooth gradient "lighting up" effect on scroll.
 * Words progressively transition from light gray to black with a smooth 3-level fade.
 *
 * @example
 * <TextLightingAnimation
 *   text="BUILDING WEBSITES THAT NOT ONLY LOOK GREAT BUT ALSO DELIVER MEASURABLE RESULTS."
 *   className="text-3xl md:text-5xl"
 * />
 */
export default function TextLightingAnimation({
  text,
  className = "text-2xl md:text-4xl lg:text-5xl font-normal leading-relaxed",
  containerClassName = "max-w-6xl mx-auto py-16 px-4",
  startColor = "#e5e5e5",
  endColor = "#000000",
}: TextLightingAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!textRef.current) return

      const words = textRef.current.querySelectorAll(".word")

      words.forEach((word, index) => {
        gsap.set(word, {
          color: startColor,
          opacity: 0.3,
        })

        gsap.to(word, {
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 75%",
            end: "bottom 25%",
            scrub: 1.5,
            onUpdate: (self) => {
              const totalWords = words.length
              // Calculate progress for this specific word with overlap
              const wordProgress = Math.max(0, Math.min(1, self.progress * totalWords * 1.3 - index * 1.1))

              // Smooth 3-level gradient with more fade dynamism
              let color, opacity
              if (wordProgress < 0.3) {
                // Level 1: Very light gray, low opacity
                const t = wordProgress / 0.3
                const gray = Math.round(229 - (229 - 200) * t)
                color = `rgb(${gray}, ${gray}, ${gray})`
                opacity = 0.3 + t * 0.3 // 0.3 to 0.6
              } else if (wordProgress < 0.65) {
                // Level 2: Medium gray, increasing opacity
                const t = (wordProgress - 0.3) / 0.35
                const gray = Math.round(200 - (200 - 120) * t)
                color = `rgb(${gray}, ${gray}, ${gray})`
                opacity = 0.6 + t * 0.3 // 0.6 to 0.9
              } else {
                // Level 3: Dark to pure black, full opacity
                const t = (wordProgress - 0.65) / 0.35
                const gray = Math.round(120 * (1 - t))
                color = `rgb(${gray}, ${gray}, ${gray})`
                opacity = 0.9 + t * 0.1 // 0.9 to 1.0
              }

              gsap.set(word, { color, opacity })
            },
          },
        })
      })
      // </CHANGE>
    }, containerRef)

    return () => ctx.revert()
  }, [text, startColor, endColor])

  const words = text.split(" ")

  return (
    <div ref={containerRef} className={containerClassName}>
      <h2 ref={textRef} className={className}>
        {words.map((word, index) => (
          <span key={index} className="word inline-block mr-[0.35em]">
            {word}
          </span>
        ))}
      </h2>
    </div>
  )
}
