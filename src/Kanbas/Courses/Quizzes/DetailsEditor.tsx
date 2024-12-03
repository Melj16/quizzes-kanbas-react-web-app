import { Link, useParams } from "react-router-dom";

export default function DetailsEditor() {
    const {cid, qid} = useParams();
    return (
        <div id="wd-details-editor">
            <div className="form-group mb-3">
                <label className="form-label" htmlFor="wd-quiz-name">
                    Name
                </label>
                <input type="text" className="form-control"
                    id="wd-quiz-name" placeholder="Quiz Name" />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="wd-quiz-description">Quiz Instructions:</label>
                <textarea className="form-control" id="wd-quiz-description"
                    placeholder="Quiz Instructions" rows={5} />
            </div>
            {/* Grid begins here */}
            <div className="container mt-3">
                <div className="row form-group mb-3">
                    <label className="col col-4 form-label text-end" htmlFor="wd-quiz-type">
                        Quiz Type
                    </label>
                    <select className="col form-select" id="wd-quiz-type">
                        <option value="GRADED">Graded Quiz</option>
                        <option value="PRACTICE">Practice Quiz</option>
                        <option value="GRADED_SURVEY">Graded Survey</option>
                        <option value="UNGRADED_SURVEY">Ungraded Survey</option>
                    </select>
                </div>
                <div className="row form-group mb-4">
                    <label className="col col-4 form-label text-end" htmlFor="wd-quiz-assignment-group">
                        Assignment Group
                    </label>
                    <select className="col form-select" id="wd-quiz-assignment-group">
                        <option value="QUIZZES">Quizzes</option>
                        <option value="EXAMS">Exams</option>
                        <option value="ASSIGNMENTS">Assignments</option>
                        <option value="PROJECT">Project</option>
                    </select>
                </div>
                <div className="row form-group">
                    <div className="col col-4"></div>
                    <div className="col px-0">
                        <b>Options</b>
                        <div className="form-check mt-3">
                            <input className="form-check-input" type="checkbox" id="wd-shuffle-answers" defaultChecked />
                            <label className="form-check-label" htmlFor="wd-shuffle-answers">
                                Shuffle Answers
                            </label>
                            <div className="row my-3">
                                <div className="col-4">
                                    <input className="form-check-input" type="checkbox" id="wd-time-limit" />
                                    <label className="form-check-label" htmlFor="wd-time-limit">
                                        Time Limit
                                    </label>
                                </div>
                                <div className="col d-flex align-items-center">
                                    <input type="text" className="w-25 form-control me-2" id="wd-time-limit-value" defaultValue={20} />
                                    <label className="form-label m-0" htmlFor="wd-time-limit-value">
                                        minutes
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row form-group mb-3">
                    <div className="col col-4"></div>
                    <div className="col border py-2 rounded mt-3">
                        <input className="form-check-input me-2" type="checkbox" id="wd-multiple-attempts" />
                        <label className="form-check-label mb-3" htmlFor="wd-multiple-attempts">
                            Allow Multiple Attempts
                        </label>
                        <div className="mb-3">
                            <input className="form-check-input me-2" type="checkbox" id="wd-show-correct-answers" />
                            <label className="form-check-label" htmlFor="wd-show-correct-answers">
                                Show Correct Answers
                            </label>
                        </div>
                        <div className="mb-3">
                            <label className="form-check-label" htmlFor="wd-quiz-access-code">
                                Access Code:
                            </label>
                            <input type="text" className="form-control"
                                id="wd-quiz-access-code" placeholder="Access Code" />
                        </div>
                        <div className="mb-3">
                            <input className="form-check-input me-2" type="checkbox" id="wd-one-question-at-a-time" defaultChecked />
                            <label className="form-check-label" htmlFor="wd-one-question-at-a-time">
                                One Question at a Time
                            </label>
                        </div>
                        <div className="mb-3">
                            <input className="form-check-input me-2" type="checkbox" id="wd-webcam-required" />
                            <label className="form-check-label" htmlFor="wd-webcam-required">
                                Webcam Required
                            </label>
                        </div>
                        <div className="mb-3">
                            <input className="form-check-input me-2" type="checkbox" id="wd-lock-answers" />
                            <label className="form-check-label" htmlFor="wd-lock-answers">
                                Lock Questions After Answering
                            </label>
                        </div>
                    </div>
                </div>
                {/* Assign and Dates */}
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
                            className="form-control mb-3" />
                        <div className="row">
                            <div className="col-sm-6 col-xs-12">
                                <label htmlFor="wd-available-date">
                                    <strong><small>Available From</small></strong>
                                </label>
                                <input
                                    type="date"
                                    id="wd-available-date"
                                    className="form-control col mb-3" />
                            </div>
                            <div className="col-sm-6 col-xs-12">
                                <label htmlFor="wd-until-date">
                                    <strong><small>Until</small></strong>
                                </label>
                                <input
                                    type="date"
                                    id="wd-until-date"
                                    className="form-control col mb-3" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            {/* Save and Cancel buttons */}
            <div className="d-flex float-end">
                <Link to={`/Kanbas/Courses/${cid}/Quizzes`}>
                    <button className="btn btn-light border text-secondary mx-1">Cancel</button>
                </Link>
                <button type="button"
                    className="btn btn-danger border border-dark mx-1">
                    Save
                </button>
            </div>
        </div>
    );
}