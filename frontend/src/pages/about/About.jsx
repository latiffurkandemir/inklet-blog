import React from "react";
import { Box, Typography } from "@mui/material";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./About.scss";

function About() {
  return (
    <div className="about">
      <Header />
      <div className="content">
        <Box sx={{ textAlign: "center" }}>
          <Typography
            fontStyle="bold"
            fontFamily="Roboto"
            color="white"
            variant="h1"
            gutterBottom
          >
            INKLET
          </Typography>
          <Typography
            color="white"
            variant="h4"
            fontStyle="italic"
            fontFamily="Roboto"
            gutterBottom
          >
            "The Ink behind every story."
          </Typography>
        </Box>
      </div>
      <Footer />
    </div>
  );
}

export default About;
