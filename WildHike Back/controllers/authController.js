const { User } = require("../models");
const { comparePassword, generateToken } = require("../config/auth");

exports.login = async (req, res) => {
  const { credential, password } = req.body;
  try {
    console.log("Received credential:", credential);
    console.log("Received password:", password);

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: credential }, { username: credential }],
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    console.log("User found:", user);

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: error.message });
  }
};
