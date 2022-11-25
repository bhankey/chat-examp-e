const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

var userNicknames = new Map()

io.on('connection', (socket) => {
  io.emit('user connected')
  socket.on('disconnect', socketID => {
    userNicknames.delete(socketID)
    io.emit('user disconnect');
  });

  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
  socket.on('add user nickname', (nick, socketID) => {
    userNicknames.add(socketID, nick)
    console.log(nick, socketID);
  })
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
