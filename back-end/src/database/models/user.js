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
  email: {
    allowNull: false,
    type: DataTypes.STRING
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING
  }
};

module.exports = (sequelize) => {
  const model = sequelize.define('User', attributes, { tableName: 'Users', timestamps: false })
  model.associate = (models) => {
    models.User.hasMany(models.Sale, { 
      through: model,
      foreignKey: 'userId',
    });
    models.User.hasMany(models.Sale, { 
      through: model,
      foreignKey: 'sellerId', 
    });
  }
  return model;
};