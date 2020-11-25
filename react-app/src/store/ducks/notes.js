import merge from "lodash/merge";
// import { baseUrl } from "../../config";

// Constants
const LOAD = "clevernote/notes/load";

// Actions
export const load = (list) => ({ type: LOAD, list });


// Thunks
export const getNotes = (data) => async (dispatch, getState) => {
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


// Reducer
export default function reducer(state = {}, action) {
    Object.freeze(state);

    switch (action.type) {
        case LOAD: {
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
