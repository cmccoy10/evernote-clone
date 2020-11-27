import React from "react";
import { useSelector } from "react-redux";
import { Avatar, Popover, Box, List } from "@material-ui/core";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import "./Sidebar.css";
import LogoutButton from "../auth/LogoutButton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  avatar: {
    marginLeft: "auto",
    backgroundColor: "#00a82d",
  },

  list: {
    borderTop: "1px solid #f2f2f2",
    cursor: "pointer",
    "&:hover": {
      background: "#e5e5e5",
    },
  },
}));

const UserInfo = () => {
  const classes = useStyles();
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
  const userInitial = user.first_name ? user.first_name[0] : null;
  const userFullName = user.first_name
    ? `${user.first_name} ${user.last_name}`
    : "";
  return (
    <div className="user-container">
      <Avatar>{userInitial}</Avatar>
      <span className="user-fullname">{userFullName}</span>
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
        <div className="account-title">ACCOUNT</div>
        <Box p={1} className={classes.root}>
          <Avatar className={classes.avatar}>{userInitial}</Avatar>
          <div className="user-column">
            <div>{userFullName}</div>
            <div>{user.email}</div>
          </div>
        </Box>
        <List className={classes.list}>
          <LogoutButton />
        </List>
      </Popover>
    </div>
  );
};

export default UserInfo;
