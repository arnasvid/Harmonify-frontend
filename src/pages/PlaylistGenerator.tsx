import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Navigate } from "react-router-dom";

const PlaylistGenerator = () => {
  const isUserLoggedIn = localStorage.getItem("token");
  return (
    <div>
      {isUserLoggedIn ? (
        <div>
          <Navbar />
          <h1>Playlist Generator</h1>
        </div>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </div>
  );
};

export default PlaylistGenerator;
