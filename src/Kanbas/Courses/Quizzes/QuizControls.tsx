import { FaPlus } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";

export default function QuizControls() {
    const { cid } = useParams();
    const navigate = useNavigate();

    return (
        <div id="wd-quiz-controls" className="text-nowrap">
            <button className="btn btn-lg btn-secondary float-end px-2">
                <IoEllipsisVertical className="fs-5" />
            </button>
            <button id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end"
                onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/new/edit`)}>
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Quiz
            </button>
            <span className="float-start me-2">
                <div className="input-group input-group-lg">
                    <input id="wd-search-assignment" type="text"
                        className="form-control border border-left-0" placeholder="Search for Quiz" />
                </div>
            </span>
        </div>
    );
}