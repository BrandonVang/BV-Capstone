function EditIcon({ onClick, children }) {
    return (
        <div className="edit-icon-container" onClick={onClick} >
            <i className="fas fa-edit open-modal-menu-icon "> </i>
            {children}
        </div>
    );
}

export default EditIcon;
