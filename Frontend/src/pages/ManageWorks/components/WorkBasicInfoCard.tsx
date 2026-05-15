import { Card, Col, Form, Row } from "react-bootstrap";
import type { ChangeEvent } from "react";

import type { WorkFormState } from "../types";

type WorkBasicInfoCardProps = {
  form: Pick<
    WorkFormState,
    | "title"
    | "subtitle"
    | "catalogNumber"
    | "opusNumber"
    | "yearComposition"
    | "description"
  >;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export function WorkBasicInfoCard({ form, onChange }: WorkBasicInfoCardProps) {
  return (
    <Card className="mb-4 shadow-sm border-0">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h6 className="fw-bold mb-1">Informações básicas</h6>
            <small className="text-muted">
              Identificação, catálogo e contexto da obra
            </small>
          </div>
        </div>

        <Row>
          <Col md={7}>
            <Form.Group className="mb-3">
              <Form.Label>Título *</Form.Label>
              <Form.Control
                size="lg"
                name="title"
                value={form.title}
                onChange={onChange}
                placeholder="Sinfonia nº 5"
              />
            </Form.Group>
          </Col>

          <Col md={5}>
            <Form.Group className="mb-3">
              <Form.Label>Subtítulo</Form.Label>
              <Form.Control
                size="lg"
                name="subtitle"
                value={form.subtitle}
                onChange={onChange}
                placeholder="Allegro con brio"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Opus</Form.Label>
              <Form.Control
                type="number"
                name="opusNumber"
                value={form.opusNumber}
                onChange={onChange}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Catálogo</Form.Label>
              <Form.Control
                type="number"
                name="catalogNumber"
                value={form.catalogNumber}
                onChange={onChange}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Ano</Form.Label>
              <Form.Control
                type="number"
                name="yearComposition"
                value={form.yearComposition}
                onChange={onChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-0">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            value={form.description}
            onChange={onChange}
          />
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
