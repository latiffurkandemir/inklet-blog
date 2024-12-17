import React, { useState } from "react";
import Aside from "../../components/Aside";
import NavBar from "../../components/NavBar";
import UserProfile from "../../components/UserProfile";

function ProfilePage() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="profile-page">
      <NavBar onMenuClick={handleDrawerToggle} />
      <Aside isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} />
      <UserProfile />
    </div>
  );
}

export default ProfilePage;
