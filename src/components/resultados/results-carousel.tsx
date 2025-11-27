"use client"

import { useState, useEffect } from "react"
import { CarouselItem } from "./carousel-item"
// @ts-ignore - Footer is a .jsx file
import Footer from "../UI/Footer.jsx"

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

export function ResultsCarousel() {
  const [itemWidth, setItemWidth] = useState(430)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      setIsMobile(w <= 768)

      if (!isMobile) {
        const maxWidth = Math.min(w, 1920)
        const gridWidth = maxWidth - 140 // padding left + right
        const columnWidth = gridWidth / 12
        // Cada item ocupa 6 columnas - 10px de gutter (20px / 2)
        const calculatedWidth = columnWidth * 6 - 10
        setItemWidth(Math.max(300, calculatedWidth))
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMobile])

  // MOBILE VERSION - Static vertical scroll
  if (isMobile) {
    return (
      <div style={{ width: "100%", backgroundColor: "white", overflow: "hidden" }}>
        {/* Header con título y subtítulo */}
        <div
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "75px",
            paddingBottom: "80px",
          }}
        >
          <h1
            style={{
              color: "#000000",
              lineHeight: "1.2",
              fontWeight: "700",
              fontSize: "48px",
              fontFamily: "Poppins, sans-serif",
              margin: "0 0 8px 0",
              textAlign: "left",
              letterSpacing: "-1px",
            }}
          >
            RESULTADOS
          </h1>
          <p
            style={{
              color: "#000000",
              fontSize: "20px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "500",
              margin: 0,
              paddingTop: "25px",
              textAlign: "left",
            }}
          >
            Pacientes - 2013/2024
          </p>
        </div>

        {/* Grid estático vertical */}
        <div
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingBottom: "120px",
          }}
        >
          {originalItems.map((item, index) => (
            <div
              key={index}
              style={{
                marginBottom: index < originalItems.length - 1 ? "40px" : "0",
                width: "100%",
              }}
            >
              <CarouselItem item={item} index={index} itemWidth={viewportWidth - 40} isMobile={true} />
            </div>
          ))}
        </div>

        {/* Footer solo en mobile */}
        <Footer />
      </div>
    )
  }

  // DESKTOP VERSION - Grid 2 columns (6 columnas cada uno)
  return (
    <div style={{ width: "100%", backgroundColor: "white" }}>
      {/* Grid de 12 columnas */}
      <div
        style={{
          paddingLeft: "70px",
          paddingRight: "70px",
          paddingBottom: "100px",
          maxWidth: "1920px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            columnGap: "20px",
            rowGap: "40px",
          }}
        >
          {/* Título a la izquierda - primeras 6 columnas */}
          <div style={{ gridColumn: "span 6", paddingTop: "75px", paddingBottom: "80px" }}>
            <h1
              style={{
                color: "#000000",
                lineHeight: "1.2",
                fontWeight: "700",
                fontSize: "72px",
                fontFamily: "Poppins, sans-serif",
                margin: "0 0 8px 0",
                textAlign: "left",
                letterSpacing: "-2px",
              }}
            >
              RESULTADOS
            </h1>
            <p
              style={{
                color: "#000000",
                fontSize: "20px",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "500",
                margin: 0,
                paddingTop: "25px",
                textAlign: "left",
              }}
            >
              Pacientes - 2018/2025
            </p>
          </div>

          {/* Espacio vacío - siguientes 6 columnas */}
          <div style={{ gridColumn: "span 6" }}></div>

          {/* Items del grid - cada uno ocupa 6 columnas */}
          {originalItems.map((item, index) => (
            <div key={index} style={{ gridColumn: "span 6", width: "100%" }}>
              <CarouselItem item={item} index={index} itemWidth={0} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
