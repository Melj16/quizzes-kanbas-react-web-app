import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import * as quizClient from "./client";

export default function DetailsEditor() {
    const { cid, qid } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [quiz, setQuiz] = useState<any>(qid ? null : {
        name: "",
        type: "Graded Quiz",
        points: 0,
        assignment_group: "QUIZZES",
        shuffle_questions: true,
        time_limit: 20,
        multiple_attempts: false,
        number_of_attempts: 1,
        show_answers: false,
        access_code: "",
        one_at_a_time: true,
        web_cam: false,
        lock_question_after_answering: false,
        due: "",
        for: "",
        available: "",
        until: "",
        published: false,
    });
    const [editorState, setEditorState] = useState<EditorState>(
        EditorState.createEmpty()
    );

    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuiz = async () => {
            if (qid) {
                const fetchedQuiz = await quizClient.getQuiz(qid);
                setQuiz(fetchedQuiz);

                const contentState = ContentState.createFromText(
                    fetchedQuiz.instructions || ""
                );
                setEditorState(EditorState.createWithContent(contentState));

                setLoading(false);
            }
            else {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [qid]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setQuiz((prev: any) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSaveQuiz = (courseId: string) => {
        const instructions = editorState.getCurrentContent().getPlainText();

        const updatedQuiz = { ...quiz, instructions };

        if (qid) {
            quizClient.updateQuiz(qid, updatedQuiz);
        } else {
            quizClient.createQuiz(courseId, updatedQuiz);
        }
        if (quiz.published) {
            navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
        } else {
            navigate(`/Kanbas/Courses/${courseId}/Quizzes/${qid}/edit`);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!quiz) {
        return <div>Quiz not found</div>;
    }

    return (
        <div id="wd-details-editor">
            <div className="form-group mb-3">
                <label className="form-label" htmlFor="wd-quiz-name">
                    Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="wd-quiz-name"
                    placeholder="Quiz Name"
                    name="name"
                    value={quiz.name || ""}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="wd-quiz-description">
                    Quiz Instructions:
                </label>
                <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={setEditorState} // Update the EditorState
                    editorStyle={{ border: "1px solid #ced4da", borderRadius: "0.25rem", padding: "0.5rem" }} // Add outline
                />
            </div>
            {/* Grid begins here */}
            <div className="container mt-3">
                <div className="row form-group mb-3">
                    <label className="col col-4 form-label text-end" htmlFor="wd-quiz-type">
                        Quiz Type
                    </label>
                    <select className="col form-select" id="wd-quiz-type" name="type" value={quiz.type || ""} onChange={handleInputChange}>
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
                    <select className="col form-select" id="wd-quiz-assignment-group" name="assignment_group" value={quiz.assignment_group || ""} onChange={handleInputChange}>
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
                            <input className="form-check-input" type="checkbox" id="wd-shuffle-answers" defaultChecked name="shuffle_answers" checked={quiz.shuffle_answers || ""} onChange={handleInputChange}/>
                            <label className="form-check-label" htmlFor="wd-shuffle-answers">
                                Shuffle Answers
                            </label>
                            <div className="row my-3">
                                <div className="col d-flex align-items-center">
                                    <input type="text" className="w-25 form-control me-2" id="wd-time-limit-value" defaultValue={20} name="time_limit" value={quiz.time_limit || ""} onChange={handleInputChange}/>
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
                        <input className="form-check-input me-2" type="checkbox" id="wd-multiple-attempts" name="multiple_attempts" checked={quiz.multiple_attempts || ""} onChange={handleInputChange}/>
                        <label className="form-check-label mb-3" htmlFor="wd-multiple-attempts">
                            Allow Multiple Attempts
                        </label>
                        <div className="mb-3">
                        <label className="form-check-label" htmlFor="wd-number-of-attempts">
                            Number of Attempts: (0 for unlimited)
                        </label>
                        <input type="number" className="form-control mb-3" id="wd-number-of-attempts" placeholder="Number of Attempts" name="number_of_attempts" value={quiz.number_of_attempts || 1} onChange={handleInputChange}/>
                        </div>
                        <div className="mb-3">
                            <input className="form-check-input me-2" type="checkbox" id="wd-show-correct-answers" name="show_answers" checked={quiz.show_answers || ""} onChange={handleInputChange}/>
                            <label className="form-check-label" htmlFor="wd-show-correct-answers">
                                Show Correct Answers
                            </label>
                        </div>
                        <div className="mb-3">
                            <label className="form-check-label" htmlFor="wd-quiz-access-code">
                                Access Code:
                            </label>
                            <input type="text" className="form-control"
                                id="wd-quiz-access-code" placeholder="Access Code" name="access_code" value={quiz.access_code || ""} onChange={handleInputChange}/>
                        </div>
                        <div className="mb-3">
                            <input className="form-check-input me-2" type="checkbox" id="wd-one-question-at-a-time" defaultChecked name="one_at_a_time" checked={quiz.one_at_a_time} onChange={handleInputChange}/>
                            <label className="form-check-label" htmlFor="wd-one-question-at-a-time">
                                One Question at a Time
                            </label>
                        </div>
                        <div className="mb-3">
                            <input className="form-check-input me-2" type="checkbox" id="wd-webcam-required" name="web_cam" checked={quiz.web_cam || false} onChange={handleInputChange}/>
                            <label className="form-check-label" htmlFor="wd-webcam-required">
                                Webcam Required
                            </label>
                        </div>
                        <div className="mb-3">
                            <input className="form-check-input me-2" type="checkbox" id="wd-lock-answers" name="lock_answers" checked={quiz.lock_answers || false} onChange={handleInputChange}/>
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
                        <select name="assign-to" id="wd-assign" className="col form-select my-2" value={quiz.assign_to || ""}onChange={handleInputChange}>
                            <option value="EVERYONE">Everyone</option>
                            <option value="HONORS">Honors</option>
                        </select>
                        <label className="form-check-label" htmlFor="wd-due-date">
                            <strong><small>Due</small></strong>
                        </label>
                        <input
                            type="date"
                            id="wd-due-date"
                            className="form-control mb-3" name="due" value={quiz.due || ""} onChange={handleInputChange}/>
                        <div className="row">
                            <div className="col-sm-6 col-xs-12">
                                <label htmlFor="wd-available-date">
                                    <strong><small>Available From</small></strong>
                                </label>
                                <input
                                    type="date"
                                    id="wd-available-date"
                                    className="form-control col mb-3" name="available" value={quiz.available || ""} onChange={handleInputChange}/>
                            </div>
                            <div className="col-sm-6 col-xs-12">
                                <label htmlFor="wd-until-date">
                                    <strong><small>Until</small></strong>
                                </label>
                                <input
                                    type="date"
                                    id="wd-until-date"
                                    className="form-control col mb-3" name="until" value={quiz.until || ""} onChange={handleInputChange}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            {/* Save and Cancel buttons */}
            <div className="d-flex float-end">
            <button onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)} className="btn btn-lg btn-light
                        border rounded-1">
                        cancel
                    </button>
                    <button onClick={() => cid && handleSaveQuiz(cid)} className="btn btn-lg btn-danger
                        border rounded-1">
                        {qid ? "Update Quiz" : "Create Quiz"}
                    </button>
                    {!quiz.published && (
                        <button onClick={() => { if (cid) { quiz.published = true; handleSaveQuiz(cid); }}} className="btn btn-lg btn-danger
                        border rounded-1">
                        Save and Publish Quiz
                    </button>)}
            </div>
        </div>
    );
}