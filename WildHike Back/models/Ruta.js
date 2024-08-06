const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Ruta = sequelize.define(
    "Ruta",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
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
        allowNull: true,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      tipo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      zona_natural: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      estacion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      duracion: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      dificultad: {
        type: DataTypes.ENUM("Fácil", "Moderado", "Difícil"),
        allowNull: true,
      },
      distancia: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      desnivel: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      localizacion_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fechaCreacion: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "Ruta", // Nombre de la tabla en la base de datos
      timestamps: false, // Desactiva createdAt y updatedAt
    }
  );

  return Ruta;
};
