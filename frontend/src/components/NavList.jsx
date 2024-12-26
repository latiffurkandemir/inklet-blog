import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import CreateIcon from "@mui/icons-material/Create";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/AuthContext";

function NavList() {
  const { logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/home" },
    { text: "Profile", icon: <PersonIcon />, path: "/profile" },
    { text: "Create Blog", icon: <CreateIcon />, path: "/create" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  return (
    <List>
      {menuItems.map((item) => (
        <ListItem
          key={item.text}
          button
          component={Link}
          to={item.path}
          sx={{
            backgroundColor:
              location.pathname === item.path
                ? "var(--accent-color)"
                : "transparent",
            color:
              location.pathname === item.path
                ? "var(--primary-color)"
                : "inherit",
            "&:hover": {
              backgroundColor: "var(--accent-color)",
              color: "var(--primary-color)",
            },
            "& .MuiListItemIcon-root": {
              color:
                location.pathname === item.path
                  ? "var(--primary-color)"
                  : "inherit",
            },
            "&:hover .MuiListItemIcon-root": {
              color: "var(--primary-color)",
            },
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}

      <ListItem
        button
        onClick={logout}
        sx={{
          color: "inherit",
          "& .MuiListItemIcon-root": {
            color: "inherit",
          },
          "&:hover": {
            backgroundColor: "var(--accent-color)",
            color: "var(--primary-color)",
            "& .MuiListItemIcon-root": {
              color: "var(--primary-color)",
            },
          },
        }}
      >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );
}

export default NavList;
