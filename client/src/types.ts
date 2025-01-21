export enum Suit {
  Green = "GREEN",
  Purple = "PURPLE",
  Pink = "PINK",
  Yellow = "YELLOW",
  Black = "BLACK",
  Red = "RED",
  Blue = "BLUE",
}

export const suitToColorClass = {
  [Suit.Green]: "#29a600",
  [Suit.Purple]: "#790699",
  [Suit.Pink]: "Pink",
  [Suit.Yellow]: "Yellow",
  [Suit.Black]: "#575656",
  [Suit.Red]: "#b80f0f",
  [Suit.Blue]: "#16cade",
};

export type Message = {
  text: string;
  user: string;
};

export type User = {
  id: string;
  name: string;
  roomId: string;
  team: number;
};


// GameState Type
export interface GameState {
  users: UsersEntity[];
  trumpCard: number;
  state: string;
  leadPlayer: number;
  turn: number;
  scores: number[];
}
export interface UsersEntity {
  id: string;
  name: string;
  toSwap: number[] ;
  cardPlayed: number;
  hand: number[];
  team: number;
  tricksWon: number[][] ;
}
