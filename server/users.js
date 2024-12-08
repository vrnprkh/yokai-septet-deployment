const users = [];

const addUser = ({ id, name, roomId }) => {
   const existingUsers = users.find(user => user.name.trim().toLowerCase() === name.trim().toLowerCase())   
   if (existingUsers) {
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

const getUsersInRoom = (room) => {
   return users.filter(user => user.room === room);
}

module.exports = { addUser, getUser, removeUser, getUsersInRoom };