import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

import type { Page } from "../types/Page";
import type { Work } from "../types/Work";

import { useSearchBarContext } from "./SeachBarContext";

import { getAllWorksPaginated } from "../utils/works/works-crud";
import { useSelectedGenreContext } from "./SelectedGenreContext";
import { useSelectedComposerContext } from "./SelectedComposerContext";

export type WorksPageContextProps = {
  state: Page<Work[]>;
  dispatch: Dispatch<SetStateAction<Page<Work[]>>>;
  refresh: () => void;
  page: number;
  setPage: (page: number) => void;
};

export const initialState: WorksPageContextProps = {
  state: {
    quantity: 0,
    totalPages: 0,
    actualPage: 1,
    data: [],
  },
  dispatch: () => {},
  refresh: () => {},
  page: 0,
  setPage: () => {},
};

export const WorksPageContext =
  createContext<WorksPageContextProps>(initialState);

type ProviderProps = {
  children: React.ReactNode;
};

export function WorksPageContextProvider({ children }: ProviderProps) {
  const [state, setState] = useState<Page<Work[]>>(initialState.state);
  const [refreshKey, setRefreshKey] = useState(0);
  const [page, setPage] = useState(1);
  const { state: genre } = useSelectedGenreContext();
  const { state: composer } = useSelectedComposerContext();

  const refresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const { state: searchState } = useSearchBarContext();

  useEffect(() => {
    setPage(1);
  }, [genre, composer, searchState]);

  useEffect(() => {
    getAllWorksPaginated(page, genre, composer, searchState, searchState).then((response) => {
      setState(response);
    });
  }, [page, searchState, refreshKey, genre, composer]);

  return (
    <WorksPageContext.Provider
      value={{
        state,
        dispatch: setState,
        refresh,
        page,
        setPage,
      }}
    >
      {children}
    </WorksPageContext.Provider>
  );
}

export function useWorksPageContext() {
  return useContext(WorksPageContext);
}
