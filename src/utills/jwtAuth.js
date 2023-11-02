const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  try {
    const token = jwt.sign({ id }, "fdsfdsvf1dsgvdfvg1155bvfdbdfdvfsf", { expiresIn: '1d' });

    if (token) {
      return token;
    }

    return false;
  } catch (error) {
    return error;
  }
}

const verifyToken = (token) => {
  try {
    const decode = jwt.verify(token, "fdsfdsvf1dsgvdfvg1155bvfdbdfdvfsf");

    if (decode) {
      return decode;
    }

    return false;
  } catch (error) {
    return error;
  }
}

module.exports = {
  generateToken,
  verifyToken
}