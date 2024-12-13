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
import { postData } from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./LogIn.scss";

function LogIn() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requiredFields = ["username", "password"];
    for (let field of requiredFields) {
      if (!formData[field]) {
        setError(`${capitalize(field)} is required.`);
        setLoading(false);
        return;
      }
    }

    try {
      const result = await postData("api/auth/login", formData);
      console.log("Success:", result);
      if (rememberMe) {
        localStorage.setItem("username", formData.username);
      } else {
        localStorage.removeItem("username");
      }
      navigate("/home");
    } catch (err) {
      setError(err.response?.data || "An error occurred.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setFormData((prevData) => ({ ...prevData, username: storedUsername }));
      setRememberMe(true);
    }
  }, []);

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
                autoFocus
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
                  onChange={handleRememberMeChange}
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
