import React from "react";
import { AppBar, Toolbar, Button, Box, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DarkMode from "./DarkMode";
import "../styles/variables.scss";

function Header() {
  const navigate = useNavigate();
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "var(--primary-color)",
        color: "var(--secondary-color)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Link href={"/"} rel="About">
          <img
            src="/logo512.png"
            alt="Inklet Logo"
            style={{ height: "80px", cursor: "pointer" }}
          />
        </Link>
        <Box>
          <Button
            onClick={() => navigate("/login")}
            color="inherit"
            size="small"
            sx={{ fontWeight: "bold" }}
          >
            Log In
          </Button>
          <Button
            onClick={() => navigate("/signup")}
            color="inherit"
            size="small"
            sx={{
              fontWeight: "bold",
              border: "1px solid var(--secondary-color) ",
              ml: 1,
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
