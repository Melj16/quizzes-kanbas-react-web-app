import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRole from "../Account/ProtectedRole";
import { enrollCourse, unenrollCourse } from "./reducer";
export default function Dashboard({
    courses,
    course,
    setCourse,
    addNewCourse,
    deleteCourse,
    updateCourse
}: {
    courses: any[];
    course: any;
    setCourse: (course: any) => void;
    addNewCourse: () => void;
    deleteCourse: (course: any) => void;
    updateCourse: () => void;
}) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
    const [viewAllCourses, setViewAllCourse] = useState(false);
    const dispatch = useDispatch();

    const toggleView = () => {
        setViewAllCourse(!viewAllCourses);
    };

    const coursesToDisplay = currentUser.role === "STUDENT" ?
        viewAllCourses ?
            courses :
            courses.filter((course) => enrollments.some((enrollment: { user: any; course: any; }) =>
                enrollment.user === currentUser._id && enrollment.course === course._id)) :
        courses;

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <ProtectedRole>
                <h5>New Course
                    <button className="btn btn-primary float-end"
                        id="wd-add-new-course-click"
                        onClick={addNewCourse} > Add </button>
                    <button className="btn btn-warning float-end me-2"
                        onClick={updateCourse} id="wd-update-course-click">
                        Update
                    </button>
                </h5><br />
                <input value={course.name} className="form-control mb-2"
                    onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                <textarea value={course.description} className="form-control"
                    onChange={(e) => setCourse({ ...course, description: e.target.value })} />
                <hr />
            </ProtectedRole>
            <h2 id="wd-dashboard-published">Published Courses ({coursesToDisplay.length})</h2> <hr />
            {(currentUser.role === "STUDENT") && (
                <button type="button"
                    className="btn btn-primary float-end"
                    onClick={toggleView}>
                    {viewAllCourses ? "View Enrolled" : "View all Courses"}
                </button>
            )}
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {coursesToDisplay.map((course) => (
                        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                            <div className="card rounded-3 overflow-hidden">
                                <Link to={currentUser.role === "FACULTY" ||
                                    enrollments.some((enrollment: { user: any; course: any; }) =>
                                        enrollment.user === currentUser._id && enrollment.course === course._id) ?
                                    `/Kanbas/Courses/${course._id}/Home` :
                                    '/Kanbas/Dashboard'}
                                    className="wd-dashboard-course-link text-decoration-none text-dark" >
                                    <img src={`/images/courses/RS101.png`} width="100%" height={160} />
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title">
                                            {course.name} </h5>
                                        <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                                            {course.description} </p>
                                        {currentUser.role == "FACULTY" ||
                                        enrollments.some((enrollment: { user: any; course: any; }) =>
                                            enrollment.user === currentUser._id && enrollment.course === course._id) && (
                                            <button className="btn btn-primary"> Go </button>)
                                        }
                                        {currentUser.role === "STUDENT" && (
                                            <div className="float-end">
                                                {enrollments.some((enrollment: { user: any; course: any; }) =>
                                                    enrollment.user === currentUser._id && enrollment.course === course._id) ? (
                                                    <button id="wd-edit-course-click"
                                                        type="button"
                                                        className="btn btn-danger me-2"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            dispatch(unenrollCourse({ courseId: course._id, userId: currentUser._id }));
                                                        }} >
                                                        Unenroll
                                                    </button>
                                                ) : (
                                                    <button id="wd-edit-course-click"
                                                        type="button"
                                                        className="btn btn-success me-2 mb-2"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            dispatch(enrollCourse({ courseId: course._id, userId: currentUser._id }));
                                                        }} >
                                                        Enroll
                                                    </button>
                                                )
                                                }
                                            </div>
                                        )}
                                        <ProtectedRole>
                                            <div className="float-end">
                                                <button id="wd-edit-course-click"
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        setCourse(course);
                                                    }}
                                                    className="btn btn-warning me-2" >
                                                    Edit
                                                </button>
                                                <button onClick={(event) => {
                                                    event.preventDefault();
                                                    deleteCourse(course._id);
                                                }} className="btn btn-danger"
                                                    id="wd-delete-course-click">
                                                    Delete
                                                </button>
                                            </div>
                                        </ProtectedRole>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </div >);
}
