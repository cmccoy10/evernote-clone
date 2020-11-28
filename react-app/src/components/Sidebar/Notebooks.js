import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ListItem, ListItemIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import ArrowRight from "@material-ui/icons/ArrowRight";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import NewNotebookForm from "./NewNotebookForm";
import { setCurrentNotebook } from "../../store/ducks/currentNotebook";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "#a6a6a6",
    marginRight: "5px",
    minWidth: "unset",
  },
  coloredIcon: {
    color: "#00a82d",
  },
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

const Notebooks = () => {
  const dispatch = useDispatch();
  const currentNotebook = useSelector((state) => state.currentNotebook);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setCurrent = async (index) => {
    await dispatch(setCurrentNotebook(index));
  };

  const [collapseList, setCollapseList] = useState(false);
  const classes = useStyles();
  const notebooks = useSelector((state) => state.notebooks);
  const notebookTitles = Object.values(notebooks).map((notebook) => (
    <div
      key={notebook.title}
      className={notebook.id === currentNotebook ? "current-notebook" : null}
    >
      <li
        style={{ marginLeft: "45px" }}
        onClick={() => setCurrent(notebook.id)}
      >
        <FontAwesomeIcon
          icon={faBook}
          className={`${classes.icon} ${classes.coloredIcon}`}
        />
        <span style={{ fontSize: ".8em" }}>{notebook.title}</span>
      </li>
    </div>
  ));

  return (
    <div className="sidebar-link">
      <ListItem className={classes.listItem}>
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
        <div className="add-button">
          <FontAwesomeIcon
            icon={faPlus}
            className={classes.icon}
            onClick={handleClickOpen}
          />
        </div>
      </ListItem>
      {collapseList ? notebookTitles : null}
      <NewNotebookForm open={open} onClose={handleClose} />
    </div>
  );
};

export default Notebooks;
