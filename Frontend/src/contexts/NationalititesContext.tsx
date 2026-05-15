import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Nationality } from "../types/Nationality";
import { getAllNationalities } from "../utils/nationalitites/nationalitites-crud";

export type NationalitiesContextProps = {
  state: Array<Nationality>;
  dispatch: Dispatch<SetStateAction<Array<Nationality>>>;
};

export const initialState: NationalitiesContextProps = {
  state: [],
  dispatch: () => {},
};

export const NationalitiesContext =
  createContext<NationalitiesContextProps>(initialState);

type NationalitiesContextProviderProps = {
  children: React.ReactNode;
};

export function NationalitiesContextProvider({
  children,
}: NationalitiesContextProviderProps) {
  const [state, setState] = useState<Array<Nationality>>([]);

  useEffect(() => {
    getAllNationalities().then((response) => {
      setState(response);
    });
  }, []);

  return (
    <NationalitiesContext.Provider
      value={{
        state,
        dispatch: setState,
      }}
    >
      {children}
    </NationalitiesContext.Provider>
  );
}

export function UseNationalitiesContext() {
  return useContext(NationalitiesContext);
}
