import React, { ReactNode, useContext, useState } from "react";
import { GameCardProps } from "../pages/Game/Card";

interface GameContextType {
  currentCards: GameCardProps[];
  trumpCard: GameCardProps | undefined;
  playedCards: (GameCardProps | undefined)[];

  setCurrentCards: React.Dispatch<React.SetStateAction<GameCardProps[]>>;
  setTrumpCard: React.Dispatch<React.SetStateAction<GameCardProps | undefined>>;
  setPlayedCards: React.Dispatch<
    React.SetStateAction<(GameCardProps | undefined)[]>
  >; 
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
  return (
    <GameContext.Provider
      value={{
        currentCards,
        trumpCard,
        playedCards,
        setCurrentCards,
        setTrumpCard,
        setPlayedCards,
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
