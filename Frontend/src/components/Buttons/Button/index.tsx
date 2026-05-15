import type React from "react";
import {
  Button as BootstrapButton,
  type ButtonProps as BsButtonProps,
} from "react-bootstrap";

type ButtonProps = {
  label?: string;
  color?: string;
  icon?: React.ReactNode;
} & BsButtonProps;

export function Button({
  label,
  color,
  icon,
  className,
  ...rest
}: ButtonProps) {
  return (
    <BootstrapButton
      {...rest}
      className={className}
      style={{
        ...(color ? { backgroundColor: color } : {}),
        border: "none",
        ...(rest.style || {}),
      }}
    >
      {icon && icon}
      {label && label}
    </BootstrapButton>
  );
}
