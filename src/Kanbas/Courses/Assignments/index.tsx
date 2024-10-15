import { BsGripVertical } from "react-icons/bs";
import AssignmentControls from "./AssignmentControls";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { MdOutlineAssignment } from "react-icons/md";
import AssignmentControlButtons from "./AssignmentControlButtons";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <AssignmentControls /><br /><br /><br /><br />
      <ul id="wd-modules" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <b>ASSIGNMENTS</b>
            <AssignmentControlButtons />
          </div>
          <ul className="wd-lessons list-group rounded-0">
            <li className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between" style={{ width: "100%" }}>
              <div className="align-content-center">
                <BsGripVertical className="me-2 fs-3" />
                <MdOutlineAssignment className="text-success me-2 fs-3" />
              </div>
              <div className="flex-grow-1 px-2">
                <a className="wd-assignment-link link-dark text-decoration-none"
                  href="#/Kanbas/Courses/1234/Assignments/123">
                  <b>A1</b>
                </a>
                <p>
                  <span className="text-danger">Multiple Modules </span>
                  |<b> Not available until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100 pts</p>
              </div>
              <div className="align-content-center justify-content-end">
                <LessonControlButtons />
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between" style={{ width: "100%" }}>
              <div className="align-content-center">
                <BsGripVertical className="me-2 fs-3" />
                <MdOutlineAssignment className="text-success me-2 fs-3" />
              </div>
              <div className="flex-grow-1 px-2">
                <a className="wd-assignment-link link-dark text-decoration-none"
                  href="#/Kanbas/Courses/1234/Assignments/123">
                  <b>A2</b>
                </a>
                <p>
                  <span className="text-danger">Multiple Modules </span>
                  <b> Not available until</b> May 13 at 12:00am | <b>Due</b> May 20 at 11:59pm | 100 pts</p>
              </div>
              <div className="align-content-center justify-content-end">
                <LessonControlButtons />
              </div>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between" style={{ width: "100%" }}>
              <div className="align-content-center">
                <BsGripVertical className="me-2 fs-3" />
                <MdOutlineAssignment className="text-success me-2 fs-3" />
              </div>
              <div className="flex-grow-1 px-2">
                <a className="wd-assignment-link link-dark text-decoration-none"
                  href="#/Kanbas/Courses/1234/Assignments/123">
                  <b>A3</b>
                </a>
                <p>
                  <span className="text-danger">Multiple Modules </span>
                  |<b> Not available until</b> May 20 at 12:00am | <b>Due</b> May 27 at 11:59pm | 100 pts</p>
              </div>
              <div className="align-content-center justify-content-end">
                <LessonControlButtons />
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
