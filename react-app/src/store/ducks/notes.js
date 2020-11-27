import merge from "lodash/merge";
// import { baseUrl } from "../../config";

// Constants
const LOAD_NOTES = "clevernote/notes/load";

// Actions
export const load = (list) => ({ type: LOAD_NOTES, list });


// Thunks
export const getNotes = () => async (dispatch, getState) => {
    const response = await fetch('/api/notes/',{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
        const list = await response.json();
        dispatch(load(list.notes));
    }
}

export const editNote = (data) => async (dispatch, getState) => {
    console.log(data)
    // const response = await fetch(`/api/notes/${}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       "first_name": firstName,
    //       "last_name": lastName,
    //       email,
    //       password,
    //     }),
    //   });
    //   return await response.json();
}

export const signUp = async (firstName, lastName, email, password) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "first_name": firstName,
        "last_name": lastName,
        email,
        password,
      }),
    });
    return await response.json();
  }

// Reducer
export default function reducer(state = {}, action) {
    Object.freeze(state);

    switch (action.type) {
        case LOAD_NOTES: {
            const notes = action.list.map(note => ({
                [note.id]: {
                    "id": note.id,
                    "title": note.title,
                    "body": note.body,
                    "user_id": note.user_id,
                    "notebook_id": note.notebook_id,
                    "updated_on": note.updated_on,
                    "tags": note.tags
                }
            }))
            return merge({}, state, ...notes)
        }
        default:
            return state;
    }
}
