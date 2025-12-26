import React from "react";
import { Box, Typography } from "@mui/material";

export default function FooterColumn({ title, children }) {
  return (
    <Box>
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 600,
          mb: 2,
          fontSize: "20px",
          textAlign: "left",
          color: "#fff"
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}
