import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import SpotifyDashboardAPI from "../../api/SpotifyDashboardAPI";
import { ArtistObject } from "../../models/spotify/ArtistObject";
import TrackObject from "../../models/spotify/TrackObject";
import HalfYearReport from "./halfYearReport";
import AllTimeReport from "./allTimeReport";
import WeeklyReport from "./weeklyReport";
import HalfYearGenres from "./halfYearGenres";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [monthlyArtist, setMonthlyArtist] = React.useState<any>();
  const [monthlySong, setMonthlySong] = React.useState<any>();
  const [halfYearArtist, setHalfYearArtist] = React.useState<any>();
  const [halfYearSong, setHalfYearSong] = React.useState<any>();
  const [allTimeArtist, setAllTimeArtist] = React.useState<any>();
  const [allTimeSong, setAllTimeSong] = React.useState<any>();

  useEffect(() => {
    getMonthlyArtist();
  }, []);

  const getMonthlyArtist = async () => {
    try {
      const res = await SpotifyDashboardAPI.getMonthlyArtists();
      console.log(res);
      setMonthlyArtist(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMonthlySong();
  }, []);

  const getMonthlySong = async () => {
    try {
      const res = await SpotifyDashboardAPI.getMonthlySongs();
      console.log("MONTHLY SONGS:", res);
      setMonthlySong(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getHalfYearArtist();
  }, []);

  const getHalfYearArtist = async () => {
    try {
      const res = await SpotifyDashboardAPI.getHalfYearArtists();
      console.log(res);
      setHalfYearArtist(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getHalfYearSong();
  }, []);

  const getHalfYearSong = async () => {
    try {
      const res = await SpotifyDashboardAPI.getHalfYearSongs();
      console.log(res);
      setHalfYearSong(res);
    } catch (error) {
      console.error(error);
    }
  };

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
    <Box style={{}}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "3%",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Tab label="Weekly Report" {...a11yProps(0)} />
            <Tab label="Monthly Report" {...a11yProps(1)} />
            <Tab label="6 Months report" {...a11yProps(2)} />
            <Tab label="All time report" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <WeeklyReport />
        </TabPanel>
        <TabPanel value={value} index={1}>
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
        {monthlyArtist && (
          <Box>
            {monthlyArtist.items.map((artist: ArtistObject, index: number) => (
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
            ))}
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
        {monthlySong && (
          <Box>
            {monthlySong.items.map((song: TrackObject, index: number) => (
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
          <HalfYearGenres />
          </Box>
      </Box>
  </Box>
</TabPanel>

        <TabPanel value={value} index={2}>
          <HalfYearReport />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <AllTimeReport />
        </TabPanel>
      </Box>
    </Box>
  );
}
