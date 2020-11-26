import React from "react";
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
  },
}));

const AllNotes = () => {
  const classes = useStyles();
  return (
    <div className="allnotes-link-container">
      <ListItem className={classes.listItem}>
        <FontAwesomeIcon icon={faStickyNote} className={classes.icon} />
        All Notes
      </ListItem>
    </div>
  );
};

export default AllNotes;
