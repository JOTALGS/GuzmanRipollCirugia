import { Box, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Container con grid de 12 columnas */}
      <Box
        sx={{
          px: { xs: "20px", md: "70px" },
          py: { xs: "100px", md: "120px" },
          minHeight: "100vh",
          position: "relative",

          /* === Grid 12 columnas === */
          display: "grid",
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
          columnGap: "20px",
          rowGap: { xs: "24px", md: "32px" },
          alignContent: "center",
        }}
      >
        {/* Texto superior derecho */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: "30px", md: "80px" },
            right: { xs: "20px", md: "670px" },
            textAlign: "left",
            maxWidth: { xs: "200px", md: "280px" },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "13px", md: "15px" },
              fontWeight: 300,
              lineHeight: 1.5,
              color: "#B0B0B0",
              mb: 2,
            }}
          >
            Lorem Impsum lore Impsum lore lore Impsum lor
          </Typography>
          <Button
            component={RouterLink}
            to="/contacto"
            endIcon={<ArrowDownwardIcon sx={{ fontSize: "14px !important" }} />}
            sx={{
              color: "#fff",
              textTransform: "none",
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "13px", md: "14px" },
              fontWeight: 400,
              p: 0,
              minWidth: "auto",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              textDecorationThickness: "1px",
              "&:hover": { backgroundColor: "transparent", opacity: 0.7 },
              "& .MuiButton-endIcon": { ml: "6px" },
            }}
          >
            Get in touch
          </Button>
        </Box>

        {/* 404 - Arranca en columna 5 (md+) */}
        <Box
          sx={{
            gridColumn: { xs: "1 / -1", md: "5 / 13" },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "140px", sm: "220px", md: "320px", lg: "400px" },
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: "-0.04em",
              color: "#fff",
              textShadow: "0 0 80px rgba(255,255,255,0.1)",
            }}
          >
            404
          </Typography>
        </Box>

        {/* "Esta Escena No Existe" - se queda a la izquierda */}
        <Box
          sx={{
            gridColumn: { xs: "1 / -1", md: "1 / span 6" },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "36px", sm: "52px", md: "72px", lg: "120px" },
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#fff",
            }}
          >
            Esta Escena
            <br />
            No Existe
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
