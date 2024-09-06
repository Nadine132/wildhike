const express = require("express");
const passport = require("passport");
const dotenv = require("dotenv");
const cors = require("cors");
require("./config/passport")(passport);
const { swaggerSpec, swaggerUi } = require("./config/swagger");

const app = express();
const bodyParser = require("body-parser");

dotenv.config();

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());

// Aqui para importar rutas
const comentarioRoutes = require("./routes/comentarioRoutes");
const favoritoRoutes = require("./routes/favoritoRoutes");
const galeriaRoutes = require("./routes/galeriaRoutes");
const rutaRoutes = require("./routes/rutaRoutes");
const rutasRealizadasRoutes = require("./routes/rutasRealizadasRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const adminUserRoutes = require("./routes/adminUserRoutes");
const adminRutaRoutes = require("./routes/adminRutaRoutes");
const adminComentarioRoutes = require("./routes/adminComentarioRoutes");

// Aqui el uso de rutas
app.use("/api", comentarioRoutes);
app.use("/api/favoritos", favoritoRoutes);
app.use("/api/galerias", galeriaRoutes);
app.use("/api/rutas", rutaRoutes);
app.use("/api/rutas-realizadas", rutasRealizadasRoutes);
app.use("/api/usuarios", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin/usuarios", adminUserRoutes);
app.use("/api/admin/rutas", adminRutaRoutes);
app.use("/api/admin/comentarios", adminComentarioRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res, next) => {
  res.status(404).json({ message: "Recurso no encontrado" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error en el servidor" });
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
