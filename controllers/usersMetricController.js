const express = require('express');
const { User, Book } = require('../models');

const router = express.Router();

// Number of books each user has in total
const getUserBooksCount = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'firstname', 'lastname'],
      include: {
        model: Book,
        attributes: []
      },
      group: ['User.id'],
      raw: true
    });

    const usersWithBooksCount = users.map(user => ({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      booksCount: parseInt(user['Books.count']) || 0
    }));

    res.json(usersWithBooksCount);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Number of books each user has, grouped by author's name
const getUserBooksCountByAuthor = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'firstname', 'lastname'],
      include: {
        model: Book,
        attributes: [],
        include: {
          model: Author,
          attributes: []
        }
      },
      group: ['User.id', 'Books.Authors.id'],
      raw: true
    });

    const usersWithBooksCountByAuthor = users.map(user => ({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      booksByAuthor: {
        authorId: user['Books.Authors.id'],
        authorName: user['Books.Authors.name'],
        booksCount: parseInt(user['Books.count']) || 0
      }
    }));

    res.json(usersWithBooksCountByAuthor);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Number of books each user has, grouped by publishing year
const getUserBooksCountByPublishingYear = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'firstname', 'lastname'],
      include: {
        model: Book,
        attributes: ['publishing_year'],
      },
      group: ['User.id', 'Books.publishing_year'],
      raw: true
    });

    const usersWithBooksCountByYear = users.map(user => ({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      booksByYear: {
        year: user['Books.publishing_year'],
        booksCount: parseInt(user['Books.count']) || 0
      }
    }));

    res.json(usersWithBooksCountByYear);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
getUserBooksCount,
getUserBooksCountByAuthor,
getUserBooksCountByPublishingYear,
};