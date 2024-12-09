import { UseGameContext } from "../../providers/GameProvider";
import GameCard from "./Card";
import "./CardHolder.css";

export default function CardHolder() {
  const context = UseGameContext();
  const cards = context.currentCards;
  let i =1
  return (
    <>
      <div className="cardHolderContainer">
        {cards.map((c) => {
          return (
            <GameCard
              rank={c.rank}
              suit={c.suit}
              isHighlighted={c.isHighlighted}
              key={i++}
            />
          );
        })}
      </div>
    </>
  );
}
