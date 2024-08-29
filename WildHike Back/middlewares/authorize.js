module.exports = (requiredRole) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "No estás autenticado" });
    }

    if (user.rol !== requiredRole) {
      return res
        .status(403)
        .json({ message: "No tienes permisos para acceder a esta ruta" });
    }

    next();
  };
};
