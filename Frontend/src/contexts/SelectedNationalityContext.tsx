import React, {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Nationality } from "../types/Nationality";

type SelectedNationalityProps = {
  state: Nationality | null;
  setState: Dispatch<SetStateAction<Nationality | null>>;
};

const SelectedNationality = createContext<SelectedNationalityProps | undefined>(
  undefined,
);

export const SelectedNationalityContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<Nationality | null>(null);

  return (
    <SelectedNationality.Provider value={{ state, setState }}>
      {children}
    </SelectedNationality.Provider>
  );
};

export const useSelectedNationalityContext = () => {
  const context = useContext(SelectedNationality);
  if (!context)
    throw new Error(
      "usePage must be used within SelectedNationalityContextProvider",
    );
  return context;
};
