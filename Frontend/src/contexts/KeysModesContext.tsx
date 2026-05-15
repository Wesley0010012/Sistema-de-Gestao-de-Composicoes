import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

import type { KeyOption } from "../types/KeyOption";
import { getAllKeyModes } from "../utils/keys/keys-crud";

export type KeyModesContextProps = {
  state: KeyOption[];
  dispatch: Dispatch<SetStateAction<KeyOption[]>>;
  refresh: () => void;
};

export const KeyModesContext = createContext<KeyModesContextProps>({
  state: [],
  dispatch: () => {},
  refresh: () => {},
});

export function KeyModesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<KeyOption[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey((prev) => prev + 1);

  useEffect(() => {
    getAllKeyModes().then(setState);
  }, [refreshKey]);

  return (
    <KeyModesContext.Provider
      value={{
        state,
        dispatch: setState,
        refresh,
      }}
    >
      {children}
    </KeyModesContext.Provider>
  );
}

export function useKeyModesContext() {
  return useContext(KeyModesContext);
}
