import React from "react";
import { useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Box,
  useMediaQuery,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import DarkMode from "./DarkMode";

function Settings() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <div className="set-list">      
      <Box sx={{
          mr: isMobile ? 0 : 30,
          p: 3,
          mt: 8,
        }}>
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/password-reset")}>
              <ListItemIcon>
                <LockResetIcon />
              </ListItemIcon>
              <ListItemText primary="Password Reset" secondary="Change your account password" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <DarkMode />
        </List>
      </Box>
    </div>
  );
}

export default Settings;