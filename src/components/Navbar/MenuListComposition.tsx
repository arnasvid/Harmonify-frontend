import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { Avatar, Box } from '@mui/material';
import UserAPI from '../../api/UserApi';
import { useEffect } from 'react';
import './MenuListCSS.css'
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/store/hooks';

export default function MenuListComposition() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const [username, setUsername] = React.useState<string>("");

  const isUserLoggedInWithSpotify = useAppSelector(
    (common) => common.common.common.isUserLoggedInWithSpotify
  );


  const navigate = useNavigate();

  useEffect(() => {
    getUsername();
  }, []);

  const getUsername = async () => {
    const username = await UserAPI.getUsername();
    setUsername(username);
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };
  

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2}>
      <Box className="MenuUser" style={{ display: "flex", position: "relative" }}>
        <Button
          className="MenuUserButton"
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          style={{ textTransform: "none", color: "white" }}
          disableRipple
          disableTouchRipple
          disableElevation
          disableFocusRipple
          sx={{ backgroundColor: "#000336" , animation: ".2s ease-in-out 0s", border: "2px solid #000336" , borderRadius: "8%", padding: "6px 12px", gap: "8px", marginLeft: "18px"}}
        >
          <span className="buttonText">{username}</span>
          <Avatar onClick={handleToggle} style={{ backgroundColor: "white", color: "#000336" }} src='' alt='@'>@</Avatar>
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          style={{ zIndex: 9999 }} // Set a higher z-index value
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    { isUserLoggedInWithSpotify ? <MenuItem onClick={() => navigate("/my-dashboard")}>My Dashboard</MenuItem> : null}
                     {/* <MenuItem onClick={() => navigate("/my-dashboard")}>My Dashboard</MenuItem> */}
                    <MenuItem onClick={() => navigate("/music-recommendations")}>Music Recommendations</MenuItem>
                    {/* <MenuItem onClick={() => navigate("/settings")}>Settings</MenuItem> */}
                    <MenuItem onClick={logOut}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </Stack>
  );
}
