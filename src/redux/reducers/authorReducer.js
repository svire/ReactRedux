import * as actionTypes from "../actionTypes";
import initialState from "./initialState";
export default function authorReducers(state = initialState.authors, action) {
  switch (action.type) {
    case actionTypes.LOAD_AUTHORS_SUCCESS:
      return action.authors;

    default:
      return state;
  }
}
