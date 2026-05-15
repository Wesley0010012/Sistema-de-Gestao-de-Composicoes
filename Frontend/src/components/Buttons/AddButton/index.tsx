import { Plus } from "react-bootstrap-icons";
import { Button } from "../Button";

import { type ButtonProps as BsButtonProps } from "react-bootstrap";

type AddButtonProps = BsButtonProps;

export function AddButton(props: AddButtonProps) {
  return (
    <Button
      color="#7c3aed"
      label="Adicionar!"
      onClick={props.onClick}
      icon={<Plus className="me-2" size={20} />}
    />
  );
}
