import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { deleteAssignment } from "./reducer";
import ProtectedRole from "../../Account/ProtectedRole";
import AssignmentDeleteConfirmation from "./AssignmentDeleteConfirmation";
import { useDispatch } from "react-redux";

export default function AssignmentLessonControlButtons(
    { assignmentName, assignmentId, deleteAssignment }:
        {
            assignmentName: string;
            assignmentId: string;
            deleteAssignment: (assignmentId: string) => void;
        }
) {
    const dispatch = useDispatch();
    return (
        <div>
            <div className="float-end">
                <ProtectedRole>
                    <FaTrash className="text-danger me-2 mb-1"
                        data-bs-toggle="modal" data-bs-target="#wd-delete-assignment-dialog" />
                </ProtectedRole>
                <GreenCheckmark />
                <IoEllipsisVertical className="fs-4" />
                <AssignmentDeleteConfirmation
                    assignmentName={assignmentName}
                    deleteAssignment={() => {
                        deleteAssignment(assignmentId);
                    }} />
            </div>
        </div>
    );
}