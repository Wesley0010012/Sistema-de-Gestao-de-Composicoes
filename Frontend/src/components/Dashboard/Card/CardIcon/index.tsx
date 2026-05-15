import type React from "react";

export type CardIconProps = {
  color: string;
  background: string;
  icon: React.ReactNode;
};

export function CardIcon({ color, background, icon }: CardIconProps) {
  return (
    <div
      style={{
        backgroundColor: background,
        color: color,
        borderRadius: "10px",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </div>
  );
}
