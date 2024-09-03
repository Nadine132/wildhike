const express = require("express");
const passport = require("passport");
const dotenv = require("dotenv");
const cors = require("cors"); // Importa el paquete cors
require("./config/passport")(passport); // Importa la configuración de Passport
const { swaggerSpec, swaggerUi } = require("./config/swagger");

const app = express();
const bodyParser = require("body-parser");

dotenv.config();

// Configura CORS para permitir solicitudes desde cualquier origen
app.use(
  cors({
    origin: "http://localhost:5173", // Permite solicitudes desde el frontend
  })
);

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize()); // Inicializa Passport

// Importar rutas
const comentarioRoutes = require("./routes/comentarioRoutes");
const favoritoRoutes = require("./routes/favoritoRoutes");
const galeriaRoutes = require("./routes/galeriaRoutes");
const rutaRoutes = require("./routes/rutaRoutes");
const rutasRealizadasRoutes = require("./routes/rutasRealizadasRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

// Usar rutas
app.use("/api", comentarioRoutes);
app.use("/api/favoritos", favoritoRoutes);
app.use("/api/galerias", galeriaRoutes);
app.use("/api/rutas", rutaRoutes);
app.use("/api/rutas-realizadas", rutasRealizadasRoutes);
app.use("/api/usuarios", userRoutes);
app.use("/api/auth", authRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware de manejo de errores para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ message: "Recurso no encontrado" });
});

// Middleware de manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error en el servidor" });
});

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
