import React from "react";
import {
  Drawer,
  Box,
  Divider,
  useMediaQuery,
  Typography,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavList from "./NavList";
import { useUser } from "../context/UserContext";

function Aside({ isOpen, onClose }) {
  const { user, loading, logout: handleLogout } = useUser();
  const isMobile = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();

  const getInitial = user?.nickname
    ? user.nickname.charAt(0).toUpperCase()
    : "";

  const handleNavigation = async (route) => {
    if (route === "/logout") {
      await handleLogout();
      navigate("/login");
      return;
    }
    navigate(route);
  };

  return (
    <div className="aside-menu">
      <Drawer
        variant="temporary"
        anchor="right"
        open={isOpen}
        onClose={onClose}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 240,
          },
          zIndex: 1301,
        }}
      >
        <Box
          sx={{ width: 240, borderLeft: "1px solid var(--accent-color)" }}
          role="presentation"
          onClick={() => onClose()}
          onKeyDown={() => onClose()}
        >
          {loading ? (
            <Box sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="body1">Loading...</Typography>
            </Box>
          ) : (
            <Box sx={{ p: 2, textAlign: "center" }}>
              <IconButton
                edge="end"
                color="primary"
                aria-label="menu"
                sx={{
                  display: "block",
                  color: "var(--primary-color)",
                  backgroundColor: "var(--accent-color)",
                  width: "60px",
                  height: "60px",
                  margin: "0 auto",
                  borderRadius: "50%",
                  "&:hover": {
                    backgroundColor: "var(--accent-color)",
                    opacity: 0.8,
                  },
                }}
              >
                <Typography color="white" sx={{ fontSize: "1.2rem" }}>
                  {getInitial}
                </Typography>
              </IconButton>
              <Typography variant="h6" sx={{ mt: 1 }}>
                {user?.nickname || "Nickname"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.username || "Username"}
              </Typography>
            </Box>
          )}
          <Divider sx={{ borderColor: "var(--accent-color)" }} />
          <NavList handleNavigation={handleNavigation} />
        </Box>
      </Drawer>

      {!isMobile && (
        <Box
          sx={{
            position: "fixed",
            width: 240,
            height: "100vh",
            right: 0,
            top: 0,
            mt: 8,
            borderLeft: "1px solid var(--accent-color)",
          }}
        >
          {loading ? (
            <Box sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="body1">Loading...</Typography>
            </Box>
          ) : (
            <Box sx={{ p: 2, textAlign: "center" }}>
              <IconButton
                edge="end"
                color="primary"
                aria-label="menu"
                sx={{
                  display: "block",
                  color: "var(--primary-color)",
                  backgroundColor: "var(--accent-color)",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  margin: "0 auto",
                  "&:hover": {
                    backgroundColor: "var(--accent-color)",
                    opacity: 0.8,
                  },
                }}
              >
                <Typography color="white" sx={{ fontSize: "1.2rem" }}>
                  {getInitial}
                </Typography>
              </IconButton>
              <Typography variant="h6" sx={{ mt: 1 }}>
                {user?.nickname || "Nickname"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.username || "Username"}
              </Typography>
            </Box>
          )}
          <Divider sx={{ borderColor: "var(--accent-color)" }} />
          <NavList handleNavigation={handleNavigation} />
        </Box>
      )}
    </div>
  );
}

export default Aside;
