import React from "react";
import { useColorMode } from "../context/ColorModeContext";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import "../themes/themes";

export default function DarkMode() {
  const { toggleColorMode } = useColorMode();

  return (
    <div style={{ textAlign: "center", margin: ".4rem" }}>
      <FormControlLabel
        control={<Switch onChange={toggleColorMode} color="secondary" />}
        label="Dark Mode"
      />
    </div>
  );
}
