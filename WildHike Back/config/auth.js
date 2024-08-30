const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const SECRET_KEY = process.env.JWT_SECRET || "Ibiza202113"; // Asegúrate de que esto coincide con el `SECRET_KEY` en el resto de la app.

const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

const getUserFromToken = async (token) => {
  try {
    const decoded = verifyToken(token);
    return await User.findByPk(decoded.id);
  } catch (error) {
    return null;
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
  getUserFromToken,
};
