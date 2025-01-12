import { UseGameContext } from "../../providers/GameProvider";
import GameCard from "./Card";
import "./CardHolder.css";



export default function CardHolder() {
  const context = UseGameContext();
  const cards = context.currentCards;
  const swapCards = context.selectedSwapCards;
  return (
    <>
      <div className="cardHolderContainer">
        {cards.map((c, i) => {
          return (
            <GameCard
              rank={c.rank}
              suit={c.suit}
              isHighlighted={c.isHighlighted || (swapCards.indexOf(i) != -1 && swapCards.length != 3)}
              key={`${c.rank}-${c.suit}`}
              clickCallback={context.cardCallbacks[i]}
            />
          );
        })}
      </div>
    </>
  );
}
