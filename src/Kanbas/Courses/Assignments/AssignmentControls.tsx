import { FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import ProtectedRole from "../../Account/ProtectedRole";
import { Navigate, useNavigate, useParams } from "react-router";

export default function AssignmentControls() {
    const {cid} = useParams();
    const navigate = useNavigate();
    const handleAddAssignment = () => {
        navigate(`/Kanbas/Courses/${cid}/Assignments/new`);
    }
    return (
        <div id="wd-assignment-controls" className="text-nowrap">
            <ProtectedRole>
                <button id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end"
                onClick={handleAddAssignment}>
                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    Assignment
                </button>
                <button id="wd-add-module-btn" className="btn btn-lg btn-secondary me-1 float-end">
                    <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                    Group
                </button>
            </ProtectedRole>
            <span className="float-start">
                <div className="input-group input-group-lg">
                    <label htmlFor="wd-search-assignment" className="input-group-text bg-transparent">
                        <CiSearch className="position-relative" />
                    </label>
                    <input id="wd-search-assignment" type="text"
                        className="form-control border border-left-0" placeholder="Search..." />
                </div>
            </span>
        </div>
    );
}