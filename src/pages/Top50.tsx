import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import SpotifyInfoAPI from "../api/SpotifyInfo";
import {
  Box,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";
import Footer from "../components/footer/Footer";

const Top50 = () => {
  const [top50, setTop50] = React.useState<any>();

  useEffect(() => {
    getTop50();
  }, []);

  const getTop50 = async () => {
    try {
      const res = await SpotifyInfoAPI.getTop50();
      console.log(res);
      setTop50(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <Typography variant="h4">Top 50 Songs</Typography>
      </Box>
      {top50 && top50.tracks && (
        <Grid container spacing={3} sx={{ marginTop: "20px", paddingLeft: "20px", paddingRight: "20px" }}>
          {top50.tracks.items.map((item: any, index: number) => (
            <Grid item xs={12} sm={6} md={4} key={item.track.id}>
              <Card>
                <CardMedia
                  component="img"
                  alt="album"
                  height="200"
                  image={item.track.album.images[0].url}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {index + 1}. {item.track.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {item.track.artists.map((artist: any) => artist.name).join(", ")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {!top50 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "100px",
          }}
        >
          <CircularProgress size={72} />
        </Box>
      )}
      <Footer />
    </div>
  );
};

export default Top50;
