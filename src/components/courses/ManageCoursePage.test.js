import React from "react";
import {mount} from "enzyme";
import {authors, newCourse, courses} from "../../../tools/mockData";
import {ManageCoursePage} from "./ManageCoursePage";
//we dont want default export
function render(args) {
  const defaultProps = {
    authors,
    courses,
    history: {},
    saveCourse: jest.fn(),
    loadCourses: jest.fn(),
    course: newCourse,
    match: {},
  };

  const props = {...defaultProps, ...args};

  return mount(<ManageCoursePage {...props} />);
  //return mount(<Provider store={store}> <ManageCoursePage {...props} />  </Provider>);  or add export function ManageCoursePage
} //export connected version of component

it("sets error when attempting to save an empty title field", () => {
  const wrapper = render();
  wrapper.find("form").simulate("submit");
  const error = wrapper.find("./alert").first();
  expect(error.text()).toBe("Title is required");
});
