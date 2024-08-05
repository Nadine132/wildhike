const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Ruta = require("./Rutas");

const RutasRealizadas = sequelize.define("RutasRealizadas", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  ruta_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Ruta,
      key: "id",
    },
  },
  fechaRealizacion: {
    type: DataTypes.DATE,
  },
  tiempoRealizacion: {
    type: DataTypes.DECIMAL(5, 2),
  },
});

module.exports = RutasRealizadas;
