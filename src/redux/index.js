import { createStore, compose, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialStatle = {};
const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose;
const composeEnchaters = composeFunc(applyMiddleware(thunk));
const store = createStore(rootReducer(), initialStatle, composeEnchaters);

export default store;