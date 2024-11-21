import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import ProtectedRole from "../../Account/ProtectedRole";
import AssignmentDeleteConfirmation from "./AssignmentDeleteConfirmation";
import { useDispatch } from "react-redux";

export default function AssignmentLessonControlButtons(
    { assignmentName, assignmentId, deleteAssignment }:
        {
            assignmentName: string;
            assignmentId: string;
            deleteAssignment: (id: string) => void;
        }
) {
    const modalId = `delete-assignment-dialog-${assignmentId}`;
    console.log(assignmentId);
    return (
        <div>
            <div className="float-end">
                <ProtectedRole>
                    <FaTrash className="text-danger me-2 mb-1"
                        data-bs-toggle="modal" data-bs-target={`#${modalId}`} />
                </ProtectedRole>
                <GreenCheckmark />
                <IoEllipsisVertical className="fs-4" />
                <AssignmentDeleteConfirmation
                    assignmentName={assignmentName}
                    assignmentId={assignmentId}
                    modalId={modalId}
                    deleteAssignment={() => {
                        deleteAssignment(assignmentId);
                    }} />
            </div>
        </div>
    );
}