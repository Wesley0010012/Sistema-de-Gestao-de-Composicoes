import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Badge, Button, Card, Col, Modal, Row } from "react-bootstrap";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileEarmarkPdf,
  MusicNoteList,
  ZoomIn,
  ZoomOut,
} from "react-bootstrap-icons";

import { ComposerImageIcon } from "../../../components/Image/ComposerImageIcon";
import { EmptyState } from "../../../components/Pages/EmptyState";
import type { Composer } from "../../../types/Composer";
import type { Genre } from "../../../types/Genre";
import type { Instrument } from "../../../types/Instrument";
import type { Page } from "../../../types/Page";
import type { Score } from "../../../types/Score";
import type { Work } from "../../../types/Work";
import { API_BASE_URL } from "../../../utils/api";
import { getAllWorksPaginated } from "../../../utils/works/works-crud";
import { PdfCanvasPage } from "./PdfCanvasPage";

type MusicianWorksListProps = {
  composers: Composer[];
  genres: Genre[];
  instruments: Instrument[];
  loadingComposers: boolean;
  works: Page<Work[]>;
  loading: boolean;
  onClearFilters: () => void;
  onGenreSelect: (genreId: number | "") => void;
  onInstrumentSelect: (instrumentId: number | "") => void;
  selectedGenreId: number | "";
  selectedInstrumentId?: number | "";
  emptyIcon?: ReactNode;
};

type MusicianView = "scores" | "works" | "composers" | "genres" | "instruments";

type ScoreCardData = {
  id: string;
  score: Score;
  work: Work;
  keyLabel: string;
  sectionLabel: string;
};

function scorePdfUrl(scoreId: number): string {
  return `${API_BASE_URL}/works/scores/${scoreId}/pdf`;
}

function isScoresMobilePwa(): boolean {
  return window.navigator.userAgent.includes("ScoresWebView");
}

function shouldLazyRenderCardPdfPreview(): boolean {
  const isScoresWebView = isScoresMobilePwa();
  const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;

  return isScoresWebView || isSmallScreen;
}

function getScoresFromWorks(
  works: Work[],
  selectedInstrumentId?: number | "",
): ScoreCardData[] {
  return works.flatMap((work) =>
    work.sections.flatMap((section, sectionIndex) => {
      const scores = selectedInstrumentId
        ? section.scores.filter(
            (score) => score.instrument.id === selectedInstrumentId,
          )
        : section.scores;

      return scores.map((score) => ({
        id: `${work.id}-${section.id}-${score.id}`,
        score,
        work,
        keyLabel: `${section.key.root} ${section.key.mode}`,
        sectionLabel: `Seção ${sectionIndex + 1}`,
      }));
    }),
  );
}

function ScorePreview({
  disabled,
  path,
  scoreId,
  onOpen,
  onUnavailable,
}: {
  disabled: boolean;
  path: string;
  scoreId: number;
  onOpen: () => void;
  onUnavailable: () => void;
}) {
  const previewRef = useRef<HTMLButtonElement | null>(null);
  const [canRenderPreview, setCanRenderPreview] = useState(
    !shouldLazyRenderCardPdfPreview(),
  );

  useEffect(() => {
    if (canRenderPreview || !shouldLazyRenderCardPdfPreview()) return;

    const element = previewRef.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setCanRenderPreview(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCanRenderPreview(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "240px 0px",
        threshold: 0.01,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [canRenderPreview]);

  if (!path || disabled) {
    return (
      <div className="musician-score-preview musician-score-preview-empty">
        <FileEarmarkPdf size={42} />
        <span>PDF indisponível</span>
      </div>
    );
  }

  return (
    <button
      ref={previewRef}
      type="button"
      className="musician-score-preview"
      onClick={onOpen}
      aria-label="Abrir prévia da partitura"
    >
      {canRenderPreview ? (
        <PdfCanvasPage
          url={scorePdfUrl(scoreId)}
          className="musician-score-preview-page"
          scale={0.82}
          onLoadError={onUnavailable}
        />
      ) : (
        <div className="musician-score-preview-empty">
          <FileEarmarkPdf size={42} />
          <span>Carregando prévia</span>
        </div>
      )}
    </button>
  );
}

function ScoreViewerModal({
  scoreData,
  onHide,
}: {
  scoreData: ScoreCardData | null;
  onHide: () => void;
}) {
  const path = scoreData?.score.path || "";
  const pdfUrl = scoreData ? scorePdfUrl(scoreData.score.id) : "";
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [zoom, setZoom] = useState(1.25);

  useEffect(() => {
    setPageNumber(1);
    setTotalPages(1);
    setZoom(1.25);
  }, [scoreData?.id]);

  useEffect(() => {
    setPageNumber((current) => Math.min(current, totalPages));
  }, [totalPages]);

  const goToPreviousPage = () => {
    setPageNumber((current) => Math.max(1, current - 1));
  };

  const goToNextPage = () => {
    setPageNumber((current) => Math.min(totalPages, current + 1));
  };

  const zoomOut = () => {
    setZoom((current) => Math.max(0.8, Number((current - 0.15).toFixed(2))));
  };

  const zoomIn = () => {
    setZoom((current) => Math.min(2.25, Number((current + 0.15).toFixed(2))));
  };

  return (
    <Modal
      show={Boolean(scoreData)}
      onHide={onHide}
      fullscreen
      centered
      className="musician-score-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {scoreData?.work.title}
          {scoreData && (
            <span className="d-block text-muted fs-6 fw-normal">
              {scoreData.score.instrument.name} - {scoreData.keyLabel}
            </span>
          )}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {path ? (
          <div className="musician-score-reader">
            <div className="musician-score-reader-toolbar">
              <div className="d-flex align-items-center gap-2">
                <Button
                  type="button"
                  variant="light"
                  size="sm"
                  onClick={goToPreviousPage}
                  disabled={pageNumber === 1}
                  aria-label="Página anterior"
                >
                  <ChevronLeft />
                </Button>

                <span className="musician-score-reader-counter">
                  {pageNumber} / {totalPages}
                </span>

                <Button
                  type="button"
                  variant="light"
                  size="sm"
                  onClick={goToNextPage}
                  disabled={pageNumber === totalPages}
                  aria-label="Próxima página"
                >
                  <ChevronRight />
                </Button>
              </div>

              <div className="d-flex align-items-center gap-2">
                <Button
                  type="button"
                  variant="light"
                  size="sm"
                  onClick={zoomOut}
                  aria-label="Diminuir zoom"
                >
                  <ZoomOut />
                </Button>

                <span className="musician-score-reader-counter">
                  {Math.round(zoom * 100)}%
                </span>

                <Button
                  type="button"
                  variant="light"
                  size="sm"
                  onClick={zoomIn}
                  aria-label="Aumentar zoom"
                >
                  <ZoomIn />
                </Button>
              </div>
            </div>

            <PdfCanvasPage
              url={pdfUrl}
              pageNumber={pageNumber}
              scale={zoom}
              className="musician-score-reader-page"
              onDocumentLoad={setTotalPages}
            />
          </div>
        ) : (
          <EmptyState
            icon={<FileEarmarkPdf size={32} />}
            title="PDF indisponível"
            description="Esta partitura ainda não tem um arquivo PDF."
          />
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function ScoreCards({ scores }: { scores: ScoreCardData[] }) {
  const [selectedScore, setSelectedScore] = useState<ScoreCardData | null>(
    null,
  );
  const [unavailableScoreIds, setUnavailableScoreIds] = useState<Set<number>>(
    () => new Set(),
  );

  if (scores.length === 0) {
    return (
      <Card className="border-0 shadow-sm">
        <EmptyState
          icon={<FileEarmarkPdf size={32} />}
          title="Nenhuma partitura encontrada"
          description="Ajuste os filtros para encontrar outros PDFs."
        />
      </Card>
    );
  }

  return (
    <>
      <Row className="g-3">
        {scores.map((scoreData) => {
          const { id, score, work, keyLabel, sectionLabel } = scoreData;
          const pdfAvailable =
            Boolean(score.path) && !unavailableScoreIds.has(score.id);

          return (
            <Col key={id} sm={6} xl={4}>
              <Card className="musician-score-card h-100 border-0 shadow-sm">
                <ScorePreview
                  disabled={!pdfAvailable}
                  path={score.path}
                  scoreId={score.id}
                  onOpen={() => setSelectedScore(scoreData)}
                  onUnavailable={() =>
                    setUnavailableScoreIds((current) => {
                      const next = new Set(current);
                      next.add(score.id);
                      return next;
                    })
                  }
                />

                <Card.Body className="d-flex flex-column gap-3">
                  <div>
                    <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                      <h6 className="fw-bold mb-0">{score.instrument.name}</h6>
                      <Badge bg="light" text="dark" className="border">
                        {keyLabel}
                      </Badge>
                    </div>

                    <div className="fw-semibold">{work.title}</div>
                    {work.subtitle && (
                      <div className="text-muted small">{work.subtitle}</div>
                    )}
                    <div className="text-muted small">{sectionLabel}</div>
                  </div>

                  <div className="d-grid gap-2 mt-auto">
                    {pdfAvailable ? (
                      <>
                        <Button
                          type="button"
                          onClick={() => setSelectedScore(scoreData)}
                          variant="primary"
                          size="lg"
                          className="d-flex align-items-center justify-content-center gap-2"
                        >
                          <Eye />
                          Abrir partitura
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="secondary"
                          size="lg"
                          className="d-flex align-items-center justify-content-center gap-2"
                          disabled
                        >
                          <Eye />
                          PDF indisponível
                        </Button>
                      </>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      <ScoreViewerModal
        scoreData={selectedScore}
        onHide={() => setSelectedScore(null)}
      />
    </>
  );
}

function ViewTabs({
  activeView,
  onChange,
}: {
  activeView: MusicianView;
  onChange: (view: MusicianView) => void;
}) {
  const tabs: Array<{ id: MusicianView; label: string }> = [
    { id: "scores", label: "Partituras" },
    { id: "works", label: "Obras completas" },
    { id: "composers", label: "Compositores" },
    { id: "genres", label: "Gêneros" },
    { id: "instruments", label: "Instrumentos" },
  ];

  return (
    <div className="musician-view-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={
            activeView === tab.id
              ? "musician-view-tab musician-view-tab-active"
              : "musician-view-tab"
          }
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export function MusicianWorksList({
  composers,
  genres,
  instruments,
  loadingComposers,
  works,
  loading,
  onClearFilters,
  onGenreSelect,
  onInstrumentSelect,
  selectedGenreId,
  selectedInstrumentId,
  emptyIcon,
}: MusicianWorksListProps) {
  const [activeView, setActiveView] = useState<MusicianView>("scores");
  const [selectedWorkId, setSelectedWorkId] = useState<number | null>(null);
  const [selectedComposerId, setSelectedComposerId] = useState<number | null>(
    null,
  );
  const [composerWorks, setComposerWorks] = useState<Work[]>([]);
  const [loadingComposerWorks, setLoadingComposerWorks] = useState(false);

  const allScores = useMemo(
    () => getScoresFromWorks(works.data, selectedInstrumentId),
    [works.data, selectedInstrumentId],
  );
  const selectedWork = [...works.data, ...composerWorks].find(
    (work) => work.id === selectedWorkId,
  );
  const selectedComposer =
    composers.find((composer) => composer.id === selectedComposerId) || null;

  useEffect(() => {
    console.log("[MusicianWorksList] render/state", {
      activeView,
      allScoresCount: allScores.length,
      composersCount: composers.length,
      loading,
      selectedComposerId,
      selectedInstrumentId,
      selectedWorkId,
      worksCount: works.data.length,
    });
  }, [
    activeView,
    allScores.length,
    composers.length,
    loading,
    selectedComposerId,
    selectedInstrumentId,
    selectedWorkId,
    works.data.length,
  ]);

  useEffect(() => {
    let active = true;

    async function fetchComposerWorks() {
      if (!selectedComposer) {
        setComposerWorks([]);
        return;
      }

      setLoadingComposerWorks(true);

      try {
        const response = await getAllWorksPaginated(
          1,
          null,
          selectedComposer,
          "",
          "",
          selectedInstrumentId || null,
          100,
        );

        if (active) setComposerWorks(response.data);
      } finally {
        if (active) setLoadingComposerWorks(false);
      }
    }

    fetchComposerWorks();

    return () => {
      active = false;
    };
  }, [selectedComposer, selectedInstrumentId]);

  const handleViewChange = (view: MusicianView) => {
    console.log("[MusicianWorksList] view change", {
      from: activeView,
      to: view,
      worksCount: works.data.length,
    });

    if (view !== activeView) {
      onClearFilters();
    }

    setActiveView(view);
    setSelectedWorkId(null);
    setSelectedComposerId(null);
  };

  if (loading) {
    return (
      <div className="d-grid gap-3">
        <ViewTabs activeView={activeView} onChange={handleViewChange} />
        <Card className="shadow-sm border-0">
          <EmptyState title="Carregando partituras..." className="p-5" />
        </Card>
      </div>
    );
  }

  return (
    <div className="d-grid gap-3">
      <ViewTabs activeView={activeView} onChange={handleViewChange} />

      {activeView === "scores" && (
        <section className="musician-work-section">
          <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
            <div>
              <h5 className="fw-bold mb-1">Partituras disponíveis</h5>
              <div className="text-muted small">
                PDFs em cards, sem agrupamento por seções.
              </div>
            </div>
            <Badge bg="primary" className="px-3 py-2">
              {allScores.length} partitura(s)
            </Badge>
          </div>

          <ScoreCards scores={allScores} />
        </section>
      )}

      {activeView === "works" && (
        <section className="musician-work-section">
          {selectedWork ? (
            <>
              <Button
                variant="link"
                className="p-0 mb-3 text-decoration-none"
                onClick={() => setSelectedWorkId(null)}
              >
                <ArrowLeft className="me-1" />
                Voltar para obras completas
              </Button>

              <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
                <div>
                  <h5 className="fw-bold mb-1">{selectedWork.title}</h5>
                  {selectedWork.subtitle && (
                    <div className="text-muted">{selectedWork.subtitle}</div>
                  )}
                </div>
                <Badge bg="primary" className="px-3 py-2">
                  {
                    getScoresFromWorks([selectedWork], selectedInstrumentId)
                      .length
                  }{" "}
                  partitura(s)
                </Badge>
              </div>

              <ScoreCards
                scores={getScoresFromWorks([selectedWork], selectedInstrumentId)}
              />
            </>
          ) : (
            <>
              <div className="mb-3">
                <h5 className="fw-bold mb-1">Obras completas</h5>
                <div className="text-muted small">
                  Toque em uma obra para ver as partituras relacionadas.
                </div>
              </div>

              <Row className="g-3">
                {works.data.length === 0 ? (
                  <Col xs={12}>
                    <Card className="border-0 shadow-sm">
                      <EmptyState
                        icon={emptyIcon || <MusicNoteList size={32} />}
                        title="Nenhuma obra encontrada"
                        description="Escolha outro gênero ou instrumento."
                      />
                    </Card>
                  </Col>
                ) : (
                  works.data.map((work) => {
                  const scoresCount = getScoresFromWorks(
                    [work],
                    selectedInstrumentId,
                  ).length;

                  return (
                    <Col key={work.id} md={6} xl={4}>
                      <button
                        type="button"
                        className="musician-selection-card musician-work-card text-start h-100"
                        onClick={() => setSelectedWorkId(work.id)}
                      >
                        <div className="musician-card-header">
                          <div>
                            <h6 className="musician-card-title">{work.title}</h6>
                            {work.subtitle && (
                              <div className="musician-card-subtitle">
                                {work.subtitle}
                              </div>
                            )}
                          </div>

                          <div className="musician-card-year">
                            {work.yearComposition || "s/d"}
                          </div>
                        </div>

                        {work.genres.length > 0 && (
                          <div className="musician-card-chip-row">
                            {work.genres.map((genre) => (
                              <span key={genre.id} className="musician-card-chip">
                                {genre.name}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="musician-card-chip-row">
                          {work.composers.map((composer) => (
                            <span
                              key={composer.id}
                              className="musician-card-chip musician-card-chip-muted"
                            >
                              {composer.name}
                            </span>
                          ))}
                        </div>

                        <div className="musician-card-footer">
                          <span>{work.sections.length} seção(ões)</span>
                          <Badge bg="primary" className="px-3 py-2">
                            {scoresCount} partitura(s)
                          </Badge>
                        </div>
                      </button>
                    </Col>
                  );
                  })
                )}
              </Row>
            </>
          )}
        </section>
      )}

      {activeView === "composers" && (
        <section className="musician-work-section">
          {selectedComposer ? (
            <>
              <Button
                variant="link"
                className="p-0 mb-3 text-decoration-none"
                onClick={() => setSelectedComposerId(null)}
              >
                <ArrowLeft className="me-1" />
                Voltar para compositores
              </Button>

              <div className="mb-3">
                <h5 className="fw-bold mb-1">{selectedComposer.name}</h5>
                <div className="text-muted small">
                  Obras em que este compositor atuou.
                </div>
              </div>

              <Row className="g-3">
                {loadingComposerWorks ? (
                  <Col xs={12}>
                    <Card className="border-0 shadow-sm">
                      <EmptyState title="Carregando obras..." />
                    </Card>
                  </Col>
                ) : composerWorks.length === 0 ? (
                  <Col xs={12}>
                    <Card className="border-0 shadow-sm">
                      <EmptyState
                        title="Nenhuma obra encontrada"
                        description="Este compositor ainda não tem obras disponíveis nesta seleção."
                      />
                    </Card>
                  </Col>
                ) : (
                  composerWorks.map((work) => (
                    <Col key={work.id} md={6} xl={4}>
                      <button
                        type="button"
                        className="musician-selection-card musician-work-card text-start h-100"
                        onClick={() => {
                          setActiveView("works");
                          setSelectedWorkId(work.id);
                          setSelectedComposerId(null);
                        }}
                      >
                        <div className="musician-card-header">
                          <div>
                            <h6 className="musician-card-title">{work.title}</h6>
                            {work.subtitle && (
                              <div className="musician-card-subtitle">
                                {work.subtitle}
                              </div>
                            )}
                          </div>

                          <div className="musician-card-year">
                            {work.yearComposition || "s/d"}
                          </div>
                        </div>

                        {work.genres.length > 0 && (
                          <div className="musician-card-chip-row">
                            {work.genres.map((genre) => (
                              <span key={genre.id} className="musician-card-chip">
                                {genre.name}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="musician-card-footer">
                          <span>{work.sections.length} seção(ões)</span>
                          <Badge bg="primary" className="px-3 py-2">
                            {getScoresFromWorks([work], selectedInstrumentId).length}{" "}
                            partitura(s)
                          </Badge>
                        </div>
                      </button>
                    </Col>
                  ))
                )}
              </Row>
            </>
          ) : (
            <>
              <div className="mb-3">
                <h5 className="fw-bold mb-1">Compositores</h5>
                <div className="text-muted small">
                  Toque em um compositor para ver suas obras disponíveis.
                </div>
              </div>

              <Row className="g-3">
                {loadingComposers ? (
                  <Col xs={12}>
                    <Card className="border-0 shadow-sm">
                      <EmptyState title="Carregando compositores..." />
                    </Card>
                  </Col>
                ) : composers.length === 0 ? (
                  <Col xs={12}>
                    <Card className="border-0 shadow-sm">
                      <EmptyState
                        icon={emptyIcon || <MusicNoteList size={32} />}
                        title="Nenhum compositor encontrado"
                        description="Nenhum compositor foi retornado pela API."
                      />
                    </Card>
                  </Col>
                ) : (
                  composers.map((composer) => (
                    <Col key={composer.id} md={6} xl={4}>
                      <button
                        type="button"
                        className="musician-selection-card musician-composer-card text-start h-100"
                        onClick={() => setSelectedComposerId(composer.id)}
                      >
                        <div className="d-flex align-items-start gap-3">
                          <div className="musician-composer-photo">
                            <ComposerImageIcon path={composer.photoPath} />
                          </div>

                          <div className="flex-grow-1">
                            <h6 className="musician-card-title">
                              {composer.name}
                            </h6>
                            <div className="musician-card-subtitle mb-3">
                              {composer.nationality?.name}
                            </div>

                            {composer.periods.length > 0 && (
                              <div className="musician-card-chip-row">
                                {composer.periods.map((period) => (
                                  <span
                                    key={period.id}
                                    className="musician-card-chip musician-card-chip-muted"
                                  >
                                    {period.name}
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className="musician-card-footer">
                              <span>{composer.periods.length} período(s)</span>
                              <Badge bg="primary" className="px-3 py-2">
                                Ver obras
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </button>
                    </Col>
                  ))
                )}
              </Row>
            </>
          )}
        </section>
      )}

      {activeView === "genres" && (
        <section className="musician-work-section">
          <div className="mb-3">
            <h5 className="fw-bold mb-1">Gêneros</h5>
            <div className="text-muted small">
              Escolha um gênero para filtrar as partituras e obras.
            </div>
          </div>

          <Row className="g-3">
            <Col md={6} xl={4}>
              <button
                type="button"
                className={
                  selectedGenreId === ""
                    ? "musician-selection-card musician-filter-section-card musician-filter-section-card-active text-start h-100"
                    : "musician-selection-card musician-filter-section-card text-start h-100"
                }
                onClick={() => {
                  onGenreSelect("");
                  setActiveView("scores");
                }}
              >
                <h6 className="musician-card-title">Todos os gêneros</h6>
                <div className="musician-card-subtitle">
                  Mostrar todas as composições disponíveis.
                </div>
              </button>
            </Col>

            {genres.map((genre) => (
              <Col key={genre.id} md={6} xl={4}>
                <button
                  type="button"
                  className={
                    selectedGenreId === genre.id
                      ? "musician-selection-card musician-filter-section-card musician-filter-section-card-active text-start h-100"
                      : "musician-selection-card musician-filter-section-card text-start h-100"
                  }
                  onClick={() => {
                    onGenreSelect(genre.id);
                    setActiveView("scores");
                  }}
                >
                  <h6 className="musician-card-title">{genre.name}</h6>
                  {genre.description && (
                    <div className="musician-card-subtitle">
                      {genre.description}
                    </div>
                  )}
                </button>
              </Col>
            ))}
          </Row>
        </section>
      )}

      {activeView === "instruments" && (
        <section className="musician-work-section">
          <div className="mb-3">
            <h5 className="fw-bold mb-1">Instrumentos</h5>
            <div className="text-muted small">
              Escolha um instrumento para filtrar as partituras.
            </div>
          </div>

          <Row className="g-3">
            <Col md={6} xl={4}>
              <button
                type="button"
                className={
                  selectedInstrumentId === ""
                    ? "musician-selection-card musician-filter-section-card musician-filter-section-card-active text-start h-100"
                    : "musician-selection-card musician-filter-section-card text-start h-100"
                }
                onClick={() => {
                  onInstrumentSelect("");
                  setActiveView("scores");
                }}
              >
                <h6 className="musician-card-title">Todos os instrumentos</h6>
                <div className="musician-card-subtitle">
                  Mostrar partituras de todos os instrumentos.
                </div>
              </button>
            </Col>

            {instruments.map((instrument) => (
              <Col key={instrument.id} md={6} xl={4}>
                <button
                  type="button"
                  className={
                    selectedInstrumentId === instrument.id
                      ? "musician-selection-card musician-filter-section-card musician-filter-section-card-active text-start h-100"
                      : "musician-selection-card musician-filter-section-card text-start h-100"
                  }
                  onClick={() => {
                    onInstrumentSelect(instrument.id);
                    setActiveView("scores");
                  }}
                >
                  <h6 className="musician-card-title">{instrument.name}</h6>
                  <div className="musician-card-subtitle">
                    Ver partituras disponíveis para este instrumento.
                  </div>
                </button>
              </Col>
            ))}
          </Row>
        </section>
      )}
    </div>
  );
}
