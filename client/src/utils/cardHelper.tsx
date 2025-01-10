import { GameCardProps} from "../pages/Game/Card"
import { Suit } from "../types"




function suitNumberToSuit(suitNumber : number) : Suit {
	switch (suitNumber) {
		case 1:
			return Suit.Green
		case 2:
			return Suit.Purple
		case 3:
			return Suit.Pink
		case 4:
			return Suit.Yellow
		case 5:
			return Suit.Black
		case 6:
			return Suit.Red
	}
	return Suit.Blue;
	
}

export function  numberToGameCard(cardNumber : number) : GameCardProps {
	const suitNumber = Math.floor((cardNumber - 1) / 7) + 1;
	const suit = suitNumberToSuit(suitNumber);
	return {rank : cardNumber - ((suitNumber - 1) * 7), suit : suit}
}