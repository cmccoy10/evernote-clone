import React from "react";
import { logout } from "../../services/auth";
import { connect } from 'react-redux';
import { logoutUser } from '../../store/ducks/user'

const LogoutButton = ({setAuthenticated, clearUserFromState}) => {
  const onLogout = async (e) => {
    await logout();
    clearUserFromState();
    setAuthenticated(false);
  };

  return <button onClick={onLogout}>Logout</button>;
};

const mapDispatchToProps = dispatch => (
  {clearUserFromState: () => dispatch(logoutUser())}
)

export default connect(undefined, mapDispatchToProps)(LogoutButton);
