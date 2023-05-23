import React, { useState, ChangeEvent } from "react";
import {
  Button,
  TextField,
  Typography,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  ClickAwayListener,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

interface SpotifySearchProps {
  accessToken: string;
}

interface SearchResults {
  trackName: string;
  artistName: string;
  albumName: string;
  albumImageURL: string;
}

export const RequestAccessToken = async () => {
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

const accessToken = await RequestAccessToken();

export const SpotifySearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResults[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSong, setSelectedSong] = useState<SearchResults | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };

  const handleOpenDialog = (song: SearchResults) => {
    setSelectedSong(song);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedSong(null);
    setDescription("");
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const postSong = () => {
    // Perform the post song action
    console.log("Song posted!");
    handleCloseDialog();
    window.location.reload();
  };

  const searchSpotify = async () => {
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
        const tracks = data.tracks.items;
        const transformedResults = tracks.map((track: any) => {
          return {
            trackName: track.name,
            artistName: track.artists[0].name,
            albumName: track.album.name,
            albumImageURL: track.album.images[1]?.url || "",
          };
        });
        setSearchResults(transformedResults);
        setAnchorEl(document.activeElement as HTMLElement); // Open dropdown
      } else {
        throw new Error("Failed to search Spotify");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <TextField
          style={{ width: "80%" }}
          label="Search for music"
          value={searchTerm}
          onChange={handleChange}
          variant="outlined"
        />
        <Button onClick={searchSpotify} variant="contained" color="primary">
          <SearchIcon />
        </Button>
      </div>
      <ClickAwayListener onClickAway={handleCloseDropdown}>
        <div>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography variant="h5">Songs People Recommend</Typography>
          </div>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseDropdown}
            anchorReference="none"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "90%",
              minWidth: "500px",
              maxWidth: "1200px",
              maxHeight: "80vh",
            }}
            PaperProps={{
              style: {
                maxHeight: "100%",
                width: "100%",
                overflowY: "auto",
              },
            }}
          >
            {searchResults.map((result, index) => (
              <MenuItem
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
                onClick={() => handleOpenDialog(result)}
              >
                <img
                  src={result.albumImageURL}
                  alt="album"
                  style={{ width: 50 }}
                />
                <div>
                  <Typography variant="h6">{result.trackName}</Typography>
                  <Typography variant="subtitle1">
                    {result.artistName}
                  </Typography>
                  <Typography variant="subtitle2">
                    {result.albumName}
                  </Typography>
                </div>
              </MenuItem>
            ))}
          </Menu>
        </div>
      </ClickAwayListener>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle>Song Details</DialogTitle>
        {selectedSong && (
          <div>
            <DialogContent>
              <img
                src={selectedSong.albumImageURL}
                alt="album"
                style={{ width: 200 }}
              />
              <Typography variant="h6">{selectedSong.trackName}</Typography>
              <Typography variant="subtitle1">
                Artist: {selectedSong.artistName}
              </Typography>
              <Typography variant="subtitle2">
                Album: {selectedSong.albumName}
              </Typography>
              <TextField
                label="Additional Description"
                value={description}
                onChange={handleDescriptionChange}
                multiline
                fullWidth
                variant="outlined"
                rows={4}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={postSong} color="primary">
                Post this song
              </Button>
            </DialogActions>
          </div>
        )}
      </Dialog>
    </div>
  );
};