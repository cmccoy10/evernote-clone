import React, { useState } from 'react';
import ReactQuill from "react-quill"
import "../Main/Main.css";
import { makeStyles } from '@material-ui/core/styles';
import { Box } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    textEditor: {
        height: '100vh',
        boxSizing: 'border-box'
    },
}));


const NoteEditor = () => {
    const [text, setText] = useState(" ");

    const handleChange = (value) => {
        setText(value);
    }

    const classes = useStyles();
    return (
        <div className={classes.textEditor}>
            <ReactQuill value={text}
                        onChange={handleChange} />
        </div>
    )
};

export default NoteEditor;
