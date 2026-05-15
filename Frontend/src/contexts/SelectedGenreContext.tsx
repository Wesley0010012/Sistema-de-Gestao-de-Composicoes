import { createContext, useContext, useState } from "react";
import type { Genre } from "../types/Genre";

type SelectedGenreContextProps = {
  state: Genre | null;
  setState: (genre: Genre | null) => void;
};

const SelectedGenreContext = createContext<SelectedGenreContextProps>({
  state: null,
  setState: () => {},
});

export function SelectedGenreContextProvider({ children }: any) {
  const [state, setState] = useState<Genre | null>(null);

  return (
    <SelectedGenreContext.Provider value={{ state, setState }}>
      {children}
    </SelectedGenreContext.Provider>
  );
}

export function useSelectedGenreContext() {
  return useContext(SelectedGenreContext);
}
