function DeleteIcon({ onClick, children }) {
    return (
        <div className="delete-icon-container" onClick={onClick}>
            <i className="fas fa-trash-alt open-modal-menu-icon"></i>
            {children}
        </div>
    );
}

export default DeleteIcon;
