import { GenresContextProvider } from "../../contexts/GenresContext";
import { RecentWorksContextProvider } from "../../contexts/RecentWorksContext";
import { SearchBarProvider } from "../../contexts/SeachBarContext";
import { SelectedComposerContextProvider } from "../../contexts/SelectedComposerContext";
import { SelectedGenreContextProvider } from "../../contexts/SelectedGenreContext";
import { TotalWorksContextProvider } from "../../contexts/TotalWorksContext";
import { WorksPageContextProvider } from "../../contexts/WorksPageContext";
import ListWorksPageContent from "./ListWorksPageContent";

export default function ListWorksPage() {
  return (
    <SearchBarProvider>
      <GenresContextProvider>
        <SelectedGenreContextProvider>
          <SelectedComposerContextProvider>
            <TotalWorksContextProvider>
              <RecentWorksContextProvider>
                <WorksPageContextProvider>
                  <ListWorksPageContent />
                </WorksPageContextProvider>
              </RecentWorksContextProvider>
            </TotalWorksContextProvider>
          </SelectedComposerContextProvider>
        </SelectedGenreContextProvider>
      </GenresContextProvider>
    </SearchBarProvider>
  );
}
