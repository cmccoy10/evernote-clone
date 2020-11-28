import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Typography, IconButton } from '@material-ui/core';
import { LibraryBooks, Delete } from "@material-ui/icons"
import { deleteNote, editNote } from '../../store/ducks/notes';
import { useDispatch } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    headerContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        width: "100%"
    },
    buttonsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    notebookButton: {
        textTransform: "none",
    },
    notebookText: {
        paddingLeft: ".5em"
    },
    margin: {
        margin: theme.spacing(1),
    },
}));


const NoteHeader = ({ id, note, edited, handleCancel }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleSave = () => {
        dispatch(editNote({
            id,
            note
        }))
    }

    const handleDelete = () => {
        dispatch(deleteNote({ id }))
    }
    return (
        <Box className={classes.headerContainer}>
            <Box>
                <Button className={classes.notebookButton}>
                    <LibraryBooks color="secondary"/>
                    <Box className={classes.notebookText}>
                        First Notebook
                    </Box>
                </Button>
            </Box>
            <Box className={classes.buttonsContainer}>
                {edited ?
                <Box className={classes.buttonsContainer}>
                    <Box>
                        <Button className={classes.margin} size="small" color="other" variant="contained" disableElevation onClick={() => handleCancel()}>Cancel</Button>
                    </Box>
                    <Box>
                        <Button className={classes.margin} size="small" color="secondary" variant="contained" disableElevation onClick={() => handleSave()}>Save</Button>
                    </Box>
                </Box>
                : null}
                <Box>
                    <IconButton size="small" className={classes.margin} onClick={() => handleDelete()}>
                        <Delete color="primary" />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}

export default NoteHeader;
