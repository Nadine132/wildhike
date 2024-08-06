const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const RutasRealizadas = sequelize.define("RutasRealizadas", {
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
        model: "Ruta",
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

  RutasRealizadas.associate = (models) => {
    RutasRealizadas.belongsTo(models.User, {
      foreignKey: "usuario_id",
      as: "usuario",
    });
    RutasRealizadas.belongsTo(models.Ruta, {
      foreignKey: "ruta_id",
      as: "ruta",
    });
  };

  return RutasRealizadas;
};
