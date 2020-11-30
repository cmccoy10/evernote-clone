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
import { setCurrentNotebook } from "../../store/ducks/currentNotebook";
import { getTags } from "../../store/ducks/tags";

const Main = () => {
  const currentNote = useSelector((state) => state.currentNote);
  const note = useSelector((state) => state.notes[currentNote]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getNotes());
      await dispatch(getNotebooks());
      await dispatch(getTags());
      // await dispatch(setCurrentNotebook(23));
      // await dispatch(setCurrentNote(null));
    })();
  }, []);

  const useStyles = makeStyles((theme) => ({
    mainContainer: {
      width: "100vw",
      height: "100vh",
    },
    sidebarContainer: {
      height: "100vh",
      width: "20%",
      border: "thin solid black",
    },
    notesListContainer: {
      height: "100vh",
      width: "30%",
      border: "thin solid #e6e6e6",
      backgroundColor: "#f8f8f8",
    },
    noteEditorContainer: {
      height: "100vh",
      width: "50%",
      border: "thin solid black",
    },
  }));

  const classes = useStyles();

  const message = note ? note.title + note.body : null;
  const notebookId = note ? note.notebook_id : null;

  return (
    <Box display="flex" direction="row" className={classes.main}>
      <Box className={classes.sidebarContainer}>
        <Sidebar />
      </Box>
      <Box className={classes.notesListContainer}>
        <NotesList />
      </Box>
      {note ? (
        <Box className={classes.noteEditorContainer}>
          <NoteEditorContainer message={message} notebookId={notebookId} />
        </Box>
      ) : null}
    </Box>
  );
};
export default Main;
