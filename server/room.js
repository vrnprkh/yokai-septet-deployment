const { GameState } = require("./gamestate");
const { getUsersInRoom } = require("./users");

const rooms = {}

function createRoom(roomId) {
	rooms[roomId] = new GameState();
}


function initializeRoom(roomId) {
	if (rooms[roomId].state != "lobby") {
		return
	}
	// assign teams from lobby
	const users = getUsersInRoom(roomId)
	for (let i = 0; i < 4; i++) {
		rooms[roomId].addUser(users[i].id, users[i].name);
		rooms[roomId].setTeam(users[i].id, users[i].team);
	}
	// start game for first time
	rooms[roomId].startGame()
}

function getRoom(roomId) {
	return rooms[roomId];
}

module.exports = { createRoom, initializeRoom, getRoom}