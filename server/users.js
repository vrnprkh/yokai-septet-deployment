// User type: { id: string, socketId: string, name: string, roomId: string, team: number }
const users = [];
const { v4: uuidv4 } = require('uuid');

const generateRandomName = () => {
   // TODO: Make sure at the random names are unique
   const adjectives = ["Swift", "Brave", "Clever", "Mighty", "Witty"];
   const animals = ["Tiger", "Falcon", "Panda", "Eagle", "Shark"];
   return (
     adjectives[Math.floor(Math.random() * adjectives.length)] +
     animals[Math.floor(Math.random() * animals.length)]
   );
 };

const addUser = ({ socketId, roomId }) => {
   if (!roomId) {
      return { error: 'roomId is required' };
   }
   const id = uuidv4(); 
   const defaultTeam = getUsersInRoom(roomId).length % 2 + 1;
   const user = { socketId: socketId, id: id, name: generateRandomName(), roomId: roomId, team: defaultTeam};
   users.push(user);
   return { user };
}

const getUser = (id) => {
   return users.find(user => user.id === id);
}

const removeUser = (id) => {
   const index = users.findIndex(user => user.id === id);

   if (index !== -1) {
      return users.splice(index, 1)[0];
   }
}

const getUsersInRoom = (roomId) => {
   return users.filter((user) => user.roomId === roomId);
 };

module.exports = { addUser, getUser, removeUser, getUsersInRoom };