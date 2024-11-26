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
    const [allCourses, setAllCourses] = useState<any[]>([]);
    const [myCourses, setMyCourses] = useState<any[]>([]);
    const dispatch = useDispatch();

    const fetchAllCourses = async () => {
        const courses = await courseClient.fetchAllCourses();
        setAllCourses(courses);
    };

    const fetchMyCourses = async () => {
        const courses = await userClient.findMyCourses();
        setMyCourses(courses);
    }

    const fetchEnrollments = async () => {
        const enrollments = await userClient.findMyEnrollments(currentUser._id as string);
        dispatch(setEnrollments(enrollments));
    };

    useEffect(() => {
        fetchAllCourses();
        fetchMyCourses();
        fetchEnrollments();
    }, []);

    const enroll = async (cid: string) => {
        try {
            await enrollClient.addEnrollment(currentUser._id, cid);
            dispatch(enrollCourse({ courseId: cid, userId: currentUser._id }));
            fetchMyCourses();
        } catch (error) {
            console.error(error);
        }
    };

    const unEnroll = async (cid: string) => {
        try {
            await enrollClient.deleteEnrollment(currentUser._id, cid);
            dispatch(unenrollCourse({ courseId: cid, userId: currentUser._id }));
            fetchMyCourses();
        } catch (error) {
            console.error(error);
        }
    }

    const toggleView = () => {
        setViewAllCourse(!viewAllCourses);
    };

    const filteredCourses = currentUser.role === "STUDENT" ? (viewAllCourses ? allCourses : myCourses) : courses;

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
            <h2 id="wd-dashboard-published">Published Courses ({filteredCourses.length})</h2> <hr />
            {(currentUser.role === "STUDENT") && (
                <button type="button"
                    className="btn btn-primary float-end"
                    onClick={toggleView}>
                    {viewAllCourses ? "View Enrolled" : "View all Courses"}
                </button>
            )}
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {filteredCourses.map((course) => (
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
                                                            unEnroll(course._id);
                                                        }} >
                                                        Unenroll
                                                    </button>
                                                ) : (
                                                    <button id="wd-edit-course-click"
                                                        type="button"
                                                        className="btn btn-success me-2 mb-2"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            enroll(course._id);
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
