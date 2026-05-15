import React, {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

type SearchBarContextProps = {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
};

const SearchBarContext = createContext<SearchBarContextProps | undefined>(
  undefined,
);

export const SearchBarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<string>("");

  return (
    <SearchBarContext.Provider value={{ state, setState }}>
      {children}
    </SearchBarContext.Provider>
  );
};

export const useSearchBarContext = () => {
  const context = useContext(SearchBarContext);
  if (!context)
    throw new Error("useSearchBar must be used within SearchBarProvider");
  return context;
};
