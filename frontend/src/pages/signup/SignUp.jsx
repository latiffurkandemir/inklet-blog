import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormLabel,
  FormControl,
  Link,
  TextField,
  Typography,
  Card,
  Stack,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { userAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./SignUp.scss";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const requiredFields = ["email", "nickname", "username", "password"];
    for (let field of requiredFields) {
      if (!formData[field]) {
        setError(`${capitalize(field)} is required.`);
        setLoading(false);
        return;
      }
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      );
      setLoading(false);
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(formData.username)) {
      setError(
        "Username must be 3-20 characters long and can only contain letters, numbers, and underscores."
      );
      setLoading(false);
      return;
    }

    try {
      await userAPI.signup(formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="sign-up">
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
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
            onSubmit={handleSubmit}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                type="email"
                name="email"
                placeholder="user@mail.com"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color="accent"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="nickname">Full Name</FormLabel>
              <TextField
                id="nickname"
                type="text"
                name="nickname"
                placeholder="John Doe"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color="accent"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextField
                id="username"
                type="text"
                name="username"
                placeholder="john_doe"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color="accent"
                onChange={handleChange}
                helperText="Username must be 3-20 characters long and can only contain letters, numbers, and underscores."
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                name="password"
                placeholder="••••••"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color="accent"
                onChange={handleChange}
                helperText="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
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
                "Sign Up"
              )}
            </Button>
          </Box>
          <Divider>or</Divider>
          <Typography sx={{ textAlign: "center" }}>
            Have an account?{" "}
            <Link
              href="/login"
              variant="body2"
              sx={{ color: "var(--accent-color)", alignSelf: "center" }}
            >
              Log In
            </Link>
          </Typography>
        </Card>
      </Stack>
    </div>
  );
}

export default SignUp;
