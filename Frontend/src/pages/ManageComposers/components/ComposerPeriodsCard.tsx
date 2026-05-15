import { Card, Col, Form, Row } from "react-bootstrap";

import type { Period } from "../../../types/Period";

type ComposerPeriodsCardProps = {
  periods: Period[];
  selectedPeriods: number[];
  onToggle: (periodId: number) => void;
};

export function ComposerPeriodsCard({
  periods,
  selectedPeriods,
  onToggle,
}: ComposerPeriodsCardProps) {
  return (
    <Card className="shadow-sm border-0">
      <Card.Body>
        <div className="mb-4">
          <h6 className="fw-bold mb-1">Períodos musicais</h6>
          <small className="text-muted">
            Selecione os períodos associados ao compositor
          </small>
        </div>

        <Row className="g-2">
          {periods.map((period) => (
            <Col md={6} key={period.id}>
              <div className="border rounded p-3 bg-white h-100">
                <Form.Check
                  type="checkbox"
                  label={period.name}
                  checked={selectedPeriods.includes(period.id)}
                  onChange={() => onToggle(period.id)}
                />
              </div>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
}
