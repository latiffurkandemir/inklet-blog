import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function BlogCard({ blog }) {
  const navigate = useNavigate();
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
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Author: {blog.author_id}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Created at: {new Date(blog.created_at).toLocaleDateString()}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            sx={{
              textTransform: "none",
              "&:hover": {
                backgroundColor: "var(--accent-color)",
                color: "var(--primary-color)",
              },
            }}
            color="secondary"
            size="small"
            variant="outlined"
          >
            Comment
          </Button>
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
          >
            Share
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default BlogCard;
