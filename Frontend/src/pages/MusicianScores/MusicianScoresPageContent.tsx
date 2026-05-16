import { useEffect, useRef, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { MusicNoteList } from "react-bootstrap-icons";

import { UseGenresContext } from "../../contexts/GenresContext";
import { useInstrumentsContext } from "../../contexts/InstrumentsContext";
import { useSelectedGenreContext } from "../../contexts/SelectedGenreContext";
import type { Composer } from "../../types/Composer";
import type { Page } from "../../types/Page";
import type { Work } from "../../types/Work";
import { getAllComposersPaginated } from "../../utils/composers/composers-crud";
import { getAllWorksPaginated } from "../../utils/works/works-crud";
import { MusicianWorksList } from "./components/MusicianWorksList";

const emptyPage: Page<Work[]> = {
  quantity: 0,
  totalPages: 0,
  actualPage: 1,
  data: [],
};

const WORKS_PER_PAGE = 6;

export function MusicianScoresPageContent() {
  const { state: genres } = UseGenresContext();
  const { state: instruments } = useInstrumentsContext();
  const { state: selectedGenre, setState: setSelectedGenre } =
    useSelectedGenreContext();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const [selectedInstrumentId, setSelectedInstrumentId] = useState<number | "">(
    "",
  );
  const [page, setPage] = useState(1);
  const [works, setWorks] = useState<Page<Work[]>>(emptyPage);
  const [composers, setComposers] = useState<Composer[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingComposers, setLoadingComposers] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setPage(1);
    setWorks(emptyPage);
    setHasMore(true);
  }, [selectedGenre, selectedInstrumentId]);

  useEffect(() => {
    let active = true;

    async function fetchWorks() {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      try {
        const response = await getAllWorksPaginated(
          page,
          selectedGenre,
          null,
          "",
          "",
          selectedInstrumentId || null,
          WORKS_PER_PAGE,
        );

        if (!active) return;

        setWorks((current) => ({
          ...response,
          data: page === 1 ? response.data : [...current.data, ...response.data],
        }));
        setHasMore(page < response.totalPages);
      } finally {
        if (active) {
          setLoading(false);
          setLoadingMore(false);
        }
      }
    }

    fetchWorks();
    return () => {
      active = false;
    };
  }, [page, selectedGenre, selectedInstrumentId]);

  useEffect(() => {
    let active = true;

    async function fetchComposers() {
      setLoadingComposers(true);

      try {
        const response = await getAllComposersPaginated(1, null, null, null, 100);
        if (active) setComposers(response.data);
      } finally {
        if (active) setLoadingComposers(false);
      }
    }

    fetchComposers();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element || !hasMore || loading || loadingMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage((current) => current + 1);
          observer.disconnect();
        }
      },
      {
        rootMargin: "360px 0px",
        threshold: 0.01,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasMore, loading, loadingMore, works.data.length]);

  const handleGenreSelect = (genreId: number | "") => {
    const genre = genreId ? genres.find((item) => item.id === genreId) : null;
    setSelectedGenre(genre);
  };

  const handleInstrumentSelect = (instrumentId: number | "") => {
    setSelectedInstrumentId(instrumentId);
  };

  const clearFilters = () => {
    setSelectedGenre(null);
    setSelectedInstrumentId("");
  };

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <MusicianWorksList
        composers={composers}
        genres={genres}
        instruments={instruments}
        loadingComposers={loadingComposers}
        works={works}
        loading={loading}
        onClearFilters={clearFilters}
        onGenreSelect={handleGenreSelect}
        onInstrumentSelect={handleInstrumentSelect}
        selectedGenreId={selectedGenre?.id || ""}
        selectedInstrumentId={selectedInstrumentId}
        emptyIcon={<MusicNoteList size={32} />}
      />

      <div ref={loadMoreRef} className="musician-load-more">
        {loadingMore && (
          <span className="d-inline-flex align-items-center gap-2 text-muted fw-semibold">
            <Spinner animation="border" size="sm" />
            Carregando mais composições...
          </span>
        )}
      </div>
    </Container>
  );
}
