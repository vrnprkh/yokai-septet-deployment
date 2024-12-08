const express = require('express');
const cors = require('cors');
const app = express();
const httpServer = require('http').createServer(app);
const PORT = process.env.PORT || 5000
const io = require('socket.io')(httpServer);

app.use(cors());

io.on('connection', (socket) => {
   socket.on("login", ({name, room}, callback) => {
      const { user, error } = addUser(socket.id, name, room)
      if (error) return callback(error)
      socket.join(user.room)
      socket.in(room).emit("notification", `${user.name} has joined the room`)
      io.in(room).emit("users", getUsersInRoom(room))
      callback()
   })  
   
   socket.on("sendMessage", message => {
      const user = getUser(socket.id)
      io.in(user.room).emit("message", { user: user.name, text: message })
   })  
   
   socket.on("disconnect", () => {
      const user = removeUser(socket.id)
      if (user) {
         io.in(user.room).emit("notification", `${user.name} has left the room`)
         io.in(user.room).emit("users", getUsersInRoom(user.room))
      }
   })
 })
 
 app.get('/', (req, res) => {
   req.send('Server is up and running')
 })
 
 httpServer.listen(PORT, () => {
   console.log(`Listening to ${PORT}`);
 })


