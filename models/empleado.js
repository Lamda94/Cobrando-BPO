'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class empleado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  empleado.init({
    codigo: DataTypes.INTEGER,
    nif: DataTypes.STRING,
    nombre: DataTypes.STRING,
    apellido_2: DataTypes.STRING,
    apellido_1: DataTypes.STRING,
    codigo_departamento: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'empleado',
  });
  return empleado;
};