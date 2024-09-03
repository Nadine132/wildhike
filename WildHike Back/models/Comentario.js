module.exports = (sequelize, DataTypes) => {
  const Comentario = sequelize.define("Comentario", {
    comentario: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
  });

  Comentario.associate = (models) => {
    Comentario.belongsTo(models.User, {
      foreignKey: "usuario_id",
      as: "usuario",
    });
    Comentario.belongsTo(models.Ruta, { foreignKey: "ruta_id", as: "ruta" });
  };

  return Comentario;
};
