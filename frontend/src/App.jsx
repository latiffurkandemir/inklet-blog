import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeProvider } from "./context/ColorModeContext";
import { lightTheme, darkTheme } from "./themes/themes";
import { Routes, Route } from "react-router-dom";
import About from "./pages/about/About";
import SignUp from "./pages/signup/SignUp";
import LogIn from "./pages/login/LogIn";
import PasswordReset from "./pages/password-reset/PasswordReset";
import "./App.scss";

function App() {
  return (
    <ColorModeProvider>
      {(mode) => (
        <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
          <CssBaseline />
          <div className="App">
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/password-reset" element={<PasswordReset />} />
            </Routes>
          </div>
        </ThemeProvider>
      )}
    </ColorModeProvider>
  );
}

export default App;
