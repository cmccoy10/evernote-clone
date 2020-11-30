import React, {useState} from "react";
import "../Main/Main.css";
import { useSelector, useDispatch } from "react-redux";
import { handleDeleteNotebook} from '../../store/ducks/notebooks';
import HeaderModal from './HeaderModal';
import { createNote } from "../../store/ducks/notes";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'


const Header = (props) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  
  const notebooks = useSelector((state) => state.notebooks);

  const defaultNotebookId = Object.values(notebooks)
    .filter((notebook) => {
      return notebook.is_default === true;
    })
    .map((notebook) => notebook.id)[0];
  
  const handleCreateNote = () => {
    if (!currentNotebook) {
      dispatch(createNote(defaultNotebookId));
    }
    dispatch(createNote(currentNotebook));
  };
  
   
 
  const currentNotebook = useSelector((state) => state.currentNotebook);

  // console.log(currentNotebook)
  const dispatch = useDispatch()
  const handleSelect = (e) => {
    const action = e.target.value
    switch (action) {
      case 'add':
        handleCreateNote()
        break;
      case 'edit':
        setOpen(true)
        // console.log('fired')
        console.log(e.target.value, 'edit')
        // dispatch(handleRenameNotebook(currentNotebookId, 'newtitle'))
        break;
      case 'delete':
        dispatch(handleDeleteNotebook(currentNotebook))
        break;
      default:
        break;
    }
  }
  return (
    <div className="notes-header">
      <HeaderModal open={open} handleClose={handleClose}
        currentNotebookId={currentNotebook}
        // dispatch={dispatch}
        noteTitle={currentNotebook && currentNotebook.title}
      />
      <h3>{currentNotebook ? currentNotebook.title : "All Notes"}</h3>
      <span> {`${props.numNotes} notes`}</span>
      {/* <Button aria-controls="simple-menu" aria-haspopup="true">
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        
        keepMounted
        open={true}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu> */}
      <select defaultValue='more' onChange={e => handleSelect(e)}>
        <option value="more" disabled>--More Actions--</option>
        <option value='add'>Add a new note</option>
        <option value='edit' disabled={!currentNotebook || (currentNotebook && currentNotebook.is_default) }>Edit Notebook</option>
        <option value='delete' disabled={!currentNotebook || (currentNotebook && currentNotebook.is_default) }>Delete Notebook</option>
      </select>
    </div>
  );
};

export default Header;
