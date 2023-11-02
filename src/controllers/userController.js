const user = require('../models/user');
const { verifyToken } = require('../utills/jwtAuth');

module.exports.Get = async (req, res) => {
  try {
    const data = await user.find({});

    if (data.length !== 0) {
      return res.json({ status: 200, users: data })
    }
    else {
      return res.json({ status: 400, message: "users not found" })
    }
  } catch (error) {
    res.json({ status: 500, error: error.message })
  }
}

module.exports.GetOne = async (req, res) => {
  try {
    const data = await user.findById(req.params.id);

    if (data) {
      return res.json({ status: 200, user: data })
    }
    else {
      return res.json({ status: 400, message: "user not found" })
    }
  } catch (error) {
    res.json({ status: 500, error: error.message })
  }
}

module.exports.Delete = async (req, res) => {
  try {
    const data = await user.findByIdAndDelete(req.params.id);

    if (data) {
      return res.json({ status: 200, message: "user delete successfully" })
    }
    else {
      return res.json({ status: 400, message: "user not found" })
    }
  } catch (error) {
    res.json({ status: 500, error: error.message })
  }
}

module.exports.Edit = async (req, res) => {
  try {

    const data = await user.findByIdAndUpdate(req.params.id, req.body);

    if (data) {
      return res.json({ status: 200, message: "user update successfully" })
    }
    else {
      return res.json({ status: 400, message: "user not found" })
    }
  } catch (error) {
    res.json({ status: 500, error: error.message })
  }
}

module.exports.GetAll = async (req, res) => {
  try {
    const auth = req.body.auth;
    if (auth) {
      const decode = verifyToken(auth);

      const users = await user.find({ _id: { $nin: [decode.id] } });

      if (users.length !== 0) {
        return res.json({ status: 200, users: users })
      }
      else {
        return res.json({ status: 400, message: "users not found" })
      }
    }
    else {
      return res.json({ status: 400, message: "token required" })
    }

  } catch (error) {
    res.json({ status: 500, error: error.message })
  }
}