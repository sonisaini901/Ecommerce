import { Button, Modal } from "react-bootstrap";

const ConfirmDeleteModal = ({ show, onClose, onConfirm }) => {
    return (
        <Modal
            show={show}
            onHide={onClose}
            centered
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete Address</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>
                    Are you sure you want to delete this address?
                </p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    variant="danger"
                    onClick={onConfirm}
                >
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmDeleteModal;
