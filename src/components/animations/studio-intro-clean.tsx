"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

function splitIntoLines(element: HTMLElement) {
  const text = element.textContent || ""
  const words = text.split(" ")
  element.innerHTML = ""

  let line: HTMLSpanElement | null = null
  let lineWrapper: HTMLDivElement | null = null
  const lines: HTMLDivElement[] = []
  let currentLineTop = -1

  const tempContainer = document.createElement("div")
  tempContainer.style.position = "absolute"
  tempContainer.style.visibility = "hidden"
  tempContainer.style.width = element.offsetWidth + "px"
  tempContainer.style.font = window.getComputedStyle(element).font
  tempContainer.style.lineHeight = window.getComputedStyle(element).lineHeight
  document.body.appendChild(tempContainer)

  words.forEach((word, i) => {
    const wordSpan = document.createElement("span")
    wordSpan.textContent = word + (i < words.length - 1 ? " " : "")
    wordSpan.style.display = "inline-block"
    tempContainer.appendChild(wordSpan)

    const rect = wordSpan.getBoundingClientRect()
    const wordTop = rect.top

    if (wordTop !== currentLineTop) {
      if (lineWrapper) {
        lines.push(lineWrapper)
      }
      lineWrapper = document.createElement("div")
      lineWrapper.style.overflow = "hidden"
      line = document.createElement("span")
      line.style.display = "block"
      lineWrapper.appendChild(line)
      currentLineTop = wordTop
    }

    if (line) {
      line.appendChild(wordSpan.cloneNode(true))
    }
  })

  if (lineWrapper) {
    lines.push(lineWrapper)
  }

  document.body.removeChild(tempContainer)

  lines.forEach((lineWrapper) => {
    element.appendChild(lineWrapper)
  })

  return lines.map((wrapper) => wrapper.querySelector("span") as HTMLSpanElement)
}

export default function StudioIntroClean() {
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const lines = splitIntoLines(textRef.current)

    gsap.set(lines, {
      opacity: 0,
      y: 40,
    })

    gsap.to(lines, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.4,
    })
  }, [])

  return (
    <section
      style={{
        width: "100%",
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "25vh",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1100px" }}>
        <p
          ref={textRef}
          style={{
            fontFamily: "'Fraunces', 'Playfair Display', 'Georgia', serif",
            fontSize: "clamp(2.6rem, 3.5vw, 4rem)",
            lineHeight: "1.2",
            color: "#000000",
          }}
        >
          Your text content goes here. Replace this with your own paragraph text.
        </p>
      </div>
    </section>
  )
}
