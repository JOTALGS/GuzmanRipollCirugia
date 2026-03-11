import React, { useEffect, useRef } from "react"
import { Box, Typography } from "@mui/material"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export const PurposeSection = () => {
    const containerRef = useRef(null)
    const labelRef = useRef(null)
    const descriptionRef = useRef(null)

    const headlineText = '"La belleza que buscamos no es solo estética, sino la que potencia tu bienestar, transformando tu confianza y tu equilibrio integral."'
    const words = headlineText.split(" ")

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Headline Words
            const wordElements = gsap.utils.toArray(".headline-word")

            gsap.fromTo(wordElements,
                { y: "110%", opacity: 0 },
                {
                    y: "0%",
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out", // Clean ease
                    stagger: 0.02, // Fast stagger for line-by-line feel
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            )

            // Animate Label and Description (Clean fade up)
            const otherElements = [labelRef.current, descriptionRef.current]
            gsap.fromTo(otherElements,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: containerRef.current, // Use common trigger or their own
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    delay: 0.2 // Start slightly after headline
                }
            )

        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <Box
            ref={containerRef}
            sx={{
                gridColumn: "1 / -1",
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                gap: { xs: "20px", md: "20px" },
                mt: { xs: "60px", md: "100px" },
                mb: { xs: "60px", md: "100px" },
            }}>
            {/* Big Headline - Word by Word Reveal */}
            <Box sx={{
                gridColumn: { xs: "1 / 13", md: "1 / 12" },
                mb: { xs: "40px", md: "110px" }
            }}>
                <Typography sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: { xs: "36px", md: "76px" },
                    fontWeight: 500,
                    lineHeight: { xs: 1.1, md: 1.1 },
                    letterSpacing: "-0.05em",
                    color: "black",
                    textAlign: "left",
                    overflow: "hidden"
                }}>
                    {words.map((word, i) => (
                        <Box component="span" key={i} sx={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", mr: "0.25em" }}>
                            <Box component="span" className="headline-word" sx={{ display: "inline-block", willChange: "transform" }}>
                                {word}
                            </Box>
                        </Box>
                    ))}
                </Typography>
            </Box>

            {/* Row 2: Label (Left) + Description (Right) */}

            {/* 01 NUESTRO PROPÓSITO */}
            <Box
                ref={labelRef}
                sx={{
                    gridColumn: { xs: "1 / 13", md: "1 / 7" }, // Spans 6 cols in parent
                    mb: { xs: "20px", md: 0 },
                    display: { xs: "flex", md: "grid" },
                    gridTemplateColumns: { md: "repeat(6, 1fr)" }, // Nested grid of 6 cols
                    alignItems: "baseline",
                    gap: { xs: "10px", md: "20px" }, // Match component gap
                    width: "100%"
                }}>
                <Typography component="span" sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: { xs: "16px", md: "18px" },
                    fontWeight: 500,
                    color: "rgba(0, 0, 0, 0.37)",
                    lineHeight: 1,
                    gridColumn: { md: "1 / 2" },
                    justifySelf: "start",
                    textAlign: "left"
                }}>
                    (01)
                </Typography>
                <Typography component="span" sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: { xs: "16px", md: "18px" },
                    fontWeight: 500,
                    color: "black",
                    textTransform: "uppercase",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    gridColumn: { md: "4 / 7" }, // Starts at col 4
                    textAlign: "left",
                    justifySelf: "start"
                }}>
                    NUESTRO PROPÓSITO
                </Typography>
            </Box>

            {/* Description Paragraph */}
            <Box
                ref={descriptionRef}
                sx={{
                    gridColumn: { xs: "1 / 13", md: "8 / 13" }, // Right column (aligned with content)
                }}>
                <Typography sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: { xs: "21px", md: "26px" },
                    lineHeight: 1.3,
                    color: "#000",
                    fontWeight: 500,
                    textAlign: "left",
                }}>
                    Somos la marca de cirugía estética mamaria que promueve la rehumanización de la medicina
                    estética a través de la integración de la inteligencia artificial e innovaciones tecnológicas en sus procesos,
                    volviéndolos más sustentables y eficientes, para ganar tiempo de calidad y fortalecer el vínculo con el paciente,
                    ahí donde lo humano es irremplazable.
                </Typography>
            </Box>      </Box>
    )
}
