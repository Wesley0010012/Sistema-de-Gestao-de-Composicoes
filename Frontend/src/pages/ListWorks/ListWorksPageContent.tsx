import { useState, type ChangeEvent } from "react";
import { Container } from "react-bootstrap";
import { MusicNoteList, PlusCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

import {
  CardArea,
  type CardPreset,
} from "../../components/Dashboard/Card/CardArea";
import { AbstractPagination } from "../../components/Pages/AbstractPagination";
import { PageHeader } from "../../components/Pages/PageHeader";
import { UseGenresContext } from "../../contexts/GenresContext";
import { UseRecentWorksContext } from "../../contexts/RecentWorksContext";
import { useSearchBarContext } from "../../contexts/SeachBarContext";
import { useSelectedGenreContext } from "../../contexts/SelectedGenreContext";
import { UseTotalWorksContext } from "../../contexts/TotalWorksContext";
import { useWorksPageContext } from "../../contexts/WorksPageContext";
import type { Work } from "../../types/Work";
import { deleteWorkById } from "../../utils/works/works-crud";
import { WorksAccordion } from "./components/WorksAccordion";
import { WorksFilters } from "./components/WorksFilters";

export default function ListWorksPageContent() {
  const navigate = useNavigate();

  const { state: works, setPage, refresh } = useWorksPageContext();
  const { state: search, setState: setSearch } = useSearchBarContext();
  const { state: genres } = UseGenresContext();
  const { state: selectedGenre, setState: setSelectedGenre } =
    useSelectedGenreContext();
  const { state: totalWorks, refresh: refreshTotalWorks } =
    UseTotalWorksContext();
  const { state: recentWorks, refresh: refreshRecentWorks } =
    UseRecentWorksContext();

  const [deletingId, setDeletingId] = useState<number | null>(null);

  const cards: CardPreset[] = [
    {
      title: "Total de obras adicionadas",
      value: totalWorks.toString(),
      icon: {
        icon: <MusicNoteList />,
        color: "#0d6efd",
        background: "#e7f1ff",
      },
    },
    {
      title: "Adicionadas recentemente",
      value: recentWorks.toString(),
      icon: {
        icon: <PlusCircle />,
        color: "#fd7e14",
        background: "#fff4e6",
      },
    },
  ];

  const handleGenreChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const genreId = Number(event.target.value);
    const genre = genres.find((item) => item.id === genreId) || null;
    setSelectedGenre(genre);
  };

  const handleDeleteWork = async (work: Work) => {
    if (!window.confirm(`Deseja realmente excluir ${work.title}?`)) return;

    try {
      setDeletingId(work.id);
      await deleteWorkById(work.id);
      refresh();
      refreshTotalWorks();
      refreshRecentWorks();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <PageHeader
        title="Gestão de obras"
        subtitle="Consulte repertório, seções e partituras cadastradas."
        action={{
          label: "Nova obra",
          icon: <PlusCircle />,
          onClick: () => navigate("/works/create"),
        }}
      />

      <CardArea cards={cards} />

      <WorksFilters
        genres={genres}
        selectedGenreId={selectedGenre?.id || ""}
        onSearchChange={(event) => setSearch(event.target.value)}
        onGenreChange={handleGenreChange}
      />

      <WorksAccordion
        works={works}
        search={search}
        deletingId={deletingId}
        onDelete={handleDeleteWork}
      />

      <AbstractPagination page={works} onChange={(page) => setPage(page)} />
    </Container>
  );
}
