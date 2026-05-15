import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Period } from "../types/Period";
import { getAllPeriods } from "../utils/periods/periods-crud";

export type PeriodsContextProps = {
  state: Array<Period>;
  dispatch: Dispatch<SetStateAction<Array<Period>>>;
};

export const initialState: PeriodsContextProps = {
  state: [],
  dispatch: () => {},
};

export const PeriodsContext = createContext<PeriodsContextProps>(initialState);

type PeriodsContextProviderProps = {
  children: React.ReactNode;
};

export function PeriodsContextProvider({
  children,
}: PeriodsContextProviderProps) {
  const [state, setState] = useState<Array<Period>>([]);

  useEffect(() => {
    getAllPeriods().then((response) => {
      setState(response);
    });
  }, []);

  return (
    <PeriodsContext.Provider
      value={{
        state,
        dispatch: setState,
      }}
    >
      {children}
    </PeriodsContext.Provider>
  );
}

export function UsePeriodsContext() {
  return useContext(PeriodsContext);
}
