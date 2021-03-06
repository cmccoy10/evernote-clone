import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signUp } from "../../services/auth";
import { connect } from "react-redux";
import { loadUser } from "../../store/ducks/user";
import { NavLink } from "react-router-dom";
import "./AuthForm.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHippo } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
    color: "white",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.dark.main,
      color: "white",
    },
  },
}));

const SignUpForm = ({ authenticated, setAuthenticated, saveUserTostate }) => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(firstName, lastName, email, password);
      if (!user.errors) {
        saveUserTostate(user);
        setAuthenticated(true);
      } else {
        setErrors(user.errors);
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <FontAwesomeIcon icon={faHippo} size="3x" color="#8ab" />
      <h1>Welcome to Clevernote</h1>
      <div className="form-container">
        <form onSubmit={onSignUp}>
          <div className="form-errors">
            <div>
              {errors.map((error) => (
                <div key={error}>{error}</div>
              ))}
            </div>
          </div>
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              onChange={updateFirstName}
              value={firstName}
            ></input>
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              onChange={updateLastName}
              value={lastName}
            ></input>
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <label>Repeat Password</label>
            <input
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
            ></input>
          </div>
          <Button className={classes.button} type="submit">
            Sign Up
          </Button>
          <div className="link-container">
            <span> Already have an account?</span>
            <NavLink to="/login" exact={true} activeClassName="active">
              Sign in
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

export default connect(undefined, mapDispatchToProps)(SignUpForm);
