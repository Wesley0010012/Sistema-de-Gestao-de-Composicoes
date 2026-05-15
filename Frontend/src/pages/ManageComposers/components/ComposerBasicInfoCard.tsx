import { Card, Col, Form, Row } from "react-bootstrap";
import type { ChangeEvent } from "react";

import type { Nationality } from "../../../types/Nationality";

type ComposerBasicInfoCardProps = {
  form: {
    name: string;
    birthDate: string;
    deathDate: string;
    nationality: number | "";
  };
  isAlive: boolean;
  nationalities: Nationality[];
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  onAliveChange: (checked: boolean) => void;
};

export function ComposerBasicInfoCard({
  form,
  isAlive,
  nationalities,
  onChange,
  onAliveChange,
}: ComposerBasicInfoCardProps) {
  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Body>
        <div className="mb-4">
          <h6 className="fw-bold mb-1">Informações básicas</h6>
          <small className="text-muted">
            Dados biográficos e nacionalidade do compositor
          </small>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Nome *</Form.Label>
          <Form.Control
            size="lg"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Wolfgang Amadeus Mozart"
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Data de Nascimento *</Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                value={form.birthDate}
                onChange={onChange}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Data de falecimento</Form.Label>
              <Form.Control
                type="date"
                name="deathDate"
                value={form.deathDate}
                onChange={onChange}
                disabled={isAlive}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Check
            className="border rounded p-3 ps-5 bg-light"
            type="checkbox"
            label="Compositor ainda está vivo"
            checked={isAlive}
            onChange={(event) => onAliveChange(event.target.checked)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Nacionalidade *</Form.Label>
          <Form.Select
            name="nationality"
            value={form.nationality}
            onChange={onChange}
          >
            <option value="">Selecione a nacionalidade</option>

            {nationalities.map((nationality) => (
              <option key={nationality.id} value={nationality.id}>
                {nationality.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
