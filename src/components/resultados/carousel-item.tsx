"use client"

import React from "react"

interface CarouselItemProps {
  item: { title: string; subtitle: string }
  index: number
  itemWidth: number
  isMobile?: boolean
}

const ITEM_HEIGHT = 525
const ITEM_HEIGHT_MOBILE = 400

export function CarouselItem({ item, index, itemWidth, isMobile = false }: CarouselItemProps) {
  const { title: itemTitle, subtitle: itemSubtitle } = item
  const itemHeight = isMobile ? ITEM_HEIGHT_MOBILE : ITEM_HEIGHT

  return (
    <div
      style={{
        width: `${itemWidth}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {/* Contenedor de imagen */}
      <div
        style={{
          width: "100%",
          height: `${itemHeight}px`,
          borderRadius: "12px",
          overflow: "hidden",
          position: "relative",
          background: "linear-gradient(to bottom, #B8BABB, #B0B2B3, #A9ABAC)",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(255,255,255,0.3)",
            fontSize: "12px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {/* Aquí iría tu imagen */}
          {/* <img src={...} alt={itemTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> */}
        </div>
      </div>

      {/* Título y subtítulo en layout horizontal */}
      <div
        style={{
          paddingTop: "12px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          paddingBottom: "10px",
        }}
      >
        <h3
          style={{
            color: "black",
            fontSize: "18px",
            fontWeight: 500,
            lineHeight: 1.4,
            margin: 0,
            fontFamily: "Poppins, sans-serif",
            textAlign: "left",
          }}
        >
          {itemTitle}
        </h3>
        <p
          style={{
            color: "black",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: 1.4,
            margin: 0,
            fontFamily: "Poppins, sans-serif",
            textAlign: "right",
          }}
        >
          {itemSubtitle}
        </p>
      </div>

      {/* Línea separadora negra */}
      <div
        style={{
          width: "100%",
          height: "0.2px",
          backgroundColor: "black",
        }}
      />
    </div>
  )
}
