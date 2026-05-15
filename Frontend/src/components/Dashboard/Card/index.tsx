import type React from "react";
import { Col, Card as BootStrapCard } from "react-bootstrap";

export type CardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
};

export function Card({ title, value, icon }: CardProps) {
  return (
    <Col xs={12} sm={6} lg={3}>
      <BootStrapCard className="p-3 shadow-sm border-0 h-100">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <small className="text-muted">{title}</small>
            <h5 className="fw-bold mt-1">{value}</h5>
          </div>

          {icon && icon}
        </div>
      </BootStrapCard>
    </Col>
  );
}
