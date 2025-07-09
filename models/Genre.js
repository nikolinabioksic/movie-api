const { DataTypes } = require('sequelize');
const sequelize = require('../db');   // <- OVO JE KLJUČNO!

const Genre = sequelize.define('Genre', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false,
  tableName: 'genres'
});

module.exports = Genre;



