const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize');

//Modelo para los productos
const Products = sequelize.define('Products', {
  id: {
    defaultValue: null,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  num_lot: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date_entry: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  date_update: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  updatedAt: false,
  createdAt: false
});

module.exports = Products;