import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import { setCurrentNotebook } from "../../store/ducks/currentNotebook";
import { setCurrentTag } from '../../store/ducks/currentTag'

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
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();
  const currentNotebook = useSelector((state) => state.currentNotebook);

  const handleClick = async () => {
    setSelected(true);
    await dispatch(setCurrentNotebook(null));
    await dispatch(setCurrentTag(null));
  };

  const classes = useStyles();
  return (
    <div
      className={
        selected && currentNotebook === null
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
