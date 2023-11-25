const chat = require('../models/chat');
module.exports.Add = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    if (!senderId || !receiverId || !message) {
      return res.json({ status: 400, message: "all field required" })
    }

    const data = await chat.create(req.body);

    if (data) {
      return res.json({ status: 200, message: "chat add successfully", chat: data })
    }
    else {
      return res.json({ status: 400, message: "something wrong" })
    }
  } catch (error) {
    res.json({ status: 500, error: error.message })
  }
}

module.exports.Get = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    const chatData = await chat.find({
      $or: [
        { senderId: receiverId, receiverId: senderId },
        { senderId: senderId, receiverId: receiverId },
      ]
    });

    if (chatData.length !== 0) {
      return res.json({ status: 200, chats: chatData })
    }
    else {
      return res.json({ status: 400, message: "chats not found" })
    }
  } catch (error) {
    res.json({ status: 500, error: error.message })
  }
}