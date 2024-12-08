import { Card } from "@mui/material";
import "./Card.css";
import { Suit } from "../../types";
import { suitToColorClass } from "../../types";

export interface GameCardProps {
  rank?: number;
  suit?: Suit;
  isHighlighted?: boolean;
  isHoverable?: boolean;
}

export default function GameCard({
  rank = 0,
  suit = Suit.Green,
  isHighlighted = false,
  isHoverable = true,
}: GameCardProps) {
  return (
    <>
      <Card
        sx={{
          ...(isHoverable && {
            ":hover": {
              boxShadow: "0 0 1vw 0.25vw #000000",
              zIndex: 10,
            },
          }),
        }}
        className={isHighlighted ? "cardContainer highlight" : "cardContainer"}
        style={{ backgroundColor: suitToColorClass[suit] }}
      >
        {rank}
      </Card>
    </>
  );
}
