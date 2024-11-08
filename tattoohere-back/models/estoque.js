'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estoque extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Estoque.hasMany(models.Documents, { as: 'documents', foreignKey: 'estoque_id' });
    }
  }
  Estoque.init({
    nome: DataTypes.STRING,
    tipo: DataTypes.STRING,
    quantidade: DataTypes.INTEGER,
    preco: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Estoque',
  });
  return Estoque;
};