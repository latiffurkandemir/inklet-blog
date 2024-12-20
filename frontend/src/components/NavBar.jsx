import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Link } from "@mui/material";
import { useUser } from "../context/UserContext";

function NavBar({ onMenuClick }) {
  const { user, loading } = useUser();

  const getInitial = user?.nickname
    ? user.nickname.charAt(0).toUpperCase()
    : "";

  return (
    <AppBar position="fixed" sx={{ zIndex: 1300 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton edge="start" color="primary" aria-label="profile-menu">
          <Link href={"/home"} rel="Home">
            <img
              src="/inkicon.ico"
              alt="Inklet Logo"
              style={{
                height: "40px",
                cursor: "pointer",
              }}
            />
          </Link>
        </IconButton>

        {loading ? (
          <Typography variant="body1" color="inherit">
            Loading...
          </Typography>
        ) : (
          <>
            <IconButton
              edge="end"
              color="primary"
              aria-label="menu"
              onClick={onMenuClick}
              sx={{
                display: {
                  xs: "block",
                  md: "none",
                },
                color: "var(--primary-color)",
                backgroundColor: "var(--accent-color)",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                mr: 0.4,
                "&:hover": {
                  backgroundColor: "var(--accent-color)",
                  opacity: 0.8,
                },
              }}
            >
              <Typography color="white" sx={{ fontSize: "1rem" }}>
                {getInitial}
              </Typography>
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
