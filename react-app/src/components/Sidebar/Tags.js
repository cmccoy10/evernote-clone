import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotebooks } from "../../store/ducks/notebooks";

import { ListItem, ListItemIcon, ListItemText, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "#a6a6a6",
  },
}));

const Tags = () => {
  const classes = useStyles();
  return (
    <ListItem>
      <ListItemIcon className={classes.icon}>
        <FontAwesomeIcon icon={faCoffee} />
      </ListItemIcon>
      <ListItemText primary={"Tags"} />
    </ListItem>
  );
};

export default Tags;
