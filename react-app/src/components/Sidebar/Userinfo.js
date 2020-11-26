import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "@material-ui/core";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import "./Sidebar.css";

const UserInfo = () => {
  const user = useSelector((state) => state.user);
  const userInitial = user.first_name[0];

  return (
    <div className="user-container">
      <Avatar>{userInitial}</Avatar>
      <span>{`${user.first_name} ${user.last_name}`}</span>
      <ArrowDropDown />
    </div>
  );
};

export default UserInfo;
