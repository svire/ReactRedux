import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import CourseForm from "../courses/CourseForm";
import {newCourse} from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import {toast} from "react-toastify";

import * as authorActions from "../../redux/actions/authorsActions";
//import {getCourseBySlug} from "../../api/courseApi";

export function ManageCoursePage({
  courses,
  authors,
  history,
  loadAuthors,
  loadCourses,
  saveCourse,
  ...props
}) {
  const [course, setCourse] = useState({...props.course});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    } else {
      setCourse({...props.course});
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }, [props.course]); //auto populate the editing

  //onSave={alo}   onChange={alo2}

  const handleChange = (event) => {
    const {name, value} = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  };

  const formIsValid = () => {
    const {title, authorId, category} = course;
    const errors = {};

    if (!title) errors.title = "Title is required";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success("Course SAVED!");
        history.push("/courses/");
      })
      .catch((error) => {
        setSaving(false); //so you can try again
        setErrors({onSave: error.message});
      });
  };

  return (
    <>
      {authors.length === 0 || courses.length === 0 ? (
        <Spinner />
      ) : (
        <CourseForm
          errors={errors}
          authors={authors}
          course={course}
          onChange={handleChange}
          onSave={handleSave}
          saving={saving}
        />
      )}
    </>
  );
}
ManageCoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  course: PropTypes.object.isRequired,
  //actions: PropTypes.object.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  //own props...to access components props
  const slug = ownProps.match.params.slug; //Route path='/course/:slug

  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course: course,
    //course: newCourse,
    courses: state.courses,
    authors: state.authors,
  };
}

//map dispatch to props as an object
const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
  saveCourse: courseActions.saveCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
