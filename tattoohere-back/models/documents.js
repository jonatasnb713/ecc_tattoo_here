'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Documents extends Model  {
    static associate(models) {
      Documents.belongsTo(models.Clients, { foreignKey: 'client_id', as: 'client' });
      Documents.belongsTo(models.Estoque, { foreignKey: 'estoque_id', as: 'estoque' });
    }
  }
  Documents.init({
    nome: DataTypes.STRING,
    client_id: DataTypes.INTEGER,
    estoque_id: DataTypes.INTEGER,
    data: DataTypes.STRING,
    categoria: DataTypes.STRING,
    quantidade: DataTypes.INTEGER,
    preco: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Documents',
  });
  return Documents;
};