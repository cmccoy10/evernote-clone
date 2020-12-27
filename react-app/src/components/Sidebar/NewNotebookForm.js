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
  const [errors, setErrors] = useState([]);

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNotebook = await dispatch(createNotebook(title));
    if (newNotebook && "errors" in newNotebook) {
      setErrors(newNotebook["errors"]);
    }
    setTitle("");
    if (title) {
      setErrors([]);
      props.onClose();
    }
  };

  const handleCancel = () => {
    setErrors([]);
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
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Name</label>
            </div>
            <Input
              name="title"
              inputProps={{ "aria-label": "description" }}
              value={title}
              onChange={updateTitle}
            />

            <div className="form-errors">{errors}</div>
            <DialogActions>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewNotebookForm;
