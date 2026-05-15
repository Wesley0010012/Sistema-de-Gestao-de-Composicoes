import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { Instrument } from "../types/Instrument";
import { getAllInstruments } from "../utils/instruments/instruments-crud";

export type InstrumentsContextProps = {
  state: Instrument[];
  dispatch: Dispatch<SetStateAction<Instrument[]>>;
};

export const InstrumentsContext = createContext<InstrumentsContextProps>({
  state: [],
  dispatch: () => {},
});

export function InstrumentsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, setState] = useState<Instrument[]>([]);

  useEffect(() => {
    getAllInstruments().then(setState);
  }, []);

  return (
    <InstrumentsContext.Provider value={{ state, dispatch: setState }}>
      {children}
    </InstrumentsContext.Provider>
  );
}

export function useInstrumentsContext() {
  return useContext(InstrumentsContext);
}
