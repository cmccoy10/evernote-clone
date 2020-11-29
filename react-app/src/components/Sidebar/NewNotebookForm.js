import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
} from "@material-ui/core";

import { createNotebook, handleFormErrors } from "../../store/ducks/notebooks";

const NewNotebookForm = (props) => {
  // const errors = useSelector((state) => state.notebooks.formErrors);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState([]);

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async () => {
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
        <ul>{errors}</ul>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewNotebookForm;
