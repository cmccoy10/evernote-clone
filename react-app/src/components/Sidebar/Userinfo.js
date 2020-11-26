import React from "react";
import { useSelector } from "react-redux";
import { Avatar, Popover, Typography, Box } from "@material-ui/core";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import "./Sidebar.css";
import LogoutButton from "../auth/LogoutButton";

const UserInfo = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const user = useSelector((state) => state.user);
  const userInitial = user ? user.first_name[0] : null;

  return (
    <div className="user-container">
      <Avatar>{userInitial}</Avatar>
      <span className="user-fullname">{`${user.first_name} ${user.last_name}`}</span>
      <ArrowDropDown onClick={handleClick} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box p={1}>
          <LogoutButton />
        </Box>
      </Popover>
    </div>
  );
};

export default UserInfo;
