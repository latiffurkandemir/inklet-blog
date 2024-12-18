import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  FormLabel,
  FormControl,
  Link,
  TextField,
  Typography,
  Card,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import { login } from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./LogIn.scss";

function LogIn() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setFormData((prevData) => ({ ...prevData, username: storedUsername }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.username || !formData.password) {
      setError("Username and Password are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await login(formData);
      console.log("Login response:", response);

      if (!response.data) {
        setError("Token alınamadı!");
        return;
      }

      localStorage.setItem("token", response.data);

      if (rememberMe) {
        localStorage.setItem("username", formData.username);
      } else {
        localStorage.removeItem("username");
      }

      console.log("Token saved, navigating to home...");

      setTimeout(() => {
        navigate("/home", { replace: true });
      }, 100);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Giriş başarısız!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="log-in">
      <Stack
        direction="column"
        justifyContent="space-between"
        sx={{ width: "90%", maxWidth: "400px" }}
      >
        <Box
          sx={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
          }}
        />
        <Card
          sx={{
            padding: "16px",
            color: "var(--secondary-color)",
            backgroundColor: "var(--primary-color)",
          }}
        >
          <img
            src="/logo512.png"
            alt="Inklet Logo"
            style={{ height: "80px", cursor: "pointer" }}
          />
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextField
                id="username"
                type="text"
                name="username"
                placeholder="Enter username"
                autoFocus
                required
                fullWidth
                value={formData.username}
                variant="outlined"
                color="accent"
                onChange={handleChange}
                autoComplete="username"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                value={formData.password}
                variant="outlined"
                color="accent"
                onChange={handleChange}
              />
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="accent"
                />
              }
              label="Remember me"
            />
            <Button
              sx={{ color: "var(--primary-color)" }}
              color="accent"
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Log In"
              )}
            </Button>
            <Link
              href="/password-reset"
              component="button"
              type="button"
              variant="body2"
              sx={{ alignSelf: "center", color: "var(--accent-color)" }}
            >
              Forgot your password?
            </Link>
          </Box>
          <Divider>or</Divider>
          <Typography sx={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <Link
              href="/signup"
              variant="body2"
              sx={{ color: "var(--accent-color)", alignSelf: "center" }}
            >
              Sign up
            </Link>
          </Typography>
        </Card>
      </Stack>
    </div>
  );
}

export default LogIn;
