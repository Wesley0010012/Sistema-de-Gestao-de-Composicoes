import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { getTotalOfComposers } from "../utils/composers/composers-crud";

export type TotalComposersContextProps = {
  state: number;
  dispatch: Dispatch<SetStateAction<number>>;
  refresh: () => void;
};

export const initialState: TotalComposersContextProps = {
  state: 0,
  dispatch: () => {},
  refresh: () => {},
};

export const TotalComposersContext =
  createContext<TotalComposersContextProps>(initialState);

type TotalComposersContextProviderProps = {
  children: React.ReactNode;
};

export function TotalComposersContextProvider({
  children,
}: TotalComposersContextProviderProps) {
  const [state, setState] = useState<number>(0);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey((prev) => prev + 1);

  useEffect(() => {
    getTotalOfComposers().then((response) => {
      setState(response);
    });
  }, [refreshKey]);

  return (
    <TotalComposersContext.Provider
      value={{
        state,
        dispatch: setState,
        refresh,
      }}
    >
      {children}
    </TotalComposersContext.Provider>
  );
}

export function UseTotalComposersContext() {
  return useContext(TotalComposersContext);
}
