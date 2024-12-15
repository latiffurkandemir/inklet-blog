import React from "react";
import { ListItem, ListItemText, ListItemIcon } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CreateIcon from "@mui/icons-material/Create";
import SettingsIcon from "@mui/icons-material/Settings";

const navItems = [
  { text: "Home", icon: <HomeIcon />, route: "/home" },
  { text: "Profile", icon: <AccountCircleIcon />, route: "/profile" },
  { text: "Create Blog", icon: <CreateIcon />, route: "/create" },
  { text: "Settings", icon: <SettingsIcon />, route: "/settings" },
];

function NavItem({ text, icon, onClick }) {
  return (
    <ListItem button onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
}

export default function NavList({ handleNavigation }) {
  return (
    <>
      {navItems.map(({ text, icon, route }) => (
        <NavItem
          key={route}
          text={text}
          icon={icon}
          onClick={() => handleNavigation(route)}
        />
      ))}
    </>
  );
}
