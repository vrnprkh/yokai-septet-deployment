import React, { ReactNode, useContext, useState } from "react";
import { GameCardProps } from "../pages/Game/Card";

interface GameContextType {
  currentCards: GameCardProps[];
  trumpCard: GameCardProps | undefined;
  playedCards: (GameCardProps | undefined)[];
  // offset from player
  currentTurn: number;
  playerNames: (string | undefined)[];

  // callbacks
  cardCallbacks : (() => void | undefined)[];
  // gamePhase
  gamePhase : string;

  // selected cards during swap stage
  selectedSwapCards : number[];

  setCurrentCards: React.Dispatch<React.SetStateAction<GameCardProps[]>>;
  setTrumpCard: React.Dispatch<React.SetStateAction<GameCardProps | undefined>>;
  setPlayedCards: React.Dispatch<
    React.SetStateAction<(GameCardProps | undefined)[]>
  >; 
  setCurrentTurn: React.Dispatch<React.SetStateAction<number>>;
  setPlayerNames : React.Dispatch<React.SetStateAction<(string | undefined)[]>>;

  setCardCallbacks : React.Dispatch<React.SetStateAction<(() => void | undefined)[]>>;
  setGamePhase: React.Dispatch<React.SetStateAction<string>>;
  setSelectedSwapCards : React.Dispatch<React.SetStateAction<number[]>>;

}

const GameContext = React.createContext<GameContextType | undefined>(undefined);

const GameProvider = ({ children }: { children: ReactNode }) => {
  const [currentCards, setCurrentCards] = useState<GameCardProps[]>([]);
  const [trumpCard, setTrumpCard] = useState<GameCardProps | undefined>(
    undefined
  );
  const [playedCards, setPlayedCards] = useState<(GameCardProps | undefined)[]>(
    [undefined, undefined, undefined, undefined]
  );
  const [currentTurn, setCurrentTurn] = useState<number>(0);
  const [playerNames, setPlayerNames] = useState<(string | undefined)[]>([undefined, undefined, undefined, undefined]);

  const [cardCallbacks, setCardCallbacks] = useState< (() => void | undefined)[]>([])
  const [gamePhase, setGamePhase] = useState<string>("lobby");
  const [selectedSwapCards, setSelectedSwapCards] = useState<number[]>([]);

  return (
    <GameContext.Provider
      value={{
        currentCards,
        trumpCard,
        playedCards,
        currentTurn,
        playerNames,
        cardCallbacks,
        gamePhase,
        selectedSwapCards,
        setCurrentCards,
        setTrumpCard,
        setPlayedCards,
        setCurrentTurn,
        setPlayerNames,
        setCardCallbacks,
        setGamePhase,
        setSelectedSwapCards,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const UseGameContext = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
export { GameProvider, UseGameContext };
