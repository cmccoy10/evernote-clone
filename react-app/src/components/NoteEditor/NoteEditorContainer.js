import React from 'react';
import NoteEditor from './NoteEditor';
import NoteFooter from './NoteFooter';
import NoteHeader from './NoteHeader';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    headerContainer: {
        height: '10%',
        border: "thick, solid, black"
    },
    editorContainer: {
        height: '80%',
        border: "thick, solid, black"
    },
    footerContainer: {
        height: '10%',
        border: "thick, solid, black"
    },
}));


const NoteEditorContainer = () => {
    const classes = useStyles();
    return (
        <Box >
            <NoteHeader className={classes.headerContainer}/>
            <NoteEditor className={classes.editorContainer}/>
            <NoteFooter className={classes.footerContainer}/>
        </Box>
    );
}

export default NoteEditorContainer;
