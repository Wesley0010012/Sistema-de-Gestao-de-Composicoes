import { Accordion, Badge, Button, Card, Col, Row, Table } from "react-bootstrap";
import {
  Download,
  Eye,
  FileEarmarkPdf,
  MusicNoteList,
  Pencil,
  Trash,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

import { EmptyState } from "../../../components/Pages/EmptyState";
import type { Page } from "../../../types/Page";
import type { Work } from "../../../types/Work";

type WorksAccordionProps = {
  works: Page<Work[]>;
  search: string;
  deletingId: number | null;
  onDelete: (work: Work) => void;
};

function storageUrl(path: string): string {
  if (!path) return "#";
  if (path.startsWith("http") || path.startsWith("/")) return path;

  return `http://localhost:8000/storage/${path}`;
}

function countScores(work: Work): number {
  return work.sections.reduce(
    (total, section) => total + section.scores.length,
    0,
  );
}

export function WorksAccordion({
  works,
  search,
  deletingId,
  onDelete,
}: WorksAccordionProps) {
  const navigate = useNavigate();

  return (
    <Card className="shadow-sm border-0 overflow-hidden">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 px-3 py-3 border-bottom bg-white">
        <div>
          <h6 className="fw-bold mb-1">Obras encontradas</h6>
          <small className="text-muted">
            {works.quantity} registro(s) no filtro atual
          </small>
        </div>

        {search && (
          <Badge bg="light" text="dark" className="border">
            Busca: {search}
          </Badge>
        )}
      </div>

      {works.data.length === 0 ? (
        <EmptyState
          icon={<MusicNoteList size={32} />}
          title="Nenhuma obra encontrada"
          description="Ajuste os filtros ou cadastre uma nova obra."
        />
      ) : (
        <Accordion flush>
          {works.data.map((work, index) => (
            <Accordion.Item eventKey={index.toString()} key={work.id}>
              <Accordion.Header>
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 w-100 pe-3">
                  <div className="flex-grow-1">
                    <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
                      <strong>{work.title}</strong>
                      {work.yearComposition && (
                        <Badge bg="light" text="dark" className="border">
                          {work.yearComposition}
                        </Badge>
                      )}
                    </div>

                    <div className="d-flex flex-wrap gap-1">
                      {work.genres.length > 0 ? (
                        work.genres.map((genre) => (
                          <span
                            key={genre.id}
                            className="badge bg-light text-dark border"
                          >
                            {genre.name}
                          </span>
                        ))
                      ) : (
                        <span className="badge bg-light text-dark border">
                          Sem gênero
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="d-none d-lg-flex flex-column text-end text-muted small">
                    <span>{work.sections.length} seção(ões)</span>
                    <span>{countScores(work)} partitura(s)</span>
                  </div>

                  <div className="d-flex align-items-center gap-2 mobile-action-row">
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={(event) => {
                        event.stopPropagation();
                        navigate(`/works/update/${work.id}`);
                      }}
                    >
                      <Pencil />
                    </Button>

                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={(event) => {
                        event.stopPropagation();
                        onDelete(work);
                      }}
                      disabled={deletingId === work.id}
                    >
                      {deletingId === work.id ? "..." : <Trash />}
                    </Button>
                  </div>
                </div>
              </Accordion.Header>

              <Accordion.Body className="bg-light">
                <Row className="g-3 mb-3">
                  <Col md={6}>
                    <div className="small text-muted mb-1">Compositores</div>
                    <div className="d-flex flex-wrap gap-1">
                      {work.composers.length > 0 ? (
                        work.composers.map((composer) => (
                          <span
                            key={composer.id}
                            className="badge bg-white text-dark border"
                          >
                            {composer.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-muted small">
                          Sem compositores
                        </span>
                      )}
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="small text-muted mb-1">Descrição</div>
                    <div className="small">
                      {work.description || "Sem descrição"}
                    </div>
                  </Col>
                </Row>

                {work.sections.length === 0 ? (
                  <div className="text-muted text-center p-3 border rounded bg-white">
                    Nenhuma seção cadastrada
                  </div>
                ) : (
                  work.sections.map((section, sectionIndex) => (
                    <div
                      key={section.id}
                      className="border rounded bg-white mb-3 overflow-hidden"
                    >
                      <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
                        <strong>Seção {sectionIndex + 1}</strong>
                        <span className="text-muted small">
                          {section.key.root} {section.key.mode}
                        </span>
                      </div>

                      <Table hover responsive size="sm" className="mb-0">
                        <thead className="table-light">
                          <tr>
                            <th className="px-3 py-2">Instrumento</th>
                            <th className="px-3 py-2">Arquivo</th>
                            <th className="px-3 py-2 text-end">Ações</th>
                          </tr>
                        </thead>

                        <tbody>
                          {section.scores.length === 0 ? (
                            <tr>
                              <td colSpan={3}>
                                <div className="text-center text-muted p-2">
                                  Nenhuma partitura
                                </div>
                              </td>
                            </tr>
                          ) : (
                            section.scores.map((score) => (
                              <tr key={score.id}>
                                <td className="px-3 py-3">
                                  {score.instrument.name}
                                </td>
                                <td className="px-3 py-3">
                                  <div className="d-flex align-items-center gap-2">
                                    <FileEarmarkPdf className="text-danger" />
                                    <span className="text-truncate">
                                      {score.path || "Sem arquivo"}
                                    </span>
                                  </div>
                                </td>

                                <td className="px-3 py-3">
                                  <div className="d-flex justify-content-end gap-2">
                                    <a
                                      href={storageUrl(score.path)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="btn btn-sm btn-outline-primary d-inline-flex align-items-center"
                                    >
                                      <Eye />
                                    </a>

                                    <a
                                      href={storageUrl(score.path)}
                                      download
                                      target="_blank"
                                      className="btn btn-sm btn-outline-success d-inline-flex align-items-center"
                                    >
                                      <Download />
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </Table>
                    </div>
                  ))
                )}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </Card>
  );
}
