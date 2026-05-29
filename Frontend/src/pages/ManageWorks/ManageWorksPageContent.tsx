import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { ArrowLeft, MusicNoteList } from "react-bootstrap-icons";
import { useNavigate, useParams } from "react-router-dom";

import { PageHeader } from "../../components/Pages/PageHeader";
import { UseGenresContext } from "../../contexts/GenresContext";
import { useInstrumentsContext } from "../../contexts/InstrumentsContext";
import { useKeyModesContext } from "../../contexts/KeysModesContext";
import { useKeyRootsContext } from "../../contexts/KeysRootsContext";
import {
  addWork,
  findWorkById,
  updateWork,
  type WorkData,
} from "../../utils/works/works-crud";
import { WorkBasicInfoCard } from "./components/WorkBasicInfoCard";
import { WorkRelationsCard } from "./components/WorkRelationsCard";
import { WorkSectionsCard } from "./components/WorkSectionsCard";
import { WorkSummaryCard } from "./components/WorkSummaryCard";
import type { ScoreForm, SectionForm, WorkFormState } from "./types";

function nullableNumber(value: string): number | null {
  return value.trim() ? Number(value) : null;
}

function storagePathFromUrl(path: string): string {
  if (!path) return "";

  try {
    const url = new URL(path, window.location.origin);
    const storagePrefix = "/storage/";

    if (url.pathname.startsWith(storagePrefix)) {
      return decodeURIComponent(url.pathname.slice(storagePrefix.length));
    }

    return path;
  } catch {
    return path;
  }
}

export default function ManageWorksPageContent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const { state: genres } = UseGenresContext();
  const { state: instruments } = useInstrumentsContext();
  const { state: keyRoots } = useKeyRootsContext();
  const { state: keyModes } = useKeyModesContext();

  const [form, setForm] = useState<WorkFormState>({
    title: "",
    subtitle: "",
    catalogNumber: "",
    opusNumber: "",
    yearComposition: "",
    description: "",
    genres: [],
    composers: [],
    sections: [],
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit || !id) return;

    async function fetchWork() {
      setLoading(true);

      try {
        const data = await findWorkById(Number(id));

        setForm({
          title: data.title,
          subtitle: data.subtitle || "",
          catalogNumber: data.catalogNumber ? String(data.catalogNumber) : "",
          opusNumber: data.opusNumber ? String(data.opusNumber) : "",
          yearComposition: data.yearComposition
            ? String(data.yearComposition)
            : "",
          description: data.description || "",
          genres: data.genres.map((genre) => genre.id),
          composers: data.composers.map((composer) => ({
            label: composer.name,
            value: composer.id,
          })),
          sections: data.sections.map((section) => ({
            id: section.id,
            keyRoot: section.key.root,
            keyMode: section.key.mode,
            scores: section.scores.map((score) => ({
              id: score.id,
              instrumentId: score.instrument.id,
              path: storagePathFromUrl(score.path),
              file: null,
            })),
          })),
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchWork();
  }, [id, isEdit]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenreToggle = (genreId: number) => {
    setForm((prev) => ({
      ...prev,
      genres: prev.genres.includes(genreId)
        ? prev.genres.filter((id) => id !== genreId)
        : [...prev.genres, genreId],
    }));
  };

  const addSection = () => {
    setForm((prev) => ({
      ...prev,
      sections: [...prev.sections, { keyRoot: "", keyMode: "", scores: [] }],
    }));
  };

  const updateSection = (
    index: number,
    field: keyof SectionForm,
    value: string,
  ) => {
    setForm((prev) => {
      const sections = [...prev.sections];
      sections[index] = { ...sections[index], [field]: value };
      return { ...prev, sections };
    });
  };

  const removeSection = (index: number) => {
    setForm((prev) => ({
      ...prev,
      sections: prev.sections.filter(
        (_, sectionIndex) => sectionIndex !== index,
      ),
    }));
  };

  const addScore = (sectionIndex: number) => {
    setForm((prev) => {
      const sections = [...prev.sections];
      sections[sectionIndex] = {
        ...sections[sectionIndex],
        scores: [
          ...sections[sectionIndex].scores,
          { instrumentId: "", path: "", file: null },
        ],
      };
      return { ...prev, sections };
    });
  };

  const updateScore = (
    sectionIndex: number,
    scoreIndex: number,
    field: keyof ScoreForm,
    value: number | string | File | null,
  ) => {
    setForm((prev) => {
      const sections = [...prev.sections];
      const scores = [...sections[sectionIndex].scores];

      scores[scoreIndex] = {
        ...scores[scoreIndex],
        [field]: value,
      };

      sections[sectionIndex] = { ...sections[sectionIndex], scores };

      return { ...prev, sections };
    });
  };

  const removeScore = (sectionIndex: number, scoreIndex: number) => {
    setForm((prev) => {
      const sections = [...prev.sections];
      sections[sectionIndex] = {
        ...sections[sectionIndex],
        scores: sections[sectionIndex].scores.filter(
          (_, index) => index !== scoreIndex,
        ),
      };

      return { ...prev, sections };
    });
  };

  const toPayload = (): WorkData => ({
    title: form.title,
    subtitle: form.subtitle || undefined,
    catalogNumber: nullableNumber(form.catalogNumber),
    opusNumber: nullableNumber(form.opusNumber),
    yearComposition: nullableNumber(form.yearComposition),
    description: form.description || undefined,
    genres: form.genres,
    composers: form.composers.map((composer) => composer.value),
    sections: form.sections.map((section) => ({
      id: section.id,
      keyRoot: section.keyRoot,
      keyMode: section.keyMode,
      scores: section.scores.map((score) => ({
        id: score.id,
        instrumentId: Number(score.instrumentId),
        path: score.path,
        file: score.file,
      })),
    })),
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setSaving(true);

      if (isEdit && id) {
        await updateWork(Number(id), toPayload());
      } else {
        await addWork(toPayload());
      }

      navigate("/admin/works");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-4">Carregando...</div>;
  }

  const scoresCount = form.sections.reduce(
    (total, section) => total + section.scores.length,
    0,
  );

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <PageHeader
        title={isEdit ? "Editar obra" : "Cadastrar obra"}
        subtitle={`${form.title || "Nova obra"} · ${form.composers.length} compositor(es)`}
        icon={<MusicNoteList size={28} className="text-primary" />}
        badge={isEdit ? "Edição" : "Cadastro"}
        action={{
          label: "Voltar",
          icon: <ArrowLeft />,
          variant: "outline-secondary",
          onClick: () => navigate("/admin/works"),
        }}
      />

      <Form onSubmit={handleSubmit}>
        <Row className="g-4">
          <Col lg={8}>
            <WorkBasicInfoCard form={form} onChange={handleChange} />

            <WorkRelationsCard
              genres={genres}
              selectedGenres={form.genres}
              composers={form.composers}
              onGenreToggle={handleGenreToggle}
              onComposersChange={(value) =>
                setForm((prev) => ({ ...prev, composers: value }))
              }
            />

            <WorkSectionsCard
              allowPdfUpload={!isEdit}
              sections={form.sections}
              keyRoots={keyRoots}
              keyModes={keyModes}
              instruments={instruments}
              onAddSection={addSection}
              onUpdateSection={updateSection}
              onRemoveSection={removeSection}
              onAddScore={addScore}
              onUpdateScore={updateScore}
              onRemoveScore={removeScore}
            />
          </Col>

          <Col lg={4}>
            <WorkSummaryCard
              genresCount={form.genres.length}
              composersCount={form.composers.length}
              sectionsCount={form.sections.length}
              scoresCount={scoresCount}
              saving={saving}
              isEdit={isEdit}
              onCancel={() => navigate("/admin/works")}
            />
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
