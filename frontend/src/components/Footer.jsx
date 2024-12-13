import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "../styles/variables.scss";

function Footer() {
  return (
    <div>
      <Box
        width="sm"
        component="footer"
        sx={{
          backgroundColor: "var(--primary-color)",
          color: "var(--secondary-color)",
          py: 1,
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2">
            © 2024 Inklet Blog. All rights reserved.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              mt: 2,
              flexWrap: "wrap",
            }}
          >
            {[
              {
                name: "erengalipun",
                github: "https://github.com/erengalipun",
                linkedin: "https://linkedin.com/in/erengalipun",
              },
              {
                name: "latiffurkandemir",
                github: "https://github.com/latiffurkandemir",
                linkedin: "https://linkedin.com/in/latiffurkan-demir",
              },
            ].map((user, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: "#424242",
                  borderRadius: 2,
                  padding: 1,
                  textAlign: "center",
                  color: "white",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  width: "144px",
                }}
              >
                <Typography variant="h9" sx={{ mb: 1 }}>
                  {user.name}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                  <Link
                    href={user.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHubIcon sx={{ color: "white", fontSize: 24 }} />
                  </Link>
                  <Link
                    href={user.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedInIcon sx={{ color: "white", fontSize: 24 }} />
                  </Link>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default Footer;
