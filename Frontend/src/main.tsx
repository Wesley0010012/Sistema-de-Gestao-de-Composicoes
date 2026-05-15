import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/mobile.css";
import { NationalitiesContextProvider } from "./contexts/NationalititesContext.tsx";
import { TotalComposersContextProvider } from "./contexts/TotalComposersContext.tsx";
import { PeriodsContextProvider } from "./contexts/PeriodsContext.tsx";
import { RecentComposersContextProvider } from "./contexts/RecentComposersContext.tsx";
import { ComposersPageContextProvider } from "./contexts/ComposersPageContext.tsx";
import { PageProvider } from "./contexts/PageContextProvider.tsx";
import { SelectedNationalityContextProvider } from "./contexts/SelectedNationalityContext.tsx";
import { SelectedPeriodContextProvider } from "./contexts/SelectedPeriodContext .tsx";
import { SearchBarProvider } from "./contexts/SeachBarContext.tsx";
import { ConfirmProvider } from "./contexts/ConfirmContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfirmProvider>
      <SearchBarProvider>
        <NationalitiesContextProvider>
          <PeriodsContextProvider>
            <TotalComposersContextProvider>
              <RecentComposersContextProvider>
                <PageProvider>
                  <SelectedNationalityContextProvider>
                    <SelectedPeriodContextProvider>
                      <ComposersPageContextProvider>
                        <App />
                      </ComposersPageContextProvider>
                    </SelectedPeriodContextProvider>
                  </SelectedNationalityContextProvider>
                </PageProvider>
              </RecentComposersContextProvider>
            </TotalComposersContextProvider>
          </PeriodsContextProvider>
        </NationalitiesContextProvider>
      </SearchBarProvider>
    </ConfirmProvider>
  </StrictMode>,
);
