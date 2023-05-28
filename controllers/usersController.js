const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const router = express.Router();

// Create user
const createUser = async (req, res) => {
  try {
    const { email, password, firstname, lastname } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstname,
      lastname,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Read user
const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, firstname, lastname } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const [rowsUpdated, [updatedUser]] = await User.update(
      {
        email,
        password: hashedPassword,
        firstname,
        lastname,
      },
      {
        where: { id },
        returning: true,
      }
    );

    if (rowsUpdated === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete user (soft-delete)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const rowsUpdated = await User.update(
      {
        deleted_at: new Date(),
      },
      {
        where: { id },
      }
    );

    if (rowsUpdated === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};