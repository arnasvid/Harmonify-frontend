import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Navigate } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Recommendations from "../components/recommendations/recommendations";
import { Typography } from "@mui/material";

const PlaylistGenerator = () => {
  const isUserLoggedIn = localStorage.getItem("token");
  return (
    <div>
      {isUserLoggedIn ? (
        <div>
          <Navbar />
          <div style={{ marginTop: "2%" }}>
          <h1 style={{  display: "flex", justifyContent: "center" }}>Find new music</h1>
          </div>
          <Recommendations />
          <Footer />
        </div>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </div>
  );
};

export default PlaylistGenerator;
