import { ComposersPageContextProvider } from "../../contexts/ComposersPageContext";
import { GenresContextProvider } from "../../contexts/GenresContext";
import { InstrumentsContextProvider } from "../../contexts/InstrumentsContext";
import { KeyModesContextProvider } from "../../contexts/KeysModesContext";
import { KeyRootsContextProvider } from "../../contexts/KeysRootsContext";
import ManageWorksPageContent from "./ManageWorksPageContent";

export function ManageWorksPage() {
  return (
    <KeyRootsContextProvider>
      <KeyModesContextProvider>
        <InstrumentsContextProvider>
          <GenresContextProvider>
            <ComposersPageContextProvider>
              <ManageWorksPageContent />
            </ComposersPageContextProvider>
          </GenresContextProvider>
        </InstrumentsContextProvider>
      </KeyModesContextProvider>
    </KeyRootsContextProvider>
  );
}
