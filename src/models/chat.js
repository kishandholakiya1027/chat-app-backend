const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

const user = mongoose.model('chat', chatSchema);

module.exports = user;