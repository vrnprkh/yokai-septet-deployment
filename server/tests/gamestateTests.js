const {GameState, evaluateTrick} = require("../gamestate");

function test() {
  testGame = new GameState()
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


  testGame.setupGameRound()
  console.log(testGame)
  // this will take a while !
  // while (true) {
  //   swapGame = new GameState();
  //   swapGame.addUser(1, "user1");
  //   swapGame.addUser(2, "user2");
  //   swapGame.addUser(3, "user3");
  //   swapGame.addUser(4, "user4");

  //   swapGame.setTeam(1, 1);
  //   swapGame.setTeam(2, 1);
  //   swapGame.setTeam(3, 2);
  //   swapGame.setTeam(4, 2);

  //   swapGame.startGame();

  //   if (
  //     swapGame.declareSwap(1, [1, 2, 3]) &&
  //     swapGame.declareSwap(2, [4, 5, 6]) &&
  //     swapGame.declareSwap(3, [7, 8, 9]) &&
  //     swapGame.declareSwap(4, [10, 11, 12])
  //   ) {
  //     console.log(JSON.stringify(swapGame, null, " "));
  //     return;
  //   }
  // }


}

test()