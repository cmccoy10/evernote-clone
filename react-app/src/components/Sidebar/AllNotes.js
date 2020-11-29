import React, { useState } from "react";
import { ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";

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

  const handleClick = () => {
    setSelected(true);
  };

  const classes = useStyles();
  return (
    <div
      className={
        selected
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
