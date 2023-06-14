import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import SpotifyDashboardAPI from "../../api/SpotifyDashboardAPI";
import { ArtistObject } from "../../models/spotify/ArtistObject";
import TrackObject from "../../models/spotify/TrackObject";
import { all } from "axios";
import { CircularProgress } from "@mui/material";
import AllTimeGenres from "./allTimeGenres";

const allTimeReport = () => {
  const [allTimeArtist, setAllTimeArtist] = React.useState<any>();
  const [allTimeSong, setAllTimeSong] = React.useState<any>();

  useEffect(() => {
    getAllTimeArtist();
  }, []);

  const getAllTimeArtist = async () => {
    try {
      const res = await SpotifyDashboardAPI.getAllTimeArtists();
      console.log(res);
      setAllTimeArtist(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTimeSong();
  }, []);

  const getAllTimeSong = async () => {
    try {
      const res = await SpotifyDashboardAPI.getAllTimeSongs();
      console.log(res);
      setAllTimeSong(res);
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
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexGrow: 1,
            minWidth: 0,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            Top 5 Artists
          </Typography>
          {allTimeArtist && (
            <Box>
              {allTimeArtist.items.map(
                (artist: ArtistObject, index: number) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                      padding: "10px",
                      borderRadius: "8px",
                      backgroundColor: index === 0 ? "#0F184C" : "#ffffff",
                    }}
                  >
                    <Typography
                      variant={index === 0 ? "h5" : "body1"}
                      sx={{
                        marginRight: "10px",
                        fontWeight: "bold",
                        color: index === 0 ? "#ffffff" : "#000000",
                      }}
                    >
                      {index + 1}
                    </Typography>
                    <div>
                      <Typography
                        variant={index === 0 ? "h5" : "body1"}
                        sx={{
                          marginBottom: "5px",
                          color: index === 0 ? "#ffffff" : "#000000",
                        }}
                      >
                        {artist.name}
                      </Typography>
                      <img
                        src={artist.images[0].url}
                        alt={artist.name}
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "50%",
                          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                        }}
                      />
                    </div>
                  </div>
                )
              )}
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexGrow: 1,
            minWidth: 0,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            Top 5 Songs
          </Typography>
          {allTimeSong && (
            <Box>
              {allTimeSong.items.map((song: TrackObject, index: number) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                    padding: "10px",
                    borderRadius: "8px",
                    backgroundColor: index === 0 ? "#0F184C" : "#ffffff",
                  }}
                >
                  <Typography
                    variant={index === 0 ? "h5" : "body1"}
                    sx={{
                      marginRight: "10px",
                      fontWeight: "bold",
                      color: index === 0 ? "#ffffff" : "#000000",
                    }}
                  >
                    {index + 1}
                  </Typography>
                  <div>
                    <Typography
                      variant={index === 0 ? "h5" : "body1"}
                      sx={{
                        marginBottom: "5px",
                        color: index === 0 ? "#ffffff" : "#000000",
                      }}
                    >
                      {song.name}
                    </Typography>
                    <img
                      src={song.album.images[0].url}
                      alt={song.name}
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </Box>
          )}
         {!allTimeArtist && (
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
        </Box>
      </Box>
      <Box>
        <Typography variant="h6" sx={{ marginBottom: "10px", display: "flex", justifyContent: "center" }}>
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
          <AllTimeGenres />
          </Box>
      </Box>
    </Box>
  );
};

export default allTimeReport;
