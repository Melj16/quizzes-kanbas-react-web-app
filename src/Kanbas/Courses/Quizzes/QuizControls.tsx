import { FaPlus } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

interface QuizControlsProps {
    courseId: string;
}

export default function QuizControls({ courseId }: QuizControlsProps) {
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const handleAddQuiz = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/new`);
    }
    return (
        <div id="wd-quiz-controls" className="text-nowrap">
            {(currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN') && (
            <><button className="btn btn-lg btn-secondary float-end px-2">
                    <IoEllipsisVertical className="fs-5" />
                </button><button id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end"
                    onClick={() => { handleAddQuiz(); } }>
                        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                        Quiz
                    </button></>)}
            <span className="float-start me-2">
                <div className="input-group input-group-lg">
                    <input id="wd-search-assignment" type="text"
                        className="form-control border border-left-0" placeholder="Search for Quiz" />
                </div>
            </span>
        </div>
    );
}
