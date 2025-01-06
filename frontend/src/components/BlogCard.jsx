import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function BlogCard({ blog }) {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowSuccess(false);
  };

  if (!blog) return null;
  return (
    <div className="blog-card">
      <Card
        sx={{
          maxHeight: 600,
          borderBottom: "2px solid var(--accent-color)",
          marginBottom: 1,
        }}
      >
        <CardContent>
          <Typography
            sx={{
              cursor: "pointer",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            gutterBottom
            variant="h5"
            component="div"
            onClick={() => navigate(`/blog/${blog.id}`)}
          >
            {blog.title}
          </Typography>
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            variant="body2"
            color="text.secondary"
          >
            {blog.content}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
            sx={{
              textTransform: "none",
              "&:hover": {
                backgroundColor: "var(--accent-color)",
                color: "var(--primary-color)",
              },
            }}
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => {
              const blogUrl = `${window.location.origin}/blog/${blog.id}`;
              navigator.clipboard.writeText(blogUrl);
              setShowSuccess(true);
            }}
          >
            Share
          </Button>
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
              Blog link copied to clipboard!
            </Alert>
          </Snackbar>
        </CardActions>
      </Card>
    </div>
  );
}

export default BlogCard;
