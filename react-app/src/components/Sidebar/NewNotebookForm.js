import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
} from "@material-ui/core";

const NewNotebookForm = (props) => {
  const createNotebook = () => {
    console.log("notebook created");
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
          {/* <TextField
            autoFocus
            // margin="dense"
            id="name"
            label="Notebook Name"
            type="text"
            variant="outlined"
            fullWidth
          /> */}
          <form>
            <div>
              <label for="title">Name</label>
            </div>
            <Input name="title" inputProps={{ "aria-label": "description" }} />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={createNotebook}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewNotebookForm;
