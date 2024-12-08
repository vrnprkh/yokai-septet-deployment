import { Card } from "@mui/material";
import "./Card.css";
export enum Suit {
  Green = "GREEN",
  Purple = "PURPLE",
  Pink = "PINK",
  Yellow = "YELLOW",
  Black = "BLACK",
  Red = "RED",
  Blue = "BLUE",
}
export const suitToColorClass = {
  [Suit.Green]: "#29a600",
  [Suit.Purple]: "#790699",
  [Suit.Pink]: "Pink",
  [Suit.Yellow]: "Yellow",
  [Suit.Black]: "#575656",
  [Suit.Red]: "#b80f0f",
  [Suit.Blue]: "#16cade",
};

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
