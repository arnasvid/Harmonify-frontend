import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import SpotifyInfoAPI from "../api/SpotifyInfo";
import { Box, CircularProgress, hexToRgb } from "@mui/material";
import { Height } from "@mui/icons-material";

const Top50 = () => {
  const [top50, setTop50] = React.useState<any>();
  useEffect(() => {
    getTop50();
  }, []);

  const getTop50 = async () => {
    let res = await SpotifyInfoAPI.getTop50();
    console.log(res);
    setTop50(res);
  };

  return (
    <div>
      <Navbar />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <h1>Top50</h1>
      </Box>
      {top50 && top50.tracks && (
        <>
          {top50.tracks.items.map((item: any, index: number) => {
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
                  src={item.track.album.images[0].url}
                  alt="album"
                  style={{ width: "100px", height: "100px" }}
                />
                <h2>{item.track.name}</h2>

                <>
                  {item.track.artists.map((artist: any) => (
                    <h2 key={artist.id}>{artist.name}</h2>
                  ))}
                </>
              </Box>
            );
          })}
        </>
      )}
      {!top50 && (
        <CircularProgress
          style={{
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
            margin: 'auto',
            marginTop: "100px",
            height: '72px',
            width: '72px',
          }}
        />
      )}
    </div>
  );
};

export default Top50;
