const express = require('express');
const cors = require('cors');
const app = express();
const httpServer = require('http').createServer(app);
const PORT = process.env.PORT || 3002;
const io = require('socket.io')(httpServer);
const { addUser, getUser, removeUser, getUsersInRoom } = require('./users')
const { addMessage, getMessages } = require('./messages')
const { v4: uuidv4 } = require('uuid');

app.use(cors());

io.on('connection', (socket) => {
   // Handle room creation
   socket.on("create", (callback) => {
      console.log("Creating a room");
      const roomId = uuidv4();
      socket.join(roomId);

      // Add user to room
      const { user, error } = addUser({ id: socket.id, roomId: roomId });
      if (error) return callback(error);

      console.log(`Room ${roomId} created by user ${user.name}`);

      // Update room users
      io.in(roomId).emit("users", getUsersInRoom(user.roomId));

      // Send the room ID and name back to the client
      callback({ roomId: roomId, username: user.name });
   });

   socket.on("join", ({roomId}, callback) => {
      // Check if the room exists
      const room = getUsersInRoom(roomId); // Assuming getUsersInRoom returns an array of users in the room

      if (room.length === 0) {
         return callback({ error: "Room does not exist" });
      }

      // Add user to room
      const { user, error } = addUser({ id: socket.id, roomId: roomId });     
      if (error) return callback(error)
      socket.join(user.roomId)

      // Fetch and emit previous messages
      const previousMessages = getMessages(user.roomId);
      socket.emit("previousMessages", previousMessages);

      // Notify other users and update room users
      console.log("Users in the room: ", getUsersInRoom(user.roomId))
      socket.in(roomId).emit("notification", `${user.name} has joined the room`);
      io.in(roomId).emit("users", getUsersInRoom(user.roomId));

      callback({ username: user.name })
   })  
   
   socket.on("sendMessage", (message) => {
      const user = getUser(socket.id);
      const msg = { user: user.name, text: message };
      
      // Store the message
      addMessage(user.roomId, msg);
      
      // Get the updated list of messages for the room
      const updatedMessages = getMessages(user.roomId);
      io.in(user.roomId).emit("message", updatedMessages);

   });
      
   
   socket.on("leaveRoom", () => {
      const user = removeUser(socket.id)
      if (user) {
         io.in(user.roomId).emit("notification", `${user.name} has left the room`)
         io.in(user.roomId).emit("users", getUsersInRoom(user.roomId))
      }
   })
 })
 
 app.get('/', (req, res) => {
   req.send('Server is up and running')
 })
 
 httpServer.listen(PORT, () => {
   console.log(`Listening to ${PORT}`);
 })


