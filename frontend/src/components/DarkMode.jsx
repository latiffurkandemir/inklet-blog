import React from "react";
import { useColorMode } from "../context/ColorModeContext";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import "../themes/themes";

export default function DarkMode() {
  const { toggleColorMode } = useColorMode();

  return (
    <ListItem disablePadding>
        <ListItemButton onClick={toggleColorMode}>
          <ListItemIcon>
            <DarkModeIcon />
          </ListItemIcon>
          <ListItemText primary="Dark Mode" secondary="Toggle dark/light theme" />
        </ListItemButton>
      </ListItem>
  );
}
