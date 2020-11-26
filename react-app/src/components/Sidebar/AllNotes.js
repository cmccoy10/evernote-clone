import React from "react";
import { ListItem, ListItemIcon, ListItemText, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "#a6a6a6",
  },
}));

const AllNotes = () => {
  const classes = useStyles();
  return (
    <>
      <Link
        onClick={() => {
          console.log("all notes");
        }}
      >
        <ListItem>
          <ListItemIcon className={classes.icon}>
            <FontAwesomeIcon icon={faCoffee} />
          </ListItemIcon>
          <ListItemText primary={"All Notes"} />
        </ListItem>
      </Link>
    </>
  );
};

export default AllNotes;
