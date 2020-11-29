// Constants
const SET_CURRENT = "clevernote/notes/set_current";

// Actions
export const setCurrentNote = (current) => ({ type: SET_CURRENT, current });

// Thunks

// Reducer
export default function reducer(state = 13, action) {
  switch (action.type) {
    case SET_CURRENT: {
      return action.current;
    }
    default:
      return state;
  }
}
