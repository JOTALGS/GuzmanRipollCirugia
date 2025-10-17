"use client"

import React from "react"

interface CarouselItemProps {
  item: { title: string; subtitle: string }
  index: number
  itemWidth: number
}

const ITEM_HEIGHT = 525

export function CarouselItem({ item, index, itemWidth }: CarouselItemProps) {
  const { title: itemTitle, subtitle: itemSubtitle } = item

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
          height: `${ITEM_HEIGHT}px`,
          borderRadius: "4px",
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

      {/* Título y subtítulo */}
      <div style={{ paddingTop: "16px", width: "100%" }}>
        <h3
          style={{
            color: "black",
            fontSize: "13px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            lineHeight: 1.4,
            margin: "0 0 4px 0",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {itemTitle}
        </h3>
        <p
          style={{
            color: "black",
            fontSize: "13px",
            fontWeight: 400,
            letterSpacing: "0.02em",
            lineHeight: 1.4,
            margin: 0,
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {itemSubtitle}
        </p>
      </div>
    </div>
  )
}
