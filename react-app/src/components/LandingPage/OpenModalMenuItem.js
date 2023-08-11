import React from 'react';
import { useModal } from '../../context/Modal';
import DeleteIcon from '../Icons/DeleteIcon';
import EditIcon from '../Icons/EditIcon';

function OpenModalMenuItem({
    itemType,
    modalComponent, // component to render inside the modal
    itemText, // text of the menu item that opens the modal
    buttonText, // text for the button element (when itemType is 'button')
    onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
    onModalClose, // optional: callback function that will be called once the modal is closed
    className,
}) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (onItemClick) onItemClick();
    };

    if (itemType === 'list') {
        return <li className={className} onClick={onClick}>{itemText}</li>;
    } else if (itemType === 'button') {
        return <button className={className} onClick={onClick}>{buttonText}</button>;
    } else if (itemType === 'delete_icon') {
        return <DeleteIcon className={className} onClick={onClick}>{itemText}</DeleteIcon>;
    } else if (itemType === 'edit_icon') {
        return <EditIcon className={className} onClick={onClick}>{itemText}</EditIcon>;
    }

    return null; // Return null if itemType is not recognized
}

export default OpenModalMenuItem;
