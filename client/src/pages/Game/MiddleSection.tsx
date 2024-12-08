import PlayArea from "./PlayArea";
import "./MiddleSection.css";
import PlayerInfo from "./PlayerInfo";

export default function MiddleSection() {
  return (
    <>
      <div className="middleContainer">
        <PlayerInfo></PlayerInfo>
        <div className="verticalHolder">
          <PlayerInfo />
          <PlayArea></PlayArea>
          <PlayerInfo />
        </div>
        <PlayerInfo />
      </div>
    </>
  );
}
