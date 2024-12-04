import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaPencilAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import * as quizClient from "./client";
import { setQuestions } from "./reducer";

export default function QuestionEditor() {
    const { cid, qid } = useParams();
    const dispatch = useDispatch();
    const { questions } = useSelector((state: any) => state.questionReducer);
    const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);

    const fetchQuestions = async () => {
        const questions = await quizClient.findQuestionsForQuiz(qid as string);
        dispatch(setQuestions(questions));
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    return (
        <div className="wd-question-editor">
            {/* List of Questions */}
            <ul className="wd-question-list list-group mt-3">
                {questions.map((question: any) => (
                    <li className="list-group-item mb-3 border border-dark rounded-1">
                        <div className="d-flex justify-content-between align-items-center">
                            {question.title}
                            <div className="fs-5">
                                <FaPencilAlt className="text-primary me-2"
                                    onClick={() => { setEditingQuestionId(editingQuestionId === question._id ? null : question._id) }} />
                                <FaTrash className="text-danger"
                                    onClick={() => {/* handler fuction */ }} />
                            </div>
                        </div>
                        {editingQuestionId === question._id && (
                            <div className="mt-3">
                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="question-name"><b>Name</b></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="question-name"
                                        value={question?.title || ""}
                                        onChange={() => {/* handler fuction */ }}
                                    />
                                </div>
                                <div className="form-group mb-3 d-flex justify-content-between">
                                    <div className="w-50">
                                        <label className="form-label" htmlFor="question-type"><b>Question Type</b></label>
                                        <select
                                            className="form-control"
                                            id="question-type"
                                            value={question?.type || ""}
                                            onChange={() => {/* handler fuction */ }}
                                        >
                                            <option value="multiple-choice">Multiple Choice</option>
                                            <option value="true-false">True/False</option>
                                            <option value="fill-in-the-blank">Fill in the Blank</option>
                                        </select>
                                    </div>
                                    <div className="w-25">
                                        <label className="form-label" htmlFor="question-points"><b>Points</b></label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="question-points"
                                            value={question?.points || ""}
                                            onChange={() => {/* handler fuction */ }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="question-instructions"><b>Question</b></label>
                                    <textarea
                                        className="form-control"
                                        id="question-instructions"
                                        value={question?.question || ""}
                                        onChange={() => {/* handler fuction */ }}
                                    ></textarea>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label"><b>Potential Answers</b></label>
                                    {question?.type === "multiple-choice" && question.choices.map((choice: any) => (
                                        <div className="input-group mb-2">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Answer"
                                                value={choice}
                                                onChange={() => {/* handler fuction */ }}
                                            />
                                            <div className="input-group-text">
                                                <input
                                                    type="radio"
                                                    name="correct-answer"
                                                    checked={question.answer === choice}
                                                    onChange={() => {/* handler fuction */ }}
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => {/* handler fuction */ }}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ))}
                                    {question?.type === "true-false" && (
                                        <div>
                                            <div className="form-check">
                                                <input
                                                    id="wd-question-true-input"
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    onChange={() => {/* handler fuction */ }}
                                                />
                                                <label className="form-check-label" htmlFor="wd-question-true-input">
                                                    True
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    id="wd-question-false-input"
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    onChange={() => {/* handler fuction */ }}
                                                />
                                                <label className="form-check-label" htmlFor="wd-question-false-input">
                                                    False
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                    {question?.type === "fill-in-the-blank" && question.choices.map((choice: any) => (
                                        <div key={choice} className="input-group mb-2">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Correct Answer"
                                                value={choice}
                                                onChange={() => {/* handler fuction */ }}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => {/* handler fuction */ }}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ))}
                                    {(question?.type === "multiple-choice" || question?.type === "fill-in-the-blank") && (
                                        <a onClick={() => {/* handler fuction */ }}
                                            className="float-end text-danger text-decoration-none d-flex align-items-center"
                                            style={{ cursor: "pointer" }}>
                                            <FaPlus className="me-2" />
                                            Add Another Answer
                                        </a>
                                    )}
                                </div>
                                <br /><hr />
                                <div className="d-flex justify-content-start">
                                    <button type="button" className="btn btn-light border texxt-secondary me-2" onClick={() => setEditingQuestionId(null)}>
                                        Cancel
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={() => {/* handler fuction */ }}>
                                        Update Question
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <div className="text-center mt-3">
                <button className="btn btn-lg btn-secondary" onClick={() => {/* Handler function */ }}>
                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    New Question
                </button>
            </div>
            {/* Save and Cancel buttons */}
            <hr />
            <div className="d-flex float-end">
                <Link to={`/Kanbas/Courses/${cid}/Quizzes`}>
                    <button className="btn btn-light border text-secondary mx-1">Cancel</button>
                </Link>
                <button type="button" className="btn btn-danger border border-dark mx-1">
                    Save
                </button>
            </div>
        </div>
    );
}
