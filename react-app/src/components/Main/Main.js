import React, { useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import NotesList from "../NotesList/NotesList";
import NoteEditorContainer from "../NoteEditor/NoteEditorContainer";
// import "./Main.css";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../../store/ducks/notes";
import { getNotebooks } from "../../store/ducks/notebooks";
import { setCurrentNote } from "../../store/ducks/currentNote";
import { getTags } from "../../store/ducks/tags";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    direction: "column",
  },
  sidebarContainer: {
    height: "100vh",
    width: "20%",
    border: "thin solid black",
  },
  notesListContainer: {
    height: "100vh",
    width: "30%",
    border: "thin solid black",
  },
  noteEditorContainer: {
    height: "100vh",
    width: "50%",
    border: "thin solid black",
    color: "red",
  },
}));

const Main = ({ setAuthenticated }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getNotes());
      await dispatch(getNotebooks());
      await dispatch(getTags());
      await dispatch(setCurrentNote(1));
      await dispatch(setCurrentNote(null));
    })();
  }, []);

  const classes = useStyles();
  return (
    <Box display="flex" direction="row" className={classes.main}>
      <Box className={classes.sidebarContainer}>
        <Sidebar setAuthenticated={setAuthenticated} />
      </Box>
      <Box className={classes.notesListContainer}>
        <NotesList />
      </Box>
      <Box className={classes.noteEditorContainer}>
        <NoteEditorContainer />
      </Box>
    </Box>
  );
};
export default Main;
