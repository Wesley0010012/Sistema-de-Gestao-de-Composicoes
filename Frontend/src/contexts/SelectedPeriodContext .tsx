import React, {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Period } from "../types/Period";

type SelectedPeriodProps = {
  state: Period | null;
  setState: Dispatch<SetStateAction<Period | null>>;
};

const SelectedPeriod = createContext<SelectedPeriodProps | undefined>(
  undefined,
);

export const SelectedPeriodContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<Period | null>(null);

  return (
    <SelectedPeriod.Provider value={{ state, setState }}>
      {children}
    </SelectedPeriod.Provider>
  );
};

export const useSelectedPeriodContext = () => {
  const context = useContext(SelectedPeriod);
  if (!context)
    throw new Error(
      "usePage must be used within SelectedPeriodContextProvider",
    );
  return context;
};
