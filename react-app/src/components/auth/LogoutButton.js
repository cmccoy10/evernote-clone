import React from "react";
import { logout } from "../../services/auth";
import { connect } from "react-redux";
import { logoutUser } from "../../store/ducks/user";
import { ListItem } from "@material-ui/core";
import { useSelector } from "react-redux";

const LogoutButton = ({ setAuthenticated, clearUserFromState }) => {
  const user = useSelector((state) => state.user);
  const userInitial = user.first_name ? user.first_name[0] : null;
  const userFullName = user.first_name
    ? `${user.first_name} ${user.last_name}`
    : "";

  const onLogout = async (e) => {
    await logout();
    await clearUserFromState();
  };

  return (
    <ListItem onClick={onLogout}>
      {/* <LogoutButton setAuthenticated={setAuthenticated} /> */}
      {`Sign out ${userFullName}`}
    </ListItem>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearUserFromState: () => dispatch(logoutUser()),
});

export default connect(undefined, mapDispatchToProps)(LogoutButton);
