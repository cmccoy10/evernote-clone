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
import { authenticate } from "./services/auth";
import { getNotes } from "./store/ducks/notes";
import { getNotebooks } from "./store/ducks/notebooks";
import { setCurrentNote } from "./store/ducks/currentNote";
import { loadUser } from './store/ducks/user';

import { getTags } from "./store/ducks/tags";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        await dispatch(loadUser(user))
      }
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await dispatch(getNotes())
      await dispatch(getNotebooks())
      await dispatch(getTags())
      await dispatch(setCurrentNote(1))
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar setAuthenticated={setAuthenticated} />
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
      <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
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
        authenticated={authenticated}
        component={Main}
      ></ProtectedRoute>
    </BrowserRouter>
  );
}

export default App;
