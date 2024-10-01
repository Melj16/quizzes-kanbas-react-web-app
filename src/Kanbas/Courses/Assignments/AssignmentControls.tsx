import { FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

export default function AssignmentControls() {
    return (
        <div id="wd-assignment-controls" className="text-nowrap">
            <button id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Assignment
            </button>
            <button id="wd-add-module-btn" className="btn btn-lg btn-secondary me-1 float-end">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Group
            </button>
            <span className="float-start">
                <div className="input-group input-group-lg">
                    <span className="input-group-text bg-transparent">
                        <CiSearch className="position-relative" />
                    </span>
                    <input id="wd-search-assignment" type="text" 
                        className="form-control border border-left-0" placeholder="Search..." />
                </div>
            </span>
        </div>
    );
}