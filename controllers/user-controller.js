'use strict';

const createError = require('http-errors');
const Promise = require('bluebird');
const User = require('../model/user.js');

module.exports = exports = {};

exports.fetchUserPage = function(user) {
  return User.findOneById(user._id)
  .then(user => user.comparePasswordHash(user.password))
  .then(user => user.generateToken())
  .then(token => token)
  .catch(() => Promise.reject(createError(401, 'Not authorized')));
};

// Check that user is logged in, if not route to signin.

// GET request for that users information req.body

// PUT request to update any updates from user on submit.

// DELETE user will not currently be a supported feature.
