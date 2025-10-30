"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface MobileFooterProps {
  studioName?: string
  email?: string
  location?: string
  year?: number
  marqueeText?: string
  marqueeSymbol?: string
}

/**
 * Standalone Mobile Footer Component
 *
 * A complete mobile-optimized footer with marquee animation, contact info,
 * and smooth scroll animations. Designed specifically for mobile viewports.
 *
 * @example
 * ```tsx
 * <MobileFooter
 *   studioName="blank:studio"
 *   email="hello@blankstudio.uy"
 *   location="Montevideo, Uruguay"
 *   marqueeText="Let's work together"
 * />
 * ```
 */
export default function MobileFooter({
  studioName = "blank:studio",
  email = "hello@blankstudio.uy",
  year = new Date().getFullYear(),
  marqueeText = "Let's work together",
  marqueeSymbol = "✱",
}: MobileFooterProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (marqueeRef.current) {
        const marqueeContent = marqueeRef.current.querySelector(".marquee-content") as HTMLElement
        if (marqueeContent) {
          const marqueeWidth = marqueeContent.offsetWidth / 2

          gsap.to(marqueeContent, {
            x: -marqueeWidth,
            duration: 30,
            ease: "none",
            repeat: -1,
          })
        }
      }

      gsap.from(".footer-content", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={sectionRef}
      className="bg-[#000000] py-12 mt-12 text-white md:hidden"
      style={{
      }}
    >
      {/* Studio Name */}
      <div className="px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <div className="text-xl font-medium">{studioName}</div>
          </div>
        </div>
      </div>

      {/* Marquee Animation */}
      <div ref={marqueeRef} className="overflow-hidden mb-12">
        <div className="marquee-content flex whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[3rem] font-normal">{marqueeText}</span>
              <span className="text-[3rem] font-normal">{marqueeSymbol}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact & Copyright */}
      <div className="px-4">
        <div className="max-w-7xl mx-auto">
          <div className="footer-content text-center">
            <a
              href={`mailto:${email}`}
              className="text-[1.5rem] font-medium underline hover:no-underline transition-all inline-block mb-8"
            >
              {email}
            </a>

            <div className="text-xs">
              <p className="mb-2">
                © {year} {studioName}. All rights reserved
              </p>
              <p className="text-black/60">
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
