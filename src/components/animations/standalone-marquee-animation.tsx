// MarqueeAnimation.tsx
"use client"

import { useEffect, useMemo, useRef } from "react"
import { gsap } from "gsap"

type Dir = "left" | "right"

interface MarqueeAnimationProps {
  text?: string
  symbol?: string | "custom"
  fontSize?: { mobile: string; desktop: string }
  symbolFontSize?: { mobile: string; desktop: string }
  /** Velocidad en píxeles por segundo (20–60 suele verse bien) */
  velocity?: number
  repetitions?: number
  gap?: { mobile: string; desktop: string }
  letterSpacing?: string
  symbolLetterSpacing?: string
  symbolWeight?: number
  symbolOpacity?: number
  asteriskStroke?: number
  color?: string
  className?: string
  /** Dirección del scroll */
  direction?: Dir
}

const CustomAsterisk = ({
  size = "0.9em",
  strokeWidth = 6,
}: { size?: string; strokeWidth?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    aria-hidden="true"
    style={{ display: "inline-block", verticalAlign: "middle" }}
  >
    <line x1="12" y1="50" x2="88" y2="50" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <line x1="23" y1="23" x2="77" y2="77" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    <line x1="77" y1="23" x2="23" y2="77" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>
)

export default function MarqueeAnimation({
  text = "Agenda tu consulta",
  symbol = "custom",
  fontSize = { mobile: "2.5rem", desktop: "7rem" },
  symbolFontSize = { mobile: "2.8rem", desktop: "6rem" },
  velocity = 35, // px/seg
  repetitions = 10,
  gap = { mobile: "2rem", desktop: "1.8rem" },
  letterSpacing = "0.02em",
  symbolLetterSpacing = "0",
  symbolWeight = 100,
  symbolOpacity = 0.9,
  asteriskStroke = 6,
  color = "currentColor",
  className = "",
  direction = "left",
}: MarqueeAnimationProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  const Track = useMemo(
    () => (
      <div
        className="flex items-center whitespace-nowrap min-w-max"
        style={{ gap: `clamp(${gap.mobile}, 2vw, ${gap.desktop})`, flex: "0 0 auto" }}
      >
        {Array.from({ length: repetitions }).map((_, i) => (
          <div key={i} className="flex items-center flex-none">
            <span
              className="font-normal"
              style={{
                color,
                letterSpacing,
                fontSize: `clamp(${fontSize.mobile}, 5vw, ${fontSize.desktop})`,
                lineHeight: 1.2,
              }}
            >
              {text}
            </span>
            {symbol === "custom" ? (
              <span
                aria-hidden
                className="inline-flex items-center"
                style={{
                  opacity: symbolOpacity,
                  lineHeight: 1,
                  marginLeft: `clamp(${gap.mobile}, 2vw, ${gap.desktop})`,
                  color,
                  fontSize: `clamp(${symbolFontSize.mobile}, 4vw, ${symbolFontSize.desktop})`,
                }}
              >
                <CustomAsterisk strokeWidth={asteriskStroke} />
              </span>
            ) : (
              <span
                aria-hidden
                style={{
                  color,
                  letterSpacing: symbolLetterSpacing,
                  fontWeight: symbolWeight,
                  opacity: symbolOpacity,
                  lineHeight: 1,
                  marginLeft: `clamp(${gap.mobile}, 2vw, ${gap.desktop})`,
                  fontSize: `clamp(${symbolFontSize.mobile}, 4vw, ${symbolFontSize.desktop})`,
                }}
              >
                {symbol}
              </span>
            )}
          </div>
        ))}
      </div>
    ),
    [
      repetitions,
      text,
      symbol,
      fontSize.mobile,
      fontSize.desktop,
      symbolFontSize.mobile,
      symbolFontSize.desktop,
      gap.mobile,
      gap.desktop,
      letterSpacing,
      symbolLetterSpacing,
      symbolWeight,
      symbolOpacity,
      asteriskStroke,
      color,
    ]
  )

  useEffect(() => {
    const root = rootRef.current
    const track = trackRef.current
    if (!root || !track) return

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches

    const start = () => {
      tweenRef.current?.kill()
      tweenRef.current = null

      // medir después de layout+fonts
      const measure = () => {
        const half = track.scrollWidth / 2 // tenemos 2 pistas contiguas
        if (!half || reduce || velocity <= 0) return

        const distance = half // desplazamos media pista
        const duration = distance / velocity // s = d / v

        // izquierda = x negativa, derecha = positiva
        const dir = direction === "left" ? -1 : 1

        tweenRef.current = gsap.fromTo(
          track,
          { x: 0 },
          {
            x: dir * -distance, // si dir=1 y queremos ir a la derecha, animamos hacia +? no: usamos wrap (abajo) para sentido
            duration,
            ease: "none",
            repeat: -1,
            modifiers: {
              x: gsap.utils.unitize((x) => {
                const v = parseFloat(x)
                // wrap continuo según la dirección
                const mod = ((v % distance) + distance) % distance
                return (direction === "left" ? -mod : mod)
              }),
            },
          }
        )
      }

      // asegurar layout listo
      requestAnimationFrame(() => {
        measure()
        // pequeño retry por si las fuentes ajustan ancho luego
        setTimeout(measure, 120)
      })
    }

    // Observadores
    const ro = new ResizeObserver(() => start())
    ro.observe(track)
    ro.observe(root)

    if ((document as any).fonts?.ready) {
      ;(document as any).fonts.ready.then(start)
    } else {
      start()
    }

    return () => {
      ro.disconnect()
      tweenRef.current?.kill()
      tweenRef.current = null
    }
  }, [velocity, direction])

  return (
    <div ref={rootRef} className={`relative overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex will-change-transform select-none">
        {Track}
        {Track}
      </div>
    </div>
  )
}
