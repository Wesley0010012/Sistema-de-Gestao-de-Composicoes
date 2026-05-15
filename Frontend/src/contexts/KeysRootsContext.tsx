import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

import type { KeyOption } from "../types/KeyOption";
import { getAllKeyRoots } from "../utils/keys/keys-crud";

export type KeyRootsContextProps = {
  state: KeyOption[];
  dispatch: Dispatch<SetStateAction<KeyOption[]>>;
  refresh: () => void;
};

export const KeyRootsContext = createContext<KeyRootsContextProps>({
  state: [],
  dispatch: () => {},
  refresh: () => {},
});

export function KeyRootsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<KeyOption[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey((prev) => prev + 1);

  useEffect(() => {
    getAllKeyRoots().then(setState);
  }, [refreshKey]);

  return (
    <KeyRootsContext.Provider
      value={{
        state,
        dispatch: setState,
        refresh,
      }}
    >
      {children}
    </KeyRootsContext.Provider>
  );
}

export function useKeyRootsContext() {
  return useContext(KeyRootsContext);
}
