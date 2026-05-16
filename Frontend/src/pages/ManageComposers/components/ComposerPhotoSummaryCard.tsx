import { Button, Card, Form } from "react-bootstrap";
import { Camera, Save, Trash } from "react-bootstrap-icons";
import type { ChangeEvent } from "react";

import { resolveImagePath } from "../../../components/Image/CircularImage";

type ComposerPhotoSummaryCardProps = {
  preview: string | null;
  isAlive: boolean;
  hasNationality: boolean;
  periodsCount: number;
  saving: boolean;
  isEdit: boolean;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemovePhoto: () => void;
  onCancel: () => void;
};

export function ComposerPhotoSummaryCard({
  preview,
  isAlive,
  hasNationality,
  periodsCount,
  saving,
  isEdit,
  onImageChange,
  onRemovePhoto,
  onCancel,
}: ComposerPhotoSummaryCardProps) {
  const previewPath = preview ? resolveImagePath(preview) : null;

  return (
    <Card
      className="shadow-sm border-0 mb-3 text-center sticky-top"
      style={{ top: 16 }}
    >
      <Card.Body>
        <h6 className="fw-bold mb-1">Foto do compositor</h6>
        <small className="text-muted d-block mb-3">
          Imagem usada na listagem
        </small>

        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: "50%",
            backgroundColor: "#f1f1f1",
            margin: "0 auto 15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {previewPath ? (
            <img
              src={previewPath}
              alt="preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              onError={(event) => {
                if (event.currentTarget.src.endsWith("/avatar.png")) return;
                event.currentTarget.src = "/avatar.png";
              }}
            />
          ) : (
            <Camera size={34} className="text-muted" />
          )}
        </div>

        <Form.Control type="file" accept="image/*" onChange={onImageChange} />
        {preview && (
          <Button
            variant="outline-danger"
            size="sm"
            className="mt-3"
            onClick={onRemovePhoto}
          >
            <Trash className="me-2" />
            Remover foto
          </Button>
        )}

        <div className="text-start border-top mt-4 pt-4">
          <h6 className="fw-bold mb-3">Resumo</h6>

          <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
            <span className="text-muted">Nacionalidade</span>
            <strong>{hasNationality ? "Selecionada" : "Pendente"}</strong>
          </div>

          <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
            <span className="text-muted">Períodos</span>
            <strong>{periodsCount}</strong>
          </div>

          <div className="d-flex justify-content-between mb-4">
            <span className="text-muted">Status</span>
            <strong>{isAlive ? "Vivo" : "Histórico"}</strong>
          </div>

          <Button className="w-100 mb-2" type="submit" disabled={saving}>
            <Save className="me-2" />
            {saving ? "Salvando..." : isEdit ? "Atualizar" : "Cadastrar"}
          </Button>

          <Button
            className="w-100"
            variant="outline-secondary"
            type="button"
            onClick={onCancel}
          >
            Cancelar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
