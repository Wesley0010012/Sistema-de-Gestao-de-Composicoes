import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { getTotalOfWorks } from "../utils/works/works-crud";

export type TotalWorksContextProps = {
  state: number;
  dispatch: Dispatch<SetStateAction<number>>;
  refresh: () => void;
};

export const TotalWorksContext = createContext<TotalWorksContextProps>({
  state: 0,
  dispatch: () => {},
  refresh: () => {},
});

export function TotalWorksContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, setState] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey((prev) => prev + 1);

  useEffect(() => {
    getTotalOfWorks().then(setState);
  }, [refreshKey]);

  return (
    <TotalWorksContext.Provider value={{ state, dispatch: setState, refresh }}>
      {children}
    </TotalWorksContext.Provider>
  );
}

export function UseTotalWorksContext() {
  return useContext(TotalWorksContext);
}
