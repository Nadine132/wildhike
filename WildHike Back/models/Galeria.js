const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Ruta = require("./Ruta");

const Galeria = sequelize.define("Galeria", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ruta_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Ruta,
      key: "id",
    },
  },
  url_imagen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechaSubida: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Galeria;
