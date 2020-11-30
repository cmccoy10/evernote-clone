import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
//after login to store user in state
import { connect } from "react-redux";
import { loadUser } from "../../store/ducks/user";
import { NavLink } from "react-router-dom";
import "./AuthForm.css";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHippo } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
    color: "white",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.dark.main,
      color: "white"
    },
  },
}));

const LoginForm = ({ authenticated, setAuthenticated, saveUserTostate }) => {
  const classes = useStyles();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      saveUserTostate(user);
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <FontAwesomeIcon icon={faHippo} size="3x" color="#8ab" />
      <h1>Welcome to Clevernote</h1>
      <div className="form-container">
        <form onSubmit={onLogin}>
          <div className="form-errors">
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
            <Button className={classes.button} type="submit">
              Sign in
            </Button>
          </div>

          <div className="link-container">
            <span>Don't have an account?</span>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  saveUserTostate: (user) => dispatch(loadUser(user)),
});

export default connect(undefined, mapDispatchToProps)(LoginForm);
