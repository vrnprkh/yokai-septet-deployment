const users = [];

const generateRandomName = () => {
   // TODO: Make sure at the random names are unique
   const adjectives = ["Swift", "Brave", "Clever", "Mighty", "Witty"];
   const animals = ["Tiger", "Falcon", "Panda", "Eagle", "Shark"];
   return (
     adjectives[Math.floor(Math.random() * adjectives.length)] +
     animals[Math.floor(Math.random() * animals.length)]
   );
 };

const addUser = ({ id, roomId }) => {
   if (!roomId) {
      return { error: 'roomId is required' };
   }

   const defaultTeam = getUsersInRoom(roomId).length % 2 + 1;
   console.log("Default team: ", defaultTeam);
   const user = { id, name: generateRandomName(), roomId, team: defaultTeam };
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
   console.log("ALL USERS: ", users);
   return users.filter((user) => user.roomId === roomId);
 };

module.exports = { addUser, getUser, removeUser, getUsersInRoom };