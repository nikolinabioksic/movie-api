const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('filmovi', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
