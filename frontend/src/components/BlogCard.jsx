import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import mock from "../assets/mocks/mock2.jpg";

function BlogCard() {
  return (
    <div className="blog-card">
      <Card
        sx={{
          maxHeight: 600,
          borderBottom: "2px solid var(--accent-color)",
          marginBottom: 1,
        }}
      >
        <CardMedia component="img" height="150" image={mock} alt="Image" />
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
            Lorem ipsum dolor sit amet,
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
            consectetur adipiscing elit. Nulla diam turpis, pulvinar at tempor
            venenatis, ultrices sit amet enim. In at sapien est. Aenean
            dignissim, erat a suscipit fermentum, lacus ipsum tincidunt nunc,
            nec varius turpis lectus et urna. Nullam tristique diam turpis, sed
            pellentesque massa ullamcorper quis. Etiam ullamcorper feugiat
            eleifend. Sed efficitur, ante vel molestie ultrices, massa massa
            ultricies dolor, vel posuere tellus eros eu augue. Proin tempus quis
            turpis ac aliquet.
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
