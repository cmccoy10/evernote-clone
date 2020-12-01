import React, { useState } from "react";
import "../Main/Main.css";
import { useSelector, useDispatch } from "react-redux";
import { handleDeleteNotebook } from "../../store/ducks/notebooks";
import HeaderModal from "./HeaderModal";
import { createNote, deleteNote } from "../../store/ducks/notes";
import { Popover, Box, List, ListItem } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  listItem: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f3f3f3",
    },
  },

  menuIcon: {
    cursor: "pointer",
  },

  hidden: {
    display: "none",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);
  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const notebooks = useSelector((state) => state.notebooks);
  const notes = useSelector((state) => state.notes);
  const currentNotebookId = useSelector((state) => state.currentNotebook);
  const currentNotebook = notebooks[currentNotebookId];

  const defaultNotebookId = Object.values(notebooks)
    .filter((notebook) => {
      return notebook.is_default === true;
    })
    .map((notebook) => notebook.id)[0];

  const handleCreateNote = () => {
    if (!currentNotebookId) {
      dispatch(createNote(defaultNotebookId));
    }
    dispatch(createNote(currentNotebookId));
  };

  const dispatch = useDispatch();

  const handleDelete = () => {
    for (const key in notes) {
      if (notes.hasOwnProperty(key)) {
        const note = notes[key];
        if (note.notebook_id === currentNotebookId) {
          dispatch(deleteNote({ id: key, notebook: currentNotebook }));
        }
      }
    }
    dispatch(handleDeleteNotebook(currentNotebookId));
  };

  const handleEdit = () => {
    setOpen(true);
  };

  return (
    <div className="notes-header">
      <HeaderModal
        open={open}
        handleClose={handleClose}
        currentNotebookId={currentNotebookId}
        noteTitle={currentNotebookId && currentNotebook.title}
      />

      <h3>{currentNotebookId ? currentNotebook.title : "All Notes"}</h3>

      <div className="notes-menu-container">
        <span> {`${props.numNotes} notes`}</span>
        <MoreHorizIcon className={classes.menuIcon} onClick={handleClick} />
        <Popover
          id={id}
          open={openPopover}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <List>
            <ListItem className={classes.listItem} onClick={handleCreateNote}>
              Add a new note
            </ListItem>
            <ListItem
              onClick={handleEdit}
              className={
                !currentNotebookId ||
                (currentNotebookId && currentNotebook.is_default)
                  ? classes.hidden
                  : classes.listItem
              }
            >
              Edit Notebook
            </ListItem>
            <ListItem
              onClick={handleDelete}
              className={
                !currentNotebookId ||
                (currentNotebookId && currentNotebook.is_default)
                  ? classes.hidden
                  : classes.listItem
              }
            >
              Delete Notebook
            </ListItem>
          </List>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
