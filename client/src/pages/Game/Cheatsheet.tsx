import { UseGameContext } from "../../providers/GameProvider";
import { Suit, suitToColorClass } from "../../types";
import { numberToGameCard, suitNumberToSuit } from "../../utils/cardHelper";
import "./Cheatsheet.css";

export default function Cheatsheet() {
  const context = UseGameContext();
  const colorNames = [
    "Green",
    "Purple",
    "Yellow",
    "Pink",
    "Black",
    "Red",
    "Blue",
  ];
  function createLabelRow() {
    return (
      <div className="cheatsheetRow">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((v) => {
          return (
            <>
              <div className="cell">{v}</div>
            </>
          );
        })}
      </div>
    );
  }

  function beenPlayed(cardSuit: Suit, cardRank: number) {
    if (
      cardSuit == context.trumpCard?.suit &&
      cardRank == context.trumpCard.rank
    ) {
      return true;
    }
    for (let i = 0; i < 4; i++) {
      const card = context.playedCards[i];
      if (!card) {
        continue;
      }
      if (card.rank == cardRank && card.suit == cardSuit) {
        return true;
      }
    }
    const flattenedTricks = context.wonTricks.flat().flat();
    for (let i = 0; i < flattenedTricks.length; i++) {
      const newCard = numberToGameCard(flattenedTricks[i]);
      if (newCard?.rank == cardRank && newCard?.suit == cardSuit) {
        return true;
      }
    }
  }
  function createTeamRow(teamNumber: number) {
    const teamTricks = context.wonTricks[((teamNumber - 1) + context.userIndex) % 4].concat(
      context.wonTricks[((teamNumber + 1) + context.userIndex) % 4]
    );
    const allTeamCards = teamTricks.flat();
    // find all 7s
    const sevenSuits: Suit[] = [];
    allTeamCards.forEach((c) => {
      const card = numberToGameCard(c);
      if (card?.rank == 7 && card?.suit) {
        sevenSuits.push(card?.suit);
      }
    });
    console.log(sevenSuits);
    return (
      <div>
        Team {teamNumber}: {teamTricks.length} tricks
        {sevenSuits.map((s) => (
          <div className="cell">
            <span
              className="dot"
              style={{
                backgroundColor: suitToColorClass[s],
              }}
            ></span>
          </div>
        ))}
      </div>
    );
  }

  function createCheatSheetRow(rowNumber: number, labelName: string) {
    return (
      <div className="cheatsheetRow">
        <div>{labelName}</div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((v) => {
          return (
            <>
              <div className="cell">
                {rowNumber < v && v < rowNumber + 8 && (
                  <span
                    className="dot"
                    style={{
                      backgroundColor: !beenPlayed(
                        suitNumberToSuit(rowNumber + 1),
                        v
                      )
                        ? suitToColorClass[suitNumberToSuit(rowNumber + 1)]
                        : "",
                    }}
                  >
                    {v == 7 && [0, 0, 1, 1, 1, 2, 2, 2][rowNumber]}
                  </span>
                )}
              </div>
            </>
          );
        })}
      </div>
    );
  }

  return (
    <div className="cheatsheet">
      {createLabelRow()}
      {colorNames.map((c, i) => {
        return createCheatSheetRow(i, c);
      })}

      <div className="teamInfo">
        {createTeamRow(1)}
        {createTeamRow(2)}
      </div>
    </div>
  );
}
