// models/RutasRealizadas.js
module.exports = (sequelize, DataTypes) => {
  const RutasRealizadas = sequelize.define(
    "RutasRealizadas",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      ruta_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Ruta",
          key: "id",
        },
      },
      fechaRealizacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      tiempoRealizacion: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );

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
