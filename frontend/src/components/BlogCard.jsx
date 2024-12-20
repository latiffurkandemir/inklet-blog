import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

function BlogCard({ blog }) {
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
