import { createContext, useContext, useState } from "react";
import type { Composer } from "../types/Composer";

type SelectedComposerContextProps = {
  state: Composer | null;
  setState: (composer: Composer | null) => void;
};

const SelectedComposerContext = createContext<SelectedComposerContextProps>({
  state: null,
  setState: () => {},
});

export function SelectedComposerContextProvider({ children }: any) {
  const [state, setState] = useState<Composer | null>(null);

  return (
    <SelectedComposerContext.Provider value={{ state, setState }}>
      {children}
    </SelectedComposerContext.Provider>
  );
}

export function useSelectedComposerContext() {
  return useContext(SelectedComposerContext);
}
