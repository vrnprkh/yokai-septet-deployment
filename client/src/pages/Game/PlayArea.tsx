import { UseGameContext } from "../../providers/GameProvider";
import GameCard from "./Card";
import "./PlayArea.css";

export default function PlayArea() {
  const context = UseGameContext();
  const playedCards = context.playedCards;
  const card1 = playedCards[0];
  const card2 = playedCards[1];
  const card3 = playedCards[2];
  const card4 = playedCards[3];
  const trumpCard = context.trumpCard;
  return (
    <div className="playAreaContainer">
      <div>{card3 && <GameCard {...card3} isHoverable={false} />}</div>
      <div>
        {card2 && <GameCard {...card2} isHoverable={false} />}
        {trumpCard && <GameCard {...trumpCard} isHoverable={false} />}
        {card4 && <GameCard {...card4} isHoverable={false} />}
      </div>
      <div>{card1 && <GameCard {...card1} isHoverable={false} />}</div>
    </div>
  );
}
