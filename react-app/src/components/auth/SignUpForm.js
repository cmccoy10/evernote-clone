import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signUp } from "../../services/auth";
import { connect } from "react-redux";
import { loadUser } from "../../store/ducks/user";
import { NavLink } from "react-router-dom";
import "./AuthForm.css";
import Button from "@material-ui/core/Button";

const SignUpForm = ({ authenticated, setAuthenticated, saveUserTostate }) => {
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
      <h1>Welcome to Clevernote</h1>
      <div className="form-container">
        <form onSubmit={onSignUp}>
          <div>
            {errors.map((error) => (
              <div>{error}</div>
            ))}
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
              required={true}
            ></input>
          </div>
          <Button
            style={{
              width: "100%",
              color: "white",
              backgroundColor: " #00a82d",
            }}
            type="submit"
          >
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
