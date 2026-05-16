import { ErrorBoundary } from "../../components/ErrorBoundary";
import { GenresContextProvider } from "../../contexts/GenresContext";
import { InstrumentsContextProvider } from "../../contexts/InstrumentsContext";
import { SelectedGenreContextProvider } from "../../contexts/SelectedGenreContext";
import { MusicianScoresPageContent } from "./MusicianScoresPageContent";

export function MusicianScoresPage() {
  return (
    <GenresContextProvider>
      <InstrumentsContextProvider>
        <SelectedGenreContextProvider>
          <ErrorBoundary name="MusicianScoresPage">
            <MusicianScoresPageContent />
          </ErrorBoundary>
        </SelectedGenreContextProvider>
      </InstrumentsContextProvider>
    </GenresContextProvider>
  );
}
