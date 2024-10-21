import { BsGripVertical } from "react-icons/bs";
import AssignmentControls from "./AssignmentControls";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { MdOutlineAssignment } from "react-icons/md";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { assignments } from "../../Database";
import { useParams } from "react-router";
import * as db from "../../Database";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;
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
          <ul id="wd-lessons" className="list-group rounded-0">
            {
              assignments.filter((assignment: any) => assignment.course === cid).map((assignment: any) => (
              <li className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between" style={{ width: "100%" }}>
                <div className="align-content-center">
                <BsGripVertical className="me-2 fs-3" />
                <MdOutlineAssignment className="text-success me-2 fs-3" />
              </div>
              <div className="flex-grow-1 px-2">
                <a className="wd-assignment-link link-dark text-decoration-none"
                  href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                  <b>{assignment.title}</b>
                </a>
                <p>
                  <span className="text-danger">Multiple Modules </span>
                  <b> Not available until </b> 
                  {new Date(assignment.available).toDateString().split(' ').slice(1).join(' ')}
                  &nbsp;at {new Date(assignment.available).toLocaleTimeString('en-US')}
                  &nbsp;| <b>Due</b> {new Date(assignment.due).toDateString().split(' ').slice(1).join(' ')}
                  &nbsp;at {new Date(assignment.due).toLocaleTimeString('en-US')} 
                  &nbsp;| {assignment.points} pts</p>
              </div>
              <div className="align-content-center justify-content-end">
                <LessonControlButtons />
              </div>
              </li>))
            }
          </ul>
        </li>
      </ul>
    </div>
  );
}
