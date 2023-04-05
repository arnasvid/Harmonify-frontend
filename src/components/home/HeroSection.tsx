import React from "react";
import { Button } from "@mui/material";
import "./HeroSection.css";
import { Typography } from "@mui/material";
import "@fontsource/roboto";
import RegisterDialog from "../login/RegisterDialog";
import LoginDialog from "../login/LoginDialog";
import FilterHdrIcon from "@mui/icons-material/FilterHdr";

const HeroSection = () => {
  const [open, setOpen] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);


  const onSignupDialogClick = () => {
    setOpen(true);
  };

  const onSignupDialogClose = () => {
    setOpen(false);
  };

  const onLoginDialogClick = () => {
    setOpenLogin(true);
  };

  const onLoginDialogClose = () => {
    setOpenLogin(false);
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
          onClick={onSignupDialogClick}
          className="buttonStyle"
          id="primaryButton"
        >
          Sign Up
        </Button>
        <Button
          id="loginButton"
          variant="contained"
          color="secondary"
          onClick={onLoginDialogClick}
          className="buttonStyle"
        >
          Login
        </Button>
      </div>
      <RegisterDialog open={open} handleLoginOpen={onLoginDialogClick} handleClose={onSignupDialogClose} />
      <LoginDialog open={openLogin} handleRegisterOpen={onSignupDialogClick} handleClose={onLoginDialogClose} handleRegisterClose={onSignupDialogClose}/>
    </section>
  );
};

export default HeroSection;
