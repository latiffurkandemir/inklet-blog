import React from "react";
import { useColorMode } from "../context/ColorModeContext";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function DarkMode() {
  const { toggleColorMode } = useColorMode();

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <FormControlLabel
        control={<Switch onChange={toggleColorMode} color="primary" />}
        label="Dark Mode"
      />
    </div>
  );
}
