"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, animate, type PanInfo } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { CarouselItem } from "./carousel-item"

const originalItems = [
  { title: "LIPOASPIRACIÓN", subtitle: "(BodyTite, Morpheus8)" },
  { title: "MASTOPEXIA EN T", subtitle: "(Cirugía Mamaria)" },
  { title: "LIPOASPIRACIÓN", subtitle: "(BodyTite)" },
  { title: "LIPOASPIRACIÓN 2024", subtitle: "(BodyTite)" },
  { title: "LIPOESCULTURA", subtitle: "(BodyTite)" },
  { title: "ABDOMINOPLASTIA", subtitle: "(Cirugía Abdominal)" },
  { title: "RINOPLASTIA", subtitle: "(Cirugía Nasal)" },
  { title: "BLEFAROPLASTIA", subtitle: "(Cirugía de Párpados)" },
  { title: "OTOPLASTIA", subtitle: "(Cirugía de Orejas)" },
  { title: "MENTOPLASTIA", subtitle: "(Cirugía de Mentón)" },
  { title: "GINECOMASTIA", subtitle: "(Reducción Mamaria)" },
  { title: "LIFTING FACIAL", subtitle: "(Rejuvenecimiento)" },
]

const GUTTER = 20

export function ResultsCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const [viewportWidth, setViewportWidth] = useState(0)
  const [itemWidth, setItemWidth] = useState(430)
  const x = useMotionValue(0)
  const [isDragging, setIsDragging] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const getPositionX = (index: number) => {
    const firstItemOffset = 70
    const totalOffset = firstItemOffset + index * (itemWidth + GUTTER)
    return -totalOffset
  }

  useEffect(() => {
    const handleResize = () => {
      if (viewportRef.current) {
        const w = viewportRef.current.offsetWidth
        setViewportWidth(w)

        const gridWidth = w - 140
        const calculatedWidth = Math.max(300, (gridWidth / 12) * 4)
        setItemWidth(calculatedWidth)

        const targetX = getPositionX(currentIndex)
        x.set(targetX)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [currentIndex, itemWidth])

  const handleDragStart = () => setIsDragging(true)

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false)
    const currentX = x.get()
    const velocity = info.velocity.x
    const offset = info.offset.x

    let newIndex = currentIndex

    if (Math.abs(offset) > 50 || Math.abs(velocity) > 500) {
      if (offset > 0 || velocity > 0) {
        newIndex = Math.max(0, currentIndex - 1)
      } else {
        newIndex = Math.min(originalItems.length - 1, currentIndex + 1)
      }
    }

    setCurrentIndex(newIndex)
    const targetX = getPositionX(newIndex)

    animate(x, targetX, {
      type: "spring",
      stiffness: 400,
      damping: 40,
      mass: 0.8,
    })
  }

  const scroll = (dir: "left" | "right") => {
    let newIndex
    if (dir === "left") {
      newIndex = Math.max(0, currentIndex - 1)
    } else {
      newIndex = Math.min(originalItems.length - 1, currentIndex + 1)
    }

    setCurrentIndex(newIndex)
    const targetX = getPositionX(newIndex)

    animate(x, targetX, {
      type: "spring",
      stiffness: 400,
      damping: 40,
      mass: 0.8,
    })
  }

  return (
    <div style={{ width: "100%", backgroundColor: "white", overflow: "hidden" }}>
      <div
        style={{
          paddingLeft: "70px",
          paddingRight: "70px",
          paddingTop: "40px",
          paddingBottom: "20px",
          maxWidth: "1920px",
          margin: "0 auto",
        }}
      >
        <p
          style={{
            color: "#000000",
            lineHeight: "1.7",
            fontWeight: "600",
            fontSize: "20px",
            fontFamily: "Poppins, sans-serif",
            margin: 0,
          }}
        >
          RESULTADOS
        </p>
      </div>

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
            paddingTop: "24px",
            paddingBottom: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <button
              onClick={() => scroll("left")}
              disabled={currentIndex === 0}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: currentIndex === 0 ? "not-allowed" : "pointer",
                opacity: currentIndex === 0 ? 0.3 : 1,
                transition: "opacity 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                if (currentIndex !== 0) {
                  e.currentTarget.style.opacity = "0.6"
                }
              }}
              onMouseLeave={(e) => {
                if (currentIndex !== 0) {
                  e.currentTarget.style.opacity = "1"
                }
              }}
              aria-label="Anterior"
            >
              <ArrowLeft color="black" size={24} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={currentIndex === originalItems.length - 1}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: currentIndex === originalItems.length - 1 ? "not-allowed" : "pointer",
                opacity: currentIndex === originalItems.length - 1 ? 0.3 : 1,
                transition: "opacity 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                if (currentIndex !== originalItems.length - 1) {
                  e.currentTarget.style.opacity = "0.6"
                }
              }}
              onMouseLeave={(e) => {
                if (currentIndex !== originalItems.length - 1) {
                  e.currentTarget.style.opacity = "1"
                }
              }}
              aria-label="Siguiente"
            >
              <ArrowRight color="black" size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "relative",
          overflowX: "hidden",
          overflowY: "visible",
          cursor: isDragging ? "grabbing" : "grab",
          touchAction: "pan-y",
        }}
        ref={viewportRef}
      >
        <motion.div
          style={{
            display: "flex",
            userSelect: "none",
            x,
            willChange: "transform",
          }}
          drag="x"
          dragConstraints={{
            left: -(originalItems.length - 1) * (itemWidth + GUTTER) - 70,
            right: 0,
          }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          dragElastic={0.05}
          dragTransition={{
            bounceStiffness: 600,
            bounceDamping: 40,
            power: 0.3,
            timeConstant: 200,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              paddingLeft: "70px",
            }}
          >
            {originalItems.map((item, index) => (
              <div
                key={index}
                style={{
                  marginRight: GUTTER,
                  flexShrink: 0,
                }}
              >
                <CarouselItem item={item} index={index} itemWidth={itemWidth} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

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
