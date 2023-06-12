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

const NewReleases = () => {
  const [newReleases, setNewReleases] = React.useState<any>();

  useEffect(() => {
    getNewReleases();
  }, []);

  const getNewReleases = async () => {
    try {
      const res = await SpotifyInfoAPI.getNewReleases();
      console.log(res);
      setNewReleases(res);
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
        <Typography variant="h4">New Releases</Typography>
      </Box>
      {newReleases && newReleases.albums && (
        <Grid container spacing={3} sx={{ marginTop: "20px", paddingLeft: "20px", paddingRight: "20px" }}>
          {newReleases.albums.items.map((item: any, index: number) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <CardMedia
                  component="img"
                  alt="album"
                  height="200"
                  image={item.images[0].url}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {item.artists.map((artist: any) => artist.name).join(", ")}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    Type: {item.album_type}
                  </Typography>
                  {/* <Typography variant="subtitle2" color="text.secondary">
                    Release Date: {item.release_date}
                  </Typography> */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {!newReleases && (
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

export default NewReleases;
