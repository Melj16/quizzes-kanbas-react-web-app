import { Navigate, useNavigate, useParams } from "react-router";
import * as courseClient from "../client";
import * as assignmentClient from "./client";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { addAssignment, updateAssignment } from "./reducer";
import { useDispatch, useSelector } from "react-redux";

export default function AssignmentEditor({
    assignmentTitle = "",
    assignmentDescription = "",
    assignmentPoints = "",
    assignmentDue = "",
    assignmentAvailable = "",
    assignmentUntil = "",
    Edited = false,
}: {
    assignmentTitle?: string;
    assignmentDescription?: string;
    assignmentPoints?: string;
    assignmentDue?: string;
    assignmentAvailable?: string;
    assignmentUntil?: string;
    Edited?: boolean;
}) {
    const { aid } = useParams();
    const { cid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const saveAssignment = async (assignment: any) => {
        await assignmentClient.updateAssignment(assignment);
        dispatch(updateAssignment(assignment));
    };
    const createAssignmentForCourse = async (assignment: any) => {
        if (!cid) return;
        const newAssignment = await courseClient.createAssignmentForCourse(cid as string, assignment);
        dispatch(addAssignment(newAssignment));
    };

    const { assignments } = useSelector((state: any) => state.assignmentReducer);
    const assignmentEdit = Edited ? assignments.find((a: any) => a._id === aid) : null;

    const [title, setTitle] = useState(assignmentTitle);
    const [description, setDescription] = useState(assignmentDescription);
    const [points, setPoints] = useState(assignmentPoints);
    const [due, setDue] = useState(assignmentDue);
    const [available, setAvailable] = useState(assignmentAvailable);
    const [until, setUntil] = useState(assignmentUntil);

    useEffect(() => {
        if (Edited && assignmentEdit) {
            setTitle(assignmentEdit.title || "");
            setDescription(assignmentEdit.description || "");
            setPoints(assignmentEdit.points || "");
            setDue(assignmentEdit.due || "");
            setAvailable(assignmentEdit.available || "");
            setUntil(assignmentEdit.until || "");
        }
    }, [assignmentEdit, Edited]);

    // handles saving the assignment depending on if it is a new assignment or an edited one
    const handleSave = () => {
        const assignment = {
            _id: aid || Date.now().toString(),
            title,
            description,
            points,
            due,
            available,
            until,
            course: cid,
        };
        Edited ? saveAssignment(assignment) : createAssignmentForCourse(assignment);
        navigate(`/Kanbas/Courses/${cid}/Assignments`);
    };

    // handles formatting date so it can be displayed in assignment editor
    const handleDate = (date: string) => {
        return date.split('T')[0];
    };

    return (
        <div id="wd-assignments-editor">
            <div className="form-group mb-3 ps-1">
                <label htmlFor="input1" className="form-label text-dark">
                    Assignment Name
                </label>
                <input type="text" className="form-control"
                    id="input1" value={title} placeholder="Assignment Name"
                    onChange={(e) => { setTitle(e.target.value) }} />
            </div>
            <div className="form-group mb-3 ps-1">
                <textarea className="form-control wd-description" id="textarea1" placeholder="Assignment Description"
                    rows={10} value={description}
                    onChange={(e) => { setDescription(e.target.value) }}>
                </textarea>
            </div>
            {/* Begin Grid */}
            <div className="container">
                <div className="row form-group mb-3 text-dark">
                    <label htmlFor="wd-points" className="col-4 form-label text-end">
                        Points
                    </label>
                    <input
                        type="text"
                        id="wd-points"
                        className="col form-control"
                        value={points}
                        placeholder="100"
                        onChange={(e) => setPoints(e.target.value)} />
                </div>
                <div className="row form-group mb-3 text-dark">
                    <label htmlFor="wd-group" className="col-4 form-label text-end">
                        Assignment Group
                    </label>
                    <select name="wd-group" id="wd-group" className="col form-select">
                        <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                        <option value="LABS">LABS</option>
                        <option value="READING">READING</option>
                    </select>
                </div>
                <div className="row form-group mb-3 text-dark">
                    <label htmlFor="wd-display-grade-as" className="col-4 form-label text-end">
                        Display Grade as
                    </label>
                    <select name="wd-display-grade-as" id="wd-display-grade-as" className="col form-select">
                        <option value="PERCENTAGE">percentage</option>
                        <option value="DECIMAL">decimal</option>
                        <option value="FRACTION">fraction</option>
                    </select>
                </div>
                <div className="row form-group mb-3 text-dark">
                    <label htmlFor="wd-submission-type" className="col-4 form-label text-end">
                        Submission Type
                    </label>
                    <div className="col border rounded-2">
                        <select name="wd-submission-type" id="wd-submission-type" className="col form-select my-2">
                            <option value="ONLINE">online</option>
                            <option value="PAPER">on paper</option>
                        </select>
                        <br />
                        <label className="form-check-label">
                            <strong>Online Entry Options:</strong>
                        </label>
                        <div className="form-check my-3">
                            <input className="form-check-input" name="check-entry-option" type="checkbox" value="" id="wd-text-entry" />
                            <label className="form-check-label" htmlFor="wd-text-entry">
                                Text Entry
                            </label>
                        </div>
                        <div className="form-check my-3">
                            <input className="form-check-input" name="check-entry-option" type="checkbox" value="" id="wd-website-url" />
                            <label className="form-check-label" htmlFor="wd-website-url">
                                Website URL
                            </label>
                        </div>
                        <div className="form-check my-3">
                            <input className="form-check-input" name="check-entry-option" type="checkbox" value="" id="wd-media-recordings" />
                            <label className="form-check-label" htmlFor="wd-media-recordings">
                                Media Recordings
                            </label>
                        </div>
                        <div className="form-check my-3">
                            <input className="form-check-input" name="check-entry-option" type="checkbox" value="" id="wd-annotations" />
                            <label className="form-check-label" htmlFor="wd-annotations">
                                Student Annotations
                            </label>
                        </div>
                        <div className="form-check my-3">
                            <input className="form-check-input" name="check-entry-option" type="checkbox" value="" id="wd-file" />
                            <label className="form-check-label" htmlFor="wd-file">
                                File Uploads
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row form-group mb-3 text-dark">
                    <label htmlFor="wd-assign" className="col-4 form-label text-end">
                        Assign
                    </label>
                    <div className="col border rounded-2">
                        <label className="form-check-label" htmlFor="wd-assign">
                            <strong>Assign to</strong>
                        </label>
                        <select name="wd-assign-to" id="wd-assign" className="col form-select my-2">
                            <option value="EVERYONE">Everyone</option>
                            <option value="HONORS">Honors</option>
                        </select>
                        <label className="form-check-label" htmlFor="wd-due-date">
                            <strong><small>Due</small></strong>
                        </label>
                        <input
                            type="date"
                            id="wd-due-date"
                            className="form-control mb-3"
                            value={handleDate(due)}
                            onChange={(e) => setDue(e.target.value)} />
                        <div className="row">
                            <div className="col-sm-6 col-xs-12">
                                <label htmlFor="wd-available-date">
                                    <strong><small>Available From</small></strong>
                                </label>
                                <input
                                    type="date"
                                    id="wd-available-date"
                                    className="form-control col mb-3"
                                    value={handleDate(available)}
                                    onChange={(e) => setAvailable(e.target.value)} />
                            </div>
                            <div className="col-sm-6 col-xs-12">
                                <label htmlFor="wd-until-date">
                                    <strong><small>Until</small></strong>
                                </label>
                                <input
                                    type="date"
                                    id="wd-until-date"
                                    className="form-control col mb-3"
                                    value={handleDate(until)}
                                    onChange={(e) => setUntil(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="d-flex float-end">
                <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
                    <button className="btn btn-light border text-secondary mx-1">Cancel</button>
                </Link>
                <button type="button" onClick={handleSave}
                    className="btn btn-danger border border-dark mx-1">
                    Save
                </button>
            </div>
        </div >
    );
}