import React, { useState } from "react";
import { useSelector } from "react-redux";

import { ListItem, ListItemIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import ArrowRight from "@material-ui/icons/ArrowRight";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";

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

const Tags = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [collapseList, setCollapseList] = useState(false);
  const classes = useStyles();
  const tags = useSelector((state) => state.tags);
  const tagTitles = Object.values(tags).map((tag) => (
    <li style={{ marginLeft: "45px" }} key={tag.name}>
      <FontAwesomeIcon
        icon={faTag}
        className={`${classes.icon} ${classes.coloredIcon}`}
      />
      <span style={{ fontSize: ".8em" }}>{tag.name}</span>
    </li>
  ));

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
        <FontAwesomeIcon icon={faTag} className={classes.icon} />
        Tags
      </ListItem>
      {collapseList ? tagTitles : null}
    </>
  );
};

export default Tags;
