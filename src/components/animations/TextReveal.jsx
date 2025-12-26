"use client"

import { useEffect, useRef, useState, useMemo, useCallback } from "react"

/**
 * TextReveal - Ultra Smooth Word-by-Word Text Animation
 * Integra con Lenis para smooth scroll perfecto
 * Cada palabra se enciende individualmente basada en su posición exacta
 *
 * Uso:
 * <TextReveal>Tu párrafo aquí...</TextReveal>
 */

// ============================================
// CONFIGURACIÓN
// ============================================
const CONFIG = {
  colors: {
    base: "#d4d4d4", // Gris claro (apagado)
    mid1: "#a3a3a3", // Gris medio-claro
    mid2: "#737373", // Gris medio
    mid3: "#525252", // Gris medio-oscuro
    final: "#171717", // Negro (encendido)
  },
}

// Easing function para transiciones ultra smooth
function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
}

function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export default function TextReveal({
  children,
  triggerPoint = 0.7, // Dónde en la pantalla empieza (0.7 = 70% desde arriba)
  spreadRange = 120, // Rango en px - más pequeño = más palabra por palabra
  stagger = 8, // Offset en px entre cada palabra para efecto cascada
  baseColor = CONFIG.colors.base,
  midColor1 = CONFIG.colors.mid1,
  midColor2 = CONFIG.colors.mid2,
  midColor3 = CONFIG.colors.mid3,
  finalColor = CONFIG.colors.final,
  transitionDuration = 0.35, // Duración de transición CSS en segundos
  className = "",
  as: Component = "div",
}) {
  const containerRef = useRef(null)
  const wordsRef = useRef([])
  const rafId = useRef(null)
  const lenisRef = useRef(null)
  const [wordColors, setWordColors] = useState([])

  // Extraer palabras del texto
  const words = useMemo(() => {
    const text = extractText(children)
    return text.split(/(\s+)/).filter(Boolean)
  }, [children])

  // Inicializar colores
  useEffect(() => {
    setWordColors(words.map(() => baseColor))
  }, [words.length, baseColor])

  // Interpolar color con 5 fases para transición ultra smooth
  const getColor = useCallback(
    (progress) => {
      // Aplicar easing para suavizar
      const easedProgress = easeInOutCubic(progress)

      if (easedProgress <= 0) return baseColor
      if (easedProgress >= 1) return finalColor

      // 5 fases de color para máxima suavidad
      if (easedProgress < 0.25) {
        return interpolateColor(baseColor, midColor1, easedProgress * 4)
      } else if (easedProgress < 0.5) {
        return interpolateColor(midColor1, midColor2, (easedProgress - 0.25) * 4)
      } else if (easedProgress < 0.75) {
        return interpolateColor(midColor2, midColor3, (easedProgress - 0.5) * 4)
      } else {
        return interpolateColor(midColor3, finalColor, (easedProgress - 0.75) * 4)
      }
    },
    [baseColor, midColor1, midColor2, midColor3, finalColor],
  )

  // Función principal de actualización
  const updateColors = useCallback(() => {
    const windowHeight = window.innerHeight
    const trigger = windowHeight * triggerPoint

    const newColors = wordsRef.current.map((wordEl, index) => {
      if (!wordEl) return baseColor
      if (/^\s+$/.test(words[index])) return "transparent"

      const rect = wordEl.getBoundingClientRect()
      // Usar el centro vertical de la palabra para más precisión
      const wordCenter = rect.top + rect.height / 2

      // Agregar stagger basado en el índice para efecto cascada (invertido para ir de izquierda a derecha)
      const staggerOffset = index * stagger

      // Calcular distancia desde el trigger point (invertir el stagger)
      const distanceFromTrigger = trigger - wordCenter - staggerOffset

      // Si la palabra está por debajo del trigger
      if (distanceFromTrigger < 0) {
        return baseColor
      }

      // Si la palabra ya pasó completamente el rango
      if (distanceFromTrigger > spreadRange) {
        return finalColor
      }

      // Calcular progreso normalizado (0-1)
      const progress = distanceFromTrigger / spreadRange

      return getColor(progress)
    })

    setWordColors(newColors)
  }, [words, triggerPoint, spreadRange, stagger, baseColor, finalColor, getColor])

  // Setup Lenis o fallback a scroll nativo
  useEffect(() => {
    let cleanup = () => {}

    // Intentar usar Lenis si está disponible globalmente
    if (typeof window !== "undefined" && window.lenis) {
      lenisRef.current = window.lenis

      const onLenisScroll = () => {
        updateColors()
      }

      window.lenis.on("scroll", onLenisScroll)
      cleanup = () => window.lenis.off("scroll", onLenisScroll)
    } else {
      // Fallback: usar requestAnimationFrame para smooth updates
      let lastScrollY = window.scrollY
      let ticking = false

      const smoothUpdate = () => {
        updateColors()
        ticking = false
      }

      const onScroll = () => {
        lastScrollY = window.scrollY
        if (!ticking) {
          rafId.current = requestAnimationFrame(smoothUpdate)
          ticking = true
        }
      }

      // También actualizar en cada frame para máxima suavidad
      const frameLoop = () => {
        updateColors()
        rafId.current = requestAnimationFrame(frameLoop)
      }

      // Usar IntersectionObserver para activar/desactivar el loop
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              frameLoop()
            } else {
              if (rafId.current) {
                cancelAnimationFrame(rafId.current)
              }
            }
          })
        },
        { threshold: 0, rootMargin: "100px" },
      )

      if (containerRef.current) {
        observer.observe(containerRef.current)
      }

      window.addEventListener("scroll", onScroll, { passive: true })

      cleanup = () => {
        window.removeEventListener("scroll", onScroll)
        observer.disconnect()
        if (rafId.current) {
          cancelAnimationFrame(rafId.current)
        }
      }
    }

    // Ejecutar una vez al montar
    updateColors()

    return cleanup
  }, [updateColors])

  return (
    <Component
      ref={containerRef}
      className={className}
    >
      {words.map((word, index) => {
        // Preservar espacios
        if (/^\s+$/.test(word)) {
          return <span key={index}>{word}</span>
        }

        return (
          <span
            key={index}
            ref={(el) => (wordsRef.current[index] = el)}
            style={{
              color: wordColors[index] || baseColor,
              transition: `color ${transitionDuration}s cubic-bezier(0.16, 1, 0.3, 1)`,
              display: "inline",
              willChange: "color",
            }}
          >
            {word}
          </span>
        )
      })}
    </Component>
  )
}

// ============================================
// UTILIDADES
// ============================================
function interpolateColor(color1, color2, factor) {
  const c1 = hexToRgb(color1)
  const c2 = hexToRgb(color2)

  if (!c1 || !c2) return color1

  const r = Math.round(c1.r + (c2.r - c1.r) * factor)
  const g = Math.round(c1.g + (c2.g - c1.g) * factor)
  const b = Math.round(c1.b + (c2.b - c1.b) * factor)

  return `rgb(${r}, ${g}, ${b})`
}

function hexToRgb(hex) {
  if (!hex || typeof hex !== "string") return null
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : null
}

function extractText(children) {
  if (typeof children === "string") return children
  if (typeof children === "number") return String(children)
  if (Array.isArray(children)) {
    return children.map(extractText).join(" ")
  }
  if (children?.props?.children) {
    return extractText(children.props.children)
  }
  return ""
}

// ============================================
// VARIANTES PRE-CONFIGURADAS
// ============================================

// Ultra smooth para párrafos largos - palabra por palabra muy gradual
export function ParagraphReveal({ children, className, ...props }) {
  return (
    <TextReveal
      triggerPoint={0.75}
      spreadRange={100}
      stagger={6}
      transitionDuration={0.4}
      className={className}
      {...props}
    >
      {children}
    </TextReveal>
  )
}

// Reveal suave con más dispersión
export function SmoothReveal({ children, className, ...props }) {
  return (
    <TextReveal
      triggerPoint={0.7}
      spreadRange={150}
      stagger={10}
      transitionDuration={0.5}
      className={className}
      {...props}
    >
      {children}
    </TextReveal>
  )
}

// Reveal dramático más lento
export function DramaticReveal({ children, className, ...props }) {
  return (
    <TextReveal
      triggerPoint={0.65}
      spreadRange={200}
      stagger={12}
      transitionDuration={0.6}
      className={className}
      {...props}
    >
      {children}
    </TextReveal>
  )
}

// Reveal rápido para títulos
export function HeadlineReveal({ children, className, ...props }) {
  return (
    <TextReveal
      triggerPoint={0.8}
      spreadRange={80}
      stagger={4}
      transitionDuration={0.3}
      className={className}
      {...props}
    >
      {children}
    </TextReveal>
  )
}

// Reveal cascada - cada palabra con más delay
export function CascadeReveal({ children, className, ...props }) {
  return (
    <TextReveal
      triggerPoint={0.7}
      spreadRange={60}
      stagger={15}
      transitionDuration={0.45}
      className={className}
      {...props}
    >
      {children}
    </TextReveal>
  )
}
