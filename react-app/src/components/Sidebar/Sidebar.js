import React from "react";
import "../Main/Main.css";
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({

}));

const Sidebar = () => {
  const classes = useStyles();
  return (
    <Box >
      <h3>Sidebar</h3>
    </Box>
  );
};

export default Sidebar;
