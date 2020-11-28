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

import { createNotebook } from "../../store/ducks/notebooks";

const NewNotebookForm = (props) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async () => {
    await dispatch(createNotebook(title));
    props.onClose();
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create new notebook</DialogTitle>
        <DialogContent>
          <form>
            <div>
              <label htmlFor="title">Name</label>
            </div>
            <Input
              name="title"
              inputProps={{ "aria-label": "description" }}
              value={title}
              onChange={updateTitle}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewNotebookForm;
