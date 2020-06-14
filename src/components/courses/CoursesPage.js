import React, {Component} from "react";
import {connect} from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import CourseList from "./CourseList";
import * as authorActions from "../../redux/actions/authorsActions";
import Spinner from "../common/Spinner";
import {Redirect} from "react-router-dom";
import {toast} from "react-toastify";

class CoursesPage extends Component {
  state = {
    redirectToAddCoursePage: false,
  };

  componentDidMount() {
    const {courses, authors, actions} = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }

  /*
  handleDeleteCourse = (course) => {
    toast.success("Course deleted");
    this.props.actions.deleteCourse(course).catch((error) => {
      toast.error("Delete failed!" + error.message, {autoClose: false});
    });
  }; */

  handleDeleteCourse = async (course) => {
    toast.success("Course deleted");
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete failed!" + error.message, {autoClose: false});
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to='/course/' />}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{marginBottom: 20}}
              className='btn btn-primary add-course'
              onClick={() => this.setState({redirectToAddCoursePage: true})}
            >
              Add Course
            </button>
            <CourseList
              courses={this.props.courses}
              onDeleteClick={this.handleDeleteCourse}
            />{" "}
          </>
        )}
      </>
    );
  }
}
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  //createCourse: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    //courses: state.courses,
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
}

/*
//map dispatch to props as an object
const mapDispatchToProps = {
  createCourse: courseActions.createCourse,
};
*/

function mapDispatchToProps(dispatch) {
  return {
    //createCourse: (course) => dispatch(courseActions.createCourse(course)),
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
