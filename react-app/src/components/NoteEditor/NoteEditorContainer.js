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


const NoteEditorContainer = ({ note }) => {

    const [text, setText] = useState();

    const handleChange = (value) => {
        setText(value);
    }

    if (!note) {
        return null;
    }

    const message = note.title + note.body;

    return (
        <Box className="richTextEditorContainer">
            <Box className="headerContainer">
                <NoteHeader props={text}/>
            </Box>
            <Box className="editorContainer">
                <ReactQuill placeholder="Title" defaultValue={message} onChange={handleChange} />
            </Box>
            <Box className="footerContainer">
                <NoteFooter />
            </Box>
        </Box>
    );
}

export default NoteEditorContainer;
