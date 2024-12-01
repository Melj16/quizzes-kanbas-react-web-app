import { FaPencilAlt } from "react-icons/fa";
import { useParams } from "react-router";

export default function Details() {
    const { cid, qid } = useParams();
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
            <h1>Q1</h1><br /> {/* Replace with the quiz title */}
            {/* Begin Quiz Details */}
            <div className="container m-0 fs-5">
                <div className="row">
                    <p className="col col-3 text-end"><b>Quiz Type</b></p>
                    <p className="col">Graded Quiz</p>
                </div>
                <div className="row">
                    <p className="col col-3 text-end"><b>Points</b></p>
                    <p className="col">29</p>
                </div>
                <div className="row">
                    <p className="col col-3 text-end"><b>Assignment Group</b></p>
                    <p className="col">QUIZZES</p>
                </div>
                <div className="row">
                    <p className="col col-3 text-end"><b>Shuffle Answers</b></p>
                    <p className="col">No</p>
                </div>
                <div className="row">
                    <p className="col col-3 text-end"><b>Time Limit</b></p>
                    <p className="col">30 minutes</p>
                </div>
                <div className="row">
                    <p className="col col-3 text-end"><b>Multiple Attempts</b></p>
                    <p className="col">No</p>
                </div>
                <div className="row">
                    <p className="col col-3 text-end"><b>View Responses</b></p>
                    <p className="col">Always</p>
                </div>
                <div className="row">
                    <p className="col col-3 text-end"><b>Show Correct Answers</b></p>
                    <p className="col">Immediately</p>
                </div>
                <div className="row">
                    <p className="col col-3 text-end"><b>One Question at a Time</b></p>
                    <p className="col">Yes</p>
                </div>
                <div className="row">
                    <p className="col col-3 text-end"><b>Require Respondus LockDown Browser</b></p>
                    <p className="col">No</p>
                </div>
                <div className="row">
                    <p className="col col-3 text-end"><b>Required to View Quiz Results</b></p>
                    <p className="col">No</p>
                </div>
                <div className="row">
                    <p className="col col-3 text-end"><b>WebcamRequired</b></p>
                    <p className="col">No</p>
                </div>
                <div className="row">
                    <p className="col col-3 text-end"><b>Lock Questions After Answering</b></p>
                    <p className="col">No</p>
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
                    <p className="col">Sep 21 at 1PM</p>
                    <p className="col">Everyone</p>
                    <p className="col">Sep 21 at 11:40am</p>
                    <p className="col">Sep 21 at 1PM</p>
                </div>
                <hr />
            </div>
        </div>
    );
}