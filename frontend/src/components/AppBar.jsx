import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Typography,
  Link,
} from "@mui/material";

function AppBarComponent({ user, loading, onMenuClick }) {
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
            >
              <Avatar src={user?.profilePhoto} alt="Profile Photo" />
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default AppBarComponent;
