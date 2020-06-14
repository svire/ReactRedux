import * as actionTypes from "../actionTypes";
import initialState from "./initialState";
export default function courseReducers(state = initialState.courses, action) {
  switch (action.type) {
    case actionTypes.CREATE_COURSE_SUCCESS:
      // debugger;
      return [...state, {...action.course}];
    case actionTypes.LOAD_COURSES_SUCCESS:
      return action.courses;
    case actionTypes.UPDATE_COURSE_SUCCESS:
      return state.map((course) => {
        course.id === action.course.id ? action.course : course;
      });

    case actionTypes.DELETE_COURSE_OPTIMISTIC:
      return state.filter((course) => course.id !== action.course.id);

    default:
      return state;
  }
}
