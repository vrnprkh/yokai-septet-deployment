import GameCard, { GameCardProps } from "./Card";
import "./CardHolder.css";

export default function CardHolder({ cards }: { cards: GameCardProps[] }) {
  return (
    <>
      <div className="cardHolderContainer">
        {cards.map((c) => {
          return (
            <GameCard
              rank={c.rank}
              suit={c.suit}
              isHighlighted={c.isHighlighted}
            />
          );
        })}
      </div>
    </>
  );
}
