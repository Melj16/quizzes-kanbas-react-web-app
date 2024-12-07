import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRole from "../Account/ProtectedRole";
import { enrollCourse, unenrollCourse, setEnrollments } from "./reducer";
import * as courseClient from "../Courses/client";
import * as userClient from "../Account/client";
import * as enrollClient from "./client";
export default function Dashboard({
    courses,
    course,
    setCourse,
    addNewCourse,
    deleteCourse,
    updateCourse,
    enrolling,
    setEnrolling,
    updateEnrollment
}: {
    courses: any[];
    course: any;
    setCourse: (course: any) => void;
    addNewCourse: () => void;
    deleteCourse: (course: any) => void;
    updateCourse: () => void;
    enrolling: boolean;
    setEnrolling: (enrolling: boolean) => void;
    updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
    const [viewAllCourses, setViewAllCourse] = useState(false);
    const [allCourses, setAllCourses] = useState<any[]>([]);
    const dispatch = useDispatch();

    const fetchAllCourses = async () => {
        const courses = await courseClient.fetchAllCourses();
        setAllCourses(courses);
    };

    const fetchEnrollments = async () => {
        const enrollments = await userClient.findMyEnrollments(currentUser._id as string);
        dispatch(setEnrollments(enrollments));
    };

    useEffect(() => {
        fetchAllCourses();
        // fetchMyCourses();
        // fetchEnrollments();
    }, []);

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">
                Dashboard
                <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
                    {enrolling ? "My Courses" : "All Courses"}
                </button>
            </h1> <hr />
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
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses.map((course) => (
                        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                            <div className="card rounded-3 overflow-hidden">
                                <Link to={(!enrolling || course.enrolled) ? `/Kanbas/Courses/${course._id}/Home` : '/Kanbas/Dashboard'}
                                    className="wd-dashboard-course-link text-decoration-none text-dark" >
                                    <img src={`/images/courses/RS101.png`} width="100%" height={160} />
                                    <div className="card-body">
                                        <h5 className="wd-dashboard-course-title card-title">
                                            {enrolling && (
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        updateEnrollment(course._id, !course.enrolled);
                                                    }}
                                                    className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} float-end`} >
                                                    {course.enrolled ? "Unenroll" : "Enroll"}
                                                </button>
                                            )}
                                            {course.name} </h5>
                                        <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                                            {course.description} </p>
                                        {(currentUser.role === "FACULTY" || course.enrolled || !enrolling) && (
                                                <button className="btn btn-primary"> Go </button>)
                                        }
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
