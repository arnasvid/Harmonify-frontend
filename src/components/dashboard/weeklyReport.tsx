import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import SpotifyDashboardAPI from "../../api/SpotifyDashboardAPI";
import { ArtistObject } from "../../models/spotify/ArtistObject";
import TrackObject from "../../models/spotify/TrackObject";
import ScrobbleAPI from "../../api/ScrobbleAPI";
import WeeklyGenres from "./weeklyGenres";

const WeeklyReport = () => {
  const [weeklyArtist, setWeeklyArtist] = React.useState<any>();
  const [weeklySong, setWeeklySong] = React.useState<any>();

  useEffect(() => {
    getWeeklyArtist();
  }, []);

  const getWeeklyArtist = async () => {
    try {
      const res = await ScrobbleAPI.getTopWeeklyArtists();
      console.log(res);
      setWeeklyArtist(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWeeklySong();
  }, []);

  const getWeeklySong = async () => {
    try {
      const res = await ScrobbleAPI.getWeeklyActivity();
      console.log(res);
      setWeeklySong(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: "20px" }}>
            Weekly Artists
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            {weeklyArtist?.map((artist: ArtistObject, index: number) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <img
                  src={artist.images[0].url}
                  alt="artist"
                  width="200"
                  height="200"
                />
                <Typography variant="body1">{artist.name}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: "20px" }}>
            Weekly Songs
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            {weeklySong?.map((song: TrackObject, index: number) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <img
                  src={song.album.images[0].url}
                  alt="artist"
                  width="200"
                  height="200"
                />
                <Typography variant="body1">{song.name}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography
          variant="h6"
          sx={{
            marginBottom: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Genres
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <WeeklyGenres />
        </Box>
      </Box>
    </Box>
  );
};

export default WeeklyReport;
