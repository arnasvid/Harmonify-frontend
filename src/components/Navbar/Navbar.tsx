import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ContactsIcon from "@mui/icons-material/Contacts";
import HomeIcon from "@mui/icons-material/Home";
import { Container } from "@mui/system";
import CustomButton from "../common/CustomButton";
import logo from "../../assets/logoNavbar.png";
import LoginDialog from "../login/LoginDialog";
import RegisterDialog from "../login/RegisterDialog";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);

  const onLoginDialogClick = () => {
    setOpenLogin(true);
  };

  const onLoginDialogClose = () => {
    setOpenLogin(false);
  };

  const onSignupDialogClick = () => {
    setOpen(true);
  };

  const onSignupDialogClose = () => {
    setOpen(false);
  };

  const [mobileMenu, setMobileMenu] = useState({
    left: false,
  });

  const toggleDrawer = (anchor: string, open: boolean) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.type === "Tab" || event.type === "Shift")
    ) {
      return;
    }

    setMobileMenu({ ...mobileMenu, [anchor]: open });
  };

  const list = (anchor: string) => {
    const urlDictionary = {
      "Home": "/",
      "New Releases": "/new-releases",
      "Top 50": "/top-50",
      "Songs We Listen": "/songs-we-listen",
    };
    
    const handleListItemClick = (text: string) => {
      if (text in urlDictionary) {
        const url = urlDictionary[text as keyof typeof urlDictionary];
        window.location.href = url;
      }
    };

    return (
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {["Home", "New Releases", "Top 50", "Songs We Listen"].map(
            (text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => handleListItemClick(text)}>
                  <ListItemIcon>
                    {index === 0 && <HomeIcon />}
                    {index === 1 && <NewspaperIcon />}
                    {index === 2 && <ListAltIcon />}
                    {index === 3 && <ContactsIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Box>
    );
  };

  const NavLink = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    color: "#4F5361",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      color: "#fff",
    },
  }));

  const NavbarLinksBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const CustomMenuIcon = styled(MenuIcon)(({ theme }) => ({
    cursor: "pointer",
    display: "none",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  }));

  const NavbarContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
    },
  }));

  const NavbarLogo = styled("img")(({ theme }) => ({
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  return (
    <NavbarContainer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CustomMenuIcon onClick={toggleDrawer("left", true)} />
          <Drawer
            anchor="left"
            open={mobileMenu["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
          <NavbarLogo src={logo} alt="logo" style={{ maxWidth: "100" }} onClick={() => {
            navigate("/");
          }} />
        </Box>
        <NavbarLinksBox>
          <NavLink
            variant="body2"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </NavLink>
          <NavLink
            variant="body2"
            onClick={() => {
              navigate("/new-releases");
            }}
          >
            New Releases
          </NavLink>
          <NavLink
            variant="body2"
            onClick={() => {
              navigate("/top-50");
            }}
          >
            Top 50
          </NavLink>
          <NavLink
            variant="body2"
            onClick={() => {
              navigate("/songs-we-listen");
            }}
          >
            Songs We Listen
          </NavLink>
        </NavbarLinksBox>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <NavLink variant="body2" onClick={onLoginDialogClick}>
          Log in
        </NavLink>
        <CustomButton
          backgroundColor="#0F184C"
          buttonColor="#fff"
          buttonText="Register"
          onClick={onSignupDialogClick}
        />
      </Box>
      <RegisterDialog
        open={open}
        handleLoginOpen={onLoginDialogClick}
        handleClose={onSignupDialogClose}
      />
      <LoginDialog
        open={openLogin}
        handleRegisterOpen={onSignupDialogClick}
        handleClose={onLoginDialogClose}
        handleRegisterClose={onSignupDialogClose}
      />
    </NavbarContainer>
  );
};

export default Navbar;
