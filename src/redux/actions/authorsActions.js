import * as actionTypes from "../actionTypes";
import * as authorApi from "../../api/authorApi";
import {beginApiCall, endApiCall} from "./apiStatusActions";
export function loadAuthorsSuccess(authors) {
  return {type: actionTypes.LOAD_AUTHORS_SUCCESS, authors: authors};
}

export function loadAuthors() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch((error) => {
        dispatch(endApiCall(error));
        throw error;
      });
  };
}
