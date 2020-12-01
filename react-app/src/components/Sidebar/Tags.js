import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ListItem, ListItemIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import ArrowRight from "@material-ui/icons/ArrowRight";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import { setCurrentTag } from '../../store/ducks/currentTag';
import { setCurrentNotebook } from "../../store/ducks/currentNotebook";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "#a6a6a6",
    marginRight: "5px",
    minWidth: "unset",
  },
  coloredIcon: {
    color: theme.palette.primary.main,
  },
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  tagClick: {
    cursor: 'pointer'
  },
}));

const Tags = ({ openDrawer, setOpenDrawer }) => {
  // const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();
  const [collapseList, setCollapseList] = useState(false);
  const classes = useStyles();
  const tags = useSelector((state) => state.tags);

  const handleClick = async (tagId) => {
    setOpenDrawer(false)
    await dispatch(setCurrentTag(tagId))
    await dispatch(setCurrentNotebook(null));
  }

  const tagTitles = Object.values(tags).map((tag) => (
    <li className={classes.tagClick} style={{ marginLeft: "45px" }} key={tag.name} onClick={() => handleClick(tag.id)}>
      <FontAwesomeIcon
        icon={faTag}
        className={`${classes.icon} ${classes.coloredIcon}`}
      />
      <span style={{ fontSize: ".8em" }}>{tag.name}</span>
    </li>
  ));
  const handleDrawerOpen = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
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
        <div onClick={handleDrawerOpen} className={classes.tagClick}>
        <FontAwesomeIcon icon={faTag} className={classes.icon} />
        Tags
        </div>
      </ListItem>
      {collapseList ? tagTitles : null}
    </>
  );
};

export default Tags;
