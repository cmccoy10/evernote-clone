import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import user from './ducks/user';
import notebooks from './ducks/notebooks';
import notes from './ducks/notes';
import tags from './ducks/tags';
import currentNote from './ducks/currentNote';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({
    user,
    notebooks,
    notes,
    currentNote,
    tags,
})
const configureStore = initialState => {
    return createStore(
        reducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk))
    )
}
export default configureStore;