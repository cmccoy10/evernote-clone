import React from "react";
import "../Main/Main.css";
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({

}));

const NotesList = () => {
  const classes = useStyles();
  return (
    <Box >
      <h3>All Notes</h3>
      <div className="flex">
        <div className="note">Note 1</div>
        <div className="note">Note 2</div>
        <div className="note">Note 3</div>
      </div>
    </Box>
  );
};

export default NotesList;
