const express = require('express');
const { Book } = require('../models');

const router = express.Router();

// Create book
const createBook = async (req, res) => {
  try {
    const { title, author, publishing_year, owned_by } = req.body;

    const newBook = await Book.create({
      title,
      author,
      publishing_year,
      owned_by,
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Read book/books
const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();

    res.json(books);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update book
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publishing_year, owned_by } = req.body;

    const updatedBook = await Book.update({
      title,
      author,
      publishing_year,
      owned_by,
    }, {
      where: { id },
      returning: true,
    });

    if (updatedBook[0] === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(updatedBook[1][0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete book (soft-delete)
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.update({
      deleted_at: new Date(),
    }, {
      where: { id },
    });

    if (deletedBook[0] === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createBook,
  getBooks,
  updateBook,
  deleteBook,
};