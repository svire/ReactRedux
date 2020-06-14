import React from "react";
import CourseForm from "./CourseForm";
import {shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({adapter: new Adapter()});
function renderCourseForm(args) {
  const defaultProps = {
    authors: [],
    course: {},
    value: "ale",
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {},
  };

  const props = {...defaultProps, ...args, value: "251"};
  return shallow(<CourseForm {...props} />);
}

it("renders form and header", () => {
  const wrapper = renderCourseForm();
  expect(wrapper.find("form").length).toBe(1);
  expect(wrapper.find("h2").text()).toEqual("Add Course");
});

it('labels save buttons as "Save when not saing', () => {
  const wrapper = renderCourseForm();
  expect(wrapper.find("button").text()).toBe("Save");
});
