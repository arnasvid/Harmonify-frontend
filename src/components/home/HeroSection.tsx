import { Box, Button, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Navbar from "../Navbar/Navbar";
import CustomButton from "../common/CustomButton";
import heroIcon from "../../assets/heroIcon.png";
import RegisterDialog from "../login/RegisterDialog";
import LoginDialog from "../login/LoginDialog";

const HeroSection = () => {
    const [open, setOpen] = React.useState(false);
    const [openLogin, setOpenLogin] = React.useState(false);

    const onLoginDialogClick = () => {
      setOpenLogin(true);
    };
  
    const onLoginDialogClose = () => {
      setOpenLogin(false);
    };

    const onSignupDialogClick = () => {
        setOpen(true);
    };
    
    const onSignupDialogClose = () => {
        setOpen(false);
    };

  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  return (
    <Box sx={{ minHeight: "80vh", width: "100%" }}>
      <Container>
        <Navbar />
        <CustomBox>
          <Box sx={{ flex: "1" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                color: "#687690",
                fontWeight: "500",
                mt: 10,
                mb: 4,
              }}
            >
              Welcome to Harmonify
            </Typography>
            <Title variant="h1">
              The best way to find your next favorite song.
            </Title>
            <Typography
              variant="body2"
              sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
            >
              Harmonify is a music discovery platform that helps you find new
              music based on your favorite songs.
            </Typography>
            <CustomButton
              backgroundColor="#0F184C"
              buttonColor="#fff"
              buttonText="Register"
              heroBtn={true}
              onClick={onSignupDialogClick}
            />
          </Box>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: "1.25",
            }}
          >
            <img
              src={heroIcon}
              alt="hero"
              style={{ maxWidth: "80%", marginBottom: "2rem" }}
            />
          </div>
        </CustomBox>
      </Container>
      <RegisterDialog
        open={open}
        handleLoginOpen={onLoginDialogClick}
        handleClose={onSignupDialogClose}
      />
    </Box>
  );
};

export default HeroSection;
