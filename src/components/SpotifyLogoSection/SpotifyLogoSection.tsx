import { Button, styled, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import SpotifyLogo from "../../assets/spotifyLogo.png";
import CustomButton from "../common/CustomButton";

const SpotifyLogoSection = () => {
  const CustomContainer = styled(Container)(({ theme }) => ({
    backgroundColor: "#ffffff",
    height: "208px",
    minHeight: "150px",
    minWidth: "100vw",
    // borderRadius: "15px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      height: "auto",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(0, 3, 0, 3),
      width: "90%",
    },
  }));

  const CustomBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(10, 0, 0, 0),
    margin: theme.spacing(0, 0, 0, 0),
    [theme.breakpoints.down("md")]: {
      padding: "0",
    },
  }));

  const CustomImage = styled("img")(({ theme }) => ({
    maxWidth: "22%",
    marginLeft: "0",
    marginTop: "20px",
    [theme.breakpoints.up("md")]: {
        marginLeft: "0",
        marginTop: "0",
        paddingRight: "110px",
    },
}));


  return (
    <CustomBox>
      <CustomContainer>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "16px", md: "23px" },
              // color: "#5A6473",
              color: "#000336",
              opacity: "0.8",
              fontWeight: "700",
              flexWrap: "wrap",
              flex: "0.5",
              marginLeft: { xs: "0", md: "90px" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Connect your Spotify account and get your music statistics everyday!
          </Typography>
          <CustomImage
            src={SpotifyLogo}
            alt="illustration"
          />
        </Box>
      </CustomContainer>
    </CustomBox>
  );
};

export default SpotifyLogoSection;
