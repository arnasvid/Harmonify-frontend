import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import "./ProfileSettings.css";
import UserAPI from "../../api/UserApi";
import axios from "axios";
import { create } from "xmlbuilder2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DataXmlPdfAPI from "../../api/dataXmlPdf";
import { useAppSelector } from "../../redux/store/hooks";

const ProfileSettings = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const isAdmin = useAppSelector((common) => common.common.common.isUserAdmin);

  useEffect(() => {
    getUsername();
  }, []);

  const downloadFile = (content: string, fileName: string, mimeType: string) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([content], { type: mimeType }));
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getUsername = async () => {
    try {
      const username = await UserAPI.getUsername();
      setUsername(username);
    } catch (error) {
      console.error("Error retrieving username:", error);
    }
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleProfilePictureChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = () => {
    // Perform API requests to update the username, password, and profile picture
    // using the values stored in the state variables
    // UserAPI.updateUsername(username);
    // UserAPI.updatePassword(password);
    // UserAPI.updateProfilePicture(profilePicture);
  };

  const handleDownloadXML = async () => {
    try {
      const response = await axios.get("/api/dataXmlPdf/dataJson");
      const data = response;
      console.log("Data received:", data);

      // Convert JSON to XML format
      const xmlString = create(
        { version: "1.0", encoding: "UTF-8" },
        { root: data }
      ).end({ prettyPrint: true });

      // Trigger a file download with the XML content
      downloadFile(xmlString, "data.xml", "application/xml");
    } catch (error) {
      console.error("Error downloading XML data:", error);
    }
  };

  const [pdfData, setPdfData] = React.useState<any>();
  useEffect(() => {
    getPdfData();
  }, []);

  const getPdfData = async () => {
    try {
      const res = await DataXmlPdfAPI.dataPdf();
      setPdfData(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const headers = ["ID", "Username", "Password", "Email"];
      const tableData = pdfData.map((user: any) => [
        user.id,
        user.username,
        user.password,
        user.email,
      ]);

      const doc = new jsPDF();
      (doc as any).autoTable({
        head: [headers],
        body: tableData,
      });

      // Save the PDF file
      doc.save("user-data.pdf");
    } catch (error) {
      console.error("Error downloading PDF data:", error);
    }
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
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
          paddingBottom: 30,
          flexDirection: "column",
        }}
      >
        <Avatar
          src={profilePicture}
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
        <Typography variant="overline" sx={{ paddingTop: 2 }}>
          {username}
        </Typography>
        <TextField
          label="Username"
          value={username}
          onChange={handleUsernameChange}
          fullWidth
          sx={{ marginBottom: "10px" }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          sx={{ marginBottom: "10px" }}
        />
        <Button
          variant="contained"
          onClick={handleSaveChanges}
          sx={{ marginBottom: "20px" }}
        >
          Save Changes
        </Button>
        {isAdmin && (
          <div>
            <Button
              variant="contained"
              onClick={handleDownloadXML}
              sx={{ marginBottom: "10px" }}
            >
              Download XML
            </Button>
            <Button
              variant="contained"
              onClick={handleDownloadPDF}
              sx={{ marginBottom: "10px" }}
            >
              Download PDF
            </Button>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default ProfileSettings;
