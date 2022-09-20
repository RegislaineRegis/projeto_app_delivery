const { DataTypes } = require('sequelize');

const attributes = {
  saleId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'Sales',
      key: 'id'
    },
    field: 'sale_id'
  },
  productId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'Products',
      key: 'id'
    },
    field: 'product_id'
  },
  quantity: {
    type: DataTypes.INTEGER
  }
}

module.exports = (sequelize) => {
  const model = sequelize.define('SalesProduct', attributes, { tableName: 'SalesProducts', timestamps: false })
  model.associate = (models) => {
    models.SalesProduct.belongsToMany(models.Sale, {
      through: model,
      foreignKey: 'product_id',
      otherKey: 'sale_id'
    });
    models.SalesProduct.belongsToMany(models.Product, {
      through: model,
      foreignKey: 'sale_id',
      otherKey: 'product_id'
    });
  }
  return model;
};