import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { getRecentTotalOfWorks } from "../utils/works/works-crud";

export type RecentWorksContextProps = {
  state: number;
  dispatch: Dispatch<SetStateAction<number>>;
  refresh: () => void;
};

export const RecentWorksContext = createContext<RecentWorksContextProps>({
  state: 0,
  dispatch: () => {},
  refresh: () => {},
});

export function RecentWorksContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, setState] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey((prev) => prev + 1);

  useEffect(() => {
    getRecentTotalOfWorks().then(setState);
  }, [refreshKey]);

  return (
    <RecentWorksContext.Provider value={{ state, dispatch: setState, refresh }}>
      {children}
    </RecentWorksContext.Provider>
  );
}

export function UseRecentWorksContext() {
  return useContext(RecentWorksContext);
}
