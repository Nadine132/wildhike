const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Ruta = sequelize.define("Ruta", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  provincia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comarca: {
    type: DataTypes.STRING,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  tipo: {
    type: DataTypes.STRING,
  },
  zona_natural: {
    type: DataTypes.STRING,
  },
  estacion: {
    type: DataTypes.STRING,
  },
  duracion: {
    type: DataTypes.DECIMAL(5, 2),
  },
  dificultad: {
    type: DataTypes.ENUM("Fácil", "Moderado", "Difícil"),
  },
  distancia: {
    type: DataTypes.DECIMAL(5, 2),
  },
  desnivel: {
    type: DataTypes.INTEGER,
  },
  localizacion_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechaCreacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Ruta;
