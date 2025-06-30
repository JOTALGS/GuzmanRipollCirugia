"use client"

import { useState } from "react";
import { Add as Plus, Close as X } from "@mui/icons-material";
import { 
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  Collapse
} from "@mui/material";

export default function Faq() {
  const [expandedItem, setExpandedItem] = useState(1);

  const faqItems = [
    {
      id: 1,
      question: "Cómo determino el procedimiento adecuado para mí?",
      answer:
        "La elección del procedimiento se define durante la consulta médica inicial. Evaluamos tu anatomía, historial clínico y objetivos personales, y te mostramos posibles resultados con simulación 3D e inteligencia artificial.",
    },
    {
      id: 2,
      question: "Qué resultados puedo esperar según mi anatomía?",
      answer:
        "Los resultados varían según cada paciente y su anatomía específica. Durante la consulta evaluaremos tus características individuales para darte expectativas realistas.",
    },
    {
      id: 3,
      question: "Cómo puedo prepararme para el procedimiento y el postoperatorio?",
      answer:
        "Te proporcionaremos una guía completa de preparación que incluye recomendaciones dietéticas, medicamentos a evitar y cuidados específicos antes y después del procedimiento.",
    },
    {
      id: 4,
      question: "Cuánto tiempo duran los resultados y qué mantenimiento requieren?",
      answer:
        "La duración de los resultados depende del tipo de procedimiento. Te explicaremos en detalle qué esperar y qué cuidados de mantenimiento son necesarios.",
    },
    {
      id: 5,
      question: "Cuáles son las formas de pago y cómo se agenda una consulta?",
      answer:
        "Ofrecemos diversas opciones de pago y financiamiento. Puedes agendar tu consulta a través de nuestros canales de contacto disponibles.",
    },
    {
      id: 6,
      question: "Qué seguimiento postoperatorio ofrecen a largo plazo?",
      answer:
        "Brindamos seguimiento completo postoperatorio con controles programados para asegurar tu recuperación y satisfacción con los resultados.",
    },
    {
      id: 7,
      question: "Cuáles son los riesgos y cómo se minimizan?",
      answer:
        "Todo procedimiento tiene riesgos asociados. Te explicaremos detalladamente cada uno y las medidas que tomamos para minimizarlos al máximo.",
    },
  ];

  const toggleItem = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      mx: 'auto', 
      p: 3, 
      bgcolor: 'background.paper' 
    }}>
      <Box sx={{
        gridColumn: '1 / 13',
        gridRow: '1 / 1',
        mx: { xs: 1, md: 4 },
      }}>
          
        <Box sx={{
          mb: "80px",
          textAlign: 'start',
        }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 400,
              fontFamily: 'Poppins, sans-serif',
              color: 'text.primary', 
              mb: 1 
            }}
          >
            Tenes Dudas?
          </Typography>
          <Typography 
            variant="h2" 
            component="h2" 
            sx={{ 
              fontWeight: 400,
              fontFamily: 'Poppins, sans-serif',
              color: 'primary.main', 
              mb: 2 
            }}
          >
            Tenemos respuestas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            En cualquier caso, te sugerimos comunicarte con nosotros si tienes alguna consulta.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {faqItems.map((item) => (
            <Box key={item.id}>
              <Divider />
              <Box sx={{ 
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                py: 2
              }}>
                <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {item.id.toString().padStart(2, "0")}.
                  </Typography>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ fontSize: { xs: '16px', md: '20px' }, fontWeight: 500, mb: 1 }}
                    >
                      {item.question}
                    </Typography>
                    <Collapse in={expandedItem === item.id}>
                      <Typography 
                        variant="body1" 
                        color="primary.main" 
                        sx={{ fontSize: { xs: '16px', md: '20px' }, lineHeight: 1.75, pb: 2 }}
                      >
                        {item.answer}
                      </Typography>
                    </Collapse>
                  </Box>
                </Box>
                <IconButton
                  onClick={() => toggleItem(item.id)}
                  size="small"
                  sx={{ 
                    ml: 1, 
                    height: 32, 
                    width: 32,
                    '&:hover': { backgroundColor: 'action.hover' } 
                  }}
                >
                  {expandedItem === item.id ? <X fontSize="small" /> : <Plus fontSize="small" />}
                </IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}