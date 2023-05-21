import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import SpotifyInfoAPI from "../api/SpotifyInfo";
import { Box } from "@mui/material";


const NewReleases = () => {
  const [newReleases, setNewReleases] = React.useState<any>();
  useEffect(() => {
    getNewReleases();
  }, []);

  const getNewReleases = async () => {
    let res = await SpotifyInfoAPI.getNewReleases();
    console.log(res);
    setNewReleases(res);
  };

  return (
    <div>
      <Navbar/>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <h1>New Releases</h1>
        </Box>
        {newReleases && newReleases.albums && (
          <>
            {newReleases.albums.items.map((item: any, index: number) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    borderStyle: "solid",
                    borderColor: "#000336",
                    borderSize: "1px",
                  }}
                >
                  <br></br>
                  <br></br>
                  <br></br>
                  <h2 style={{ marginRight: "40px" }}>{index + 1}</h2>
                  <br></br>
                  <br></br>
                  <br></br>
                  <img
                    src={item.images[0].url}
                    alt="album"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <h2>{item.name}</h2>
                  <>
                    {item.artists.map((artist: any) => (
                      <h2 key={artist.id}>{artist.name}</h2>
                    ))}
                  </>
                </Box>
              );
            })}
          </>
        )}
        
    </div>
  )
};

export default NewReleases;