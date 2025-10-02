"use client"

import { useState, useEffect } from "react"

interface GridDebuggerProps {
  /** Número de columnas del grid (default: 12) */
  columns?: number
  /** Ancho máximo del contenedor (default: "1920px") */
  maxWidth?: string
  /** Padding horizontal del contenedor (default: "70px") */
  paddingX?: string
  /** Gap entre columnas (default: "20px") */
  gap?: string
  /** Color de las columnas (default: "bg-red-500/10") */
  columnColor?: string
  /** Tecla para activar/desactivar (default: "g") */
  toggleKey?: string
  /** Requiere Shift + tecla (default: true) */
  requireShift?: boolean
  /** Z-index del overlay (default: 9999) */
  zIndex?: number
}

export function GridDebugger({
  columns = 12,
  maxWidth = "1920px",
  paddingX = "70px",
  gap = "20px",
  columnColor = "bg-red-500/10",
  toggleKey = "g",
  requireShift = true,
  zIndex = 9999,
}: GridDebuggerProps = {}) {
  const [showGrid, setShowGrid] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyMatch = e.key.toLowerCase() === toggleKey.toLowerCase()
      const modifierMatch = requireShift ? e.shiftKey : true
      
      if (keyMatch && modifierMatch) {
        e.preventDefault()
        setShowGrid((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [toggleKey, requireShift])

  if (!showGrid) {
    return null
  }

  // Detectar si es móvil
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  // Generar las clases CSS dinámicamente
  const containerStyle = {
    maxWidth,
    paddingLeft: isMobile ? "15px" : paddingX,
    paddingRight: isMobile ? "15px" : paddingX,
    gap: isMobile ? "20px" : gap,
    gridTemplateColumns: `repeat(${isMobile ? 4 : columns}, 1fr)`,
    zIndex,
  }

  return (
    <>
      {/* Contenedor de la rejilla que se superpone a toda la página */}
      <div 
        className="pointer-events-none fixed inset-0"
        style={{ zIndex }}
      >
        {/* Contenedor que replica el layout principal */}
        <div 
          className="mx-auto grid h-full"
          style={containerStyle}
        >
          {/* Genera las columnas visuales */}
          {Array.from({ length: isMobile ? 4 : columns }).map((_, i) => (
            <div
              key={i}
              className={`h-full w-full ${columnColor}`}
            />
          ))}
        </div>
      </div>

      {/* Indicador visual en la esquina */}
      <div
        className="pointer-events-none fixed top-4 left-4 rounded bg-black/80 px-3 py-2 text-white text-sm font-mono"
        style={{ zIndex: zIndex + 1 }}
      >
        Grid Debug: {isMobile ? '4' : columns} cols | {requireShift ? 'Shift+' : ''}{toggleKey.toUpperCase()} to toggle
      </div>
    </>
  )
}

// Hook personalizado para usar el grid debugger
export function useGridDebugger(options?: GridDebuggerProps) {
  const [showGrid, setShowGrid] = useState(false)

  const toggleGrid = () => setShowGrid(prev => !prev)
  
  return {
    showGrid,
    toggleGrid,
    GridDebugger: () => <GridDebugger {...options} />
  }
}

// Versión con configuraciones predefinidas comunes
export const GridDebuggerPresets = {
  // Bootstrap-like grid
  Bootstrap: (props?: Partial<GridDebuggerProps>) => (
    <GridDebugger
      columns={12}
      maxWidth="1200px"
      paddingX="15px"
      gap="30px"
      columnColor="bg-blue-500/10"
      {...props}
    />
  ),

  // Tailwind container
  Tailwind: (props?: Partial<GridDebuggerProps>) => (
    <GridDebugger
      columns={12}
      maxWidth="1280px"
      paddingX="2rem"
      gap="1rem"
      columnColor="bg-cyan-500/10"
      {...props}
    />
  ),

  // Custom design system (como el del proyecto)
  Custom: (props?: Partial<GridDebuggerProps>) => (
    <GridDebugger
      columns={12}
      maxWidth="1920px"
      paddingX="70px"
      gap="20px"
      columnColor="bg-red-500/10"
      {...props}
    />
  ),
}
