import React, { useState, useEffect } from "react";
import {
  Drawer,
  Box,
  Divider,
  useMediaQuery,
  Typography,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppBar from "./AppBar";
import NavList from "./NavList";
import { getUserProfile } from "../services/api";

function Aside() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
      } catch (error) {
        console.error("Couldn't retrieve user information:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="aside-menu">
      <AppBar
        user={user}
        loading={loading}
        onMenuClick={() => setDrawerOpen(true)}
      />

      <Drawer
        variant="temporary"
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: 240,
          },
          zIndex: 1301,
        }}
      >
        <Box
          sx={{ width: 240, borderLeft: "1px solid var(--accent-color)" }}
          role="presentation"
          onClick={() => setDrawerOpen(false)}
          onKeyDown={() => setDrawerOpen(false)}
        >
          {loading ? (
            <Box sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="body1">Loading...</Typography>
            </Box>
          ) : (
            <Box sx={{ p: 2, textAlign: "center" }}>
              <Avatar
                src={user?.profilePhoto}
                alt="Profile Photo"
                sx={{ width: 80, height: 80, margin: "0 auto" }}
              />
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
            mt: 4,
            borderLeft: "1px solid var(--accent-color)",
          }}
        >
          {loading ? (
            <Box sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="body1">Loading...</Typography>
            </Box>
          ) : (
            <Box sx={{ p: 2, textAlign: "center" }} />
          )}
          <NavList handleNavigation={handleNavigation} />
        </Box>
      )}
    </div>
  );
}

export default Aside;
