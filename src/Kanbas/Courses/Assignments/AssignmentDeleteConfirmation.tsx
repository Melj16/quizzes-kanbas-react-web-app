export default function AssignmentDeleteConfirmation(
    { assignmentName, assignmentId, modalId, deleteAssignment }:
        { assignmentName: string; assignmentId: string; modalId:string; deleteAssignment: (id: string) => void; }
) {
    console.log(modalId);
    return (
        <div id={modalId} className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            Deleting Assignment </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to delete {assignmentName}?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Cancel </button>
                        <button onClick={() => deleteAssignment(assignmentId)} type="button" data-bs-dismiss="modal" className="btn btn-danger">
                            Yes, Delete </button>
                    </div>
                </div>
            </div>
        </div>
    );
}