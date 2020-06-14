import {createStore, applyMiddleware} from "redux";
import rootReducers from "./reducers/index";

import thunk from "redux-thunk";
export default function configureStore(initialState) {
  return createStore(rootReducers, initialState, applyMiddleware(thunk));
}
