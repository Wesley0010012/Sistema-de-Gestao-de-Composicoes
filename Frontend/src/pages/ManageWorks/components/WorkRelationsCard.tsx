import { Card, Form } from "react-bootstrap";

import type { Genre } from "../../../types/Genre";
import type { ComposerOption } from "../types";
import { ComposerMultiSelect } from "./ComposerMultiSelect";

type WorkRelationsCardProps = {
  genres: Genre[];
  selectedGenres: number[];
  composers: ComposerOption[];
  onGenreToggle: (genreId: number) => void;
  onComposersChange: (value: ComposerOption[]) => void;
};

export function WorkRelationsCard({
  genres,
  selectedGenres,
  composers,
  onGenreToggle,
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
          <div className="admin-genre-grid">
            {genres.map((genre) => {
              const selected = selectedGenres.includes(genre.id);

              return (
                <button
                  key={genre.id}
                  type="button"
                  className={
                    selected
                      ? "admin-genre-card admin-genre-card-active"
                      : "admin-genre-card"
                  }
                  onClick={() => onGenreToggle(genre.id)}
                >
                  <span>{genre.name}</span>
                  {genre.description && <small>{genre.description}</small>}
                </button>
              );
            })}
          </div>
          <Form.Text muted>
            Selecione um ou mais gêneros para a obra.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Compositores *</Form.Label>
          <ComposerMultiSelect value={composers} onChange={onComposersChange} />
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
