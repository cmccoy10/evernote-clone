import React, { useState } from "react";

import UserInfo from "./UserInfo";
import { Drawer, CssBaseline, Divider, List, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Add from "@material-ui/icons/Add";
import AllNotes from "./AllNotes";
import Notebooks from "./Notebooks";
import Tags from "./Tags";
import { createNote } from "../../store/ducks/notes";
import { useDispatch, useSelector } from "react-redux";
import TagsList from './TagsList'


const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  drawer: {
    flexShrink: 0,
    height: "100%",
  },
  drawerPaper: {
    backgroundColor: "#1a1a1a",
    color: "#a6a6a6",
    position: "relative",
    overflowX: "hidden",
  },

  icon: {
    color: "#a6a6a6",
  },

  button: {
    borderRadius: "20px",
    width: "150px",
    margin: "15px 10px 5px 15px",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    textTransform: "none",
    justifyContent: "flex-start",
    "&:hover": {
      backgroundColor: theme.palette.other.main,
      color: "white",
    },
  },
}));

const Sidebar = ({ setAuthenticated }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentNotebook = useSelector((state) => state.currentNotebook);
  const notebooks = useSelector((state) => state.notebooks);
  const defaultNotebookId = Object.values(notebooks)
    .filter((notebook) => {
      return notebook.is_default === true;
    })
    .map((notebook) => notebook.id)[0];

  const [openDrawer, setOpenDrawer] = useState(false);

  const handleCreateNote = () => {
    if (!currentNotebook) {
      dispatch(createNote(defaultNotebookId));
    }
    dispatch(createNote(currentNotebook));
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <UserInfo setAuthenticated={setAuthenticated} />
        <Button
          onClick={handleCreateNote}
          className={classes.button}
          startIcon={<Add />}
          variant="contained"
        >
          New Note
        </Button>
        <Divider />
        <List>
          <AllNotes />
          <Notebooks />
          <Tags openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        </List>
        <Divider />
      </Drawer>
      <TagsList openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </div>
  );
};

export default Sidebar;
