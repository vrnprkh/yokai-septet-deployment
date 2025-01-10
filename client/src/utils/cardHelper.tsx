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
		case 7:
			return Suit.Blue;
	}
	return Suit.Green;

}

export function  numberToGameCard(cardNumber : number) : GameCardProps {
	if (cardNumber == 0) {
		return {};
	}

	const suitNumber = Math.floor((cardNumber - 1) / 7) + 1;
	const suit = suitNumberToSuit(suitNumber);
	return {rank : cardNumber - ((suitNumber - 1) * 7), suit : suit}
}