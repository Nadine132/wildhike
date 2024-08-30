const { User } = require("../models");
const { Op } = require("sequelize");
const { comparePassword, generateToken } = require("../config/auth");

exports.login = async (req, res) => {
  const { credential, password } = req.body;

  try {
    if (!credential || !password) {
      return res.status(400).json({ message: "Faltan credenciales" });
    }

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: credential }, { nombreDeUsuario: credential }],
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = generateToken(user);

    // Incluimos el userId en la respuesta junto con el token
    res.status(200).json({ token, userId: user.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.register = async (req, res) => {
  const { nombreDeUsuario, email, password } = req.body;

  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { nombreDeUsuario }],
      },
    });

    if (existingUser) {
      return res.status(409).json({ message: "El usuario o correo ya existe" });
    }

    const newUser = await User.create({
      nombreDeUsuario,
      email,
      password,
    });

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
