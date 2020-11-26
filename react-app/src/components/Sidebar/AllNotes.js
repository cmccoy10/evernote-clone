import React from "react";
import { ListItem, ListItemIcon, ListItemText, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "#a6a6a6",
    marginRight: "5px",
  },
}));

const AllNotes = () => {
  const classes = useStyles();
  return (
    <div className="allnotes-link-container">
      <Link
        onClick={() => {
          console.log("all notes");
        }}
      >
        <ListItem>
          <FontAwesomeIcon icon={faStickyNote} className={classes.icon} />
          All Notes
        </ListItem>
      </Link>
    </div>
  );
};

export default AllNotes;
