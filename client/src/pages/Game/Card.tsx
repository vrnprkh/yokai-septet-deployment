import { Card } from "@mui/material";
import "./Card.css";
import { Suit } from "../../types";
import { suitToColorClass } from "../../types";

export interface GameCardProps {
  rank?: number;
  suit?: Suit;
  isHighlighted?: boolean;
  isHoverable?: boolean;
  clickCallback? : () => void
}

export default function GameCard({
  rank = 0,
  suit = Suit.Green,
  isHighlighted = false,
  isHoverable = true,
  clickCallback = () => {console.log("hi!")}
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
        onClick={clickCallback}
      >
        {rank}
      </Card>
    </>
  );
}
