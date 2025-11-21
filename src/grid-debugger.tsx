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
  /** Forzar visibilidad (útil cuando se usa con hook) */
  show?: boolean
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
  show: externalShow,
}: GridDebuggerProps = {}) {
  const [internalShow, setInternalShow] = useState(false)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      const result = window.matchMedia("(max-width: 767px)").matches
      console.log("[v0] Grid Debugger - Initial mobile check:", result, "Width:", window.innerWidth)
      return result
    }
    return false
  })

  // Usar el estado externo si se proporciona, sino usar el interno
  const showGrid = externalShow !== undefined ? externalShow : internalShow

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)")

    const checkMobile = (e?: MediaQueryListEvent) => {
      const matches = e ? e.matches : mediaQuery.matches
      console.log("[v0] Grid Debugger - Mobile check:", matches, "Width:", window.innerWidth)
      setIsMobile(matches)
    }

    // Verificar inicialmente
    checkMobile()

    // Agregar listener para cambios de tamaño usando matchMedia
    mediaQuery.addEventListener("change", checkMobile)

    return () => {
      mediaQuery.removeEventListener("change", checkMobile)
    }
  }, [])

  useEffect(() => {
    // Solo agregar el event listener si no estamos controlando el estado externamente
    if (externalShow === undefined) {
      const handleKeyDown = (e: KeyboardEvent) => {
        const keyMatch = e.key.toLowerCase() === toggleKey.toLowerCase()
        const modifierMatch = requireShift ? e.shiftKey : true

        if (keyMatch && modifierMatch) {
          e.preventDefault()
          setInternalShow((prev) => {
            const newState = !prev
            console.log("[v0] Grid Debugger - Toggle:", newState ? "ACTIVADO" : "DESACTIVADO", "Mobile:", isMobile)
            return newState
          })
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      console.log("[v0] Grid Debugger cargado - Presiona Shift + G para activar")

      return () => {
        window.removeEventListener("keydown", handleKeyDown)
      }
    }
  }, [toggleKey, requireShift, externalShow, isMobile])

  if (!showGrid) {
    return null
  }

  // Configuración para móvil
  const mobileColumns = 4
  const mobilePadding = "15px"
  const mobileGap = "20px"

  console.log(
    "[v0] Grid Debugger - Rendering:",
    isMobile ? `${mobileColumns} columnas (móvil)` : `${columns} columnas (desktop)`,
  )

  // Generar las clases CSS dinámicamente
  const containerStyle = {
    maxWidth: isMobile ? "100%" : maxWidth,
    paddingLeft: isMobile ? mobilePadding : paddingX,
    paddingRight: isMobile ? mobilePadding : paddingX,
    gap: isMobile ? mobileGap : gap,
    gridTemplateColumns: `repeat(${isMobile ? mobileColumns : columns}, 1fr)`,
    zIndex,
  }

  return (
    <>
      {/* Contenedor de la rejilla que se superpone a toda la página */}
      <div className="pointer-events-none fixed inset-0" style={{ zIndex }}>
        {/* Contenedor que replica el layout principal */}
        <div className="mx-auto grid h-full" style={containerStyle}>
          {/* Genera las columnas visuales */}
          {Array.from({ length: isMobile ? mobileColumns : columns }).map((_, i) => (
            <div key={i} className={`h-full w-full ${columnColor}`} />
          ))}
        </div>
      </div>

      {/* Indicador visual en la esquina */}
      <div
        className="pointer-events-none fixed top-4 left-4 rounded bg-black/80 px-3 py-2 text-white text-sm font-mono"
        style={{ zIndex: zIndex + 1 }}
      >
        Grid Debug: {isMobile ? `${mobileColumns} cols (móvil)` : `${columns} cols (desktop)`} |{" "}
        {requireShift ? "Shift+" : ""}
        {toggleKey.toUpperCase()} to toggle
      </div>
    </>
  )
}

// Hook personalizado para usar el grid debugger
export function useGridDebugger(options?: Omit<GridDebuggerProps, "show">) {
  const [showGrid, setShowGrid] = useState(false)

  const toggleGrid = () => setShowGrid((prev) => !prev)

  const GridDebuggerComponent = () => <GridDebugger {...options} show={showGrid} />

  return {
    showGrid,
    toggleGrid,
    GridDebugger: GridDebuggerComponent,
  }
}

// Versión con configuraciones predefinidas comunes
export const GridDebuggerPresets = {
  // Bootstrap-like grid
  Bootstrap: (props?: Partial<GridDebuggerProps>) => (
    <GridDebugger columns={12} maxWidth="1200px" paddingX="15px" gap="30px" columnColor="bg-blue-500/10" {...props} />
  ),

  // Tailwind container
  Tailwind: (props?: Partial<GridDebuggerProps>) => (
    <GridDebugger columns={12} maxWidth="1280px" paddingX="2rem" gap="1rem" columnColor="bg-cyan-500/10" {...props} />
  ),

  // Custom design system (como el del proyecto)
  Custom: (props?: Partial<GridDebuggerProps>) => (
    <GridDebugger columns={12} maxWidth="1920px" paddingX="70px" gap="20px" columnColor="bg-red-500/10" {...props} />
  ),

  // Mobile-first (siempre 4 columnas en móvil, 12 en desktop)
  MobileFirst: (props?: Partial<GridDebuggerProps>) => (
    <GridDebugger columns={12} maxWidth="1920px" paddingX="70px" gap="20px" columnColor="bg-green-500/10" {...props} />
  ),
}

// Componente de ejemplo de uso
export function GridDebuggerDemo() {
  const { showGrid, toggleGrid, GridDebugger: Debugger } = useGridDebugger()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Grid Debugger Demo</h1>

        <div className="bg-white rounded-lg p-6 shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Controles</h2>
          <button onClick={toggleGrid} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            {showGrid ? "Ocultar" : "Mostrar"} Grid Debugger
          </button>
          <p className="mt-2 text-sm text-gray-600">
            También puedes usar <kbd className="px-2 py-1 bg-gray-200 rounded">Shift + G</kbd> para alternar
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Tu Contenido</h2>
          <p className="mb-4">
            Este es el contenido de tu aplicación. El Grid Debugger se superpondrá cuando esté activo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-gray-100 p-4 rounded-lg">
                Card {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Debugger */}
      <Debugger />
    </div>
  )
}

// Exportación por defecto para uso fácil
export default GridDebugger
