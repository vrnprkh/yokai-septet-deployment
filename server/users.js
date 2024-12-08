const users = [];

const addUser = ({ id, name, roomId }) => {
   const existingUser = users.find(user => user.name.trim().toLowerCase() === name.trim().toLowerCase())   
   if (existingUser) {
      return { error: 'Username is taken' };
   }
   if (!name || !roomId) {
      return { error: 'Username and room are required' };
   }

   const user = { id, name, roomId };
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