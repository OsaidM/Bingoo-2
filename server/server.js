const express = require('express');
const cors = require('cors');
const app = express();
require('./config/mongoose.config'); // This is new
app.use(cors());
app.use(express.json()); // This is to recognise the incoming request as a JSON object
app.use(express.urlencoded({ extended: true })); // //  this can parse incoming Request Object if object, with nested objects, or generally any type
require('./routes/person.routes')(app);

const server = app.listen(8000, () =>
  console.log('The server is all fired up on port 8000')
);

const botName = 'ChatOn Bot'

const users = [];

const userJoin = (id, username, roomId) => {
    const user = {id, username, roomId}
  
    users.push(user)
  
    return user
  }
  
  formatMessage = (username, text) => {
    return {
      username,
      text
    }
  }
  // Get current user
  const getCurrentUser = (id) => {
      console.log("thisUser")
      console.log(users)
      return users.find(user => user.id === id)
    }
  
  // User leaves chat
  const userLeave = (id) => {
    const index = users.findIndex(user => user.id === id)
  
    if(index !== -1) {
      return users.splice(index, 1)[0]
    }
  }
  
  // Get room users
  const getRoomUsers = (roomId) => {
    return users.filter(user => user.roomId === roomId)
  }


  const io = require('socket.io')(server, { cors: true });

// ==================================================================
// Global Variables must be controlled by the server or The Socket in Server




  io.on("connection",socket =>{

    // ===========================================================

    // ===========================================================


    socket.on('joinRoom', async({username, roomId}) => {
        const user = await userJoin(socket.id, username, roomId)
       
        await socket.join(user.roomId)
        console.log(user)
        console.log(socket.join)
        // Welcome current user 
        await socket.emit('message', formatMessage(botName, 'Welcome to ChatOn!'))
    
        // Broadcast when a user connects
        await socket.broadcast.to(user.roomId).emit('message', formatMessage(botName, `${user.username} has joined the chat`))
        console.log(users);
        // Send users and room info
        await socket.to(user.roomId).emit('roomUsers', {
          roomId: user.roomId,
          users: getRoomUsers(user.roomId)
        })
    })

        //Listen for chatMessage
    socket.on('chatMessage',async (msg) => {
        const user = await getCurrentUser(socket.id)
        console.log("socketId")
        console.log(users);
        console.log(formatMessage(user, msg.msg));
        socket.to(user.roomId).emit('message', formatMessage(user, msg.msg))
    })

    // Runs when a client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id)

        if(user){
          socket.to(user.roomId).emit('message', formatMessage(botName, `${user.username} has left the chat`))

        // Send users and room info
        socket.to(user.roomId).emit('roomUsers', {
            roomId: user.roomId,
            users: getRoomUsers(user.roomId)
        })
        }
    })


});