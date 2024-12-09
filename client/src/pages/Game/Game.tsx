import MiddleSection from "./MiddleSection";
import "./Game.css";
import Cheatsheet from "./Cheatsheet";
import CardHolder from "./CardHolder";

export default function Game() {
  return (
    <>
      <Cheatsheet />
      <div className="gameContainer">
        <MiddleSection />
        <CardHolder
        />
      </div>
    </>
  );
}
