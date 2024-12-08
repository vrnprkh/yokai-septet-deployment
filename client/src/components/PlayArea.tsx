import GameCard from "./Card";
import "./PlayArea.css";

export default function PlayArea() {
  return (
		<div className="playAreaContainer">
		<div>
		<GameCard/>
		</div>
		<div>
		<GameCard/>
		<GameCard/>
		<GameCard/>
		</div>
		<div>
		<GameCard/>
		</div>

		</div>
  );
}
