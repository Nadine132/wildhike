const authorize = (roles = []) => {
  // Si roles no es un array, convertirlo a array
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    const user = req.user; // Usuario autenticado
    if (!user || !roles.includes(user.rol)) {
      return res.status(403).json({ message: "Acceso denegado" });
    }
    next();
  };
};

module.exports = authorize;
