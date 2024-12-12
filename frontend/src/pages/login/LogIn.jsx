import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import "./LogIn.scss";

function LogIn() {
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
          <Box
            component="form"
            noValidate
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
                variant="outlined"
                color="accent"
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
                variant="outlined"
                color="accent"
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="accent" />}
              label="Remember me"
            />
            <Button
              sx={{
                backgroundColor: "var(--accent-color)",
                color: "var(--primary-color)",
              }}
              type="submit"
              fullWidth
              variant="contained"
            >
              Log In
            </Button>
            <Link
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
