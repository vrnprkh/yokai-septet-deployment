import MiddleSection from "./MiddleSection";
import "./Game.css";
import Cheatsheet from "./Cheatsheet";
import CardHolder from "./CardHolder";
import { Suit } from "../../types";

export default function Game() {
  return (
    <>
      <Cheatsheet />
      <div className="gameContainer">
        <MiddleSection />
        <CardHolder
          cards={[
            { rank: 1, suit: Suit.Green },
            { rank: 8, suit: Suit.Purple },
            { rank: 5, suit: Suit.Pink },
            { rank: 7, suit: Suit.Yellow },
            { rank: 10, suit: Suit.Black },
            { rank: 11, suit: Suit.Red },
            { rank: 13, suit: Suit.Blue },
            { rank: 2, suit: Suit.Green },
            { rank: 3, suit: Suit.Green },
            { rank: 4, suit: Suit.Green },
            { rank: 5, suit: Suit.Green },
            { rank: 6, suit: Suit.Green, isHighlighted: true },
          ]}
        />
      </div>
    </>
  );
}
