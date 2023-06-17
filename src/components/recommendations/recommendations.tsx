import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  ListItemText,
} from "@mui/material";

interface Song {
  id: string;
  name: string;
  artist: string;
  albumCover: string;
  previewUrl?: string;
}

const Recommendations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [recommendedSongs, setRecommendedSongs] = useState<Song[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const token = await RequestAccessToken();
        setAccessToken(token);
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    fetchAccessToken();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        const songs = data.tracks.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          artist: item.artists[0].name,
          albumCover: item.album.images[0]?.url || "",
        }));
        setSearchResults(songs);
        setOpen(true);
      }
    } catch (error) {
      console.error("Error searching for songs:", error);
    }
  };

  const handleSelectSong = (song: Song) => {
    setSelectedSong(song);
    setOpen(false);
  };

  const handleGetRecommendations = async () => {
    if (selectedSong) {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/recommendations?seed_tracks=${selectedSong.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data) {
            const songs = data.tracks.map((item: any) => ({
              id: item.id,
              name: item.name,
              artist: item.artists[0].name,
              albumCover: item.album.images[0]?.url || "",
              previewUrl: item.preview_url,
            }));

            setRecommendedSongs(songs || []); // Use empty array if songs is undefined
          }
        } else {
          throw new Error("Failed to get recommended songs");
        }
      } catch (error) {
        console.error("Error getting recommended songs:", error);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Music Recommendations
      </Typography>
      <TextField
        label="Search for a song"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>

      <Box mt={4}>
        <Typography variant="h6">Selected Song:</Typography>
        {selectedSong ? (
          <Box mt={2} display="flex" alignItems="center" flexDirection="column">
            <Avatar
              src={selectedSong.albumCover}
              alt={selectedSong.name}
              sx={{ width: 200, height: 200 }}
            />
            <Typography variant="subtitle1" mt={2}>
              {selectedSong.name} - {selectedSong.artist}
            </Typography>
          </Box>
        ) : (
          <Typography variant="body1">No song selected</Typography>
        )}
      </Box>

      <Box mt={4}>
        <Typography variant="h6">Recommended Songs:</Typography>
        {recommendedSongs.length > 0 ? (
          <List>
            {recommendedSongs.map((song) => (
              <ListItem key={song.id}>
                <ListItemAvatar>
                  <Avatar src={song.albumCover} />
                </ListItemAvatar>
                <ListItemText primary={song.name} secondary={song.artist} />
                {song.previewUrl && (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => window.open(song.previewUrl, "_blank")}
                  >
                    Play
                  </Button>
                )}
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1">No recommended songs</Typography>
        )}
      </Box>

      <Box mt={4}>
        <Button
          variant="contained"
          onClick={handleGetRecommendations}
          disabled={!selectedSong}
        >
          Get Recommendations
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Search Results</DialogTitle>
        <DialogContent>
          <List>
            {searchResults.map((song) => (
              <ListItem
                key={song.id}
                sx={{ cursor: "pointer" }}
                onClick={() => handleSelectSong(song)}
              >
                <ListItemAvatar>
                  <Avatar src={song.albumCover} />
                </ListItemAvatar>
                <ListItemText primary={song.name} secondary={song.artist} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Recommendations;

// Helper function for requesting access token
const RequestAccessToken = async () => {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${
        import.meta.env.VITE_CLIENT_ID
      }&client_secret=${import.meta.env.VITE_CLIENT_SECRET}`,
    });

    if (response.ok) {
      const data = await response.json();
      return data.access_token;
    } else {
      throw new Error("Failed to fetch access token");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
