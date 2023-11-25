const express = require('express');
const socket = require('socket.io');
require('dotenv').config();
require('./config/mongoose');
const cors = require('cors');
const app = express();
const PORT = 8085;
const corsOrigin = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  credentials: true
}));

app.use('/', require('./routes/index'));

const server = app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Server is running on port", PORT);
});

const io = socket(server, {
  pingTimeout: 60000,
  cors: {
    origin: corsOrigin
  }
});

io.on('connection', async (socket) => {
  console.log('user connect.');

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved;
    if (!chat) return console.log("chat.users not defined");
    socket.broadcast.emit("message recieved", newMessageRecieved);
  });

  socket.on('disconnect', async () => {
    console.log('user disconnect.');
  });
});