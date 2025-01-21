// we store cards as a number from 0-49
// 0 is empty, 1 is Green A, 8 is Purple 2, and so on...

// shuffle array in place
function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

// card helpers

// gets the suit of a card (suit from 1-7 Green - Blue)
function getSuit(card) {
  return Math.floor((card - 1) / 7) + 1;
}
function getRank(card) {
  return card - 6 * (getSuit(card) - 1);
}
function evaluateTrick(cards, trump) {
  // returns the index of the winner of the trick
  // assume first card is lead

  // check for Ace first
  for (let i = 0; i < cards.length; i++) {
    if (cards[i] == 1) {
      return i;
    }
  }

  const leadSuit = getSuit(cards[0]);
  const trumpSuit = getSuit(trump);
  const leads = cards.filter((c) => getSuit(c) == leadSuit);
  const trumps = cards.filter((c) => getSuit(c) == trumpSuit);

  if (trumps.length > 0) {
    return cards.indexOf(Math.max(...trumps));
  }
  return cards.indexOf(Math.max(...leads));
}

class GameState {
  constructor() {
    this.users = [];
    this.trumpCard = 0;
    // lobby, cardswap, ingame, end
    this.state = "lobby";
    // index to users
    this.leadPlayer = -1;
    // offset off of lead player
    this.turn = 0;
    this.scores = [0, 0];
  }

  addUser(userId, username) {
    this.users.push({
      id: userId,
      name: username,
      toSwap: [],
      cardPlayed: 0,
      hand: [],
      team: 0,
      tricksWon: [],
    });
  }
  removeUser(userId) {
    const newUsers = this.users.filter((u) => {
      return u.id != userId;
    });
    if (newUsers.length < this.users.length) {
      this.users = newUsers;
      return true;
    }
    return false;
  }
  getUserIndex(userId) {
    let index = -1;
    this.users.forEach((u, i) => {
      if (u.id == userId) {
        index = i;
      }
    });
    return index;
  }

  setTeam(userId, teamNumber) {
    const index = this.getUserIndex(userId);
    if (index == -1) {
      return false;
    }
    if (teamNumber == 0) {
      this.users[index].team = 0;
      return true;
    }
    let teamcount = 0;
    this.users.forEach((u) => {
      if (u.team == teamNumber) {
        teamcount++;
      }
    });
    if (teamcount < 2) {
      this.users[index].team = teamNumber;
      return true;
    }
    return false;
  }
  // game setup from lobby
  teamsFilled() {
    let team1 = 0;
    let team2 = 0;
    this.users.forEach((u) => {
      if (u.team == 1) {
        team1++;
      } else if (u.team == 2) {
        team2++;
      }
    });
    return team1 == 2 && team2 == 2;
  }
  assignSeats() {
    const team1 = [];
    const team2 = [];
    this.users.forEach((u) => {
      if (u.team == 1) {
        team1.push(u);
      } else {
        team2.push(u);
      }
    });
    this.users = [team1[0], team2[0], team1[1], team2[1]];
  }

  // this is from the lobby
  startGame() {
    if (this.users.length < 4) {
      console.log("Not enough users to start!");
      return false;
    }
    if (!this.teamsFilled()) {
      console.log("Teams not filled!");
      return false;
    }
    if (this.state != "lobby") {
      return false;
    }
    this.assignSeats();
    this.dealCards();
    this.state = "cardSwap";
    this.scores = [0, 0];
    return true;
  }

  // betwen rounds and before rounds
  dealCards() {
    let deck = [...Array(49).keys()].map((e) => e + 1);
    shuffle(deck);

    this.trumpCard = deck.pop();

    let userIndex = 0;
    while (deck.length > 0) {
      this.users[userIndex].hand.push(deck.pop());
      userIndex = (userIndex + 1) % 4;
    }
    this.sortHands();
  }
  sortHands() {
    this.users.forEach((u) => {
      u.hand.sort((a, b) => a - b);
    });
  }

  // swapping, automatically swap once all players have commited
  hasSwapped(userId) {
    if (this.users[this.getUserIndex(userId)].toSwap.length > 0) {
      return true;
    }
    return false;
  }

  declareSwap(userId, cards) {
    if (this.hasSwapped(userId)) {
      console.log(`User ${userId} already swapped`);
      return false;
    }
    if (cards.length != 3) {
      console.log("Not correct number of cards to swap!");
      return false;
    }
    // check if users owns cards
    if (
      cards.filter(
        (c) => this.users[this.getUserIndex(userId)].hand.indexOf(c) != -1
      ).length < 3
    ) {
      return false;
    }
    this.users[this.getUserIndex(userId)].hand = this.users[
      this.getUserIndex(userId)
    ].hand.filter((c) => cards.indexOf(c) == -1);
    this.users[this.getUserIndex(userId)].toSwap = cards.toSorted(
      (a, b) => a - b
    );

    // check for completion
    // maybe make this non automatic
    if (this.users.every((user) => user.toSwap.length === 3)) {
      console.log(this.users);
      this.completeSwap();
    }
    return true;
  }
  declareSwapIndex(userId, cardIndexes) {
    const userIndex = this.getUserIndex(userId);
    return this.declareSwap(
      userId,
      cardIndexes.map((x) => this.users[userIndex].hand[x])
    );
  }

  completeSwap() {
    this.users.forEach((u, index) => {
      this.users[(index + 2) % 4].hand.push(...u.toSwap);
    });
    this.state = "inGame";
    // setup inGame
    this.setupLeadPlayer();
  }
  // setup in round
  setupLeadPlayer() {
    // lead player is smae from last round, unless first round, then use ace/ Blue13
    if (this.leadPlayer != -1) {
      return;
    }
    for (let i = 0; i < 4; i++) {
      if (this.users[i].hand.indexOf(1) != -1) {
        this.leadPlayer = i;
        return;
      }
    }
    for (let i = 0; i < 4; i++) {
      if (this.users[i].hand.indexOf(49) != -1) {
        this.leadPlayer = i;
        return;
      }
    }
  }
  // playing cards
  playCard(userId, card) {
    // check correct player
    let uIndex = this.getUserIndex(userId);
    if (uIndex != (this.turn + this.leadPlayer) % 4) {
      console.log("Not this users turn!!");
      return false;
    }
    if (this.turn == 4) {
      console.log("Cannot play card, need to resolve trick");
      return false;
    }

    // check if user owns card
    let user = this.users[uIndex];

    if (user.hand.indexOf(card) == -1) {
      console.log("User does not own card!");
      return false;
    }
    // check if its valid in the trick
    if (this.turn != 0) {
      const leadSuit = getSuit(this.users[this.leadPlayer].cardPlayed);
      if (getSuit(card) != leadSuit) {
        // check each card in hand
        for (let i = 0; i < this.users[uIndex].hand.length; i++) {
          if (getSuit(this.users[uIndex].hand[i]) == leadSuit) {
            console.log("Cannot short suit if owning lead suit!");
            return false;
          }
        }
      }
    }
    // update hand and played card
    user.hand.splice(user.hand.indexOf(card), 1);
    user.cardPlayed = card;
    // update turn
    this.turn += 1;
    return true;
  }
  playCardIndex(userId, cardIndex) {
    return this.playCard(
      userId,
      this.users[this.getUserIndex(userId)].hand[cardIndex]
    );
  }
  // check if trick needs to be cleaned up
  checkTrickEnd() {
    return this.turn == 4;
  }
  resolveTrick() {
    if (!this.checkTrickEnd()) {
      console.log("Trick is not completed, cannot resolve trick");
      return false;
    }
    // evaluate trick
    let cardsPlayed = [];
    for (let i = 0; i < 4; i++) {
      cardsPlayed.push(this.users[(i + this.leadPlayer) % 4].cardPlayed);
      // clear card
      this.users[(i + this.leadPlayer) % 4].cardPlayed = 0;
    }
    console.log(cardsPlayed);

    let winnerIndex =
      (evaluateTrick(cardsPlayed, this.trumpCard) + this.leadPlayer) % 4;

    // give cards to player
    this.users[winnerIndex].tricksWon.push(cardsPlayed);
    // set lead player
    this.leadPlayer = winnerIndex;
    this.turn = 0;
    console.log("trick ended");
    return true;
  }

  // helpers
  restartRound() {
    this.users.forEach((u) => {
      u.hand = [];
      u.toSwap = [];
      u.tricksWon = [];
    });
    this.dealCards();
    this.state = "cardSwap";
  }

  countTricks(teamNumber) {
    return (
      this.users[teamNumber - 1].tricksWon.length +
      this.users[teamNumber + 1].tricksWon.length
    );
  }
  scoreSevens(sevens) {
    const trumpSuit = getSuit(this.trumpCard);
    let score = 0;

    sevens.forEach((c) => {
      score += getSuit(c) == trumpSuit ? 0 :[0, 0, 1, 1, 1, 2, 2][getSuit(c) - 1];
    });
    console.log("score", score)
    return score;
  }

  getSevens(teamNumber) {
    const cardsWon = this.users[teamNumber - 1].tricksWon
      .flat()
      .concat(this.users[teamNumber + 1].tricksWon.flat());
    return cardsWon.filter((v) => getRank(v) == 7);
  }

  countSevens(teamNumber) {
    return this.getSevens(teamNumber).length;
  }

  doScoring() {
    // pre assume that the round is over
    const team1sevensCount = this.countSevens(1);
    const team2sevensCount = this.countSevens(2);
    const team1sevens = this.getSevens(1);
    const team2sevens = this.getSevens(2)

    const team1trickCount = this.countTricks(1);
    const team2trickCount = this.countTricks(2);

    if (team1sevensCount >= 4) {
      this.scores[0] += this.scoreSevens(team1sevens);
    } else if (team2sevensCount >= 4) {
      this.scores[1] += this.scoreSevens(team2sevens);
    } else if (team2trickCount >= 7) {
      this.scores[0] += this.scoreSevens(team1sevens);
      this.scores[0] += this.scoreSevens(this.users[1].hand.concat(this.users[3].hand).filter((v) => getRank(v) == 7));
    } else if (team1trickCount >= 7) {
      this.scores[1] += this.scoreSevens(team2sevens);
      this.scores[1] += this.scoreSevens(this.users[0].hand.concat(this.users[2].hand).filter((v) => getRank(v) == 7));
    } else {
      // lead player team wins
      if (this.leadPlayer % 2 == 0) {
        this.scores[0] += this.scoreSevens(team1sevens);
      } else {
        this.scores[1] += this.scoreSevens(team2sevens);
      }
    }
    console.log("score", this.scores);
  }

  // round ending (win con)
  tryEndRound() {
    // first check 7s
    const team1sevens = this.countSevens(1);
    const team2sevens = this.countSevens(2);

    const team1trickCount = this.countTricks(1);
    const team2trickCount = this.countTricks(2);
    console.log(team1sevens, team2sevens, team1trickCount, team2trickCount);
    if (
      team1sevens < 4 &&
      team2sevens < 4 &&
      team1trickCount < 7 &&
      team2trickCount < 7 &&
      team1trickCount + team2trickCount < 12
    ) {
      return false;
    }
    console.log("round over");
    // do scoring
    this.doScoring();
    this.restartRound();
    return true;
  }
}
module.exports = { GameState, evaluateTrick };
