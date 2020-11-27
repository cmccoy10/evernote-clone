import React from "react";
import { logout } from "../../services/auth";
import { connect } from "react-redux";
import { logoutUser } from "../../store/ducks/user";
import { Link, Redirect } from "react-router-dom";

const LogoutButton = ({ setAuthenticated, clearUserFromState }) => {
  const onLogout = async (e) => {
    await logout();
    await clearUserFromState();

    // return <Redirect to="/login"></Redirect>;
  };

  return (
    // <Link onClick={onLogout} to="/login">
    //   Logout
    <button onClick={onLogout}>Logout</button>
    // </Link>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearUserFromState: () => dispatch(logoutUser()),
});

export default connect(undefined, mapDispatchToProps)(LogoutButton);
