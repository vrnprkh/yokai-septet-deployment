import GameCard, { GameCardProps } from "./Card";
import "./PlayArea.css";

export default function PlayArea({
  trumpCard,
  card1,
  card2,
  card3,
  card4,
}: {
  trumpCard?: GameCardProps;
  card1?: GameCardProps;
  card2?: GameCardProps;
  card3?: GameCardProps;
  card4?: GameCardProps;
}) {
  return (
    <div className="playAreaContainer">
      <div>
        <GameCard {...card3}/>
      </div>
      <div>
        <GameCard {...card2}/>
        <GameCard {...trumpCard}/>
        <GameCard {...card4}/>
      </div>
      <div>
        <GameCard {...card1}/>
      </div>
    </div>
  );
}
