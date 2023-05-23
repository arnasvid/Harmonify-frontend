import { BorderColor } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import "./ProfileSettings.css";

const ProfileSettings = () => {
  return (
    <Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box sx={{ display: "flex", paddingTop: 10 }}>
          <Typography variant="h3" sx={{ fontSize: "40px" }}>Profile Settings</Typography>
        </Box>
      </Box>
      <Box className="UserContainer" sx={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: 5, paddingBottom: 30, flexDirection: 'column'}}>
        <Avatar sx={{ backgroundColor: "white", color: "#000336", height: "80px", width: "80px"}}>@</Avatar>
        <Typography variant="overline" sx={{ paddingTop: 2 }}>Username</Typography>
        
      </Box>
    </Box>
  );
};

export default ProfileSettings;
