import React, { useEffect } from "react";
import SpotifyPersonalAPI from "../../api/SpotifyPersonalAPI";
import {
  Box,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";

const RecentlyPlayedTracks = () => {
  const [recentlyPlayed, setRecentlyPlayed] = React.useState<any>([]);

  useEffect(() => {
    getRecentlyPlayed();
  }, []);

  const getRecentlyPlayed = async () => {
    try {
      const res = await SpotifyPersonalAPI.getRecentlyPlayed();
      console.log(res);
      setRecentlyPlayed(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
        Recently Played Tracks
      </Typography>
      {recentlyPlayed && recentlyPlayed.items ? (
        <Grid container spacing={2}>
          {recentlyPlayed.items.map((item: any) => (
            <Grid item xs={6} sm={4} md={3} key={item.track.id}>
              <Card sx={{ display: "flex", flexDirection: "column" }}>
                <CardMedia
                  component="img"
                  height="100"
                  image={item.track.album.images[0].url}
                  alt="album"
                  // sx={{ objectFit: "contain" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" sx={{ marginBottom: "8px" }}>
                    {item.track.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.track.artists[0].name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default RecentlyPlayedTracks;
