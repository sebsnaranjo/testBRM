const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize');

//Modelo para los roles
const Roles = sequelize.define('Roles', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  updatedAt: false,
  createdAt: false
});

module.exports = Roles;