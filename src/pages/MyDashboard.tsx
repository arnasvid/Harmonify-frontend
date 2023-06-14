import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useEffect } from "react";
import SpotifyPersonalAPI from "../api/SpotifyPersonalAPI";
import { Dashboard } from "@mui/icons-material";
import DashboardTab from "../components/dashboard/DashboardTab";
import Footer from "../components/footer/Footer";
import RecentlyPlayedTracks from "../components/dashboard/RecentlyPlayedTracks";
import { Divider } from '@mui/material';

const MyDashboard = () => {
  const isUserLoggedIn = localStorage.getItem("token");

  // useEffect(() => {
  //   getRecentlyPlayed();
  // }, []);

  // const getRecentlyPlayed = async () => {
  //   let res = await SpotifyPersonalAPI.getRecentlyPlayed();
  //   console.log(res);
  // };

  return (
    <div>
      {isUserLoggedIn ? (
        <div>
          <Navbar />
          <h1 style={{  display: "flex", justifyContent: "center" }}>My Dashboard</h1>
          <DashboardTab />
          <Divider style={{color: "#0F184C"}}/>
          <RecentlyPlayedTracks />
          <Footer />
        </div>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </div>
  );
};

export default MyDashboard;
