import merge from "lodash/merge";
import { setCurrentNote } from "./currentNote";
import { getNotebooks, removeNote, newNote } from "./notebooks";
// import { baseUrl } from "../../config";
// Constants
const LOAD_NOTES = "clevernote/notes/load";
const UPDATE_NOTE = "clevernote/notes/update_note";
const REMOVE_NOTE = "clevernote/notes/remove_note";
const ADD_NOTE = "clevernote/notes/add_note";
const ADD_TAG_REL = "clevernote/notes/addTagRelation"
const REMOVE_TAG_REL = "clevernote/notes/removeTagRelation"

// Actions
export const load = (notes) => ({ type: LOAD_NOTES, notes });
export const update = (note) => ({ type: UPDATE_NOTE, note });
export const remove = (noteId) => ({ type: REMOVE_NOTE, noteId });
export const add = (note) => ({ type: ADD_NOTE, note });

export const addTagRelation = (tagId, noteId) => ({ type: ADD_TAG_REL, tagId, noteId })

export const removeTagRelation = (tagId, noteId) => ({ type: REMOVE_TAG_REL, tagId, noteId })

// Thunks
export const getNotes = () => async (dispatch, getState) => {
  const response = await fetch("/api/notes/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const list = await response.json();
    const notes = {};
    list.notes.map((note) => {
      notes[note.id] = note;
    });
    dispatch(load(notes));
  }
};

export const editNote = ({ id, note }) => async (dispatch, getState) => {
  let title = note.match(/<h1>([^<]*?)<\/h1>/g);
  let body;

  if (!title) {
    title = "";
    body = note;
  } else {
    title = title[0];
    body = note.split(title);
    body = body[1];
  }

  const response = await fetch(`/api/notes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
    }),
  });
  if (response.ok) {
    const note = await response.json();
    dispatch(update(note));
  }
};

export const deleteNote = ({ id, notebook }) => async (dispatch, getState) => {
  const response = await fetch(`/api/notes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    dispatch(remove(id));
    dispatch(removeNote(notebook.id, id));
  }
};

export const createNote = (notebook_id) => async (dispatch, getState) => {
  const response = await fetch(`/api/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "<h1><br></h1>",
      body: "",
      notebook_id: notebook_id,
    }),
  });

  if (response.ok) {
    const note = await response.json();
    dispatch(add(note));
    dispatch(newNote(notebook_id, note.id));
    dispatch(setCurrentNote(note.id));
    // dispatch(getNotebooks());
  }
};



// Reducer
export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOAD_NOTES: {
      return { ...action.notes };
    }
    case UPDATE_NOTE: {
      let newState = { ...state };
      newState[action.note.id] = action.note;
      return { ...newState };
    }
    case REMOVE_NOTE: {
      let newState = { ...state };
      delete newState[action.noteId];
      return newState;
    }

    case ADD_NOTE: {
      let newState = { ...state };
      newState[action.note.id] = action.note;
      return { ...newState };
    }
    case ADD_TAG_REL: {
      let newState = { ...state };
      newState[action.noteId].tags.push(action.tagId);
      return newState;
    }

    case REMOVE_TAG_REL: {
      let newState = { ...state };
      const idx = newState[action.noteId].tags.indexOf(action.tagId)
      newState[action.noteId].tags.splice(idx, 1)
      return newState;
    }

    default:
      return state;
  }
}
