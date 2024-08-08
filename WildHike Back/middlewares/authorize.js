// middlewares/authorize.js
module.exports = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.rol === role) {
      return next();
    } else {
      return res
        .status(403)
        .json({ message: "No tienes permisos para acceder a esta ruta" });
    }
  };
};
