import type { ReactNode } from "react";

import { NationalitiesContextProvider } from "../../contexts/NationalititesContext.tsx";
import { PeriodsContextProvider } from "../../contexts/PeriodsContext.tsx";
import { SearchBarProvider } from "../../contexts/SeachBarContext.tsx";

type Props = {
  children: ReactNode;
};

export function ManageComposersPageProvider({ children }: Props) {
  return (
    <SearchBarProvider>
      <NationalitiesContextProvider>
        <PeriodsContextProvider>{children}</PeriodsContextProvider>
      </NationalitiesContextProvider>
    </SearchBarProvider>
  );
}
