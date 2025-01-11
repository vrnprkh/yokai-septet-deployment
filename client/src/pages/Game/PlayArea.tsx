import { UseGameContext } from "../../providers/GameProvider";
import GameCard from "./Card";
import "./PlayArea.css";

export default function PlayArea() {
  const context = UseGameContext();
  const { playedCards, trumpCard } = context;
  const card0 = playedCards[0];
  const card1 = playedCards[1];
  const card2 = playedCards[2];
  const card3 = playedCards[3];

  return (
    <div className="verticalFiller">
      <div className="playAreaContainer">
        {card2 && (
          <div style={{ gridArea: "card2" }}>
            <GameCard {...card2} isHoverable={false} />
          </div>
        )}
        {card0 && (
          <div style={{ gridArea: "card0" }}>
            <GameCard {...card0} isHoverable={false} />
          </div>
        )}
        {trumpCard && (
          <div style={{ gridArea: "trump" }}>
            <GameCard {...trumpCard} isHoverable={false} />
          </div>
        )}
        {card3 && (
          <div style={{ gridArea: "card3" }}>
            <GameCard {...card3} isHoverable={false} />
          </div>
        )}
        {card1 && (
          <div style={{ gridArea: "card1" }}>
            <GameCard {...card1} isHoverable={false} />
          </div>
        )}
      </div>
    </div>
  );
}
