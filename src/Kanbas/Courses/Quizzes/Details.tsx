import { FaPencilAlt } from "react-icons/fa";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import * as quizClient from "./client";

export default function Details() {
    const { cid, qid } = useParams();
    const [quiz, setQuiz] = useState<any>(qid ? quizClient.getQuiz(qid) : null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchQuiz = async () => {
            if (qid) {
                const fetchedQuiz = await quizClient.getQuiz(qid);
                setQuiz(fetchedQuiz);
            }
            setLoading(false);
        };
        fetchQuiz();
    }, [qid]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!quiz) {
        return <div>Quiz not found</div>;
    }

    return (
        <div className="w-100">
            <div className="d-flex justify-content-center">
                <button className="btn btn-lg btn-light border rounded-1 me-2">
                    Preview
                </button>
                <a href={`#/Kanbas/Courses/${cid}/Quizzes/${qid}/edit`}>
                    <button className="btn btn-lg btn-light border rounded-1">
                        Edit
                        <FaPencilAlt className="ms-1" />
                    </button>
                </a>
            </div>
            <br /><hr />
            <h1>{quiz.name}</h1><br />
            {/* Begin Quiz Details */}
            <div className="container m-0 fs-5">
                <div className="row">
                    <p className="col col-3 text-end"><b>Quiz Instructions</b></p>
                    <p className="col">{quiz.instructions}</p>
                </div>
                <div className="row">
                    <p className="col col-3 text-end"><b>Quiz Type</b></p>
                    <p className="col">{quiz.type}</p>
                </div>
                <div className="row">
                    <p className="col col-3 text-end"><b>Points</b></p>
                    <p className="col">{quiz.points}</p>
                </div>
                <div className="row">
                    <p className="col col-3 text-end"><b>Assignment Group</b></p>
                    <p className="col">{quiz.assignment_group}</p>
                </div>
                <div className="row">
                    <p className="col col-3 text-end"><b>Shuffle Answers</b></p>
                    <p className="col">{quiz.shuffle_questions ? "Yes" : "No"}</p>
                </div>
                <div className="row">
                    <p className="col col-3 text-end"><b>Time Limit</b></p>
                    <p className="col">{quiz.time_limit} minutes</p>
                </div>
                <div className="row">
                    <p className="col col-3 text-end"><b>Multiple Attempts</b></p>
                    <p className="col">{quiz.multiple_attempts ? "Yes" : "No"}</p>
                </div>
                <div className="row">
                    <p className="col col-3 text-end"><b>View Responses</b></p>
                    <p className="col">{quiz.show_responses ? "Yes" : "No"}</p>
                </div>
                <div className="row">
                    <p className="col col-3 text-end"><b>Show Correct Answers</b></p>
                    <p className="col">{quiz.show_answers ? "Yes" : "No"}</p>
                </div>
                <div className="row">
                    <p className="col col-3 text-end"><b>One Question at a Time</b></p>
                    <p className="col">{quiz.one_at_a_time ? "Yes" : "No"}</p>
                </div>
                <div className="row">
                    <p className="col col-3 text-end"><b>WebcamRequired</b></p>
                    <p className="col">{quiz.web_cam ? "Yes" : "No"}</p>
                </div>
                <div className="row">
                    <p className="col col-3 text-end"><b>Lock Questions After Answering</b></p>
                    <p className="col">{quiz.lock_answers ? "Yes" : "No"}</p>
                </div>
            </div>
            {/* Quiz Dates here */}
            <div className="container fs-5 m-0">
                <div className="row">
                    <b className="col">Due</b>
                    <b className="col">For</b>
                    <b className="col">Available from</b>
                    <b className="col">Until</b>
                </div>
                <hr />
                <div className="row">
                    <p className="col">{quiz.due}</p>
                    <p className="col">{quiz.for}</p>
                    <p className="col">{quiz.available}</p>
                    <p className="col">{quiz.until}</p>
                </div>
                <hr />
            </div>
        </div>
    );
}
