import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
} from "@material-ui/core";
import { handleRenameNotebook } from "../../store/ducks/notebooks";

// import { createNotebook } from "../../store/ducks/notebooks";

const HeaderModal = ({ currentNotebookId, noteTitle, open, handleClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(noteTitle);
  const [errors, setErrors] = useState([]);
  const updateTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNotebook = await dispatch(
      handleRenameNotebook(currentNotebookId, title)
    );
    if (newNotebook && "errors" in newNotebook) {
      setErrors(newNotebook["errors"]);
    }
    setTitle("");
    if (title) {
      setErrors([]);
      handleClose();
    }
  };

  const handleCancel = () => {
    setErrors([]);
    handleClose();
  };
  return (
    <div>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Rename notebook</DialogTitle>
          <DialogContent>
            <div>
              <label htmlFor="title">New Title</label>
            </div>
            <Input
              name="title"
              inputProps={{ "aria-label": "new title" }}
              value={title}
              onChange={updateTitle}
            />
          </DialogContent>
          <div className="form-errors">{errors}</div>
          <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default HeaderModal;
