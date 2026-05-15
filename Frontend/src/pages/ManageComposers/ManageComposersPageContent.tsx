import { Container, Row, Col, Form } from "react-bootstrap";
import { ArrowLeft, PersonBadge } from "react-bootstrap-icons";
import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { UsePeriodsContext } from "../../contexts/PeriodsContext";
import { UseNationalitiesContext } from "../../contexts/NationalititesContext";
import {
  addComposer,
  findComposerById,
  updateComposer,
} from "../../utils/composers/composers-crud";
import { customDateToInput } from "../../utils/date-utils";
import { PageHeader } from "../../components/Pages/PageHeader";
import { ComposerBasicInfoCard } from "./components/ComposerBasicInfoCard";
import { ComposerPeriodsCard } from "./components/ComposerPeriodsCard";
import { ComposerPhotoSummaryCard } from "./components/ComposerPhotoSummaryCard";

type FormState = {
  name: string;
  birthDate: string;
  deathDate: string;
  nationality: number | "";
  periods: number[];
};

export function ManageComposersPageContent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const { state: periods } = UsePeriodsContext();
  const { state: nationalities } = UseNationalitiesContext();

  const [form, setForm] = useState<FormState>({
    name: "",
    birthDate: "",
    deathDate: "",
    nationality: "",
    periods: [],
  });

  const [isAlive, setIsAlive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit || !id) return;

    async function fetchComposer() {
      setLoading(true);

      try {
        const data = await findComposerById(Number(id));

        setForm({
          name: data.name,
          birthDate: customDateToInput(data.birthDate),
          deathDate: customDateToInput(data.deathDate),
          nationality: data.nationality.id,
          periods: data.periods.map((period: { id: number }) => period.id),
        });

        setIsAlive(!data.deathDate);
        setPreview(data.photoPath || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchComposer();
  }, [id, isEdit]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "nationality" ? Number(value) || "" : value,
    }));
  };

  const handleCheckbox = (periodId: number) => {
    setForm((prev) => ({
      ...prev,
      periods: prev.periods.includes(periodId)
        ? prev.periods.filter((p) => p !== periodId)
        : [...prev.periods, periodId],
    }));
  };

  const handleAliveChange = (checked: boolean) => {
    setIsAlive(checked);

    if (checked) {
      setForm((prev) => ({
        ...prev,
        deathDate: "",
      }));
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        name: form.name,
        birthDate: form.birthDate,
        deathDate: isAlive ? undefined : form.deathDate || undefined,
        nationalityId: Number(form.nationality),
        periods: form.periods,
        photo: selectedFile ?? null,
      };

      if (isEdit && id) {
        await updateComposer(Number(id), payload);
      } else {
        await addComposer(payload);
      }

      navigate("/composers");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (!periods || !nationalities || loading) {
    return <div className="p-4">Carregando...</div>;
  }

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <PageHeader
        title={isEdit ? "Editar compositor" : "Cadastrar compositor"}
        subtitle={`${form.name || "Novo compositor"} · ${form.periods.length} período(s)`}
        icon={<PersonBadge size={28} className="text-primary" />}
        badge={isEdit ? "Edição" : "Cadastro"}
        action={{
          label: "Voltar",
          icon: <ArrowLeft />,
          variant: "outline-secondary",
          onClick: () => navigate("/composers"),
        }}
      />

      <Form onSubmit={handleSubmit}>
        <Row className="g-4">
          <Col lg={8} className="order-2 order-lg-1">
            <ComposerBasicInfoCard
              form={form}
              isAlive={isAlive}
              nationalities={nationalities}
              onChange={handleChange}
              onAliveChange={handleAliveChange}
            />

            <ComposerPeriodsCard
              periods={periods}
              selectedPeriods={form.periods}
              onToggle={handleCheckbox}
            />
          </Col>

          <Col lg={4} className="order-1 order-lg-2">
            <ComposerPhotoSummaryCard
              preview={preview}
              isAlive={isAlive}
              hasNationality={Boolean(form.nationality)}
              periodsCount={form.periods.length}
              saving={saving}
              isEdit={isEdit}
              onImageChange={handleImageChange}
              onRemovePhoto={() => {
                setPreview(null);
                setSelectedFile(null);
              }}
              onCancel={() => navigate("/composers")}
            />
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
