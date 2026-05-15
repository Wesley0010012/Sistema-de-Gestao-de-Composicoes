import { Button, Card } from "react-bootstrap";
import { Save } from "react-bootstrap-icons";

type WorkSummaryCardProps = {
  genresCount: number;
  composersCount: number;
  sectionsCount: number;
  scoresCount: number;
  saving: boolean;
  isEdit: boolean;
  onCancel: () => void;
};

export function WorkSummaryCard({
  genresCount,
  composersCount,
  sectionsCount,
  scoresCount,
  saving,
  isEdit,
  onCancel,
}: WorkSummaryCardProps) {
  return (
    <Card className="shadow-sm border-0 sticky-top" style={{ top: 16 }}>
      <Card.Body>
        <h6 className="fw-bold mb-3">Resumo</h6>

        <div className="d-grid gap-2 mb-4">
          <div className="d-flex justify-content-between border-bottom pb-2">
            <span className="text-muted">Gêneros</span>
            <strong>{genresCount}</strong>
          </div>
          <div className="d-flex justify-content-between border-bottom pb-2">
            <span className="text-muted">Compositores</span>
            <strong>{composersCount}</strong>
          </div>
          <div className="d-flex justify-content-between border-bottom pb-2">
            <span className="text-muted">Seções</span>
            <strong>{sectionsCount}</strong>
          </div>
          <div className="d-flex justify-content-between">
            <span className="text-muted">Partituras</span>
            <strong>{scoresCount}</strong>
          </div>
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
      </Card.Body>
    </Card>
  );
}
