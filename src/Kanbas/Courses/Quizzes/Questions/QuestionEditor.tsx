import { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaPencilAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { createQuestion } from "../reducer";

type Question = {
    id: number;
    name: string;
    type: string;
    instructions: string;
    answers: string[];
}

export default function QuestionEditor() {
    const { cid, qid } = useParams();
    const dispatch = useDispatch();
    const { quizzes } = useSelector((state: any) => state.quizReducer);
    const quiz = quizzes.find((q: any) => q._id === qid);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null);
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

    const handleAddQuestion = () => {
        const newQuestion: Question = {
            id: questions.length + 1,
            name: "",
            type: "multiple-choice",
            instructions: "",
            answers: ["1", "2", "3", "4"],
        };
        setQuestions([...questions, newQuestion]);
    };

    return (
        <div className="wd-question-editor">
            {/* List of Questions */}
            <ul className="wd-question-list list-group mt-3">
                {questions.map(question => (
                    <li key={question.id} className="list-group-item mb-3 border border-dark rounded-1">
                        <div className="d-flex justify-content-between align-items-center">
                            {question.name}
                            <div className="fs-5">
                                <FaPencilAlt className="text-primary me-2"
                                    onClick={() => {/* handler fuction */}} />
                                <FaTrash className="text-danger"
                                    onClick={() => {/* handler fuction */}} />
                            </div>
                        </div>
                        {editingQuestionId === question.id && (
                            <div className="mt-3">
                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="question-name">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="question-name"
                                        value={editingQuestion?.name || ""}
                                        onChange={() => {/* handler fuction */}}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="question-type">Question Type</label>
                                    <select
                                        className="form-control"
                                        id="question-type"
                                        value={editingQuestion?.type || ""}
                                        onChange={() => {/* handler fuction */}}
                                    >
                                        <option value="multiple-choice">Multiple Choice</option>
                                        <option value="true-false">True/False</option>
                                        <option value="fill-in-the-blank">Fill in the Blank</option>
                                    </select>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label" htmlFor="question-instructions">Instructions</label>
                                    <textarea
                                        className="form-control"
                                        id="question-instructions"
                                        value={editingQuestion?.instructions || ""}
                                        onChange={() => {/* handler fuction */}}
                                    ></textarea>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Potential Answers</label>
                                    {editingQuestion?.type === "multiple-choice" && editingQuestion.answers.map(answer => (
                                        <div key={answer} className="input-group mb-2">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Answer"
                                                value={answer}
                                                onChange={() => {/* handler fuction */}}
                                            />
                                            <div className="input-group-text">
                                                <input
                                                    type="radio"
                                                    name="correct-answer"
                                                    checked={false}
                                                    onChange={() => {/* handler fuction */}}
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => {/* handler fuction */}}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ))}
                                    {editingQuestion?.type === "true-false" && (
                                        <div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    onChange={() => {/* handler fuction */}}
                                                />
                                                <label className="form-check-label">True</label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    onChange={() => {/* handler fuction */}}
                                                />
                                                <label className="form-check-label">False</label>
                                            </div>
                                        </div>
                                    )}
                                    {editingQuestion?.type === "fill-in-the-blank" && editingQuestion.answers.map(answer => (
                                        <div key={answer} className="input-group mb-2">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Correct Answer"
                                                value={answer}
                                                onChange={() => {/* handler fuction */}}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => {/* handler fuction */}}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ))}
                                    {(editingQuestion?.type === "multiple-choice" || editingQuestion?.type === "fill-in-the-blank") && (
                                        <a onClick={() => {/* handler fuction */}}
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
                                    <button type="button" className="btn btn-danger" onClick={() => {/* handler fuction */}}>
                                        Update Question
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <div className="text-center mt-3">
                <button className="btn btn-lg btn-secondary" onClick={handleAddQuestion}>
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
