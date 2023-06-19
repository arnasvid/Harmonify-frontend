import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import UserAPI from "../../api/UserApi";
import { useAppSelector } from "../../redux/store/hooks";

const ProfileSettings = () => {
  const [profilePicture, setProfilePicture] = useState(
    localStorage.getItem("profilePicture") || ""
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const isAdmin = useAppSelector((common) => common.common.common.isUserAdmin);

  useEffect(() => {
    getProfilePicture();
  }, []);

  const getProfilePicture = async () => {
    try {
      const response = await UserAPI.getProfilePicture();
      if (response) {
        setProfilePicture(response);
        localStorage.setItem("profilePicture", response); // Store profile picture in local storage
      }
    } catch (error) {
      console.error("Error getting profile picture:", error);
    }
  };

  const handleProfilePictureChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const handleSaveChanges = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("profilePicture", selectedFile);

        await axios.post("/api/users/uploadProfilePicture", formData);
        await getProfilePicture();
      }

      // Perform API requests to update other settings like username and password
      // using the values stored in the state variables
      // UserAPI.updateUsername(username);
      // UserAPI.updatePassword(password);
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", paddingTop: 10 }}>
          <Typography
            variant="h3"
            sx={{ fontSize: "40px", marginBottom: "20px" }}
          >
            Profile Settings
          </Typography>
        </Box>
      </Box>
      <Box
        className="UserContainer"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 5,
          paddingBottom: 10,
          flexDirection: "column",
        }}
      >
        <Avatar
          src={profilePicture} // Update the src attribute with profilePicture
          alt="@"
          sx={{
            backgroundColor: "white",
            color: "#000336",
            height: "80px",
            width: "80px",
            marginBottom: "20px",
          }}
        >
          @
        </Avatar>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          style={{ display: "none" }}
          id="profile-picture-input"
        />
        <label htmlFor="profile-picture-input">
          <Button variant="outlined" component="span">
            Upload Profile Picture
          </Button>
        </label>
        <Button
          variant="contained"
          onClick={handleSaveChanges}
          sx={{ marginBottom: "20px" }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileSettings;
