import React, { useState } from 'react';
import NoteFooter from './NoteFooter';
import NoteHeader from './NoteHeader';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import ReactQuill from "react-quill"
import "./NoteEditor.css"
import { useSelector } from 'react-redux';


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
    const currentNote = useSelector(state => state.currentNote)
    const [text, setText] = useState("");
    const [edited, setEdited] = useState(false);

    if (!note) {
        return null;
    }

    const message = note.title + note.body;

    const handleChange = (value) => {
        setText(value);
        setEdited(true);
    }

    const handleCancel = () => {
        // dispatch();
    }

    return (
        <Box className="richTextEditorContainer">
            <Box className="headerContainer">
                <NoteHeader note={text} id={currentNote} edited={edited} handleCancel={handleCancel}/>
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
