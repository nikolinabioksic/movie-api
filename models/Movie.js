const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Genre = require('./Genre');

const Movie = sequelize.define('Movie', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: DataTypes.INTEGER,
  director: DataTypes.STRING,
  genreId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'movies'
});

// Ispravno povezivanje modela, CASCADE
Genre.hasMany(Movie, { foreignKey: 'genreId', onDelete: 'CASCADE' });
Movie.belongsTo(Genre, { foreignKey: 'genreId' });

module.exports = Movie;
