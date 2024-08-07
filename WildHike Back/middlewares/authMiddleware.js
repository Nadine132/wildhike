const { verifyToken, getUserFromToken } = require("../config/auth");

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const user = await getUserFromToken(token);
    if (!user) {
      return res.status(401).json({ message: "Invalid token." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Failed to authenticate token." });
  }
};

module.exports = authMiddleware;
