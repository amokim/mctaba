import { useEffect, useRef } from "react";

function ConfirmDialog({ open, title, message, confirmLabel = 'Delete', onConfirm, onCancel }) {
    const dialogRef = useRef(null);

    // open/close the native <dialog> whenever the "open" prop changes
    useEffect(() => {
        const dialog = dialogRef.current;
        if (open && !dialog.open) dialog.showModal();
        if (!open && dialog.open) dialog.close();
    }, [open]);

    // clicking the dark backdrop (outside the box) counts as Cancel
    const handleBackdropClick = (e) => {
        if (e.target === dialogRef.current) onCancel();
    };

    return (
        // onCancel fires when the user presses Esc
        <dialog ref={dialogRef} className="confirm-dialog" onCancel={onCancel} onClick={handleBackdropClick}>
            <div className="confirm-body">
                <h3>{title}</h3>
                <p>{message}</p>
                <div className="confirm-actions">
                    <button type="button" className="btn-cancel" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="button" className="btn-danger" onClick={onConfirm}>
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </dialog>
    );
}

export default ConfirmDialog;
