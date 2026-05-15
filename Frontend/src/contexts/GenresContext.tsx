import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Genre } from "../types/Genre";
import { getAllGenres } from "../utils/genres/genres-crud";

export type GenresContextProps = {
  state: Array<Genre>;
  dispatch: Dispatch<SetStateAction<Array<Genre>>>;
};

export const initialState: GenresContextProps = {
  state: [],
  dispatch: () => {},
};

export const GenresContext = createContext<GenresContextProps>(initialState);

type GenresContextProviderProps = {
  children: React.ReactNode;
};

export function GenresContextProvider({
  children,
}: GenresContextProviderProps) {
  const [state, setState] = useState<Array<Genre>>([]);

  useEffect(() => {
    getAllGenres().then((response) => {
      setState(response);
    });
  }, []);

  return (
    <GenresContext.Provider
      value={{
        state,
        dispatch: setState,
      }}
    >
      {children}
    </GenresContext.Provider>
  );
}

export function UseGenresContext() {
  return useContext(GenresContext);
}
