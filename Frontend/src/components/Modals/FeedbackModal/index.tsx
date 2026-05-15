import { Modal, Button } from "react-bootstrap";

type Props = {
  show: boolean;
  onClose: () => void;
  title: string;
  message: string;
  variant?: "success" | "danger";
};

export function FeedbackModal({
  show,
  onClose,
  title,
  message,
  variant = "success",
}: Props) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className={`text-${variant}`}>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{message}</Modal.Body>

      <Modal.Footer>
        <Button variant={variant} onClick={onClose}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
