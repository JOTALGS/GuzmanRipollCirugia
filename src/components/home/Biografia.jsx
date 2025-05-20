  import { use, useEffect, useRef, useState } from "react";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { Box, Typography } from "@mui/material";
  import TopIndex from "./TopIndex";
import Publicaciones from "./Publicaciones";

  gsap.registerPlugin(ScrollTrigger);

  const Biografia = () => { 
    const [showTop, setShowTop] = useState(false);
    const bioContainerRef = useRef(null);
    const publicationsContainerRef = useRef(null);
    const animTimeline = useRef(null);

    useEffect(() => {
      const bio = document.getElementById("biografia");
      const img = document.querySelector("#biografia img");
    
      if (!bio || !img || !bioContainerRef.current) return;
    
      let imgTrigger = null;
      let textTrigger = null;
      let textTwoTrigger = null;

      const mainTrigger = ScrollTrigger.create({
        start: () => `+=${window.innerHeight}px`,
        end: () => `+=1`,
        onEnter: () => {
          bio.style.position = "relative";
          setShowTop(true);
          console.log("Switched to relative at 100vh");
    
          requestAnimationFrame(() => {
            // Kill previous triggers if they exist
            imgTrigger?.kill();
            textTrigger?.kill();
            textTwoTrigger?.kill();
    
            // Create image fade trigger
            imgTrigger = gsap.timeline({
              scrollTrigger: {
                trigger: img,
                start: "bottom top",
                end: "+=100vh",
                scrub: true,
              },
            }).to(img, {
              opacity: 0,
              ease: "none",
            }).scrollTrigger;
    
            // Create pinned text section
            textTrigger = ScrollTrigger.create({
              trigger: bioContainerRef.current,
              start: "top top",
              end: "+=600px",
              scrub: true,
              pin: true,
              pinSpacing: false,
            });

            // Create pinned text section
            textTwoTrigger = ScrollTrigger.create({
              trigger: publicationsContainerRef.current,
              start: "top top",
              end: "+=600px",
              scrub: true,
              pin: true,
              pinSpacing: false,
            });

            if (animTimeline.current) {
              animTimeline.current.kill();
              animTimeline.current = null;
            }

            gsap.utils.toArray(".publicaciones-clone").forEach((el) =>
              gsap.set(el, { clearProps: "all" })
            );

            animTimeline.current = gsap.timeline({
              scrollTrigger: {
                trigger: publicationsContainerRef.current,
                start: "top top-=20px",
                end: "bottom top-=150px",
                scrub: true,
                toggleActions: "play reverse play reverse",
              },
            });

            gsap.utils.toArray(".publicaciones-clone").forEach((el, i) => {
              animTimeline.current.fromTo(
                el,
                { opacity: 0, y: -200 },
                { opacity: 0.2, y: 0, duration: 5, ease: "power2.inOut" },
                i * 0.3
              );
            });

          });
        },
        onLeaveBack: () => {
          bio.style.position = "fixed";
          setShowTop(false);
          console.log("Switched back to fixed");
    
          // Clean up dynamically added triggers
          imgTrigger?.kill();
          textTrigger?.kill();
          textTwoTrigger?.kill();
        },
      });

      
    
      return () => {
        mainTrigger.kill();
        imgTrigger?.kill();
        textTrigger?.kill();
        textTwoTrigger?.kill();
      };
    }, []);
    
    
    

    return (
      <>
        <TopIndex visible={showTop} /> {/* Fixed top bar */}
        <Box
          id="biografia"
          height={"100%"}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            minHeight: "100vh",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: -100,
          }}
        >
          <Box sx={{ position: "absolute", overflow: "hidden", height: "25%", width: "100%", backgroundColor: " #E9E9E9" }}>
            <img
              src="/images/GR_5_Nombre+Bajada.png"
              alt="Biografia"
              style={{ marginTop: "10px", width: "55%", height: "auto", objectFit: "contain" }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "1px", // thickness of the border
                background: "linear-gradient(to right, transparent, #D4BAA9, transparent)", // adjust #888 to desired color
              }}
            />
          </Box>
          <Box sx={{ height: "150vh", marginBottom: "200px", width: "100%", backgroundColor: "green" }} />

          <Box display="flex" width="100%" position="relative">
            {/* LEFT SECTION */}
            <Box width={"45%"}>
              <Box ref={bioContainerRef} textAlign="start" width={"100%"} alignSelf={"start"}>
                <Typography variant="h1" sx={{ fontFamily: "Archivo Expanded", textTransform: "uppercase" }}>Biografía</Typography>
              </Box>

              <Box marginTop={"600px"}>
                <img
                  src="/images/foto-perfil-guzman.webp"
                  alt="perfil"
                  style={{ marginTop: "10px", width: "55%", height: "auto", objectFit: "contain", border: "2px solid #D4BAA9" }}
                />
                <Box 
                  sx={{
                      border: "2px solid #D4BAA9",
                      marginTop: "10px",
                      width: "55%",
                      height: "auto",
                      alignSelf: "center",
                      justifySelf: "center",
                    }}
                />
              </Box>
            </Box>
          
            {/* RIGHT SECTION */}
            <Box width={"55%"}>
              <Box textAlign="start" width={"90%"} alignSelf={"end"} px={4} py={2}
                sx={{
                  border: "2px solid #D4BAA9",
                }}
              >

                <Typography paragraph 
                  sx={{
                    fontFamily: "Red Hat Display",
                    textTransform: "uppercase",
                    fontSize: "1.5rem",
                    fontWeight: "bold"
                  }}>
                  <strong>DR. GUZMAN RIPOLL</strong><br />
                </Typography>
                <Typography paragraph 
                  sx={{
                    fontFamily: "Red Hat Display",
                    textTransform: "uppercase",
                    fontSize: "1.5rem",
                  }}>
                  CIRUJANO PLÁSTICO RECONSTRUCTIVO Y ESTÉTICO
                </Typography>
                <Typography paragraph>
                  En 2012, obtuve mi título de Médico General de la Universidad CLAEH. A principios de 2016, comencé mi residencia en Cirugía Plástica, Reconstructiva y Estética en el Hospital Pasteur. Después de completar mi especialización en 2019, realicé un Fellowship en el área de Microcirugía Reconstructiva y Cirugía de Mano en Jinan, China.
                </Typography>

                <Typography paragraph>
                  Posteriormente, tuve la oportunidad de realizar un Observership en Microcirugía en el hospital Asan Medical Center en Seúl, Corea del Sur.
                </Typography>

                <Typography paragraph>
                  En 2020, fui becado por Motiva® para cursar la Maestría en Cirugía Mamaria, Reconstructiva y Estética en la Universitat de Barcelona. Durante este programa, también realicé un Fellowship clínico en Zúrich, Suiza, en el Brust Zentrum bajo la tutela del Prof. Jian Farhadi.
                </Typography>

                <Typography paragraph>
                  En 2022, participé en el curso Total Definer Master del Dr. Alfredo Hoyos, enfocado en la lipoaspiración de definición.
                </Typography>

                <Typography paragraph>
                  En la actualidad, me dedico principalmente a realizar cirugías mamarias estéticas y reconstructivas, así como también cirugías de remodelamiento corporal, siendo el único especialista en Uruguay en utilizar la lipoaspiración VASER.
                </Typography>

                <Typography paragraph>
                  Mi compromiso con la constante actualización y el conocimiento continuo son fundamentales para alcanzar mis objetivos como cirujano. Busco mantenerme al día con los avances y las nuevas técnicas en cirugía plástica, reconstructiva y estética. Mi enfoque se centra en ofrecer a los pacientes los mejores tratamientos y resultados posibles, manteniendo altos estándares de calidad y cuidado. Mi dedicación a la formación y la mejora continua me permite cumplir con los más altos estándares de excelencia en mi práctica profesional.
                </Typography>
              </Box>

              <Box ref={publicationsContainerRef} textAlign="start" width={"90%"} marginTop={"200px"} alignSelf={"end"}>
                <Typography variant="h2" sx={{ fontFamily: "Archivo Expanded", textTransform: "uppercase", fontSize: "75px" }}>Publicaciones</Typography>
                  {/* Clones */}
                  {[1, 2, 3].map((i) => (
                    <Typography
                      key={i}
                      className={`publicaciones-clone clone-${i}`}
                      sx={{
                        position: "absolute",
                        top: `${75 * i}px`, // adjust spacing
                        left: 0,
                        fontFamily: "Archivo Expanded",
                        textTransform: "uppercase",
                        fontSize: "75px",
                        opacity: 0, // will animate in
                        color: "black",
                      }}
                    >
                      Publicaciones
                    </Typography>
                  ))}
              </Box>
            </Box>
          </Box>
        </Box>
        
        <Box height={'100vh'} backgroundColor={'transparent'}/>
        <Publicaciones />
        <Box height={'100vh'} backgroundColor={'transparent'}/>
      </>
    );
  };

  export default Biografia;
