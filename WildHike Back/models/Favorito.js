const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Favorito = sequelize.define("Favorito", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ruta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Favorito.associate = function (models) {
    Favorito.belongsTo(models.Ruta, { foreignKey: "ruta_id", as: "ruta" });
    Favorito.belongsTo(models.User, {
      foreignKey: "usuario_id",
      as: "usuario",
    });
  };

  return Favorito;
};
