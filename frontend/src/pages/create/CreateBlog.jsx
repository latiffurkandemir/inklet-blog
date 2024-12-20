import React, { useState } from "react";
import Aside from "../../components/Aside";
import NavBar from "../../components/NavBar";
import BlogForm from "../../components/BlogForm";

function CreateBlog() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="create">
      <NavBar onMenuClick={handleDrawerToggle} />
      <Aside isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
      <BlogForm />
    </div>
  );
}

export default CreateBlog;
