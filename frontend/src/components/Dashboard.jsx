import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import BlogCard from "./BlogCard";

function Dashboard() {
  const isMobile = useMediaQuery("(max-width:900px)");

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
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </Box>
    </div>
  );
}

export default Dashboard;
