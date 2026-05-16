import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

import type { Page } from "../types/Page";
import type { Composer } from "../types/Composer";
import { getAllComposersPaginated } from "../utils/composers/composers-crud";
import { useSelectedNationalityContext } from "./SelectedNationalityContext";
import { useSelectedPeriodContext } from "./SelectedPeriodContext ";
import { useSearchBarContext } from "./SeachBarContext";

export type ComposersPageContextProps = {
  state: Page<Composer[]>;
  dispatch: Dispatch<SetStateAction<Page<Composer[]>>>;

  page: number;
  setPage: (page: number) => void;

  refresh: () => void;
};

export const initialState: ComposersPageContextProps = {
  state: {
    quantity: 0,
    totalPages: 0,
    actualPage: 1,
    data: [],
  },
  page: 1,
  setPage: () => {},
  dispatch: () => {},
  refresh: () => {},
};

export const ComposersPageContext =
  createContext<ComposersPageContextProps>(initialState);

type ProviderProps = {
  children: React.ReactNode;
};

export function ComposersPageContextProvider({ children }: ProviderProps) {
  const [state, setState] = useState<Page<Composer[]>>(initialState.state);
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const { state: selectedNationalityState } = useSelectedNationalityContext();
  const { state: selectedPeriodState } = useSelectedPeriodContext();
  const { state: searchedComposerName } = useSearchBarContext();

  useEffect(() => {
    setPage(1);
  }, [selectedNationalityState, selectedPeriodState, searchedComposerName]);

  useEffect(() => {
    getAllComposersPaginated(
      page,
      selectedNationalityState,
      selectedPeriodState,
      searchedComposerName,
    ).then(setState);
  }, [
    page,
    selectedNationalityState,
    selectedPeriodState,
    searchedComposerName,
    refreshKey,
  ]);

  return (
    <ComposersPageContext.Provider
      value={{
        state,
        dispatch: setState,
        page,
        setPage,
        refresh,
      }}
    >
      {children}
    </ComposersPageContext.Provider>
  );
}

export function useComposersPageContext() {
  return useContext(ComposersPageContext);
}
