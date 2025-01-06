import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  Container,
  Divider,
  useMediaQuery,
} from "@mui/material";
import NavBar from "../../components/NavBar";
import Aside from "../../components/Aside";
import { blogAPI } from "../../services/api";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await blogAPI.getByBlogId(id);
        setBlog(blogData);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return null;

  return (
    <div className="blog-detail">
      <NavBar onMenuClick={handleDrawerToggle} />
      <Aside isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
      <Box
        component="main"
        sx={{
          mr: isMobile ? 0 : 30,
          p: 3,
          mt: 8,
        }}
      >
        <Container maxWidth="md">
          <Paper elevation={0} sx={{ p: 3, backgroundColor: "transparent" }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ color: "var(--secondary-color)" }}
            >
              {blog.title}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ mb: 2, color: "var(--accent-color)" }}
            >
              By {blog.username}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography
              variant="body1"
              sx={{
                whiteSpace: "pre-wrap",
                color: "var(--secondary-color)",
                lineHeight: 1.8,
              }}
            >
              {blog.content}
            </Typography>
          </Paper>
        </Container>
      </Box>
    </div>
  );
}

export default BlogDetail;