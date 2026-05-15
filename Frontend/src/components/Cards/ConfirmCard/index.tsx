import { Modal, Button } from "react-bootstrap";
import { ExclamationTriangle } from "react-bootstrap-icons";

type ConfirmCardProps = {
  show: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
};

export function ConfirmCard({
  show,
  title = "Confirmar ação",
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmCardProps) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Body className="p-4 text-center">
        {/* Ícone */}
        <div
          className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
          style={{
            width: 60,
            height: 60,
            background: "#fff3cd",
          }}
        >
          <ExclamationTriangle size={28} className="text-warning" />
        </div>

        {/* Título */}
        <h5 className="fw-bold">{title}</h5>

        {/* Mensagem */}
        <p className="text-muted mb-4">{message}</p>

        {/* Ações */}
        <div className="d-flex gap-2 justify-content-center">
          <Button variant="light" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </Button>

          <Button variant="danger" onClick={onConfirm} disabled={loading}>
            {loading ? "Processando..." : confirmLabel}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
