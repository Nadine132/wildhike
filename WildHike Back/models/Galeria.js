const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Galeria = sequelize.define(
    "Galeria",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ruta_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      url_imagen: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fechaSubida: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "Galeria",
      timestamps: false,
    }
  );

  return Galeria;
};
