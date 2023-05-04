import React from "react";
import { Box, Button, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import SpotifyLogo from "../../assets/SpotifyLogo.png";
import StatisticsIcon from "../../assets/statistics.png";

const CustomImage = styled("img")(({ theme }) => ({
  maxWidth: "50%",
}));

const FeatureSection = () => {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          marginTop: "50px",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Features
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          gap: "20px",
          // marginTop: "25px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            marginTop: "50px",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Statistics
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold", color: "#687690", marginLeft: "10%" }}>
            Get to know your music taste and share it with your friends. Harmonify will analyze your Spotify data and give you insights about your music taste.
          </Typography>
          <CustomImage src={SpotifyLogo} alt="illustration" />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            marginTop: "50px",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Find new music
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold", color: "#687690", marginLeft: "10%" }}>
            Discover new music based on your music taste. Harmonify will recommend you new songs and artists based on your music taste.
          </Typography>
          <CustomImage src={SpotifyLogo} alt="illustration" />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: "50px" }}>
          Share your favorite tracks
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold", color: "#687690", marginTop: "20px"}}>
          Interact with others, see what they are listening to and share your favorite tracks with them.
        </Typography>
        <CustomImage src={SpotifyLogo} alt="illustration" sx= {{ maxWidth: "24.55%", marginTop: "20px" }} />
      </Box>
    </Container>
  );
};

export default FeatureSection;
