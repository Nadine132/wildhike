const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Comentario = sequelize.define("Comentario", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    RutasRealizadas_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "RutasRealizadas",
        key: "id",
      },
    },
    comentario: {
      type: DataTypes.TEXT,
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
  });

  return Comentario;
};
