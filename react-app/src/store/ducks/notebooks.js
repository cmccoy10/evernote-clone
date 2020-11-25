import merge from "lodash/merge";
import { baseUrl } from "../../config";

const LOAD_NOTEBOOKS = "evernote-clone/notebooks/LOAD_NOTEBOOKS";

export const load_notebooks = (notebooks) => {
  return {
    type: LOAD_NOTEBOOKS,
    notebooks,
  };
};

export default function reducer(state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    case LOAD_NOTEBOOKS: {
      const notebooks = action.notebooks.notebooks.map((notebook) => ({
        [notebook.id]: {
          title: notebook.title,
          owner_id: notebook.owner_id,
          is_default: notebook.is_default,
          notes: [...notebook.notes],
        },
      }));
      return merge({}, state, ...notebooks);
    }
    default:
      return state;
  }
}

export const getNotebooks = () => async (dispatch, getState) => {
  try {
    const response = await fetch(`${baseUrl}/notebooks`);

    if (response.ok) {
      const notebooks = await response.json();
      dispatch(load_notebooks(notebooks));
    }
  } catch (e) {
    console.log(e);
  }
};
