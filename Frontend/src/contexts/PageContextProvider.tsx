import React, {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

type PageState = {
  page: number;
  perPage: number;
};

type PageContextProps = {
  state: PageState;
  setState: Dispatch<SetStateAction<PageState>>;
};

const PageContext = createContext<PageContextProps | undefined>(undefined);

export const PageProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<PageState>({
    page: 1,
    perPage: 10,
  });

  return (
    <PageContext.Provider value={{ state, setState }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (!context) throw new Error("usePage must be used within PageProvider");
  return context;
};
