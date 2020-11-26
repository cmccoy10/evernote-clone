import React, { useState } from 'react';
import NoteFooter from './NoteFooter';
import NoteHeader from './NoteHeader';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import ReactQuill from "react-quill"
import "./NoteEditor.css"


const useStyles = makeStyles((theme) => ({
    richTextEditorContainer: {
        display: "flex",
        flexDirection: "column"
    },
    headerContainer: {
        height: '8vh',
        border: "thin solid black"
    },
    editorContainer: {
        // height: '90vh',
        border: "thin solid black"
    },
    footerContainer: {
        height: '6vh',
        border: "thin solid black"
    },
}));


const NoteEditorContainer = () => {
    const [text, setText] = useState(" ");

    const handleChange = (value) => {
        setText(value);
    }

    const classes = useStyles();
    return (
        <Box className="richTextEditorContainer">
            <Box className="headerContainer">
                <NoteHeader />
            </Box>
            <Box className="editorContainer">
                <ReactQuill value={text} onChange={handleChange} />
            </Box>
            <Box className="footerContainer">
                <NoteFooter />
            </Box>
        </Box>
    );
}

export default NoteEditorContainer;
