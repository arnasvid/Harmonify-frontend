import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Container } from "@mui/material";
import { useState, ChangeEvent } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { SpotifySearch } from "../components/spotifySearch/SpotifySearch";
import Footer from "../components/footer/Footer";


const SongsWeListen = () => {
  return (
    <div>
      <Navbar/>   
      <SpotifySearch/> 
      <Footer />
    </div>
  )
};

export default SongsWeListen;