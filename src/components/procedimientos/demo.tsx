"use client"

import { useState } from "react"
import ScrollRevealSection from "./scroll-reveal-section"

export default function Demo() {
  const [isPinned, setIsPinned] = useState(true)

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsPinned(!isPinned)}
          className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm"
        >
          {isPinned ? "Disable Pinning" : "Enable Pinning"}
        </button>
      </div>

      <ScrollRevealSection
        imageSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DpeKhYAJhydU2QhrB9aAiuhkuaEX6C.png"
        imageAlt="Architectural detail with orange geometric patterns"
        heading="NexaVirtu Tech"
        pin={isPinned}
      />
    </div>
  )
}
