import React from "react";
import { Button } from "@mui/material";
import "./HeroSection.css";
import { Typography } from "@mui/material";
import "@fontsource/roboto";
import FilterHdrIcon from "@mui/icons-material/FilterHdr";

const HeroSection = () => {
  const onSignupClick = () => {
    // redirect to signup page 
    null;
  };

  const onLoginClick = () => {
    // redirect to login page
    null;
  };

  return (
    <section className="heroSectionStyle">
      <div className="welcome-text">
        <Typography
          variant="h1"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Harmonify
        </Typography>
      </div>
      <Typography
            variant="h2"
            sx={{
              mr: 0,
              display: { xs: "flex", md: "none" },
              flexGrow: 0,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Harmonify
          </Typography>
      <div className="buttonContainerStyle">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={onSignupClick}
          className="buttonStyle"
          id="primaryButton"
        >
          Sign Up
        </Button>
        <Button
          id="loginButton"
          variant="contained"
          color="secondary"
          onClick={onLoginClick}
          className="buttonStyle"
        >
          Login
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
