const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize');
const Roles = require('./roles')

//Modelo para los usuarios
const Users = sequelize.define('Users', {
  id: {
    defaultValue: null,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_created: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  date_update: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  roles_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      table: 'Roles',
      field: 'id',
    },
  },
}, {
  updatedAt: false,
  createdAt: false
});

Users.belongsTo(Roles, { foreignKey: 'roles_id' });

module.exports = Users;