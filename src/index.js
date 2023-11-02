const express = require('express');
const PORT = 8085;
const cors = require('cors');
const socket = require('socket.io');
const chat = require('./models/chat');
const { verifyToken } = require('./utills/jwtAuth');
const app = express();
require('./config/mongoose');

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  credentials: true
}));

app.use('/', require('./routes/index'));

const server = app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return false;
  }
  console.log("Server is run on port", PORT);
})

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true
  }
});

io.on('connection', async (socket) => {
  console.log('user connect.');

  socket.on('fetchData', async (data) => {
    if (data.auth) {
      const decode = verifyToken(data.auth);
      const chatData = await chat.find({
        $or: [
          { senderId: data.receiverId, receiverId: decode.id },
          { senderId: decode.id, receiverId: data.receiverId },
        ]
      });
      socket.emit('fetchData2', { data: chatData });
    }
  });

  socket.on('newChat', async (data) => {
    if (data.data.auth) {
      const decode = verifyToken(data.data.auth);
      const cData = {
        senderId: decode.id,
        receiverId: data.data.receiverId,
        message: data.data.message
      }
      await chat.create(cData);
      const chatData = await chat.find({
        $or: [
          { senderId: data.data.receiverId, receiverId: decode.id },
          { senderId: decode.id, receiverId: data.data.receiverId },
        ]
      });
      socket.broadcast.emit('fetchChat', { data: chatData });
    }
  })

  socket.on('disconnect', async () => {
    console.log('user disconnect.');
  });
})