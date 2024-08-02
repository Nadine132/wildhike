const express = require("express");
const userRoutes = require("./routes/userRoutes");
const rutaRoutes = require("./routes/rutas");
const { Sequelize } = require("sequelize");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const config = require("./config/config.json");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api", userRoutes);
app.use("/api", rutaRoutes);

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => {
    console.error("Error synchronizing the database:", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
