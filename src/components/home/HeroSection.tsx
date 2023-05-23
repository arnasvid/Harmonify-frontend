import { Box, Button, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import CustomButton from "../common/CustomButton";
import heroIcon from "../../assets/heroIcon.png";
import RegisterDialog from "../login/RegisterDialog";
import UserAPI from "../../api/UserApi";
import SpotifyLoginAPI from "../../api/SpotifyLoginApi";
import { useAppSelector } from "../../redux/store/hooks";
import SpotifyInfoAPI from "../../api/SpotifyInfo";
import "./HeroSection.css"

const HeroSection = () => {
  const [open, setOpen] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);

  const isUserLoggedIn = localStorage.getItem("token");
  const isUserLoggedInWithSpotify = useAppSelector(
    (common) => common.common.common.isUserLoggedInWithSpotify
  );

  const [username, setUsername] = React.useState<string>("");

  const [top1Song, setTop1Song] = React.useState<any>();
  useEffect(() => {
    getTop1Song();
  }, []);

  const getTop1Song = async () => {
    let res = await SpotifyInfoAPI.getTop1Song();
    console.log(res);
    setTop1Song(res);
  };

  useEffect(() => {
    getUsername();
  }, []);

  const getUsername = async () => {
    const username = await UserAPI.getUsername();
    setUsername(username);
  };

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
      <Navbar />
      <Container>
        {isUserLoggedIn && isUserLoggedInWithSpotify && (
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
              <Title variant="h1">Watch your music listening habits</Title>
              <Typography
                variant="body2"
                sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
              >
                Want to see more information about your music listening habits?
                Go to your dashboard and check it out!
              </Typography>
              <CustomButton
                backgroundColor="#0F184C"
                buttonColor="#fff"
                buttonText="Dashboard"
                heroBtn={true}
                onClick={() => {
                  window.location.href = "/my-dashboard";
                }}
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
              {top1Song && (
                <Box className="topSong"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    // paddingTop: "4rem",
                    // paddingLeft: "3rem",
                  }}
                >
                    <Typography variant="h5" style={{ color: "#5A6473" }}>
                      Song you listened the most this month
                    </Typography>
                    <br />
                    <img
                      src={top1Song.items[0].album.images[0].url}
                      alt="hero"
                      style={{ maxWidth: "50%", marginBottom: "1rem" }}
                    />
                    <Typography variant="h3" style={{ color: "#5A6473"}}>
                      {top1Song.items[0].artists[0].name}
                    </Typography>
                    <Typography variant="h5" style={{ color: "#5A6473" }}>
                      {top1Song.items[0].name}
                    </Typography>
                </Box>
              )}
            </div>
          </CustomBox>
        )}
        {isUserLoggedIn && !isUserLoggedInWithSpotify && (
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
                Hello, <span style={{ color: "#687690" }}>{username}</span>,
                want to check your listening habits?
              </Title>
              {/* <Typography
                variant="body2"
                sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
              >
                Check out your music taste after connecting your Spotify
                account.
              </Typography> */}
              <CustomButton
                onClick={
                  () => SpotifyLoginAPI.login()
                  // window.location.href = "/api/spotifylogin/login"
                }
                backgroundColor="green"
                buttonColor="#fff"
                buttonText="Connect to Spotify"
                heroBtn={true}
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
        )}
        {!isUserLoggedIn && (
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
                The best way to find your next favorite song
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
        )}
      </Container>
      <RegisterDialog
        open={open}
        handleLoginOpen={onLoginDialogClick}
        handleClose={onSignupDialogClose}
        handleLoginClose={onLoginDialogClose}
      />
    </Box>
  );
};

export default HeroSection;
