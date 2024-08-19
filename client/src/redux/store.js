// src/redux/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'; // Optional: for Redux DevTools
import { userReducer } from './reducers/userReduxer';

const rootReducer = combineReducers({
    // Add your reducers here
    userReducer
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
