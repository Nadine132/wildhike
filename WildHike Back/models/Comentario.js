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
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  Comentario.associate = (models) => {
    Comentario.belongsTo(models.Usuario, {
      foreignKey: "usuario_id",
      as: "usuario",
    });
    Comentario.belongsTo(models.Ruta, { foreignKey: "ruta_id", as: "ruta" });
  };

  return Comentario;
};
