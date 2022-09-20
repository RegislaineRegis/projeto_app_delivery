const { DataTypes } = require('sequelize');

const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  price: {
    allowNull: false,
    type: DataTypes.DECIMAL(4, 2)
  },
  urlImage: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'url_image'
  }
}

module.exports = (sequelize) => {
  const model = sequelize.define('Product', attributes, { tableName: 'Products', timestamps: false })
  return model;
};