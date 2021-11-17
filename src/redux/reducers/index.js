import { combineReducers } from "redux";
import storeReducer from './storeReducer';

const rootReducer = () => combineReducers({storeReducer});
export default rootReducer;