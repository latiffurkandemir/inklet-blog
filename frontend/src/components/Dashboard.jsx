import React, { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import BlogCard from "./BlogCard";
import { blogAPI } from "../services/api";

function Dashboard() {
  const isMobile = useMediaQuery("(max-width:900px)");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsData = await blogAPI.getAll();
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="dashboard">
      <Box
        component="main"
        sx={{
          mr: isMobile ? 0 : 30,
          p: 3,
          mt: 8,
        }}
      >
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </Box>
    </div>
  );
}

export default Dashboard;
