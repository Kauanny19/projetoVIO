import React from "react";
import Box from "@mui/material/Box";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#9c009c",
        width: "100%",
        height: "30px",
        position: "fixed",
        bottom: 0,
      }}
    />
  );
};
export default Footer;