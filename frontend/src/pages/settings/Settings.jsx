import React, { useState } from "react";
import Aside from "../../components/Aside";
import NavBar from "../../components/NavBar";

function Settings() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="settings">
      <NavBar onMenuClick={handleDrawerToggle} />
      <Aside isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}

export default Settings;
