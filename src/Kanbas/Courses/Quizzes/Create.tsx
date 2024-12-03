import { FaPencilAlt } from "react-icons/fa";
import { Navigate, useNavigate, useParams } from "react-router";
import { useState } from "react";
import * as quizClient from "./client";

export default function Details() {
    const { cid, qid } = useParams();
    const [quiz, setQuiz] = useState<any>(qid ? quizClient.getQuiz(qid) : {
        name: "",
        type: "",
        points: 0,
        shuffle_questions: false,
        time_limit: "",
        multiple_attempts: false,
        show_answers: false,
        access_code: "",
        one_at_a_time: false,
        lock_question_after_answering: false,
        web_cam: false,
        due: "",
        for: "",
        available: "",
        until: "",
        published: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setQuiz((prev: any) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };
    const navigate = useNavigate();
    const handleCreateQuiz = (courseId: string) => {
        quizClient.createQuiz(courseId, quiz);
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
    }

    return (
        <div className="w-100">
            <div className="d-flex justify-content-center">
                <button className="btn btn-lg btn-light border rounded-1 me-2">
                    Preview
                </button>
                <button className="btn btn-lg btn-light border rounded-1">
                    Edit
                    <FaPencilAlt className="ms-1" />
                </button>
            </div>
            <br /><hr />
            <h1>
                <label>Quiz Name</label>
                <input 
                    className="form-control" 
                    type="text" 
                    name="name" 
                    value={quiz.name} 
                    onChange={handleInputChange} 
                />
            </h1>
            <br />
            {/* Begin Quiz Details */}
            <div className="container m-0 fs-5">
                {[
                    { label: "Quiz Type", name: "type", type: "text" },
                    { label: "Points", name: "points", type: "number" },
                    { label: "Shuffle Answers", name: "shuffle_questions", type: "checkbox" },
                    { label: "Time Limit (minutes)", name: "time_limit", type: "text" },
                    { label: "Multiple Attempts", name: "multiple_attempts", type: "checkbox" },
                    { label: "Show Correct Answers", name: "show_answers", type: "checkbox" },
                    { label: "Access Code", name: "access_code", type: "text" },
                    { label: "One Question at a Time", name: "one_at_a_time", type: "checkbox" },
                    { label: "Lock questions after answering", name: "lock_question_after_answering", type: "checkbox" },
                    { label: "Webcam Required", name: "web_cam", type: "checkbox" },
                    { label: "Publish", name: "published", type: "checkbox" },
                ].map(({ label, name, type }) => (
                    <div className="row" key={name}>
                        <p className="col col-3 text-end"><b>{label}</b></p>
                        <p className="col">
                            {type === "checkbox" ? (
                                <input
                                    type="checkbox"
                                    name={name}
                                    checked={quiz[name]}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <input
                                    className="form-control"
                                    type={type}
                                    name={name}
                                    value={quiz[name]}
                                    onChange={handleInputChange}
                                />
                            )}
                        </p>
                    </div>
                ))}
            </div>
            {/* Quiz Dates */}
            <div className="container fs-5 m-0">
                <div className="row">
                    <b className="col">Due</b>
                    <b className="col">For</b>
                    <b className="col">Available from</b>
                    <b className="col">Until</b>
                </div>
                <hr />
                <div className="row">
                    {["due", "for", "available", "until"].map((field) => (
                        <p className="col" key={field}>
                            <input
                                className="form-control"
                                type="text"
                                name={field}
                                value={quiz[field]}
                                onChange={handleInputChange}
                            />
                        </p>
                    ))}
                </div>
                <hr />
                <div className="d-flex justify-content-left">
                    <button className="btn btn-lg btn-light
                        border rounded-1">
                        cancel
                    </button>
                    <button onClick={() => cid && handleCreateQuiz(cid)} className="btn btn-lg btn-danger
                        border rounded-1">
                        Create Quiz
                    </button>
                </div>
            </div>
        </div>
    );
}
