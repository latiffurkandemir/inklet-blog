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
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./LogIn.scss";

function LogIn() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
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

    try {
      if (!formData.username || !formData.password) {
        throw new Error("Username and password are required.");
      }

      await login(formData);
      navigate("/home", { replace: true });
    } catch (err) {
      console.error("Login error details:", {
        message: err.message,
        response: err.response,
        config: err.config,
      });

      setError(
        err.response?.data?.message ||
          err.message ||
          "Login failed. Please try again."
      );
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
              component={Link}
              to="/password-reset"
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
