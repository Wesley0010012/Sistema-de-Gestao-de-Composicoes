import { Badge, Button, Card, Table } from "react-bootstrap";
import { Pencil, People, Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

import { ComposerImageIcon } from "../../../components/Image/ComposerImageIcon";
import { EmptyState } from "../../../components/Pages/EmptyState";
import type { Composer } from "../../../types/Composer";
import type { Page } from "../../../types/Page";
import { formatCustomDate } from "../../../utils/date-utils";

type ComposersTableProps = {
  composers: Page<Composer[]>;
  onDelete: (composer: Composer) => void;
};

export function ComposersTable({ composers, onDelete }: ComposersTableProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="shadow-sm border-0 d-flex flex-column overflow-hidden"
      style={{ minHeight: "60vh" }}
    >
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 px-3 py-3 border-bottom bg-white">
        <div>
          <h6 className="fw-bold mb-1">Compositores encontrados</h6>
          <small className="text-muted">
            {composers.quantity} registro(s) no filtro atual
          </small>
        </div>
      </div>

      <Table
        hover
        responsive
        className="mb-0 align-middle flex-grow-1 overflow-auto"
      >
        <thead className="table-light">
          <tr>
            <th className="px-3 py-2">Compositor</th>
            <th className="px-3 py-2">Nascimento</th>
            <th className="px-3 py-2">Falecimento</th>
            <th className="px-3 py-2">Nacionalidade</th>
            <th className="px-3 py-2">Períodos</th>
            <th className="px-3 py-2 text-end">Ações</th>
          </tr>
        </thead>

        <tbody>
          {composers.data.length === 0 ? (
            <tr>
              <td colSpan={6}>
                <EmptyState
                  icon={<People size={32} />}
                  title="Nenhum resultado encontrado"
                  description="Tente ajustar os filtros ou a busca."
                />
              </td>
            </tr>
          ) : (
            composers.data.map((composer) => (
              <tr key={composer.id}>
                <td className="px-3 py-3">
                  <div className="d-flex align-items-center gap-2">
                    <ComposerImageIcon path={composer.photoPath} />
                    <div>
                      <div className="fw-semibold">{composer.name}</div>
                      <small className="text-muted">
                        {composer.periods.length} período(s)
                      </small>
                    </div>
                  </div>
                </td>

                <td className="px-3 py-3">
                  {formatCustomDate(composer.birthDate)}
                </td>

                <td className="px-3 py-3">
                  {composer.deathDate
                    ? formatCustomDate(composer.deathDate)
                    : "N/A"}
                </td>

                <td className="px-3 py-3">
                  <Badge bg="light" text="dark" className="border">
                    {composer.nationality?.name}
                  </Badge>
                </td>

                <td className="px-3 py-3">
                  <div className="d-flex flex-wrap gap-1">
                    {composer.periods.length > 0 ? (
                      composer.periods.map((period) => (
                        <span
                          key={period.id}
                          className="badge bg-light text-dark border"
                        >
                          {period.name}
                        </span>
                      ))
                    ) : (
                      <span className="badge bg-light text-dark border">
                        Sem períodos
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-3 py-3">
                  <div className="d-flex justify-content-end gap-2">
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() =>
                        navigate(`/admin/composers/update/${composer.id}`)
                      }
                    >
                      <Pencil />
                    </Button>

                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => onDelete(composer)}
                    >
                      <Trash />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Card>
  );
}
