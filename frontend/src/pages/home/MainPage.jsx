import React, { useState } from "react";
import Aside from "../../components/Aside";
import NavBar from "../../components/NavBar";
import Dashboard from "../../components/Dashboard";

function MainPage() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="main-page">
      <NavBar onMenuClick={handleDrawerToggle} />
      <Aside isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
      <Dashboard />
    </div>
  );
}

export default MainPage;
