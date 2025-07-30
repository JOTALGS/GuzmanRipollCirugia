"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, animate } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { CarouselItem } from "./carousel-item"

const originalItems = [
  { title: "LIPOASPIRACIÓN", subtitle: "(BodyTite, Morpheus8)" },
  { title: "MASTOPEXIA EN T", subtitle: "(Cirugía Mamaria)" },
  { title: "LIPOASPIRACIÓN", subtitle: "(BodyTite)" },
  { title: "LIPOASPIRACIÓN 2024", subtitle: "(BodyTite)" },
  { title: "LIPOESCULTURA", subtitle: "(BodyTite)" },
]

// Constantes (de Figma)
const ITEM_WIDTH = 430
const ITEM_HEIGHT = 525
const GUTTER = 20
const BUFFER = 3

export function ResultsCarousel() {
  const [items, setItems] = useState<typeof originalItems>([])
  const viewportRef = useRef<HTMLDivElement>(null)
  const [viewportWidth, setViewportWidth] = useState(0)
  const x = useMotionValue(0)
  const [isDragging, setIsDragging] = useState(false)
  const [itemAbsoluteCenters, setItemAbsoluteCenters] = useState<number[]>([])

  // Calcula el x necesario para centrar el ítem dado
  const getCenteredX = (itemIndex: number) => {
    if (!viewportRef.current || viewportWidth === 0) return 0
    const itemOffset = 70 + itemIndex * (ITEM_WIDTH + GUTTER)
    const itemCenter = itemOffset + ITEM_WIDTH / 2
    const viewportCenter = viewportRef.current.offsetWidth / 2
    return viewportCenter - itemCenter
  }

  // Inicializo items con buffer para loop infinito
  useEffect(() => {
    const buffered = [
      ...originalItems.slice(-BUFFER),
      ...originalItems,
      ...originalItems.slice(0, BUFFER),
    ]
    setItems(buffered)

    const handleResize = () => {
      if (viewportRef.current) {
        const w = viewportRef.current.offsetWidth
        setViewportWidth(w)
        // centrar el primer ítem real
        x.set(getCenteredX(BUFFER))
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [x])

  // Calculo centers absolutos de cada ítem en el strip
  useEffect(() => {
    if (!viewportRef.current || viewportWidth === 0) return
    const centers = items.map((_, i) => {
      const offset = 70 + i * (ITEM_WIDTH + GUTTER)
      return offset + ITEM_WIDTH / 2
    })
    setItemAbsoluteCenters(centers)
  }, [items, viewportWidth])

  const handleDragStart = () => setIsDragging(true)

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { velocity: { x: number } }
  ) => {
    setIsDragging(false)
    const currentX = x.get()
    const projected = currentX + info.velocity.x * 0.2

    // buscamos el ítem más cercano a esa proyección
    let closest = 0
    let minDist = Infinity
    items.forEach((_, i) => {
      const tx = getCenteredX(i)
      const d = Math.abs(tx - projected)
      if (d < minDist) {
        minDist = d
        closest = i
      }
    })

    // animamos al ítem más cercano
    const targetX = getCenteredX(closest)
    animate(x, targetX, {
      type: "spring",
      stiffness: 400,
      damping: 60,
      onUpdate: latest => {
        // lógica de wrap infinito
        const realWidth = originalItems.length * (ITEM_WIDTH + GUTTER)
        const firstX = getCenteredX(BUFFER)
        const lastX = getCenteredX(BUFFER + originalItems.length - 1)
        const wrapTh = (ITEM_WIDTH + GUTTER) / 2

        if (latest > firstX + wrapTh) {
          x.set(latest - realWidth)
        } else if (latest < lastX - wrapTh) {
          x.set(latest + realWidth)
        }
      },
    })
  }

  // scroll vía flechas
  const scroll = (dir: "left" | "right") => {
    const currentX = x.get()
    // encontramos el ítem centrado ahora
    let curr = 0
    let minD = Infinity
    items.forEach((_, i) => {
      const absCenter = currentX + itemAbsoluteCenters[i]
      const d = Math.abs(absCenter - viewportWidth / 2)
      if (d < minD) {
        minD = d
        curr = i
      }
    })

    const next = dir === "left" ? Math.max(0, curr - 1) : Math.min(items.length - 1, curr + 1)
    const targetX = getCenteredX(next)
    animate(x, targetX, {
      type: "spring",
      stiffness: 400,
      damping: 60,
      onUpdate: latest => {
        // mismo wrap
        const realWidth = originalItems.length * (ITEM_WIDTH + GUTTER)
        const firstX = getCenteredX(BUFFER)
        const lastX = getCenteredX(BUFFER + originalItems.length - 1)
        const wrapTh = (ITEM_WIDTH + GUTTER) / 2

        if (latest > firstX + wrapTh) {
          x.set(latest - realWidth)
        } else if (latest < lastX - wrapTh) {
          x.set(latest + realWidth)
        }
      },
    })
  }

  return (
    <div style={{ width: "100%", backgroundColor: "white" }}>
      {/* Header con flechas */}
      <div
        style={{
          paddingLeft: "70px",
          paddingRight: "70px",
          maxWidth: "1920px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingTop: "48px",
            paddingBottom: "48px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              onClick={() => scroll("left")}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "transparent",
                border: "1px solid #e5e5e5",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = "#f3f4f6"
                e.currentTarget.style.borderColor = "#d1d5db"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = "transparent"
                e.currentTarget.style.borderColor = "#e5e5e5"
              }}
              aria-label="Anterior"
            >
              <ArrowLeft color="black" size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "transparent",
                border: "1px solid #e5e5e5",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = "#f3f4f6"
                e.currentTarget.style.borderColor = "#d1d5db"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = "transparent"
                e.currentTarget.style.borderColor = "#e5e5e5"
              }}
              aria-label="Siguiente"
            >
              <ArrowRight color="black" size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div
        style={{
          position: "relative",
          overflowX: "hidden",   // sólo ocultamos horizontalmente
          overflowY: "visible",  // permitimos que el texto bajo la card se vea
        }}
        ref={viewportRef}
      >
        <motion.div
          style={{
            display: "flex",
            userSelect: "none",
            cursor: isDragging ? "grabbing" : "grab",
            x,
          }}
          drag="x"
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          dragElastic={0.1}
        >
          <div style={{ display: "flex", paddingLeft: "70px", alignItems: "flex-start" }}>
            {items.map((item, index) => (
              <CarouselItem
                key={index}
                item={item}
                index={index}
                x={x}
                viewportWidth={viewportWidth}
                itemAbsoluteCenter={itemAbsoluteCenters[index]}
                ITEM_WIDTH={ITEM_WIDTH}
                ITEM_HEIGHT={ITEM_HEIGHT}
                GUTTER={GUTTER}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div
        style={{
          paddingLeft: "70px",
          paddingRight: "70px",
          maxWidth: "1920px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "48px",
          paddingBottom: "80px",
        }}
      >
        <span
          style={{
            color: "black",
            fontSize: "20px",
            letterSpacing: "-1px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
          }}
        >
          Pacientes - 2018/2025
        </span>
        <span
          style={{
            color: "black",
            fontSize: "20px",
            letterSpacing: "-1px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
          }}
        >
          (Scroll)
        </span>
      </div>
    </div>
  )
}
