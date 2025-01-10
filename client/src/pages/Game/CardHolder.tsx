import { UseGameContext } from "../../providers/GameProvider";
import GameCard from "./Card";
import "./CardHolder.css";

let cardKey = 0;

export default function CardHolder() {
  const context = UseGameContext();
  const cards = context.currentCards;
  return (
    <>
      <div className="cardHolderContainer">
        {cards.map((c) => {
          return (
            <GameCard
              rank={c.rank}
              suit={c.suit}
              isHighlighted={c.isHighlighted}
              key={cardKey++}
            />
          );
        })}
      </div>
    </>
  );
}
