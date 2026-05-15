import { Card, Form } from "react-bootstrap";
import type { ChangeEvent } from "react";

import type { Genre } from "../../../types/Genre";
import type { ComposerOption } from "../types";
import { ComposerMultiSelect } from "./ComposerMultiSelect";

type WorkRelationsCardProps = {
  genres: Genre[];
  selectedGenres: number[];
  composers: ComposerOption[];
  onGenresChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onComposersChange: (value: ComposerOption[]) => void;
};

export function WorkRelationsCard({
  genres,
  selectedGenres,
  composers,
  onGenresChange,
  onComposersChange,
}: WorkRelationsCardProps) {
  return (
    <Card className="mb-4 shadow-sm border-0">
      <Card.Body>
        <div className="mb-4">
          <h6 className="fw-bold mb-1">Relacionamentos</h6>
          <small className="text-muted">
            Classificação musical e autoria da obra
          </small>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Gêneros *</Form.Label>
          <Form.Select
            multiple
            value={selectedGenres.map(String)}
            onChange={onGenresChange}
          >
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Compositores *</Form.Label>
          <ComposerMultiSelect value={composers} onChange={onComposersChange} />
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
