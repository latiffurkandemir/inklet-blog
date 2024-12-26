import React, { useState, useEffect } from "react";
import {
  Box,
  useMediaQuery,
  Stack,
  Typography,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { blogAPI } from "../services/api";
import BlogCard from "./BlogCard";
import EditProfile from "./EditProfile";

function UserProfile() {
  const { user, setUser } = useAuth();
  const [popUp, setPopUp] = useState(false);
  const [userBlogs, setUserBlogs] = useState([]);
  const isMobile = useMediaQuery("(max-width:900px)");

  useEffect(() => {
    const fetchUserBlogs = async () => {
      if (!user?.username) {
        console.log("Username can not found!");
        return;
      }

      try {
        const blogs = await blogAPI.getUserBlog();
        const userPosts = blogs.filter((blog) => blog.author_id === user.id);
        setUserBlogs(userPosts);
      } catch (error) {
        console.error("An error occurred while fetching user blogs:", error);
        setUserBlogs([]);
      }
    };

    if (user?.username) {
      fetchUserBlogs();
    }
  }, []);

  const getInitial = user?.nickname
    ? user.nickname.charAt(0).toUpperCase()
    : "";

  const togglePop = () => {
    setPopUp(!popUp);
  };

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

          <Button
            sx={{
              textTransform: "none",
              "&:hover": {
                backgroundColor: "var(--accent-color)",
                color: "var(--primary-color)",
              },
            }}
            variant="outlined"
            color="secondary"
            size="small"
            onClick={togglePop}
          >
            Edit Profile
          </Button>
          <EditProfile
            userData={user}
            open={popUp}
            togglePop={togglePop}
            onSuccess={(updatedUser) => {
              setUser(updatedUser);
            }}
          />
        </Stack>
        <Divider sx={{ mt: 2, mb: 2, borderColor: "var(--accent-color)" }} />
        {userBlogs.length > 0 ? (
          userBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            There are no blog posts yet. Let's create a few blog posts!
          </Typography>
        )}
      </Box>
    </div>
  );
}

export default UserProfile;
