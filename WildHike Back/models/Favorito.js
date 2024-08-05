const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Favorito = sequelize.define("Favorito", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Usuarios",
        key: "id",
      },
    },
    ruta_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Rutas",
        key: "id",
      },
    },
  });

  return Favorito;
};
