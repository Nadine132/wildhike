const authorizeAdmin = (req, res, next) => {
  console.log("Rol del usuario autenticado:", req.user.rol);
  if (req.user && req.user.rol === "admin") {
    next();
  } else {
    res.status(403).json({
      message:
        "Acceso denegado. Solo los administradores pueden realizar esta acción.",
    });
  }
};

module.exports = authorizeAdmin;
