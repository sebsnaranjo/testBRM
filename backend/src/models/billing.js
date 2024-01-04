const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize');

//Modelo para las facturas
const Billing = sequelize.define('Billing', {
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cod_purchase: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date_created: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  users_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      table: 'Users',
      field: 'id',
    },
  },
  products_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      table: 'Products',
      field: 'id',
    },
  },
}, {
  tableName: 'billing',
  updatedAt: false,
  createdAt: false
});

module.exports = Billing;