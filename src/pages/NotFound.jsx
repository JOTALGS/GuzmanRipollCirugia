import { Box, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function NotFound() {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        px: { xs: "20px", md: "70px" },
      }}
    >
      {/* Top right text and button */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "40px", md: "60px" },
          right: { xs: "20px", md: "70px" },
          textAlign: "right",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "14px", md: "16px" },
            fontWeight: 300,
            lineHeight: 1.5,
            mb: 2,
            maxWidth: "200px",
            ml: "auto",
          }}
        >
          La página que buscas no se encuentra disponible
        </Typography>

        <Button
          onClick={scrollToBottom}
          endIcon={<ArrowDownwardIcon />}
          sx={{
            color: "#fff",
            textTransform: "none",
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "13px", md: "14px" },
            fontWeight: 400,
            padding: 0,
            minWidth: "auto",
            textDecoration: "underline",
            textUnderlineOffset: "4px",
            "&:hover": {
              backgroundColor: "transparent",
              opacity: 0.8,
            },
          }}
        >
          Ir al inicio
        </Button>
      </Box>

      {/* Main 404 content */}
      <Box
        sx={{
          textAlign: "left",
          maxWidth: "1200px",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "180px", sm: "250px", md: "350px", lg: "400px" },
            fontWeight: 600,
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
            mb: { xs: 2, md: 4 },
            color: "#fff",
          }}
        >
          404
        </Typography>

        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "40px", sm: "60px", md: "80px", lg: "90px" },
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#fff",
          }}
        >
          Esta Página
          <br />
          No Existe
        </Typography>
      </Box>

      {/* Bottom navigation */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: "40px", md: "60px" },
          left: { xs: "20px", md: "70px" },
          right: { xs: "20px", md: "70px" },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Button
          component={RouterLink}
          to="/"
          sx={{
            color: "#fff",
            textTransform: "none",
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "14px", md: "16px" },
            fontWeight: 400,
            padding: 0,
            minWidth: "auto",
            textDecoration: "underline",
            textUnderlineOffset: "4px",
            "&:hover": {
              backgroundColor: "transparent",
              opacity: 0.8,
            },
          }}
        >
          Volver al Inicio
        </Button>

        <Box
          sx={{
            display: "flex",
            gap: { xs: 3, md: 4 },
            flexWrap: "wrap",
          }}
        >
          <Button
            component={RouterLink}
            to="/clinica"
            sx={{
              color: "#B0B0B0",
              textTransform: "none",
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "13px", md: "14px" },
              fontWeight: 300,
              padding: 0,
              minWidth: "auto",
              "&:hover": {
                backgroundColor: "transparent",
                color: "#fff",
              },
            }}
          >
            Clínica
          </Button>

          <Button
            component={RouterLink}
            to="/tratamientos"
            sx={{
              color: "#B0B0B0",
              textTransform: "none",
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "13px", md: "14px" },
              fontWeight: 300,
              padding: 0,
              minWidth: "auto",
              "&:hover": {
                backgroundColor: "transparent",
                color: "#fff",
              },
            }}
          >
            Tratamientos
          </Button>

          <Button
            component={RouterLink}
            to="/contacto"
            sx={{
              color: "#B0B0B0",
              textTransform: "none",
              fontFamily: "Poppins, sans-serif",
              fontSize: { xs: "13px", md: "14px" },
              fontWeight: 300,
              padding: 0,
              minWidth: "auto",
              "&:hover": {
                backgroundColor: "transparent",
                color: "#fff",
              },
            }}
          >
            Contacto
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
