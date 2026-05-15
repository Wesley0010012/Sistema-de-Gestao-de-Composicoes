import { Trash } from "react-bootstrap-icons";
import { Button } from "../Button";

type TrashDeleteButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export function TrashDeleteButton({ onClick }: TrashDeleteButtonProps) {
  return (
    <Button
      className="bg-danger"
      onClick={onClick}
      icon={<Trash className="text-white" role="button" />}
    />
  );
}
