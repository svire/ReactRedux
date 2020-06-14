import {createStore, applyMiddleware, compose} from "redux";
import rootReducers from "./reducers/index";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

import thunk from "redux-thunk";
export default function configureStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //add supp for redux devtools
  return createStore(
    rootReducers,
    initialState,
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant())) //applyMiddleware(reduxImmutableStateInvariant())
  );
}
