import { Box, Divider, Typography } from "@mui/material";

const TopIndex = ({ visible }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "transparent",
        zIndex: 9999,
        display:"flex",
        opacity: visible ? "1" : "0",
        transition: "all 1s ease-in-out",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Current Section */}
      <Typography variant="subtitle2"  fontWeight="bold" sx={{ color: "#191968", fontFamily: "Archivo Expanded", textTransform: "uppercase", padding: "0px 10px" }}>
        Biografía
      </Typography>

      {/* Next Section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ mx: '1px', backgroundColor: '#191968', opacity: 0.8, height: '10px', width: '1px', alignSelf: 'center' }}
        />
        <Typography variant="subtitle2" sx={{ color: "#191968", fontFamily: "Archivo Expanded", textTransform: "uppercase", padding: "0px 10px 0px 5px" }}>Procedimientos</Typography>
      </Box>
    </Box>
  );
};

export default TopIndex;
