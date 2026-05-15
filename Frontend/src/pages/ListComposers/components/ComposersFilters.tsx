import { Card, Col, Form, Row } from "react-bootstrap";
import type { ChangeEvent } from "react";

import { SearchBar } from "../../../components/Searchbar";
import type { Nationality } from "../../../types/Nationality";
import type { Period } from "../../../types/Period";

type ComposersFiltersProps = {
  nationalities: Nationality[];
  periods: Period[];
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onNationalityChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onPeriodChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export function ComposersFilters({
  nationalities,
  periods,
  onSearchChange,
  onNationalityChange,
  onPeriodChange,
}: ComposersFiltersProps) {
  return (
    <Card className="p-3 mb-4 shadow-sm border-0">
      <Row className="g-3 align-items-center">
        <Col lg={6}>
          <SearchBar
            label="Digite o nome do compositor..."
            onChange={onSearchChange}
          />
        </Col>

        <Col md={3}>
          <Form.Select onChange={onNationalityChange}>
            <option value="">Selecione uma nacionalidade</option>

            {nationalities.map((nationality) => (
              <option key={nationality.id} value={nationality.id}>
                {nationality.name}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col md={3}>
          <Form.Select onChange={onPeriodChange}>
            <option value="">Selecione um período</option>

            {periods.map((period) => (
              <option key={period.id} value={period.id}>
                {period.name}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
    </Card>
  );
}
