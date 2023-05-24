import React, { useState, ChangeEvent, useEffect } from "react";
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
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import SpotifySearchApi from "../../api/SpotifySearchApi";
import SpotifyInfo from "../../api/SpotifyInfo";
import { useAppSelector } from "../../redux/store/hooks";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

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

  const isUserLoggedInWithSpotify = useAppSelector(
    (common) => common.common.common.isUserLoggedInWithSpotify
  );

  const isAdmin = useAppSelector((common) => common.common.common.isUserAdmin);

  const [postSongs, setPostSongs] = React.useState<any>();

  const [updatedDescription, setUpdatedDescription] = useState<string>("");
  

  useEffect(() => {
    getPostSongs();
  }, []);

  const getPostSongs = async () => {
    try {
      const res = await SpotifySearchApi.getPostSongs();
      console.log(res);
      setPostSongs(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (postId: any) => {
    // Logic for handling update
    const response = await fetch(`api/songsPosting/updatePostSong/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: updatedDescription,
      }),
    });
    if (response.ok) {
      console.log("Song updated successfully!");
      window.location.reload();
    } else {
      throw new Error("Failed to update song");
    }
  };

  const handleUpdateButtonClick = (postId: any) => {
    if (updatedDescription !== "") {
      handleUpdate(postId);
    } else {
      alert("Please enter a description.");

    }
  };

  const handleUpdatedDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUpdatedDescription(event.target.value);
  };

  const handleDelete = async (postId: any) => {
    // Logic for handling delete
    const response = await fetch(`api/songsPosting/deletePostSong/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("Song deleted successfully!");
      window.location.reload();
    } else {
      throw new Error("Failed to delete song");
    }
  };

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

  const postSong = async () => {
    try {
      const tokenData = localStorage.getItem("token");

      if (!tokenData) {
        throw new Error("No token found");
      }

      const songData = {
        token: tokenData,
        songName: selectedSong?.trackName,
        artistName: selectedSong?.artistName,
        albumName: selectedSong?.albumName,
        albumImageURL: selectedSong?.albumImageURL,
        description,
      };

      const response = await fetch("/api/songsPosting/postSong", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData}`,
        },
        body: JSON.stringify(songData),
      });
      if (response.ok) {
        console.log("Song posted successfully!");
        handleCloseDialog();
        window.location.reload();
      } else {
        throw new Error("Failed to post song");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
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
      {isUserLoggedInWithSpotify ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
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
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Typography variant="h5">
            Please log in with Spotify to post songs
          </Typography>
        </div>
      )}
      <ClickAwayListener onClickAway={handleCloseDropdown}>
        <div>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                marginTop: { xs: "10px", sm: "20px" },
                fontSize: { xs: "24px", sm: "36px" },
              }}
            >
              Songs People Recommend
            </Typography>
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
      {postSongs && postSongs.data && (
        <Grid
          container
          spacing={3}
          sx={{ marginTop: "20px", paddingLeft: "20px", paddingRight: "20px" }}
        >
          {postSongs.data
            .slice()
            .reverse()
            .map((item: any, index: number) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.album.image}
                    alt="album"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.song.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.song.artist}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.album.title}
                    </Typography>
                    <br />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: "1.2rem" }}
                    >
                      {item.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="#000336"
                      sx={{ fontWeight: "bold" }}
                    >
                      Posted by: {item.user.username}
                    </Typography>
                    {isAdmin ? (
                      <div>
                        <TextField
                          label="Update Description"
                          multiline
                          fullWidth
                          variant="outlined"
                          rows={4}
                          value={updatedDescription}
                          onChange={handleUpdatedDescriptionChange}
                        />
                        <Button
                          variant="outlined"
                          startIcon={<EditIcon />}
                          onClick={() => handleUpdateButtonClick(item.id)} // Call handleUpdateButtonClick with postId
                        >
                          Update
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      )}
    </div>
  );
};
