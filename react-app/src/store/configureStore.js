import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import user from "./ducks/user";
import notebooks from "./ducks/notebooks";
import notes from "./ducks/notes";
import tags from "./ducks/tags";
import currentNote from "./ducks/currentNote";
import currentNotebook from "./ducks/currentNotebook";
import currentTag from './ducks/currentTag';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  user,
  notebooks,
  notes,
  currentNote,
  currentNotebook,
  tags,
  currentTag
});

const configureStore = (initialState) => {
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
};

export default configureStore;
