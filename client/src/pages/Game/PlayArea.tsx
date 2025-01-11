import { UseGameContext } from "../../providers/GameProvider";
import GameCard from "./Card";
import "./PlayArea.css";

export default function PlayArea() {
  const context = UseGameContext();
  const playedCards = context.playedCards;
  const card0 = playedCards[0];
  const card1 = playedCards[1];
  const card2 = playedCards[2];
  const card3 = playedCards[3];
  const trumpCard = context.trumpCard;
  return (
    <div className="playAreaContainer">
      <div>{card2 && <GameCard {...card2} isHoverable={false} />}</div>
      <div>
        {card1 && <GameCard {...card1} isHoverable={false} />}
        {trumpCard && <GameCard {...trumpCard} isHoverable={false}/>}
        {card3 && <GameCard {...card3} isHoverable={false} />}
      </div>
      <div>{card0 && <GameCard {...card0} isHoverable={false} />}</div>
    </div>
  );
}
