import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { FileEarmarkPdf, MusicNoteList, Plus, Trash } from "react-bootstrap-icons";

import type { Instrument } from "../../../types/Instrument";
import type { KeyOption } from "../../../types/KeyOption";
import type { ScoreForm, SectionForm } from "../types";

type WorkSectionsCardProps = {
  sections: SectionForm[];
  keyRoots: KeyOption[];
  keyModes: KeyOption[];
  instruments: Instrument[];
  onAddSection: () => void;
  onUpdateSection: (
    index: number,
    field: keyof SectionForm,
    value: string,
  ) => void;
  onRemoveSection: (index: number) => void;
  onAddScore: (sectionIndex: number) => void;
  onUpdateScore: (
    sectionIndex: number,
    scoreIndex: number,
    field: keyof ScoreForm,
    value: number | string | File | null,
  ) => void;
  onRemoveScore: (sectionIndex: number, scoreIndex: number) => void;
};

export function WorkSectionsCard({
  sections,
  keyRoots,
  keyModes,
  instruments,
  onAddSection,
  onUpdateSection,
  onRemoveSection,
  onAddScore,
  onUpdateScore,
  onRemoveScore,
}: WorkSectionsCardProps) {
  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3 mobile-stack">
          <div>
            <h6 className="fw-bold mb-1">Seções e partituras</h6>
            <small className="text-muted">
              Organize tonalidades e arquivos PDF por seção
            </small>
          </div>

          <Button size="sm" onClick={onAddSection}>
            <Plus className="me-1" />
            Nova seção
          </Button>
        </div>

        {sections.length === 0 ? (
          <div className="text-muted text-center p-5 border rounded bg-light">
            <MusicNoteList size={28} className="mb-2" />
            <div>Nenhuma seção cadastrada</div>
          </div>
        ) : (
          sections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="border rounded mb-3 overflow-hidden bg-white"
            >
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 px-3 py-3 bg-light border-bottom">
                <div>
                  <strong>Seção {sectionIndex + 1}</strong>
                  <div className="text-muted small">
                    {section.keyRoot || "Tonalidade"} ·{" "}
                    {section.keyMode || "Modo"} · {section.scores.length}{" "}
                    partitura(s)
                  </div>
                </div>

                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onRemoveSection(sectionIndex)}
                >
                  <Trash />
                </Button>
              </div>

              <div className="p-3">
                <Row className="g-3 mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Tonalidade *</Form.Label>
                      <Form.Select
                        value={section.keyRoot}
                        onChange={(event) =>
                          onUpdateSection(
                            sectionIndex,
                            "keyRoot",
                            event.target.value,
                          )
                        }
                      >
                        <option value="">Selecione</option>
                        {keyRoots.map((root) => (
                          <option key={root.value} value={root.value}>
                            {root.value}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Modo *</Form.Label>
                      <Form.Select
                        value={section.keyMode}
                        onChange={(event) =>
                          onUpdateSection(
                            sectionIndex,
                            "keyMode",
                            event.target.value,
                          )
                        }
                      >
                        <option value="">Selecione</option>
                        {keyModes.map((mode) => (
                          <option key={mode.value} value={mode.value}>
                            {mode.value}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-between align-items-center mb-2 mobile-stack">
                  <small className="fw-bold">Partituras</small>

                  <Button
                    size="sm"
                    variant="outline-success"
                    onClick={() => onAddScore(sectionIndex)}
                  >
                    <Plus className="me-1" />
                    Adicionar
                  </Button>
                </div>

                {section.scores.length === 0 ? (
                  <div className="text-muted small border rounded p-3 bg-light">
                    Nenhuma partitura nesta seção
                  </div>
                ) : (
                  section.scores.map((score, scoreIndex) => (
                    <div key={scoreIndex} className="border rounded p-3 mb-2">
                      <Row className="g-2 align-items-end">
                        <Col md={5}>
                          <Form.Group>
                            <Form.Label>Instrumento</Form.Label>
                            <Form.Select
                              value={score.instrumentId}
                              onChange={(event) =>
                                onUpdateScore(
                                  sectionIndex,
                                  scoreIndex,
                                  "instrumentId",
                                  Number(event.target.value) || "",
                                )
                              }
                            >
                              <option value="">Selecione</option>
                              {instruments.map((instrument) => (
                                <option
                                  key={instrument.id}
                                  value={instrument.id}
                                >
                                  {instrument.name}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>PDF</Form.Label>
                            <Form.Control
                              type="file"
                              accept="application/pdf"
                              onChange={(event) =>
                                onUpdateScore(
                                  sectionIndex,
                                  scoreIndex,
                                  "file",
                                  (event.currentTarget as HTMLInputElement)
                                    .files?.[0] || null,
                                )
                              }
                            />
                          </Form.Group>
                        </Col>

                        <Col md={1} className="text-end">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() =>
                              onRemoveScore(sectionIndex, scoreIndex)
                            }
                          >
                            <Trash />
                          </Button>
                        </Col>
                      </Row>

                      {score.file && (
                        <div className="d-flex align-items-center gap-2 text-muted small mt-2">
                          <FileEarmarkPdf />
                          {score.file.name}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </Card.Body>
    </Card>
  );
}
