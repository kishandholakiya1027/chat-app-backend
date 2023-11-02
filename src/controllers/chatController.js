const chat = require('../models/chat');
const { verifyToken } = require('../utills/jwtAuth');

module.exports.Add = async (req, res) => {
  try {
    const { auth, receiverId, message } = req.body;

    if (!auth || !receiverId || !message) {
      return res.json({ status: 400, message: "all field required" })
    }

    if (auth) {
      const decode = verifyToken(auth);
      const cData = {
        senderId: decode.id,
        receiverId: receiverId,
        message: message
      }
      const data = await chat.create(cData);

      if (data) {
        return res.json({ status: 200, message: "chat add successfully", chat: data })
      }
      else {
        return res.json({ status: 400, message: "something wrong" })
      }
    }
    else {
      return res.json({ status: 400, message: "token required" })
    }
  } catch (error) {
    res.json({ status: 500, error: error.message })
  }
}

module.exports.Get = async (req, res) => {
  try {
    const data = await chat.find({});

    if (data.length !== 0) {
      return res.json({ status: 200, users: data })
    }
    else {
      return res.json({ status: 400, message: "chats not found" })
    }
  } catch (error) {
    res.json({ status: 500, error: error.message })
  }
}

module.exports.GetOne = async (req, res) => {
  try {
    const data = await chat.findById(req.params.id);

    if (data) {
      return res.json({ status: 200, chat: data })
    }
    else {
      return res.json({ status: 400, message: "chat not found" })
    }
  } catch (error) {
    res.json({ status: 500, error: error.message })
  }
}

module.exports.Delete = async (req, res) => {
  try {
    const data = await chat.findByIdAndDelete(req.params.id);

    if (data) {
      return res.json({ status: 200, message: "chat delete successfully" })
    }
    else {
      return res.json({ status: 400, message: "chat not found" })
    }
  } catch (error) {
    res.json({ status: 500, error: error.message })
  }
}

module.exports.Edit = async (req, res) => {
  try {

    const data = await chat.findByIdAndUpdate(req.params.id, req.body);

    if (data) {
      return res.json({ status: 200, message: "chat update successfully" })
    }
    else {
      return res.json({ status: 400, message: "chat not found" })
    }
  } catch (error) {
    res.json({ status: 500, error: error.message })
  }
}