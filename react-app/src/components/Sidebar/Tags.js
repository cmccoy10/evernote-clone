import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ListItem, ListItemIcon, ListItemText, Link } from "@material-ui/core";
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
}));

const Tags = () => {
  const [collapseList, setCollapseList] = useState(false);
  const classes = useStyles();
  const tags = useSelector((state) => state.tags);
  const tagTitles = Object.values(tags).map((tag) => (
    <li style={{ marginLeft: "62px" }} key={tag.name}>
      <FontAwesomeIcon icon={faTag} className={classes.icon} />
      <span style={{ fontSize: ".8em" }}>{tag.name}</span>
    </li>
  ));

  return (
    <>
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
          <FontAwesomeIcon icon={faTag} className={classes.icon} />
          Tags
        </ListItem>
        {collapseList ? tagTitles : null}
      </Link>
    </>
  );
};

export default Tags;
