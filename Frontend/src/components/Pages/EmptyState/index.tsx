import type { ReactNode } from "react";

type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  className?: string;
};

export function EmptyState({
  icon,
  title,
  description,
  className = "p-5",
}: EmptyStateProps) {
  return (
    <div className={`text-center ${className}`}>
      {icon && <div className="text-muted mb-2">{icon}</div>}
      <div className="fw-semibold">{title}</div>
      {description && <div className="text-muted small">{description}</div>}
    </div>
  );
}
