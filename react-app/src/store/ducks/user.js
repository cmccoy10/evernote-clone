import merge from "lodash/merge";
import { baseUrl } from '../../config'

const LOGIN = "clevernote/auth/LOGIN";
const LOGOUT = "clevernote/auth/LOGOUT";


export const loadUser = (user) => {
  return {
    type: LOGIN,
    user,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT,
  };
};

export default function reducer(state = {}, action) {
  Object.freeze(state);
  switch (action.type) {
    case LOGIN: {

      return merge({}, state, {...action.user });
    }
    case LOGOUT: {
      return {};
    }
    default:
      return state;
  }
}

