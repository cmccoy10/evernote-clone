import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import NotesList from "../NotesList/NotesList";
import NoteEditorContainer from '../NoteEditor/NoteEditorContainer';
// import "./Main.css";
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    mainContainer: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        direction: "column"
    },
    sidebarContainer: {
        height: "100vh",
        width: "20%",
        border: "thin solid black"
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
        color: "red"
    },
}));

const Main = () => {
  const classes = useStyles();
  return (
    <Box display="flex" direction="row" className={classes.main}>
        <Box className={classes.sidebarContainer}>
            <Sidebar />
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
