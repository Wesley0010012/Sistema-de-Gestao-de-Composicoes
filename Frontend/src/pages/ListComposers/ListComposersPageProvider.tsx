import type { ReactNode } from "react";

import { NationalitiesContextProvider } from "../../contexts/NationalititesContext.tsx";
import { PeriodsContextProvider } from "../../contexts/PeriodsContext.tsx";
import { TotalComposersContextProvider } from "../../contexts/TotalComposersContext.tsx";
import { RecentComposersContextProvider } from "../../contexts/RecentComposersContext.tsx";
import { ComposersPageContextProvider } from "../../contexts/ComposersPageContext.tsx";
import { PageProvider } from "../../contexts/PageContextProvider.tsx";
import { SelectedNationalityContextProvider } from "../../contexts/SelectedNationalityContext.tsx";
import { SearchBarProvider } from "../../contexts/SeachBarContext.tsx";
import { SelectedPeriodContextProvider } from "../../contexts/SelectedPeriodContext .tsx";

type Props = {
  children: ReactNode;
};

export function ComposersPageProviders({ children }: Props) {
  return (
    <SearchBarProvider>
      <NationalitiesContextProvider>
        <PeriodsContextProvider>
          <TotalComposersContextProvider>
            <RecentComposersContextProvider>
              <PageProvider>
                <SelectedNationalityContextProvider>
                  <SelectedPeriodContextProvider>
                    <ComposersPageContextProvider>
                      {children}
                    </ComposersPageContextProvider>
                  </SelectedPeriodContextProvider>
                </SelectedNationalityContextProvider>
              </PageProvider>
            </RecentComposersContextProvider>
          </TotalComposersContextProvider>
        </PeriodsContextProvider>
      </NationalitiesContextProvider>
    </SearchBarProvider>
  );
}
