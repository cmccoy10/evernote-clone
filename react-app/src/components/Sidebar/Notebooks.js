import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ListItem, ListItemIcon, ListItemText, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import ArrowRight from "@material-ui/icons/ArrowRight";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import Add from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "#a6a6a6",
    marginRight: "5px",
    minWidth: "unset",
  },
}));

const Notebooks = () => {
  const [collapseList, setCollapseList] = useState(false);
  const classes = useStyles();
  const notebooks = useSelector((state) => state.notebooks);
  const notebookTitles = Object.values(notebooks).map((notebook) => (
    <li style={{ marginLeft: "62px" }} key={notebook.title}>
      <FontAwesomeIcon icon={faBook} className={classes.icon} />
      <span style={{ fontSize: ".8em" }}>{notebook.title}</span>
    </li>
  ));

  return (
    <div className="sidebar-link">
      <Link>
        <ListItem>
          <ListItemIcon className={classes.icon}>
            {collapseList ? (
              <ArrowDropDown
                onClick={() => {
                  setCollapseList(!collapseList);
                }}
              />
            ) : (
              <ArrowRight
                onClick={() => {
                  setCollapseList(!collapseList);
                }}
              />
            )}
          </ListItemIcon>
          <FontAwesomeIcon icon={faBook} className={classes.icon} />
          Notebooks
          <Add />
        </ListItem>
        {collapseList ? notebookTitles : null}
      </Link>
    </div>
  );
};

export default Notebooks;
