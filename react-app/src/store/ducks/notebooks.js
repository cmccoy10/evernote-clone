import merge from "lodash/merge";
import { setCurrentNote } from "./currentNote";
import {setCurrentNotebook} from './currentNotebook'
import { getNotes } from "./notes";
const LOAD_NOTEBOOKS = "clevernote/notebooks/load";
const NEW_NOTEBOOK = "clevernote/notebooks/new";
const DELETE_NOTEBOOK = "clevernote/notebooks/delete";
const RENAME_NOTEBOOK = "clevernote/notebooks/rename";

const REMOVE_NOTE = "clevernote/notebooks/remove_note"
const ADD_NOTE = "clevernote/notebooks/add_note"



export const load_notebooks = (list) => {
  return {
    type: LOAD_NOTEBOOKS,
    list,
  };
};

export const newNotebook = (notebook) => ({
  type: NEW_NOTEBOOK,
  notebook,
});

export const deleteNotebook = (notebookId) => ({
  type: DELETE_NOTEBOOK,
  notebookId
})

export const renameNotebook = ( notebook ) => ({
  type: RENAME_NOTEBOOK,
  notebook,
})


//thunks
export const handleRenameNotebook = (notebookId, newTitle) => async (dispatch) => {
  console.log('inside think')
  try {
    const res = await fetch(`/api/notebooks/${notebookId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle }),
    });
    if (res.ok) {
      const notebook = await res.json();
      console.log('notebook', notebook)
      dispatch(renameNotebook(notebook));
    } else {
      throw res;
    }
  } catch (err) {
    console.log("ERROR", err)
    const badRequest = await err.json();
    const errors = badRequest.errors;
    return {
      errors: errors,
    };
  }
};

export const handleDeleteNotebook = (notebookId) => async (dispatch) => {
  try {
    const res = await fetch(`/api/notebooks/${notebookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      // const notebook = await res.json();
       dispatch(setCurrentNotebook(null));
       dispatch(deleteNotebook(notebookId));
       dispatch(getNotes())



    } else {
      throw res;
    }
  } catch (err) {
    console.log(err, 'err delete')
    const badRequest = await err.json();
    const errors = badRequest.errors;
    return {
      errors: errors,
    };
  }
};
export const newNote = (notebookId, noteId) => ({
  type: ADD_NOTE,
  notebookId,
  noteId,
});

export const removeNote = (notebookId, noteId) => ({
  type: REMOVE_NOTE,
  notebookId,
  noteId,
});

export const createNotebook = (title) => async (dispatch) => {
  try {
    const res = await fetch(`/api/notebooks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    if (res.ok) {
      const notebook = await res.json();

      dispatch(newNotebook(notebook));
    } else {
      throw res;
    }
  } catch (err) {
    const badRequest = await err.json();
    const errors = badRequest.errors;
    return {
      errors: errors,
    };
  }
};

export const getNotebooks = () => async (dispatch, getState) => {
  try {
    const response = await fetch(`/api/notebooks`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const list = await response.json();
      const notes = getState().notes;

      const nextCurrentNote = () => {
        const initialNote = Object.values(notes)[0];
        return Object.values(notes).reduce((max, note) => {
            if (!max) return null;
                const noteDate = Date.parse(note.updated_on);
                const maxDate = Date.parse(max.updated_on);
            if (noteDate > maxDate) {
                return max = note;
            } else {
                return max;
            }
        }, initialNote)
      }
      const nextNote = nextCurrentNote();
      dispatch(load_notebooks(list.notebooks));
      dispatch(setCurrentNote(nextNote.id))
    }
  } catch (e) {
    console.log(e);
  }
};


export const setCurrentNoteAndNotebook = (index) => async (dispatch, getState) => {
    await dispatch(setCurrentNotebook(index));
    const notes = getState().notes;
    const currentNotebookId = getState().currentNotebook;
    const notebooks = getState().notebooks;
    const notebook = notebooks[currentNotebookId];

    const nextCurrentNote = () => {
        const initialNote = Object.values(notes)[0];
        return Object.values(notes).reduce((max, note) => {
            if (!max) return null;
                const noteDate = Date.parse(note.updated_on);
                const maxDate = Date.parse(max.updated_on);
            if (notebook.notes.includes(note.id) && noteDate > maxDate) {
                return max = note;
            } else {
                return max;
            }
        }, initialNote)
      }

      const nextNote = nextCurrentNote();
      await dispatch(setCurrentNote(nextNote.id))
};

//reducer

function removeItem(array, action) {
    return array.filter((note) => note !== action.noteId)
}


export default function reducer(state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    case LOAD_NOTEBOOKS: {
      const notebooks = action.list.map((notebook) => ({
        [notebook.id]: notebook,
      }));
      return merge({}, state, ...notebooks);
    }

    case NEW_NOTEBOOK: {
      let newState = { ...state };
      newState[action.notebook.id] = action.notebook;
      return { ...newState };
    }
    case RENAME_NOTEBOOK: {
      // console.log(action.notebook[0], 'notebook')
      const newState = { ...state };
      newState[action.notebook.id] = action.notebook
      return {...newState }
    }
    case DELETE_NOTEBOOK: {
      const newState = {...state}
      console.log("newState", newState);
      delete newState[action.notebookId]
      // const notes = Object.values(newState.notes)
      // const filteredNotes = notes.filter
      // for (const key in newState.notes) {
      //   if (newState.notes.hasOwnProperty(key)) {
      //     const note = newState.notes[key];
      //     console.log(note, 'note')
      //     if (note.id === action.notebookId) {
      //       delete newState.notes[key]
      //     }


        // }
      // }
      return {...newState}
    }

    case ADD_NOTE: {
        let newState = { ...state };
        newState[action.notebookId].notes.push(action.noteId);
        return { ...newState }
    }

    case REMOVE_NOTE: {
        let newState = { ...state };
        const notes = removeItem(newState[action.notebookId].notes, action);
        newState[action.notebookId].notes = notes;
        return { ...newState }
    }

    default:
      return state;
  }
}
