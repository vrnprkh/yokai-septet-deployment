import PlayArea from "./PlayArea";
import "./MiddleSection.css";
import PlayerInfo from "./PlayerInfo";
import { UseGameContext } from "../../providers/GameProvider";

export default function MiddleSection() {
  const context = UseGameContext();
  const playerNames = context.playerNames;
  const turn = context.currentTurn;


  return (
    <>
      <div className="middleContainer">
        <PlayerInfo name={playerNames[1]} isTurn={turn == 1}/>
        <div className="verticalHolder">
          <PlayerInfo name={playerNames[2]} isTurn={turn == 2}/>
          <PlayArea></PlayArea>
          <PlayerInfo name={playerNames[0]} isTurn={turn == 0}/>
        </div>
        <PlayerInfo name={playerNames[3]} isTurn={turn == 3}/>
      </div>
    </>
  );
}
