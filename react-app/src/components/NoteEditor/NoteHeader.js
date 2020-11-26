import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button,Typography, IconButton } from '@material-ui/core';
import { LibraryBooks, Delete } from "@material-ui/icons"


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

const NoteHeader = () => {
    const classes = useStyles();
    return (
        <Box className={classes.headerContainer}>
            <Box>
                <Button className={classes.notebookButton}>
                    <LibraryBooks/>
                    <Box className={classes.notebookText}>
                        First Notebook
                    </Box>
                </Button>
            </Box>
            <Box className={classes.buttonsContainer}>
                <Box>
                    <Button className={classes.margin} size="small" variant="contained" disableElevation>Cancel</Button>
                </Box>
                <Box>
                    <Button className={classes.margin} size="small" color="secondary" variant="contained" disableElevation>Save</Button>
                </Box>
                <Box>
                    <IconButton size="small" className={classes.margin}>
                        <Delete color="secondary" />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}

export default NoteHeader;
