import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";

export default function AssignmentControlButtons() {
    return (
        <div className="float-end">
            <span className="border border-dark p-2 rounded-5 m-2">
                <small>40% of Total</small>
            </span>
            <BsPlus className="fs-4" />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}