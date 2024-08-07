const express = require("express");
const passport = require("passport");
require("./config/passport"); // Importa la configuración de Passport

const app = express();
const bodyParser = require("body-parser");

// Importar rutas
const comentarioRoutes = require("./routes/comentarioRoutes");
const favoritoRoutes = require("./routes/favoritoRoutes");
const galeriaRoutes = require("./routes/galeriaRoutes");
const rutaRoutes = require("./routes/rutaRoutes");
const rutasRealizadasRoutes = require("./routes/rutasRealizadasRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes"); // Importar rutas de autenticación

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize()); // Inicializa Passport

// Usar rutas
app.use("/api/comentarios", comentarioRoutes);
app.use("/api/favoritos", favoritoRoutes);
app.use("/api/galerias", galeriaRoutes);
app.use("/api/rutas", rutaRoutes);
app.use("/api/rutas-realizadas", rutasRealizadasRoutes);
app.use("/api/usuarios", userRoutes);
app.use("/api/auth", authRoutes); // Configura la ruta de autenticación

// Manejo de errores
app.use((req, res, next) => {
  res.status(404).json({ message: "Recurso no encontrado" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error en el servidor" });
});

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
