const express = require('express');
const cors = require('cors');
const app = express();
const httpServer = require('http').createServer(app);
const PORT = process.env.PORT || 3002;
const io = require('socket.io')(httpServer);
const { addUser, getUser, removeUser, getUsersInRoom } = require('./users')
const { addMessage, getMessages } = require('./messages')

app.use(cors());

io.on('connection', (socket) => {
   socket.on("join", ({name, roomId}, callback) => {
      const { user, error } = addUser({ id: socket.id, name: name, roomId: roomId });     
      if (error) return callback(error)
      socket.join(user.roomId)
      socket.in(roomId).emit("notification", `${user.name} has joined the room`)
      io.in(roomId).emit("users", getUsersInRoom(roomId))
      callback()
   })  
   
   socket.on("sendMessage", (message) => {
      const user = getUser(socket.id);
      const msg = { user: user.name, text: message };
      
      // Store the message
      addMessage(user.roomId, msg);
      
      // Get the updated list of messages for the room
      const updatedMessages = getMessages(user.roomId);
      
      // Emit the updated message list to all users in the room
      io.in(user.roomId).emit("message", updatedMessages);
      console.log(`${user.name} sent message: ${message}`);
   });
   
   
   socket.on("disconnect", () => {
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


