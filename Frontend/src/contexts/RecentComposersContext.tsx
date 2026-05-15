import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { getRecentTotalOfComposers } from "../utils/composers/composers-crud";

export type RecentComposersContextProps = {
  state: number;
  dispatch: Dispatch<SetStateAction<number>>;
  refresh: () => void;
};

export const initialState: RecentComposersContextProps = {
  state: 0,
  dispatch: () => {},
  refresh: () => {},
};

export const RecentComposersContext =
  createContext<RecentComposersContextProps>(initialState);

type RecentComposersContextProviderProps = {
  children: React.ReactNode;
};

export function RecentComposersContextProvider({
  children,
}: RecentComposersContextProviderProps) {
  const [state, setState] = useState<number>(0);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey((prev) => prev + 1);

  useEffect(() => {
    getRecentTotalOfComposers().then((response) => {
      setState(response);
    });
  }, [refreshKey]);

  return (
    <RecentComposersContext.Provider
      value={{
        state,
        dispatch: setState,
        refresh,
      }}
    >
      {children}
    </RecentComposersContext.Provider>
  );
}

export function UseRecentComposersContext() {
  return useContext(RecentComposersContext);
}
