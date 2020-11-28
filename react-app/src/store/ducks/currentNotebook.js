const SET_CURRENT = "clevernote/notebooks/set_current";

export const setCurrentNotebook = (current) => ({ type: SET_CURRENT, current });

export default function reducer(state = null, action) {
  switch (action.type) {
    case SET_CURRENT: {
      return action.current;
    }
    default:
      return state;
  }
}
