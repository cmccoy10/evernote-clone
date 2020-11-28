import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import Main from "./components/Main/Main";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Theme from "./components/Theme/Theme";
import { CssBaseline } from "@material-ui/core";
import { authenticate } from "./services/auth";
import { getNotes } from "./store/ducks/notes";
import { getNotebooks } from "./store/ducks/notebooks";
import { setCurrentNote } from "./store/ducks/currentNote";
import { setCurrentNotebook } from "./store/ducks/currentNotebook";
import { loadUser } from "./store/ducks/user";
import { getTags } from "./store/ducks/tags";
// import "./App.css";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        await dispatch(loadUser(user));
      }
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await dispatch(getNotes());
      await dispatch(getNotebooks());
      await dispatch(getTags());
      await dispatch(setCurrentNote(14));
      await dispatch(setCurrentNotebook(null));
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
        <CssBaseline />
        <Theme>
        {/* <NavBar setAuthenticated={setAuthenticated} /> */}
        <Route path="/login" exact={true}>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </Route>
        <ProtectedRoute
          path="/users"
          exact={true}
          authenticated={authenticated}
        >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute
          path="/users/:userId"
          exact={true}
          authenticated={authenticated}
        >
          <User />
        </ProtectedRoute>
        <ProtectedRoute
          path="/"
          exact={true}
          setAuthenticated={setAuthenticated}
          authenticated={authenticated}
          component={Main}
        ></ProtectedRoute>
      </Theme>
    </BrowserRouter>
  );
}

export default App;
