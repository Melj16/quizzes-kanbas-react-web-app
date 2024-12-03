import { Routes, Route, Navigate, useParams, useLocation } from "react-router";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import { useDispatch } from "react-redux";
import Users from "./Users";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/Details";
import QuizDetailsTabs from "./Quizzes/DetailsTabs";

export default function Courses({ courses }: { courses: any[];}) {
    const { cid } = useParams();
    const course = courses.find((course) => course._id === cid);
    const { pathname } = useLocation();
    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name} &gt; {pathname.split("/")[4]} {pathname.split("/").length === 6 ? `> ${pathname.split("/")[5]}` : ""}
            </h2><hr />
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CoursesNavigation />
                </div>
                <Routes>
                    <Route path="/" element={<Navigate to="Home" />} />
                    <Route path="Home" element={<Home />} />
                    <Route path="Modules" element={<Modules />} />
                    <Route path="Assignments" element={<Assignments />} />
                    <Route path="Assignments/new" element={<div style={{ width: "500px" }}><AssignmentEditor /></div>} />
                    <Route path="Assignments/:aid" element={<div style={{ width: "500px" }}><AssignmentEditor Edited /></div>} />
                    <Route path="Quizzes" element={<Quizzes />} />
                    <Route path="Quizzes/new" element={<QuizDetailsTabs />} />
                    <Route path="Quizzes/:qid" element={<QuizDetails />} />
                    <Route path="Quizzes/:qid/edit" element={<div style={{ width: "700px" }}><QuizDetailsTabs /></div>} />
                    <Route path="People" element={<Users />} />
                </Routes>
            </div>
        </div>
    );
}
