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
  }

  addUser(userId, username) {
    this.users.push({
      id: userId,
      name: username,
      toSwap: [],
      cardPlayed: 0,
      hand: [],
      team: 0,
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
    this.assignSeats();
    this.dealCards();
    this.state = "cardSwap";
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
    this.users[this.getUserIndex(userId)].toSwap = cards;

    // check for completion
    // maybe make this non automatic
    if (
      (this.users.every(user => user.toSwap.length === 3))
    ) {
      console.log(this.users)
      this.completeSwap();
    }
    return true;
  }
  completeSwap() {
    this.users.forEach((u, index) => {
      console.log("foo")
      this.users[(index + 2) % 4].hand.push(...u.toSwap);
    });
    this.state = "inGame"
    // setup inGame
    this.setupGameRound();
  }
  // setup in round
  setupGameRound() {
    
  }


}

function test() {
  testGame = new GameState();
  testGame.addUser(1, "user1");
  testGame.addUser(2, "user2");
  testGame.addUser(3, "user3");
  testGame.addUser(4, "user4");

  testGame.setTeam(1, 1);
  testGame.setTeam(2, 1);
  testGame.setTeam(3, 2);
  testGame.setTeam(4, 2);

  console.log(testGame);
  testGame.startGame();
  console.log(JSON.stringify(testGame, null, " "));

  console.log(evaluateTrick([6, 11, 7, 13], 21));
  console.log(evaluateTrick([15, 11, 7, 13], 21));
  console.log(evaluateTrick([15, 11, 7, 1], 21));
  console.log(evaluateTrick([2, 3, 44, 8], 21));

  // this will take a while !
  while (true) {
    swapGame = new GameState();
    swapGame.addUser(1, "user1");
    swapGame.addUser(2, "user2");
    swapGame.addUser(3, "user3");
    swapGame.addUser(4, "user4");

    swapGame.setTeam(1, 1);
    swapGame.setTeam(2, 1);
    swapGame.setTeam(3, 2);
    swapGame.setTeam(4, 2);

    swapGame.startGame();

    if (
      swapGame.declareSwap(1, [1, 2, 3]) &&
      swapGame.declareSwap(2, [4, 5, 6]) &&
      swapGame.declareSwap(3, [7, 8, 9]) &&
      swapGame.declareSwap(4, [10, 11, 12])
    ) {
      console.log(JSON.stringify(swapGame, null, " "));
      return;
    }
  }
}

test();
