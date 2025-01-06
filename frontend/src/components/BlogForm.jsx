import React, { useState } from "react";
import {
  useMediaQuery,
  Stack,
  FormControl,
  FormLabel,
  TextField,
  Box,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import { blogAPI } from "../services/api";

function BlogForm() {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await blogAPI.create(blog);
      console.log("Blog created:", result);
      setBlog({ title: "", content: "" });
      setShowSuccess(true);
    } catch (err) {
      setError(err.response?.data || "An error occurred.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSuccess(false);
  };

  return (
    <div>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mr: isMobile ? 0 : 30,
          p: 3,
          mt: 8,
        }}
      >
        <Stack spacing={2}>
          <FormControl fullWidth>
            <FormLabel htmlFor="blog-title">Title: </FormLabel>
            <TextField
              id="title"
              type="text"
              name="title"
              value={blog.title || ""}
              placeholder="Enter a catchy title for your blog..."
              autoFocus
              required
              fullWidth
              variant="outlined"
              color="accent"
              inputProps={{ maxLength: 100 }}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel htmlFor="blog-content">Content: </FormLabel>
            <TextField
              id="content"
              type="text"
              name="content"
              value={blog.content || ""}
              placeholder="Write the content of your blog here. Start with an inspiring opening!"
              required
              multiline
              fullWidth
              variant="outlined"
              color="accent"
              inputProps={{ maxLength: 1000 }}
              onChange={handleChange}
              sx={{
                "& .MuiInputBase-root": {
                  height: "50vh",
                },
                "& .MuiInputBase-input": {
                  height: "100% !important",
                },
              }}
            />
          </FormControl>
          <Button
            sx={{
              textTransform: "none",
              "&:hover": {
                backgroundColor: "var(--accent-color)",
                color: "var(--primary-color)",
              },
            }}
            disabled={loading}
            type="submit"
            variant="outlined"
            color="secondary"
            size="small"
          >
            {loading ? "Posting..." : "Post"}
          </Button>
          {error && <Box sx={{ color: "error.main", mt: 2 }}>{error}</Box>}
        </Stack>
      </Box>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Post successfully created!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default BlogForm;
