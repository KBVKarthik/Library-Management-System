const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  const Book = sequelize.define(
    'Book',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false
      },
      publishing_year: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      owned_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id'
        }
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      deleted_at: {
        type: DataTypes.DATE
      }
    },
    {
      tableName: 'books',
      timestamps: false,
      underscored: true
    }
  );

  return Book;
};