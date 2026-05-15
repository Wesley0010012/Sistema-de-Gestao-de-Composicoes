import { Card } from "..";
import { CardIcon, type CardIconProps } from "../CardIcon";
import { Row } from "react-bootstrap";

export type CardPreset = {
  title: string;
  value: string;
  icon: CardIconProps;
};

type CardAreaProps = {
  cards: Array<CardPreset>;
};

export function CardArea({ cards }: CardAreaProps) {
  return (
    <Row className="mb-4 g-3 justify-content-between">
      {cards.map((card, index) => {
        return (
          <Card
            key={index}
            value={card.value}
            title={card.title}
            icon={
              card.icon && (
                <CardIcon
                  background={card.icon.background}
                  color={card.icon.color}
                  icon={card.icon.icon}
                />
              )
            }
          />
        );
      })}
    </Row>
  );
}
/*

[
        {
          title: "Total de compositores adicionados",
          value: "247",
          icon: <People />,
          color: "#0d6efd",
          bg: "#e7f1ff",
        },
        {
          title: "Adicionados Recentemente",
          value: "8",
          icon: <PlusCircle />,
          color: "#fd7e14",
          bg: "#fff4e6",
        },
      ]*/
