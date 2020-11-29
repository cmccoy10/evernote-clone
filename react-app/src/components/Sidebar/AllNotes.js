import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import { setCurrentNotebook } from "../../store/ducks/currentNotebook";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "#a6a6a6",
    marginRight: "5px",
  },
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
    left: "30px",
    cursor: "pointer",
  },
}));

const AllNotes = () => {
  const dispatch = useDispatch();
  const currentNotebook = useSelector((state) => state.currentNotebook);
  const defaultNotebookId = 5;
  const handleClick = async () => {
    await dispatch(setCurrentNotebook(defaultNotebookId));
  };

  const classes = useStyles();
  return (
    <div
      className={
        defaultNotebookId === currentNotebook
          ? `allnotes-link-container ${"selected"}`
          : `allnotes-link-container`
      }
    >
      <ListItem className={classes.listItem} onClick={handleClick}>
        <FontAwesomeIcon icon={faStickyNote} className={classes.icon} />
        All Notes
      </ListItem>
    </div>
  );
};

export default AllNotes;
