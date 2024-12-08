const express = require('express');
const cors = require('cors');
const app = express();
const httpServer = require('http').createServer(app);
const PORT = process.env.PORT || 5000
const io = require('socket.io')(httpServer);

app.use(cors());

io.on('connection', (socket) => {
   socket.on("login", ({name, room}, callback) => {
   
   })  
   
   socket.on("sendMessage", message => {
   
   })  
   
   socket.on("disconnect", () => {
   
   })
 })
 
 app.get('/', (req, res) => {
   req.send('Server is up and running')
 })
 
 httpServer.listen(PORT, () => {
   console.log(`Listening to ${PORT}`);
 })
