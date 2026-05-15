import React, { createContext, useContext, useState } from "react";
import { ConfirmCard } from "../components/Cards/ConfirmCard";

type ConfirmOptions = {
  message: string;
  onConfirm: () => Promise<void> | void;
};

type ConfirmContextType = {
  confirm: (options: ConfirmOptions) => void;
};

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export const ConfirmProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<{
    show: boolean;
    message: string;
    onConfirm?: () => Promise<void> | void;
  }>({
    show: false,
    message: "",
  });

  const confirm = ({ message, onConfirm }: ConfirmOptions) => {
    setState({
      show: true,
      message,
      onConfirm,
    });
  };

  const handleConfirm = async () => {
    if (state.onConfirm) {
      await state.onConfirm();
    }

    setState({ show: false, message: "" });
  };

  const handleCancel = () => {
    setState({ show: false, message: "" });
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      <ConfirmCard
        show={state.show}
        message={state.message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  const context = useContext(ConfirmContext);

  if (!context) {
    throw new Error("useConfirm must be used within ConfirmProvider");
  }

  return context;
};
