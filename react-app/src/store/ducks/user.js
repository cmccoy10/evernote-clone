import merge from "lodash/merge";
import { baseUrl } from "../../config";

//login
//logout
//load user

const LOAD_USER = "evernote-clone/auth/LOAD_USER";
const LOGIN = "evernote-clone/auth/LOGIN";
const LOGOUT = "evernote-clone/auth/LOGOUT";
const SIGN_UP = "evernote-clone/auth/SIGN_UP";


export const loadUser = (user) => { 
  return {
      type: LOAD_USER,
      user
  };
};

export const login = (user) => {
    return {
      type: LOGIN,
      user,
    };
};
  
export const logout = (user) => {
    return {
      type: LOGOUT,
      user,
    };
};
  
export const signUp = (user) => {
    return {
      type: SIGN_UP,
      user,
    };
};
  




export default function reducer(state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    case LOAD_USER: {
        const user = {
         ...user  
      };
      return merge({}, state, ...user);
      }
      case LOGIN: {
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
      case LOGOUT: {
          const user = {
              status: 'unauthorized' // how do we represent user logout in state?
        }
        return merge({}, state, ...user);
      }

      case SIGN_UP: {
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

// Thunks
export const fetchLoadUser = (data) => async (dispatch, getState) => {
    const response = await fetch('/api/auth/', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // needs to be refactore
    if (response.ok ) {
        const user = await response.json();
        if (!user.errors) {
            dispatch(loadUser(user)); d
        } else {
            console.log('errors', user.errors)
        }
    } else {
        console.log('error')
    }
}

export const fetchLoadUser = (data) => async (dispatch, getState) => {
    const response = await fetch('/api/auth/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
        },
     // form will be in data and it needs to be send in body?
      body: JSON.stringify(data) 
    });
    // needs to be refactored
    if (response.ok ) {
        const user = await response.json();
        if (!user.errors) {
            dispatch(loadUser(user)); d
        } else {
            console.log('errors', user.errors)
        }
    } else {
        console.log('error')
    }
}

export const fetchLoginUser = (data) => async (dispatch, getState) => {
    const response = await fetch('/api/auth/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
        },
     // form will be in data and it needs to be send in body?
      body: JSON.stringify(data) 
    });
    // needs to be refactored
    if (response.ok ) {
        const user = await response.json();
        if (!user.errors) {
            dispatch(loadUser(user)); // will be the same as loadUser after successful login
        } else {
            console.log('errors', user.errors)
        }
    } else {
        console.log('error')
    }
}

export const fetchLogoutUser = () => async (dispatch, getState) => {
    const response = await fetch('/api/auth/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
        },
     // form will be in data and it needs to be send in body?
      body: JSON.stringify(data) 
    });
    // needs to be refactored
    if (response.ok ) {
        const user = await response.json();
        if (!user.errors) {
            dispatch(logout()); // will be the same as loadUser after successful login
        } else {
            console.log('errors', user.errors)
        }
    } else {
        console.log('error')
    }
}