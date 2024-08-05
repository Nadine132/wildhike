const express = require("express");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const rutaRoutes = require("./routes/rutaRoutes");
const galeriaRoutes = require("./routes/galeriaRoutes");
const rutasRealizadasRoutes = require("./routes/rutasRealizadasRoutes");
const comentarioRoutes = require("./routes/comentarioRoutes");
const favoritoRoutes = require("./routes/favoritoRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/rutas", rutaRoutes);
app.use("/api/galeria", galeriaRoutes);
app.use("/api/rutas-realizadas", rutasRealizadasRoutes);
app.use("/api/comentarios", comentarioRoutes);
app.use("/api/favoritos", favoritoRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
