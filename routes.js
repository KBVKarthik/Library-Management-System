const express = require('express');
const usersController = require('./controllers/usersController');
const booksController = require('./controllers/booksController');
const usersMetricController = require('./controllers/usersMetricController');

const router = express.Router();

// User routes
router.post('/users', usersController.createUser);
router.get('/users/:id', usersController.getUser);
router.put('/users/:id', usersController.updateUser);
router.delete('/users/:id', usersController.deleteUser);

// Book routes
router.post('/books', booksController.createBook);
router.get('/books', booksController.getBooks);
router.put('/books/:id', booksController.updateBook);
router.delete('/books/:id', booksController.deleteBook);

// User metric routes
router.get('/users/metrics/books-count', usersMetricController.getUserBooksCount);
router.get('/users/metrics/books-count-by-author', usersMetricController.getUserBooksCountByAuthor);
router.get('/users/metrics/books-count-by-publishing-year', usersMetricController.getUserBooksCountByPublishingYear);

module.exports = router;