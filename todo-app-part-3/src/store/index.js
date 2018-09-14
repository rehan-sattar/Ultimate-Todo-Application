import { createStore , applyMiddleware } from "redux";
import thunk  from "redux-thunk";
import ultimateTodoReducer from "./Reducer";
const store = createStore(ultimateTodoReducer , applyMiddleware(thunk));
export default store;