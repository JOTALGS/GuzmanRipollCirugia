import React from "react";
import { Box } from "@mui/material";

export default function FooterLogo({ logo, alt = "Logo" }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 4
      }}
    >
      <Box
        component="img"
        src={logo}
        alt={alt}
        sx={{
          height: { xs: 60, md: 80 },
          width: "auto",
          maxWidth: "200px"
        }}
      />
    </Box>
  );
}
