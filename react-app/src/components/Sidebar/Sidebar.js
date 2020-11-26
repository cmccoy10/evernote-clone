import React from "react";

import UserInfo from "./Userinfo";
import { Drawer, CssBaseline, Divider, List, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AllNotes from "./AllNotes";
import Notebooks from "./Notebooks";
import Tags from "./Tags";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  drawer: {
    flexShrink: 0,
    height: "100%",
  },
  drawerPaper: {
    backgroundColor: "#1a1a1a",
    color: "#a6a6a6",
    position: "relative",
    overflowX: "hidden",
  },

  icon: {
    color: "#a6a6a6",
  },
}));

const Sidebar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <UserInfo />
        <Button variant="contained">New Note</Button>
        <Divider />
        <List>
          <AllNotes />
          <Notebooks />
          <Tags />
        </List>
        <Divider />
      </Drawer>
    </div>
  );
};

export default Sidebar;
