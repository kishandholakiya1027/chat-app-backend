const user = require('../models/user');
const { generateToken } = require('../utills/jwtAuth');

module.exports.Register = async (req, res) => {
  try {
    const { username, email, password, cpassword } = req.body;

    if (!username || !email || !password || !cpassword) {
      return res.json({ status: 400, message: "all field required" })
    }

    const fData = await user.findOne({ email: email });

    if (fData) {
      return res.json({ status: 400, message: "user already register" })
    }

    if (password !== cpassword) {
      return res.json({ status: 400, message: "password and confirm password not match" })
    }

    const data = await user.create(req.body);

    if (data) {
      return res.json({ status: 200, message: "user register successfully" })
    }
    else {
      return res.json({ status: 400, message: "something wrong" })
    }

  } catch (error) {
    res.json({ status: 500, error: error.message })
  }
}

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ status: 400, message: "all field required" })
    }

    const data = await user.findOne({ email: email });

    if (!data) {
      return res.json({ status: 400, message: "user not register" })
    }

    if (data.password !== password) {
      return res.json({ status: 400, message: "wrong password" })
    }

    const token = generateToken(data.id);

    await user.findByIdAndUpdate(data.id, { token: token });

    const resData = {
      id: data._id,
      username: data.username,
      email: data.email,
      access_token: token
    }

    return res.json({ status: 200, message: "user login successfully", data: resData })

  } catch (error) {
    res.json({ status: 500, error: error.message })
  }
}

module.exports.LogOut = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.json({ status: 400, message: "all field required" })
    }

    const data = await user.findOne({ token: token });

    if (!data) {
      return res.json({ status: 400, message: "user not found" })
    }

    await user.findByIdAndUpdate(data.id, { token: "" });

    return res.json({ status: 200, message: "user logout successfully" })

  } catch (error) {
    res.json({ status: 500, error: error.message })
  }
}
