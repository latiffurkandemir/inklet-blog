import React from "react";
import Aside from "../../components/Aside";
import Dashboard from "../../components/Dashboard";

function MainPage() {
  return (
    <div className="main-page">
      <Aside />
      <Dashboard />
    </div>
  );
}

export default MainPage;
