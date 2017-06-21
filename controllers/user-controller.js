'use strict';

const createError = require('http-errors');
const Promise = require('bluebird');
const User = require('../model/user.js');

module.exports = exports = {};

exports.getUser = function(req) {
  if(!req.auth.username) return Promise.reject(createError(400, 'Invalid username'));

  if(!req.auth.password) return Promise.reject(createError(400, 'Invalid password'));

  return User.findOne({username: req.auth.username})
  .then(user => user.comparePasswordHash(req.auth.password))
  .then(user => user.generateToken())
  .then(token => token)
  .catch(err => createError(404, err.message));
};

// Check that user is logged in, if not route to signin.

// GET request for that users information req.body

// PUT request to update any updates from user on submit.

// DELETE user will not currently be a supported feature.
