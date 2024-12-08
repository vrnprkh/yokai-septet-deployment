const express = require('express');
const cors = require('cors');
const app = express();
const httpServer = require('http').createServer(app);
const PORT = process.env.PORT || 3000;
const io = require('socket.io')(httpServer);
const { addUser, getUser, removeUser, getUsersInRoom } = require('./users')

app.use(cors());

io.on('connection', (socket) => {
   socket.on("join", ({name, roomId}, callback) => {
      console.log(name, roomId)
      const { user, error } = addUser({ id: socket.id, name, roomId });     
      if (error) return callback(error)
      socket.join(user.roomId)
      socket.in(roomId).emit("notification", `${user.name} has joined the room`)
      io.in(roomId).emit("users", getUsersInRoom(roomId))
      callback()
   })  
   
   socket.on("sendMessage", message => {
      const user = getUser(socket.id)
      io.in(user.roomId).emit("message", { user: user.name, text: message })
   })  
   
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


