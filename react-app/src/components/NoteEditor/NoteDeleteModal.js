import React from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  Typography
} from "@material-ui/core";
import { deleteNote } from '../../store/ducks/notes';
import { makeStyles } from "@material-ui/core/styles";
import { setCurrentNote } from '../../store/ducks/currentNote';
import { removeNote } from "../../store/ducks/notebooks";


const useStyles = makeStyles((theme) => ({
    deleteButton: {
      backgroundColor: "#e31c1b",
      color: "white"
    },
  }));


const NoteDeleteModal = (props) => {
    const dispatch = useDispatch();
    const id = props.id;
    const notebook = props.notebook;
    const notes = Object.values(props.notes);

    const nextCurrentNote = (id) => {
        const initialNote = props.notes[notebook.notes[0]];
        return notes.reduce((max, note) => {
            if (!max) return null;
            const noteDate = Date.parse(note.updated_on);
            const maxDate = Date.parse(max.updated_on);
            if (notebook.notes.includes(note.id) && noteDate > maxDate && note.id !== id) {
                return max = note;
            } else {
                return max;
            }
        }, initialNote)
    }

    const handleDelete = () => {
        dispatch(deleteNote({ id, notebook }));
        const nextNote = nextCurrentNote(id);
        dispatch(setCurrentNote(nextNote.id))
        props.onClose();
    }

    const classes = useStyles();

    return (
        <div>
            <Dialog
                fullWidth={true}
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Delete note</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this note?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button color="other" variant="contained" disableElevation onClick={props.onClose}>Cancel</Button>
                    <Button className={classes.deleteButton} variant="contained" disableElevation onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default NoteDeleteModal;
