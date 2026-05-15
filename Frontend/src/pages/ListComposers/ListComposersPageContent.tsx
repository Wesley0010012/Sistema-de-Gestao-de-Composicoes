import { Container } from "react-bootstrap";

import { People, PersonPlus, PlusCircle } from "react-bootstrap-icons";

import {
  CardArea,
  type CardPreset,
} from "../../components/Dashboard/Card/CardArea";

import { UseNationalitiesContext } from "../../contexts/NationalititesContext";
import { UseTotalComposersContext } from "../../contexts/TotalComposersContext";
import { UsePeriodsContext } from "../../contexts/PeriodsContext";
import { UseRecentComposersContext } from "../../contexts/RecentComposersContext";

import { useComposersPageContext } from "../../contexts/ComposersPageContext";
import { AbstractPagination } from "../../components/Pages/AbstractPagination";
import { FeedbackModal } from "../../components/Modals/FeedbackModal";

import { useSelectedPeriodContext } from "../../contexts/SelectedPeriodContext ";
import { useSelectedNationalityContext } from "../../contexts/SelectedNationalityContext";

import { useSearchBarContext } from "../../contexts/SeachBarContext";

import { useConfirm } from "../../contexts/ConfirmContext";

import { deleteById } from "../../utils/composers/composers-crud";

import { useNavigate } from "react-router-dom";
import { useState, type ChangeEvent } from "react";
import { PageHeader } from "../../components/Pages/PageHeader";
import { ComposersFilters } from "./components/ComposersFilters";
import { ComposersTable } from "./components/ComposersTable";
import type { Composer } from "../../types/Composer";

export function ListComposersPageContent() {
  const navigate = useNavigate();

  const { state: nationalities } = UseNationalitiesContext();
  const { state: totalComposers, refresh: refreshTotalComposers } =
    UseTotalComposersContext();
  const { state: recentComposers, refresh: refreshRecentComposers } =
    UseRecentComposersContext();
  const { state: periods } = UsePeriodsContext();
  const {
    state: composers,
    setPage: setPageState,
    refresh: refreshComposersPage,
  } = useComposersPageContext();

  const { setState: setSelectedPeriodState } = useSelectedPeriodContext();
  const { setState: setSelectedNationalityState } =
    useSelectedNationalityContext();
  const { setState: setSearchBarState } = useSearchBarContext();

  const { confirm } = useConfirm();

  const [modal, setModal] = useState({
    show: false,
    title: "",
    message: "",
    variant: "success" as "success" | "danger",
  });

  const handlePeriodsChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    const selectedPeriod = periods.find((p) => p.id === selectedId) || null;
    setSelectedPeriodState(selectedPeriod);
  };

  const handleNationaliesChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    const selectedNationality =
      nationalities.find((n) => n.id === selectedId) || null;

    setSelectedNationalityState(selectedNationality);
  };

  const handleSearchNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchBarState(e.target.value);
  };

  const cards: Array<CardPreset> = [
    {
      title: "Total de compositores adicionados",
      value: totalComposers.toString(),
      icon: {
        icon: <People />,
        color: "#0d6efd",
        background: "#e7f1ff",
      },
    },
    {
      title: "Adicionados Recentemente",
      value: recentComposers.toString(),
      icon: {
        icon: <PlusCircle />,
        color: "#fd7e14",
        background: "#fff4e6",
      },
    },
  ];

  const handleDeleteComposer = (composer: Composer) => {
    confirm({
      message: `Deseja excluir ${composer.name}?`,
      onConfirm: async () => {
        try {
          await deleteById(composer.id);

          setModal({
            show: true,
            title: "Sucesso",
            message: `${composer.name} removido com sucesso!`,
            variant: "success",
          });

          refreshComposersPage();
          refreshRecentComposers();
          refreshTotalComposers();
        } catch {
          setModal({
            show: true,
            title: "Erro",
            message: "Erro ao remover compositor.",
            variant: "danger",
          });
        }
      },
    });
  };

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <PageHeader
        title="Gestão de compositores"
        subtitle="Consulte dados biográficos, períodos e nacionalidades."
        action={{
          label: "Novo compositor",
          icon: <PersonPlus />,
          onClick: () => navigate("/composers/create"),
        }}
      />

      <CardArea cards={cards} />

      <ComposersFilters
        nationalities={nationalities}
        periods={periods}
        onSearchChange={handleSearchNameChange}
        onNationalityChange={handleNationaliesChange}
        onPeriodChange={handlePeriodsChange}
      />

      <ComposersTable composers={composers} onDelete={handleDeleteComposer} />

      <AbstractPagination
        page={composers}
        onChange={(page) => setPageState(page)}
      />

      <FeedbackModal
        show={modal.show}
        onClose={() => setModal((prev) => ({ ...prev, show: false }))}
        title={modal.title}
        message={modal.message}
        variant={modal.variant}
      />
    </Container>
  );
}
