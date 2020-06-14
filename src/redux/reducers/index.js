import {combineReducers} from "redux";

import courses from "./courseReducer";
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReduces";

const rootReducers = combineReducers({
  courses: courses,
  authors: authors,
  apiCallsInProgress: apiCallsInProgress,
});

export default rootReducers;
