import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Navigate } from "react-router-dom";
import Footer from "../components/footer/Footer";

const PlaylistGenerator = () => {
  const isUserLoggedIn = localStorage.getItem("token");
  return (
    <div>
      {isUserLoggedIn ? (
        <div>
          <Navbar />
          <h1>Playlist Generator</h1>
          <Footer />
        </div>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </div>
  );
};

export default PlaylistGenerator;
