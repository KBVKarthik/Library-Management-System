const { Sequelize } = require('sequelize');
const UserModel = require('../models/User');
const BookModel = require('../models/Book');

// Configure your database connection
const sequelize = new Sequelize('postgres', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433 // Update with your correct port number
});

// Define your models
const User = UserModel(sequelize);
const Book = BookModel(sequelize);

// Define associations between models, if any
// For example:
User.hasMany(Book, { foreignKey: 'owned_by' });
Book.belongsTo(User, { foreignKey: 'owned_by' });

// Export your models
module.exports = {
  User,
  Book
};