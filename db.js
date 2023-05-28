// db.js
const { Sequelize, DataTypes } = require('sequelize');
const User = require('../library-api/models/User');
const Book = require('../library-api/models/Book');

const sequelize = new Sequelize({
  database: 'postgres',
  username: 'postgres',
  password: '1234',
  host: 'localhost',
  port: '5433',
  dialect: 'postgres',
});

sequelize.authenticate()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

const models = {
  User: User.init(sequelize, DataTypes),
  Book: Book.init(sequelize, DataTypes),
};

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

module.exports = {
  sequelize,
  ...models,
};
