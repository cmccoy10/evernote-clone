import merge from "lodash/merge";

const LOAD_NOTEBOOKS = "clevernote/notebooks/load";
const NEW_NOTEBOOK = "clevernote/notebooks/new";

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
      dispatch(load_notebooks(list.notebooks));
    }
  } catch (e) {
    console.log(e);
  }
};

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

    default:
      return state;
  }
}
