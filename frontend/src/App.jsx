import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeProvider } from "./context/ColorModeContext";
import { lightTheme, darkTheme } from "./themes/themes";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./pages/about/About";
import SignUp from "./pages/signup/SignUp";
import LogIn from "./pages/login/LogIn";
import MainPage from "./pages/home/MainPage";
import ProfilePage from "./pages/profile/ProfilePage";
import CreateBlog from "./pages/create/CreateBlog";
import Settings from "./pages/settings/Settings";
import PasswordReset from "./pages/password-reset/PasswordReset";
import "./App.scss";

function App() {
  return (
    <AuthProvider>
      <ColorModeProvider>
        {(mode) => (
          <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
            <CssBaseline />
            <div className="App">
              <Routes>
                <Route path="/" element={<About />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<LogIn />} />

                <Route
                  path="/home"
                  element={
                    <ProtectedRoute>
                      <MainPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/create"
                  element={
                    <ProtectedRoute>
                      <CreateBlog />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/password-reset"
                  element={
                    <ProtectedRoute>
                      <PasswordReset />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </ThemeProvider>
        )}
      </ColorModeProvider>
    </AuthProvider>
  );
}

export default App;
