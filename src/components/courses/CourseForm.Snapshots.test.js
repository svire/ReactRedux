import React from "react";
import renderer from "react-test-renderer";
import CourseForm from "./CourseForm";
import {authors, courses} from "../../../tools/mockData";

it("sets submit button label Saving...'When saving button is true", () => {
  const tree = renderer.create(
    <CourseForm
      authors={authors}
      course={courses[0]}
      onSave={jest.fn()} //empyt function
      onChange={jest.fn()}
      saving
    />
  );

  expect(tree).toMatchSnapshot();
});

it("sets submit button label Save...'When saving button is false", () => {
  const tree = renderer.create(
    <CourseForm
      authors={authors}
      course={courses[0]}
      onSave={jest.fn()} //empyt function
      onChange={jest.fn()}
      saving={false}
    />
  );

  expect(tree).toMatchSnapshot();
});
