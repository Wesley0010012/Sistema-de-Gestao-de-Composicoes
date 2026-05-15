import { Button } from "react-bootstrap";
import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  badge?: string;
  action?: {
    label: string;
    icon?: ReactNode;
    variant?: string;
    onClick: () => void;
  };
};

export function PageHeader({
  title,
  subtitle,
  icon,
  badge,
  action,
}: PageHeaderProps) {
  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4 mobile-stack">
      <div>
        {(icon || badge) && (
          <div className="d-flex align-items-center gap-2 mb-2">
            {icon}
            {badge && <span className="badge bg-primary">{badge}</span>}
          </div>
        )}

        <h4 className="fw-bold mb-1">{title}</h4>
        {subtitle && <div className="text-muted">{subtitle}</div>}
      </div>

      {action && (
        <Button
          variant={action.variant || "primary"}
          onClick={action.onClick}
        >
          {action.icon && <span className="me-2">{action.icon}</span>}
          {action.label}
        </Button>
      )}
    </div>
  );
}
