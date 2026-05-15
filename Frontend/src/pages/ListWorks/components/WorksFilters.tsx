import { Card, Col, Form, Row } from "react-bootstrap";
import type { ChangeEvent } from "react";

import { SearchBar } from "../../../components/Searchbar";
import type { Genre } from "../../../types/Genre";
import { ComposerSelect } from "./ComposerSelect";

type WorksFiltersProps = {
  genres: Genre[];
  selectedGenreId: number | "";
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onGenreChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export function WorksFilters({
  genres,
  selectedGenreId,
  onSearchChange,
  onGenreChange,
}: WorksFiltersProps) {
  return (
    <Card className="p-3 mb-4 shadow-sm border-0">
      <Row className="g-3 align-items-center">
        <Col lg={6}>
          <SearchBar
            label="Digite o nome da obra..."
            onChange={onSearchChange}
          />
        </Col>

        <Col md={3}>
          <Form.Select value={selectedGenreId} onChange={onGenreChange}>
            <option value="">Todos os gêneros</option>

            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col md={3}>
          <ComposerSelect />
        </Col>
      </Row>
    </Card>
  );
}
