"use client"

import React from "react"
import { motion, useTransform, useVelocity, type MotionValue } from "framer-motion"

interface CarouselItemProps {
  item: { title: string; subtitle: string }
  index: number
  x: MotionValue<number>
  viewportWidth: number
  itemAbsoluteCenter: number
  ITEM_WIDTH: number
  ITEM_HEIGHT: number
  GUTTER: number
}

export function CarouselItem({
  item,
  index,
  x,
  viewportWidth,
  itemAbsoluteCenter,
  ITEM_WIDTH,
  ITEM_HEIGHT,
  GUTTER,
}: CarouselItemProps) {
  const { title: itemTitle, subtitle: itemSubtitle } = item

  // 1) posición absoluta del centro del ítem
  const itemCenterX = useTransform(x, latestX => latestX + itemAbsoluteCenter)

  // 2) distancia al centro del viewport
  const distanceFromCenter = useTransform(
    itemCenterX,
    centerX => Math.abs(centerX - viewportWidth / 2)
  )

  // 3) escala base (de 1.02 a 0.98)
  const maxDistance = ITEM_WIDTH * 1.5
  const baseScale = useTransform(
    distanceFromCenter,
    [0, maxDistance],
    [1.02, 0.98]
  )

  // 4) detectamos si el carrusel se está moviendo
  const velocity = useVelocity(x)
  const isMoving = useTransform(velocity, v => Math.abs(v) > 0.1)

  // 5) combinamos: si NO mueve → escala 1; si mueve → baseScale
  const scale = useTransform(
    [baseScale, isMoving],
    ([s, moving]) => (moving ? s : 1)
  )

  return (
    <motion.div
      key={index}
      style={{
        flexShrink: 0,
        width: ITEM_WIDTH,
        marginRight: GUTTER,
        scale,
        overflow: "visible",           // para que el texto no se corte
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",      // alineamos por arriba
      }}
    >
      {/* Contenedor de imagen */}
      <div
        style={{
          width: "100%",
          height: ITEM_HEIGHT,
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
          {/* Aquí iría tu <img> o <Image> */}
        </div>
      </div>

      {/* Título y subtítulo */}
      <div style={{ paddingTop: "16px" }}>
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
    </motion.div>
  )
}

