import React from "react";
import {
  Box,
  useMediaQuery,
  Stack,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { useUser } from "../context/UserContext";
import BlogCard from "./BlogCard";

function UserProfile() {
  const { user } = useUser();
  const isMobile = useMediaQuery("(max-width:900px)");

  const getInitial = user?.nickname
    ? user.nickname.charAt(0).toUpperCase()
    : "";

  return (
    <div className="user-profile">
      <Box
        component="main"
        sx={{
          mr: isMobile ? 0 : 30,
          p: 3,
          mt: 8,
        }}
      >
        <Stack spacing={1} alignItems="flex-start" sx={{ ml: 4 }}>
          <IconButton
            edge="end"
            color="primary"
            aria-label="menu"
            sx={{
              display: "block",
              color: "var(--primary-color)",
              backgroundColor: "var(--accent-color)",
              width: "100px",
              height: "100px",
              margin: "0 auto",
              borderRadius: "50%",
              cursor: "inherit",
              "&:hover": {
                backgroundColor: "var(--accent-color)",
                opacity: 1,
              },
            }}
          >
            <Typography color="white" sx={{ fontSize: "1.8rem" }}>
              {getInitial}
            </Typography>
          </IconButton>

          <Typography variant="h4" fontWeight="bold">
            {user?.nickname}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            {user?.username}
          </Typography>
        </Stack>
        <Divider sx={{ mt: 2, mb: 2, borderColor: "var(--accent-color)" }} />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </Box>
    </div>
  );
}

export default UserProfile;
